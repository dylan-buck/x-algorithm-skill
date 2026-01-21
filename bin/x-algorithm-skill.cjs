#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const command = process.argv[2];

if (command !== 'init') {
  console.error('Usage: npx x-algorithm-skill init');
  console.error('');
  console.error('Commands:');
  console.error('  init    Install the X Algorithm skill for Claude Code');
  process.exit(1);
}

// Run the install script bundled with this package
const installPath = path.join(__dirname, '..', 'install.sh');
const child = spawn('sh', [installPath], { stdio: 'inherit' });

child.on('error', (err) => {
  console.error('Failed to run install script:', err.message);
  process.exit(1);
});

child.on('close', (code) => {
  process.exit(code);
});
