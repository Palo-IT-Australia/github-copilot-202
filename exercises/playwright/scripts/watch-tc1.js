// Runs the TC1 UI tests in a visible browser, in slow motion, so you can watch each step.
// Works the same on Windows, macOS and Linux (no extra dependencies).
const { spawnSync } = require('node:child_process');

const result = spawnSync(
  'npx',
  ['playwright', 'test', '--grep', '@tc1', '--headed', '--workers=1', ...process.argv.slice(2)],
  { stdio: 'inherit', shell: true, env: { ...process.env, PW_SLOWMO: process.env.PW_SLOWMO || '800' } },
);
process.exit(result.status ?? 1);
