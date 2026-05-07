# JavaScript Track

Please note that the examples below have been chosen to allow you to experience the concepts of creating:

- File based instruction
- reusable Prompt
- Skill
- Custom Agent
- Hooks

They don't necessarily show good practice implementation

## What this codebase does

This track implements a shopping cart logic with item management and checkout calculations:

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

### Setup

All OS:

```bash
cd exercises/javascript
npm install
```

### Running the app

All OS:

```bash
npm start
```

Successful output:

- Output shows `=== Cart Demo ===`
- Output shows an `Items:` section listing products with quantities and prices
- Output shows `--- Without coupon ---` with `total: 242.55,` value
- Output shows `--- With 10% coupon ---` with  `total: 218.3`
- Output shows `--- With $20 fixed coupon ---` with `total: 220.55`

### Running existing tests

**Tests** — All OS:

```bash
npm test
```

Successful verification:

- Output includes `PASS` next to the test file name
- Output includes a `Test Suites:` line with `1 passed`
- Output includes a `Tests:` line with `4 passed`

# Exercises

## Important

**You will need VS Code 1.110 or higher**

After you run a Copilot Chat prompt or slash command

- Observe the Copilot reasoning in Chat and wait for it to finish before you continue.
  - Light gray text that starts with a verb (e.g. Ran, Reviewed...) are mostly expandable and show you the process that Copilot followed
- If you see **unexpected results or differences** to what is in the validation steps
  - Ask Copilot to explain what it did and how it did it
  - Explain the behaviour you are seeing and what you expect to Copilot Chat and ask it to fix the problem
  - Might be caused by your specific setup and previous interactions with Copilot

## 1. Creating File Based Instruction

