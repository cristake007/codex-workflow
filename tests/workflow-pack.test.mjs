import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const importedSkills = [
  'requirements-interview',
  'to-spec',
  'to-tickets',
  'tdd',
  'diagnosing-bugs',
  'domain-modeling',
  'codebase-design',
  'resolving-merge-conflicts',
  'knowledge-capture',
];

const requiredSections = [
  '## Purpose',
  '## Activate when',
  '## Do not activate when',
  '## Required context',
  '## Workflow',
  '## Stop conditions',
  '## Guardrails',
  '## Validation',
  '## Output',
];

const vaultTemplates = [
  'Session Review.md',
  'Decision.md',
  'Experiment.md',
  'Project Context.md',
  'Pattern.md',
  'Improvement Candidate.md',
];

test('adapted workflow skills follow the repository contract', async () => {
  for (const skillName of importedSkills) {
    const skillPath = path.join(repoRoot, 'skills', skillName, 'SKILL.md');
    const content = await readFile(skillPath, 'utf8');

    assert.match(content, /^---\n[\s\S]*?\nname:\s*[^\n]+\n[\s\S]*?description:\s*[^\n]+\n[\s\S]*?\n---\n/);
    assert.match(content, /^# .+/m);

    let previousIndex = -1;
    for (const section of requiredSections) {
      const sectionIndex = content.indexOf(section);
      assert.ok(sectionIndex > previousIndex, `${skillName}: missing or out-of-order ${section}`);
      previousIndex = sectionIndex;
    }
  }
});

test('Obsidian vault uses core templates and ignores volatile workspace state', async () => {
  const knowledgeRoot = path.join(repoRoot, 'knowledge');
  const corePlugins = JSON.parse(await readFile(path.join(knowledgeRoot, '.obsidian', 'core-plugins.json'), 'utf8'));
  const templateSettings = JSON.parse(await readFile(path.join(knowledgeRoot, '.obsidian', 'templates.json'), 'utf8'));
  const ignore = await readFile(path.join(knowledgeRoot, '.gitignore'), 'utf8');

  assert.ok(corePlugins.includes('templates'));
  assert.ok(corePlugins.includes('backlink'));
  assert.ok(corePlugins.includes('properties'));
  assert.equal(templateSettings.folder, 'Templates');
  assert.match(ignore, /\.obsidian\/workspace\.json/);
  assert.match(ignore, /\.obsidian\/workspaces\.json/);

  for (const templateName of vaultTemplates) {
    const template = await readFile(path.join(knowledgeRoot, 'Templates', templateName), 'utf8');
    assert.match(template, /^---\n/);
    assert.match(template, /\n---\n\n# /);
  }
});
