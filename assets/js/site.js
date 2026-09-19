/* NFTCI — shared navigation, footer and progressive enhancement */
(function () {
  'use strict';

  var SITE = {
    name: 'NFTCI',
    legal: 'National Federation of Tourism & Transport Co-operatives of India Ltd',
    email: 'info@nftcindia.in',
    address: 'NCUI Printing Press & Skill Development Centre, 2nd Floor, B-81, Sector 80, Noida, Uttar Pradesh, NCR of Delhi, India'
  };

  var NAV = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Services', href: 'services.html' },
    { label: 'Programmes', href: 'projects.html' },
    { label: 'Gallery', href: 'gallery.html' },
    { label: 'Membership', href: 'memberships.html' },
    { label: 'Contact', href: 'contact.html' }
  ];

  function icon(name, size) {
    var paths = {
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
      close: '<path d="m6 6 12 12M18 6 6 18"/>'
    };
    return '<svg width="' + (size || 18) + '" height="' + (size || 18) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || '') + '</svg>';
  }

  function brand() {
    return '<span class="brand">' +
      '<img class="brand__logo" src="assets/img/brand/nftci-logo.png" width="161" height="150" alt="">' +
      '<span class="brand__copy"><span class="brand__name">NFTCI</span>' +
      '<span class="brand__sub">National Federation of Tourism &amp; Transport Co-operatives of India Ltd</span></span></span>';
  }

  function currentPage() {
    var file = window.location.pathname.split('/').pop();
    return file || 'index.html';
  }

  function renderHeader() {
    var host = document.querySelector('[data-site-header]');
    if (!host) return;
    var page = currentPage();
    var desktop = NAV.map(function (item) {
      var active = item.href === page ? ' is-active' : '';
      var current = item.href === page ? ' aria-current="page"' : '';
      return '<a class="nav-link' + active + '" href="' + item.href + '"' + current + '>' + item.label + '</a>';
    }).join('');
    var mobile = NAV.map(function (item) {
      var active = item.href === page ? ' is-active' : '';
      var current = item.href === page ? ' aria-current="page"' : '';
      return '<a class="drawer-link' + active + '" href="' + item.href + '"' + current + '><span>' + item.label + '</span>' + icon('arrow', 17) + '</a>';
    }).join('');

    host.innerHTML = '<div class="tricolor" aria-hidden="true"></div>' +
      '<div class="topbar"><div class="container topbar__inner">' +
      '<span class="topbar__item">' + icon('pin', 15) + '<span>Sector 80, Noida, Uttar Pradesh</span></span>' +
      '<a class="topbar__item" href="mailto:' + SITE.email + '">' + icon('mail', 15) + '<span>' + SITE.email + '</span></a>' +
      '</div></div>' +
      '<header class="site-header" id="siteHeader"><div class="container header-inner">' +
      '<a href="index.html" aria-label="NFTCI home">' + brand() + '</a>' +
      '<nav class="desktop-nav" aria-label="Primary navigation">' + desktop + '</nav>' +
      '<div class="header-actions"><a class="btn btn-primary" href="memberships.html">Join NFTCI ' + icon('arrow', 17) + '</a>' +
      '<button class="menu-toggle" id="menuToggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileDrawer"><span></span></button></div>' +
      '</div></header>' +
      '<div class="mobile-drawer" id="mobileDrawer" aria-hidden="true"><div class="drawer-scrim" data-menu-close></div>' +
      '<div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Site navigation"><div class="drawer-head">' + brand() +
      '<button class="drawer-close" type="button" data-menu-close aria-label="Close menu">' + icon('close', 22) + '</button></div>' +
      '<nav class="drawer-nav" aria-label="Mobile navigation">' + mobile + '</nav>' +
      '<a class="btn btn-primary" href="memberships.html" style="width:100%">Become a member ' + icon('arrow', 17) + '</a>' +
      '<div class="drawer-contact"><strong>Federation office</strong><p style="margin:8px 0 12px">' + SITE.address + '</p><a href="mailto:' + SITE.email + '">' + SITE.email + '</a></div>' +
      '</div></div>';
  }

  function wireMenu() {
    var drawer = document.getElementById('mobileDrawer');
    var toggle = document.getElementById('menuToggle');
    if (!drawer || !toggle) return;
    var lastFocus;
    function open() {
      lastFocus = document.activeElement;
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      var close = drawer.querySelector('.drawer-close');
      if (close) close.focus();
    }
    function close() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      if (lastFocus) lastFocus.focus();
    }
    toggle.addEventListener('click', open);
    drawer.addEventListener('click', function (event) {
      if (event.target.closest('[data-menu-close]') || event.target.closest('a')) close();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 1080) close(); });
  }

  function renderFooter() {
    var host = document.querySelector('[data-site-footer]');
    if (!host) return;
    var links = NAV.map(function (item) { return '<li><a href="' + item.href + '">' + item.label + '</a></li>'; }).join('');
    host.innerHTML = '<footer class="site-footer"><div class="container footer-main"><div class="footer-grid">' +
      '<div class="footer-brand">' + brand() + '<p class="footer-about">A national-level apex cooperative federation connecting grassroots enterprise with structured tourism, transport, hospitality, logistics and allied service opportunities.</p></div>' +
      '<div><h4>Explore</h4><ul class="footer-links">' + links + '</ul></div>' +
      '<div><h4>Key domains</h4><ul class="footer-links"><li><a href="services.html#transport">Transport &amp; mobility</a></li><li><a href="services.html#tourism">Tourism</a></li><li><a href="services.html#logistics">Logistics</a></li><li><a href="services.html#hospitality">Hospitality</a></li><li><a href="services.html#trade">Trade &amp; rural enterprise</a></li></ul></div>' +
      '<div><h4>Federation office</h4><div class="footer-contact"><div>' + icon('pin', 18) + '<span>' + SITE.address + '</span></div><div>' + icon('mail', 18) + '<a href="mailto:' + SITE.email + '">' + SITE.email + '</a></div></div></div>' +
      '</div></div><div class="footer-bottom"><div class="container"><p>© <span id="siteYear"></span> ' + SITE.legal + '.</p><p>Cooperation · Capability · National reach</p></div></div></footer>';
  }

  function wireScrollState() {
    var header = document.getElementById('siteHeader');
    if (!header) return;
    var update = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function wireReveals() {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(function (element) { element.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -6% 0px' });
    elements.forEach(function (element) { observer.observe(element); });
  }

  function wireEmailForms() {
    document.querySelectorAll('[data-email-form]').forEach(function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        var data = new FormData(form);
        var subject = data.get('subject') || 'Website enquiry for NFTCI';
        var lines = [];
        data.forEach(function (value, key) {
          if (key !== 'subject' && value) lines.push(key.replace(/[-_]/g, ' ').replace(/^./, function (letter) { return letter.toUpperCase(); }) + ': ' + value);
        });
        var note = form.querySelector('[data-form-note]');
        if (note) { note.hidden = false; note.textContent = 'Your email application should open with the enquiry details. If it does not, write directly to ' + SITE.email + '.'; }
        window.location.href = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      });
    });
  }

  function boot() {
    renderHeader();
    renderFooter();
    wireMenu();
    wireScrollState();
    wireReveals();
    wireEmailForms();
    var year = document.getElementById('siteYear');
    if (year) year.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
