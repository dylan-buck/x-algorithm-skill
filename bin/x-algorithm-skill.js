#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import updateNotifier from 'update-notifier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load package.json for update-notifier
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));

// Check for updates (runs in background, notifies on next run)
const notifier = updateNotifier({ pkg, updateCheckInterval: 1000 * 60 * 60 * 24 }); // Check daily
notifier.notify({
  message: 'Update available: {currentVersion} → {latestVersion}\nRun `npx x-algorithm-skill init` to update'
});

const command = process.argv[2];

if (command !== 'init') {
  console.error('Usage: npx x-algorithm-skill init');
  console.error('');
  console.error('Commands:');
  console.error('  init    Install the X Algorithm skill for Claude Code');
  process.exit(1);
}

// Run the install script bundled with this package
const installPath = join(__dirname, '..', 'install.sh');
const child = spawn('sh', [installPath], { stdio: 'inherit' });

child.on('error', (err) => {
  console.error('Failed to run install script:', err.message);
  process.exit(1);
});

child.on('close', (code) => {
  process.exit(code);
});
