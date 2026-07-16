import path from 'node:path';
import { fileURLToPath } from 'node:url';

const libDir = path.dirname(fileURLToPath(import.meta.url));
export const workflowRoot = path.resolve(libDir, '..', '..', '..', '..');
export const ecosystemRulesSourceRoot = path.join(workflowRoot, 'rules', 'ecosystems');
export const capabilityRulesSourceRoot = path.join(workflowRoot, 'rules', 'capabilities');
export const environmentTemplate = path.join(workflowRoot, 'templates', 'environment.local.example.md');

export const supportedEcosystems = ['php', 'python', 'javascript', 'shell', 'ios', 'docker'];
export const supportedCapabilities = ['linux', 'application-security', 'server-security'];

export const markerDefinitions = {
  php: ['composer.json'],
  python: ['pyproject.toml', 'requirements.txt', 'Pipfile', 'setup.py', 'setup.cfg', 'poetry.lock', 'uv.lock'],
  javascript: [
    'package.json', 'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock',
    'bun.lock', 'bun.lockb', 'deno.json', 'deno.jsonc',
  ],
  shell: [],
  ios: ['Package.swift', 'Podfile', 'Cartfile'],
  docker: ['Dockerfile', 'compose.yaml', 'compose.yml', 'docker-compose.yaml', 'docker-compose.yml'],
};

export const capabilityMarkerDefinitions = {
  linux: ['ansible.cfg', 'Vagrantfile', 'cloud-init.yaml', 'cloud-init.yml'],
  'application-security': [
    'SECURITY.md', '.semgrep.yml', '.semgrep.yaml',
    'codeql-config.yml', 'codeql-config.yaml',
  ],
  'server-security': ['Caddyfile', 'nginx.conf', 'sshd_config', 'fail2ban.local'],
};

export const genericRootNames = new Set([
  '.git', '.gitignore', '.gitattributes', '.github', '.codex',
  'AGENTS.md', 'AGENTS.override.md', '.DS_Store',
  'README', 'README.md', 'README.txt',
  'LICENSE', 'LICENSE.md', 'LICENSE.txt',
]);
