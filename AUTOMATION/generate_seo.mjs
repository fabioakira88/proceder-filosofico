#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'SITE');
const POSTS_FILE = path.join(SITE, 'posts.js');
const HUBS_FILE = path.join(SITE, 'data', 'hubs.json');
const SITE_URL = 'https://procederfilosofico.com.br';
const ARTICLES_TEMPLATE = path.join(SITE, 'artigos', 'index.html');
const HUB_TEMPLATE = path.join(ROOT, 'AUTOMATION', 'templates', 'hub.html');
const CONTENT_INDEX = path.join(SITE, 'conteudo', 'index.html');

const source = fs.readFileSync(POSTS_FILE, 'utf8');
const context = vm.createContext({});
vm.runInContext(`${source}\nglobalThis.__POSTS__ = POSTS;`, context, {
  filename: POSTS_FILE
});

const posts = context.__POSTS__;
if (!Array.isArray(posts)) throw new Error('SITE/posts.js não declarou um array POSTS válido.');
const hubsDocument = JSON.parse(fs.readFileSync(HUBS_FILE, 'utf8'));
if (hubsDocument.schemaVersion !== 1 || !Array.isArray(hubsDocument.hubs)) {
  throw new Error('SITE/data/hubs.json não segue o schemaVersion 1.');
}
const hubs = hubsDocument.hubs;

