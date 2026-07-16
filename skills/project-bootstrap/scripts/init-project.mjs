import {
  lstat,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workflowRoot = path.resolve(scriptDir, '..', '..', '..');
const rulesSourceRoot = path.join(workflowRoot, 'rules', 'ecosystems');
const environmentTemplate = path.join(workflowRoot, 'templates', 'environment.local.example.md');

const supportedEcosystems = ['php', 'python', 'javascript', 'shell', 'ios', 'docker'];

const markerDefinitions = {
  php: ['composer.json'],
  python: ['pyproject.toml', 'requirements.txt', 'Pipfile', 'setup.py', 'setup.cfg', 'poetry.lock', 'uv.lock'],
  javascript: [
    'package.json',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    'bun.lock',
    'bun.lockb',
    'deno.json',
    'deno.jsonc',
  ],
  shell: [],
  ios: ['Package.swift', 'Podfile', 'Cartfile'],
  docker: ['Dockerfile', 'compose.yaml', 'compose.yml', 'docker-compose.yaml', 'docker-compose.yml'],
};

const genericRootNames = new Set([
  '.git',
  '.gitignore',
  '.gitattributes',
  '.github',
  '.codex',
  'AGENTS.md',
  'AGENTS.override.md',
  '.DS_Store',
  'README',
  'README.md',
  'README.txt',
  'LICENSE',
  'LICENSE.md',
  'LICENSE.txt',
]);

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

function parseArgs(argv) {
  const options = {
    target: process.cwd(),
    ecosystems: [],
    mode: null,
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === '--help' || argument === '-h') {
      options.help = true;
      continue;
    }

    if (argument === '--dry-run') {
      options.dryRun = true;
      continue;
    }

    if (argument === '--target') {
      options.target = argv[index + 1];
      index += 1;
      continue;
    }

    if (argument === '--ecosystems') {
      options.ecosystems = (argv[index + 1] || '')
        .split(',')
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean);
      index += 1;
      continue;
    }

    if (argument === '--mode') {
      options.mode = argv[index + 1];
      index += 1;
      continue;
    }

    fail(`Unknown argument: ${argument}`);
  }

  if (!options.target) fail('--target requires a path.');
  if (options.mode && !['existing', 'greenfield'].includes(options.mode)) {
    fail('--mode must be existing or greenfield.');
  }

  return options;
}

function printHelp() {
  console.log(`Usage:
  node init-project.mjs [options]

Options:
  --target PATH                  Project root; defaults to the current directory
  --ecosystems LIST              Comma-separated: ${supportedEcosystems.join(',')}
  --mode existing|greenfield     Override automatic repository classification
  --dry-run                      Show the result without writing files
  --help                         Show this help

The script never chooses a greenfield technology stack. Select ecosystems only after user approval.`);
}

async function listRootEntries(targetRoot) {
  return readdir(targetRoot, { withFileTypes: true });
}

async function classifyRepository(targetRoot) {
  const entries = await listRootEntries(targetRoot);
  const meaningful = entries.filter((entry) => !genericRootNames.has(entry.name));
  return meaningful.length === 0 ? 'greenfield' : 'existing';
}

async function detectProject(targetRoot) {
  const entries = await listRootEntries(targetRoot);
  const rootNames = new Set(entries.map((entry) => entry.name));
  const markers = new Set();
  const ecosystems = new Set();

  for (const [ecosystem, names] of Object.entries(markerDefinitions)) {
    for (const name of names) {
      if (rootNames.has(name)) {
        ecosystems.add(ecosystem);
        markers.add(name);
      }
    }
  }

  for (const entry of entries) {
    if (entry.name.endsWith('.xcodeproj') || entry.name.endsWith('.xcworkspace')) {
      ecosystems.add('ios');
      markers.add(entry.name);
    }

    if (entry.isFile() && entry.name.endsWith('.sh')) {
      ecosystems.add('shell');
      markers.add(entry.name);
    }
  }

  const commonScriptDirectories = ['bin', 'scripts', 'tools'];
  for (const directory of commonScriptDirectories) {
    const directoryPath = path.join(targetRoot, directory);
    if (!(await exists(directoryPath))) continue;

    const stat = await lstat(directoryPath);
    if (!stat.isDirectory()) continue;

    const children = await readdir(directoryPath, { withFileTypes: true });
    for (const child of children) {
      if (child.isFile() && child.name.endsWith('.sh')) {
        ecosystems.add('shell');
        markers.add(path.join(directory, child.name).split(path.sep).join('/'));
      }
    }
  }

  return {
    ecosystems: [...ecosystems].sort(),
    markers: [...markers].sort(),
  };
}

