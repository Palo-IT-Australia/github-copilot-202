# GitHub Copilot Customization for QE: Hands-on with Playwright

## Introduction

This lab teaches the core GitHub Copilot customization concepts in VS Code, using a Playwright test project as the playground:

- instructions
- prompts
- skills
- agents

(Hooks and the Playwright MCP server are optional extras.)

The app is **Skyline Air**, a small fictional flight-search site with a booking API. It runs on your machine, and all data is synthetic. The Playwright part is only there to make the concepts relevant to your work. **The learning goal is the Copilot primitives.**

Time: **45 minutes.** Complete [PRE-WORK.md](PRE-WORK.md) first, because there is no time for setup in the session. Open the `exercises/playwright` folder in VS Code (File > Open Folder) so everything Copilot creates lands in this exercise.

## Completion criteria

You are done when you can demonstrate each of these:

- **Instructions:** Create an instructions file and use it in a request. Validated when Copilot's output follows your rules without being told.
- **Prompts:** Create and run a stored prompt. Validated when it runs and gives a repeatable result.
- **Skills:** Create and use a skill. Validated when it is picked up and returns a multi-step review.
- **Agents:** Create and use a custom agent. Validated when it writes tests, runs them and fixes problems end to end.

## Concepts

| # | Concept | What it does | Command |
|---|---|---|---|
| 1 | Instructions | Always-on guidance for Copilot | `/create-instructions` |
| 2 | Prompts | Reusable templates for repeated requests | `/create-prompt` |
| 3 | Skills | Reusable multi-step workflows | `/create-skill` |
| 4 | Agents | End-to-end tasks: write, run, fix | `/create-agent` |
| 5 (optional) | Hooks | Automatic checks after tool actions | `/create-hook` |
| 6 (optional) | MCP | Lets the agent drive a real browser | trainer demo |

After you run a prompt or slash command, **watch Copilot's reasoning in Chat and wait for it to finish** before moving on. If your result differs from what is described, ask Copilot to explain, or ask the trainer.

## Start (about 4 min)

Run the API test case (TC2):

```bash
npm run tc2
```

**Expected:** 1 test fails and 1 passes. The failing one is *"creates a confirmed booking with the correct total"*. Read the error. You will come back to it in Concept 2.

---

## 1. Create instructions (about 9 min)