const seen = new Set();
const urls = posts.map((post) => {
  const slug = post.slug || post.id;
  if (!slug) throw new Error(`Artigo sem id/slug: ${post.title || 'sem título'}`);
  if (seen.has(slug)) throw new Error(`Rota duplicada: ${slug}`);
  seen.add(slug);
  return {
    slug,
    post,
    loc: `${SITE_URL}/artigos/${encodeURIComponent(slug)}/`,
    lastmod: post.updatedISO || post.dateISO || null
  };
});
const postsBySlug = new Map(urls.map(({ slug, post }) => [slug, post]));
const reservedHubSlugs = new Set(['index', 'artigos', 'filosofos', 'sobre']);
const seenHubs = new Set();
const seenHubIds = new Set();
const hubUrls = hubs.map((hub) => {
  if (!hub.id || !hub.slug || !hub.title || !hub.description || !hub.metaTitle || !hub.metaDescription) {
    throw new Error(`HUB incompleto: ${hub.slug || hub.id || 'sem identificação'}`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(hub.slug)) throw new Error(`Slug de HUB inválido: ${hub.slug}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(hub.id)) throw new Error(`ID de HUB inválido: ${hub.id}`);
  if (seenHubIds.has(hub.id)) throw new Error(`ID de HUB duplicado: ${hub.id}`);
  if (seenHubs.has(hub.slug)) throw new Error(`Rota de HUB duplicada: ${hub.slug}`);
  if (reservedHubSlugs.has(hub.slug)) throw new Error(`Slug de HUB reservado: ${hub.slug}`);
  if (!['category', 'curated'].includes(hub.type)) throw new Error(`Tipo de HUB inválido em ${hub.slug}: ${hub.type}`);
  seenHubIds.add(hub.id);
  seenHubs.add(hub.slug);

  if (hub.type === 'curated' && new Set(hub.postSlugs || []).size !== (hub.postSlugs || []).length) {
    throw new Error(`HUB ${hub.slug} possui artigos repetidos.`);
  }
  const selectedPosts = hub.type === 'category'
    ? posts.filter((post) => post.tag === hub.tag)
    : (hub.postSlugs || []).map((slug) => {
      const post = postsBySlug.get(slug);
      if (!post) throw new Error(`HUB ${hub.slug} referencia artigo inexistente: ${slug}`);
      return post;
    });
  if (!selectedPosts.length) throw new Error(`HUB sem artigos relacionados: ${hub.slug}`);
  if (hub.image && !/^https?:\/\//i.test(hub.image) && !fs.existsSync(path.join(SITE, String(hub.image).replace(/^\/+/, '')))) {
    throw new Error(`Imagem de HUB inexistente em ${hub.slug}: ${hub.image}`);
  }

  return {
    slug: hub.slug,
    hub,
    posts: selectedPosts,
    loc: `${SITE_URL}/conteudo/${encodeURIComponent(hub.slug)}/`,
    lastmod: hub.updatedISO || null
  };
});

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const staticUrls = [
  { loc: `${SITE_URL}/`, lastmod: null },
  { loc: `${SITE_URL}/artigos/`, lastmod: null },
  { loc: `${SITE_URL}/conteudo/`, lastmod: null },
  { loc: `${SITE_URL}/filosofos/`, lastmod: null },
  { loc: `${SITE_URL}/sobre/`, lastmod: null }
];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...staticUrls.concat(hubUrls, urls).map(({ loc, lastmod }) => [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : null,
    '  </url>'
  ].filter(Boolean).join('\n')),
  '</urlset>',
  ''
].join('\n');

const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  ''
].join('\n');

const escapeHtml = (value) => escapeXml(value);
const absoluteImage = (value) => /^https?:\/\//i.test(value || '')
  ? value
  : `${SITE_URL}/${String(value || 'assets/default-article.jpg').replace(/^\/+/, '')}`;
const template = fs.readFileSync(ARTICLES_TEMPLATE, 'utf8');
const hubTemplate = fs.readFileSync(HUB_TEMPLATE, 'utf8');
if (!hubTemplate.includes('<!-- PROCEDER:HUB_SEO -->') || !hubTemplate.includes('<!-- PROCEDER:HUB_CONTENT -->')) {
  throw new Error('Marcadores obrigatórios ausentes em AUTOMATION/templates/hub.html.');
}
const seoPattern = /  <!-- PROCEDER:SEO_START -->[\s\S]*?  <!-- PROCEDER:SEO_END -->/;
const articlePattern = /    <!-- PROCEDER:ARTICLE_START -->[\s\S]*?    <!-- PROCEDER:ARTICLE_END -->/;
if (!seoPattern.test(template)) {
  throw new Error('Marcadores de SEO ausentes em SITE/artigos/index.html.');
}
if (!articlePattern.test(template)) {
  throw new Error('Marcadores de artigo ausentes em SITE/artigos/index.html.');
}

for (const entry of fs.readdirSync(path.dirname(ARTICLES_TEMPLATE), { withFileTypes: true })) {
  if (entry.isDirectory()) fs.rmSync(path.join(path.dirname(ARTICLES_TEMPLATE), entry.name), { recursive: true });
}

for (const { slug, post, loc } of urls) {
  const title = post.metaTitle || `${post.title} | Proceder Filosófico`;
  const description = post.metaDescription || post.excerpt || '';
  const imagePath = post.cover || post.thumb || 'assets/default-article.jpg';
  const image = /^https?:\/\//i.test(imagePath)
    ? imagePath
    : `${SITE_URL}/${String(imagePath).replace(/^\/+/, '')}`;
  const keywords = Array.isArray(post.keywords) ? post.keywords : post.tags;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description,
    image: [image],
    datePublished: post.dateISO || undefined,
    dateModified: post.updatedISO || post.dateISO || undefined,
    articleSection: post.category || post.tag || undefined,
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords || undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': loc },
    author: { '@type': 'Organization', name: 'Proceder Filosófico', url: `${SITE_URL}/` },
    publisher: { '@type': 'Organization', name: 'Proceder Filosófico', url: `${SITE_URL}/` }
  };
  const seo = [
    '  <!-- PROCEDER:SEO_START -->',
    `  <title>${escapeHtml(title)}</title>`,
    `  <meta name="description" content="${escapeHtml(description)}">`,
    '  <meta name="robots" content="index,follow,max-image-preview:large">',
    `  <link rel="canonical" href="${escapeHtml(loc)}">`,
    '  <meta property="og:type" content="article">',
    '  <meta property="og:site_name" content="Proceder Filosófico">',
    `  <meta property="og:title" content="${escapeHtml(title)}">`,
    `  <meta property="og:description" content="${escapeHtml(description)}">`,
    `  <meta property="og:url" content="${escapeHtml(loc)}">`,
    `  <meta property="og:image" content="${escapeHtml(image)}">`,
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:title" content="${escapeHtml(title)}">`,
    `  <meta name="twitter:description" content="${escapeHtml(description)}">`,
    `  <meta name="twitter:image" content="${escapeHtml(image)}">`,
    `  <script id="proceder-article-jsonld" type="application/ld+json">${JSON.stringify(jsonLd).replaceAll('<', '\\u003c')}</script>`,
    '  <!-- PROCEDER:SEO_END -->'
  ].join('\n');
  const targetDir = path.join(path.dirname(ARTICLES_TEMPLATE), slug);
  fs.mkdirSync(targetDir, { recursive: true });
  const content = String(post.content || '')
    .replace(/(src|href)="assets\//g, '$1="/assets/')
    .replace(/href="\?post=([^"&]+)"/g, 'href="/artigos/$1/"');
  const article = [
    '    <!-- PROCEDER:ARTICLE_START -->',
    '    <article class="reader open" id="reader">',
    '      <button class="back" id="backButton">Voltar aos artigos</button>',
    `      <div class="reader-tag" id="readerTag">${escapeHtml(post.tag || '')}</div>`,
    `      <h1 id="readerTitle">${escapeHtml(post.title || '')}</h1>`,
    `      <div class="reader-date" id="readerDate">${escapeHtml(post.date || '')}</div>`,
    `      <div class="reader-content" id="readerContent">${content}</div>`,
    '    </article>',
    '    <!-- PROCEDER:ARTICLE_END -->'
  ].join('\n');
  const page = template
    .replace(seoPattern, seo)
    .replace(articlePattern, article)
    .replace('<body>', '<body class="reading">');
  fs.writeFileSync(path.join(targetDir, 'index.html'), page);
}

for (const entry of fs.readdirSync(path.dirname(CONTENT_INDEX), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const generatedPage = path.join(path.dirname(CONTENT_INDEX), entry.name, 'index.html');
  if (fs.existsSync(generatedPage) && fs.readFileSync(generatedPage, 'utf8').includes('PROCEDER:HUB_GENERATED')) {
    fs.rmSync(path.dirname(generatedPage), { recursive: true });
  }
}

for (const { slug, hub, posts: hubPosts, loc } of hubUrls) {
  const image = absoluteImage(hub.image);
  const articleItems = hubPosts.map((post, index) => {
    const postSlug = post.slug || post.id;
    const postUrl = `${SITE_URL}/artigos/${encodeURIComponent(postSlug)}/`;
    return {
      '@type': 'ListItem',
      position: index + 1,
      url: postUrl,
      name: post.title
    };
  });
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hub.title,
    description: hub.metaDescription,
    url: loc,
    image,
    mainEntity: { '@type': 'ItemList', numberOfItems: articleItems.length, itemListElement: articleItems },
    isPartOf: { '@type': 'WebSite', name: 'Proceder Filosófico', url: `${SITE_URL}/` }
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Conteúdo', item: `${SITE_URL}/conteudo/` },
      { '@type': 'ListItem', position: 3, name: hub.title, item: loc }
    ]
  };
  const seo = [
    `  <title>${escapeHtml(hub.metaTitle)}</title>`,
    `  <meta name="description" content="${escapeHtml(hub.metaDescription)}">`,
    '  <meta name="robots" content="index,follow,max-image-preview:large">',
    `  <link rel="canonical" href="${escapeHtml(loc)}">`,
    '  <meta property="og:type" content="website">',
    '  <meta property="og:site_name" content="Proceder Filosófico">',
    `  <meta property="og:title" content="${escapeHtml(hub.metaTitle)}">`,
    `  <meta property="og:description" content="${escapeHtml(hub.metaDescription)}">`,
    `  <meta property="og:url" content="${escapeHtml(loc)}">`,
    `  <meta property="og:image" content="${escapeHtml(image)}">`,
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:title" content="${escapeHtml(hub.metaTitle)}">`,
    `  <meta name="twitter:description" content="${escapeHtml(hub.metaDescription)}">`,
    `  <meta name="twitter:image" content="${escapeHtml(image)}">`,
    `  <script type="application/ld+json">${JSON.stringify(collectionJsonLd).replaceAll('<', '\\u003c')}</script>`,
    `  <script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd).replaceAll('<', '\\u003c')}</script>`
  ].join('\n');
  const cards = hubPosts.map((post) => {
    const postSlug = post.slug || post.id;
    return [
      `      <a class="card" href="/artigos/${encodeURIComponent(postSlug)}/">`,
      `        <img src="/${String(post.thumb || 'assets/default-article.jpg').replace(/^\/+/, '')}" alt="${escapeHtml(post.title)}" loading="lazy">`,
      '        <div class="card-body">',
      `          <div class="card-tag">${escapeHtml(post.tag || '')}</div>`,
      `          <h3>${escapeHtml(post.title)}</h3>`,
      `          <p>${escapeHtml(post.excerpt || '')}</p>`,
      `          <span class="card-date">${escapeHtml(post.date || '')}</span>`,
      '        </div>',
      '      </a>'
    ].join('\n');
  }).join('\n');
  const content = [
    '    <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Início</a><span>›</span><a href="/conteudo/">Conteúdo</a><span>›</span><strong>' + escapeHtml(hub.title) + '</strong></nav>',
    '    <header class="hero">',
    `      <span class="label">${escapeHtml(hub.label || 'Percurso editorial')}</span>`,
    `      <h1>${escapeHtml(hub.title)}</h1>`,
    `      <p class="description">${escapeHtml(hub.description)}</p>`,
    `      <p class="intro">${escapeHtml(hub.intro || '')}</p>`,
    '    </header>',
    '    <section>',
    `      <div class="section-head"><h2>Artigos relacionados</h2><span class="count">${hubPosts.length} ${hubPosts.length === 1 ? 'artigo' : 'artigos'}</span></div>`,
    `      <div class="grid">\n${cards}\n      </div>`,
    '    </section>'
  ].join('\n');
  const targetDir = path.join(path.dirname(CONTENT_INDEX), slug);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), hubTemplate
    .replace('  <!-- PROCEDER:HUB_SEO -->', seo)
    .replace('    <!-- PROCEDER:HUB_CONTENT -->', content));
}

