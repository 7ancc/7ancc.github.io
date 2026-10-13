import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const guard = fileURLToPath(new URL('../scripts/check-public.mjs', import.meta.url));
async function fixture(run) {
  const root = await mkdtemp(path.join(tmpdir(), 'portfolio-public-guard-'));
  try {
    await mkdir(path.join(root, 'public/cv'), { recursive: true });
    for (const name of ['research-01.webp', 'research-02.webp', 'consulting-finance-01.webp']) await writeFile(path.join(root, 'public/cv', name), 'preview fixture');
    await run(root);
  } finally { await rm(root, { recursive: true, force: true }); }
}

test('scans nested public directories even when named like build output', async () => fixture(async root => {
  await mkdir(path.join(root, 'public/out'), { recursive: true });
  await writeFile(path.join(root, 'public/out/original-cv.pdf'), 'private document fixture');
  const result = spawnSync(process.execPath, [guard], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unapproved PDF: public\/out\/original-cv.pdf/);
}));

test('validates staged files even when removed from the working directory', async () => fixture(async root => {
  execFileSync('git', ['init', '--quiet'], { cwd: root });
  await writeFile(path.join(root, 'private-notes.md'), 'private notes fixture');
  execFileSync('git', ['add', '.'], { cwd: root });
  await rm(path.join(root, 'private-notes.md'));
  const result = spawnSync(process.execPath, [guard, '--staged'], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unapproved staged path: private-notes.md/);
}));

test('accepts the selected preview-only CV set', async () => fixture(async root => {
  const result = spawnSync(process.execPath, [guard], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
}));

test('rejects credential patterns in ordinary public text, including staged blobs', async () => fixture(async root => {
  await writeFile(path.join(root, 'public/readme.txt'), 'ghp_' + 'a'.repeat(40));
  execFileSync('git', ['init', '--quiet'], { cwd: root });
  execFileSync('git', ['add', '.'], { cwd: root });
  for (const args of [[], ['--staged']]) {
    const result = spawnSync(process.execPath, [guard, ...args], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Potential credential: public\/readme.txt/);
  }
}));
