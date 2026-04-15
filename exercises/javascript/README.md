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

## Prerequisites
- Node.js 18+

## Setup
All OS:
```bash
cd exercises/javascript
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
- Cart behavior in demo output is consistent with discount, coupon, and tax rules

## Concept Examples (Simple And Verifiable)

### 1. Instructions
Goal: make Copilot follow JavaScript rules for this track.

Create:
- In Copilot Chat, type `/create-instructions` and press Enter.
- Use this example request:
	- "JavaScript cart rules: prefer const, avoid mutating input arguments, and require input validation for quantity and price. Name it `js-cart-rules`."
- Open [`.github/instructions/js-cart-rules.instructions.md`](../../.github/instructions/js-cart-rules.instructions.md) and review the content.

Execute:
- Open `exercises/javascript/cart.js` in the editor.
- Ask Copilot: "In `exercises/javascript/cart.js`, add validation in `addItem` to reject quantity <= 0."

Verify:
- Open `exercises/javascript/cart.test.js` in the editor.
- Ask Copilot: "In `exercises/javascript/cart.test.js`, add or update a test that expects `addItem` to reject `quantity` `0`."
- Review and accept the test change.
- Run `npm test` and confirm that new test passes.
- Open `exercises/javascript/cart.js` and confirm `addItem` throws before changing `cart.items`.
- Ask Copilot to explain which lines it changed and how the new test proves the behavior.

### 2. Prompts
Goal: create a reusable test-generation prompt.

Create:
- In Copilot Chat, type `/create-prompt` and press Enter.
- Use this example request:
	- "Generate Jest tests for selected JavaScript function: happy path, edge cases, and error case. Name it `js-remove-item-tests`."
- Open [`.github/prompts/js-remove-item-tests.prompt.md`](../../.github/prompts/js-remove-item-tests.prompt.md) and review the content.

Execute:
- Open `exercises/javascript/cart.js` in the editor and select the full `removeItem` function.
- With the function selected, open Copilot Chat, type `/js-remove-item-tests`, and press Enter.
- Accept the generated test changes.

Verify:
- Open `exercises/javascript/cart.test.js` in the editor and confirm it contains at least one new test that calls `removeItem` and checks the expected cart behavior after removal.
- Run `npm test` and confirm the command exits with code `0`.
- Confirm output includes a `Test Suites:` line with `passed`.
- Confirm output includes a `Tests:` line with `passed`.

### 3. Skills
Goal: create a reusable review skill for checkout logic.

Create:
- In Copilot Chat, type `/create-skill` and press Enter.
- Use this example request:
	- "Skill to review shopping cart checkout logic for discount order, coupon handling, tax, and rounding mistakes. Name it `js-checkout-review`."
- Open [`.github/skills/js-checkout-review/SKILL.md`](../../.github/skills/js-checkout-review/SKILL.md) and review the content.

Execute:
- Open `exercises/javascript/cart.js` in the editor.
- In Copilot Chat, type `/js-checkout-review exercises/javascript/cart.js` and press Enter.

Verify:
- Confirm the skill output explicitly includes all four check labels: `discount order`, `coupon handling`, `tax`, and `rounding`.
- Confirm it names at least one code location in `exercises/javascript/cart.js` (for example `checkout`).
- Confirm it includes either one concrete issue with a short fix suggestion, or the exact phrase `no issues found` with brief reasoning.

### 4. Agents
Goal: use a custom agent to add missing tests, run them, and update source code if it needs to fix a failure.

Create:
- In Copilot Chat, type `/create-agent` and press Enter.
- Use this example request:
	- "Agent that writes missing Jest tests for a selected JS file, runs tests, and if a test fails, updates the related source code to fix it. Name it `js-test-fixer`."
- Open [`.github/agents/js-test-fixer.agent.md`](../../.github/agents/js-test-fixer.agent.md) and review the content.

Execute:
- Open `exercises/javascript/cart.js` in the editor.
- Open `exercises/javascript/cart.test.js` in the editor.
- In Copilot Chat, ask: "Write missing tests for `exercises/javascript/cart.js`."

Verify:
- Open `exercises/javascript/cart.test.js` in the editor and confirm it was updated with at least one new test for behavior in `exercises/javascript/cart.js`.
- Open `exercises/javascript/cart.js` in the editor and confirm whether the agent also changed source code to fix a failing behavior.
- Run `npm test` and confirm the command exits with code `0`.
- Confirm output includes a `Test Suites:` line with `passed`.
- Confirm output includes a `Tests:` line with `passed`.

### 5. Hooks
Goal: automatically validate edits.

Create:
- In Copilot Chat, type `/create-hook` and press Enter.
- Use this example request:
	- "Post-tool hook: after editing files in exercises/javascript, run npm test in exercises/javascript. Name it `js-post-edit-tests`."
- Open the generated `js-post-edit-tests` hook configuration in [`../../.github/`](../../.github/) and review the content.

Execute:
- Open `exercises/javascript/cart.js` in the editor.
- Ask Copilot: "In `exercises/javascript/cart.js`, make a tiny safe edit such as renaming a local variable only."

Verify:
- Confirm a test run starts automatically right after the edit (without manually running `npm test`).
- Confirm the command runs in `exercises/javascript` and executes `npm test`.
- Confirm the command exits with code `0`.
- Confirm output includes a `Test Suites:` line with `passed`.
- Confirm output includes a `Tests:` line with `passed`.
