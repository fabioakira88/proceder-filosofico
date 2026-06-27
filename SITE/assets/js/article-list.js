(function () {
  function route(post) {
    return '/artigos/' + encodeURIComponent(post.slug || post.id) + '/';
  }

  function image(post) {
    var value = String(post.thumb || 'assets/default-article.jpg');
    return /^https?:\/\//.test(value) ? value : '/' + value.replace(/^\/+/, '');
  }

  function tagAnchor(tag) {
    return String(tag || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  window.ProcederArticleList = { route: route, image: image, tagAnchor: tagAnchor };
})();
