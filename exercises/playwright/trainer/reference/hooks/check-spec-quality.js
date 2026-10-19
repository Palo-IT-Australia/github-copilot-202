// Reference hook script (optional Concept 5).
// Reads the VS Code hook payload from stdin, finds the edited file, and flags
// "waitForTimeout" and tests without a tag. Read only: it never modifies files.
const fs = require('fs');

function readStdin() {
  try {
    return JSON.parse(fs.readFileSync(0, 'utf8') || '{}');
  } catch {
    return {};
  }
}

const payload = readStdin();
const filePath =
  (payload.tool_input && (payload.tool_input.filePath || payload.tool_input.file_path)) ||
  process.env.TOOL_INPUT_FILE_PATH;

function out(message) {
  process.stdout.write(JSON.stringify({ systemMessage: message }));
}

if (!filePath || !/\.spec\.ts$/.test(filePath)) {
  process.exit(0); // not a spec file: stay silent
}

let text;
try {
  text = fs.readFileSync(filePath, 'utf8');
} catch (err) {
  out(`❌ Could not read ${filePath}: ${err.message}`);
  process.exit(0);
}

const problems = [];
text.split('\n').forEach((line, i) => {
  if (line.includes('waitForTimeout')) problems.push(`line ${i + 1}: waitForTimeout`);
  if (/^\s*test\(/.test(line) && !line.includes('tag')) problems.push(`line ${i + 1}: test without a tag option`);
});

out(problems.length ? `⚠️ Spec quality:\n- ${problems.join('\n- ')}` : '✅ Spec quality: no issues found');