function validateEcosystems(ecosystems) {
  const unique = [...new Set(ecosystems)];
  const unsupported = unique.filter((value) => !supportedEcosystems.includes(value));
  if (unsupported.length > 0) {
    fail(`Unsupported ecosystems: ${unsupported.join(', ')}. Supported values: ${supportedEcosystems.join(', ')}.`);
  }
  return unique.sort();
}

async function writeManagedFile(target, content, dryRun) {
  if (await exists(target)) {
    const current = await readFile(target, 'utf8');
    if (current === content) {
      console.log(`[project-bootstrap] Already current: ${target}`);
      return;
    }
    fail(`Refusing to overwrite an existing different file: ${target}`);
  }

  if (dryRun) {
    console.log(`[project-bootstrap] Would create: ${target}`);
    return;
  }

  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, 'utf8');
  console.log(`[project-bootstrap] Created: ${target}`);
}

async function copyManagedFile(source, target, dryRun) {
  const content = await readFile(source, 'utf8');
  await writeManagedFile(target, content, dryRun);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const targetRoot = path.resolve(options.target);
  if (!(await exists(targetRoot))) fail(`Target directory does not exist: ${targetRoot}`);
  if (!(await lstat(targetRoot)).isDirectory()) fail(`Target is not a directory: ${targetRoot}`);

  const detected = await detectProject(targetRoot);
  const inferredMode = await classifyRepository(targetRoot);
  const mode = options.mode || inferredMode;
  const explicitEcosystems = validateEcosystems(options.ecosystems);
  const ecosystems = explicitEcosystems.length > 0
    ? explicitEcosystems
    : validateEcosystems(detected.ecosystems);

  if (mode === 'greenfield' && explicitEcosystems.length === 0) {
    fail('This repository appears greenfield. Discuss the product, approve a technology stack, then rerun with --ecosystems.');
  }

  if (ecosystems.length === 0) {
    fail('No supported ecosystem was detected. Review the repository and rerun with --ecosystems.');
  }

  const codexRoot = path.join(targetRoot, '.codex');
  const projectRulesRoot = path.join(codexRoot, 'rules');
  const profile = {
    version: 1,
    mode,
    ecosystems,
    detectedEcosystems: detected.ecosystems,
    detectedMarkers: detected.markers,
  };

  console.log(`[project-bootstrap] Mode: ${mode}`);
  console.log(`[project-bootstrap] Selected ecosystems: ${ecosystems.join(', ')}`);
  if (detected.ecosystems.length > 0) {
    console.log(`[project-bootstrap] Detected ecosystems: ${detected.ecosystems.join(', ')}`);
  }

  await writeManagedFile(
    path.join(codexRoot, 'project-profile.json'),
    `${JSON.stringify(profile, null, 2)}\n`,
    options.dryRun,
  );

  await copyManagedFile(
    environmentTemplate,
    path.join(codexRoot, 'environment.local.example.md'),
    options.dryRun,
  );

  for (const ecosystem of ecosystems) {
    const source = path.join(rulesSourceRoot, `${ecosystem}.rules`);
    if (!(await exists(source))) fail(`Missing ecosystem rule template: ${source}`);
    await copyManagedFile(
      source,
      path.join(projectRulesRoot, `${ecosystem}.rules`),
      options.dryRun,
    );
  }

  console.log('[project-bootstrap] Project-local profile and rules are ready.');
  console.log('[project-bootstrap] Review or create the project AGENTS.md separately from confirmed project requirements.');
  console.log('[project-bootstrap] Trust the project and restart Codex before expecting .codex/rules to load.');
}

main().catch((error) => {
  console.error(`[project-bootstrap] ERROR: ${error.message}`);
  process.exitCode = 1;
});
