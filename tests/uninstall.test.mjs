import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  copyFile,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const script = path.join(repoRoot, 'uninstall.mjs');
const isWindows = process.platform === 'win32';

async function temporaryInstallation(name) {
  const root = await mkdtemp(path.join(tmpdir(), `codex-workflow-uninstall-${name}-`));
  const home = path.join(root, 'home');
  const codexHome = path.join(home, '.codex');
  await mkdir(codexHome, { recursive: true });

  return {
    root,
    home,
    codexHome,
    env: {
      ...process.env,
      HOME: home,
      USERPROFILE: home,
      CODEX_HOME: codexHome,
    },
  };
}

function run(fixture, args = []) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd: repoRoot,
    env: fixture.env,
    encoding: 'utf8',
  });
}

async function installManagedCopies(codexHome) {
  await mkdir(path.join(codexHome, 'rules'), { recursive: true });
  await copyFile(path.join(repoRoot, 'global', 'AGENTS.md'), path.join(codexHome, 'AGENTS.md'));
  await copyFile(path.join(repoRoot, 'config', 'config.toml'), path.join(codexHome, 'config.toml'));
  await copyFile(
    path.join(repoRoot, 'rules', 'default.rules'),
    path.join(codexHome, 'rules', 'default.rules'),
  );
}

async function linkRepositorySkill(home, name) {
  const targetRoot = path.join(home, '.agents', 'skills');
  await mkdir(targetRoot, { recursive: true });
  const target = path.join(targetRoot, name);
  await symlink(path.join(repoRoot, 'skills', name), target, isWindows ? 'junction' : 'dir');
  return target;
}

test('dry-run reports uninstall actions without changing managed targets', async (t) => {
  const fixture = await temporaryInstallation('dry-run');
  t.after(() => rm(fixture.root, { recursive: true, force: true }));
  await installManagedCopies(fixture.codexHome);

  const backupRoot = path.join(fixture.codexHome, 'backups', '20260717-120000-000');
  await mkdir(backupRoot, { recursive: true });
  await writeFile(path.join(backupRoot, 'AGENTS.md'), 'original agents\n', 'utf8');
  const skillTarget = await linkRepositorySkill(fixture.home, 'software-design');

  const result = run(fixture, ['--dry-run']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Dry-run mode enabled/);
  assert.match(result.stdout, /Would restore Global AGENTS\.md/);
  assert.match(result.stdout, /Would remove repository skill software-design/);
  assert.equal(
    await readFile(path.join(fixture.codexHome, 'AGENTS.md'), 'utf8'),
    await readFile(path.join(repoRoot, 'global', 'AGENTS.md'), 'utf8'),
  );
  assert.equal((await lstat(skillTarget)).isSymbolicLink(), true);
});

test('uninstall restores backups and removes only repository-managed links', async (t) => {
  const fixture = await temporaryInstallation('apply');
  t.after(() => rm(fixture.root, { recursive: true, force: true }));
  await installManagedCopies(fixture.codexHome);

  const backupRoot = path.join(fixture.codexHome, 'backups', '20260717-130000-000');
  await mkdir(path.join(backupRoot, 'skills', 'repomix-explorer', 'agents'), { recursive: true });
  await writeFile(path.join(backupRoot, 'AGENTS.md'), 'original agents\n', 'utf8');
  await writeFile(
    path.join(fixture.codexHome, 'rules', 'default.rules'),
    'user-modified rules\n',
    'utf8',
  );

  const managedSkill = await linkRepositorySkill(fixture.home, 'software-design');
  const unrelatedSkill = path.join(fixture.home, '.agents', 'skills', 'project-discovery');
  await mkdir(unrelatedSkill, { recursive: true });
  await writeFile(path.join(unrelatedSkill, 'KEEP'), 'unrelated\n', 'utf8');

  const repomixMetadata = path.join(
    fixture.home,
    '.agents',
    'skills',
    'repomix-explorer',
    'agents',
    'openai.yaml',
  );
  await mkdir(path.dirname(repomixMetadata), { recursive: true });
  const originalRepomix = 'name: repomix\npolicy:\n  allow_implicit_invocation: true\n';
  await writeFile(
    path.join(backupRoot, 'skills', 'repomix-explorer', 'agents', 'openai.yaml'),
    originalRepomix,
    'utf8',
  );
  await writeFile(
    repomixMetadata,
    'name: repomix\npolicy:\n  allow_implicit_invocation: false\n',
    'utf8',
  );

  const result = run(fixture);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(await readFile(path.join(fixture.codexHome, 'AGENTS.md'), 'utf8'), 'original agents\n');
  await assert.rejects(lstat(path.join(fixture.codexHome, 'config.toml')), { code: 'ENOENT' });
  assert.equal(
    await readFile(path.join(fixture.codexHome, 'rules', 'default.rules'), 'utf8'),
    'user-modified rules\n',
  );
  await assert.rejects(lstat(managedSkill), { code: 'ENOENT' });
  assert.equal(await readFile(path.join(unrelatedSkill, 'KEEP'), 'utf8'), 'unrelated\n');
  assert.equal(await readFile(repomixMetadata, 'utf8'), originalRepomix);
  assert.equal((await lstat(backupRoot)).isDirectory(), true);
});
