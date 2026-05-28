/* =========================================================
   Soft# — Etkileşim Katmanı
   Navbar, mobile menu, scroll-spy, reveal, back-to-top
   ========================================================= */

(() => {
  'use strict';

  const navbar = document.getElementById('navbar');
  const toTop = document.getElementById('toTop');

  /* ---------- Navbar scroll davranışı + back-to-top ---------- */
  const onScroll = () => {
    if (window.scrollY > 8) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    if (window.scrollY > 600) toTop.classList.add('show');
    else toTop.classList.remove('show');
  };

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  const closeMenu = () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Menüdeki linke tıklayınca menüyü kapat (mobilde)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });

  /* ---------- Scroll-spy: aktif bölüm vurgusu ---------- */
  const sections = ['hero', 'about', 'services', 'why', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinkMap = new Map();
  document.querySelectorAll('.nav-link').forEach(link => {
    const sec = link.dataset.section;
    if (sec) navLinkMap.set(sec, link);
  });

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkMap.forEach(l => l.classList.remove('is-active'));
        const link = navLinkMap.get(entry.target.id);
        if (link) link.classList.add('is-active');
      }
    });
  }, {
    rootMargin: '-45% 0px -50% 0px',
    threshold: 0
  });

  sections.forEach(s => spyObserver.observe(s));

  /* ---------- Reveal animasyonu ---------- */
  const revealTargets = document.querySelectorAll(
    '.section-head, .card, .why-item, .about-purpose, .hero-content, .contact-card, .contact-text'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Back to top ---------- */
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Event bindings ---------- */
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