*Instructions give Copilot standing rules so you don't repeat them in every prompt.*
More information: [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

Goal: Copilot always follows our Playwright team standards.

**Create:**

- In Copilot Chat, type:

```text
/create-instructions Playwright QE rules for TypeScript files:
                     import test and expect from tests/fixtures, never from @playwright/test.
                     API tests use the typed clients in the fixtures, never raw fetch.
                     Locators live in page objects, none in specs.
                     No waitForTimeout. Never weaken an assertion.
                     Every test has at least one tag, like @api or @tc2.
                     Only apply to TypeScript files.
                     Name it `qe-playwright-rules`
```

- Press Enter. If Copilot asks a clarifying question, answer briefly (for example "any tags, at least one") and let it finish.
- Open `.github/instructions/qe-playwright-rules.instructions.md` and review it.
- Check it applies only to TypeScript via `applyTo: "**/*.ts"` (visible in the editor, not in Markdown preview).

**Execute:**

- Close any open spec files first, so Copilot has no existing test to copy. Whatever it follows now comes from your instructions.
- In Copilot Chat, type:

```text
Create a new spec tests/api/booking-validation.spec.ts that tests booking validation:
a missing passenger name, and an unknown flight
```

**Verify:**

- Open the new file and confirm it follows your rules even though the prompt didn't mention them:
  - it imports `test` and `expect` from `../fixtures` (not `@playwright/test`)
  - it uses `bookingsApi` (not `fetch` or a raw request)
  - every test has a tag
  - it asserts the status code and the error body
- Click **Keep**, then run `npx playwright test tests/api/booking-validation.spec.ts`. The new tests should pass.
- Copilot may offer to fix the failing booking-total test (TC2). **Decline for now.** That is Concept 2.

---

## 2. Create a reusable prompt (about 9 min)

*Prompt files are stored slash commands for tasks you repeat.*
More information: [Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)

Goal: a repeatable way to triage any failing test.

**Create:**

```text
/create-prompt Triage a failing Playwright test. Run it, read the error, and decide
               whether the TEST is wrong or the PRODUCT is wrong, with evidence.
               Propose the smallest fix and the file it belongs in.
               Never add sleeps, skip the test, or weaken an assertion.
               Return: Verdict, Evidence, Proposed fix.
               Name it `triage-failing-test`
```

- Open `.github/prompts/triage-failing-test.prompt.md` and review it.

**Execute:**

- Open [tests/api/tc2-create-booking.spec.ts](tests/api/tc2-create-booking.spec.ts).
- In Copilot Chat, type:

```text
/triage-failing-test the booking total test in tc2-create-booking.spec.ts
```

**Verify:**

- The answer states a verdict and evidence.
- It points at the app (`app/server.js`, the total calculation), not the test.
- Ask Copilot to apply the fix. Click **Keep**, then run `npm run tc2`. Both tests should now pass.

---

## 3. Create a skill (about 9 min)

*Skills are folders of instructions Copilot loads when relevant to run a multi-step workflow.*
More information: [Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

Goal: a reusable review of API specs against team standards.

**Create:**

```text
/create-skill Review a Playwright API spec against our standards: fixtures imported,
              typed clients used, status and typed fields asserted, tags present,
              no waitForTimeout, synthetic data only.
              Sort the output into pass and fail, and suggest short fixes for fails.
              Format it nicely.
              Name it `api-test-review`
```

- Open `.github/skills/api-test-review/SKILL.md` and review it.

**Execute:**

```text
Review tests/api/tc2-create-booking.spec.ts
```

- Copilot infers the skill from your wording. If it doesn't use it, run `/api-test-review` explicitly.

**Verify:**

- The response groups findings into pass and fail.
- It names specific lines in the spec.
- Check for the expandable "Reviewed" section showing the skill was used.

---

## 4. Create a custom agent (about 9 min)

*Custom agents are personas with their own instructions and tools that can complete multi-step tasks.*
More information: [Custom Agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents)

Goal: an agent that writes missing API tests, runs them and fixes problems.

**Create:**

```text
/create-agent Agent that writes missing Playwright API tests for an area I name.
              It reads the existing typed clients and a similar spec first,
              writes the tests with the fixtures and tags, runs them, and checks the result.
              If a test fails it decides whether the test or the product is wrong and fixes the right one.
              Never weaken an assertion. Summarise what it added and changed.
              Name it `api-test-writer`
```

- Open `.github/agents/api-test-writer.agent.md` and review it.

**Execute:**

- In the agent selector (bottom of Chat), choose `api-test-writer`.
- Type:

```text
cover the flights search API
```

**Verify:**

- A new spec appears under `tests/api/` using the fixtures, with tags.
- The agent ran the tests itself and reported the result.
- Click **Keep**, then run `npm run api`. All API tests should pass. (`npm test` still shows the two TC1 UI tests failing. That is expected: they are the optional stretch.)

---

## Wrap-up (about 2 min)

Discuss with your group:

- Which of the four gave the most leverage, and why?
- What should become team-wide standards rather than personal preferences?
- How will you check Copilot-generated tests in real pull requests?

---

# Optional extras

## 5. Hook (optional)

*Hooks run a command automatically at a point in an agent session.*
More information: [Agent hooks](https://code.visualstudio.com/docs/copilot/customization/hooks)

```text
/create-hook Post-tool hook named spec-quality: after edits to .spec.ts files only,
             scan the edited file and report any waitForTimeout or any test without a tag.
             Return the result as a systemMessage: ✅ if clean, ⚠️ with a plain list otherwise.
             Do not modify files. Support Windows and Unix paths.
             Read the file path from payload.tool_input.filePath, with the TOOL_INPUT_FILE_PATH
             environment variable as a fallback.
```

- Close and reopen VS Code (otherwise the hook won't fire).
- Ask Copilot: `In tests/api/tc2-create-booking.spec.ts, rename a local variable only`.
- Expect a hook message in Chat.

## 6. Playwright MCP (trainer demo)

*MCP lets the agent use tools. The Playwright MCP server lets it drive a real browser.* The trainer demonstrates this on screen. Playwright MCP runs **locally**: VS Code starts it as a process on your machine and talks to it directly, with no server hosted anywhere.

To try it yourself, copy [optional/mcp.json](optional/mcp.json) to `.vscode/mcp.json`, start the server from the file's **Start** link, then ask the agent:

```text
Open http://localhost:3100, search flights from SYD to MEL, and tell me what you see.
```

Use only the local demo app. Never point it at real sites or production.

## Stretch: UI test case (TC1)

Done early? Run the UI test case and use **your own** prompt, skill and agent on it:

```bash
npm run tc1
```

- Triage it with `/triage-failing-test`. Is the test wrong, or the page?
- Review the fix with `/api-test-review` style checks, adapted to UI.
- Reference: [inputs/tc1-flight-search/](inputs/tc1-flight-search/)

---

## Reset

To discard code changes and start over (run from this folder):

```bash
git status
git restore --staged .
git restore .
git clean -fd
```

Warning: `git clean -fd` permanently deletes untracked files in this folder.

The customization files you created live in `.github/`, which git ignores. To remove them too, delete the `.github` folder in this exercise.

## Troubleshooting

- Slash commands not showing: ensure Copilot Chat is active and type `/`.
- `/create-…` not available: make sure you're in **Agent** mode.
- Tests fail to start: confirm `npm run smoke` passes.
- Port in use: set `PORT` and `BASE_URL` in `.env`.

## Useful commands

| Command | What it does |
|---|---|
| `npm run smoke` | Environment check |
| `npm run tc1` / `npm run tc2` | Run one test case |
| `npm run api` | Run all API tests |
| `npm test` | Run everything |
| `npm run report` | Open the HTML report |
| `npm start` | Run the app at http://localhost:3100 |
