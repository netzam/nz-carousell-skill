#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const skillPath = path.join(repoRoot, 'SKILL.md');
const defaultInstallPath = path.join(
  os.homedir(),
  '.hermes',
  'skills',
  'software-development',
  'carousell-har-backend-sync',
  'SKILL.md',
);

function printHelp() {
  process.stdout.write(`nz-carousell-skill\n\n`);
  process.stdout.write(`Usage:\n`);
  process.stdout.write(`  npx github:netzam/nz-carousell-skill skills add\n`);
  process.stdout.write(`  npx github:netzam/nz-carousell-skill skills print\n`);
  process.stdout.write(`  npx github:netzam/nz-carousell-skill print\n`);
  process.stdout.write(`  npx github:netzam/nz-carousell-skill install\n`);
  process.stdout.write(`\nCommands:\n`);
  process.stdout.write(`  skills add     Copy SKILL.md into the local Hermes skills directory.\n`);
  process.stdout.write(`  skills print   Print the packaged SKILL.md to stdout.\n`);
  process.stdout.write(`  print          Print the packaged SKILL.md to stdout.\n`);
  process.stdout.write(`  install        Copy SKILL.md into the local Hermes skills directory.\n`);
  process.stdout.write(`\nOptions:\n`);
  process.stdout.write(`  --target <path>  Override the install destination for add/install.\n`);
  process.stdout.write(`  --help           Show this help text.\n`);
  process.stdout.write(`\nDefault install path:\n  ${defaultInstallPath}\n`);
}

function ensureParentDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function installSkill(targetPath) {
  ensureParentDir(targetPath);
  fs.copyFileSync(skillPath, targetPath);
  process.stdout.write(`Installed SKILL.md to ${targetPath}\n`);
}

function main(argv) {
  const args = argv.slice(2);
  const command = args.find((arg) => !arg.startsWith('--')) || 'help';
  const commandIndex = args.indexOf(command);
  const subcommand = command === 'skills' ? (args[commandIndex + 1] || 'help') : null;
  const targetFlagIndex = args.indexOf('--target');
  const targetPath = targetFlagIndex >= 0 ? args[targetFlagIndex + 1] : defaultInstallPath;

  if (args.includes('--help') || command === 'help') {
    printHelp();
    return;
  }

  if (command === 'print' || (command === 'skills' && subcommand === 'print')) {
    process.stdout.write(fs.readFileSync(skillPath, 'utf8'));
    return;
  }

  if (command === 'install' || (command === 'skills' && subcommand === 'add')) {
    if (!targetPath || targetPath.startsWith('--')) {
      throw new Error('Missing install target path.');
    }
    installSkill(targetPath);
    return;
  }

  throw new Error(`Unknown command: ${command}${subcommand ? ` ${subcommand}` : ''}`);
}

try {
  main(process.argv);
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
