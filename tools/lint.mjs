// Minimal house linter. No dependencies on purpose.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const RULES = [
  { id: 'no-var', re: /\bvar\s+\w/, msg: 'use const or let, never var' },
  { id: 'no-console', re: /\bconsole\.log\(/, msg: 'no console.log in src/' },
];

function walk(dir) {
  return readdirSync(dir).flatMap((e) => {
    const p = join(dir, e);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.js') ? [p] : [];
  });
}

let failures = 0;
for (const file of walk('src')) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const rule of RULES) {
      if (rule.re.test(line)) {
        console.error(`${file}:${i + 1}  [${rule.id}] ${rule.msg}`);
        failures++;
      }
    }
  });
}
if (failures > 0) {
  console.error(`\nlint: ${failures} problem(s)`);
  process.exit(1);
}
console.error('lint: clean');
