/**
 * Main Entry Point: Dynamic Content Binding & UI Synchronization
 */

document.addEventListener('DOMContentLoaded', () => {
  // Hydrate Scene 1: Mysterious Opening
  const mysteryTitle = document.getElementById('mystery-title');
  const mysterySubtitle = document.getElementById('mystery-subtitle');
  const btnPromise = document.getElementById('btn-curiosity-promise');

  if (mysteryTitle) mysteryTitle.textContent = RAKSHA_CONFIG.mysteryOpening.title;
  if (mysterySubtitle) mysterySubtitle.textContent = RAKSHA_CONFIG.mysteryOpening.subtitle;
  if (btnPromise) btnPromise.textContent = RAKSHA_CONFIG.mysteryOpening.buttonText;

  // Hydrate Scene 2: Guess Quiz
  const guessHeading = document.getElementById('guess-heading');
  const quizHintsGrid = document.getElementById('quiz-hints-grid');
  const quizOptionsContainer = document.getElementById('quiz-options-container');

  if (guessHeading) guessHeading.textContent = RAKSHA_CONFIG.guessQuiz.heading;
  if (quizHintsGrid && RAKSHA_CONFIG.guessQuiz.hints) {
    quizHintsGrid.innerHTML = RAKSHA_CONFIG.guessQuiz.hints.map(h => `
      <div class="quiz-hint-card">
        <div style="font-size:2rem; margin-bottom:8px">${h.icon}</div>
        <div>${h.text}</div>
      </div>
    `).join('');
  }
  if (quizOptionsContainer && RAKSHA_CONFIG.guessQuiz.options) {
    quizOptionsContainer.innerHTML = RAKSHA_CONFIG.guessQuiz.options.map(opt => `
      <button class="option-btn">${opt}</button>
    `).join('');
  }

  // Hydrate Scene 3: Childhood Unblur
  const childhoodHeading = document.getElementById('childhood-heading');
  const childhoodSubtitle = document.getElementById('childhood-subtitle');
  const btnUnblur = document.getElementById('btn-unblur-memory');
  const unblurImg = document.getElementById('unblur-img');

  if (childhoodHeading) childhoodHeading.textContent = RAKSHA_CONFIG.childhoodUnblur.heading;
  if (childhoodSubtitle) childhoodSubtitle.textContent = RAKSHA_CONFIG.childhoodUnblur.subtitle;
  if (btnUnblur) btnUnblur.textContent = RAKSHA_CONFIG.childhoodUnblur.buttonText;
  if (unblurImg && RAKSHA_CONFIG.childhoodUnblur.memories[0]) {
    unblurImg.src = RAKSHA_CONFIG.childhoodUnblur.memories[0].img;
  }

  // Hydrate Scene 4: Sister Reveal
  const sisterHeading = document.getElementById('sister-heading');
  const sisterSubheading = document.getElementById('sister-subheading');
  const sisterPhoto = document.getElementById('sister-photo');
  const sisterMessage = document.getElementById('sister-message');

  if (sisterHeading) sisterHeading.textContent = RAKSHA_CONFIG.sisterReveal.heading;
  if (sisterSubheading) sisterSubheading.textContent = RAKSHA_CONFIG.sisterReveal.subheading;
  if (sisterPhoto) sisterPhoto.src = RAKSHA_CONFIG.sisterReveal.photo;
  if (sisterMessage) sisterMessage.textContent = RAKSHA_CONFIG.sisterReveal.message;

  // Hydrate Scene 5: Interactive Thali Ritual
  const thaliHeading = document.getElementById('thali-heading');
  const thaliInstruction = document.getElementById('thali-instruction');
  const thaliInventory = document.getElementById('thali-inventory');

  if (thaliHeading) thaliHeading.textContent = RAKSHA_CONFIG.thaliRitual.heading;
  if (thaliInstruction) thaliInstruction.textContent = RAKSHA_CONFIG.thaliRitual.instruction;
  if (thaliInventory && RAKSHA_CONFIG.thaliRitual.items) {
    thaliInventory.innerHTML = RAKSHA_CONFIG.thaliRitual.items.map(item => `
      <button class="thali-item-btn" data-id="${item.id}">
        <span style="font-size:1.8rem">${item.icon}</span>
        <span>${item.name}</span>
      </button>
    `).join('');
  }

  // Hydrate Scene 6 & 7: Tilak & Sweet Rituals
  const tilakTitle = document.getElementById('tilak-title');
  const tilakSubtitle = document.getElementById('tilak-subtitle');
  const btnTilak = document.getElementById('btn-apply-tilak');

  const sweetTitle = document.getElementById('sweet-title');
  const sweetSubtitle = document.getElementById('sweet-subtitle');
  const btnSweet = document.getElementById('btn-feed-sweet');

  if (tilakTitle) tilakTitle.textContent = RAKSHA_CONFIG.tilakRitual.title;
  if (tilakSubtitle) tilakSubtitle.textContent = RAKSHA_CONFIG.tilakRitual.subtitle;
  if (btnTilak) btnTilak.textContent = RAKSHA_CONFIG.tilakRitual.btnText;

  if (sweetTitle) sweetTitle.textContent = RAKSHA_CONFIG.sweetRitual.title;
  if (sweetSubtitle) sweetSubtitle.textContent = RAKSHA_CONFIG.sweetRitual.subtitle;
  if (btnSweet) btnSweet.textContent = RAKSHA_CONFIG.sweetRitual.btnText;

  // Hydrate Scene 8: Rakhi Climax
  const rakhiTitle = document.getElementById('rakhi-title');
  const rakhiSubtitle = document.getElementById('rakhi-subtitle');
  const btnTie = document.getElementById('btn-tie-rakhi');
  const climaxQuote = document.getElementById('rakhi-climax-quote');
  const blessingGrid = document.getElementById('blessing-bubbles-grid');

  if (rakhiTitle) rakhiTitle.textContent = RAKSHA_CONFIG.rakhiRitual.title;
  if (rakhiSubtitle) rakhiSubtitle.textContent = RAKSHA_CONFIG.rakhiRitual.subtitle;
  if (btnTie) btnTie.textContent = RAKSHA_CONFIG.rakhiRitual.btnText;
  if (climaxQuote) climaxQuote.textContent = RAKSHA_CONFIG.rakhiRitual.climaxQuote;
  if (blessingGrid && RAKSHA_CONFIG.rakhiRitual.blessingBubbles) {
    blessingGrid.innerHTML = RAKSHA_CONFIG.rakhiRitual.blessingBubbles.map(b => `
      <button class="blessing-bubble-btn" data-toast="${b.toast}">
        <span>${b.icon}</span>
        <span>${b.text}</span>
      </button>
    `).join('');
  }

  // Hydrate Scene 9: Secret Lock Box
  const lockHeading = document.getElementById('lock-heading');
  const lockSubtitle = document.getElementById('lock-subtitle');
  const lockHint = document.getElementById('lock-hint');

  if (lockHeading) lockHeading.textContent = RAKSHA_CONFIG.secretLock.heading;
  if (lockSubtitle) lockSubtitle.textContent = RAKSHA_CONFIG.secretLock.subtitle;
  if (lockHint) lockHint.textContent = RAKSHA_CONFIG.secretLock.hint;

  // Hydrate Scene 10: Letter Modal
  const letterPaperContent = document.getElementById('letter-paper-content');
  if (letterPaperContent && RAKSHA_CONFIG.letter) {
    letterPaperContent.innerHTML = `
      <div class="letter-salutation">${RAKSHA_CONFIG.letter.salutation}</div>
      ${RAKSHA_CONFIG.letter.paragraphs.map(p => `<p class="letter-paragraph">${p}</p>`).join('')}
      <div class="letter-signature">${RAKSHA_CONFIG.letter.signature}</div>
    `;
  }

  // Hydrate Scene 11: Sister Roasts Grid
  const roastGrid = document.getElementById('roast-grid');
  if (roastGrid && RAKSHA_CONFIG.sisterRoasts) {
    roastGrid.innerHTML = RAKSHA_CONFIG.sisterRoasts.map(r => `
      <div class="roast-card animate-on-scroll scale-in">
        <div class="roast-card-icon">${r.icon}</div>
        <div class="roast-card-title">${r.title}</div>
        <p style="color:var(--text-muted)">${r.text}</p>
      </div>
    `).join('');
  }

  // Hydrate Scene 12: Ending
  const endingQuoteBox = document.getElementById('ending-quote-box');
  const endingMainTitle = document.getElementById('ending-main-title');
  const endingSubTitle = document.getElementById('ending-sub-title');

  if (endingQuoteBox && RAKSHA_CONFIG.ending.lines) {
    endingQuoteBox.innerHTML = RAKSHA_CONFIG.ending.lines
      .map(line => `<div class="ending-quote-line">${line}</div>`).join('');
  }
  if (endingMainTitle) endingMainTitle.textContent = RAKSHA_CONFIG.ending.mainWish;
  if (endingSubTitle) endingSubTitle.textContent = RAKSHA_CONFIG.ending.subWish;

  // Audio Toggle Button
  const audioBtn = document.getElementById('audio-toggle-btn');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      const active = window.soundController && window.soundController.toggleAudio();
      audioBtn.innerHTML = active ? '🔊' : '🔇';
    });
  }

  // Re-trigger scroll animations on active scene content
  if (window.animationEngine) {
    window.animationEngine.initScrollObserver();
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SCENE MANAGER — page-reveal, no scrolling
  ═══════════════════════════════════════════════════════════════════════════ */
  class SceneManager {
    constructor() {
      this.sections  = Array.from(document.querySelectorAll('.scene-section'));
      this.current   = 0;
      this.busy      = false;  // block during animation

      this.prevBtn   = document.getElementById('btn-scene-prev');
      this.nextBtn   = document.getElementById('btn-scene-next');
      this.counterEl = document.getElementById('scene-nav-current');
      this.totalEl   = document.getElementById('scene-nav-total');
      this.navDots   = Array.from(document.querySelectorAll('.nav-dot'));

      this._init();
    }

    _init() {
      // Set total label
      if (this.totalEl) this.totalEl.textContent = this.sections.length;

      // Show first scene immediately
      if (this.sections[0]) this.sections[0].classList.add('scene-active');
      this._updateUI(0);

      // Prev / Next buttons
      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

      // Side nav dots
      this.navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          const id = dot.getAttribute('href').slice(1);
          this.goToId(id);
        });
      });

      // Keyboard: arrow keys
      document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); this.next(); }
        if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); this.prev(); }
      });
    }

    /* Go to a scene by its 0-based index */
    goToIndex(idx, dir) {
      if (this.busy || idx === this.current) return;
      if (idx < 0 || idx >= this.sections.length) return;

      this.busy = true;
      const DURATION = 550; // ms — matches CSS transition
      const direction = dir || (idx > this.current ? 'next' : 'prev');
      const fromEl = this.sections[this.current];
      const toEl   = this.sections[idx];

      // 1. Place incoming scene off-screen (no transition yet)
      toEl.classList.remove('scene-active', 'scene-exit-left', 'scene-exit-right');
      toEl.classList.add(direction === 'next' ? 'scene-enter-right' : 'scene-enter-left');

      // 2. Force paint so the initial position is applied before transition starts
      toEl.getBoundingClientRect();

      // 3. Start transition: bring incoming on-screen, push outgoing off
      toEl.classList.remove('scene-enter-right', 'scene-enter-left');
      toEl.classList.add('scene-active');
      fromEl.classList.add(direction === 'next' ? 'scene-exit-left' : 'scene-exit-right');

      // 4. Cleanup after animation finishes
      setTimeout(() => {
        fromEl.classList.remove('scene-active', 'scene-exit-left', 'scene-exit-right');
        this.current = idx;
        this.busy = false;
        this._updateUI(idx);

        // Re-trigger animate-on-scroll elements in the newly visible scene
        toEl.querySelectorAll('.animate-on-scroll:not(.animated)').forEach(el => {
          el.classList.add('animated');
        });

        if (window.soundController) window.soundController.playChime();
      }, DURATION);
    }

    /* Navigate to a scene by its HTML id */
    goToId(sceneId) {
      const idx = this.sections.findIndex(s => s.id === sceneId);
      if (idx !== -1) this.goToIndex(idx);
    }

    next() { this.goToIndex(this.current + 1, 'next'); }
    prev() { this.goToIndex(this.current - 1, 'prev'); }

    _updateUI(idx) {
      if (this.counterEl) this.counterEl.textContent = idx + 1;
      if (this.prevBtn)   this.prevBtn.disabled = (idx === 0);
      if (this.nextBtn)   this.nextBtn.disabled = (idx === this.sections.length - 1);
      this.navDots.forEach(dot => {
        dot.classList.toggle('active', dot.getAttribute('href') === `#${this.sections[idx]?.id}`);
      });
    }
  }

  // Expose globally so interactions.js can call window.sceneManager.goToId()
  window.sceneManager = new SceneManager();
});