*Custom instructions enable you to define common guidelines and rules that automatically influence how AI generates code and handles other development tasks. Instead of manually including context in every chat prompt, specify custom instructions in a Markdown file to ensure consistent AI responses that align with your coding practices and project requirements.*
More information here: [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

Goal: Copilot will always follow our JavaScript coding standards and enforce cart rules (amount & price cannot be <0)
Note: We make this specific to JavaScript files so that it doesn't clash with instructions from other language tracks

Create:

- In Copilot Chat, type this command:

```text
/create-instructions JavaScript rules: prefer const, avoid mutating input arguments and require input validation
                     Cart rules: Quantity and price can never be 0 or less. 
                     Only apply this to JavaScript files
                     Name it `js-cart-rules`
```

- Press Enter.
- Open [`.github/instructions/js-cart-rules.instructions.md`](../../.github/instructions/js-cart-rules.instructions.md) and review the content.
- Verify it applies only to JavaScript files via the `applyTo: "**/*.js"` pattern (visible in the editor, not in Markdown preview)

Execute:

- Open [exercises/javascript/cart.js](cart.js) in the editor.
- In Copilot Chat, type this command:

```text
In `exercises/javascript/cart.js`, review the code and fix missing validations in `addItem`
```

- When making changes Copilot will enforce the rules set out in the instruction file

Verify:

- Review the code changes in [exercises/javascript/cart.js](cart.js)
- Confirm that validation checks were added for price and quantity <= 0, even though the prompt did not explicitly name them
  
Execute:

- Open [exercises/javascript/cart.test.js](cart.test.js) in the editor.
- In Copilot Chat, type this command:

```text
In `exercises/javascript/cart.test.js`, add or update a test that tests the `addItem` validation rules
```

Verify:

- Review the test change
  - Note that tests were added for price and quantity <= 0 without this being explicitly stated in the prompt
- Click the blue "Keep" button to save all changes
- Run `npm test` and confirm that the new tests pass.
- Verify that the number of tests has increased
- In Copilot Chat, type this command:

```text
Explain which lines were changed in the test file and how the new test proves the behavior
```

- Review the explanation

Finish:

- Click the blue "Keep" button to save all changes

## 2. Creating a reusable Prompt

*Prompt files, also known as slash commands, let you simplify prompting for common tasks by encoding them as standalone Markdown files that you can invoke directly in chat. Each prompt file includes task-specific context and guidelines about how the task should be performed.*
More information here [Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)

Goal: Create a reusable prompt that generates tests .

Create:

- In Copilot Chat, type this command:

```text
/create-prompt Generate Jest tests for the selected JavaScript function include happy path, edge cases, and error case.
               Update the appropriate test file
               Name it `js-generate-function-tests`
```

- Press Enter.
- Open [`.github/prompts/js-generate-function-tests.prompt.md`](../../.github/prompts/js-generate-function-tests.prompt.md) and review the content.

Execute:

- Open [exercises/javascript/cart.js](cart.js) in the editor
  - Select the full `removeItem` function.
- With the function selected, in Copilot Chat, type this command:

```text
/js-generate-function-tests
```

- Press Enter.
- Tests will be created for the selected function

Verify:

- Open [exercises/javascript/cart.test.js](cart.test.js) in the editor and confirm it contains at least one new test that calls `removeItem` and checks the expected cart behavior after removal.
- Click the blue "Keep" button to save all changes
- Run `npm test` and confirm output includes `PASS` next to the test file name.
- Confirm output includes a `Test Suites:` line with `passed`.
- Confirm output includes a `Tests:` line with `passed`.
- Note the newly added tests

## 3. Creating an Agent Skill

*Agent Skills are folders of instructions, scripts, and resources that GitHub Copilot can load when relevant to perform specialized tasks. Agent Skills is an open standard that works across multiple AI agents, including GitHub Copilot in VS Code, GitHub Copilot CLI, and GitHub Copilot cloud agent.*
More information here [Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

Goal: Create a reusable skill that reviews the checkout logic and provides feedback.

Create:

- In Copilot Chat, type this command:

```text
/create-skill Skill to review shopping cart checkout logic for discount order, coupon handling, tax, and rounding mistakes. 
              Sort the output by pass and fail. 
              Suggest fixes for fails if they are short. 
              Format it nicely.
              Name it `js-checkout-review`
```

- Press Enter.
- Open [`.github/skills/js-checkout-review/SKILL.md`](../../.github/skills/js-checkout-review/SKILL.md) and review the content.

Execute:

- In Copilot Chat, type this command:

```text
Review the checkout logic in cart.js
```

- **Note: Copilot will infer the usage of this skill by its description in your prompt.**
- Press Enter
- The skill will be executed, reviews the logic and provides feedback

Verify:

- In the Chat panel, check for an expandable "Reviewed" or reasoning section showing the skill was used.
- Confirm the response:
  - Includes all four check labels: `discount order`, `coupon handling`, `tax`, and `rounding` as separate, labeled sections (not generic observations).
  - Names specific functions or code locations in `cart.js` (not just generic findings).
  - Organizes findings by pass and fail groups.
- Review at least one concrete issue or recommendation in the output.

If the checks above are not met, the skill may not have been automatically invoked. Use this explicit command instead:

```text
/js-checkout-review
```

- Press Enter and repeat the verification checks above.

Finish:

- Click the blue "Keep" button to save all changes

## 4. Creating a Custom Agent

*Custom agents enable you to configure the AI to adopt different personas tailored to specific development roles and tasks. For example, you might create agents for a security reviewer, planner, solution architect, or other specialized roles. Each persona can have its own behavior, available tools, and instructions.*
More information here [Custom Agents])(https://code.visualstudio.com/docs/copilot/customization/custom-agents)

Goal: use a custom agent to add missing tests, run them, and update source code if a test fails.

Create:

- In Copilot Chat, type this command:

```text
/create-agent Agent that writes missing Jest tests for a selected JS file.
              Tests are run automatically with verification of result.
              If a test fails, update the related source code to fix it. 
              Confirm the fix works.
              Name it `js-test-fixer`
```

- Press Enter.
- Open [`.github/agents/js-test-fixer.agent.md`](../../.github/agents/js-test-fixer.agent.md) and review the content.

Execute:

- Open [exercises/javascript/cart.js](cart.js) in the editor
- Open Copilot Chat.
- In the agent selector (bottom of chat usually "Agent"), choose `js-test-fixer`
- In Copilot Chat, type this command:

```text
check cart.js
```

- Press Enter

Verify:

- Open [exercises/javascript/cart.test.js](cart.test.js) in the editor and confirm it was updated with tests for behavior in [exercises/javascript/cart.js](cart.js).
- Open [exercises/javascript/cart.js](cart.js) in the editor and confirm the agent also changed source code to fix the rounding error.
- Click the blue "Keep" button to save all changes
- Run `npm start`, then confirm output shows
  - `--- Without coupon ---` with `total: 242.55,`
  - `--- With 10% coupon ---` with  `total: 218.3`
  - `--- With $20 fixed coupon ---` with `total: 220.55`
- Run `npm test`, then confirm output shows
  - Confirm output includes `PASS` next to the test file name.
  - Confirm output includes a `Test Suites:` line with `passed`.
  - Confirm output includes a `Tests:` line with `passed`.

### 5. Creating a Hook

**Note: Depending in the training Hooks might not have covered. You can complete the exercise if you want.**

*Hooks enable you to execute custom shell commands at key lifecycle points during agent sessions. Use hooks to automate workflows, enforce security policies, validate operations, and integrate with external tools.*
More information here [Agent hooks](https://code.visualstudio.com/docs/copilot/customization/hooks)

Goal: After each *tool* call that modifies a JavaScript file we want to run a script that outputs the name of any functions that doesn't have a description (// or /* ... */) before the function name.

Create:

- In Copilot Chat, type this command:

```text
/create-hook Post-tool hook named js-missing-function-comments: 
             after edits to JavaScript files only, scan the edited file and output only function names (and line numbers) that do not have an immediately preceding comment line (//...) or JSDoc block (/** ... */). 
             Return results via systemMessage: ✅ if all functions are commented, ⚠️ with a plain list when missing comments exist, ❌ only on parse/read errors.
             Do not modify files, do not run tests, keep it fast, and support Windows + Unix paths.
             The hook CWD is always the repo root, so use simple relative paths in the JSON command (no shell wrapper needed).
             VS Code edit tool names include: replace_string_in_file, multi_replace_string_in_file, apply_patch, create_file, insert_edit_into_file, vscode_renameSymbol. Allow all of these.
             The stdin JSON payload from VS Code uses snake_case keys: tool_input (not toolInput), tool_name, hook_event_name, etc. Extract the file path from payload.tool_input.filePath.
             Also check the TOOL_INPUT_FILE_PATH environment variable as a fallback when the file path cannot be extracted from the stdin JSON payload.
```

- Press Enter.
- Please note that the create-hook command is very explicit on what to create and how to deal with relative paths. This was done because we had previously had problems with hooks not firing.
- Open [`.github/hooks`](../../.github/hooks) and review the content.
  - This contains the JSON file defining the hook
- Open [`.github/hooks/scripts/scripts`](../../.github/hooks/scripts) and review the content.
  - This contains scripts that are run when the Hook is executed

Execute:

- Close and Open VS Code (important; otherwise the hook won't fire)
- In Copilot Chat, type this command:

```text
In `exercises/javascript/cart.js`, make a tiny safe edit such as renaming a local variable only
```

- This made a small edit to the cart.js file. The hook will have been executed after the change has been made.

Verify:

- Check the Chat output and search for the below messages from the hook execution
- Click on *... received a warning* then click on *Warning from Post-Tool Use hook*
- Note the output, which lists all functions that do not have comments.

Finish:

- Click the blue "Keep" button to save all changes

---

***Well done you completed all exercises**
