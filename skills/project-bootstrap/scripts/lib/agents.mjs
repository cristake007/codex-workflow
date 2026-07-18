import { fail, parseContentList } from './utils.mjs';

const listKeys = [
  'importantPaths', 'protectedPaths', 'includedScope', 'nonGoals',
  'projectRules', 'prohibitedActions', 'automaticChecks', 'manualChecks',
];

export function normalizeAnswers(rawAnswers = {}, defaults = {}) {
  const result = { ...defaults, ...rawAnswers };
  for (const key of listKeys) result[key] = parseContentList(result[key]);
  return result;
}

function bullets(values) {
  return values.map((value) => `- ${value}`).join('\n');
}

function addSection(sections, title, body) {
  const trimmed = String(body || '').trim();
  if (trimmed) sections.push(`## ${title}\n\n${trimmed}`);
}

function addNamedList(parts, title, values) {
  if (values.length) parts.push(`### ${title}\n\n${bullets(values)}`);
}

export function renderAgents(answers, profile) {
  if (!answers.projectName || !answers.purpose || !answers.sourceOfTruth) {
    fail('AGENTS.md generation requires projectName, purpose, and sourceOfTruth.');
  }

  const sections = [
    '# Project Agent Instructions',
    '> This file contains only repository-specific facts, constraints, and validation rules. Global behavior remains defined by the user\'s global `AGENTS.md`.',
  ];

  const overview = [`- Project name: ${answers.projectName}`, `- Purpose: ${answers.purpose}`];
  if (answers.projectType) overview.push(`- Project type: ${answers.projectType}`);
  if (answers.status) overview.push(`- Current status: ${answers.status}`);
  if (answers.intendedUsers) overview.push(`- Intended users: ${answers.intendedUsers}`);
  addSection(sections, 'Project Overview', overview.join('\n'));

  addSection(
    sections,
    'Functional Source of Truth',
    `${bullets([answers.sourceOfTruth])}\n\nInstruction priority:\n\n1. current explicit user request;\n2. designated functional source of truth;\n3. this project \`AGENTS.md\`;\n4. established project conventions and existing implementation.\n\nReport material contradictions before implementation.`,
  );

  const technology = [];
  if (profile.ecosystems.length) technology.push(`- Approved ecosystems: ${profile.ecosystems.join(', ')}`);
  if (profile.capabilities.length) technology.push(`- Enabled capabilities: ${profile.capabilities.join(', ')}`);
  if (answers.environment) technology.push(`- Development and runtime environment: ${answers.environment}`);
  if (answers.supportedPlatforms) technology.push(`- Supported platforms or versions: ${answers.supportedPlatforms}`);
  technology.push('- Do not introduce a new language, framework, database, service, or major dependency without a current requirement and explicit notice.');
  addSection(sections, 'Technology and Environment', technology.join('\n'));

  const structure = [];
  if (answers.importantPaths.length) structure.push(`### Important Locations\n\n${bullets(answers.importantPaths)}`);
  if (answers.protectedPaths.length) structure.push(`### Protected or Generated Locations\n\n${bullets(answers.protectedPaths)}`);
  if (structure.length) {
    structure.push('Inspect the existing structure before creating new directories, naming conventions, modules, or architectural layers.');
    addSection(sections, 'Repository Structure', structure.join('\n\n'));
  }

  const constraints = [];
  addNamedList(constraints, 'Included Scope', answers.includedScope);
  addNamedList(constraints, 'Non-Goals', answers.nonGoals);
  addNamedList(constraints, 'Project-Specific Rules', answers.projectRules);
  addNamedList(constraints, 'Prohibited Actions', answers.prohibitedActions);
  if (constraints.length) addSection(sections, 'Scope and Constraints', constraints.join('\n\n'));

  const security = [];
  if (answers.sensitiveData) security.push(`- Sensitive data handled: ${answers.sensitiveData}`);
  if (answers.authentication) security.push(`- Authentication and authorization: ${answers.authentication}`);
  if (answers.productionAccess) security.push(`- Production access: ${answers.productionAccess}`);
  if (answers.auditLogging) security.push(`- Audit or logging: ${answers.auditLogging}`);
  if (answers.externalSystems) security.push(`- External systems that must not be modified: ${answers.externalSystems}`);
  if (answers.compatibility) security.push(`- Compatibility requirements: ${answers.compatibility}`);
  if (security.length) addSection(sections, 'Security and Compatibility', security.join('\n'));

  const validation = [];
  if (answers.automaticChecks.length) {
    validation.push(`### Checks Codex May Run Automatically\n\n\`\`\`text\n${answers.automaticChecks.join('\n')}\n\`\`\``);
  }
  if (answers.manualChecks.length) {
    validation.push(`### Checks Codex Must Provide for Manual Execution\n\n\`\`\`text\n${answers.manualChecks.join('\n')}\n\`\`\``);
  }
  if (validation.length) {
    validation.push('Never report a check as passed unless it was actually executed successfully.');
    addSection(sections, 'Validation', validation.join('\n\n'));
  }

  addSection(sections, 'Completion Criteria', bullets([
    'the requested behavior matches the functional source of truth;',
    'the implementation remains within the declared scope and constraints;',
    'security, compatibility, and protected-location requirements are respected;',
    'approved automatic checks have completed successfully;',
    'required manual validation commands are provided;',
    'dependency, environment, and generated-artifact changes are reported;',
    'known limitations and unverified behavior are stated.',
  ]));
  return `${sections.join('\n\n')}\n`;
}
