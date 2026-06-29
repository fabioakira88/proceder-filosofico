(function () {
  var NAV_SELECTOR = '.navbar';
  var INNER_SELECTOR = '.navbar-inner';
  var LINKS_SELECTOR = '.navbar-links';
  var TOGGLE_SELECTOR = '.menu-toggle';
  var desktopQuery = typeof window.matchMedia === 'function' ? window.matchMedia('(min-width: 769px)') : null;
  var autoId = 0;

  function bindToggle(button, target) {
    button.addEventListener('click', function () {
      var open = target.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  }

  // The menu toggle has no purpose on desktop, so the markup is not shipped
  // in the page source at all. It exists only as a DOM node created here,
  // and only while the viewport is mobile-sized. On desktop there is no
  // button element anywhere in the document to hide, style or trip over.
  function createToggle(nav) {
    var inner = nav.querySelector(INNER_SELECTOR);
    var links = nav.querySelector(LINKS_SELECTOR);
    if (!inner || !links) return;
    if (!links.id) {
      autoId += 1;
      links.id = 'procederNav' + autoId;
    }
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'menu-toggle';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', links.id);
    button.setAttribute('aria-label', 'Abrir menu');
    button.appendChild(document.createElement('span'));
    button.appendChild(document.createElement('span'));
    button.appendChild(document.createElement('span'));
    inner.insertBefore(button, links);
    bindToggle(button, links);
  }

  function removeToggle(nav) {
    var button = nav.querySelector(TOGGLE_SELECTOR);
    var links = nav.querySelector(LINKS_SELECTOR);
    if (links) links.classList.remove('open');
    if (button) button.remove();
  }

  function syncNav(nav, isDesktop) {
    var hasToggle = !!nav.querySelector(TOGGLE_SELECTOR);
    if (isDesktop) {
      if (hasToggle) removeToggle(nav);
    } else if (!hasToggle) {
      createToggle(nav);
    }
  }

  function syncAllNavs(scope) {
    var isDesktop = desktopQuery ? desktopQuery.matches : window.innerWidth >= 769;
    scope.querySelectorAll(NAV_SELECTOR).forEach(function (nav) { syncNav(nav, isDesktop); });
  }

  function initNavigation(root) {
    syncAllNavs(root || document);
  }

  if (desktopQuery) {
    var onChange = function () { syncAllNavs(document); };
    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', onChange);
    } else if (typeof desktopQuery.addListener === 'function') {
      desktopQuery.addListener(onChange);
    }
  } else {
    window.addEventListener('resize', function () { syncAllNavs(document); });
  }

  window.ProcederNavigation = { init: initNavigation };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initNavigation(document); });
  } else {
    initNavigation(document);
  }
})();
