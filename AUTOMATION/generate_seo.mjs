#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'SITE');
const POSTS_FILE = path.join(SITE, 'posts.js');
const HUBS_FILE = path.join(SITE, 'data', 'hubs.json');
const TAXONOMY_FILE = path.join(SITE, 'data', 'editorial-taxonomy.json');
const DOSSIERS_FILE = path.join(SITE, 'data', 'dossiers.json');
const HOME_EDITORIAL_FILE = path.join(SITE, 'data', 'home-editorial.json');
const SITE_URL = 'https://procederfilosofico.com.br';
const ARTICLES_TEMPLATE = path.join(SITE, 'artigos', 'index.html');
const HUB_TEMPLATE = path.join(ROOT, 'AUTOMATION', 'templates', 'hub.html');
const CONTENT_INDEX = path.join(SITE, 'conteudo', 'index.html');
const HOME_INDEX = path.join(SITE, 'index.html');
const CATEGORY_ROOT = path.join(SITE, 'categoria');
const DOSSIERS_ROOT = path.join(SITE, 'dossies');

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
const taxonomyDocument = JSON.parse(fs.readFileSync(TAXONOMY_FILE, 'utf8'));
if (taxonomyDocument.schemaVersion !== 1 || !Array.isArray(taxonomyDocument.categories)) {
  throw new Error('SITE/data/editorial-taxonomy.json não segue o schemaVersion 1.');
}
const categories = taxonomyDocument.categories;
const dossiersDocument = JSON.parse(fs.readFileSync(DOSSIERS_FILE, 'utf8'));
if (dossiersDocument.schemaVersion !== 1 || !Array.isArray(dossiersDocument.dossiers)) {
  throw new Error('SITE/data/dossiers.json não segue o schemaVersion 1.');
}
const dossiers = dossiersDocument.dossiers;
const homeEditorialDocument = JSON.parse(fs.readFileSync(HOME_EDITORIAL_FILE, 'utf8'));
if (homeEditorialDocument.schemaVersion !== 1 || !Array.isArray(homeEditorialDocument.rails)) {
  throw new Error('SITE/data/home-editorial.json não segue o schemaVersion 1.');
}
const homeRails = homeEditorialDocument.rails.filter((rail) => rail.enabled);

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
const categoriesByTitle = new Map(categories.map((category) => [category.title, category]));
const categoryUrls = categories.map((category) => {
  const selectedPosts = posts.filter((post) => post.category === category.title);
  return {
    slug: category.slug,
    category,
    posts: selectedPosts,
    loc: `${SITE_URL}/categoria/${encodeURIComponent(category.slug)}/`,
    lastmod: selectedPosts.map((post) => post.updatedISO || post.dateISO).filter(Boolean).sort().at(-1) || null
  };
});
const dossierIndexUrl = { loc: `${SITE_URL}/dossies/`, lastmod: null };
const dossierUrls = dossiers.map((dossier) => ({
  slug: dossier.slug,
  dossier,
  loc: `${SITE_URL}/dossies/${encodeURIComponent(dossier.slug)}/`,
  lastmod: null
}));
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

const enciclopediaSlugs = [
  'pre-historia',
  'revolucao-neolitica',
  'mesopotamia',
  'egito-antigo',
  'vale-do-indo',
  'china-antiga',
  'grecia-antiga',
  'roma-antiga',
  'idade-media',
  'renascimento'
];

