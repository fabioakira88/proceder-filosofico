#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'SITE');
const SITE_URL = 'https://procederfilosofico.com.br';
const failures = [];

const sitemapFile = path.join(SITE, 'sitemap.xml');
const robotsFile = path.join(SITE, 'robots.txt');

if (!fs.existsSync(sitemapFile)) failures.push('SITE/sitemap.xml ausente');
if (!fs.existsSync(robotsFile)) failures.push('SITE/robots.txt ausente');

if (!failures.length) {
  const sitemap = fs.readFileSync(sitemapFile, 'utf8');
  const robots = fs.readFileSync(robotsFile, 'utf8');
  if (!sitemap.includes('<urlset')) failures.push('sitemap.xml sem <urlset>');
  if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) failures.push('robots.txt sem Sitemap canonico');

  for (const match of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
    const loc = match[1];
    if (!loc.startsWith(`${SITE_URL}/`)) {
      failures.push(`URL fora do dominio canonico: ${loc}`);
      continue;
    }
    const pathname = new URL(loc).pathname;
    const target = path.join(SITE, pathname.replace(/^\/+/, ''));
    if (!(fs.existsSync(target) || fs.existsSync(path.join(target, 'index.html')))) {
      failures.push(`sitemap aponta para rota local ausente: ${loc}`);
    }
  }
}

if (failures.length) {
  console.error('Sitemap/robots invalidos:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('OK: sitemap.xml e robots.txt validos.');