const contentHubPattern = /    <!-- PROCEDER:HUB_LIST_START -->[\s\S]*?    <!-- PROCEDER:HUB_LIST_END -->/;
const contentIndex = fs.readFileSync(CONTENT_INDEX, 'utf8');
if (!contentHubPattern.test(contentIndex)) throw new Error('Marcadores de HUB ausentes em SITE/conteudo/index.html.');
const contentHubCards = hubUrls.map(({ hub, posts: hubPosts }) => [
  `      <a class="category-card" href="/conteudo/${encodeURIComponent(hub.slug)}/">`,
  '        <div class="category-icon">◆</div>',
  `        <h2>${escapeHtml(hub.title)}</h2>`,
  `        <p>${escapeHtml(hub.description)}</p>`,
  `        <span class="count">${hubPosts.length} ${hubPosts.length === 1 ? 'artigo' : 'artigos'} →</span>`,
  '      </a>'
].join('\n')).join('\n');
fs.writeFileSync(CONTENT_INDEX, contentIndex.replace(contentHubPattern, [
  '    <!-- PROCEDER:HUB_LIST_START -->',
  '    <section class="area" aria-labelledby="hub-list-title">',
  '      <div class="area-head"><h2 id="hub-list-title">Percursos editoriais</h2><span class="count">HUBs</span></div>',
  `      <div class="category-grid">\n${contentHubCards}\n      </div>`,
  '    </section>',
  '    <!-- PROCEDER:HUB_LIST_END -->'
].join('\n')));

fs.writeFileSync(path.join(SITE, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(SITE, 'robots.txt'), robots);
console.log(`SEO gerado: ${urls.length} páginas de artigo, ${hubUrls.length} HUBs, sitemap.xml e robots.txt.`);