const staticUrls = [
  { loc: `${SITE_URL}/`, lastmod: null },
  { loc: `${SITE_URL}/artigos/`, lastmod: null },
  { loc: `${SITE_URL}/conteudo/`, lastmod: null },
  { loc: `${SITE_URL}/conteudo/linha-do-tempo-dos-conceitos-filosoficos/`, lastmod: null },
  dossierIndexUrl,
  { loc: `${SITE_URL}/filosofos/`, lastmod: null },
  { loc: `${SITE_URL}/sobre/`, lastmod: null },
  { loc: `${SITE_URL}/enciclopedia/`, lastmod: null },
  ...enciclopediaSlugs.map((slug) => ({ loc: `${SITE_URL}/enciclopedia/${slug}/`, lastmod: null }))
];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...staticUrls.concat(categoryUrls, dossierUrls, hubUrls, urls).map(({ loc, lastmod }) => [
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
const generatedMarker = 'PROCEDER:GENERATED_EDITORIAL_PAGE';
function removeGeneratedChildren(root) {
  if (!fs.existsSync(root)) return;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const candidate = path.join(root, entry.name, 'index.html');
    if (fs.existsSync(candidate) && fs.readFileSync(candidate, 'utf8').includes(generatedMarker)) {
      fs.rmSync(path.dirname(candidate), { recursive: true });
    }
  }
}
const categoryHref = (categoryTitle) => {
  const category = categoriesByTitle.get(categoryTitle);
  return category ? `/categoria/${encodeURIComponent(category.slug)}/` : '/artigos/';
};
const articleHref = (post) => `/artigos/${encodeURIComponent(post.slug || post.id)}/`;
const localImage = (post) => `/${String(post.thumb || post.cover || 'assets/default-article.jpg').replace(/^\/+/, '')}`;
const byNewest = (a, b) => String(b.dateISO || '').localeCompare(String(a.dateISO || ''));
const renderArticleCard = (post, className = 'card') => [
  `      <a class="${className}" href="${articleHref(post)}">`,
  `        <img src="${localImage(post)}" alt="${escapeHtml(post.title)}" loading="lazy" decoding="async">`,
  '        <div class="card-body">',
  `          <div class="card-tag">${escapeHtml(post.category || post.tag || '')}</div>`,
  `          <h3>${escapeHtml(post.title)}</h3>`,
  `          <p>${escapeHtml(post.excerpt || post.description || '')}</p>`,
  `          <span class="card-date">${escapeHtml(post.date || '')}</span>`,
  '        </div>',
  '      </a>'
].join('\n');
const renderHomeArticleCard = (post, action = 'Continuar estudando') => [
  `        <a class="news-card" href="${articleHref(post)}" aria-label="${escapeHtml(action)}: ${escapeHtml(post.title)}">`,
  `          <img class="news-thumb" src="${localImage(post)}" alt="${escapeHtml(post.title)}" loading="lazy" decoding="async">`,
  '          <div class="news-body">',
  `            <div class="news-tag">${escapeHtml(post.subcategory || post.category || post.tag || '')}</div>`,
  `            <h3 class="news-title">${escapeHtml(post.title)}</h3>`,
  `            <p class="news-excerpt">${escapeHtml(post.excerpt || post.description || '')}</p>`,
  `            <div class="news-meta"><span>${escapeHtml(post.date || '')}</span><span>${escapeHtml(action)}</span></div>`,
  '          </div>',
  '        </a>'
].join('\n');
const renderHomeSection = ({ id, label, title, subtitle, body, alt = false }) => [
  `    <section class="section${alt ? ' alt' : ''}" id="${escapeHtml(id)}">`,
  '      <div class="container">',
  '        <div class="section-header">',
  `          <div class="section-label">${escapeHtml(label)}</div>`,
  `          <h2 class="section-title">${title}</h2>`,
  subtitle ? `          <p class="section-subtitle">${subtitle}</p>` : '',
  '        </div>',
  body,
  '      </div>',
  '    </section>'
  ].filter(Boolean).join('\n');
const shellLogo = '/assets/LQHqVnilFspwfHEy.png';
const renderShellNavLink = (key, href, label, active) =>
  `      <a class="pf-nav__link${active === key ? ' is-active' : ''}" href="${href}">${label}</a>`;
const renderShellHeader = (active = '') => [
  '  <header class="pf-header" role="banner">',
  '    <div class="pf-header__top">',
  '      <a class="pf-brand" href="/" aria-label="Proceder Filosófico - Início">',
  `        <span class="pf-brand__mark" aria-hidden="true"><img src="${shellLogo}" alt=""></span>`,
  '        <span class="pf-brand__text">',
  '          <span class="pf-brand__name">Proceder Filosófico</span>',
  '          <span class="pf-brand__tagline">Arquivo cultural, filosófico e civilizacional</span>',
  '        </span>',
  '      </a>',
  '      <div class="pf-header__tools" aria-label="Ações rápidas">',
  '        <a class="pf-tool" href="/artigos/" aria-label="Buscar artigos">',
  '          <span class="pf-tool__icon" aria-hidden="true">⌕</span>',
  '          <span>Buscar</span>',
  '        </a>',
  '        <a class="pf-tool pf-tool--highlight" href="/#newsletter" aria-label="Newsletter">',
  '          <span class="pf-tool__icon" aria-hidden="true">✉</span>',
  '          <span>Newsletter</span>',
  '        </a>',
  '      </div>',
  '    </div>',
  '    <nav class="pf-nav" aria-label="Navegação principal">',
  renderShellNavLink('inicio', '/', 'Início', active),
  renderShellNavLink('artigos', '/artigos/', 'Artigos', active),
  renderShellNavLink('categorias', '/#categorias', 'Categorias', active),
  renderShellNavLink('filosofos', '/filosofos/', 'Filósofos', active),
  renderShellNavLink('dossies', '/dossies/', 'Dossiês', active),
  renderShellNavLink('enciclopedia', '/enciclopedia/', 'Enciclopédia', active),
  renderShellNavLink('livros', '/biblioteca.html', 'Livros', active),
  renderShellNavLink('newsletter', '/#newsletter', 'Newsletter', active),
  '    </nav>',
  '  </header>'
].join('\n');
const renderShellFooter = (id = 'generated') => [
  '  <footer class="pf-footer" role="contentinfo">',
  '    <div class="pf-footer__inner">',
  '      <section class="pf-footer__brand" aria-label="Proceder Filosófico">',
  '        <a class="pf-footer-brand" href="/">',
  `          <span class="pf-footer-brand__mark" aria-hidden="true"><img src="${shellLogo}" alt=""></span>`,
  '          <span class="pf-footer-brand__name">Proceder<br>Filosófico</span>',
  '        </a>',
  '        <p>Preservamos e promovemos o pensamento que investiga a verdade, a justiça e o bem. Um arquivo para a cultura, a filosofia e a civilização.</p>',
  '        <div class="pf-social" aria-label="Canais editoriais">',
  '          <a href="/artigos/" aria-label="Artigos">A</a>',
  '          <a href="/dossies/" aria-label="Dossiês">D</a>',
  '          <a href="/enciclopedia/" aria-label="Enciclopédia">E</a>',
  '          <a href="/biblioteca.html" aria-label="Biblioteca">B</a>',
  '        </div>',
  '      </section>',
  '      <nav class="pf-footer__column" aria-label="Navegação">',
  '        <h2>Navegação</h2>',
  '        <a href="/">Início</a>',
  '        <a href="/artigos/">Artigos</a>',
  '        <a href="/#categorias">Categorias</a>',
  '        <a href="/filosofos/">Filósofos</a>',
  '        <a href="/dossies/">Dossiês</a>',
  '        <a href="/enciclopedia/">Enciclopédia</a>',
  '        <a href="/biblioteca.html">Livros</a>',
  '        <a href="/#newsletter">Newsletter</a>',
  '      </nav>',
  '      <nav class="pf-footer__column" aria-label="Áreas">',
  '        <h2>Áreas</h2>',
  '        <a href="/categoria/filosofia/">Filosofia</a>',
  '        <a href="/categoria/historia-da-civilizacao/">História da Civilização</a>',
  '        <a href="/categoria/literatura/">Literatura</a>',
  '        <a href="/categoria/ciencia/">Ciência</a>',
  '        <a href="/categoria/religiao/">Religião</a>',
  '        <a href="/categoria/arte/">Arte</a>',
  '        <a href="/categoria/politica/">Política</a>',
  '        <a href="/categoria/atualidade-filosofica/">Atualidade Filosófica</a>',
  '      </nav>',
  '      <nav class="pf-footer__column" aria-label="Institucional">',
  '        <h2>Institucional</h2>',
  '        <a href="/sobre/">Sobre o Projeto</a>',
  '        <a href="/artigos/">Acervo de Artigos</a>',
  '        <a href="/dossies/">Dossiês</a>',
  '        <a href="/enciclopedia/">Enciclopédia</a>',
  '        <a href="/biblioteca.html">Biblioteca</a>',
  '      </nav>',
  '      <section class="pf-footer__manifesto" aria-label="Palavra e pensamento">',
  '        <span class="pf-footer__symbol" aria-hidden="true">✦</span>',
  '        <h2>Palavra e Pensamento</h2>',
  '        <p class="pf-footer__quote">A filosofia não é um luxo, mas uma necessidade da alma que busca compreender o mundo e a si mesma.</p>',
  '        <form class="pf-newsletter-form" action="/#newsletter" method="get">',
  `          <label for="pf-footer-email-${id}">Receba novos artigos e dossiês.</label>`,
  '          <div class="pf-newsletter-form__row">',
  `            <input id="pf-footer-email-${id}" name="email" type="email" placeholder="Seu e-mail">`,
  '            <button type="submit" aria-label="Assinar newsletter">→</button>',
  '          </div>',
  '        </form>',
  '      </section>',
  '    </div>',
  '    <div class="pf-footer__bottom">',
  '      <span class="pf-footer__star" aria-hidden="true">✶</span>',
  '      <p>© 2026 Proceder Filosófico. Todos os direitos reservados.</p>',
  '      <nav aria-label="Links legais">',
  '        <a href="/sobre/">Sobre</a>',
  '        <a href="/artigos/">Artigos</a>',
  '        <a href="/#newsletter">Contato</a>',
  '      </nav>',
  '    </div>',
  '  </footer>'
].join('\n');
const renderShellPage = (templateHtml, active, id) => templateHtml
  .replace('  <!-- PROCEDER:SHELL_HEADER -->', renderShellHeader(active))
  .replace('  <!-- PROCEDER:SHELL_FOOTER -->', renderShellFooter(id));
const libraryBooks = new Map([
  ['a-republica', { mark: 'P', title: 'A República', author: 'Platão', href: 'https://amzn.to/3RegesH', action: 'Ler Platão' }],
  ['meditacoes', { mark: 'M', title: 'Meditações', author: 'Marco Aurélio', href: 'https://www.amazon.com.br/s?k=meditacoes+marco+aurelio&tag=proceder-20', action: 'Explorar estoicismo' }],
  ['assim-falou-zaratustra', { mark: 'N', title: 'Assim Falou Zaratustra', author: 'Friedrich Nietzsche', href: 'https://www.amazon.com.br/s?k=assim+falou+zaratustra+nietzsche&tag=proceder-20', action: 'Ler Nietzsche' }]
]);
function renderHomeRail(rail, index) {
  if (rail.id === 'destaques') {
    const selectedPosts = rail.items.map((slug) => postsBySlug.get(slug)).filter(Boolean);
    return renderHomeSection({
      id: 'destaques',
      label: 'Capa editorial',
      title: 'Destaques <span class="dourado">do acervo</span>',
      subtitle: 'Uma entrada curada para filosofia, cultura e vida intelectual.',
      body: `        <div class="news-grid">\n${selectedPosts.map((post) => renderHomeArticleCard(post, 'Entrar no percurso')).join('\n')}\n        </div>`,
      alt: index % 2 === 1
    });
  }
  if (rail.id === 'categorias') {
    const selectedCategories = rail.items
      .map((slug) => categories.find((category) => category.slug === slug || category.id === slug))
      .filter(Boolean);
    const cards = selectedCategories.map((category) => {
      const total = posts.filter((post) => post.category === category.title).length;
      return [
        `        <a class="library-card" href="/categoria/${encodeURIComponent(category.slug)}/">`,
        `          <div class="mark">${escapeHtml(category.title.slice(0, 1))}</div>`,
        `          <h3>${escapeHtml(category.title)}</h3>`,
        `          <p>${escapeHtml(category.description)}</p>`,
        `          <span class="button">${total} ${total === 1 ? 'artigo' : 'artigos'}</span>`,
        '        </a>'
      ].join('\n');
    }).join('\n');
    return renderHomeSection({
      id: 'categorias',
      label: 'Mapa editorial',
      title: 'Categorias <span class="dourado">da revista</span>',
      subtitle: 'Entradas principais para navegar pelo acervo sem transformar a Home em uma lista infinita.',
      body: `        <div class="library-grid">\n${cards}\n        </div>`,
      alt: index % 2 === 1
    });
  }
  if (rail.id === 'dossies') {
    const selectedDossiers = rail.items.length ? rail.items.map((slug) => dossiers.find((dossier) => dossier.slug === slug)).filter(Boolean) : dossiers;
    const cards = selectedDossiers.map((dossier) => [
      `        <a class="library-card" href="/dossies/${encodeURIComponent(dossier.slug)}/">`,
      '          <div class="mark">D</div>',
      `          <h3>${escapeHtml(dossier.title)}</h3>`,
      `          <p>${escapeHtml(dossier.subtitle || 'Percurso editorial em preparação.')}</p>`,
      '          <span class="button">Ver percurso</span>',
      '        </a>'
    ].join('\n')).join('\n');
    return renderHomeSection({
      id: 'dossies',
      label: 'Percursos editoriais',
      title: 'Dossiês <span class="dourado">em construção</span>',
      subtitle: 'Estruturas de estudo que conectam artigos, autores, livros e períodos históricos.',
      body: `        <div class="library-grid">\n${cards}\n        </div>`,
      alt: index % 2 === 1
    });
  }
  if (rail.id === 'continue-estudando') {
    const selectedPosts = rail.items.map((slug) => postsBySlug.get(slug)).filter(Boolean);
    return renderHomeSection({
      id: 'continue-estudando',
      label: 'Rede de conhecimento',
      title: 'Continue <span class="dourado">estudando</span>',
      subtitle: 'Uma trilha curta para seguir de um autor a outro sem encerrar a leitura.',
      body: `        <div class="news-grid">\n${selectedPosts.map((post) => renderHomeArticleCard(post, 'Seguir conexão')).join('\n')}\n        </div>`,
      alt: index % 2 === 1
    });
  }
  if (rail.id === 'biblioteca') {
    const cards = rail.items.map((id) => libraryBooks.get(id)).filter(Boolean).map((book) => [
      `        <a class="library-card" href="${book.href}" target="_blank" rel="noopener sponsored">`,
      `          <div class="mark">${escapeHtml(book.mark)}</div>`,
      `          <h3>${escapeHtml(book.title)}</h3>`,
      `          <p>${escapeHtml(book.author)}</p>`,
      `          <span class="button">${escapeHtml(book.action)}</span>`,
      '        </a>'
    ].join('\n')).join('\n');
    return renderHomeSection({
      id: 'biblioteca',
      label: 'Biblioteca Proceder',
      title: 'Leituras de <span class="dourado">formação</span>',
      subtitle: 'Livros que sustentam os percursos editoriais do acervo.',
      body: `        <div class="library-grid">\n${cards}\n        </div>\n        <p style="text-align:center;margin-top:32px"><a class="button" href="biblioteca.html">Ver biblioteca</a></p>`,
      alt: index % 2 === 1
    });
  }
  if (rail.id === 'filosofos') {
    const cards = rail.items.map((name) => [
      '        <a class="library-card" href="/filosofos/">',
      `          <div class="mark">${escapeHtml(name.slice(0, 1))}</div>`,
      `          <h3>${escapeHtml(name)}</h3>`,
      '          <p>Autores e ideias para orientar a leitura do acervo.</p>',
      '          <span class="button">Conhecer autor</span>',
      '        </a>'
    ].join('\n')).join('\n');
    return renderHomeSection({
      id: 'filosofos',
      label: 'Autores',
      title: 'Filósofos <span class="dourado">e mestres</span>',
      subtitle: 'A leitura continua pelos autores que estruturam a tradição.',
      body: `        <div class="library-grid">\n${cards}\n        </div>`,
      alt: index % 2 === 1
    });
  }
  if (rail.id === 'newsletter') {
    return renderHomeSection({
      id: 'newsletter',
      label: 'Newsletter',
      title: 'Receba novas <span class="dourado">reflexões</span>',
      subtitle: 'Um canal simples para acompanhar novos textos, percursos e leituras da revista.',
      body: [
        '        <div class="newsletter-box">',
        '          <form class="newsletter-form" id="newsletterForm">',
        '            <input type="email" id="newsletterEmail" placeholder="seu@email.com" aria-label="Seu e-mail" required>',
        '            <button type="submit" class="newsletter-submit">Inscrever-se</button>',
        '          </form>',
        '          <p class="newsletter-note">Ao confirmar, você recebe o PDF gratuito <strong>Manual de Epicteto</strong> e abrimos um e-mail para <strong>procederfilosofico@gmail.com</strong> com o seu endereço.</p>',
        '        </div>'
      ].join('\n'),
      alt: index % 2 === 1
    });
  }
  return '';
}
const renderValueList = (title, values) => {
  if (!Array.isArray(values) || !values.length) return '';
  const items = values.map((value) => `        <li>${escapeHtml(value)}</li>`).join('\n');
  return [
    '    <section>',
    `      <div class="section-head"><h2>${escapeHtml(title)}</h2><span class="count">${values.length}</span></div>`,
    `      <ul class="intro">\n${items}\n      </ul>`,
    '    </section>'
  ].join('\n');
};
const renderArticleSection = (title, articleSlugs) => {
  const selectedPosts = (articleSlugs || []).map((slug) => postsBySlug.get(slug)).filter(Boolean);
  if (!selectedPosts.length) return '';
  return [
    '    <section>',
    `      <div class="section-head"><h2>${escapeHtml(title)}</h2><span class="count">${selectedPosts.length} ${selectedPosts.length === 1 ? 'artigo' : 'artigos'}</span></div>`,
    `      <div class="grid">\n${selectedPosts.map((post) => renderArticleCard(post)).join('\n')}\n      </div>`,
    '    </section>'
  ].join('\n');
};
const renderTimeline = (timeline) => {
  if (!Array.isArray(timeline) || !timeline.length) return '';
  const items = timeline.map((item) => [
    '        <li>',
    `          <strong>${escapeHtml(item.label)}</strong>`,
    item.date ? `          <span>${escapeHtml(item.date)}</span>` : '',
    `          <p>${escapeHtml(item.description)}</p>`,
    '        </li>'
  ].filter(Boolean).join('\n')).join('\n');
  return [
    '    <section>',
    `      <div class="section-head"><h2>Linha do tempo</h2><span class="count">${timeline.length}</span></div>`,
    `      <ol class="intro">\n${items}\n      </ol>`,
    '    </section>'
  ].join('\n');
};
const renderCollectionSeo = ({ title, description, loc, image = `${SITE_URL}/assets/LQHqVnilFspwfHEy.png`, collectionItems = [] }) => {
  const itemList = collectionItems.map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${SITE_URL}${articleHref(post)}`,
    name: post.title
  }));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: loc,
    image,
    mainEntity: { '@type': 'ItemList', numberOfItems: itemList.length, itemListElement: itemList },
    isPartOf: { '@type': 'WebSite', name: 'Proceder Filosófico', url: `${SITE_URL}/` }
  };
  return [
    `  <title>${escapeHtml(title)} | Proceder Filosófico</title>`,
    `  <meta name="description" content="${escapeHtml(description)}">`,
    '  <meta name="robots" content="index,follow,max-image-preview:large">',
    `  <link rel="canonical" href="${escapeHtml(loc)}">`,
    '  <meta property="og:type" content="website">',
    '  <meta property="og:site_name" content="Proceder Filosófico">',
    `  <meta property="og:title" content="${escapeHtml(title)} | Proceder Filosófico">`,
    `  <meta property="og:description" content="${escapeHtml(description)}">`,
    `  <meta property="og:url" content="${escapeHtml(loc)}">`,
    `  <meta property="og:image" content="${escapeHtml(image)}">`,
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:title" content="${escapeHtml(title)} | Proceder Filosófico">`,
    `  <meta name="twitter:description" content="${escapeHtml(description)}">`,
    `  <meta name="twitter:image" content="${escapeHtml(image)}">`,
    `  <script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll('<', '\\u003c')}</script>`
  ].join('\n');
};
const renderTaxonomyPanel = (post, relatedPosts) => {
  const nextPost = relatedPosts[0] || posts[(posts.findIndex((candidate) => candidate.slug === post.slug) + 1) % posts.length];
  const themeChips = (post.themes || []).slice(0, 8).map((theme) => `<span>${escapeHtml(theme)}</span>`).join('');
  const relatedCards = relatedPosts.slice(0, 3).map((relatedPost) => [
    `          <a class="related-card" href="${articleHref(relatedPost)}">`,
    `            <span>${escapeHtml(relatedPost.category || relatedPost.tag || '')}</span>`,
    `            <strong>${escapeHtml(relatedPost.title)}</strong>`,
    '          </a>'
  ].join('\n')).join('\n');
  const books = (post.books || []).slice(0, 4).map((book) => `<span>${escapeHtml(book)}</span>`).join('');
  const philosophers = (post.philosophers || []).slice(0, 4).map((philosopher) => `<span>${escapeHtml(philosopher)}</span>`).join('');
  return [
    '      <section class="reader-taxonomy" aria-label="Navegação editorial do artigo">',
    '        <div class="taxonomy-meta">',
    `          <a class="taxonomy-pill" href="${categoryHref(post.category)}">${escapeHtml(post.category || 'Artigos')}</a>`,
    `          <span>${escapeHtml(post.subcategory || 'geral')}</span>`,
    post.period ? `          <span>${escapeHtml(post.period)}</span>` : '',
    post.civilization ? `          <span>${escapeHtml(post.civilization)}</span>` : '',
    '        </div>',
    themeChips ? `        <div class="taxonomy-chips" aria-label="Temas relacionados">${themeChips}</div>` : '',
    books ? `        <div class="taxonomy-links"><strong>Livros relacionados</strong>${books}</div>` : '',
    philosophers ? `        <div class="taxonomy-links"><strong>Autores relacionados</strong>${philosophers}</div>` : '',
    nextPost ? [
      '        <div class="next-reading">',
      '          <span>Próximo estudo recomendado</span>',
      `          <a href="${articleHref(nextPost)}">${escapeHtml(nextPost.title)}</a>`,
      '        </div>'
    ].join('\n') : '',
    relatedCards ? [
      '        <div class="related-reading">',
      '          <h2>Continue estudando</h2>',
      `          <div class="related-grid">\n${relatedCards}\n          </div>`,
      '        </div>'
    ].join('\n') : '',
    '      </section>'
  ].filter(Boolean).join('\n');
};
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
  const relatedPosts = (post.relatedArticles || [])
    .map((relatedSlug) => postsBySlug.get(relatedSlug))
    .filter(Boolean);
  const article = [
    '    <!-- PROCEDER:ARTICLE_START -->',
    '    <article class="reader open" id="reader">',
    '      <button class="back" id="backButton">Voltar aos artigos</button>',
    `      <div class="reader-tag" id="readerTag">${escapeHtml(post.category || post.tag || '')}</div>`,
    `      <h1 id="readerTitle">${escapeHtml(post.title || '')}</h1>`,
    `      <div class="reader-date" id="readerDate">${escapeHtml(post.date || '')}</div>`,
    `      <div class="reader-content" id="readerContent">${content}</div>`,
    renderTaxonomyPanel(post, relatedPosts),
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
  fs.writeFileSync(path.join(targetDir, 'index.html'), renderShellPage(hubTemplate
    .replace('  <!-- PROCEDER:HUB_SEO -->', seo)
    .replace('    <!-- PROCEDER:HUB_CONTENT -->', content), '', `conteudo-${slug}`));
}

