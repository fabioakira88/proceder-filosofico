(function () {
  'use strict';

  var SITE_URL = 'https://procederfilosofico.com.br';
  var SITE_NAME = 'Proceder Filosófico';
  function pageDefaults() {
    var isArticles = /^\/artigos\/?$/.test(window.location.pathname);
    return {
      title: isArticles ? 'Artigos | Proceder Filosófico' : 'Proceder Filosófico',
      description: isArticles
        ? 'Artigos do Proceder Filosófico: filosofia clássica, medieval, moderna, política, ciência e tecnologia em linguagem editorial contemporânea.'
        : 'Filosofia, história das ideias, literatura e formação intelectual.',
      canonical: SITE_URL + (isArticles ? '/artigos/' : '/'),
      image: SITE_URL + '/assets/default-article.jpg',
      type: 'website'
    };
  }

  function absoluteUrl(value) {
    if (!value) return pageDefaults().image;
    if (/^https?:\/\//i.test(value)) return value;
    return SITE_URL + '/' + String(value).replace(/^\/+/, '');
  }

  function findPost(slug) {
    if (typeof POSTS === 'undefined' || !Array.isArray(POSTS) || !slug) return null;
    for (var index = 0; index < POSTS.length; index += 1) {
      if ((POSTS[index].slug || POSTS[index].id) === slug) return POSTS[index];
    }
    return null;
  }

  function upsertMeta(selector, attributes) {
    var element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      document.head.appendChild(element);
    }
    Object.keys(attributes).forEach(function (name) {
      element.setAttribute(name, attributes[name]);
    });
  }

  function upsertCanonical(url) {
    var link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  function upsertJsonLd(data) {
    var script = document.getElementById('proceder-article-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'proceder-article-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  function removeJsonLd() {
    var script = document.getElementById('proceder-article-jsonld');
    if (script) script.remove();
  }

  function apply(data) {
    document.title = data.title;
    upsertMeta('meta[name="description"]', { name: 'description', content: data.description });
    upsertCanonical(data.canonical);
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: data.type });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: data.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: data.description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: data.canonical });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: data.image });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: data.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: data.description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: data.image });
  }

  function update(slug) {
    var post = findPost(slug);
    if (!post) {
      apply(pageDefaults());
      removeJsonLd();
      return;
    }

    var route = post.slug || post.id;
    var canonical = SITE_URL + '/artigos/' + encodeURIComponent(route) + '/';
    var image = absoluteUrl(post.cover || post.thumb);
    var title = post.metaTitle || post.title + ' | ' + SITE_NAME;
    var description = post.metaDescription || post.excerpt || pageDefaults().description;
    var keywords = Array.isArray(post.keywords) ? post.keywords : post.tags;

    apply({
      title: title,
      description: description,
      canonical: canonical,
      image: image,
      type: 'article'
    });

    upsertJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: description,
      image: [image],
      datePublished: post.dateISO || undefined,
      dateModified: post.updatedISO || post.dateISO || undefined,
      articleSection: post.category || post.tag || undefined,
      keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords || undefined,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL + '/' },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL + '/',
        logo: { '@type': 'ImageObject', url: pageDefaults().image }
      }
    });
  }

  function locationSlug() {
    var querySlug = new URLSearchParams(window.location.search).get('post');
    if (querySlug) return querySlug;
    var match = window.location.pathname.match(/^\/artigos\/([^/]+)\/?$/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  function fromLocation() {
    update(locationSlug());
  }

  window.ProcederSEO = {
    update: update,
    reset: function () { update(null); },
    fromLocation: fromLocation
  };

  fromLocation();
})();
