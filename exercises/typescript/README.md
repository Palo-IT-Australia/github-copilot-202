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

## Setup
```bash
cd exercises/typescript
npm install
```

## Run
```bash
npm start
```

## Verify Result
```bash
npm test
```

Successful verification means:
- TypeScript/Jest test run completes
- Existing tests pass
- Demo output shows create, update, deactivate, and filtered list behavior

## Concept Examples (Simple And Verifiable)

### 1. Instructions
Goal: enforce TypeScript service conventions.

Create:
- In Copilot Chat, type `/create-instructions`
- Use this example request:
	- "TypeScript service rules: avoid any, keep explicit return types, and throw clear errors for invalid or missing ids."
- Open the generated instructions file (`*.instructions.md`) in [`../../.github/`](../../.github/) (commonly in `.github/instructions/`, or `.github/copilot-instructions.md`) and review the content.

Execute:
- Ask Copilot: "In `exercises/typescript/user-service.ts`, improve error messages for not-found cases to include the user id."

Verify:
- Run:
```bash
cd exercises/typescript
npm test
```
- Confirm the test summary shows all tests passing (for example, "Test Suites: ... passed" and "Tests: ... passed").
- Add or update a test in `exercises/typescript/user-service.test.ts` that checks a not-found error includes the requested user id.
- Re-run `npm test` and confirm that test passes.
- Do a quick source check in `exercises/typescript/user-service.ts` to confirm not-found errors include the id.

### 2. Prompts
Goal: create a reusable test prompt for TS functions.

Create:
- In Copilot Chat, type `/create-prompt`
- Use this example request:
	- "Generate Jest tests for selected TypeScript function including happy path, edge case, and error case."
- Open the generated prompt file (`*.prompt.md`) in [`../../.github/`](../../.github/) (commonly in `.github/prompts/`) and review the content.

Execute:
- Open `exercises/typescript/user-service.ts` in VS Code and select the full `list` function.
- Open Copilot Chat and run your custom prompt while the function is selected.
- Accept the generated test changes.

Verify:
- Confirm new tests were added to `exercises/typescript/user-service.test.ts` for happy path, edge case, and error case.
- Run `npm test` and confirm pass.

### 3. Skills
Goal: package a reusable TypeScript review workflow.

Create:
- In Copilot Chat, type `/create-skill`
- Use this example request:
	- "Skill to review TypeScript service files for type safety, duplicate logic, and missing test coverage."
- Open the generated skill file in [`../../.github/`](../../.github/) (commonly `.github/skills/<skill-name>/SKILL.md`) and review the content.

Execute:
- In Copilot Chat, invoke the skill on `exercises/typescript/user-service.ts`.

Verify:
- Confirm the output includes checks for type safety, duplicate logic, and missing test coverage.
- Confirm it names at least one specific code location in `exercises/typescript/user-service.ts`.
- Confirm it gives either one concrete issue with a short fix suggestion, or an explicit "no issues found" statement with brief reasoning.

### 4. Agents
Goal: automate test completion workflow.

Create:
- In Copilot Chat, type `/create-agent`
- Use this example request:
	- "Agent that writes missing Jest tests for selected TypeScript file, runs tests, and fixes failing tests once."
- Open the generated agent file (`*.agent.md`) in [`../../.github/`](../../.github/) (commonly in `.github/agents/`) and review the content.

Execute:
- In Copilot Chat, ask: "Write missing tests for `exercises/typescript/user-service.ts`."

Verify:
- Confirm `exercises/typescript/user-service.test.ts` changes.
- Run `npm test` and confirm pass.

### 5. Hooks
Goal: run automatic validation after edits.

Create:
- In Copilot Chat, type `/create-hook`
- Use this example request:
	- "Post-tool hook: after editing files in exercises/typescript, run npm test in exercises/typescript."
- Open the generated hook configuration in [`../../.github/`](../../.github/) and review the content.

Execute:
- In Copilot Chat, ask for a tiny safe refactor in `exercises/typescript/user-service.ts`.

Verify:
- Confirm a test run starts automatically right after the edit (without manually running `npm test`).
- Confirm the command runs in `exercises/typescript` and prints Jest output.
- Confirm the terminal summary shows all tests passing.
