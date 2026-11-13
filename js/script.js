/* ==========================================================
   Portfolio scripts – Nikhil Jaiswal
   1. EDIT YOUR DATA HERE (projects and certifications)
   2. Behaviour (theme, menu, active link, reveal)
   ========================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. DATA – to add a project or certificate, copy one { ... }
     block, paste it after the last one (with a comma), and edit.
     Leave a value empty ("" or []) to hide that part.
     If a list is empty, its whole section is hidden.
     --------------------------------------------------------- */
  var PROJECTS = [
    {
      title: 'Smart Computer Fault Detection System',
      description: 'An IT-based project that detects common computer hardware and software problems, monitors system performance, and suggests possible solutions to make troubleshooting faster and easier.',
      technologies: ['Python', 'Windows OS', 'Hardware Diagnostics', 'System Monitoring', 'Networking', 'HTML', 'CSS'],
      contribution: 'Designed the project concept, performed computer hardware and software testing, developed diagnostic logic, monitored system performance, and identified common computer faults with possible solutions.',
      image: 'assets/images/project1.jpg',      // put your image here
      links: [
        // [Add your GitHub repository link later], for example:
        // { label: 'View on GitHub', url: 'https://github.com/NikhilJaiswal05/your-repo' }
      ]
    }
  ];

  var CERTIFICATIONS = [
    {
      name: 'AI Literacy Badge',
      issuer: 'IBM SkillsBuild',
      year: '2026',
      link: 'https://www.credly.com/go/ohDywwNf'   // verification link on Credly
    }
  ];

  /* ---------------------------------------------------------
     2. HELPERS
     --------------------------------------------------------- */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function safeStorageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage may be blocked */ }
  }

  // Run a callback if an image fails to load (also if it already failed)
  function onImageFail(img, callback) {
    img.addEventListener('error', callback);
    if (img.complete && img.naturalWidth === 0) callback();
  }

  /* ---------------------------------------------------------
     3. RENDER PROJECTS
     --------------------------------------------------------- */
  function renderProjects() {
    var section = document.getElementById('projects');
    var list = document.getElementById('project-list');
    if (!PROJECTS.length) { hideSection(section); return; }

    PROJECTS.forEach(function (p) {
      var card = el('article', 'project');

      // Image side (with a placeholder if the image is missing)
      var media = el('div', 'project-media');
      var placeholder = el('div', 'project-placeholder', 'Project image');
      media.appendChild(placeholder);
      if (p.image) {
        var img = document.createElement('img');
        img.src = p.image;
        img.alt = 'Screenshot of ' + p.title;
        img.loading = 'lazy';
        img.addEventListener('load', function () { placeholder.hidden = true; });
        onImageFail(img, function () { img.hidden = true; });
        media.appendChild(img);
      }
      card.appendChild(media);

      // Text side
      var body = el('div', 'project-body');
      body.appendChild(el('h3', '', p.title));
      if (p.description) body.appendChild(el('p', '', p.description));

      if (p.technologies && p.technologies.length) {
        body.appendChild(el('h4', '', 'Technologies'));
        var chips = el('ul', 'chips');
        p.technologies.forEach(function (t) { chips.appendChild(el('li', '', t)); });
        body.appendChild(chips);
      }
      if (p.contribution) {
        body.appendChild(el('h4', '', 'My contribution'));
        body.appendChild(el('p', '', p.contribution));
      }
      if (p.links && p.links.length) {
        var links = el('div', 'project-links');
        p.links.forEach(function (l) {
          if (!l.url) return;
          var a = el('a', 'btn btn-secondary', l.label || 'Open');
          a.href = l.url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          links.appendChild(a);
        });
        if (links.children.length) body.appendChild(links);
      }
      card.appendChild(body);
      list.appendChild(card);
    });
  }

  /* ---------------------------------------------------------
     4. RENDER CERTIFICATIONS
     --------------------------------------------------------- */
  function renderCertifications() {
    var section = document.getElementById('certifications');
    var list = document.getElementById('cert-list');
    if (!CERTIFICATIONS.length) { hideSection(section); return; }

    CERTIFICATIONS.forEach(function (c) {
      var card = el('article', 'cert');

      var icon = el('div', 'cert-icon');
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M8.5 14.5 7 22l5-3 5 3-1.5-7.5"/></svg>';
      card.appendChild(icon);

      var text = el('div');
      text.appendChild(el('h3', '', c.name));
      var meta = [c.issuer, c.year].filter(Boolean).join(', ');
      if (meta) text.appendChild(el('p', '', meta));
      card.appendChild(text);

      if (c.link) {
        var a = el('a', '', 'View certificate');
        a.href = c.link;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        card.appendChild(a);
      }
      list.appendChild(card);
    });
  }

  // Hide a section and its menu link
  function hideSection(section) {
    if (!section) return;
    section.hidden = true;
    var link = document.querySelector('.nav-links a[href="#' + section.id + '"]');
    if (link && link.parentElement) link.parentElement.hidden = true;
  }

  /* ---------------------------------------------------------
     5. THEME TOGGLE (light / dark, remembered)
     --------------------------------------------------------- */
  function initTheme() {
    var root = document.documentElement;
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function updateLabel() {
      var dark = root.getAttribute('data-theme') === 'dark';
      btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    updateLabel();

    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      safeStorageSet('theme', next);
      updateLabel();
    });
  }

  /* ---------------------------------------------------------
     6. MOBILE MENU
     --------------------------------------------------------- */
  function initMenu() {
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    function setOpen(open) {
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setOpen(!links.classList.contains('open'));
    });
    // Close after choosing a link
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    // Close with the Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ---------------------------------------------------------
     7. ACTIVE LINK WHILE SCROLLING
     --------------------------------------------------------- */
  function initActiveLink() {
    var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'))
      .filter(function (s) { return !s.hidden; });
    var links = document.querySelectorAll('.nav-links a');
    if (!('IntersectionObserver' in window) || !sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------------------------------------------------------
     8. SCROLL REVEAL (fade in sections once)
     --------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (i) { i.classList.add('in'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach(function (i) { observer.observe(i); });
  }

  /* ---------------------------------------------------------
     9. PROFILE PHOTO (falls back to initials)
     --------------------------------------------------------- */
  function initAvatar() {
    var avatar = document.getElementById('avatar');
    if (!avatar) return;
    var img = avatar.querySelector('img');
    if (!img) return;
    img.addEventListener('load', function () { avatar.classList.add('has-photo'); });
    onImageFail(img, function () { avatar.classList.add('no-photo'); });
    if (img.complete && img.naturalWidth > 0) avatar.classList.add('has-photo');
  }

  /* ---------------------------------------------------------
     START
     --------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();
  renderProjects();
  renderCertifications();
  initTheme();
  initMenu();
  initAvatar();
  initActiveLink();
  initReveal();
})();
