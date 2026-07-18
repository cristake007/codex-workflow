import { appendFile, mkdir, open } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';

const SCHEMA_VERSION = 1;

function sanitizePathSegment(value) {
  return String(value || 'unknown-session').replace(/[^a-zA-Z0-9._-]/g, '_');
}

function firstString(...values) {
  return values.find((value) => typeof value === 'string' && value.trim() !== '') || null;
}

function markdownFence(value, language) {
  const text = String(value ?? '');
  const longestRun = Math.max(0, ...Array.from(text.matchAll(/`+/g), (match) => match[0].length));
  const fence = '`'.repeat(Math.max(3, longestRun + 1));
  return `${fence}${language}\n${text}\n${fence}`;
}

async function readStdin() {
  let input = '';
  for await (const chunk of process.stdin) input += chunk;
  return input;
}

async function createFileOnce(filePath, content) {
  let handle;
  try {
    handle = await open(filePath, 'wx');
    await handle.writeFile(content, 'utf8');
  } catch (error) {
    if (error?.code !== 'EEXIST') throw error;
  } finally {
    await handle?.close();
  }
}

async function writeSessionMetadata(sessionDir, event, timestamp) {
  const metadata = {
    schema_version: SCHEMA_VERSION,
    session_id: event.session_id,
    created_at: timestamp,
    cwd: firstString(event.cwd),
    model: firstString(event.model),
    permission_mode: firstString(event.permission_mode),
    transcript_path: firstString(event.transcript_path),
  };

  await createFileOnce(
    path.join(sessionDir, 'session.json'),
    `${JSON.stringify(metadata, null, 2)}\n`,
  );
}

async function exportPrompt(sessionDir, event, timestamp) {
  if (typeof event.prompt !== 'string') return;

  const record = {
    schema_version: SCHEMA_VERSION,
    timestamp,
    turn_id: firstString(event.turn_id),
    cwd: firstString(event.cwd),
    prompt: event.prompt,
  };

  const markdown = [
    `## ${timestamp}`,
    '',
    `- Turn: ${record.turn_id || 'unknown'}`,
    `- Working directory: ${record.cwd || 'unknown'}`,
    '',
    markdownFence(event.prompt, 'text'),
    '',
  ].join('\n');

  await Promise.all([
    appendFile(path.join(sessionDir, 'prompts.jsonl'), `${JSON.stringify(record)}\n`, 'utf8'),
    appendFile(path.join(sessionDir, 'PROMPTS.md'), markdown, 'utf8'),
  ]);
}

async function exportCommand(sessionDir, event, timestamp) {
  if (event.tool_name !== 'Bash' || typeof event.tool_input?.command !== 'string') return;

  const commandCwd = firstString(
    event.tool_input?.cwd,
    event.tool_input?.workdir,
    event.cwd,
  );

  const record = {
    schema_version: SCHEMA_VERSION,
    timestamp,
    turn_id: firstString(event.turn_id),
    tool_use_id: firstString(event.tool_use_id),
    cwd: commandCwd,
    command: event.tool_input.command,
    tool_input: event.tool_input,
  };

  const markdown = [
    `## ${timestamp}`,
    '',
    `- Turn: ${record.turn_id || 'unknown'}`,
    `- Tool call: ${record.tool_use_id || 'unknown'}`,
    `- Working directory: ${record.cwd || 'unknown'}`,
    '',
    markdownFence(record.command, 'shell'),
    '',
  ].join('\n');

  await Promise.all([
    appendFile(path.join(sessionDir, 'commands.jsonl'), `${JSON.stringify(record)}\n`, 'utf8'),
    appendFile(path.join(sessionDir, 'COMMANDS.md'), markdown, 'utf8'),
  ]);
}

async function main() {
  const rawInput = await readStdin();
  if (!rawInput.trim()) return;

  const event = JSON.parse(rawInput);
  if (!event || typeof event !== 'object' || !event.session_id) return;

  const codexHome = path.resolve(
    process.env.CODEX_HOME || path.join(homedir(), '.codex'),
  );
  const exportRoot = path.resolve(
    process.env.CODEX_CHAT_EXPORT_DIR || path.join(codexHome, 'chat-exports'),
  );
  const sessionDir = path.join(exportRoot, sanitizePathSegment(event.session_id));
  const timestamp = new Date().toISOString();

  await mkdir(sessionDir, { recursive: true });
  await writeSessionMetadata(sessionDir, event, timestamp);

  if (event.hook_event_name === 'UserPromptSubmit') {
    await exportPrompt(sessionDir, event, timestamp);
  } else if (event.hook_event_name === 'PostToolUse') {
    await exportCommand(sessionDir, event, timestamp);
  }
}

main().catch((error) => {
  // Audit export must never interrupt the user's Codex task.
  console.error(`[chat-audit-export] ${error.message}`);
});
