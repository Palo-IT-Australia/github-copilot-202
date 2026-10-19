---
applyTo: "**/*.ts"
---

# QE Playwright rules (reference answer for Concept 1)

Participants generate their own version with `/create-instructions`. Compare theirs to this one. It is the kind of file you want, not the only acceptable one.

## Test structure
- Import `test` and `expect` from `tests/fixtures`, never from `@playwright/test`.
- API tests use the typed clients from the fixtures (`flightsApi`, `bookingsApi`). Do not call `fetch` or build a new request context in a spec.
- UI locators live in page objects under `tests/pages/`. No raw locators in specs.
- Read URLs from `tests/config/env.ts`. Never hardcode URLs.

## Quality rules
- Prefer `getByRole`, `getByLabel`, `getByTestId`. No long CSS or XPath chains.
- Never use `waitForTimeout` or fixed sleeps. Use web-first assertions.
- Every test asserts behaviour: status code and typed response fields for API tests.
- Every test carries a tag such as `@api` or `@ui`.
- Do not weaken an assertion to make a test pass.

## Data and safety
- Synthetic data only. No secrets, credentials or real personal data in code or prompts.