removeGeneratedChildren(CATEGORY_ROOT);
fs.mkdirSync(CATEGORY_ROOT, { recursive: true });
for (const { slug, category, posts: categoryPosts, loc } of categoryUrls) {
  const seo = renderCollectionSeo({
    title: category.title,
    description: category.description,
    loc,
    collectionItems: categoryPosts
  });
  const cards = categoryPosts.length
    ? categoryPosts.map((post) => renderArticleCard(post)).join('\n')
    : '      <p class="intro">Ainda não há artigos classificados nesta categoria.</p>';
  const content = [
    `    <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Início</a><span>›</span><strong>${escapeHtml(category.title)}</strong></nav>`,
    '    <header class="hero">',
    '      <span class="label">Categoria editorial</span>',
    `      <h1>${escapeHtml(category.title)}</h1>`,
    `      <p class="description">${escapeHtml(category.description)}</p>`,
    '    </header>',
    '    <section>',
    `      <div class="section-head"><h2>Artigos da categoria</h2><span class="count">${categoryPosts.length} ${categoryPosts.length === 1 ? 'artigo' : 'artigos'}</span></div>`,
    `      <div class="grid">\n${cards}\n      </div>`,
    '    </section>'
  ].join('\n');
  const targetDir = path.join(CATEGORY_ROOT, slug);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), renderShellPage(hubTemplate
    .replace('  <!-- PROCEDER:HUB_SEO -->', seo)
    .replace('  <!-- PROCEDER:HUB_GENERATED -->', `  <!-- PROCEDER:HUB_GENERATED -->\n  <!-- ${generatedMarker} -->`)
    .replace('    <!-- PROCEDER:HUB_CONTENT -->', content), 'categorias', `categoria-${slug}`));
}

