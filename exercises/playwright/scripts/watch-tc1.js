// Runs the TC1 UI tests in a visible browser, in slow motion, so you can watch each step.
// Works the same on Windows, macOS and Linux. It runs the installed Playwright CLI directly
// through Node (no shell), so quoted arguments such as --grep "some title" stay intact.
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const playwrightCli = path.join(path.dirname(require.resolve('@playwright/test/package.json')), 'cli.js');

const result = spawnSync(
  process.execPath,
  [playwrightCli, 'test', '--grep', '@tc1', '--headed', '--workers=1', ...process.argv.slice(2)],
  { stdio: 'inherit', env: { ...process.env, PW_SLOWMO: process.env.PW_SLOWMO || '800' } },
);
process.exit(result.status ?? 1);
