#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'SITE');
const failures = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full.includes(`${path.sep}docs${path.sep}backups`)) return [];
      return walk(full);
    }
    return entry.isFile() && entry.name.endsWith('.html') ? [full] : [];
  });
}

function localTargetExists(fromFile, rawHref) {
  const clean = rawHref.split('#')[0].split('?')[0];
  if (!clean) return true;
  const base = clean.startsWith('/')
    ? path.join(SITE, clean.replace(/^\/+/, ''))
    : path.resolve(path.dirname(fromFile), clean);
  if (path.extname(base)) return fs.existsSync(base);
  return fs.existsSync(base) || fs.existsSync(path.join(base, 'index.html'));
}

for (const file of walk(SITE)) {
  const html = fs.readFileSync(file, 'utf8').replace(/<script\b[\s\S]*?<\/script>/gi, '');
  const links = html.matchAll(/\bhref=(["'])(.*?)\1/g);
  for (const match of links) {
    const href = match[2].trim();
    if (!href || href.startsWith('#')) continue;
    if (/^(https?:|mailto:|tel:|javascript:)/i.test(href)) continue;
    if (!localTargetExists(file, href)) {
      failures.push(`${path.relative(ROOT, file)} -> ${href}`);
    }
  }
}

if (failures.length) {
  console.error('Links internos quebrados:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('OK: links internos locais validos.');
