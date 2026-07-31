/* ==========================================================================
   main.js — site logic. Reads everything from SITE_CONFIG (js/config.js).
   No values are hard-coded here; edit config.js instead.
   ========================================================================== */

(() => {
  const C = window.SITE_CONFIG;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------------------------------------------------------------- */
  /* 1. Populate content from config                                   */
  /* ---------------------------------------------------------------- */

  function daysTogether() {
    const start = new Date(C.togetherSince);
    const now = new Date();
    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }

  function daysUntilAnniversary() {
    const target = new Date(C.anniversaryDate);
    const now = new Date();
    let next = new Date(now.getFullYear(), target.getMonth(), target.getDate());
    if (next < now) next = new Date(now.getFullYear() + 1, target.getMonth(), target.getDate());
    return Math.ceil((next - now) / (1000 * 60 * 60 * 24));
  }

  function yearsTogether() {
    const start = new Date(C.togetherSince);
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    const anniv = new Date(now.getFullYear(), start.getMonth(), start.getDate());
    if (now < anniv) years -= 1;
    return Math.max(years, 0);
  }

  function populate() {
    document.title = `${C.partnerOne} & ${C.partnerTwo} — Happy Anniversary`;

    $('#entry-title').textContent = C.entryTitle;
    $('#entry-btn').textContent = C.entryButtonLabel;

    $('#brand-name').innerHTML = `${C.partnerOne} <span>&</span> ${C.partnerTwo}`;

    $('#hero-img').src = C.heroImage;
    $('#hero-img').alt = `${C.partnerOne} and ${C.partnerTwo}`;
    $('#hero-names').innerHTML = `${C.partnerOne} <span class="amp">&amp;</span> ${C.partnerTwo}`;
    $('#hero-wish').textContent = C.heroWish;
    $('#hero-subline').textContent = C.heroSubline;
    $('#stat-years').textContent = yearsTogether();
    $('#stat-days').textContent = daysTogether().toLocaleString();
    $('#stat-countdown').textContent = daysUntilAnniversary();

    const audio = $('#bg-audio');
    audio.src = C.audioSrc;
    $('#audio-title').textContent = C.audioTitle;

    // Timeline
    const tlWrap = $('#timeline-list');
    tlWrap.innerHTML = C.timeline.map((item) => `
      <div class="tl-item reveal">
        <div class="tl-card">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <div class="tl-year">${item.year}</div>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
        <div class="tl-dot"></div>
        <div class="tl-spacer"></div>
      </div>
    `).join('');

    // Gallery
    const galWrap = $('#gallery-grid');
    galWrap.innerHTML = C.gallery.map((g) => `
      <figure class="gallery-item reveal">
        <img src="${g.image}" alt="${g.caption}" loading="lazy">
        <figcaption class="gallery-cap">${g.caption}</figcaption>
      </figure>
    `).join('');

    // Polaroids
    const polWrap = $('#polaroid-strip');
    polWrap.innerHTML = C.polaroids.map((p) => `
      <figure class="polaroid reveal" style="--r:${p.rotate}deg">
        <span class="pin"></span>
        <img src="${p.image}" alt="${p.caption}" loading="lazy">
        <figcaption>${p.caption}</figcaption>
      </figure>
    `).join('');

    // Wax seal monogram
    $('#wax-seal').textContent = `${C.partnerOne.charAt(0)}${C.partnerTwo.charAt(0)}`;

    // Love letter
    $('#letter-salutation').textContent = C.loveLetter.salutation;
    $('#letter-body').innerHTML = C.loveLetter.paragraphs.map(p => `<p>${p}</p>`).join('');
    $('#letter-signature').textContent = `${C.loveLetter.signature},`;
    $('#letter-signature-name').textContent = C.partnerOne;

    // Gift box
    $('#gift-title').textContent = C.giftBox.title;
    $('#gift-message').textContent = C.giftBox.message;

    // Note form
    $('#note-textarea').placeholder = C.notePlaceholder;
    $('#note-submit').textContent = C.noteButtonLabel;

    // Footer
    $('#footer-names').textContent = `${C.partnerOne} & ${C.partnerTwo}`;
    $('#footer-year').textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------------- */
  /* 2. Theme toggle                                                   */
  /* ---------------------------------------------------------------- */

  function initTheme() {
    const root = document.documentElement;
    const saved = localStorage.getItem('anniv-theme') || C.defaultTheme || 'dark';
    setTheme(saved);

    $('#theme-toggle').addEventListener('click', () => {
      const isLight = root.classList.contains('theme-light');
      setTheme(isLight ? 'dark' : 'light');
    });

    function setTheme(mode) {
      root.classList.toggle('theme-light', mode === 'light');
      root.classList.toggle('theme-dark', mode !== 'light');
      localStorage.setItem('anniv-theme', mode);
      const icon = $('#theme-toggle');
      icon.setAttribute('aria-label', mode === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
      icon.innerHTML = mode === 'light' ? ICONS.moon : ICONS.sun;
    }
  }

  const ICONS = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>'
  };

  /* ---------------------------------------------------------------- */
  /* 3. Entry gate + audio                                             */
  /* ---------------------------------------------------------------- */

  function initEntry() {
    const gate = $('#entry-gate');
    const btn = $('#entry-btn');
    const audio = $('#bg-audio');

    btn.addEventListener('click', () => {
      gate.classList.add('hidden');
      audio.volume = 0.5;
      audio.loop = true;
      audio.play().catch(() => {/* autoplay blocked; user can use the audio control */});
      startFloaties();
      burstConfetti();
      setTimeout(() => launchFireworks(2), 400);
      document.body.style.overflow = '';
    }, { once: true });

    document.body.style.overflow = 'hidden';
  }

  function initAudioControl() {
    const audio = $('#bg-audio');
    const btn = $('#audio-toggle');
    const update = () => {
      btn.innerHTML = audio.paused ? ICONS_AUDIO.muted : ICONS_AUDIO.playing;
      btn.setAttribute('aria-label', audio.paused ? 'Play music' : 'Pause music');
    };
    btn.addEventListener('click', () => {
      if (audio.paused) audio.play().catch(() => {}); else audio.pause();
      update();
    });
    audio.addEventListener('play', update);
    audio.addEventListener('pause', update);
    update();
  }

  const ICONS_AUDIO = {
    playing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5v14M15 5v14"/></svg>',
    muted: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 5v14l11-7z"/></svg>'
  };

  /* ---------------------------------------------------------------- */
  /* 4. Floating hearts & balloons                                     */
  /* ---------------------------------------------------------------- */

  const HEART_SVG = '<svg viewBox="0 0 32 29"><path d="M16 29S0 18.5 0 8.9 8.6 0 16 8.1C23.4 0 32 -0.3 32 8.9 32 18.5 16 29 16 29z"/></svg>';
  const BALLOON_SVG = '<svg viewBox="0 0 40 60"><ellipse cx="20" cy="22" rx="18" ry="22" /><path d="M20 44 L20 60" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M17 44 Q20 48 23 44" fill="currentColor"/></svg>';

  let floatieInterval;
  function startFloaties() {
    const layer = $('#float-layer');
    const colors = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)'];
    function spawn() {
      const el = document.createElement('div');
      const isHeart = Math.random() > 0.4;
      el.className = `floatie ${isHeart ? 'heart' : 'balloon'}`;
      const size = isHeart ? 16 + Math.random() * 20 : 26 + Math.random() * 24;
      el.style.left = `${Math.random() * 100}vw`;
      el.style.width = `${size}px`;
      el.style.height = `${size * (isHeart ? 0.9 : 1.5)}px`;
      el.style.color = colors[Math.floor(Math.random() * colors.length)];
      el.style.animationDuration = `${9 + Math.random() * 8}s`;
      el.innerHTML = isHeart ? HEART_SVG : BALLOON_SVG;
      el.querySelector('svg').style.fill = 'currentColor';
      layer.appendChild(el);
      setTimeout(() => el.remove(), 18000);
    }
    for (let i = 0; i < 5; i++) setTimeout(spawn, i * 500);
    floatieInterval = setInterval(spawn, 1800);
  }

  /* ---------------------------------------------------------------- */
  /* 5. Confetti & fireworks (canvas-confetti, loaded via CDN)         */
  /* ---------------------------------------------------------------- */

  let confettiFn = null;
  function getConfetti() {
    if (confettiFn) return confettiFn;
    if (typeof confetti === 'undefined') return null;
    const canvas = $('#confetti-canvas');
    confettiFn = canvas && confetti.create
      ? confetti.create(canvas, { resize: true, useWorker: true })
      : confetti;
    return confettiFn;
  }

  function burstConfetti(originY = 0.6) {
    const fn = getConfetti();
    if (!fn) return;
    fn({
      particleCount: 140,
      spread: 90,
      startVelocity: 45,
      origin: { y: originY },
      colors: ['#e39a9a', '#d8b26a', '#9c7bc2', '#ffffff']
    });
  }

  function launchFireworks(rounds = 3) {
    const fn = getConfetti();
    if (!fn) return;
    let count = 0;
    const timer = setInterval(() => {
      fn({
        particleCount: 60,
        angle: 60 + Math.random() * 60,
        spread: 55,
        startVelocity: 55,
        origin: { x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.3 + 0.05 },
        colors: ['#e39a9a', '#d8b26a', '#9c7bc2', '#ffffff']
      });
      count++;
      if (count >= rounds) clearInterval(timer);
    }, 550);
  }

  /* ---------------------------------------------------------------- */
  /* 6. Scroll reveal                                                  */
  /* ---------------------------------------------------------------- */

  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    $$('.reveal').forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------------- */
  /* 7. Love letter envelope                                           */
  /* ---------------------------------------------------------------- */

  function initLetter() {
    const envelope = $('#envelope');
    const modal = $('#letter-modal');
    const openLetter = () => {
      envelope.classList.add('open');
      setTimeout(() => modal.classList.add('show'), 550);
    };
    envelope.addEventListener('click', openLetter);
    envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLetter(); }
    });
    $('#letter-close').addEventListener('click', closeLetter);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeLetter(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLetter(); });

    function closeLetter() {
      modal.classList.remove('show');
      setTimeout(() => envelope.classList.remove('open'), 300);
    }
  }

  /* ---------------------------------------------------------------- */
  /* 8. Gift box                                                       */
  /* ---------------------------------------------------------------- */

  function initGift() {
    const gift = $('#gift');
    const msg = $('#gift-message');
    const openGift = () => {
      if (gift.classList.contains('opened')) return;
      gift.classList.add('opened');
      burstConfetti(0.75);
      setTimeout(() => launchFireworks(2), 250);
      setTimeout(() => msg.classList.add('show'), 400);
    };
    gift.addEventListener('click', openGift);
    gift.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGift(); }
    });
  }

  /* ---------------------------------------------------------------- */
  /* 9. Final note -> emailed via FormSubmit (free, no backend)        */
  /* ---------------------------------------------------------------- */

  function initNoteForm() {
    const form = $('#note-form');
    const status = $('#note-status');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = $('#note-name').value.trim();
      const message = $('#note-textarea').value.trim();
      if (!message) {
        status.textContent = 'Write a little something first \u2764';
        return;
      }

      const submitBtn = $('#note-submit');
      submitBtn.disabled = true;
      status.textContent = 'Sending\u2026';

      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(C.recipientEmail)}`;
      const payload = {
        _subject: C.noteSubject,
        name: name || 'Someone who loves you',
        message
      };

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Request failed');
        status.textContent = C.noteSuccessMessage;
        burstConfetti(0.8);
        form.reset();
      } catch (err) {
        status.innerHTML = `Couldn't send automatically. <a href="mailto:${C.recipientEmail}?subject=${encodeURIComponent(C.noteSubject)}&body=${encodeURIComponent(message)}">Send by email instead</a>`;
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  /* ---------------------------------------------------------------- */
  /* Init                                                               */
  /* ---------------------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', () => {
    populate();
    initTheme();
    initEntry();
    initAudioControl();
    initReveal();
    initLetter();
    initGift();
    initNoteForm();
  });
})();
