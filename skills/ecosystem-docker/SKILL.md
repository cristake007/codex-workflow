---
name: ecosystem-docker
description: Apply Docker and container workflow conventions when containers are already part of the project or explicitly approved. Use for Dockerfiles, Compose, image builds, persistent services, volumes, networking, and container-specific review. Do not introduce containers automatically.
---

# Docker Ecosystem

- Inspect existing Dockerfiles, Compose files, bind mounts, volumes, networks, health checks, and runtime expectations before changes.
- Reuse persistent project services when instructed; do not create disposable containers, databases, or parallel infrastructure unless explicitly permitted.
- Keep build-time and runtime concerns separate and avoid baking secrets into images or committed configuration.
- Preserve persistent data and distinguish container recreation from volume deletion.
- Pin base images and dependencies according to repository policy, balancing reproducibility and supported security updates.
- Keep images minimal only when that does not reduce debuggability or compatibility.
- Announce build, start, stop, recreate, prune, and volume-affecting operations before execution and follow project-specific validation limits.
