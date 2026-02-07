#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pkgPath = path.join(root, 'package.json');
const readmePath = path.join(root, 'README.md');
const cardPath = path.join(root, 'src', 'bmw-status-card.ts');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const version = pkg.version;

const updateFile = (filePath, replacer) => {
  const input = fs.readFileSync(filePath, 'utf8');
  const output = replacer(input);
  if (input !== output) {
    fs.writeFileSync(filePath, output, 'utf8');
    console.log(`Updated ${path.relative(root, filePath)}`);
  }
};

updateFile(cardPath, (content) =>
  content.replace(/const VERSION = '.*?';/, `const VERSION = '${version}';`)
);

updateFile(readmePath, (content) => {
  if (content.includes('Version:')) {
    return content.replace(/Version: .*\n/, `Version: ${version}\n`);
  }
  return `Version: ${version}\n\n${content}`;
});
