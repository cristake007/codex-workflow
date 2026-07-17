import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
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
const backupsRoot = path.join(codexHome, 'backups');

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
const repomixMetadataPath = path.join(
  userSkillsRoot,
  'repomix-explorer',
  'agents',
  'openai.yaml',
);
const repomixMetadataBackupPath = path.join(
  'skills',
  'repomix-explorer',
  'agents',
  'openai.yaml',
);
const repomixPolicyContent = [
  'policy:',
  '  allow_implicit_invocation: false',
  '',
].join('\n');

function info(message) {
  console.log(`[codex-workflow] ${message}`);
}

function fail(message) {
  throw new Error(message);
}

function parseArguments(argv) {
  let dryRun = false;

  for (const argument of argv) {
    if (argument === '--dry-run') {
      dryRun = true;
      continue;
    }

    if (argument === '--help' || argument === '-h') {
      console.log([
        'Usage: node uninstall.mjs [--dry-run]',
        '',
        '  --dry-run  Show the changes without modifying the filesystem.',
      ].join('\n'));
      return { dryRun, help: true };
    }

    fail(`Unknown argument: ${argument}`);
  }

  return { dryRun, help: false };
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

function pathsEqual(first, second) {
  const normalizedFirst = path.normalize(first);
  const normalizedSecond = path.normalize(second);
  return isWindows
    ? normalizedFirst.toLowerCase() === normalizedSecond.toLowerCase()
    : normalizedFirst === normalizedSecond;
}

async function resolvesTo(target, source) {
  try {
    const [targetReal, sourceReal] = await Promise.all([realpath(target), realpath(source)]);
    return pathsEqual(targetReal, sourceReal);
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

function enforceExplicitInvocationPolicy(content) {
  const newline = content.includes('\r\n') ? '\r\n' : '\n';
  const lines = content.split(/\r?\n/);
  const blockPolicyIndex = lines.findIndex((line) => /^policy:\s*(?:#.*)?$/.test(line));

  if (blockPolicyIndex !== -1) {
    let sectionEnd = lines.length;
    for (let index = blockPolicyIndex + 1; index < lines.length; index += 1) {
      const line = lines[index];
      if (line.trim() === '' || line.trimStart().startsWith('#')) continue;
      if (/^\S/.test(line)) {
        sectionEnd = index;
        break;
      }
    }

    const settingIndex = lines.findIndex(
      (line, index) => index > blockPolicyIndex
        && index < sectionEnd
        && /^\s+allow_implicit_invocation\s*:/.test(line),
    );

    if (settingIndex !== -1) {
      const indentation = lines[settingIndex].match(/^\s*/)?.[0] || '  ';
      lines[settingIndex] = `${indentation}allow_implicit_invocation: false`;
    } else {
      lines.splice(blockPolicyIndex + 1, 0, '  allow_implicit_invocation: false');
    }

    return lines.join(newline);
  }

  const inlinePolicyIndex = lines.findIndex((line) => /^policy:\s*\{.*\}\s*(?:#.*)?$/.test(line));
  if (inlinePolicyIndex !== -1) {
    const match = lines[inlinePolicyIndex].match(/^policy:\s*\{(.*)\}\s*(#.*)?$/);
    if (!match) fail('Could not parse the existing inline Repomix policy metadata.');

    let body = match[1].trim();
    if (/\ballow_implicit_invocation\s*:/.test(body)) {
      body = body.replace(
        /\ballow_implicit_invocation\s*:\s*(?:true|false)/,
        'allow_implicit_invocation: false',
      );
    } else {
      body = body ? `${body}, allow_implicit_invocation: false` : 'allow_implicit_invocation: false';
    }

    const comment = match[2] ? ` ${match[2]}` : '';
    lines[inlinePolicyIndex] = `policy: { ${body} }${comment}`;
    return lines.join(newline);
  }

  const trimmedEnd = content.replace(/[\r\n]+$/, '');
  const separator = trimmedEnd.length === 0 ? '' : `${newline}${newline}`;
  return `${trimmedEnd}${separator}policy:${newline}  allow_implicit_invocation: false${newline}`;
}

function checkRuntime() {
  const nodeMajor = Number.parseInt(process.versions.node.split('.')[0], 10);
  if (!Number.isInteger(nodeMajor) || nodeMajor < MIN_NODE_MAJOR) {
    fail(`Node.js ${MIN_NODE_MAJOR} or newer is required. Current version: ${process.versions.node}`);
  }

  info(`Runtime verified: Node.js ${process.versions.node}`);
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

async function listBackupDirectories() {
  if (!(await exists(backupsRoot))) return [];

  const rootStat = await lstat(backupsRoot);
  if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) {
    info(`Backup path left untouched because it is not a normal directory: ${backupsRoot}`);
    return [];
  }

  const entries = await readdir(backupsRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(backupsRoot, entry.name))
    .sort((first, second) => second.localeCompare(first));
}

function isPathInside(candidate, parent) {
  const relative = path.relative(parent, candidate);
  return relative !== '' && !relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative);
}

async function listBackupCandidates(backupDirectories, relativeBackupPath) {
  const candidates = [];

  for (const backupDirectory of backupDirectories) {
    const candidate = path.join(backupDirectory, relativeBackupPath);
    if (!(await exists(candidate))) continue;

    const candidateStat = await lstat(candidate);
    if (!candidateStat.isFile() || candidateStat.isSymbolicLink()) {
      info(`Ignoring unsafe backup candidate: ${candidate}`);
      continue;
    }

    const [backupReal, candidateReal] = await Promise.all([
      realpath(backupDirectory),
      realpath(candidate),
    ]);
    if (!isPathInside(candidateReal, backupReal)) {
      info(`Ignoring backup candidate outside its backup directory: ${candidate}`);
      continue;
    }

    candidates.push(candidate);
  }

  return candidates;
}

async function restoreFile(backup, target, dryRun, label) {
  if (dryRun) {
    info(`[dry-run] Would restore ${label}: ${backup} -> ${target}`);
    return;
  }

  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(backup, target);
  info(`${label} restored: ${backup} -> ${target}`);
}

async function removeFile(target, dryRun, label) {
  if (dryRun) {
    info(`[dry-run] Would remove ${label}: ${target}`);
    return;
  }

  await unlink(target);
  info(`${label} removed: ${target}`);
}

async function uninstallManagedFiles(backupDirectories, dryRun) {
  for (const file of managedFiles) {
    if (!(await exists(file.target))) {
      info(`${file.label} is not installed: ${file.target}`);
      continue;
    }

    const targetStat = await lstat(file.target);
    if (!targetStat.isFile() || targetStat.isSymbolicLink()) {
      info(`${file.label} left untouched because the target is not a managed regular file: ${file.target}`);
      continue;
    }

    if (!(await filesEqual(file.source, file.target))) {
      info(`${file.label} left untouched because it differs from the repository source: ${file.target}`);
      continue;
    }

    const candidates = await listBackupCandidates(
      backupDirectories,
      file.relativeBackupPath,
    );
    const [backup] = candidates;

    if (backup) {
      await restoreFile(backup, file.target, dryRun, file.label);
    } else {
      await removeFile(file.target, dryRun, file.label);
    }
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

  return skills.sort((first, second) => first.name.localeCompare(second.name));
}

async function uninstallRepositorySkills(dryRun) {
  const skills = await listRepositorySkills();

  for (const skill of skills) {
    const target = path.join(userSkillsRoot, skill.name);
    if (!(await exists(target))) continue;

    const targetStat = await lstat(target);
    if (!targetStat.isSymbolicLink()) {
      info(`Skill left untouched because it is not a managed link: ${target}`);
      continue;
    }

    if (!(await resolvesTo(target, skill.source))) {
      info(`Skill left untouched because the link does not point into this repository: ${target}`);
      continue;
    }

    await removeFile(target, dryRun, `repository skill ${skill.name}`);
  }
}

async function findMatchingRepomixBackup(backupDirectories, currentContent) {
  const candidates = await listBackupCandidates(
    backupDirectories,
    repomixMetadataBackupPath,
  );

  for (const candidate of candidates) {
    const backupContent = await readFile(candidate, 'utf8');
    if (enforceExplicitInvocationPolicy(backupContent) === currentContent) {
      return candidate;
    }
  }

  return null;
}

async function restoreRepomixMetadata(backupDirectories, dryRun) {
  if (!(await exists(repomixMetadataPath))) {
    info('Repomix Explorer metadata is not present; the external skill is left untouched.');
    return;
  }

  const metadataStat = await lstat(repomixMetadataPath);
  if (!metadataStat.isFile() || metadataStat.isSymbolicLink()) {
    info(`Repomix metadata left untouched because it is not a normal file: ${repomixMetadataPath}`);
    return;
  }

  const currentContent = await readFile(repomixMetadataPath, 'utf8');
  const matchingBackup = await findMatchingRepomixBackup(backupDirectories, currentContent);

  if (matchingBackup) {
    await restoreFile(
      matchingBackup,
      repomixMetadataPath,
      dryRun,
      'Repomix Explorer metadata',
    );
    return;
  }

  if (currentContent === repomixPolicyContent) {
    await removeFile(repomixMetadataPath, dryRun, 'installer-created Repomix Explorer metadata');
    return;
  }

  info('Repomix metadata left untouched because its current content cannot be proven to be installer-managed.');
}

async function main() {
  const { dryRun, help } = parseArguments(process.argv.slice(2));
  if (help) return;

  checkRuntime();
  await validateSources();
  const backupDirectories = await listBackupDirectories();

  if (dryRun) {
    info('Dry-run mode enabled. No files or links will be changed.');
  }

  await uninstallManagedFiles(backupDirectories, dryRun);
  await uninstallRepositorySkills(dryRun);
  await restoreRepomixMetadata(backupDirectories, dryRun);

  info('Repository projects and backup directories were preserved.');
  info('Repomix Explorer was preserved because it is an external skill, not a repository-managed skill.');
  info(dryRun ? 'Dry run complete.' : 'Uninstallation complete. Restart Codex to reload its configuration.');
}

main().catch((error) => {
  console.error(`[codex-workflow] ERROR: ${error.message}`);
  process.exitCode = 1;
});
