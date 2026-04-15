# Python Track

## What This Codebase Does
This track contains two learning surfaces:
- `data_processor.py`: CSV-based sales analytics and report generation
- `legacy_api.py`: Flask user API with intentional inconsistencies/bugs for workshop practice

Main files:
- `data_processor.py`: processing and summary functions
- `main.py`: demo report generator
- `legacy_api.py`: API endpoints
- `test_legacy_api.py`: API tests

## Setup
```bash
cd exercises/python
python -m venv .venv
```

Activate virtual environment:
- PowerShell:
```powershell
.\.venv\Scripts\Activate.ps1
```
- macOS/Linux bash:
```bash
source .venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

## Run
Data demo:
```bash
python main.py
```

API server:
```bash
python legacy_api.py
```

## Verify Result
```bash
python -m pytest -v
```

Successful verification means:
- Pytest completes and current tests pass
- `main.py` prints a report summary
- API endpoints respond and can be improved through exercises

## Concept Examples (Simple And Verifiable)

### 1. Instructions
Goal: enforce safer API behavior rules.

Create:
- In Copilot Chat, type `/create-instructions`
- Use this example request:
	- "Python Flask rules: avoid bare except, always return jsonify for JSON responses, and validate request input before use."
- Open the generated instructions file (`*.instructions.md`) in [`../../.github/`](../../.github/) (commonly in `.github/instructions/`, or `.github/copilot-instructions.md`) and review the content.

Execute:
- Ask Copilot: "In `exercises/python/legacy_api.py`, make `/users/search` return `jsonify` consistently."

Verify:
- Run:
```bash
cd exercises/python
python -m pytest -v
```
- Confirm the pytest summary shows all tests passing.
- Open `exercises/python/test_legacy_api.py` in VS Code.
- In Copilot Chat, ask: "Add or update a pytest for `/users/search` that asserts the response is JSON and uses consistent JSON fields."
- Accept the test change, and confirm the test checks JSON behavior (for example `response.is_json` or JSON `Content-Type`).
- Re-run `python -m pytest -v` and confirm that test passes.
- Do a quick source check in `exercises/python/legacy_api.py` to confirm `/users/search` returns `jsonify` consistently.

### 2. Prompts
Goal: create a reusable pytest generation prompt.

Create:
- In Copilot Chat, type `/create-prompt`
- Use this example request:
	- "Generate pytest tests for selected Flask endpoint covering success, not found, and invalid input."
- Open the generated prompt file (`*.prompt.md`) in [`../../.github/`](../../.github/) (commonly in `.github/prompts/`) and review the content.

Execute:
- Open `exercises/python/legacy_api.py` in VS Code and select the full `deactivate` endpoint function.
- Open Copilot Chat and run your custom prompt while the endpoint is selected.
- Accept the generated test changes.

Verify:
- Confirm new tests were added to `exercises/python/test_legacy_api.py` for success, not found, and invalid input.
- Run `python -m pytest -v` and confirm pass.

### 3. Skills
Goal: package a reusable API hardening workflow.

Create:
- In Copilot Chat, type `/create-skill`
- Use this example request:
	- "Skill to review Flask endpoints for error handling, status codes, and response consistency."
- Open the generated skill file in [`../../.github/`](../../.github/) (commonly `.github/skills/<skill-name>/SKILL.md`) and review the content.

Execute:
- In Copilot Chat, invoke the skill on `exercises/python/legacy_api.py`.

Verify:
- Confirm the output includes checks for error handling, status codes, and response consistency.
- Confirm it names at least one specific endpoint in `exercises/python/legacy_api.py`.
- Confirm it gives either one concrete issue with a short fix suggestion, or an explicit "no issues found" statement with brief reasoning.

### 4. Agents
Goal: automate endpoint test and fix loop.

Create:
- In Copilot Chat, type `/create-agent`
- Use this example request:
	- "Agent that writes missing pytest tests for selected endpoint file, runs pytest, and fixes one failing issue."
- Open the generated agent file (`*.agent.md`) in [`../../.github/`](../../.github/) (commonly in `.github/agents/`) and review the content.

Execute:
- In Copilot Chat, ask: "Write missing tests for `exercises/python/legacy_api.py`."

Verify:
- Confirm `exercises/python/test_legacy_api.py` changed.
- Run `python -m pytest -v` and confirm pass.

### 5. Hooks
Goal: enforce automatic checks after edits.

Create:
- In Copilot Chat, type `/create-hook`
- Use this example request:
	- "Post-tool hook: after editing files in exercises/python, run python -m pytest -v in exercises/python."
- Open the generated hook configuration in [`../../.github/`](../../.github/) and review the content.

Execute:
- In Copilot Chat, ask for a small safe cleanup in `exercises/python/legacy_api.py`.

Verify:
- Confirm a pytest run starts automatically right after the edit (without manually running `python -m pytest -v`).
- Confirm the command runs in `exercises/python` and prints pytest output.
- Confirm the terminal summary shows all tests passing.
