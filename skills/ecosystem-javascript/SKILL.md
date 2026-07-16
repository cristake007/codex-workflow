---
name: ecosystem-javascript
description: Apply JavaScript or TypeScript ecosystem conventions after the project stack is known. Use for Node.js, browser applications, package managers, frontend frameworks, builds, tests, and JS/TS-specific review. Do not use to choose JavaScript for a greenfield project.
---

# JavaScript and TypeScript Ecosystem

- Respect the declared runtime, module system, package manager, framework, TypeScript settings, browser targets, and repository conventions.
- Use the existing package manager; never hand-edit lockfiles.
- Prefer platform and framework features already in use before adding utilities or dependencies.
- Keep state ownership, side effects, network boundaries, and asynchronous failure paths explicit.
- Preserve server/client boundaries and avoid exposing secrets or privileged logic to browser bundles.
- Treat build output, generated clients, transpiled files, and framework caches as generated content.
- Run only repository-approved targeted lint, type, test, or build checks; do not assume script names.
