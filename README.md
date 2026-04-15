# GitHub Copilot Customization Workshop

## Table of Contents

- [Introduction](#introduction)
- [Learning Objectives](#learning-objectives)
- [Completion Criteria](#completion-criteria)
- [Definition Of Done Per Concept](#definition-of-done-per-concept)
- [Concept Quick Guide](#concept-quick-guide)
- [Concepts](#concepts)
- [Prerequisites](#prerequisites)
- [Language Track Guidance](#language-track-guidance)
- [Troubleshooting](#troubleshooting)
- [Reset And Recovery](#reset-and-recovery)
- [Debrief Questions](#debrief-questions)
- [Reference](#reference)

## Introduction

This is a hands-on training repository for Copilot customisation. We have created 3 simple apps in 3 different languages (Python, TypeScript, JavaScript) which you can use to run exercises in these core concepts:
- instructions
- prompts
- skills
- agents
- hooks

Choose one language track and run through all core concepts in that language. See the "Language Track Guidance" section below for track links and details.

If you are ready to go and want to jump straight into the exercise, follow the instructions here:
- [Prerequisites](#prerequisites)
- [Language Track Guidance](#language-track-guidance)

---

## Learning Objectives

By the end of the workshop, attendees should be able to:
- apply all five customisation concepts in one selected language track
- create reusable project guidance and task prompts for repeated use
- build at least one custom agent workflow and validate it end-to-end
- apply hook-based guardrails to enforce checks automatically
- verify AI-assisted outputs with runnable commands and tests

---

## Completion Criteria

You are done when you can demonstrate all of the following in one track:
- created at least one instructions file and used it in a coding request
- created and executed at least one prompt
- created and invoked at least one skill
- created and used at least one agent
- created at least one hook and validated it triggers as expected

---

## Definition Of Done Per Concept

- Instructions: Copilot output reflects your instruction constraints in a new request.
- Prompts: A saved prompt runs successfully and produces a repeatable result.
- Skills: A skill is discoverable and provides a multi-step workflow when invoked.
- Agents: A custom agent completes a multi-step task end-to-end, including test changes and related source-code fixes when needed.
- Hooks: A hook runs automatically at the intended lifecycle point.

---

## Concept Quick Guide

You have pre-training with slides, so this section is intentionally brief:
- Instructions: Always-on guidance for Copilot behaviour in this project. Use when you want Copilot to consistently apply rules across requests.
- Prompts: Reusable templates for common prompt tasks. Use when you repeat the same type of request often.
- Skills: Packaged workflows plus domain context. Use for multi-step tasks in a specific area.
- Agents: Specialized Copilot modes for end-to-end task execution. Use them for larger tasks that may need to update tests and source code, run validation, and fix issues in one workflow.
- Hooks: Automatic checks triggered after actions. Use to enforce validation, like tests or linting, without manual steps.

---

## Concepts

Work through all five concepts in your chosen track README. Each concept has a slash command to create it:

| # | Concept | What It Does | Command |
|---|---------|--------------|---------|
| 1 | Instructions | Always-on project guidance for Copilot behaviour | `/create-instructions` |
| 2 | Prompts | Reusable templates for repeated requests | `/create-prompt` |
| 3 | Skills | Reusable workflows with domain context | `/create-skill` |
| 4 | Agents | End-to-end task execution that can update tests, source code, and validation steps | `/create-agent` |
| 5 | Hooks | Automatic checks after file or tool actions | `/create-hook` |

---

## Prerequisites

- VS Code with the **GitHub Copilot** and **GitHub Copilot Chat** extensions installed
- GitHub account with an active Copilot subscription

See your chosen track README for setup commands, run instructions, and how to verify.

---

## Language Track Guidance
Use the code in `exercises/` as your playground.

The codebases differ by language and domain but the learning objectives are the same.
Choose one primary track based on familiarity with the language. Follow the instructions in the selected track `README.md`.
- JavaScript track: cart and checkout logic [exercises/javascript/README.md](exercises/javascript/README.md)
- TypeScript track: typed user service and tests [exercises/typescript/README.md](exercises/typescript/README.md)
- Python track: sales data processing plus legacy API hardening [exercises/python/README.md](exercises/python/README.md)

---

## Troubleshooting

- Slash commands not showing: ensure Copilot Chat is active and type `/` in the chat input.
- Slash commands not available in your chat mode: switch to the workshop/customization mode provided by your facilitator.
- If a `/` command is still not available, contact your trainer.
- Dependency issues: rerun install commands in the selected language folder.
- Python activation problems: use the shell-specific activation command from `exercises/python/README.md`.
- Path confusion: run commands from repo root or follow each command exactly as shown.
- Tests failing unexpectedly: confirm you are running tests in the intended language folder.

---

## Reset And Recovery

If you get stuck and want a clean local state:

Warning: `git clean -fd` permanently deletes untracked files.

```bash
git status
git restore --staged .
git restore .
git clean -fd
```

Then reinstall dependencies for your selected track and rerun tests.

---

## Debrief Questions

After completing all five concepts, discuss:

- Which customisation type gave you the highest leverage and why?
- What should become team-wide standards versus personal preferences?
- Which guardrails should be enforced with hooks instead of instructions?
- How will you validate AI-generated changes in your real projects?

---

## Reference

- [Copilot Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Prompt Files](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental)
- [Skills](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [Agent Customization](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [Hooks](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [MCP Servers in VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)
