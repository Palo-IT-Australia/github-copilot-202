# Pre-work: get ready BEFORE the session (about 10 minutes)

The hands-on session is 45 minutes and has no time for installs. Do all of this beforehand, and bring a laptop where the final check passes.

## Requirements

- **VS Code** version 1.116 or higher
- **GitHub Copilot** extension with an active subscription, signed in (GitHub Copilot Chat installs automatically)
- **Node.js** 20 or higher. Check with `node --version`.
- **Git**

## Steps

1. Clone `https://github.com/Palo-IT-Australia/github-copilot-202`, then in VS Code use **File > Open Folder** and open the `exercises/playwright` folder (not the repo root). This keeps everything Copilot creates inside this exercise.
2. When VS Code offers the recommended extensions (**Playwright Test for VS Code** and **GitHub Copilot Chat**), click **Install**.
3. In a terminal inside VS Code (`` Ctrl+` ``), run:

   ```bash
   npm ci
   npm run setup:browsers
   ```

4. Run the final check:

   ```bash
   npm run smoke
   ```

   **Expected:** `2 passed`. The Playwright config starts the demo app for you.
5. Open **Copilot Chat**, select **Agent** mode, and say hello. It should reply.
   **Check the session type.** The chip at the bottom left of the chat box must say **Local**, as in the picture below. If it says **Copilot** or **Cloud**, click it and choose **Local** under *Continue In* (or press `Ctrl+N` for a new chat session and check again). Copilot and Cloud sessions work from the repository root and skip this exercise's hooks.

   ![Chat session type picker with Local selected](docs/images/chat-session-type.png)
6. Open the **Testing** view (beaker icon). You should see the tests listed.

## Done when

- `npm run smoke` shows `2 passed`
- Copilot Chat replies in Agent mode, and the session type chip says **Local**
- The Explorer root shows `app`, `tests` and `package.json` (you opened the `exercises/playwright` folder)

## Problems?

| Problem | Try |
|---|---|
| `npm ci` fails behind a proxy | Ask IT for the npm registry setting, or contact the trainer |
| Browser download blocked | Contact the trainer before the session for an alternative |
| Port 3100 is in use | Stop the program using it (the demo app and the tests both use port 3100), then try again |
| Copilot says `Denied by preToolUse hook` | A hook from another plugin on your machine is failing. Disable or uninstall that plugin, reload VS Code, and try again |
| Copilot Chat does not reply | Sign in to GitHub from the VS Code account menu and check your Copilot subscription |

If you cannot get it working, tell the trainer **before** the session so you can be paired with someone.
