import { spawnSync } from 'node:child_process';
import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
  stat,
  symlink,
  writeFile,
} from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MIN_NODE_MAJOR = 22;
const isWindows = process.platform === 'win32';
const repoRoot = path.dirname(fileURLToPath(import.meta.url));
const homeDir = homedir();
const codexHome = path.resolve(process.env.CODEX_HOME || path.join(homeDir, '.codex'));
const globalAgentsSource = path.join(repoRoot, 'global', 'AGENTS.md');
const globalAgentsTarget = path.join(codexHome, 'AGENTS.md');
const agentsCopyMarker = path.join(codexHome, '.codex-workflow-agents.json');
const skillsSourceRoot = path.join(repoRoot, 'skills');
const userSkillsRoot = path.join(homeDir, '.agents', 'skills');

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

async function isSameFile(target, source) {
  try {
    const [targetStat, sourceStat] = await Promise.all([stat(target), stat(source)]);
    return targetStat.dev === sourceStat.dev && targetStat.ino === sourceStat.ino;
  } catch {
    return false;
  }
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
  if (!(await exists(globalAgentsSource))) {
    fail(`Missing global instructions: ${globalAgentsSource}`);
  }
  if (!(await exists(skillsSourceRoot))) {
    fail(`Missing skills directory: ${skillsSourceRoot}`);
  }
}

async function readManagedCopyMarker() {
  if (!(await exists(agentsCopyMarker))) return null;
  try {
    return JSON.parse(await readFile(agentsCopyMarker, 'utf8'));
  } catch {
    fail(`Invalid installer marker: ${agentsCopyMarker}`);
  }
}

async function writeManagedAgentsCopy() {
  await copyFile(globalAgentsSource, globalAgentsTarget);
  await writeFile(
    agentsCopyMarker,
    `${JSON.stringify({ source: path.resolve(globalAgentsSource), mode: 'managed-copy' }, null, 2)}\n`,
    'utf8',
  );
  info(`Global AGENTS.md installed as a managed copy: ${globalAgentsTarget}`);
  info('Windows could not create a file symlink. Re-run node install.mjs after git pull to refresh the copy.');
}

async function installGlobalAgents() {
  await mkdir(codexHome, { recursive: true });

  if (await exists(globalAgentsTarget)) {
    if ((await resolvesTo(globalAgentsTarget, globalAgentsSource)) || (await isSameFile(globalAgentsTarget, globalAgentsSource))) {
      info(`Global AGENTS.md already linked: ${globalAgentsTarget}`);
      return;
    }

    const marker = await readManagedCopyMarker();
    if (marker?.mode === 'managed-copy' && path.resolve(marker.source) === path.resolve(globalAgentsSource)) {
      await writeManagedAgentsCopy();
      return;
    }

    fail(`Refusing to replace unrelated existing path: ${globalAgentsTarget}`);
  }

  try {
    await symlink(globalAgentsSource, globalAgentsTarget, 'file');
    info(`Global AGENTS.md linked: ${globalAgentsTarget}`);
  } catch (error) {
    if (!isWindows) throw error;
    await writeManagedAgentsCopy();
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
  const executable = isWindows ? 'npx.cmd' : 'npx';
  const result = spawnSync(executable, args, {
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

  const possibleSources = [
    path.join(codexHome, 'skills', 'repomix-explorer'),
    path.join(homeDir, '.codex', 'skills', 'repomix-explorer'),
  ];

  for (const source of possibleSources) {
    if (await exists(path.join(source, 'SKILL.md'))) {
      await linkSkillDirectory('repomix-explorer', source);
      info('Repomix Explorer installed and linked into the current Codex user-skill location.');
      return;
    }
  }

  fail('Repomix Explorer installation completed, but its SKILL.md could not be located.');
}

async function main() {
  checkRuntime();
  await validateSources();
  await installGlobalAgents();
  await installRepositorySkills();
  await installRepomixExplorer();

  info('Installation complete. Restart Codex if newly installed skills do not appear immediately.');
  info(`Global instructions: ${globalAgentsTarget}`);
  info(`User skills: ${userSkillsRoot}`);
}

main().catch((error) => {
  console.error(`[codex-workflow] ERROR: ${error.message}`);
  process.exitCode = 1;
});
