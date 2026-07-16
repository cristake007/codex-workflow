---
name: ecosystem-python
description: Apply Python ecosystem conventions to a Python repository after the project stack is known. Use for Python modules, packages, frameworks, type checking, testing, migrations, and Python-specific review. Do not use to choose Python for a greenfield project.
---

# Python Ecosystem

- Follow the repository's supported Python version, packaging standard, virtual-environment workflow, formatter, linter, and type checker.
- Use the existing package manager and update lockfiles only through that tool.
- Keep import-time side effects minimal and make dependencies explicit.
- Prefer clear modules and typed boundaries over unnecessary class hierarchies or metaprogramming.
- Preserve framework-native patterns for configuration, migrations, dependency injection, and request handling.
- Validate external data before it enters domain logic and handle async, resource, and transaction boundaries deliberately.
- Use only repository-approved targeted checks; do not assume pytest, mypy, Ruff, Django, FastAPI, or another tool without evidence.
