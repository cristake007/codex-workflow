import { lstat, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export function fail(message) {
  throw new Error(message);
}

export async function exists(target) {
  try {
    await lstat(target);
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
}

export function requireArgumentValue(argv, index, flag) {
  const value = argv[index + 1];
  if (!value || value.startsWith('--')) fail(`${flag} requires a value.`);
  return value;
}

export function parseList(value) {
  const items = Array.isArray(value) ? value : String(value || '').split(',');
  return items.map((item) => String(item).trim().toLowerCase()).filter(Boolean);
}

export function parseContentList(value) {
  const items = Array.isArray(value) ? value : String(value || '').split(';');
  return items.map((item) => String(item).trim()).filter(Boolean);
}

export function validateSelections(values, supported, label) {
  const unique = [...new Set(values)].sort();
  const unsupported = unique.filter((value) => !supported.includes(value));
  if (unsupported.length) {
    fail(`Unsupported ${label}: ${unsupported.join(', ')}. Supported values: ${supported.join(', ')}.`);
  }
  return unique;
}

export async function readAnswers(answersPath, targetRoot) {
  if (!answersPath) return {};
  const resolved = path.resolve(targetRoot, answersPath);
  if (!(await exists(resolved))) fail(`Answers file does not exist: ${resolved}`);
  try {
    const parsed = JSON.parse(await readFile(resolved, 'utf8'));
    if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
      fail('Answers JSON must contain one object.');
    }
    return parsed;
  } catch (error) {
    fail(`Could not parse answers JSON: ${error.message}`);
  }
}

export async function writeManagedFile(target, content, dryRun) {
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

export async function copyManagedFile(source, target, dryRun) {
  await writeManagedFile(target, await readFile(source, 'utf8'), dryRun);
}
