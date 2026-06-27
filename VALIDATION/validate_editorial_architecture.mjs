#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'SITE', 'data');
const POSTS_FILE = path.join(ROOT, 'SITE', 'posts.js');
const failures = [];

const REQUIRED_CATEGORIES = [
  'Filosofia',
  'História da Civilização',
  'Antropologia',
  'Sociologia',
  'Literatura',
  'Arte',
  'Religião',
  'Ciência',
  'Política',
  'Atualidade Filosófica'
];

const REQUIRED_RELATIONSHIP_FIELDS = [
  'category',
  'subcategory',
  'dossier',
  'philosophers',
  'books',
  'themes',
  'civilizations',
  'historicalPeriods',
  'relatedArticles',
  'editorialPriority'
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(DATA, file), 'utf8'));
}

function kebab(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value || '');
}

const taxonomy = readJson('editorial-taxonomy.json');
if (taxonomy.schemaVersion !== 1) failures.push('editorial-taxonomy.json: schemaVersion deve ser 1');
const titles = new Set((taxonomy.categories || []).map((category) => category.title));
for (const title of REQUIRED_CATEGORIES) {
  if (!titles.has(title)) failures.push(`categoria oficial ausente: ${title}`);
}
for (const category of taxonomy.categories || []) {
  if (!kebab(category.id)) failures.push(`categoria com id invalido: ${category.id}`);
  if (!kebab(category.slug)) failures.push(`categoria com slug invalido: ${category.slug}`);
  for (const support of ['articles', 'essays', 'dossiers', 'bibliography', 'relatedAuthors']) {
    if (!category.supports || category.supports[support] !== true) {
      failures.push(`${category.id}: suporte ausente para ${support}`);
    }
  }
}
for (const field of REQUIRED_RELATIONSHIP_FIELDS) {
  if (!(taxonomy.relationshipFields || []).includes(field)) failures.push(`relationshipField ausente: ${field}`);
}

const postsSource = fs.readFileSync(POSTS_FILE, 'utf8');
const postsContext = vm.createContext({});
vm.runInContext(`${postsSource}\nglobalThis.__POSTS__ = POSTS;`, postsContext, { filename: POSTS_FILE });
const postSlugs = new Set((postsContext.__POSTS__ || []).map((post) => post.slug));

const dossiers = readJson('dossiers.json');
if (dossiers.schemaVersion !== 1) failures.push('dossiers.json: schemaVersion deve ser 1');
for (const dossier of dossiers.dossiers || []) {
  if (!kebab(dossier.id)) failures.push(`dossie com id invalido: ${dossier.id}`);
  if (!kebab(dossier.slug)) failures.push(`dossie com slug invalido: ${dossier.slug}`);
  for (const field of [
    'relatedArticles',
    'recommendedArticles',
    'relatedBooks',
    'relatedPhilosophers',
    'relatedAuthors',
    'relatedArtworks',
    'historicalPeriods',
    'civilizations',
    'timeline',
    'bibliography',
    'futureReadings',
    'continueStudying'
  ]) {
    if (!Array.isArray(dossier[field])) failures.push(`${dossier.id}: ${field} deve ser array`);
  }
  for (const field of ['title', 'subtitle', 'editorialIntroduction', 'intellectualObjective']) {
    if (!dossier[field]) failures.push(`${dossier.id}: ${field} vazio`);
  }
  if (dossier.category && !titles.has(dossier.category)) failures.push(`${dossier.id}: categoria fora da taxonomia oficial`);
  if (dossier.mainArticle && !postSlugs.has(dossier.mainArticle)) failures.push(`${dossier.id}: mainArticle inexistente ${dossier.mainArticle}`);
  for (const field of ['relatedArticles', 'recommendedArticles', 'continueStudying']) {
    for (const slug of dossier[field] || []) {
      if (!postSlugs.has(slug)) failures.push(`${dossier.id}: ${field} aponta para artigo inexistente ${slug}`);
    }
  }
}

const home = readJson('home-editorial.json');
if (home.schemaVersion !== 1) failures.push('home-editorial.json: schemaVersion deve ser 1');
const requiredRails = [
  'destaques',
  'categorias',
  'filosofos',
  'dossies',
  'biblioteca',
  'newsletter'
];
const rails = new Set((home.rails || []).map((rail) => rail.id));
for (const rail of requiredRails) {
  if (!rails.has(rail)) failures.push(`trilho de Home ausente: ${rail}`);
}
for (const rail of home.rails || []) {
  if (!Array.isArray(rail.items)) failures.push(`${rail.id}: items deve ser array`);
  if (rail.enabled !== true) failures.push(`${rail.id}: trilho da Home V2 deve estar habilitado`);
  if (rail.id === 'categorias') {
    for (const slug of rail.items || []) {
      const category = (taxonomy.categories || []).find((item) => item.id === slug || item.slug === slug);
      if (!category) failures.push(`${rail.id}: categoria ausente na taxonomia oficial: ${slug}`);
    }
  }
}

if (failures.length) {
  console.error('Arquitetura editorial invalida:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('OK: arquitetura editorial oficial validada.');
