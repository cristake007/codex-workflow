---
name: ecosystem-ios
description: Apply established Apple platform conventions when implementing or reviewing Swift, SwiftUI, UIKit, Xcode, package, test, signing, entitlement, or iOS behavior, including bounded .swift work. Activate only when Apple-platform judgment affects the result. Do not activate merely because Swift files exist or another workflow runs a generic check.
---

# iOS Ecosystem

## Purpose

Apply the declared Swift, Xcode, platform, architecture, dependency, signing, and validation conventions.

## Activate when

- implementing or reviewing Swift, SwiftUI, UIKit, tests, or Apple platform behavior;
- changing packages, project settings, targets, entitlements, signing boundaries, assets, or builds;
- concurrency, navigation, persistence, state ownership, compatibility, or release configuration matters.

## Do not activate when

- choosing unapproved greenfield platforms or frameworks;
- the task is textual, administrative, or only runs a generic check for another workflow;
- no Apple-platform decision affects the result.

## Required context

Confirm Swift, Xcode, platform and deployment versions, target type, framework patterns, dependency manager, signing and entitlement boundaries, declared destinations and checks, and generated or sensitive files.

## Workflow

1. Reuse known facts; inspect only missing package, project, target, entitlement, or build configuration.
2. Preserve versions, target boundaries, architecture, deployment targets, and framework conventions.
3. Follow existing state, concurrency, navigation, persistence, networking, and dependency patterns.
4. Keep UI, domain, persistence, networking, and platform-service ownership clear.
5. Use only the selected dependency manager.
6. Treat project files, assets, signing, provisioning, entitlements, and release settings as sensitive.
7. Validate the changed behavior with the smallest declared target or test selection.

## Stop conditions

Stop when the requested behavior is implemented and checked, uncertainty cannot affect compatibility or signing, or a dependency, target, capability, signing, archive, upload, or release decision requires approval.

## Guardrails

- Do not change dependency managers, signing, provisioning, entitlements, capabilities, bundle identifiers, targets, or release settings silently.
- Do not perform automatic signing, certificate changes, archives, TestFlight, or App Store actions without approval.
- Do not assume simulator names, schemes, devices, signing identities, or destinations.
- Do not hand-edit generated assets or build output.

## Validation

- Check the implementation against the request and affected target boundaries.
- Use declared targeted build, test, lint, or package commands.
- Avoid signing-dependent, archive, upload, device, or broad builds unless required.
- State simulator, device, signing, accessibility, performance, integration, or release behavior not verified.

## Output

Report platform changes or conclusions, affected targets and sensitive settings, dependency or generated-file impacts, targeted checks, manual validation, and release risks.