(function () {
  var TOGGLE_SELECTOR = '.hamburger, #hamburger, .menu-toggle, [data-nav-toggle]';
  var desktopQuery = typeof window.matchMedia === 'function' ? window.matchMedia('(min-width: 769px)') : null;

  function bindToggle(button, target) {
    if (!button || !target) return;
    button.addEventListener('click', function () {
      var open = target.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  }

  // The menu toggle exists only for the mobile nav pattern. On desktop it has
  // no function at all, so beyond hiding it with CSS, it is actively removed
  // from rendering, interaction and the accessibility tree at the DOM level.
  // This is independent of components.css load order or any page-local style.
  function enforceDesktopState(scope) {
    var isDesktop = desktopQuery ? desktopQuery.matches : window.innerWidth >= 769;
    var buttons = scope.querySelectorAll(TOGGLE_SELECTOR);
    buttons.forEach(function (button) {
      if (isDesktop) {
        button.hidden = true;
        button.setAttribute('aria-hidden', 'true');
        button.tabIndex = -1;
        var controls = button.getAttribute('aria-controls');
        var target = controls ? scope.getElementById && scope.getElementById(controls) : null;
        if (target) target.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      } else {
        button.hidden = false;
        button.removeAttribute('aria-hidden');
        button.removeAttribute('tabindex');
      }
    });
  }

  function initNavigation(root) {
    var scope = root || document;
    bindToggle(scope.getElementById && scope.getElementById('menuToggle'), scope.getElementById && scope.getElementById('libraryNav'));
    bindToggle(scope.getElementById && scope.getElementById('hamburger'), scope.getElementById && scope.getElementById('navLinks'));
    scope.querySelectorAll('[data-nav-toggle]').forEach(function (button) {
      var target = scope.querySelector(button.getAttribute('data-nav-toggle'));
      bindToggle(button, target);
    });
    enforceDesktopState(scope === document ? document : document);
  }

  if (desktopQuery) {
    var onChange = function () { enforceDesktopState(document); };
    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', onChange);
    } else if (typeof desktopQuery.addListener === 'function') {
      desktopQuery.addListener(onChange);
    }
  } else {
    window.addEventListener('resize', function () { enforceDesktopState(document); });
  }

  window.ProcederNavigation = { init: initNavigation };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initNavigation(document); });
  } else {
    initNavigation(document);
  }
})();
