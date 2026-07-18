import path from 'node:path';
import { stdin as input, stdout as output } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { supportedCapabilities, supportedEcosystems } from './constants.mjs';
import { fail, parseContentList, parseList, validateSelections } from './utils.mjs';

async function ask(rl, label, defaultValue = '', required = false) {
  const suffix = defaultValue ? ` [${defaultValue}]` : '';
  while (true) {
    const value = (await rl.question(`${label}${suffix}: `)).trim();
    const result = value || String(defaultValue || '').trim();
    if (result || !required) return result;
    console.log('A value is required.');
  }
}

export async function collectInteractiveAnswers({ targetRoot, inferredMode, detected, options, seedAnswers }) {
  const rl = createInterface({ input, output });
  try {
    console.log('[project-bootstrap] Interactive project setup. Press Enter to accept a shown default.');
    const mode = await ask(rl, 'Repository mode (existing or greenfield)', options.mode || seedAnswers.mode || inferredMode, true);
    if (!['existing', 'greenfield'].includes(mode)) fail('Repository mode must be existing or greenfield.');

    const ecosystemDefault = options.ecosystems.join(',')
      || parseList(seedAnswers.ecosystems).join(',')
      || (mode === 'existing' ? detected.ecosystems.join(',') : '');
    const capabilityDefault = options.capabilities.join(',')
      || parseList(seedAnswers.capabilities).join(',')
      || (mode === 'existing' ? detected.capabilities.join(',') : '');

    const ecosystems = validateSelections(
      parseList(await ask(rl, `Approved ecosystems (${supportedEcosystems.join(', ')})`, ecosystemDefault)),
      supportedEcosystems,
      'ecosystems',
    );
    const capabilities = validateSelections(
      parseList(await ask(rl, `Optional capabilities (${supportedCapabilities.join(', ')})`, capabilityDefault)),
      supportedCapabilities,
      'capabilities',
    );
    if (mode === 'greenfield' && !ecosystems.length && !capabilities.length) {
      fail('A greenfield repository requires at least one user-approved ecosystem or capability.');
    }

    const answers = {
      ...seedAnswers,
      mode,
      ecosystems,
      capabilities,
      projectName: await ask(rl, 'Project name', seedAnswers.projectName || path.basename(targetRoot), true),
      purpose: await ask(rl, 'What does this project do', seedAnswers.purpose, true),
      projectType: await ask(rl, 'Project type', seedAnswers.projectType || 'application'),
      status: await ask(rl, 'Current status', seedAnswers.status || (mode === 'greenfield' ? 'new' : 'active development')),
      intendedUsers: await ask(rl, 'Who uses it', seedAnswers.intendedUsers),
      sourceOfTruth: await ask(rl, 'Functional source of truth', seedAnswers.sourceOfTruth || 'Current explicit user requirements', true),
      environment: await ask(rl, 'Where is it developed and where does it run', seedAnswers.environment),
      supportedPlatforms: await ask(rl, 'Supported platforms or versions', seedAnswers.supportedPlatforms),
      importantPaths: parseContentList(await ask(rl, 'Important paths (semicolon-separated)', parseContentList(seedAnswers.importantPaths).join('; '))),
      protectedPaths: parseContentList(await ask(rl, 'Protected or generated paths (semicolon-separated)', parseContentList(seedAnswers.protectedPaths).join('; '))),
      includedScope: parseContentList(await ask(rl, 'Included scope (semicolon-separated)', parseContentList(seedAnswers.includedScope).join('; '))),
      nonGoals: parseContentList(await ask(rl, 'Non-goals (semicolon-separated)', parseContentList(seedAnswers.nonGoals).join('; '))),
      projectRules: parseContentList(await ask(rl, 'Project-specific rules (semicolon-separated)', parseContentList(seedAnswers.projectRules).join('; '))),
      prohibitedActions: parseContentList(await ask(rl, 'Prohibited actions (semicolon-separated)', parseContentList(seedAnswers.prohibitedActions).join('; '))),
      automaticChecks: parseContentList(await ask(rl, 'Fast checks Codex may run automatically (semicolon-separated)', parseContentList(seedAnswers.automaticChecks).join('; '))),
      manualChecks: parseContentList(await ask(rl, 'Checks Codex must only provide for you to run (semicolon-separated)', parseContentList(seedAnswers.manualChecks).join('; '))),
    };

    if (options.advanced || capabilities.some((value) => value.endsWith('security'))) {
      answers.sensitiveData = await ask(rl, 'Sensitive data handled', seedAnswers.sensitiveData);
      answers.authentication = await ask(rl, 'Authentication and authorization requirements', seedAnswers.authentication);
      answers.productionAccess = await ask(rl, 'Production access rules', seedAnswers.productionAccess || 'Not allowed unless explicitly requested');
      answers.auditLogging = await ask(rl, 'Audit or logging requirements', seedAnswers.auditLogging);
      answers.externalSystems = await ask(rl, 'External systems that must not be modified', seedAnswers.externalSystems);
      answers.compatibility = await ask(rl, 'Compatibility requirements', seedAnswers.compatibility);
    }
    return answers;
  } finally {
    rl.close();
  }
}
