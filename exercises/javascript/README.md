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

Successful output means:
- Output shows `=== Cart Demo ===`
- Output shows an `Items:` section listing products with quantities and prices
- Output shows `--- Without coupon ---` with a `total` value
- Output shows `--- With 10% coupon ---` with a lower `total` than without coupon
- Output shows `--- With $20 fixed coupon ---` with a `total` that is `$20` less than the no-coupon total (before tax)

## Verify Result

**Tests** — All OS:
```bash
npm test
```

Successful verification means:
- Output includes `PASS` next to the test file name
- Output includes a `Test Suites:` line with `passed`
- Output includes a `Tests:` line with `passed`

## Concept Examples (Simple And Verifiable)
When a step asks you to send a Copilot Chat prompt or slash command, observe the AI reasoning in Chat and wait for it to finish before you continue.

### 1. Instructions
Goal: make Copilot follow JavaScript rules for this track.

Create:
- In Copilot Chat, type this command:
```text
/create-instructions JavaScript cart rules: prefer const, avoid mutating input arguments, and require input validation for quantity and price, Quantity and price can never be 0 or less. 
                     Name it `js-cart-rules`
```
- Press Enter.
- Open [`.github/instructions/js-cart-rules.instructions.md`](../../.github/instructions/js-cart-rules.instructions.md) and review the content.

Execute:
- Open [exercises/javascript/cart.js](cart.js) in the editor.
- Ask Copilot: "In `exercises/javascript/cart.js`, review the code and check for missing validations in `addItem`."

Verify:
- Review the code changes in [exercises/javascript/cart.js](cart.js). Note that checks were added for price and quantity <= 0 without this being explicitly stated in the prompt 
- Open [exercises/javascript/cart.test.js](cart.test.js) in the editor.
- Ask Copilot: "In `exercises/javascript/cart.test.js`, add or update a test that tests the `addItem` validation rules"
- Review and accept the test change. Note that tests were added for price and quantity <= 0 without this being explicitly stated in the prompt
- Run `npm test` and confirm that the new tests pass.
- Ask Copilot "Explain which lines were changed in the test file and how the new test proves the behavior."

### 2. Prompts
Goal: create a reusable test-generation prompt.

Create:
- In Copilot Chat, type this command:
```text
/create-prompt Generate Jest tests for selected JavaScript function: happy path, edge cases, and error case.
               Name it `js-generate-function-tests`
```
- Press Enter.
- Open [`.github/prompts/js-generate-function-tests.prompt.md`](../../.github/prompts/js-generate-function-tests.prompt.md) and review the content.

Execute:
- Open [exercises/javascript/cart.js](cart.js) in the editor and select the full `removeItem` function.
- With the function selected, open Copilot Chat, type `/js-generate-function-tests`, and press Enter.

Verify:
- Open [exercises/javascript/cart.test.js](cart.test.js) in the editor and confirm it contains at least one new test that calls `removeItem` and checks the expected cart behavior after removal.
- Run `npm test` and confirm output includes `PASS` next to the test file name.
- Confirm output includes a `Test Suites:` line with `passed`.
- Confirm output includes a `Tests:` line with `passed`.
- Note the newly added tests

### 3. Skill
Goal: create a reusable review skill for checkout logic.

Create:
- In Copilot Chat, type this command:
```text
/create-skill Skill to review shopping cart checkout logic for discount order, coupon handling, tax, and rounding mistakes. 
              Sort the output by pass and fail. 
	          Suggest fixes for fails if they are short. 
	          Format is nicely. 
	          Name it `js-checkout-review`
```
- Press Enter.
- Open [`.github/skills/js-checkout-review/SKILL.md`](../../.github/skills/js-checkout-review/SKILL.md) and review the content.

Execute:
- In Copilot Chat, type `/js-checkout-review exercises/javascript/cart.js` and press Enter.

Verify:
- Confirm the skill output explicitly includes all four check labels: `discount order`, `coupon handling`, `tax`, and `rounding`.
- Confirm it has one failure for rounding
- Review the result recommendation

### 4. Agents
Goal: use a custom agent to add missing tests, run them, and update source code if it needs to fix a failure.

Create:
- In Copilot Chat, type this command:
```text
/create-agent Agent that writes missing Jest tests for a selected JS file
			  Test are run automatically with verification of result
			  If a test fails update the related source code to fix it. Confirm the fix works
			  Name it `js-test-fixer`
```
- Press Enter.
- Open [`.github/agents/js-test-fixer.agent.md`](../../.github/agents/js-test-fixer.agent.md) and review the content.

Execute:
- Open [exercises/javascript/cart.js](cart.js)
- If you havent done so already accept all previous code changes (if any)
- Open Copilot Chat.
- In the agent selector (bottom of chat usually "Agent"), choose `js-test-fixer`
- In Copilot Chat, ask: "check cart.js"

Verify:
- Open [exercises/javascript/cart.test.js](cart.test.js) in the editor and confirm it was updated with at least one new test for behavior in [exercises/javascript/cart.js](cart.js).
- Open [exercises/javascript/cart.js](cart.js) in the editor and confirm whether the agent also changed source code to fix a failing behavior.
- Run `npm test` and confirm output includes `PASS` next to the test file name.
- Confirm output includes a `Test Suites:` line with `passed`.
- Confirm output includes a `Tests:` line with `passed`.

### 5. Hooks
Goal: automatically validate edits.

Create:
- In Copilot Chat, type this command:
```text
/create-hook Post-tool hook: after editing files in exercises/javascript, run npm test. 
              Find workspace root dynamically by searching for .github folder. 
              Verify exercises/javascript directory exists before running tests. 
              Output user-visible messages via systemMessage (✅ pass, ❌ fail, ⚠️ warning). 
              Handle Windows and Unix paths correctly. 
              Name it `js-post-edit-tests`
```
- Press Enter.
- Open [`.github/hooks/js-post-edit-tests.json`](../../.github/hooks/js-post-edit-tests.json) and review the content.
- Open [`.github/hooks/scripts/js-post-edit-tests.js`](../../.github/hooks/scripts/js-post-edit-tests.js) and review the content.

Execute:
- Open [exercises/javascript/cart.js](cart.js) in the editor.
- Ask Copilot: "In `exercises/javascript/cart.js`, make a tiny safe edit such as renaming a local variable only."

Verify:
- Confirm a test run starts automatically right after the edit (without manually running `npm test`).
- Confirm the command runs in `exercises/javascript` and executes `npm test`.
- Confirm output includes `PASS` next to the test file name.
- Confirm output includes a `Test Suites:` line with `passed`.
- Confirm output includes a `Tests:` line with `passed`.

---

Well done you completed all excercises
