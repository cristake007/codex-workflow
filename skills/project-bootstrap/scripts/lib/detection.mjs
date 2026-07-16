import { lstat, readdir } from 'node:fs/promises';
import path from 'node:path';
import {
  capabilityMarkerDefinitions,
  genericRootNames,
  markerDefinitions,
} from './constants.mjs';
import { exists } from './utils.mjs';

async function rootEntries(targetRoot) {
  return readdir(targetRoot, { withFileTypes: true });
}

export async function classifyRepository(targetRoot) {
  const meaningful = (await rootEntries(targetRoot))
    .filter((entry) => !genericRootNames.has(entry.name));
  return meaningful.length === 0 ? 'greenfield' : 'existing';
}

async function inspectDirectory(targetRoot, directory, matcher, markers, capabilities) {
  const directoryPath = path.join(targetRoot, directory);
  if (!(await exists(directoryPath)) || !(await lstat(directoryPath)).isDirectory()) return;
  for (const child of await readdir(directoryPath, { withFileTypes: true })) {
    const capability = matcher(child.name);
    if (!capability) continue;
    capabilities.add(capability);
    markers.add(path.join(directory, child.name).split(path.sep).join('/'));
  }
}

export async function detectProject(targetRoot) {
  const entries = await rootEntries(targetRoot);
  const rootNames = new Set(entries.map((entry) => entry.name));
  const ecosystems = new Set();
  const markers = new Set();
  const capabilities = new Set();
  const capabilityMarkers = new Set();

  for (const [ecosystem, names] of Object.entries(markerDefinitions)) {
    for (const name of names) {
      if (!rootNames.has(name)) continue;
      ecosystems.add(ecosystem);
      markers.add(name);
    }
  }
  for (const [capability, names] of Object.entries(capabilityMarkerDefinitions)) {
    for (const name of names) {
      if (!rootNames.has(name)) continue;
      capabilities.add(capability);
      capabilityMarkers.add(name);
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
    if (entry.isFile() && entry.name.endsWith('.service')) {
      capabilities.add('linux');
      capabilityMarkers.add(entry.name);
    }
  }

  for (const directory of ['bin', 'scripts', 'tools']) {
    const directoryPath = path.join(targetRoot, directory);
    if (!(await exists(directoryPath)) || !(await lstat(directoryPath)).isDirectory()) continue;
    for (const child of await readdir(directoryPath, { withFileTypes: true })) {
      const relative = path.join(directory, child.name).split(path.sep).join('/');
      if (child.isFile() && child.name.endsWith('.sh')) {
        ecosystems.add('shell');
        markers.add(relative);
      }
      if (child.isFile() && child.name.endsWith('.service')) {
        capabilities.add('linux');
        capabilityMarkers.add(relative);
      }
    }
  }

  await inspectDirectory(
    targetRoot,
    '.github/workflows',
    (name) => /codeql|security/i.test(name) ? 'application-security' : null,
    capabilityMarkers,
    capabilities,
  );

  for (const directory of ['ansible', 'infra', 'infrastructure', 'ops', 'systemd']) {
    if (!rootNames.has(directory)) continue;
    capabilities.add('linux');
    capabilityMarkers.add(`${directory}/`);
  }

  return {
    ecosystems: [...ecosystems].sort(),
    markers: [...markers].sort(),
    capabilities: [...capabilities].sort(),
    capabilityMarkers: [...capabilityMarkers].sort(),
  };
}
