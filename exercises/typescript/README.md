# TypeScript Track

## What This Codebase Does
This track implements a typed user management service with in-memory storage:
- create and update users
- find by id/email
- deactivate and remove users
- list with pagination and optional role filtering

Main files:
- `types.ts`: domain and DTO types
- `user-service.ts`: service logic
- `main.ts`: runnable demo
- `user-service.test.ts`: unit tests

## Prerequisites
- Node.js 18+

## Setup
All OS:
```bash
cd exercises/typescript
npm install
```

## Run
All OS:
```bash
npm start
```

## Verify Result
All OS:
```bash
npm test
```

Successful verification means:
- Jest command exits with code `0`
- Output includes a `Test Suites:` line with `passed`
- Output includes a `Tests:` line with `passed`
- Demo output shows create, update, deactivate, and filtered list behavior

## Concept Examples (Simple And Verifiable)

### 1. Instructions
Goal: enforce TypeScript service conventions.

Create:
- In Copilot Chat, type `/create-instructions` and press Enter.
- Use this example request:
	- "TypeScript service rules: avoid any, keep explicit return types, and throw clear errors for invalid or missing ids. Name it `ts-user-service-rules`."
- Open [`.github/instructions/ts-user-service-rules.instructions.md`](../../.github/instructions/ts-user-service-rules.instructions.md) and review the content.

Execute:
- Open `exercises/typescript/user-service.ts` in the editor.
- Ask Copilot: "In `exercises/typescript/user-service.ts`, improve error messages for not-found cases to include the user id."

Verify:
- Run:
```bash
cd exercises/typescript
npm test
```
- Confirm the command exits with code `0`.
- Confirm output includes a `Test Suites:` line with `passed`.
- Confirm output includes a `Tests:` line with `passed`.
- Open `exercises/typescript/user-service.test.ts` in the editor.
- Ask Copilot: "In `exercises/typescript/user-service.test.ts`, add or update a test that checks a not-found error includes the requested user id."
- Review and accept the test change.
- Re-run `npm test` and confirm the command exits with code `0`, and output includes both `Test Suites:` with `passed` and `Tests:` with `passed`.
- Do a source check in `exercises/typescript/user-service.ts` to confirm not-found errors include the requested id.

### 2. Prompts
Goal: create a reusable test prompt for TS functions.

Create:
- In Copilot Chat, type `/create-prompt` and press Enter.
- Use this example request:
	- "Generate Jest tests for selected TypeScript function including happy path, edge case, and pagination boundary case. Name it `ts-list-function-tests`."
- Open [`.github/prompts/ts-list-function-tests.prompt.md`](../../.github/prompts/ts-list-function-tests.prompt.md) and review the content.

Execute:
- Open `exercises/typescript/user-service.ts` in the editor and select the full `list` function.
- With the function selected, open Copilot Chat, type `/ts-list-function-tests`, and press Enter.
- Accept the generated test changes.

Verify:
- Open `exercises/typescript/user-service.test.ts` in the editor and confirm it contains new `list` function tests for happy path, edge case, and pagination boundary case, with assertions on the returned users and pagination result.
- Run `npm test` and confirm the command exits with code `0`.
- Confirm output includes a `Test Suites:` line with `passed`.
- Confirm output includes a `Tests:` line with `passed`.

### 3. Skills
Goal: package a reusable TypeScript review workflow.

Create:
- In Copilot Chat, type `/create-skill` and press Enter.
- Use this example request:
	- "Skill to review TypeScript service files for type safety, duplicate logic, and missing test coverage. Name it `ts-service-review`."
- Open [`.github/skills/ts-service-review/SKILL.md`](../../.github/skills/ts-service-review/SKILL.md) and review the content.

Execute:
- Open `exercises/typescript/user-service.ts` in the editor.
- In Copilot Chat, type `/ts-service-review exercises/typescript/user-service.ts` and press Enter.

Verify:
- Confirm the output explicitly includes all three check labels: `type safety`, `duplicate logic`, and `missing test coverage`.
- Confirm it names at least one code location in `exercises/typescript/user-service.ts`.
- Confirm it includes either one concrete issue with a short fix suggestion, or the exact phrase `no issues found` with brief reasoning.

### 4. Agents
Goal: use a custom agent to add missing tests, run them, and update source code if it needs to fix a failure.

Create:
- In Copilot Chat, type `/create-agent` and press Enter.
- Use this example request:
	- "Agent that writes missing Jest tests for a selected TypeScript file, runs tests, and if a test fails, updates the related source code to fix it once. Name it `ts-test-fixer`."
- Open [`.github/agents/ts-test-fixer.agent.md`](../../.github/agents/ts-test-fixer.agent.md) and review the content.

Execute:
- Open `exercises/typescript/user-service.ts` in the editor.
- Open `exercises/typescript/user-service.test.ts` in the editor.
- In Copilot Chat, ask: "Write missing tests for `exercises/typescript/user-service.ts`."

Verify:
- Open `exercises/typescript/user-service.test.ts` in the editor and confirm it changed with at least one new test for behavior in `exercises/typescript/user-service.ts`.
- Open `exercises/typescript/user-service.ts` in the editor and confirm whether the agent also changed source code to fix a failing behavior.
- Run `npm test` and confirm the command exits with code `0`.
- Confirm output includes a `Test Suites:` line with `passed`.
- Confirm output includes a `Tests:` line with `passed`.

### 5. Hooks
Goal: run automatic validation after edits.

Create:
- In Copilot Chat, type `/create-hook` and press Enter.
- Use this example request:
	- "Post-tool hook: after editing files in exercises/typescript, run npm test in exercises/typescript. Name it `ts-post-edit-tests`."
- Open the generated `ts-post-edit-tests` hook configuration in [`../../.github/`](../../.github/) and review the content.

Execute:
- Open `exercises/typescript/user-service.ts` in the editor.
- Ask Copilot: "In `exercises/typescript/user-service.ts`, make a tiny safe refactor."

Verify:
- Confirm a test run starts automatically right after the edit (without manually running `npm test`).
- Confirm the command runs in `exercises/typescript` and executes `npm test`.
- Confirm the command exits with code `0`.
- Confirm output includes a `Test Suites:` line with `passed`.
- Confirm output includes a `Tests:` line with `passed`.
