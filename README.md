# GitHub Copilot Customization excercise

## Table of Contents

- [Introduction](#introduction)
- [Learning Objectives](#learning-objectives)
- [Completion Criteria](#completion-criteria)
- [Concepts](#concepts)
- [Prerequisites](#prerequisites)
- [Language Track Guidance](#language-track-guidance)
- [Debrief Questions](#debrief-questions)
- [Troubleshooting](#troubleshooting)
- [Reset And Recovery](#reset-and-recovery)
- [Reference](#reference)

## Introduction

This is a hands-on training repository for Copilot customisation (instructions, prompts, agents, skills, hooks). We have created 3 simple apps in 3 different languages (Python, TypeScript, JavaScript) which you can use to run exercises in these core concepts:
- instructions
- prompts
- skills
- agents
- hooks

Choose one language track and run through all core concepts in that language. 

If you are ready to go and want to jump straight into the exercise, follow the instructions here:
- [Prerequisites](#prerequisites)
- [Language Track Guidance](#language-track-guidance)

---

## Learning Objectives

By the end of the exercise, attendees will have learned how to apply all five customisation concepts (instructions, prompts, agents, skills, hooks) using the provided apps at a basic level. This workshop covers foundational implementations and does not explore advanced variations or edge cases for each concept.

---

## Completion Criteria

You are done when you can demonstrate all of the following in one track. For each concept, create/execute it and validate the definition of done:

- **Instructions**: Create and use an instructions file in a coding request. Validated when Copilot output reflects your instruction constraints in the new request.
- **Prompts**: Create and execute a stored prompt. Validated when it runs successfully and produces a repeatable result.
- **Skills**: Create and invoke a skill. Validated when it is discoverable and provides a multi-step workflow when invoked.
- **Agents**: Create and use a custom agent. Validated when it completes a multi-step task end-to-end, including test changes and related source-code fixes when needed.
- **Hooks**: Create and validate a hook. Validated when it runs automatically at the intended lifecycle point.

---

## Concepts

Work through all five concepts in your chosen track README. Each concept has a slash command to create it:

When a step asks you to send a Copilot Chat prompt or slash command, observe the AI reasoning in Chat and wait for it to finish before you continue.

| # | Concept | What It Does | When To Use | Command |
|---|---------|--------------|-------------|---------|
| 1 | Instructions | Always-on project guidance for Copilot behaviour | When you want Copilot to consistently apply rules across requests | `/create-instructions` |
| 2 | Prompts | Reusable templates for repeated requests | When you repeat the same type of request often | `/create-prompt` |
| 3 | Skills | Reusable workflows with domain context | For multi-step tasks in a specific area | `/create-skill` |
| 4 | Agents | End-to-end task execution that can update tests, source code, and validation steps | For larger tasks that may need to update tests, source code, run validation, and fix issues in one workflow | `/create-agent` |
| 5 | Hooks | Automatic checks after file or tool actions | To enforce validation, like tests or linting, without manual steps | `/create-hook` |

---

## Prerequisites

- VS Code with the **GitHub Copilot** extension installed (GitHub Copilot Chat is installed automatically as a companion)
- GitHub account with an active Copilot subscription

---

## Language Track Guidance
Use the code in [exercises/](exercises/) as your playground.

The codebases differ by language and domain but the learning objectives are the same.
Choose one primary track based on familiarity with the language. Follow the instructions in the selected track README.
- JavaScript track: [exercises/javascript/README.md](exercises/javascript/README.md)
- TypeScript track: [exercises/typescript/README.md](exercises/typescript/README.md)
- Python track: [exercises/python/README.md](exercises/python/README.md)

---

## Debrief Questions

After completing all five concepts, discuss:

- Which customisation type gave you the highest leverage and why?
- What should become team-wide standards versus personal preferences?
- Which guardrails should be enforced with hooks instead of instructions?
- How will you validate AI-generated changes in your real projects?

---

## Troubleshooting

- Slash commands not showing: ensure Copilot Chat is active and type `/` in the chat input.
- Slash commands not available in your chat mode: switch to the excercise/customization mode provided by your facilitator.
- If a `/` command is still not available, contact your trainer.
- Dependency issues: rerun install commands in the selected language folder.
- Python activation problems: use the shell-specific activation command from [exercises/python/README.md](exercises/python/README.md).
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

## Reference

- [Copilot Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Prompt Files](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental)
- [Skills](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [Agent Customization](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [Hooks](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [MCP Servers in VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)
