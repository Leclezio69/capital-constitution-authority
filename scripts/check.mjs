import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const required = ['index.html', 'styles.css', 'app.js', 'vercel.json', 'api/chief.js', 'api/narrate.js'];
let failed = false;
for (const file of required) {
  const p = path.join(root, file);
  if (!fs.existsSync(p) || fs.statSync(p).size < 20) {
    console.error(`Missing or empty: ${file}`);
    failed = true;
  }
}
if (failed) process.exit(1);
console.log('CAPITAL//CONSTITUTION package check passed.');
