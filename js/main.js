/* =========================================================
   TREME FIT — main.js
   Menu mobile, validação de formulário, galeria e animações
   ========================================================= */
(function () {
  'use strict';

  /* -------------------------------------------------
     0. Faixa de demonstração (dispensável)
     ------------------------------------------------- */
  var demoBar = document.querySelector('.demo-bar');
  if (demoBar) {
    var demoClose = demoBar.querySelector('.demo-bar__close');
    var demoKey = 'tf-demo-bar';
    try {
      if (window.localStorage && localStorage.getItem(demoKey) === 'off') {
        demoBar.hidden = true;
      }
    } catch (e) { /* sem localStorage: a faixa apenas permanece */ }

    if (demoClose) {
      demoClose.addEventListener('click', function () {
        demoBar.hidden = true;
        try { localStorage.setItem(demoKey, 'off'); } catch (e) { /* ignora */ }
      });
    }
  }

  /* -------------------------------------------------
     1. Menu mobile
     ------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function closeMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    /* Fecha ao clicar em um link */
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    /* Fecha com a tecla Esc */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    /* Fecha ao redimensionar para telas grandes */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  /* -------------------------------------------------
     2. Rastreamento de cliques de conversão
        (funciona se houver dataLayer/GTM configurado)
     ------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (!el || !window.dataLayer) return;
    window.dataLayer.push({
      event: 'contact_click',
      action: el.getAttribute('data-track'),
      label: el.getAttribute('data-label') || ''
    });
  });

  /* -------------------------------------------------
     3. Galeria com lightbox
     ------------------------------------------------- */
  var gallery = document.querySelector('.gallery');
  if (gallery) {
    var figures = Array.prototype.slice.call(gallery.querySelectorAll('figure'));

    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Visualização da foto');
    box.innerHTML =
      '<button class="lb-close" type="button" aria-label="Fechar imagem">&#10005;</button>' +
      '<button class="lb-prev" type="button" aria-label="Foto anterior">&#8249;</button>' +
      '<img alt=""> ' +
      '<button class="lb-next" type="button" aria-label="Próxima foto">&#8250;</button>';
    document.body.appendChild(box);

    var boxImg = box.querySelector('img');
    var lastTrigger = null;
    var current = 0;

    function show(i) {
      current = (i + figures.length) % figures.length;
      var src = figures[current].querySelector('img');
      boxImg.src = src.currentSrc || src.src;
      boxImg.alt = src.alt;
    }

    function openBox(i, trigger) {
      lastTrigger = trigger;
      show(i);
      box.classList.add('is-open');
      box.querySelector('.lb-close').focus();
      document.body.style.overflow = 'hidden';
    }

    function closeBox() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastTrigger) lastTrigger.focus();
    }

    figures.forEach(function (fig, i) {
      fig.setAttribute('tabindex', '0');
      fig.setAttribute('role', 'button');
      fig.setAttribute('aria-label', 'Ampliar foto: ' + (fig.querySelector('img').alt || ''));
      fig.addEventListener('click', function () { openBox(i, fig); });
      fig.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openBox(i, fig);
        }
      });
    });

    box.querySelector('.lb-close').addEventListener('click', closeBox);
    box.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    box.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });

    box.addEventListener('click', function (e) {
      if (e.target === box) closeBox();
    });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeBox();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* -------------------------------------------------
     4. Formulário de contato com validação
     ------------------------------------------------- */
  var form = document.getElementById('form-contato');

  if (form) {
    var success = document.getElementById('form-success');

    function setError(field, message) {
      var box = field.closest('.form-field') || field.closest('.checkbox-wrap');
      var err = box ? box.querySelector('.error') : null;
      if (err) err.textContent = message || '';
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
      return !message;
    }

    function validateField(field) {
      var value = (field.value || '').trim();

      switch (field.id) {
        case 'nome':
          return setError(field, value.length >= 2 ? '' : 'Informe seu nome.');

        case 'contato': {
          if (!value) return setError(field, 'Informe um WhatsApp ou e-mail.');
          if (value.indexOf('@') > -1) {
            var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
            return setError(field, okEmail ? '' : 'E-mail inválido.');
          }
          var digits = value.replace(/\D/g, '');
          var okFone = digits.length >= 10 && digits.length <= 14;
          return setError(field, okFone ? '' : 'Telefone incompleto (DDD + número).');
        }

        case 'interesse':
          return setError(field, value ? '' : 'Escolha um assunto.');

        case 'mensagem':
          return setError(field, value.length <= 800 ? '' : 'Mensagem muito longa (máx. 800 caracteres).');

        case 'consentimento':
          return setError(field, field.checked ? '' : 'Precisamos do seu consentimento para responder.');

        default:
          return true;
      }
    }

    var fields = Array.prototype.slice.call(
      form.querySelectorAll('#nome, #contato, #interesse, #mensagem, #consentimento')
    );

    /* Valida ao sair do campo */
    fields.forEach(function (field) {
      var evt = field.type === 'checkbox' || field.tagName === 'SELECT' ? 'change' : 'blur';
      field.addEventListener(evt, function () { validateField(field); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstInvalid = null;
      fields.forEach(function (field) {
        var valid = validateField(field);
        if (!valid && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        if (success) success.classList.remove('is-visible');
        firstInvalid.focus();
        return;
      }

      /* Entrega real da mensagem: monta e abre o WhatsApp da academia
         com os dados preenchidos (não há servidor de e-mail no site). */
      var data = new FormData(form);
      var linhas = [
        'Olá! Vim pelo site da TREME FIT.',
        '',
        'Nome: ' + data.get('nome'),
        'Contato: ' + data.get('contato'),
        'Assunto: ' + data.get('interesse')
      ];
      if (data.get('mensagem')) linhas.push(String(data.get('mensagem')));

      var url = 'https://wa.me/5500000000000?text=' + encodeURIComponent(linhas.join('\n'));
      window.open(url, '_blank', 'noopener');

      if (success) {
        success.innerHTML =
          'Tudo certo! Abrimos o WhatsApp com a sua mensagem — é só toque em enviar. ' +
          'Se a janela não abriu, <a href="' + url + '" target="_blank" rel="noopener">clique aqui</a>.';
        success.classList.add('is-visible');
        success.focus();
      }
      form.reset();
      fields.forEach(function (field) { field.setAttribute('aria-invalid', 'false'); });
    });
  }

  /* -------------------------------------------------
     5. Animação de entrada suave (ativada por último)
        Só esconde o conteúdo depois de todo o resto ter
        carregado; o timeout garante que nada fique oculto.
     ------------------------------------------------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function revealAll() {
    revealItems.forEach(function (el) { el.classList.add('is-in'); });
  }

  if (revealItems.length &&
      'IntersectionObserver' in window &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

    document.documentElement.classList.add('js-reveal');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealItems.forEach(function (el) { io.observe(el); });

    /* Segurança: todo o conteúdo fica visível em 2,5 s,
       mesmo que o observador não dispare */
    window.setTimeout(revealAll, 2500);
  }
})();
