import { spawnSync } from 'node:child_process';
import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
  symlink,
  unlink,
} from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MIN_NODE_MAJOR = 22;
const isWindows = process.platform === 'win32';
const repoRoot = path.dirname(fileURLToPath(import.meta.url));
const homeDir = homedir();
const codexHome = path.resolve(process.env.CODEX_HOME || path.join(homeDir, '.codex'));

const managedFiles = [
  {
    label: 'Global AGENTS.md',
    source: path.join(repoRoot, 'global', 'AGENTS.md'),
    target: path.join(codexHome, 'AGENTS.md'),
    relativeBackupPath: 'AGENTS.md',
  },
  {
    label: 'Codex config.toml',
    source: path.join(repoRoot, 'config', 'config.toml'),
    target: path.join(codexHome, 'config.toml'),
    relativeBackupPath: 'config.toml',
  },
  {
    label: 'Codex default.rules',
    source: path.join(repoRoot, 'rules', 'default.rules'),
    target: path.join(codexHome, 'rules', 'default.rules'),
    relativeBackupPath: path.join('rules', 'default.rules'),
  },
];

const skillsSourceRoot = path.join(repoRoot, 'skills');
const userSkillsRoot = path.join(homeDir, '.agents', 'skills');
const retiredRepositorySkills = ['repository-context'];

function info(message) {
  console.log(`[codex-workflow] ${message}`);
}

function fail(message) {
  throw new Error(message);
}

async function exists(target) {
  try {
    await lstat(target);
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
}

async function resolvesTo(target, source) {
  try {
    const [targetReal, sourceReal] = await Promise.all([realpath(target), realpath(source)]);
    return targetReal === sourceReal;
  } catch {
    return false;
  }
}

async function filesEqual(first, second) {
  try {
    const [firstContent, secondContent] = await Promise.all([
      readFile(first),
      readFile(second),
    ]);
    return firstContent.equals(secondContent);
  } catch {
    return false;
  }
}

function timestamp() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    '-',
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
    '-',
    String(now.getMilliseconds()).padStart(3, '0'),
  ].join('');
}

function checkRuntime() {
  const nodeMajor = Number.parseInt(process.versions.node.split('.')[0], 10);
  if (!Number.isInteger(nodeMajor) || nodeMajor < MIN_NODE_MAJOR) {
    fail(`Node.js ${MIN_NODE_MAJOR} or newer is required. Current version: ${process.versions.node}`);
  }

  const git = spawnSync('git', ['--version'], { encoding: 'utf8' });
  if (git.error || git.status !== 0) {
    fail('Git is required and must be available on PATH.');
  }

  info(`Runtime verified: Node.js ${process.versions.node}, ${git.stdout.trim()}`);
}

async function validateSources() {
  for (const file of managedFiles) {
    if (!(await exists(file.source))) {
      fail(`Missing source file: ${file.source}`);
    }
  }

  if (!(await exists(skillsSourceRoot))) {
    fail(`Missing skills directory: ${skillsSourceRoot}`);
  }
}

async function installManagedFiles() {
  await mkdir(codexHome, { recursive: true });

  const changedFiles = [];
  for (const file of managedFiles) {
    if (!(await exists(file.target))) {
      changedFiles.push(file);
      continue;
    }

    if (await filesEqual(file.source, file.target)) {
      info(`${file.label} is already current: ${file.target}`);
      continue;
    }

    changedFiles.push(file);
  }

  if (changedFiles.length === 0) return;

  const backupRoot = path.join(codexHome, 'backups', timestamp());
  let createdBackup = false;

  for (const file of changedFiles) {
    if (await exists(file.target)) {
      const backupTarget = path.join(backupRoot, file.relativeBackupPath);
      await mkdir(path.dirname(backupTarget), { recursive: true });
      await copyFile(file.target, backupTarget);
      info(`Backed up ${file.target} -> ${backupTarget}`);
      createdBackup = true;
    }
  }

  for (const file of changedFiles) {
    await mkdir(path.dirname(file.target), { recursive: true });

    if (await exists(file.target)) {
      const targetStat = await lstat(file.target);
      if (targetStat.isDirectory() && !targetStat.isSymbolicLink()) {
        fail(`Refusing to replace directory with managed file: ${file.target}`);
      }
      if (targetStat.isSymbolicLink()) {
        await unlink(file.target);
      }
    }

    await copyFile(file.source, file.target);
    info(`${file.label} installed: ${file.target}`);
  }

  if (createdBackup) {
    info(`Backup completed: ${backupRoot}`);
  }
}

