#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'SITE');
const ASSET_EXT = /\.(avif|gif|ico|jpe?g|png|svg|webp|woff2?|ttf|otf|css|js|pdf)$/i;
const failures = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full.includes(`${path.sep}docs${path.sep}backups`)) return [];
      return walk(full);
    }
    return entry.isFile() && /\.(html|css|js)$/i.test(entry.name) ? [full] : [];
  });
}

function existsFrom(fromFile, rawValue) {
  const value = rawValue.split('#')[0].split('?')[0].trim();
  if (!value || !ASSET_EXT.test(value)) return true;
  if (/^(https?:|data:|mailto:|tel:)/i.test(value)) return true;
  const target = value.startsWith('/')
    ? path.join(SITE, value.replace(/^\/+/, ''))
    : path.resolve(path.dirname(fromFile), value);
  return fs.existsSync(target);
}

for (const file of walk(SITE)) {
  const source = fs.readFileSync(file, 'utf8');
  for (const match of source.matchAll(/\b(?:src|href)=(["'])(.*?)\1/g)) {
    if (!existsFrom(file, match[2])) failures.push(`${path.relative(ROOT, file)} -> ${match[2]}`);
  }
  for (const match of source.matchAll(/url\((["']?)(.*?)\1\)/g)) {
    if (!existsFrom(file, match[2])) failures.push(`${path.relative(ROOT, file)} -> ${match[2]}`);
  }
}

const postsSource = fs.readFileSync(path.join(SITE, 'posts.js'), 'utf8');
const context = vm.createContext({});
vm.runInContext(`${postsSource}\nglobalThis.__POSTS__ = POSTS;`, context, { filename: 'posts.js' });
for (const post of context.__POSTS__ || []) {
  for (const field of ['thumb', 'cover', 'heroImage']) {
    const value = post[field];
    if (value && !existsFrom(path.join(SITE, 'posts.js'), String(value))) {
      failures.push(`SITE/posts.js ${post.slug || post.id}.${field} -> ${value}`);
    }
  }
}

const hubsFile = path.join(SITE, 'data', 'hubs.json');
if (fs.existsSync(hubsFile)) {
  const hubs = JSON.parse(fs.readFileSync(hubsFile, 'utf8')).hubs || [];
  for (const hub of hubs) {
    if (hub.image && !existsFrom(hubsFile, String(hub.image))) {
      failures.push(`SITE/data/hubs.json ${hub.slug}.image -> ${hub.image}`);
    }
  }
}

if (failures.length) {
  console.error('Assets referenciados ausentes:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('OK: assets referenciados encontrados.');
