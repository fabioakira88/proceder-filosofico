#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_FILE = path.join(ROOT, 'SITE', 'posts.js');
const REQUIRED = [
  'slug',
  'title',
  'description',
  'category',
  'subcategory',
  'tags',
  'period',
  'civilization',
  'philosophers',
  'format',
  'heroImage',
  'date',
  'updated'
];

const source = fs.readFileSync(POSTS_FILE, 'utf8');
const context = vm.createContext({});
vm.runInContext(`${source}\nglobalThis.__POSTS__ = POSTS;`, context, { filename: POSTS_FILE });

const posts = context.__POSTS__;
if (!Array.isArray(posts)) {
  console.error('SITE/posts.js nao exporta array POSTS valido.');
  process.exit(1);
}

const seen = new Set();
const failures = [];

posts.forEach((post, index) => {
  const label = post.slug || post.id || `index ${index}`;
  for (const field of REQUIRED) {
    if (!(field in post)) failures.push(`${label}: campo ausente "${field}"`);
  }
  if (!post.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) failures.push(`${label}: slug invalido`);
  if (seen.has(post.slug)) failures.push(`${label}: slug duplicado`);
  seen.add(post.slug);
  if (!post.title) failures.push(`${label}: title vazio`);
  if (!post.description) failures.push(`${label}: description vazio`);
  if (!post.category) failures.push(`${label}: category vazio`);
  if (!post.subcategory) failures.push(`${label}: subcategory vazio`);
  if (!Array.isArray(post.tags)) failures.push(`${label}: tags deve ser array`);
  if (!Array.isArray(post.philosophers)) failures.push(`${label}: philosophers deve ser array`);
  if (!post.format) failures.push(`${label}: format vazio`);
  if (!post.heroImage) failures.push(`${label}: heroImage vazio`);
  if (!post.date) failures.push(`${label}: date vazio`);
}
);

if (posts.length !== 43) failures.push(`total de artigos esperado: 43; encontrado: ${posts.length}`);

if (failures.length) {
  console.error('Metadados editoriais invalidos:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`OK: metadados editoriais minimos validados em ${posts.length} artigos.`);
