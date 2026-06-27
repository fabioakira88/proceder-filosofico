(function () {
  function rewriteArticleContent(html) {
    return String(html || '')
      .replace(/(src|href)="assets\//g, '$1="/assets/')
      .replace(/href="\?post=([^"&]+)"/g, 'href="/artigos/$1/"');
  }

  window.ProcederReader = { rewriteArticleContent: rewriteArticleContent };
})();
