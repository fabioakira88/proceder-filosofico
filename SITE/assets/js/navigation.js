(function () {
  function bindToggle(button, target) {
    if (!button || !target) return;
    button.addEventListener('click', function () {
      var open = target.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
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
  }

  window.ProcederNavigation = { init: initNavigation };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initNavigation(document); });
  } else {
    initNavigation(document);
  }
})();
