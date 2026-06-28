#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import subprocess from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'SITE');
const ASSET_EXT = /\.(avif|gif|ico|jpe?g|png|svg|webp|woff2?|ttf|otf|css|js|pdf)$/i;
const SOURCE_EXT = /\.(html|css|js)$/i;
const failures = [];

function gitLsFiles(args) {
  return subprocess.execFileSync('git', ['-C', ROOT, 'ls-files', ...args], { encoding: 'utf8' })
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

const tracked = new Set(gitLsFiles(['SITE']));
const trackedSources = [...tracked].filter((file) => SOURCE_EXT.test(file));

function deployableTarget(fromFile, rawValue) {
  const value = rawValue.split('#')[0].split('?')[0].trim();
  if (!value || !ASSET_EXT.test(value)) return;
  if (/^(https?:|data:|mailto:|tel:)/i.test(value)) return;

  const absolute = value.startsWith('/')
    ? path.join(SITE, value.replace(/^\/+/, ''))
    : path.resolve(path.dirname(path.join(ROOT, fromFile)), value);

  const relative = path.relative(ROOT, absolute).replaceAll(path.sep, '/');
  if (!relative.startsWith('SITE/')) return;

  if (!tracked.has(relative)) {
    failures.push(`${fromFile} -> ${value} (${relative} nao versionado)`);
  }
}

for (const file of trackedSources) {
  const absoluteFile = path.join(ROOT, file);
  if (!fs.existsSync(absoluteFile)) {
    failures.push(`${file} esta rastreado pelo Git, mas ausente no worktree`);
    continue;
  }
  const source = fs.readFileSync(absoluteFile, 'utf8');
  for (const match of source.matchAll(/\b(?:src|href)=(["'])(.*?)\1/g)) {
    deployableTarget(file, match[2]);
  }
  for (const match of source.matchAll(/url\((["']?)(.*?)\1\)/g)) {
    deployableTarget(file, match[2]);
  }
}

if (failures.length) {
  console.error('Manifesto de deploy invalido: arquivos versionados apontam para assets nao versionados.');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('OK: manifesto de deploy usa somente assets versionados.');
