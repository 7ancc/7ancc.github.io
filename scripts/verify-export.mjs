import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

for (const file of ['out/index.html', 'out/404.html', 'out/_next/static']) await stat(file);
const failures = [];
let assetCount = 0;

async function verifyAssets(directory = 'public') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { await verifyAssets(file); continue; }
    const exported = path.join('out', path.relative('public', file));
    try {
      if ((await stat(file)).size !== (await stat(exported)).size) failures.push(`Asset changed during export: ${file}`);
      assetCount++;
    } catch { failures.push(`Missing exported asset: ${file}`); }
  }
}

await verifyAssets();
const html = await readFile('out/index.html', 'utf8');
for (const text of ['TAN Can', 'Capabilities', 'Leadership in practice.', 'Intelligent Automated Seedling Cultivation System', 'Applied Innovation']) {
  if (!html.includes(text)) failures.push(`Missing expected homepage content: ${text}`);
}
const cvFiles = await readdir('out/cv');
if (cvFiles.length !== 3 || cvFiles.some(name => !name.endsWith('.webp'))) failures.push('Unexpected exported CV material.');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }

await writeFile('out/.nojekyll', '');
await writeFile('out/deployment.json', JSON.stringify({
  commit: process.env.GITHUB_SHA || 'local-preview',
  builtAt: new Date().toISOString(),
  assets: assetCount,
  format: 'next-static-export'
}, null, 2) + '\n');
console.log(`Static export verified: HTML, 404 page, JavaScript/CSS and ${assetCount} public assets. CV originals excluded.`);
