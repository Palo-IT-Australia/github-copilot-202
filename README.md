# GitHub Copilot Customization Workshop

Use the code in `exercises/` as your playground. Work through each section in order and create the files as instructed.

---

## Prerequisites

- VS Code with the **GitHub Copilot** and **GitHub Copilot Chat** extensions installed
- GitHub account with an active Copilot subscription
- Node.js 18+ and Python 3.9+

**Install dependencies before starting:**

```bash
# JavaScript
cd exercises/javascript && npm install

# TypeScript
cd exercises/typescript && npm install

# Python
cd exercises/python && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
```

**Run tests:**

```bash
# JavaScript
cd exercises/javascript && npm test

# TypeScript
cd exercises/typescript && npm test

# Python
cd exercises/python && source .venv/bin/activate && python -m pytest -v
```

---

## Concepts

| # | Concept | Command |
|---|---------|---------|
| 1 | [Instructions](#1-instructions) | `/create-instructions` |
| 2 | [Prompts](#2-prompts) | `/create-prompt` |
| 3 | [Skills](#3-skills) | `/create-skill` |
| 4 | [Agents](#4-agents) | `/create-agent` |
| 5 | [Hooks](#5-hooks) | `/create-hook` |

---

## 1. Instructions

### 1a. Python

1. Run `/create-instructions` and describe what you want, for example:
   > *"Instructions for a Python Flask project: always use blueprints for routes, return JSON as `{ data, error, status }`, never use bare except clauses"*

2. Open `exercises/python/legacy_api.py` and ask Copilot:
   > *"Add a PATCH endpoint to update a user's role"*

### 1b. JavaScript

1. Run `/create-instructions` and describe what you want, for example:
   > *"Instructions for a JavaScript project: prefer const over let, never mutate function arguments — return new objects instead, all async functions must handle errors with try/catch"*

2. Open `exercises/javascript/cart.js` and ask Copilot:
   > *"Add a bulk discount for quantities over 10"*

---

## 2. Prompts

1. Run `/create-prompt` and describe what you want, for example:
   > *"A prompt that generates comprehensive unit tests for selected code, using the existing test framework, covering happy path, edge cases, and error conditions, with one assertion per test"*

2. Open `exercises/javascript/cart.js`, select the `checkout` function, and run your new prompt — use `cart.test.js` to see what's still missing.

**Bonus:** Run `/create-prompt` again for a code review prompt:
   > *"A prompt that reviews selected code for security issues, missing error handling, bare excepts, and inconsistent response formats — listing each issue with a severity of high, medium, or low and a suggested fix"*

Run it against `exercises/python/legacy_api.py`.

---

## 3. Skills

1. Run `/create-skill` and describe what you want, for example:
   > *"A skill that knows this TypeScript codebase uses the Result pattern instead of throwing errors, Zod for input validation at service boundaries, and the Repository pattern — services never touch the database directly"*

2. Create an agent in the next step that references this skill, then ask it to add a `getUserByEmail` method to `exercises/typescript/user-service.ts`.

---

## 4. Agents

1. Run `/create-agent` and describe what you want, for example:
   > *"An agent called Test Writer that reads a source file, checks if a test file already exists, writes comprehensive tests covering happy path, edge cases, and error conditions, then runs them and fixes any failures — always using the test framework already present in the project"*

2. Switch Copilot Chat to **Agent** mode and select **Test Writer**.

3. Ask it: *"Write tests for exercises/typescript/user-service.ts"* — watch it read the file, generate tests, and run them.

---

## 5. Hooks

1. Add a few `console.log('debug', ...)` statements to `exercises/javascript/cart.js`.

2. Run `/create-hook` and describe what you want, for example:
   > *"A pre-tool-call hook that strips console.log and print() statements from file content before the agent reads it, and a post-tool-call hook that runs eslint --fix on any file the agent creates or edits"*

3. Ask the agent to *"refactor the checkout function in cart.js"* — the pre-hook should hide the debug lines from the agent, and the post-hook should lint the output.

---

## Reference

- [Copilot Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Prompt Files](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental)
- [Agent Customization](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [MCP Servers in VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)
