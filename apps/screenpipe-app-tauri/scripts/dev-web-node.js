// DESK-AI — Desktop AI Assistant
// Node.js development launcher for web mode (mock / live)

const { spawn } = require('child_process');
const path = require('path');

const requestedMode = process.argv[2] || 'mock';
const port = process.env.SCREENPIPE_WEB_API_PORT || '3030';
const scenario = process.env.SCREENPIPE_WEB_SCENARIO || 'ready';
const apiKey = process.env.SCREENPIPE_LOCAL_API_KEY || '';

console.log(`[DESK-AI web dev] Mode: ${requestedMode} (scenario: ${scenario})`);
console.log(`[DESK-AI web dev] Server starting at http://127.0.0.1:1420/home`);

const env = {
  ...process.env,
  NEXT_PUBLIC_SCREENPIPE_WEB_DEV: requestedMode,
  NEXT_PUBLIC_SCREENPIPE_WEB_SCENARIO: scenario,
  NEXT_PUBLIC_SCREENPIPE_WEB_API_PORT: port,
  NEXT_PUBLIC_SCREENPIPE_WEB_API_KEY: apiKey,
};

const appDir = path.resolve(__dirname, '..');
const nextBin = path.resolve(appDir, 'node_modules', '.bin', process.platform === 'win32' ? 'next.cmd' : 'next');

const child = spawn('npx', ['next', 'dev', '-H', '127.0.0.1', '-p', '1420'], {
  cwd: appDir,
  env,
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  process.exit(code || 0);
});

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
