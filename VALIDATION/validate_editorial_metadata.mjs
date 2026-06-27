#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_FILE = path.join(ROOT, 'SITE', 'posts.js');
const TAXONOMY_FILE = path.join(ROOT, 'SITE', 'data', 'editorial-taxonomy.json');
const DOSSIERS_FILE = path.join(ROOT, 'SITE', 'data', 'dossiers.json');
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
  'dossier',
  'books',
  'themes',
  'civilizations',
  'historicalPeriods',
  'relatedArticles',
  'editorialPriority',
  'format',
  'heroImage',
  'date',
  'updated'
];

const source = fs.readFileSync(POSTS_FILE, 'utf8');
const context = vm.createContext({});
vm.runInContext(`${source}\nglobalThis.__POSTS__ = POSTS;`, context, { filename: POSTS_FILE });
const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY_FILE, 'utf8'));
const dossiersFile = JSON.parse(fs.readFileSync(DOSSIERS_FILE, 'utf8'));

const posts = context.__POSTS__;
if (!Array.isArray(posts)) {
  console.error('SITE/posts.js nao exporta array POSTS valido.');
  process.exit(1);
}

const seen = new Set();
const failures = [];
const officialCategories = new Set((taxonomy.categories || []).map((category) => category.title));
const officialDossiers = new Set((dossiersFile.dossiers || []).map((dossier) => dossier.id));
const validPriorities = new Set(['P0', 'P1', 'P2']);

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
  if (!Array.isArray(post.books)) failures.push(`${label}: books deve ser array`);
  if (!Array.isArray(post.themes)) failures.push(`${label}: themes deve ser array`);
  if (!Array.isArray(post.civilizations)) failures.push(`${label}: civilizations deve ser array`);
  if (!Array.isArray(post.historicalPeriods)) failures.push(`${label}: historicalPeriods deve ser array`);
  if (!Array.isArray(post.relatedArticles)) failures.push(`${label}: relatedArticles deve ser array`);
  if (post.category && !officialCategories.has(post.category)) failures.push(`${label}: category fora da taxonomia oficial`);
  if (post.dossier && !officialDossiers.has(post.dossier)) failures.push(`${label}: dossier nao cadastrado em SITE/data/dossiers.json`);
  if (post.editorialPriority && !validPriorities.has(post.editorialPriority)) failures.push(`${label}: editorialPriority invalido`);
  if (!post.format) failures.push(`${label}: format vazio`);
  if (!post.heroImage) failures.push(`${label}: heroImage vazio`);
  if (!post.date) failures.push(`${label}: date vazio`);
}
);

const slugs = new Set(posts.map((post) => post.slug));
posts.forEach((post) => {
  (post.relatedArticles || []).forEach((relatedSlug) => {
    if (!slugs.has(relatedSlug)) failures.push(`${post.slug}: relatedArticles aponta para slug inexistente "${relatedSlug}"`);
    if (relatedSlug === post.slug) failures.push(`${post.slug}: relatedArticles nao pode apontar para si mesmo`);
  });
});

if (posts.length !== 43) failures.push(`total de artigos esperado: 43; encontrado: ${posts.length}`);

if (failures.length) {
  console.error('Metadados editoriais invalidos:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`OK: metadados editoriais minimos validados em ${posts.length} artigos.`);
