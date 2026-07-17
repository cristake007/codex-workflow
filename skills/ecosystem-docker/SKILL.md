---
name: ecosystem-docker
description: Apply established container conventions when implementing or reviewing Dockerfiles, Compose, images, services, volumes, mounts, networks, health checks, or host/container behavior. Activate only when container-specific judgment affects the result. Do not activate merely because a project uses Docker or another workflow inspects container files.
---

# Docker Ecosystem

## Purpose

Apply existing image, service, persistence, network, secret, and validation conventions without creating unnecessary infrastructure or risking data.

## Activate when

- implementing or reviewing Dockerfiles, Compose, entrypoints, builds, or runtime configuration;
- changing services, ports, networks, mounts, volumes, health checks, dependencies, or persistence;
- recreation, build reproducibility, compatibility, or host/container boundaries matter.

## Do not activate when

- containers are not established or approved;
- another workflow merely observes Docker files or service status;
- no container-specific decision affects the result.

## Required context

Confirm runtime and Compose versions, service and image names, build contexts, ports and networks, mounts and persistent data, health checks, secrets, environment type, approved commands, and protected data.

## Workflow

1. Reuse known facts; inspect only missing Dockerfile, Compose, entrypoint, environment, or service configuration.
2. Preserve service names, builds, networks, ports, mounts, volumes, health checks, and dependencies.
3. Reuse persistent services when instructed; do not create parallel infrastructure without permission.
4. Separate build-time and runtime concerns and keep secrets out of images and committed configuration.
5. Distinguish recreation from image, container, network, volume, or data deletion.
6. Announce runtime or persistence-affecting operations before execution.
7. Validate changed configuration with the smallest approved checks.

## Stop conditions

Stop when the requested behavior is implemented and checked, uncertainty cannot affect data or connectivity, or the next step creates infrastructure, rebuilds persistent services, changes production, prunes resources, or deletes data without approval.

## Guardrails

- Do not introduce containers or disposable infrastructure without approval.
- Do not prune or delete containers, images, networks, mounts, volumes, or data without authorization.
- Do not bake secrets into images, layers, arguments, logs, or committed environment files.
- Do not change public exposure, persistence, health checks, or dependencies silently.

## Validation

- Check the implementation against the request and affected container boundaries.
- Use targeted Dockerfile or Compose configuration validation.
- Do not build, start, recreate, or integrate services unless explicitly required.
- After approved runtime changes, verify only affected health, logs, ports, networks, mounts, and data.
- State build, runtime, persistence, production, or recovery behavior not verified.

## Output

Report container changes or conclusions, affected services and persistence, secret and exposure impacts, targeted checks, commands requiring approval, rollback, and limitations.