# JavaScript Track

## What This Codebase Does
This track implements a shopping cart with item management and checkout calculations:
- subtotal
- volume discount tiers
- coupon handling (percent and fixed)
- tax and total calculation

Main files:
- `cart.js`: cart domain logic
- `main.js`: runnable demo
- `cart.test.js`: unit tests

## Setup
```bash
cd exercises/javascript
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
- Jest runs without crashing
- Existing tests pass
- Cart behavior in demo output is consistent with discount, coupon, and tax rules

## Concept Examples (Simple And Verifiable)

### 1. Instructions
Goal: make Copilot follow JavaScript rules for this track.

Create:
- In Copilot Chat, type `/create-instructions`
- Use this example request:
	- "JavaScript cart rules: prefer const, avoid mutating input arguments, and require input validation for quantity and price."
- Open the generated instructions file (`*.instructions.md`) in [`../../.github/`](../../.github/) (commonly in `.github/instructions/`, or `.github/copilot-instructions.md`) and review the content.

Execute:
- Ask Copilot: "In `exercises/javascript/cart.js`, add validation in `addItem` to reject quantity <= 0."

Verify:
- Run:
```bash
cd exercises/javascript
npm test
```
- Confirm test output shows all tests passing (for example, a summary like "Test Suites: ... passed" and "Tests: ... passed").
- Add or update at least one test in `exercises/javascript/cart.test.js` that calls `addItem` with `quantity` of `0` (or negative) and expects an error.
- Re-run `npm test` and confirm that this new validation test passes.
- Yes, do a quick source check in `exercises/javascript/cart.js`: confirm `addItem` has an explicit validation guard for non-positive quantity and rejects or throws before changing cart state.

### 2. Prompts
Goal: create a reusable test-generation prompt.

Create:
- In Copilot Chat, type `/create-prompt`
- Use this example request:
	- "Generate Jest tests for selected JavaScript function: happy path, edge cases, and error case."
- Open the generated prompt file (`*.prompt.md`) in [`../../.github/`](../../.github/) (commonly in `.github/prompts/`) and review the content.

Execute:
- Open `exercises/javascript/cart.js` and select the full `removeItem` function.
- Open Copilot Chat and run your custom prompt while the function is selected.
- Accept the generated test changes.

Verify:
- Confirm new tests were added to `exercises/javascript/cart.test.js`.
- Run `npm test` and confirm pass.

### 3. Skills
Goal: create a reusable review skill for checkout logic.

Create:
- In Copilot Chat, type `/create-skill`
- Use this example request:
	- "Skill to review shopping cart checkout logic for discount order, coupon handling, tax, and rounding mistakes."
- Open the generated skill file in [`../../.github/`](../../.github/) (commonly `.github/skills/<skill-name>/SKILL.md`) and review the content.

Execute:
- Invoke the skill on `exercises/javascript/cart.js`.

Verify:
- Confirm the skill output includes a checklist with these four checks: discount order, coupon handling, tax, and rounding.
- Confirm it names at least one specific code location in `exercises/javascript/cart.js` (for example `checkout` or another function name).
- Confirm it gives either:
	- one concrete issue with a short fix suggestion, or
	- an explicit "no issues found" statement with brief reasoning.

### 4. Agents
Goal: use a custom agent to complete a test task end-to-end.

Create:
- In Copilot Chat, type `/create-agent`
- Use this example request:
	- "Agent that writes missing Jest tests for a selected JS file, runs tests, and fixes failures."
- Open the generated agent file (`*.agent.md`) in [`../../.github/`](../../.github/) (commonly in `.github/agents/`) and review the content.

Execute:
- In Copilot Chat, ask: "Write missing tests for `exercises/javascript/cart.js`."

Verify:
- Confirm `exercises/javascript/cart.test.js` was updated.
- Run `npm test` and confirm pass.

### 5. Hooks
Goal: automatically validate edits.

Create:
- In Copilot Chat, type `/create-hook`
- Use this example request:
	- "Post-tool hook: after editing files in exercises/javascript, run npm test in exercises/javascript."
- Open the generated hook configuration in [`../../.github/`](../../.github/) and review the content.

Execute:
- In Copilot Chat, ask for a tiny safe edit in `exercises/javascript/cart.js` (for example rename a local variable only).

Verify:
- Confirm a test run starts automatically right after the edit (without manually running `npm test`).
- Confirm the command runs in `exercises/javascript` and prints Jest output.
- Confirm the terminal summary shows all tests passing (for example, "Test Suites: ... passed" and "Tests: ... passed").
