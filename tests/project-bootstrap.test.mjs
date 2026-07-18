import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const script = path.join(repoRoot, 'init-project.mjs');

async function temporaryProject(name) {
  const root = await mkdtemp(path.join(tmpdir(), `codex-workflow-${name}-`));
  return root;
}

function run(args) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
  });
}

test('greenfield repository requires an approved selection', async () => {
  const target = await temporaryProject('empty');
  const result = run(['--target', target]);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /appears greenfield/);
});

test('capability-only greenfield setup is supported', async () => {
  const target = await temporaryProject('linux');
  const result = run([
    '--target', target,
    '--capabilities', 'linux,server-security',
  ]);

  assert.equal(result.status, 0, result.stderr);
  const profile = JSON.parse(await readFile(path.join(target, '.codex/project-profile.json'), 'utf8'));
  assert.equal(profile.version, 2);
  assert.deepEqual(profile.ecosystems, []);
  assert.deepEqual(profile.capabilities, ['linux', 'server-security']);
  await readFile(path.join(target, '.codex/rules/linux.rules'), 'utf8');
  await readFile(path.join(target, '.codex/rules/server-security.rules'), 'utf8');
});

test('existing project ecosystems are detected from manifests', async () => {
  const target = await temporaryProject('javascript');
  await writeFile(path.join(target, 'package.json'), '{"scripts":{"test":"node --test"}}\n');

  const result = run(['--target', target]);
  assert.equal(result.status, 0, result.stderr);
  const profile = JSON.parse(await readFile(path.join(target, '.codex/project-profile.json'), 'utf8'));
  assert.deepEqual(profile.ecosystems, ['javascript']);
  await readFile(path.join(target, '.codex/rules/javascript.rules'), 'utf8');
});

test('answers JSON generates a concise project AGENTS.md', async () => {
  const target = await temporaryProject('answers');
  const answers = {
    mode: 'greenfield',
    ecosystems: ['python'],
    capabilities: ['application-security'],
    projectName: 'Secure App',
    purpose: 'Provide a small authenticated service.',
    projectType: 'service',
    sourceOfTruth: 'Current explicit user requirements',
    includedScope: ['Authentication API'],
    prohibitedActions: ['Do not modify production'],
    automaticChecks: ['python -m py_compile src/app.py'],
    manualChecks: ['pytest'],
  };
  await writeFile(path.join(target, 'answers.json'), `${JSON.stringify(answers, null, 2)}\n`);

  const result = run(['--target', target, '--answers', 'answers.json']);
  assert.equal(result.status, 0, result.stderr);
  const agents = await readFile(path.join(target, 'AGENTS.md'), 'utf8');
  assert.match(agents, /Secure App/);
  assert.match(agents, /application-security/);
  assert.match(agents, /Do not modify production/);
  assert.doesNotMatch(agents, /\[PROJECT NAME\]/);
});

test('dry-run reports files without writing them', async () => {
  const target = await temporaryProject('dry-run');
  await mkdir(target, { recursive: true });
  const result = run(['--target', target, '--capabilities', 'linux', '--dry-run']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Would create/);
  await assert.rejects(readFile(path.join(target, '.codex/project-profile.json'), 'utf8'));
});