async function listRepositorySkills() {
  const entries = await readdir(skillsSourceRoot, { withFileTypes: true });
  const skills = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const source = path.join(skillsSourceRoot, entry.name);
    if (await exists(path.join(source, 'SKILL.md'))) {
      skills.push({ name: entry.name, source });
    }
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

async function linkSkillDirectory(name, source) {
  const target = path.join(userSkillsRoot, name);

  if (await exists(target)) {
    if (await resolvesTo(target, source)) {
      info(`Skill already linked: ${name}`);
      return;
    }
    fail(`Refusing to replace unrelated existing skill: ${target}`);
  }

  await symlink(source, target, isWindows ? 'junction' : 'dir');
  info(`Skill linked: ${name}`);
}

async function removeRetiredRepositorySkillLinks() {
  await mkdir(userSkillsRoot, { recursive: true });

  for (const name of retiredRepositorySkills) {
    const target = path.join(userSkillsRoot, name);
    if (!(await exists(target))) continue;

    const targetStat = await lstat(target);
    if (!targetStat.isSymbolicLink()) {
      info(`Retired skill left untouched because it is not a managed link: ${target}`);
      continue;
    }

    await unlink(target);
    info(`Retired repository skill link removed: ${name}`);
  }
}

async function installRepositorySkills() {
  await mkdir(userSkillsRoot, { recursive: true });
  const skills = await listRepositorySkills();

  if (skills.length === 0) {
    info('No repository skills containing SKILL.md were found.');
    return;
  }

  for (const skill of skills) {
    await linkSkillDirectory(skill.name, skill.source);
  }
}

function runNpx(args) {
  const executable = isWindows ? (process.env.ComSpec || 'cmd.exe') : 'npx';
  const executableArgs = isWindows ? ['/d', '/s', '/c', 'npx', ...args] : args;
  const result = spawnSync(executable, executableArgs, {
    cwd: repoRoot,
    env: process.env,
    stdio: 'inherit',
  });

  if (result.error || result.status !== 0) {
    fail('The Skills CLI could not install Repomix Explorer.');
  }
}

async function installRepomixExplorer() {
  const officialTarget = path.join(userSkillsRoot, 'repomix-explorer');
  if (await exists(path.join(officialTarget, 'SKILL.md'))) {
    info('Repomix Explorer is already available.');
    return;
  }

  info('Installing the official Repomix Explorer skill. Repomix itself will run through npx only when needed.');
  runNpx([
    '--yes',
    'skills@latest',
    'add',
    'yamadashy/repomix',
    '--skill',
    'repomix-explorer',
    '--agent',
    'codex',
    '--global',
    '--yes',
  ]);

  if (await exists(path.join(officialTarget, 'SKILL.md'))) {
    info('Repomix Explorer installed.');
    return;
  }

  fail('Repomix Explorer installation completed, but its SKILL.md could not be located.');
}

async function main() {
  checkRuntime();
  await validateSources();
  await installManagedFiles();
  await removeRetiredRepositorySkillLinks();
  await installRepositorySkills();
  await installRepomixExplorer();

  info('Installation complete. Restart Codex so the new configuration and rules are loaded.');
  info(`Codex home: ${codexHome}`);
  info(`User skills: ${userSkillsRoot}`);
}

main().catch((error) => {
  console.error(`[codex-workflow] ERROR: ${error.message}`);
  process.exitCode = 1;
});
