/* =========================================================
   Soft# — Etkileşim Katmanı
   Navbar, mobile menu, scroll-spy, reveal, modal, back-to-top
   ========================================================= */

(() => {
  'use strict';

  /* ---------- Navbar: scroll'da gölge ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 8) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Back-to-top butonu
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

  // Linke tıklayınca menüyü kapat
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });

  /* ---------- Scroll-spy: aktif bölüm ---------- */
  const sections = ['hero', 'about', 'services', 'projects', 'why', 'contact']
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
    '.section-head, .card, .project-card, .why-item, .about-purpose, .hero-content, .contact-card, .contact-text'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // hafif kademeli görünüm
        setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Back to top ---------- */
  const toTop = document.getElementById('toTop');
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Project Modal ---------- */
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');

  const projectData = {
    erp: {
      tag: 'ERP',
      title: 'Üretim ERP Paneli',
      intro: 'Orta ölçekli bir üretim firması için sıfırdan tasarladığımız, stok, satınalma, maliyet ve müşteri modüllerini tek panelden yöneten bütünleşik ERP çözümü.',
      story: 'Firma yıllardır birbirinden kopuk Excel dosyaları ve eski bir muhasebe programıyla çalışıyordu. Aynı stoğu üç farklı yerde takip ediyor, sipariş geldiğinde kim ne yapacak bilemiyordu. Tüm süreci masaya yatırdık; üretim akışından raporlamaya kadar her şeyi tek bir panelde topladık.',
      features: [
        'Çoklu depo stok takibi, otomatik kritik seviye uyarıları',
        'Satınalma talep → onay → tedarikçi akışı',
        'Üretim emri ve maliyet hesaplama modülü',
        'Müşteri kart sistemi, sipariş geçmişi ve teklif yönetimi',
        'Rol bazlı yetkilendirme — her kullanıcı yalnız kendi modülünü görür',
        'Detaylı satış, gelir ve maliyet raporları'
      ],
      tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker']
    },
    pos: {
      tag: 'POS',
      title: 'Hızlı POS Kasa',
      intro: 'Dokunmatik ekrana göre optimize edilmiş, internet kesintilerinde bile sorunsuz çalışan, hızlı ve sade bir kasa yazılımı.',
      story: 'Müşterimizin asıl şikâyeti hızdı: yoğun saatlerde kasa donuyor, müşteri kuyrukta bekliyordu. Ekranı sıfırdan tasarladık, en sık kullanılan işlemleri tek dokunuşa indirdik. İnternet kesilince çevrimdışı moda otomatik geçen, bağlantı geldiğinde sessizce senkronize olan bir yapı kurduk.',
      features: [
        'Tam çevrimdışı çalışabilme — kesintilerde satış durmaz',
        'Barkod okuyucu, terazi ve fiş yazıcı entegrasyonu',
        'Hızlı ürün arama (ilk üç harf → öneri)',
        'Vardiya açılış/kapanış raporları',
        'Stok ve muhasebe entegrasyonu',
        'Touch-optimized arayüz — yanlış dokunmayı azaltır'
      ],
      tech: ['Electron', 'Vue', 'SQLite', 'IndexedDB']
    },
    resto: {
      tag: 'Restoran',
      title: 'Restoran Adisyon & Mutfak',
      intro: 'Masa takibi, garson tabletleri ve mutfak ekranlarıyla entegre çalışan, küçük zincirlere kadar ölçeklenebilen restoran yönetim sistemi.',
      story: 'İlk müşterimiz tek şubeli bir restorandı; üç ay sonra üçüncü şubelerini açtılar. Sistemi başından çok kiracılı tasarladığımız için yeni şube açmak yalnızca ekleme işlemiydi. Garson tabletinden alınan sipariş anında mutfak ekranında beliriyor, hazırlanma süresi otomatik tutuluyor.',
      features: [
        'Masa, bölge ve katlı oturma düzeni yönetimi',
        'Garson tablet uygulaması (Android/iOS)',
        'Mutfak ekranı — sıra ve hazırlanma süresi takibi',
        'Adisyon birleştirme/bölme, ikram ve iskonto',
        'Çoklu şube desteği — merkezi raporlama',
        'WhatsApp üzerinden günlük rapor gönderimi'
      ],
      tech: ['React Native', 'Node.js', 'WebSocket', 'PostgreSQL']
    },
    stok: {
      tag: 'Stok',
      title: 'Gerçek Zamanlı Stok Takibi',
      intro: 'Birden fazla depo ve şube arasında stok hareketlerini gerçek zamanlı izleyen, barkod desteğiyle hata payını sıfıra yaklaştıran sistem.',
      story: 'Müşterimizin en büyük problemi "gerçekten ne kadar stoğum var?" sorusuydu. Manuel sayımlar her zaman üç-beş kalem hatalı çıkıyordu. Sisteme her hareketi anında işleyen ve depoları birbirine bağlayan bir omurga koyduk. Düşük stok uyarıları otomatik tedarikçi siparişine dönüşüyor.',
      features: [
        'Çoklu depo / şube arası transfer takibi',
        'Barkod ve QR ile hızlı giriş-çıkış',
        'Düşük stok uyarıları (e-posta + uygulama içi)',
        'Tedarikçi yönetimi ve sipariş geçmişi',
        'Detaylı raporlar: yaşlanmış stok, dönem hareketleri, en çok satanlar',
        'Muhasebe yazılımı entegrasyonu'
      ],
      tech: ['Next.js', 'Prisma', 'PostgreSQL', 'TypeScript']
    },
    web: {
      tag: 'Web',
      title: 'Kurumsal Web Sitesi',
      intro: 'Üretim sektöründe faaliyet gösteren bir firma için sıfırdan tasarlanan, çoklu dil destekli ve içerik yönetim paneli olan modern kurumsal web sitesi.',
      story: 'Firmanın eski sitesi mobil uyumsuz, yavaş ve içerik güncelleme için her seferinde geliştiriciye bağımlıydı. Sıfırdan, performans öncelikli bir mimari kurduk. Pazarlama ekibi artık panelden ürün, referans ve kampanya içeriklerini kendisi güncelliyor; site bir saniyenin altında yükleniyor.',
      features: [
        'Mobile-first responsive tasarım, %100 mobil uyumluluk',
        'Lighthouse performans skoru 95+ — ilk yüklenme 1 sn altı',
        'İçerik yönetim paneli (CMS) — geliştiriciye bağımlılığı bitirir',
        'Çoklu dil desteği (TR/EN) ve SEO-uyumlu URL yapısı',
        'İletişim formu, harita ve sosyal medya entegrasyonları',
        'Google Analytics ve Search Console hazır kurulumu'
      ],
      tech: ['Next.js', 'TailwindCSS', 'TypeScript', 'Headless CMS']
    }
  };

  const openModal = (key) => {
    const p = projectData[key];
    if (!p) return;

    modalBody.innerHTML = `
      <span class="modal-tag">${p.tag}</span>
      <h3>${p.title}</h3>
      <p><strong>${p.intro}</strong></p>
      <p>${p.story}</p>
      <h4>Özellikler</h4>
      <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
      <h4>Kullanılan Teknolojiler</h4>
      <div class="modal-tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
    `;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Eğer link veya buton içinden tıklandıysa yine modalı aç
      const key = card.dataset.project;
      openModal(key);
    });
  });

  modal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  /* ---------- Event bindings ---------- */
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
