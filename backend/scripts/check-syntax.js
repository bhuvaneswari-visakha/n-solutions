import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const sourceRoots = ['src', 'scripts', 'test'];
const files = [];

const collectJavaScript = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) collectJavaScript(path);
    else if (entry.isFile() && path.endsWith('.js') && path !== join('scripts', 'check-syntax.js')) files.push(path);
  }
};

for (const root of sourceRoots) collectJavaScript(root);

for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}

console.log(`Syntax OK: ${files.length} JavaScript files checked.`);
