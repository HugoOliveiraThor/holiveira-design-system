# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Holiveira, please report it privately. Do not open a
public issue.

Email vulnerability reports to the repository maintainers. Include:

- A clear description of the vulnerability
- Steps to reproduce
- Affected package(s) and version range
- Any potential impact or exploit scenarios

## Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 5 business days
- **Fix timeline**: Depends on severity — critical vulnerabilities are addressed as quickly as
  possible

## Supported Versions

| Version       |          Supported           |
| ------------- | :--------------------------: |
| 1.x (latest)  |             Yes              |
| 0.x (beta/rc) | Yes, during prerelease cycle |
| < 0.x         |              No              |

## Scope

The security policy covers all packages under the `@ho-dev/*` namespace:

- All 16 public packages published to npm
- The repository infrastructure (CI workflows, build pipeline)
- Consumer-facing APIs and their documented behavior

Out of scope:

- Vulnerabilities in third-party dependencies (report to the upstream project)
- Misuse of the design system in consumer applications
- Social engineering or phishing attacks

## Dependency Security

Holiveira uses npm provenance for all published packages. Dependencies are locked via
`pnpm-lock.yaml`. Supply chain integrity is verified through:

- `--frozen-lockfile` installation in CI
- npm provenance attestation on all published packages
- Automated dependency checks via `check:deps` quality gate