removeGeneratedChildren(DOSSIERS_ROOT);
fs.mkdirSync(DOSSIERS_ROOT, { recursive: true });
for (const { slug, dossier, loc } of dossierUrls) {
  const mainPost = dossier.mainArticle ? postsBySlug.get(dossier.mainArticle) : null;
  const collectionSlugs = [
    dossier.mainArticle,
    ...(dossier.relatedArticles || []),
    ...(dossier.recommendedArticles || []),
    ...(dossier.continueStudying || [])
  ].filter(Boolean);
  const collectionItems = Array.from(new Set(collectionSlugs)).map((articleSlug) => postsBySlug.get(articleSlug)).filter(Boolean);
  const seo = renderCollectionSeo({
    title: dossier.title,
    description: dossier.subtitle || dossier.editorialIntroduction || 'Dossiê editorial do Proceder Filosófico.',
    loc,
    collectionItems
  });
  const modelLabel = dossier.isCanonicalModel ? 'Modelo canônico' : 'Dossiê editorial';
  const mainArticleBlock = mainPost ? renderArticleSection('Artigo principal', [mainPost.slug]) : [
    '    <section>',
    '      <div class="section-head"><h2>Artigo principal</h2><span class="count">pendente</span></div>',
    '      <p class="intro">Placeholder editorial: artigo principal a ser definido pela curadoria.</p>',
    '    </section>'
  ].join('\n');
  const content = [
    `    <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Início</a><span>›</span><a href="/dossies/">Dossiês</a><span>›</span><strong>${escapeHtml(dossier.title)}</strong></nav>`,
    '    <header class="hero">',
    `      <span class="label">${escapeHtml(modelLabel)}</span>`,
    `      <h1>${escapeHtml(dossier.title)}</h1>`,
    `      <p class="description">${escapeHtml(dossier.subtitle)}</p>`,
    `      <p class="intro">${escapeHtml(dossier.editorialIntroduction)}</p>`,
    `      <p class="intro"><strong>Objetivo intelectual:</strong> ${escapeHtml(dossier.intellectualObjective)}</p>`,
    '    </header>',
    mainArticleBlock,
    renderArticleSection('Artigos relacionados', dossier.relatedArticles),
    renderArticleSection('Artigos recomendados', dossier.recommendedArticles),
    renderArticleSection('Continuar estudando', dossier.continueStudying),
    renderValueList('Filósofos relacionados', dossier.relatedPhilosophers),
    renderValueList('Autores relacionados', dossier.relatedAuthors),
    renderValueList('Livros relacionados', dossier.relatedBooks),
    renderValueList('Obras de arte relacionadas', dossier.relatedArtworks),
    renderValueList('Períodos históricos', dossier.historicalPeriods),
    renderValueList('Civilizações relacionadas', dossier.civilizations),
    renderTimeline(dossier.timeline),
    renderValueList('Bibliografia', dossier.bibliography),
    renderValueList('Leituras futuras', dossier.futureReadings)
  ].filter(Boolean).join('\n');
  const targetDir = path.join(DOSSIERS_ROOT, slug);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), renderShellPage(hubTemplate
    .replace('  <!-- PROCEDER:HUB_SEO -->', seo)
    .replace('  <!-- PROCEDER:HUB_GENERATED -->', `  <!-- PROCEDER:HUB_GENERATED -->\n  <!-- ${generatedMarker} -->`)
    .replace('    <!-- PROCEDER:HUB_CONTENT -->', content), 'dossies', `dossies-${slug}`));
}
const dossierItems = dossiers.length
  ? dossiers.map((dossier) => [
    `      <a class="card" href="/dossies/${encodeURIComponent(dossier.slug)}/">`,
    '        <div class="card-body">',
    `          <div class="card-tag">${escapeHtml(dossier.isCanonicalModel ? 'modelo canônico' : dossier.status || 'planejado')}</div>`,
    `          <h3>${escapeHtml(dossier.title)}</h3>`,
    `          <p>${escapeHtml(dossier.subtitle || 'Dossiê editorial em preparação.')}</p>`,
    '        </div>',
    '      </a>'
  ].join('\n')).join('\n')
  : '      <p class="intro">Os dossiês editoriais ainda estão em preparação.</p>';
