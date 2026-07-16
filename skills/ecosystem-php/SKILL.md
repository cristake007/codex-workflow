---
name: ecosystem-php
description: Apply PHP ecosystem conventions to a PHP repository after the project stack is known. Use for PHP source, Composer packages, PHP frameworks, static analysis, testing, packaging, and PHP-specific review. Do not use to choose PHP for a greenfield project.
---

# PHP Ecosystem

- Follow the PHP version, framework conventions, autoloading, namespaces, and package structure already declared by the repository.
- Use Composer for dependency and lockfile changes; never hand-edit `composer.lock`.
- Prefer strict types when consistent with the project and avoid adding framework-independent abstractions that duplicate framework facilities.
- Keep domain rules outside controllers, templates, persistence adapters, and framework metadata when the existing architecture supports that separation.
- Validate inputs at boundaries and preserve declared backward compatibility for public APIs, schemas, extensions, and packages.
- Use repository-approved checks such as targeted `php -l`, PHPStan/Psalm, coding standards, and tests. Do not assume commands that are not present in the project.
- Treat framework caches, generated proxies, vendor files, and packaged artifacts as generated content.
