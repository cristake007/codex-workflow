---
name: ecosystem-docker
description: Apply established Docker and container workflow conventions whenever reviewing or modifying Dockerfiles, Compose configuration, image builds, persistent services, volumes, bind mounts, networks, health checks, or container-specific behavior. Activate when containers are already part of the project or explicitly approved. Do not activate to introduce containers automatically or for work where container-specific conventions cannot affect the result.
---

# Docker Ecosystem

## Purpose

Apply the project's existing container, image, service, persistence, networking, and validation conventions without creating unnecessary infrastructure or risking data loss.

## Activate when

- implementing or reviewing Dockerfiles, Compose files, container entrypoints, image builds, or container runtime configuration;
- changing services, networks, ports, bind mounts, volumes, health checks, environment handling, or persistent data behavior;
- container recreation, build reproducibility, image compatibility, service dependencies, or host/container boundaries affect the task;
- a bounded single-file review still requires Docker-specific judgment.

## Do not activate when

- containers are not established or approved for the project;
- the task is selecting infrastructure for a greenfield project before user approval;
- the task is purely textual, administrative, or unrelated to container behavior;
- repository discovery is still required to determine whether Docker is in scope;
- another skill owns the task and no Docker-specific decision remains.

An exact Dockerfile or Compose path is not by itself a reason to skip this skill when the requested work changes or reviews container behavior.

## Required context

Use facts already available in the prompt and conversation. Establish only missing container-specific context:

- Docker, Compose, container runtime, and supported platform versions;
- existing Dockerfiles, Compose projects, service names, images, and build contexts;
- bind mounts, named volumes, persistent data, ownership, and backup expectations;
- networks, published ports, reverse proxies, health checks, and service dependencies;
- build-time versus runtime configuration and secret handling;
- persistent versus disposable environments and explicit restrictions on temporary infrastructure;
- repository-approved build, validation, start, stop, recreate, and cleanup commands;
- generated images, caches, artifacts, and protected data paths.

## Workflow

1. Read the nearest applicable `AGENTS.md`.
2. Reuse container, persistence, network, and validation facts already present in the prompt or conversation.
3. If context is missing, inspect only the nearest Dockerfile, Compose file, environment example, entrypoint, and relevant service configuration.
4. Preserve existing service names, build contexts, networks, ports, mounts, volumes, health checks, and runtime expectations.
5. Reuse persistent project services when instructed; do not create disposable containers, databases, or parallel infrastructure unless explicitly permitted.
6. Keep build-time and runtime concerns separate and keep secrets out of images and committed configuration.
7. Distinguish container recreation from image removal, volume deletion, data deletion, and host cleanup.
8. Pin images and dependencies according to repository policy while preserving supported security updates and compatibility.
9. Keep images minimal only when that does not reduce debuggability, compatibility, or operational clarity.
10. Announce build, start, stop, recreate, prune, network, and volume-affecting operations before execution.
11. Run only repository-approved targeted validation proportional to the change.

## Stop conditions

Stop when:

- the requested container behavior or review question is resolved;
- service, network, persistence, and build assumptions are confirmed sufficiently;
- remaining uncertainty does not affect data safety, connectivity, compatibility, or runtime behavior;
- the next step requires creating infrastructure, rebuilding persistent services, changing production, pruning resources, or deleting volumes without approval;
- further inspection would expand beyond the affected container boundary.

## Guardrails

- Do not introduce Docker or additional container infrastructure without approval.
- Do not create disposable containers, databases, networks, or services unless explicitly permitted.
- Do not delete or prune images, containers, networks, bind-mounted data, or volumes without explicit authorization.
- Do not bake secrets into images, Dockerfiles, layers, build arguments, logs, or committed environment files.
- Do not confuse container recreation with persistent-data deletion.
- Do not change published ports, public exposure, network boundaries, health checks, or service dependencies silently.
- Do not assume command names, Compose project names, or safe cleanup scope without repository evidence.

## Validation

- Use targeted Dockerfile or Compose configuration validation when available and permitted.
- Inspect effective service, mount, volume, network, and port configuration before runtime changes.
- Do not automatically build images, start or recreate services, create temporary environments, or run integration tests unless explicitly requested.
- After an approved runtime change, verify only the affected service health, logs, ports, networks, and persistent data.
- State clearly which build, runtime, integration, persistence, production, or recovery behavior remains unverified.

## Output

Report only:

- Docker-specific conclusions or changes;
- affected images, services, ports, networks, mounts, volumes, health checks, and dependencies;
- persistent-data and secret-handling impacts;
- targeted checks executed;
- runtime commands requiring user execution or approval;
- important unverified assumptions and rollback needs.
