# Python Track

**Note: Typescript and Python excercises are current in development and might not be correct**

## What This Codebase Does
This track contains two learning surfaces:
- `data_processor.py`: CSV-based sales analytics and report generation
- `legacy_api.py`: Flask user API with intentional inconsistencies/bugs for workshop practice

Main files:
- `data_processor.py`: processing and summary functions
- `main.py`: demo report generator
- `legacy_api.py`: API endpoints
- `test_legacy_api.py`: API tests

## Prerequisites
- Python 3.9+

## Setup
All OS:
```bash
cd exercises/python
python -m venv .venv
```

Activate virtual environment:
- Windows (PowerShell):
```powershell
.\.venv\Scripts\Activate.ps1
```
- Windows (Command Prompt):
```bat
.venv\Scripts\activate.bat
```
- macOS/Linux (bash):
```bash
source .venv/bin/activate
```

Install dependencies:
All OS:
```bash
pip install -r requirements.txt
```

## Run
Data demo:
All OS:
```bash
python main.py
```

Successful output means:
- Output shows a generated report section with totals and category-level summary values.
- Output shows at least one computed metric (for example total sales, average order value, or category aggregation).
- Output is printed without traceback errors.

API server:
All OS:
```bash
python legacy_api.py
```

Successful output means:
- Flask server starts without import or syntax errors.
- Console output shows the app is serving on a local address.
- Sending requests to existing endpoints returns JSON responses.

## Verify Result

**Tests** — All OS:
```bash
python -m pytest -v
```

Successful verification means:
- Pytest command exits with code `0`
- Output includes `passed`
- Output does not include `failed`
- Use the `Run` commands above if you also want to check the data demo or start the API server manually.

## Concept Examples (Simple And Verifiable)

When a step asks you to send a Copilot Chat prompt or slash command, observe the Copilot reasoning in Chat and wait for it to finish before you continue.

### 1. Instructions
Goal: enforce safer API behavior rules.

Create:
- In Copilot Chat, type this command:
```text
/create-instructions Python Flask rules: avoid bare except, always return jsonify for JSON responses, and validate request input before use
					 Name it `py-flask-safety-rules`
```
- Press Enter.
- Open [`.github/instructions/py-flask-safety-rules.instructions.md`](../../.github/instructions/py-flask-safety-rules.instructions.md) and review the content.

Execute:
- Open [exercises/python/legacy_api.py](legacy_api.py) in the editor.
- In Copilot Chat, type this command:
```text
In `exercises/python/legacy_api.py`, make `/users/search` return `jsonify` consistently.
```
- Press Enter.

Verify:
- Run:
```bash
cd exercises/python
python -m pytest -v
```
- Confirm output includes `passed`.
- Confirm output does not include `failed`.
- Open [exercises/python/test_legacy_api.py](test_legacy_api.py) in the editor.
- In Copilot Chat, type this command:
```text
Add or update a pytest for `/users/search` that asserts the response is JSON and uses consistent JSON fields.
```
- Press Enter.
- Accept the test change, and confirm the test checks JSON behavior using `response.is_json` or a `Content-Type` JSON assertion.
- Re-run `python -m pytest -v` and confirm the command exits with code `0`, output includes `passed`, and output does not include `failed`.
- Do a source check in [exercises/python/legacy_api.py](legacy_api.py) to confirm `/users/search` returns `jsonify(...)` and does not return `json.dumps(...)`.

Finish:
- Click the blue "Keep" button to save all changes made by Copilot

### 2. Prompts
Goal: create a reusable pytest generation prompt.

Create:
- In Copilot Chat, type this command:
```text
/create-prompt Generate pytest tests for a selected Flask endpoint covering success, not found, and invalid input
			   Name it `py-generate-endpoint-tests`
```
- Press Enter.
- Open [`.github/prompts/py-generate-endpoint-tests.prompt.md`](../../.github/prompts/py-generate-endpoint-tests.prompt.md) and review the content.

Execute:
- Open [exercises/python/legacy_api.py](legacy_api.py) in the editor and select the full `deactivate` endpoint function.
- With the endpoint selected, in Copilot Chat, type this command:
```text
/py-generate-endpoint-tests
```
- Press Enter.
- Accept the generated test changes.

