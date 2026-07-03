(function () {
  var activeButton = null;
  var modal = null;

  function safeText(value) {
    return String(value || '').trim();
  }

  function ensureModal() {
    if (modal) return modal;

    modal = document.createElement('div');
    modal.className = 'pf-book-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      '<div class="pf-book-modal__backdrop" data-pf-book-close></div>' +
      '<section class="pf-book-modal__panel" aria-labelledby="pf-book-modal-title">' +
        '<button class="pf-book-modal__close" type="button" data-pf-book-close aria-label="Fechar">×</button>' +
        '<div class="pf-book-modal__cover" aria-hidden="true"><span></span></div>' +
        '<div class="pf-book-modal__content">' +
          '<span class="pf-book-modal__eyebrow">Obra relacionada</span>' +
          '<h2 id="pf-book-modal-title"></h2>' +
          '<p class="pf-book-modal__author"></p>' +
          '<p class="pf-book-modal__reason"></p>' +
          '<div class="pf-book-modal__actions">' +
            '<a class="pf-book-modal__primary" href="/biblioteca.html">Ver na Biblioteca</a>' +
            '<a class="pf-book-modal__secondary" href="#" target="_blank" rel="noopener sponsored">Ver edição afiliada</a>' +
          '</div>' +
          '<p class="pf-book-modal__note">Links afiliados ajudam a manter o Proceder Filosófico sem custo adicional para você.</p>' +
        '</div>' +
      '</section>';

    modal.addEventListener('click', function (event) {
      if (event.target.closest('[data-pf-book-close]')) closeModal();
    });

    document.body.appendChild(modal);
    return modal;
  }

  function openModal(button) {
    var instance = ensureModal();
    var title = safeText(button.dataset.bookTitle);
    var author = safeText(button.dataset.bookAuthor);
    var reason = safeText(button.dataset.bookReason);
    var affiliate = safeText(button.dataset.bookAffiliate);
    var initial = title.charAt(0) || 'L';

    activeButton = button;
    instance.querySelector('#pf-book-modal-title').textContent = title;
    instance.querySelector('.pf-book-modal__author').textContent = author ? '— ' + author : '';
    instance.querySelector('.pf-book-modal__reason').textContent = reason;
    instance.querySelector('.pf-book-modal__cover span').textContent = initial;

    var primary = instance.querySelector('.pf-book-modal__primary');
    primary.href = '/biblioteca.html';

    var secondary = instance.querySelector('.pf-book-modal__secondary');
    if (affiliate) {
      secondary.href = affiliate;
      secondary.hidden = false;
    } else {
      secondary.hidden = true;
    }

    instance.classList.add('is-open');
    instance.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('pf-book-modal-open');
    instance.querySelector('.pf-book-modal__close').focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('pf-book-modal-open');
    if (activeButton) activeButton.focus();
    activeButton = null;
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-pf-book]');
    if (!button) return;
    event.preventDefault();
    openModal(button);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeModal();
  });
})();
