---
name: ecosystem-ios
description: Apply established Apple platform conventions whenever reviewing or modifying Swift, SwiftUI, UIKit, Xcode projects, Swift Package Manager configuration, tests, signing boundaries, entitlements, or iOS-specific behavior, including bounded single-file work on .swift files. Activate after the Apple platform target is established or approved. Do not activate to choose iOS technologies for an unapproved greenfield product.
---

# iOS Ecosystem

## Purpose

Apply the project's declared Swift, Xcode, platform, architecture, dependency, signing, and validation conventions without inventing targets or release actions.

## Activate when

- implementing or reviewing Swift, SwiftUI, UIKit, Apple platform services, tests, or application behavior;
- changing `Package.swift`, Xcode project settings, deployment targets, entitlements, signing boundaries, assets, or build configuration;
- Swift concurrency, navigation, persistence, networking, state ownership, platform compatibility, or generated project content affect the task;
- a bounded single-file review or edit still requires Apple platform-specific judgment.

## Do not activate when

- selecting platforms, languages, UI frameworks, or dependency tools for a greenfield product before user approval;
- the repository has no established or approved Apple platform scope;
- the task is purely textual, administrative, or unrelated to Swift or Apple platform behavior;
- repository discovery is still required to determine the target platform;
- another skill owns the task and no iOS-specific decision remains.

An exact file path is not by itself a reason to skip this skill when the requested work changes or reviews Swift or Apple platform behavior.

## Required context

Use facts already available in the prompt and conversation. Establish only missing platform-specific context:

- supported Swift, Xcode, iOS, macOS, architecture, and deployment-target versions;
- SwiftUI, UIKit, concurrency, navigation, persistence, networking, and dependency patterns;
- Swift Package Manager, CocoaPods, or other selected dependency tooling;
- application, extension, library, widget, or framework target type;
- signing, entitlements, provisioning, capabilities, bundle identifiers, and release restrictions;
- repository-approved build, test, simulator, device, and destination commands;
- generated assets, project files, build output, signing files, and protected configuration.

## Workflow

1. Read the nearest applicable `AGENTS.md`.
2. Reuse Apple platform, target, dependency, signing, and validation facts already present in the prompt or conversation.
3. If context is missing, inspect only the nearest `Package.swift`, Xcode project or workspace metadata, target configuration, entitlement file, and documented build commands.
4. Preserve supported versions, target boundaries, architecture, deployment targets, and existing framework conventions.
5. Follow established SwiftUI, UIKit, concurrency, navigation, persistence, networking, and dependency patterns.
6. Keep UI state, domain behavior, persistence, networking, and platform services clearly owned.
7. Use only the dependency manager already selected by the project; do not mix managers casually.
8. Treat project files, generated assets, signing settings, entitlements, provisioning, and release configuration as sensitive change areas.
9. Avoid automatic signing, provisioning, archive upload, distribution, or App Store actions without explicit approval.
10. Run only repository-approved targeted build or test checks using known destinations.

## Stop conditions

Stop when:

- the requested Swift or Apple platform behavior is resolved;
- target, version, framework, dependency, and signing assumptions are confirmed sufficiently;
- remaining uncertainty does not affect compatibility, state ownership, signing, build, or release behavior;
- the next step requires an unapproved dependency, capability, signing change, archive, upload, device, or broad build;
- further inspection would expand beyond the affected target or platform boundary.

## Guardrails

- Do not select SwiftUI, UIKit, persistence, navigation, or dependency approaches for greenfield work without approval.
- Do not mix dependency managers or hand-edit generated dependency artifacts.
- Do not change signing, provisioning, entitlements, capabilities, bundle identifiers, deployment targets, or release configuration silently.
- Do not perform automatic signing, certificate changes, provisioning updates, archive uploads, TestFlight, or App Store actions without explicit authorization.
- Do not assume simulator names, device availability, signing identities, schemes, or destinations.
- Do not hand-edit generated assets or build output.

## Validation

- Use only repository-declared targeted build, test, lint, or package commands.
- Scope validation to the affected target, scheme, module, or test selection when possible.
- Avoid signing-dependent, archive, upload, device, or broad multi-destination builds unless explicitly requested.
- Confirm generated project or asset changes only through the repository's documented tooling.
- State clearly which simulator, device, signing, integration, performance, accessibility, or release behavior remains unverified.

## Output

Report only:

- Apple platform-specific conclusions or changes;
- affected targets, versions, frameworks, dependencies, entitlements, or signing boundaries;
- generated or sensitive project files affected;
- targeted checks executed;
- manual validation still required;
- important unverified assumptions and release risks.
