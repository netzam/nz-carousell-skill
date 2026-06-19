---
name: carousell-har-backend-sync
description: Implement Carousell CLI live-backend flows from captured HAR files while preserving local-store defaults and adding regression tests.
---

# Carousell HAR-backed live backend sync

Use this skill when implementing or updating `ncm` / `nz-carousell-manager` flows from captured Carousell HAR files.

## Trigger conditions

- A user provides one or more `.har` files from Carousell flows
- The task is to add a new live backend endpoint or replace an outdated one
- The task mentions `ncm`, `Carousell CLI`, listings, account verification, publish, delete, or profile flows

## Goals

- Mirror the captured live Carousell request sequence accurately
- Keep local-store behavior intact unless the live backend is explicitly enabled
- Add or update CLI wiring, provider methods, and tests together
- Redact secrets, tokens, passwords, and one-time codes from any user-facing output
- Keep the suite green and verify the exact request paths/payloads

## Workflow

1. **Inspect the HARs first**
   - Extract the ordered request sequence.
   - Record:
     - HTTP method
     - path
     - query params
     - key request body fields
     - any dependency ordering between requests
   - Treat the HAR as the source of truth for endpoint selection.

2. **Map the flow to existing provider boundaries**
   - Identify whether the change belongs in:
     - account operations
     - listing operations
     - publish/posting operations
     - auth/session bootstrap
   - Preserve the existing local backend path unless the live backend is enabled.

3. **Implement the live backend method**
   - Add a dedicated method instead of overloading unrelated commands.
   - Normalize flexible inputs when needed, but keep the request payload aligned with the HAR.
   - Use defensive HTTP handling:
     - validate status codes
     - surface non-2xx responses clearly
     - handle malformed or partial responses explicitly
   - Never print or log secrets in plain text.

4. **Wire the CLI**
   - Add a focused subcommand or flag set for the new flow.
   - Keep parser help text consistent with actual behavior.
   - Emit structured JSON when the command returns data.

5. **Add regression tests**
   - Mock the live backend with a small HTTP server or equivalent test harness.
   - Assert the exact sequence of calls.
   - Assert critical payload fields and request counts.
   - Verify that local-store behavior is unchanged.

6. **Update documentation**
   - Add concise README examples.
   - Document whether the flow is live-backend only or available in both modes.
   - Note any special requirements such as a phone code, captcha token, listing id, or device fingerprint.

7. **Validate end-to-end**
   - Run targeted tests for the touched area first.
   - Then run the full suite.
   - Fix any drift between HAR paths and the test server paths before finalizing.

## Common pitfalls

- Missing query params that the live backend expects
- Using an old endpoint when Carousell has moved to a newer listing-quota or product path
- Accidentally changing local-store defaults
- Logging request/response bodies that contain credentials or verification codes
- Updating docs but forgetting parser help text or tests
- Treating optional follow-up calls as required when the HAR shows they are conditional

## Practical checks

- The flow should still work if live backend is disabled
- The live test server should match the exact request path shape from the HAR
- Every newly added command should have CLI parser coverage
- The final test run should be green

## If deletion or verification is involved

- Keep verification and deletion flows separate from publish flows unless the HAR proves they are coupled
- Model post-registration verification as a distinct account operation
- For deletes, prefer the exact product/listing delete endpoint shown by the live backend
- For account refresh steps, preserve the original request ordering from the HAR

## Packaging for distribution

This skill is also packaged as an `npx`-friendly repository:

- GitHub repo: `netzam/nz-carousell-skill`
- Entry command: `npx github:netzam/nz-carousell-skill install`

The package should:

- ship this `SKILL.md` verbatim
- expose a small CLI that can print the skill or install it into the local Hermes skills directory
- avoid bundling any secrets or live credentials

## Success criteria

- The implementation matches the captured Carousell flow
- The CLI exposes the new operation cleanly
- The suite passes
- No secrets are exposed
- Local behavior stays stable
- The skill can be distributed from the GitHub repo via `npx`