Verify:
- Open [exercises/python/test_legacy_api.py](test_legacy_api.py) in the editor and confirm it contains new `deactivate` endpoint tests for success, not found, and invalid input.
- Run `python -m pytest -v` and confirm the command exits with code `0`.
- Confirm output includes `passed`.
- Confirm output does not include `failed`.

Finish:
- Click the blue "Keep" button to save all changes made by Copilot

### 3. Skill
Goal: package a reusable API hardening workflow.

Create:
- In Copilot Chat, type this command:
```text
/create-skill Skill to review Flask endpoints for error handling, status codes, and response consistency
			  Name it `py-api-hardening-review`
```
- Press Enter.
- Open [`.github/skills/py-api-hardening-review/SKILL.md`](../../.github/skills/py-api-hardening-review/SKILL.md) and review the content.

Execute:
- Open [exercises/python/legacy_api.py](legacy_api.py) in the editor.
- In Copilot Chat, type this command:
```text
/py-api-hardening-review exercises/python/legacy_api.py
```
- Press Enter.

Verify:
- Confirm the output explicitly includes all three check labels: `error handling`, `status codes`, and `response consistency`.
- Confirm it names at least one endpoint from [exercises/python/legacy_api.py](legacy_api.py).
- Confirm it includes either one concrete issue with a short fix suggestion, or the exact phrase `no issues found` with brief reasoning.

Finish:
- Click the blue "Keep" button to save all changes made by Copilot

### 4. Agents
Goal: use a custom agent to add missing endpoint tests, run them, and update source code if it needs to fix a failure.

Create:
- In Copilot Chat, type this command:
```text
/create-agent Agent that writes missing pytest tests for a selected endpoint file, runs pytest, and if a test fails, updates the related source code to fix one issue
			  Name it `py-endpoint-test-fixer`
```
- Press Enter.
- Open [`.github/agents/py-endpoint-test-fixer.agent.md`](../../.github/agents/py-endpoint-test-fixer.agent.md) and review the content.

Execute:
- Open [exercises/python/legacy_api.py](legacy_api.py) in the editor.
- Open [exercises/python/test_legacy_api.py](test_legacy_api.py) in the editor.
- If you have not done so already, accept all previous code changes (if any).
- Open Copilot Chat.
- In the agent selector (bottom of chat usually "Agent"), choose `py-endpoint-test-fixer`.
- In Copilot Chat, type this command:
```text
Write missing tests for `exercises/python/legacy_api.py`
```
- Press Enter.

Verify:
- Open [exercises/python/test_legacy_api.py](test_legacy_api.py) in the editor and confirm it changed with at least one new test for behavior in [exercises/python/legacy_api.py](legacy_api.py).
- Open [exercises/python/legacy_api.py](legacy_api.py) in the editor and confirm whether the agent also changed source code to fix a failing behavior.
- Run `python -m pytest -v` and confirm the command exits with code `0`.
- Confirm output includes `passed`.
- Confirm output does not include `failed`.

Finish:
- Click the blue "Keep" button to save all changes made by Copilot

### 5. Hooks
Goal: enforce automatic checks after edits.

Create:
- In Copilot Chat, type this command:
```text
/create-hook Post-tool hook: after editing files in exercises/python, run python -m pytest -v
			  Find workspace root dynamically by searching for .github folder.
			  Verify exercises/python directory exists before running tests.
			  Output user-visible messages via systemMessage (pass/fail/warning).
			  Handle Windows and Unix paths correctly.
			  Name it `py-post-edit-pytest`
```
- Press Enter.
- Open [`.github/hooks/py-post-edit-pytest.json`](../../.github/hooks/py-post-edit-pytest.json) and review the content.
- Open [`.github/hooks/scripts/py-post-edit-pytest.js`](../../.github/hooks/scripts/py-post-edit-pytest.js) and review the content.

Execute:
- Open [exercises/python/legacy_api.py](legacy_api.py) in the editor.
- In Copilot Chat, type this command:
```text
In `exercises/python/legacy_api.py`, make a small safe cleanup.
```
- Press Enter.

Verify:
- Confirm a pytest run starts automatically right after the edit (without manually running `python -m pytest -v`).
- Confirm the command runs in `exercises/python` and executes `python -m pytest -v`.
- Confirm the command exits with code `0`.
- Confirm output includes `passed`.
- Confirm output does not include `failed`.

Finish:
- Click the blue "Keep" button to save all changes made by Copilot

---

Well done you completed all exercises