const dossiersSeo = renderCollectionSeo({
  title: 'Dossiês',
  description: 'Estrutura de dossiês editoriais do Proceder Filosófico.',
  loc: dossierIndexUrl.loc,
  collectionItems: []
});
const dossiersContent = [
  '    <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Início</a><span>›</span><strong>Dossiês</strong></nav>',
  '    <header class="hero">',
  '      <span class="label">Dossiês editoriais</span>',
  '      <h1>Dossiês</h1>',
  '      <p class="description">Percursos de estudo para organizar artigos, livros, autores, linhas do tempo e bibliografia.</p>',
  '    </header>',
  '    <section>',
  `      <div class="section-head"><h2>Dossiês oficiais</h2><span class="count">${dossiers.length} ${dossiers.length === 1 ? 'dossiê' : 'dossiês'}</span></div>`,
  `      <div class="grid">\n${dossierItems}\n      </div>`,
  '    </section>'
].join('\n');
fs.writeFileSync(path.join(DOSSIERS_ROOT, 'index.html'), renderShellPage(hubTemplate
  .replace('  <!-- PROCEDER:HUB_SEO -->', dossiersSeo)
  .replace('  <!-- PROCEDER:HUB_GENERATED -->', `  <!-- PROCEDER:HUB_GENERATED -->\n  <!-- ${generatedMarker} -->`)
  .replace('    <!-- PROCEDER:HUB_CONTENT -->', dossiersContent), 'dossies', 'dossies-index'));

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

const homeEditorialPattern = /    <!-- PROCEDER:HOME_(?:HUB|V2)_START -->[\s\S]*?    <!-- PROCEDER:HOME_(?:HUB|V2)_END -->/;
const homeIndex = fs.readFileSync(HOME_INDEX, 'utf8');
if (!homeEditorialPattern.test(homeIndex)) throw new Error('Marcadores HOME V2 ausentes em SITE/index.html.');
const homeV2Content = homeRails.map((rail, index) => renderHomeRail(rail, index)).filter(Boolean).join('\n');
fs.writeFileSync(HOME_INDEX, homeIndex.replace(homeEditorialPattern, [
  '    <!-- PROCEDER:HOME_HUB_START -->',
  homeV2Content,
  '    <!-- PROCEDER:HOME_HUB_END -->'
].join('\n')));

fs.writeFileSync(path.join(SITE, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(SITE, 'robots.txt'), robots);
console.log(`SEO gerado: ${urls.length} páginas de artigo, ${categoryUrls.length} categorias, ${dossierUrls.length} dossiês, ${hubUrls.length} HUBs, sitemap.xml e robots.txt.`);
