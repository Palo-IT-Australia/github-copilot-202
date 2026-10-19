# Trainer README

**Not for participants.** Contains answers and reference files.

## Purpose
Teach the core Copilot customization primitives (instructions, prompts, skills, agents) to a new QE cohort, using Playwright and a synthetic app as the playground. The primitives are the objective. Playwright is the relevance.

This pack **replaces** the JS cart track for this cohort. Slides: reuse slides 1–7 of the existing Hands-on Activity deck, then the QE activity slides.

## Before the session
- Send [PRE-WORK.md](PRE-WORK.md) at least two days ahead. The 45 minutes has **no time for setup**.
- Ask participants to confirm `npm run smoke` shows `2 passed`. Pair anyone who can't.
- Rehearse on your own machine, especially each `/create-…` command, because Copilot output varies between runs and VS Code versions.

## Timing (45 min)
| Min | Item |
|---|---|
| 0-4 | Start: run `npm run tc2`, see the failure |
| 4-13 | 1. Instructions |
| 13-22 | 2. Prompt |
| 22-31 | 3. Skill |
| 31-40 | 4. Agent |
| 40-45 | Wrap-up |

Optional, if time allows or for fast groups: 5. Hook, 6. MCP (trainer demo), and the TC1 stretch.

## Reference answers (in `trainer/reference/`)
| Concept | File | Goes to |
|---|---|---|
| 1. Instructions | `qe-playwright-rules.instructions.md` | `.github/instructions/` |
| 2. Prompt | `triage-failing-test.prompt.md` | `.github/prompts/` |
| 3. Skill | `SKILL.md` | `.github/skills/api-test-review/` |
| 4. Agent | `api-test-writer.agent.md` | `.github/agents/` |
| 5. Hook | `hooks/spec-quality.json`, `hooks/check-spec-quality.js` | `.github/hooks/`, `.github/hooks/scripts/` |

Participants generate their own. These show what good looks like. Tool names in the agent file and the hook JSON shape vary by VS Code version: **verify them on your version before relying on them.** The hook script itself was tested with sample payloads (clean spec, spec with `waitForTimeout`, non-spec file).

## What to expect at each step

### Start
`npm run tc2`: 1 failed, 1 passed. Failure: `Expected: 355  Received: "32035"`.

### 1. Instructions
- Prompt: *add a test for booking an unknown flight*.
- Expected new test: uses `bookingsApi.create`, tagged, asserts status `404` and body `{ error: 'flight not found' }`, and imports from `../fixtures`.
- **Teaching point:** the prompt never mentioned fixtures, tags or typed clients. The instructions did.
- Check `applyTo: "**/*.ts"`. Remind them the `.js` app files are not covered.

### 2. Prompt
- Expected verdict: **product defect**. `app/server.js` adds `priceAud + taxAud`, and `taxAud` is a string, so it concatenates.
- Right fix: `flight.priceAud + Number(flight.taxAud)` in `app/server.js`. The assertion `toBe(355)` must stay.
- **Traps:** changing `355`, wrapping the test in `Number()`, adding timeouts, skipping the test.
- After the fix: `npm run tc2` is green.

### 3. Skill
- Run on the TC2 spec. Expect Pass: fixtures, typed client, status asserted, tags. If participants added the unknown-flight test, check it too.
- The skill may not trigger automatically. `/api-test-review` is the fallback.

### 4. Agent
- `cover the flights search API`: expect a new `tests/api/flights-search.spec.ts` with the fixtures and tags, using `flightsApi.search`. Behaviours worth covering: filter by route, a route with no flights returns `[]`, no filter returns everything.
- Expect the agent to run the tests itself. After `npm run api`, all API tests pass if Concept 2's fix was applied. `npm test` still shows the 2 TC1 UI failures until the stretch is done. That is by design.

### 5. Hook (optional)
- Requires reopening VS Code. If it doesn't fire, check the hook file location and the VS Code version.

### 6. MCP demo (trainer)
Show these in order:
1. **Local execution without MCP:** run `npx playwright test tests/e2e --headed` (or use the Testing view) and show the real browser opening on your machine. Playwright is just a Node library.
2. **With MCP:** copy `optional/mcp.json` to `.vscode/mcp.json`, start the server, and ask the agent to open `http://localhost:3100` and search SYD to MEL. Show the browser open and the agent describe the page.
3. **Say it:** MCP runs as a local process started by VS Code over stdio, with no port and nothing hosted. The browser is local, but the page content the agent reads is sent to the model, so use non-production, synthetic apps only. The config pins the version and limits origins to the demo app.
- The default browser is Chrome. If the demo machine has none, add `"--browser", "msedge"` to the args.
- Delete `.vscode/mcp.json` afterwards if you don't want it in the repo.

### TC1 stretch
Both UI tests time out on `#search-btn`. Then `.flight-row` is stale as well. Fix in `tests/pages/flight-search.page.ts` only. Patch: `trainer/solutions/tc1-fix-stale-locators.patch`.

## Captured failure output
`inputs/tc1-flight-search/failure-output.txt` and `inputs/tc2-create-booking/failure-output.txt` hold the real failure output, in case you need to show it without running the tests live.

## Solutions for the seeded failures
Run from the **repo root** (the patches use repo-root paths):
```bash
git apply exercises/playwright/trainer/solutions/tc1-fix-stale-locators.patch
git apply exercises/playwright/trainer/solutions/tc2-fix-total-calculation.patch
cd exercises/playwright && npm test    # expect 6 passed once both fixes are applied (smoke 2, TC1 2, TC2 2)
git checkout -- exercises/playwright   # reset (from the repo root)
```

## Facilitation tips
- Nominate one person per group to share their screen. The others contribute.
- Repeat: wait for Copilot to finish before moving on, and review before **Keep**.
- If a `/create-…` result looks different from the README, ask Copilot to explain, and compare with the reference.
- Keep each concept to about 9 minutes. Move on even if a group isn't finished, because the optional items and TC1 exist for those who are fast.

## Environment notes
- Node 20+. Chromium is installed with `npm run setup:browsers` (about 150 MB). The demo app uses port 3100.
- The Playwright config starts the app and reuses a running one.
- Corporate networks: the browser download and `npx @playwright/mcp` both need npm and CDN access. Check ahead.
