import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ignored = new Set(['.git', 'node_modules', '.next', 'dist', 'out', '.release-reports']);
const privateNames = new Set(['.openai', '.impeccable', '.env', '.wrangler', '.sites-runtime', '.codex', '.agents']);
const allowedPapers = new Set(['climate-forecasting-plos-one.pdf', 'healthcare-investment-frl.pdf', 'transformational-leadership.pdf']);
const failures = [];
const tokenPatterns = [/\bgh[pousr]_[A-Za-z0-9]{30,}\b/, /\bgithub_pat_[A-Za-z0-9_]{30,}\b/, /\bsk-(?:proj-)?[A-Za-z0-9_-]{30,}\b/, /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/];
const releaseDirectories = new Set(['app', 'components', 'lib', 'public', 'scripts', 'docs', 'tests', '.github']);
const releaseFiles = new Set(['.gitignore', '.gitattributes', '.nvmrc', 'Publish.command', 'README.md', 'package.json', 'package-lock.json', 'next.config.ts', 'postcss.config.mjs', 'tsconfig.json']);

function checkFile(file, size, contents) {
  const parts = file.split('/');
  if (parts.some(name => privateNames.has(name) || name.startsWith('.env')) || /\.(?:pem|key|p12|pfx|sqlite3?|db|zip|caj|docx?)$/i.test(file)) failures.push(`Private file: ${file}`);
  if (file.startsWith('public/')) {
    if (/\.pdf$/i.test(file) && (path.dirname(file) !== 'public/papers' || !allowedPapers.has(path.basename(file)))) failures.push(`Unapproved PDF: ${file}`);
    if (/\.json$/i.test(file)) failures.push(`Private asset provenance: ${file}`);
  }
  if (size >= 100 * 1024 * 1024) failures.push(`GitHub file size limit: ${file}`);
  if (contents !== undefined) {
    if (tokenPatterns.some(pattern => pattern.test(contents))) failures.push(`Potential credential: ${file}`);
    if (file !== 'scripts/check-public.mjs' && /\/Users\/|appgprj_|siwc_bypass_bearer_token|OAI-Sites-Authorization/.test(contents)) failures.push(`Internal source/platform data: ${file}`);
  }
}
const textFile = file => /\.(?:[cm]?[jt]sx?|json|ya?ml|sh|command|md|css|svg|txt|csv|ini|conf|config|toml|xml|html|log|properties|rst)$/i.test(file);

async function scan(directory = '.') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (directory === '.' && ignored.has(entry.name)) continue;
    const file = path.join(directory, entry.name);
    if (privateNames.has(entry.name) || entry.name.startsWith('.env') || /\.(?:pem|key|p12|pfx|sqlite3?|db|zip|caj|docx?)$/i.test(entry.name)) failures.push(`Private file: ${file}`);
    if (entry.isSymbolicLink()) { failures.push(`Unexpected symlink: ${file}`); continue; }
    if (entry.isDirectory()) { await scan(file); continue; }
    if (entry.name.startsWith('._') || entry.name.endsWith('.tsbuildinfo')) continue;
    checkFile(file, (await stat(file)).size, textFile(file) ? await readFile(file, 'utf8') : undefined);
  }
}

let cvFiles;
if (process.argv.includes('--staged')) {
  const entries = execFileSync('git', ['ls-files', '--stage', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
  cvFiles = [];
  for (const entry of entries) {
    const [metadata, file] = entry.split('\t');
    const [mode, sha, stage] = metadata.split(' ');
    if (!releaseDirectories.has(file.split('/')[0]) && !releaseFiles.has(file)) failures.push(`Unapproved staged path: ${file}`);
    if (stage !== '0' || mode === '120000' || mode === '160000') { failures.push(`Unresolved or linked staged file: ${file}`); continue; }
    const size = Number(execFileSync('git', ['cat-file', '-s', sha], { encoding: 'utf8' }));
    const contents = textFile(file) ? execFileSync('git', ['cat-file', 'blob', sha], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }) : undefined;
    checkFile(file, size, contents);
    if (file.startsWith('public/cv/')) cvFiles.push(path.basename(file));
  }
} else {
  await scan();
  cvFiles = await readdir('public/cv');
}
if (cvFiles.length !== 3 || cvFiles.some(name => !name.endsWith('.webp'))) failures.push('CV Hub must contain exactly three page previews, never original PDFs.');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log('Public-file checks passed: no detected credentials/private configuration; only approved paper PDFs; view-only CV previews.');
