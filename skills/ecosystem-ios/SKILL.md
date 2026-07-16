---
name: ecosystem-ios
description: Apply Apple platform and iOS ecosystem conventions after the project target is known. Use for Swift, SwiftUI, UIKit, Xcode projects, Swift Package Manager, testing, signing boundaries, and iOS-specific review. Do not use to choose iOS technologies for a greenfield product.
---

# iOS Ecosystem

- Respect the supported Swift, Xcode, iOS, macOS, architecture, and deployment-target versions declared by the project.
- Follow the existing SwiftUI, UIKit, concurrency, navigation, persistence, and dependency patterns.
- Keep UI state, domain behavior, persistence, networking, and platform services clearly owned.
- Use Swift Package Manager, CocoaPods, or other dependency tooling only when already selected by the project; do not mix managers casually.
- Treat project files, generated assets, signing settings, entitlements, provisioning, and release configuration as sensitive change areas.
- Avoid automatic signing, provisioning updates, archive uploads, or App Store actions without explicit approval.
- Use repository-approved targeted build and test destinations; do not assume simulator names or signing identities.
