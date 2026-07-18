import { lstat } from 'node:fs/promises';
import path from 'node:path';
import {
  capabilityRulesSourceRoot,
  ecosystemRulesSourceRoot,
  environmentTemplate,
  supportedCapabilities,
  supportedEcosystems,
} from './lib/constants.mjs';
import { classifyRepository, detectProject } from './lib/detection.mjs';
import { normalizeAnswers, renderAgents } from './lib/agents.mjs';
import { collectInteractiveAnswers } from './lib/questions.mjs';
import {
  copyManagedFile,
  exists,
  fail,
  parseList,
  readAnswers,
  requireArgumentValue,
  validateSelections,
  writeManagedFile,
} from './lib/utils.mjs';

function parseArgs(argv) {
  const options = {
    target: process.cwd(), ecosystems: [], capabilities: [], mode: null,
    answersPath: null, interactive: false, advanced: false, dryRun: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--help' || argument === '-h') options.help = true;
    else if (argument === '--dry-run') options.dryRun = true;
    else if (argument === '--interactive') options.interactive = true;
    else if (argument === '--advanced') options.advanced = true;
    else if (argument === '--target') options.target = requireArgumentValue(argv, index++, '--target');
    else if (argument === '--ecosystems') options.ecosystems = parseList(requireArgumentValue(argv, index++, '--ecosystems'));
    else if (argument === '--capabilities') options.capabilities = parseList(requireArgumentValue(argv, index++, '--capabilities'));
    else if (argument === '--mode') options.mode = requireArgumentValue(argv, index++, '--mode');
    else if (argument === '--answers') options.answersPath = requireArgumentValue(argv, index++, '--answers');
    else fail(`Unknown argument: ${argument}`);
  }
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
  --capabilities LIST            Comma-separated: ${supportedCapabilities.join(',')}
  --mode existing|greenfield     Override automatic repository classification
  --interactive                  Ask concise questions and generate AGENTS.md
  --advanced                     Add security and compatibility questions
  --answers FILE                 Generate AGENTS.md from JSON answers
  --dry-run                      Show the result without writing files
  --help                         Show this help

The script never chooses a greenfield stack. Select ecosystems or capabilities only after user approval.`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return printHelp();
  const targetRoot = path.resolve(options.target);
  if (!(await exists(targetRoot))) fail(`Target directory does not exist: ${targetRoot}`);
  if (!(await lstat(targetRoot)).isDirectory()) fail(`Target is not a directory: ${targetRoot}`);

  const detected = await detectProject(targetRoot);
  const inferredMode = await classifyRepository(targetRoot);
  let answers = normalizeAnswers(await readAnswers(options.answersPath, targetRoot));
  if (options.interactive) {
    answers = normalizeAnswers(await collectInteractiveAnswers({
      targetRoot, inferredMode, detected, options, seedAnswers: answers,
    }));
  }

  const mode = options.mode || answers.mode || inferredMode;
  if (!['existing', 'greenfield'].includes(mode)) fail('Repository mode must be existing or greenfield.');

  const selectedEcosystems = validateSelections(options.ecosystems, supportedEcosystems, 'ecosystems');
  const answerEcosystems = validateSelections(parseList(answers.ecosystems), supportedEcosystems, 'ecosystems');
  const ecosystems = selectedEcosystems.length
    ? selectedEcosystems
    : answerEcosystems.length ? answerEcosystems : detected.ecosystems;

  const selectedCapabilities = validateSelections(options.capabilities, supportedCapabilities, 'capabilities');
  const answerCapabilities = validateSelections(parseList(answers.capabilities), supportedCapabilities, 'capabilities');
  const capabilities = selectedCapabilities.length ? selectedCapabilities : answerCapabilities;

  if (mode === 'greenfield' && !ecosystems.length && !capabilities.length) {
    fail('This repository appears greenfield. Discuss the product, approve a technology stack or operational capability, then rerun with explicit selections, --interactive, or --answers.');
  }
  if (!ecosystems.length && !capabilities.length) {
    fail('No supported ecosystem or capability was selected.');
  }

  const profile = {
    version: 2, mode, ecosystems, capabilities,
    detectedEcosystems: detected.ecosystems,
    detectedMarkers: detected.markers,
    detectedCapabilities: detected.capabilities,
    detectedCapabilityMarkers: detected.capabilityMarkers,
  };
  const codexRoot = path.join(targetRoot, '.codex');
  const rulesRoot = path.join(codexRoot, 'rules');

  console.log(`[project-bootstrap] Mode: ${mode}`);
  console.log(`[project-bootstrap] Selected ecosystems: ${ecosystems.join(', ') || 'none'}`);
  console.log(`[project-bootstrap] Selected capabilities: ${capabilities.join(', ') || 'none'}`);
  if (detected.capabilities.length) console.log(`[project-bootstrap] Capability hints: ${detected.capabilities.join(', ')}`);

  await writeManagedFile(
    path.join(codexRoot, 'project-profile.json'),
    `${JSON.stringify(profile, null, 2)}\n`,
    options.dryRun,
  );
  await copyManagedFile(environmentTemplate, path.join(codexRoot, 'environment.local.example.md'), options.dryRun);

  for (const ecosystem of ecosystems) {
    const source = path.join(ecosystemRulesSourceRoot, `${ecosystem}.rules`);
    if (!(await exists(source))) fail(`Missing ecosystem rule template: ${source}`);
    await copyManagedFile(source, path.join(rulesRoot, `${ecosystem}.rules`), options.dryRun);
  }
  for (const capability of capabilities) {
    const source = path.join(capabilityRulesSourceRoot, `${capability}.rules`);
    if (!(await exists(source))) fail(`Missing capability rule template: ${source}`);
    await copyManagedFile(source, path.join(rulesRoot, `${capability}.rules`), options.dryRun);
  }

  if (options.interactive || options.answersPath) {
    const finalAnswers = normalizeAnswers({
      ...answers, mode, ecosystems, capabilities,
      projectName: answers.projectName || path.basename(targetRoot),
    });
    await writeManagedFile(path.join(targetRoot, 'AGENTS.md'), renderAgents(finalAnswers, profile), options.dryRun);
  }

  console.log('[project-bootstrap] Project-local profile and selected rules are ready.');
  if (!options.interactive && !options.answersPath) {
    console.log('[project-bootstrap] Run again with --interactive or --answers to generate a concise project AGENTS.md.');
  }
  console.log('[project-bootstrap] Trust the project and restart Codex before expecting .codex/rules to load.');
}

main().catch((error) => {
  console.error(`[project-bootstrap] ERROR: ${error.message}`);
  process.exitCode = 1;
});
