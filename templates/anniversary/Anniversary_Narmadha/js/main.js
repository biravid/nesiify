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
    if (C.loveLetter.tamilVerse) {
      const stanzas = C.loveLetter.tamilVerse.trim().split(/\n\s*\n/);
      $('#letter-body').innerHTML = stanzas.map(s => `<p>${s.replace(/\n/g, '<br>')}</p>`).join('');
    } else if (C.loveLetter.paragraphs) {
      $('#letter-body').innerHTML = C.loveLetter.paragraphs.map(p => `<p>${p}</p>`).join('');
    }
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

    if (!btn || !gate) return;

    let unlocked = false;
    const unlockSurprise = () => {
      if (unlocked) return;
      unlocked = true;
      gate.classList.add('hidden');
      setTimeout(() => { gate.style.display = 'none'; }, 950);
      document.body.style.overflow = '';

      try {
        if (audio) {
          audio.volume = 0.5;
          audio.loop = true;
          audio.play().catch(() => {/* autoplay blocked; user can use audio control */});
        }
      } catch (e) {}

      try { startFloaties(); } catch (e) {}
      try { burstConfetti(); } catch (e) {}
      try { setTimeout(() => launchFireworks(2), 400); } catch (e) {}
    };

    btn.addEventListener('click', unlockSurprise);
    btn.addEventListener('touchstart', unlockSurprise, { passive: true });
    gate.addEventListener('click', (e) => {
      if (e.target === btn || btn.contains(e.target)) unlockSurprise();
    });

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
      if (audio.paused) audio.play().catch(() => { }); else audio.pause();
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
    const passModal = $('#letter-passcode-modal');
    const passForm = $('#passcode-form');
    const passInput = $('#passcode-input');
    const passError = $('#passcode-error');
    const passClose = $('#passcode-close');
    let isUnlocked = false;

    const openEnvelopeAnimation = () => {
      envelope.classList.add('open');
      setTimeout(() => modal.classList.add('show'), 550);
    };

    const triggerOpen = () => {
      if (isUnlocked) {
        openEnvelopeAnimation();
        return;
      }
      passInput.value = '';
      passError.textContent = '';
      passModal.classList.add('show');
      setTimeout(() => passInput.focus(), 100);
    };

    envelope.addEventListener('click', triggerOpen);
    envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); triggerOpen(); }
    });

    if (passForm) {
      passForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const entered = passInput.value.trim();
        const targetPasscode = (C.loveLetter && C.loveLetter.passcode) || "Letsgo@123";
        if (entered === targetPasscode) {
          isUnlocked = true;
          closePassModal();
          openEnvelopeAnimation();
          burstConfetti(0.55);
        } else {
          passError.textContent = "Wrong passcode! Try again ❤️";
          const card = $('.passcode-card');
          if (card) {
            card.classList.remove('shake');
            void card.offsetWidth;
            card.classList.add('shake');
          }
        }
      });
    }

    function closePassModal() {
      if (passModal) passModal.classList.remove('show');
    }

    if (passClose) passClose.addEventListener('click', closePassModal);
    if (passModal) passModal.addEventListener('click', (e) => { if (e.target === passModal) closePassModal(); });
    $('#letter-close').addEventListener('click', closeLetter);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeLetter(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePassModal();
        closeLetter();
      }
    });

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
  /* 9. Pixel-Perfect A4 Keepsake PDF Generator                         */
  /* ---------------------------------------------------------------- */

  function imageToDataUri(url) {
        return new Promise((resolve) => {
          if (!url) return resolve('');
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              canvas.width = img.naturalWidth || img.width;
              canvas.height = img.naturalHeight || img.height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              resolve(canvas.toDataURL('image/jpeg', 0.88));
            } catch (e) {
              resolve(url);
            }
          };
          img.onerror = () => resolve(url);
          img.src = url;
        });
      }

  function initPdfDownload() {
        const btn = $('#download-pdf-btn');
        const status = $('#pdf-status');
        if (!btn) return;

        btn.addEventListener('click', async () => {
          btn.disabled = true;
          status.textContent = 'Building your keepsake PDF... ✨';

          try {
            if (typeof html2pdf !== 'undefined') {
              status.textContent = 'Formatting high-res photos... 📸';
              const heroDataUri = await imageToDataUri(C.heroImage);
              const timelineData = await Promise.all(
                (C.timeline || []).map(async item => ({ ...item, dataUri: await imageToDataUri(item.image) }))
              );
              const galleryData = await Promise.all(
                (C.gallery || []).map(async item => ({ ...item, dataUri: await imageToDataUri(item.image) }))
              );
              const polaroidData = await Promise.all(
                (C.polaroids || []).map(async item => ({ ...item, dataUri: await imageToDataUri(item.image) }))
              );

              status.textContent = 'Creating printable pages... 📄';

              const pdfContainer = document.createElement('div');
              pdfContainer.style.width = '794px';
              pdfContainer.style.margin = '0 auto';
              pdfContainer.style.background = '#ffffff';
              pdfContainer.style.color = '#2c1a1d';
              pdfContainer.style.fontFamily = "'Noto Serif Tamil', 'Cormorant Garamond', Georgia, serif";

              let html = '';

              // ================= PAGE 1: COVER HERO =================
              html += `
            <div style="width: 794px; height: 1122px; position: relative; overflow: hidden; page-break-after: always; background: #1a0f18;">
              ${heroDataUri ? `<img src="${heroDataUri}" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />` : ''}
              <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(25, 12, 22, 0.95) 0%, rgba(25, 12, 22, 0.68) 42%, rgba(0, 0, 0, 0.15) 100%);"></div>
              
              <div style="position: absolute; bottom: 65px; left: 40px; right: 40px; text-align: center; color: #fdf6ee;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #f0d9c2; margin-bottom: 10px; font-family: 'Mulish', sans-serif;">HAPPY ANNIVERSARY</div>
                <h1 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 46px; margin: 0 0 12px; color: #ffffff; font-weight: 500;">
                  ${C.partnerOne} <span style="font-style: italic; color: #f0c68c;">&amp;</span> ${C.partnerTwo}
                </h1>
                <p style="font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 19px; color: #f4e9dd; margin: 0 0 6px; max-width: 560px; margin-left: auto; margin-right: auto;">
                  "${C.heroWish}"
                </p>
                <p style="font-size: 14px; color: #d8b26a; font-style: italic; margin-bottom: 35px;">
                  ${C.heroSubline}
                </p>

                <div style="display: flex; justify-content: center; gap: 45px; padding-top: 25px; border-top: 1px solid rgba(240, 198, 140, 0.35);">
                  <div>
                    <div style="font-family: 'Cormorant Garamond', serif; font-size: 34px; color: #ffffff; font-weight: 600;">${yearsTogether()}</div>
                    <div style="font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #f0d9c2; font-family: 'Mulish', sans-serif; margin-top: 4px;">YEARS TOGETHER</div>
                  </div>
                  <div>
                    <div style="font-family: 'Cormorant Garamond', serif; font-size: 34px; color: #ffffff; font-weight: 600;">${daysTogether().toLocaleString()}</div>
                    <div style="font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #f0d9c2; font-family: 'Mulish', sans-serif; margin-top: 4px;">DAYS &amp; COUNTING</div>
                  </div>
                  <div>
                    <div style="font-family: 'Cormorant Garamond', serif; font-size: 34px; color: #ffffff; font-weight: 600;">${daysUntilAnniversary()}</div>
                    <div style="font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #f0d9c2; font-family: 'Mulish', sans-serif; margin-top: 4px;">DAYS TO NEXT ANNIVERSARY</div>
                  </div>
                </div>
              </div>
            </div>
          `;

              // ================= TIMELINE PAGES =================
              for (let i = 0; i < timelineData.length; i += 2) {
                const isFirstTimelinePage = (i === 0);
                const items = timelineData.slice(i, i + 2);

                html += `
              <div style="width: 794px; height: 1122px; position: relative; overflow: hidden; page-break-after: always; background: #faf8f5; padding: 50px 45px; box-sizing: border-box;">
                ${isFirstTimelinePage ? `
                  <div style="text-align: center; margin-bottom: 35px;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; color: #c49a6c; margin-bottom: 6px; font-family: 'Mulish', sans-serif;">THE JOURNEY</div>
                    <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #2c1a1d; margin: 0 0 8px;">Every Chapter Of Us</h2>
                    <p style="font-size: 14px; color: #7a6b65; margin: 0;">From the first hello to right now &mdash; the moments that quietly became a lifetime.</p>
                  </div>
                ` : '<div style="height: 10px;"></div>'}

                <div style="position: relative; border-left: 2px solid #e3c4a8; margin-left: 20px; padding-left: 35px;">
                  ${items.map(item => `
                    <div style="position: relative; margin-bottom: 35px;">
                      <div style="position: absolute; left: -42px; top: 20px; width: 12px; height: 12px; border-radius: 50%; background: #c49a6c; border: 3px solid #faf8f5;"></div>

                      <div style="background: #fffdfa; border: 1px solid #ebdcd0; border-radius: 18px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.04);">
                        ${item.dataUri ? `<img src="${item.dataUri}" style="width: 100%; height: 280px; object-fit: cover; display: block;" />` : ''}
                        <div style="padding: 20px 22px;">
                          <div style="font-size: 13px; font-weight: bold; color: #d88a8a; margin-bottom: 4px;">${item.year}</div>
                          <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 20px; color: #2c1a1d; margin: 0 0 6px;">${item.title}</h3>
                          <p style="font-size: 13.5px; color: #665550; line-height: 1.6; margin: 0;">${item.text}</p>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
              }

              // ================= GALLERY PAGES =================
              const allPhotos = [...galleryData, ...polaroidData];
              if (allPhotos.length > 0) {
                for (let i = 0; i < allPhotos.length; i += 4) {
                  const photosBatch = allPhotos.slice(i, i + 4);
                  const isFirstGalleryPage = (i === 0);

                  html += `
                <div style="width: 794px; height: 1122px; position: relative; overflow: hidden; page-break-after: always; background: #faf8f5; padding: 50px 45px; box-sizing: border-box;">
                  ${isFirstGalleryPage ? `
                    <div style="text-align: center; margin-bottom: 35px;">
                      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; color: #c49a6c; margin-bottom: 6px; font-family: 'Mulish', sans-serif;">OUR MEMORIES</div>
                      <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #2c1a1d; margin: 0 0 8px;">Moments We Cherish</h2>
                      <p style="font-size: 14px; color: #7a6b65; margin: 0;">Little snapshots of our favorite adventures together.</p>
                    </div>
                  ` : '<div style="height: 10px;"></div>'}

                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                    ${photosBatch.map(p => `
                      <div style="background: #ffffff; padding: 14px; border-radius: 14px; border: 1px solid #ebdcd0; box-shadow: 0 4px 14px rgba(0,0,0,0.04); text-align: center;">
                        ${p.dataUri ? `<img src="${p.dataUri}" style="width: 100%; height: 210px; object-fit: cover; border-radius: 10px; margin-bottom: 10px;" />` : ''}
                        <p style="font-family: 'Cormorant Garamond', serif; font-size: 14px; color: #443338; margin: 0;">${p.caption}</p>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
                }
              }

              // ================= LOVE LETTER PAGE =================
              html += `
            <div style="width: 794px; height: 1122px; position: relative; overflow: hidden; page-break-after: always; background: #faf8f5; padding: 50px 45px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">
              <div style="width: 100%; background: #fffdfa; border: 1px solid #ebdcd0; border-radius: 20px; padding: 45px 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); position: relative;">
                
                <div style="width: 50px; height: 50px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #e08b8b, #b84c65); color: #fff; font-family: 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 4px 10px rgba(184,76,101,0.3);">
                  ${C.partnerOne.charAt(0)}${C.partnerTwo.charAt(0)}
                </div>

                <p style="font-family: 'Noto Serif Tamil', 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; color: #b84c65; margin: 0 0 20px;">
                  ${C.loveLetter.salutation}
                </p>

                <div style="font-family: 'Noto Serif Tamil', 'Cormorant Garamond', serif; font-size: 14.5px; line-height: 1.85; color: #2c1a1d;">
                  ${(C.loveLetter.tamilVerse || "").split(/\n\s*\n/).map(s => `<p style="margin-bottom: 16px;">${s.replace(/\n/g, '<br>')}</p>`).join('')}
                </div>

                <p style="text-align: right; font-family: 'Noto Serif Tamil', 'Cormorant Garamond', serif; font-style: italic; font-size: 18px; color: #b84c65; margin-top: 30px;">
                  ${C.loveLetter.signature},<br>
                  <strong style="font-style: normal; font-size: 20px;">${C.partnerOne}</strong>
                </p>
              </div>
            </div>
          `;

              // ================= GIFT BOX PAGE =================
              if (C.giftBox) {
                html += `
              <div style="width: 794px; height: 1122px; position: relative; overflow: hidden; background: #faf8f5; padding: 50px 45px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">
                <div style="text-align: center; max-width: 540px;">
                  <div style="font-size: 48px; margin-bottom: 15px;">🎁</div>
                  <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; color: #c49a6c; margin-bottom: 8px; font-family: 'Mulish', sans-serif;">ONE MORE THING</div>
                  <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 36px; color: #2c1a1d; margin: 0 0 20px;">${C.giftBox.title || 'Happy Anniversary'}</h2>
                  <p style="font-family: 'Cormorant Garamond', serif; font-size: 22px; font-style: italic; color: #b84c65; line-height: 1.6; margin: 0 0 40px;">
                    "${C.giftBox.message}"
                  </p>
                  <div style="font-size: 13px; color: #8a7a74; letter-spacing: 1px;">
                    Forever &amp; Always &bull; ${C.partnerOne} &amp; ${C.partnerTwo}
                  </div>
                </div>
              </div>
            `;
              }

              pdfContainer.innerHTML = html;

              const opt = {
                margin: 0,
                filename: `${C.partnerOne}_and_${C.partnerTwo}_Anniversary_Keepsake.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff', scrollY: 0, scrollX: 0 },
                jsPDF: { unit: 'px', format: [794, 1122], orientation: 'portrait' }
              };

              await html2pdf().set(opt).from(pdfContainer).save();
              status.textContent = 'Keepsake PDF downloaded successfully! 💖';
              burstConfetti(0.7);
            } else {
              status.textContent = 'Opening print window... Select "Save as PDF"';
              window.print();
            }
          } catch (err) {
            console.error('PDF generation error:', err);
            status.textContent = 'Failed to generate PDF. Please try again.';
          } finally {
            btn.disabled = false;
          }
        });
      }

  /* ---------------------------------------------------------------- */
  /* 10. PNG Memory Cards Carousel Generator                          */
  /* ---------------------------------------------------------------- */

  async function initCarouselGenerator() {
    const track = $('#carousel-track');
    const dotsContainer = $('#carousel-dots');
    const prevBtn = $('#carousel-prev');
    const nextBtn = $('#carousel-next');
    const downloadCurrentBtn = $('#download-current-slide');
    const downloadAllBtn = $('#download-all-slides');
    if (!track) return;

    try {
      const heroDataUri = await imageToDataUri(C.heroImage);
      const timelineData = await Promise.all(
        (C.timeline || []).map(async item => ({ ...item, dataUri: await imageToDataUri(item.image) }))
      );
      const galleryData = await Promise.all(
        (C.gallery || []).map(async item => ({ ...item, dataUri: await imageToDataUri(item.image) }))
      );
      const polaroidData = await Promise.all(
        (C.polaroids || []).map(async item => ({ ...item, dataUri: await imageToDataUri(item.image) }))
      );

      const offscreen = document.createElement('div');
      offscreen.style.position = 'absolute';
      offscreen.style.left = '-9999px';
      offscreen.style.top = '-9999px';
      offscreen.style.width = '1080px';
      offscreen.style.height = '1440px';
      document.body.appendChild(offscreen);

      const cardsHtml = [];

      // Card 1: Cover (1080x1440)
      cardsHtml.push(`
        <div class="png-card" style="width:1080px; height:1440px; box-sizing:border-box; padding:70px 60px; background:linear-gradient(155deg, #1f122a, #0e0614); color:#fdf6ee; font-family:'Noto Serif Tamil', 'Cormorant Garamond', Georgia, serif; text-align:center; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="font-size:16px; text-transform:uppercase; letter-spacing:4px; color:#e39a9a; margin-bottom:14px; font-family:'Mulish', sans-serif;">HAPPY ANNIVERSARY</div>
            <h1 style="font-size:62px; margin:0 0 16px; color:#ffffff; font-weight:500;">${C.partnerOne} <span style="font-style:italic; color:#d8b26a;">&amp;</span> ${C.partnerTwo}</h1>
            <p style="font-size:26px; font-style:italic; color:#f4e9dd; margin:0 0 20px; line-height:1.4;">"${C.heroWish}"</p>
          </div>

          ${heroDataUri ? `
            <div style="flex:1; display:flex; align-items:center; justify-content:center; margin:15px 0;">
              <img src="${heroDataUri}" style="max-width:100%; max-height:680px; object-fit:cover; border-radius:24px; border:4px solid #d8b26a; box-shadow:0 15px 40px rgba(0,0,0,0.5);" />
            </div>
          ` : ''}

          <div style="display:flex; justify-content:space-around; padding-top:25px; border-top:2px solid rgba(216,178,106,0.35);">
            <div><div style="font-size:42px; font-weight:bold; color:#fff;">${yearsTogether()}</div><div style="font-size:13px; color:#d8b26a; letter-spacing:2px; font-family:'Mulish', sans-serif; margin-top:4px;">YEARS TOGETHER</div></div>
            <div><div style="font-size:42px; font-weight:bold; color:#fff;">${daysTogether().toLocaleString()}</div><div style="font-size:13px; color:#d8b26a; letter-spacing:2px; font-family:'Mulish', sans-serif; margin-top:4px;">DAYS &amp; COUNTING</div></div>
            <div><div style="font-size:42px; font-weight:bold; color:#fff;">${daysUntilAnniversary()}</div><div style="font-size:13px; color:#d8b26a; letter-spacing:2px; font-family:'Mulish', sans-serif; margin-top:4px;">DAYS TO NEXT ANNIVERSARY</div></div>
          </div>
        </div>
      `);

      // Card 2..N: Timeline Entries (1080x1440)
      timelineData.forEach((item, index) => {
        cardsHtml.push(`
          <div class="png-card" style="width:1080px; height:1440px; box-sizing:border-box; padding:70px 60px; background:#fffdfa; color:#2c1a1d; font-family:'Noto Serif Tamil', 'Cormorant Garamond', Georgia, serif; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <span style="font-size:14px; text-transform:uppercase; letter-spacing:3px; color:#c49a6c; font-family:'Mulish', sans-serif;">CHAPTER ${index + 1}</span>
                <span style="font-size:18px; font-weight:bold; background:#e39a9a; color:#fff; padding:6px 18px; border-radius:20px;">${item.year}</span>
              </div>
              <h2 style="font-size:44px; color:#2c1a1d; margin:0 0 25px;">${item.title}</h2>
            </div>

            ${item.dataUri ? `
              <div style="flex:1; display:flex; align-items:center; justify-content:center; margin:10px 0 25px;">
                <img src="${item.dataUri}" style="width:100%; max-height:720px; object-fit:cover; border-radius:20px; border:2px solid #ebdcd0; box-shadow:0 10px 30px rgba(0,0,0,0.08);" />
              </div>
            ` : ''}

            <div style="padding-top:20px; border-top:1.5px solid #ebdcd0;">
              <p style="font-size:24px; color:#55444a; line-height:1.6; margin:0;">${item.text}</p>
            </div>
          </div>
        `);
      });

      // Gallery Cards (1080x1440)
      galleryData.forEach((item, index) => {
        cardsHtml.push(`
          <div class="png-card" style="width:1080px; height:1440px; box-sizing:border-box; padding:70px 60px; background:#fffdfa; color:#2c1a1d; font-family:'Noto Serif Tamil', 'Cormorant Garamond', Georgia, serif; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:14px; text-transform:uppercase; letter-spacing:3px; color:#c49a6c; margin-bottom:12px; font-family:'Mulish', sans-serif;">GALLERY MEMORY ${index + 1}</div>
              <h2 style="font-size:38px; color:#2c1a1d; margin:0 0 20px;">A Moment To Remember</h2>
            </div>

            ${item.dataUri ? `
              <div style="flex:1; display:flex; align-items:center; justify-content:center; margin:10px 0 20px;">
                <img src="${item.dataUri}" style="width:100%; max-height:800px; object-fit:cover; border-radius:20px; border:2px solid #ebdcd0; box-shadow:0 12px 35px rgba(0,0,0,0.08);" />
              </div>
            ` : ''}

            <div style="padding-top:20px; border-top:1.5px solid #ebdcd0; text-align:center;">
              <p style="font-size:26px; font-style:italic; color:#55444a; line-height:1.5; margin:0;">"${item.caption}"</p>
            </div>
          </div>
        `);
      });

      // Polaroid Cards (1080x1440)
      polaroidData.forEach((item, index) => {
        cardsHtml.push(`
          <div class="png-card" style="width:1080px; height:1440px; box-sizing:border-box; padding:70px 65px; background:linear-gradient(155deg, #1f122a, #0e0614); color:#fdf6ee; font-family:'Caveat', 'Cormorant Garamond', Georgia, serif; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; text-align:center;">
            <div>
              <div style="font-size:14px; text-transform:uppercase; letter-spacing:4px; color:#d8b26a; margin-bottom:8px; font-family:'Mulish', sans-serif;">PINNED TO MY HEART ${index + 1}</div>
              <h2 style="font-size:36px; font-family:'Cormorant Garamond', serif; color:#fff; margin:0;">Keepsake Snapshot</h2>
            </div>

            <div style="background:#fffdfa; padding:25px 25px 45px; border-radius:12px; box-shadow:0 15px 40px rgba(0,0,0,0.5); margin:20px 0; position:relative;">
              <div style="position:absolute; top:-15px; left:50%; transform:translateX(-50%); width:24px; height:24px; border-radius:50%; background:#d88a8a; border:3px solid #fff; box-shadow:0 4px 8px rgba(0,0,0,0.3);"></div>
              ${item.dataUri ? `<img src="${item.dataUri}" style="width:100%; height:740px; object-fit:cover; border-radius:6px; display:block; margin-bottom:25px;" />` : ''}
              <p style="font-family:'Caveat', cursive, serif; font-size:42px; color:#2c1a1d; margin:0; line-height:1.2;">${item.caption}</p>
            </div>

            <div>
              <p style="font-size:16px; color:#d8b26a; letter-spacing:2px; font-family:'Mulish', sans-serif; margin:0;">${C.partnerOne} &amp; ${C.partnerTwo} &bull; Anniversary Keepsake</p>
            </div>
          </div>
        `);
      });

      // Card Love Letter with Tamil Verse (1080x1440)
      cardsHtml.push(`
        <div class="png-card" style="width:1080px; height:1440px; box-sizing:border-box; padding:70px 65px; background:#fffdf9; color:#2c1a1d; font-family:'Noto Serif Tamil', 'Cormorant Garamond', Georgia, serif; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; border:4px solid #e2bc74;">
          <div>
            <div style="width:65px; height:65px; border-radius:50%; background:radial-gradient(circle at 35% 30%, #e08b8b, #b84c65); color:#fff; font-size:26px; font-style:italic; display:flex; align-items:center; justify-content:center; margin:0 auto 20px; box-shadow:0 6px 15px rgba(184,76,101,0.3);">${C.partnerOne.charAt(0)}${C.partnerTwo.charAt(0)}</div>
            <h2 style="font-size:32px; color:#b84c65; margin:0 0 20px; text-align:center;">${C.loveLetter.salutation}</h2>
          </div>

          <div style="font-size:19px; line-height:1.85; color:#2c1a1d; flex:1; display:flex; flex-direction:column; justify-content:center;">
            ${(C.loveLetter.tamilVerse || "").split(/\n\s*\n/).map(s => `<p style="margin-bottom:16px;">${s.replace(/\n/g, '<br>')}</p>`).join('')}
          </div>

          <div style="text-align:right; padding-top:20px; border-top:1px dashed #e2bc74;">
            <p style="font-style:italic; font-size:26px; color:#b84c65; margin:0;">
              ${C.loveLetter.signature},<br><strong style="font-size:30px; font-style:normal;">${C.partnerOne}</strong>
            </p>
          </div>
        </div>
      `);

      // Card Gift Message (1080x1440)
      if (C.giftBox) {
        cardsHtml.push(`
          <div class="png-card" style="width:1080px; height:1440px; box-sizing:border-box; padding:80px 65px; background:linear-gradient(155deg, #1f122a, #0e0614); color:#fdf6ee; font-family:'Noto Serif Tamil', 'Cormorant Garamond', Georgia, serif; text-align:center; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:72px; margin-bottom:20px;">🎁</div>
              <div style="font-size:16px; text-transform:uppercase; letter-spacing:4px; color:#d8b26a; margin-bottom:12px; font-family:'Mulish', sans-serif;">ONE MORE THING</div>
              <h2 style="font-size:46px; color:#fff; margin:0 0 25px;">${C.giftBox.title || 'Happy Anniversary'}</h2>
            </div>

            <div style="flex:1; display:flex; align-items:center; justify-content:center;">
              <p style="font-size:34px; font-style:italic; color:#e39a9a; line-height:1.6; margin:0; max-width:860px;">"${C.giftBox.message}"</p>
            </div>

            <div style="padding-top:30px; border-top:1px solid rgba(216,178,106,0.35);">
              <p style="font-size:18px; color:#d8b26a; margin:0; letter-spacing:2px; font-family:'Mulish', sans-serif;">Forever &amp; Always &bull; ${C.partnerOne} &amp; ${C.partnerTwo}</p>
            </div>
          </div>
        `);
      }

      const slidePngs = [];
      for (let i = 0; i < cardsHtml.length; i++) {
        offscreen.innerHTML = cardsHtml[i];
        const cardElem = offscreen.firstElementChild;
        if (typeof html2canvas !== 'undefined') {
          const canvas = await html2canvas(cardElem, {
            width: 1080,
            height: 1440,
            scale: 1,
            useCORS: true,
            backgroundColor: null
          });
          slidePngs.push(canvas.toDataURL('image/png'));
        }
      }
      document.body.removeChild(offscreen);

      if (slidePngs.length === 0) return;

      track.innerHTML = slidePngs.map((png, idx) => `
        <div class="carousel-slide" data-slide-index="${idx}">
          <img src="${png}" alt="Memory Card ${idx + 1}" />
        </div>
      `).join('');

      dotsContainer.innerHTML = slidePngs.map((_, idx) => `
        <button class="carousel-dot ${idx === 0 ? 'active' : ''}" data-dot-index="${idx}" aria-label="Go to slide ${idx + 1}"></button>
      `).join('');

      let currentIndex = 0;
      const slides = Array.from(track.children);
      const dots = Array.from(dotsContainer.children);

      function updateSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }

      if (prevBtn) prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
      if (nextBtn) nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));

      dots.forEach((dot) => {
        dot.addEventListener('click', () => {
          const idx = parseInt(dot.getAttribute('data-dot-index'), 10);
          updateSlide(idx);
        });
      });

      let startX = 0;
      let isDragging = false;
      const viewport = $('#carousel-viewport');

      if (viewport) {
        viewport.addEventListener('touchstart', (e) => {
          startX = e.touches[0].clientX;
          isDragging = true;
        }, { passive: true });

        viewport.addEventListener('touchend', (e) => {
          if (!isDragging) return;
          isDragging = false;
          const endX = e.changedTouches[0].clientX;
          const diffX = startX - endX;
          if (Math.abs(diffX) > 40) {
            if (diffX > 0) updateSlide(currentIndex + 1);
            else updateSlide(currentIndex - 1);
          }
        }, { passive: true });
      }

      function triggerDownload(dataUrl, fileName) {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      if (downloadCurrentBtn) {
        downloadCurrentBtn.addEventListener('click', () => {
          const png = slidePngs[currentIndex];
          if (png) {
            triggerDownload(png, `${C.partnerOne}_and_${C.partnerTwo}_Card_${currentIndex + 1}.png`);
            burstConfetti(0.7);
          }
        });
      }

      if (downloadAllBtn) {
        downloadAllBtn.addEventListener('click', () => {
          slidePngs.forEach((png, idx) => {
            setTimeout(() => {
              triggerDownload(png, `${C.partnerOne}_and_${C.partnerTwo}_Card_${idx + 1}.png`);
            }, idx * 350);
          });
          burstConfetti(0.8);
        });
      }

    } catch (err) {
      console.error('Carousel generator error:', err);
    }
  }

  /* ---------------------------------------------------------------- */
  /* Init                                                               */
  /* ---------------------------------------------------------------- */

  function runInit() {
    const steps = [populate, initTheme, initEntry, initAudioControl, initReveal, initLetter, initGift, initPdfDownload, initCarouselGenerator];
    steps.forEach((step) => {
      try {
        step();
      } catch (err) {
        console.error(`[anniversary-site] "${step.name}" failed:`, err);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInit);
  } else {
    runInit();
  }
})();
