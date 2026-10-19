---
name: api-test-review
description: Review a Playwright API spec against QE guardrails (fixtures, typed clients, tags, assertions, no sleeps). Use when asked to review, check or audit an API test.
---

# API test review (reference answer for Concept 3)

Place at `.github/skills/api-test-review/SKILL.md`.

Review the spec the user names. Check each item and report **Pass** or **Fail**.

| Check | Pass when |
|---|---|
| Fixtures | `test` and `expect` come from `tests/fixtures` |
| Typed clients | Requests go through `flightsApi` or `bookingsApi`, with no raw `fetch` or `request.*` calls |
| Assertions | Status code and typed response fields are asserted |
| Tags | Every test has a tag such as `@api` |
| Waits | No `waitForTimeout` or sleeps |
| Data | Synthetic values only, with no secrets or hardcoded URLs |

Output format:
1. A summary line: `N pass, M fail`.
2. A **Pass** group and a **Fail** group, each item with the line number.
3. For each fail, a short suggested fix if it is a one-liner.
