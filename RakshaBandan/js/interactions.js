/**
 * Interactions Module — Scene Navigation, Rituals, Mini-Game CTAs
 */

class InteractionManager {
  constructor() {
    this.initCursor();
    this.initSceneNavigation();  // CTA scroll-snap navigation
    this.initMysteryOpening();
    this.initGuessQuiz();
    this.initChildhoodUnblur();
    this.initThaliRitual();
    this.initTilakAndSweet();
    this.initRakhiTie();
    this.initSecretLock();
    this.initEnvelopeModal();
  }

  /* ───────────────────────────────────────────────────────────────────────────
     SCENE NAVIGATION — delegates to global SceneManager (no scrolling)
  ─────────────────────────────────────────────────────────────────────────── */
  scrollToScene(sceneId) {
    if (window.sceneManager) {
      window.sceneManager.goToId(sceneId);
    }
  }

  /* Wire all [data-next-scene] buttons globally */
  initSceneNavigation() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-next-scene]');
      if (!btn) return;
      const targetId = btn.getAttribute('data-next-scene');
      if (targetId) this.scrollToScene(targetId);
    });
  }

  /* ───────────────────────────────────────────────────────────────────────────
     SISTER TOAST NOTIFICATION
  ─────────────────────────────────────────────────────────────────────────── */
  showSisterToast(message) {
    let toast = document.getElementById('sister-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'sister-toast';
      toast.className = 'sister-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    if (window.soundController) window.soundController.playChime();
    setTimeout(() => toast.classList.remove('show'), 3400);
  }

  /* ───────────────────────────────────────────────────────────────────────────
     BURST PARTICLES (canvas sparkle on element)
  ─────────────────────────────────────────────────────────────────────────── */
  createBurstParticles(element) {
    const rect = element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const colors = ['#F6C453', '#F7A6B8', '#F4A261', '#FFFFFF'];

    for (let i = 0; i < 18; i++) {
      const dot = document.createElement('div');
      Object.assign(dot.style, {
        position: 'fixed',
        left: `${cx}px`, top: `${cy}px`,
        width: '10px', height: '10px',
        borderRadius: '50%',
        background: colors[Math.floor(Math.random() * colors.length)],
        pointerEvents: 'none',
        zIndex: '9998',
        transform: 'translate(-50%,-50%)',
        transition: 'all 0.8s ease-out',
        opacity: '1'
      });
      document.body.appendChild(dot);

      const angle = (i / 18) * Math.PI * 2;
      const dist  = 60 + Math.random() * 80;
      setTimeout(() => {
        dot.style.left = `${cx + Math.cos(angle) * dist}px`;
        dot.style.top  = `${cy + Math.sin(angle) * dist}px`;
        dot.style.opacity = '0';
        dot.style.transform = 'translate(-50%,-50%) scale(0)';
      }, 30);
      setTimeout(() => dot.remove(), 900);
    }
  }

  /* ───────────────────────────────────────────────────────────────────────────
     CUSTOM CURSOR (Desktop)
  ─────────────────────────────────────────────────────────────────────────── */
  initCursor() {
    const cursor = document.getElementById('custom-cursor');
    const dot    = document.getElementById('custom-cursor-dot');
    if (!cursor || !dot) return;

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top  = `${e.clientY}px`;
      dot.style.left    = `${e.clientX}px`;
      dot.style.top     = `${e.clientY}px`;
    });

    document.querySelectorAll('button, a, .thali-item-btn, .option-btn, .roast-card').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  }

  /* ───────────────────────────────────────────────────────────────────────────
     SCENE 1 — MYSTERY OPENING
  ─────────────────────────────────────────────────────────────────────────── */
  initMysteryOpening() {
    const btn = document.getElementById('btn-curiosity-promise');
    if (!btn) return;
    btn.addEventListener('click', () => {
      this.showSisterToast(RAKSHA_CONFIG.mysteryOpening.promiseAccepted);
      // data-next-scene wired — initSceneNavigation handles the scroll
    });
  }

  /* ───────────────────────────────────────────────────────────────────────────
     SCENE 2 — GUESS QUIZ
  ─────────────────────────────────────────────────────────────────────────── */
  initGuessQuiz() {
    const container = document.getElementById('quiz-options-container');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.option-btn');
      if (!btn) return;
      document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      this.showSisterToast(RAKSHA_CONFIG.guessQuiz.feedback);
      // Auto-advance after picking
      setTimeout(() => {
        if (window.sceneManager) window.sceneManager.goToId('scene-childhood-reveal');
      }, 1200);
    });
  }

  /* ───────────────────────────────────────────────────────────────────────────
     SCENE 3 — CHILDHOOD UNBLUR
  ─────────────────────────────────────────────────────────────────────────── */
  initChildhoodUnblur() {
    const btn = document.getElementById('btn-unblur-memory');
    const img = document.getElementById('unblur-img');
    if (!btn || !img) return;

    let unblurred = false;

    btn.addEventListener('click', () => {
      if (!unblurred) {
        // ── First click: reveal the memory ──
        unblurred = true;
        img.classList.add('cleared');
        if (window.soundController) window.soundController.playPaperRustle();
        this.showSisterToast("Memory Unlocked! 📸 Look how cute you were!");

        // Wait for the 1.2s CSS blur transition to finish, then
        // transform the button into a "Continue" CTA
        setTimeout(() => {
          btn.textContent = 'Continue to Sister Reveal →  ✨';
          btn.setAttribute('style', 'animation: pulseGlow 2s ease-in-out infinite alternate;');
          // Now wire it for navigation on the SECOND click
          btn.setAttribute('data-next-scene', 'scene-sister-reveal');
          this.showSisterToast("Take a moment... and when you're ready, continue. 💖");
        }, 1400); // slightly after the 1.2s blur clears

      }
      // Second click is handled automatically by initSceneNavigation
      // via the data-next-scene attribute we just added above
    });
  }

  /* ───────────────────────────────────────────────────────────────────────────
     SCENE 5 — THALI RITUAL
  ─────────────────────────────────────────────────────────────────────────── */
  initThaliRitual() {
    const inventory = document.getElementById('thali-inventory');
    const slots     = document.querySelectorAll('.thali-tray-slot');
    const nextBtn   = document.getElementById('btn-thali-next');
    let placedCount = 0;
    if (!inventory) return;

    inventory.addEventListener('click', (e) => {
      const btn = e.target.closest('.thali-item-btn');
      if (!btn || btn.classList.contains('placed')) return;

      const itemId = btn.getAttribute('data-id');
      const item   = RAKSHA_CONFIG.thaliRitual.items.find(i => i.id === itemId);
      if (!item) return;

      btn.classList.add('placed');
      if (placedCount < slots.length) {
        slots[placedCount].textContent = item.icon;
        slots[placedCount].classList.add('filled');
        placedCount++;
      }
      this.showSisterToast(item.toast);
      this.createBurstParticles(btn);

      if (placedCount === RAKSHA_CONFIG.thaliRitual.items.length) {
        setTimeout(() => {
          this.showSisterToast("Yay! The Thali is fully prepared! 🪔✨");
          if (nextBtn) nextBtn.style.display = 'inline-flex';
        }, 1000);
      }
    });
  }

  /* ───────────────────────────────────────────────────────────────────────────
     SCENE 6 — TILAK  &  SCENE 7 — SWEET
  ─────────────────────────────────────────────────────────────────────────── */
  initTilakAndSweet() {
    // Tilak
    const btnTilak   = document.getElementById('btn-apply-tilak');
    const brotherImg = document.getElementById('tilak-brother-img');
    const frameWrap  = document.getElementById('tilak-frame-wrapper');
    const tilakNext  = document.getElementById('btn-tilak-next');

    if (btnTilak) {
      btnTilak.addEventListener('click', () => {
        if (window.soundController) window.soundController.playSparkleBurst();
        if (brotherImg && RAKSHA_CONFIG.tilakRitual.brotherWithTilakPhoto) {
          brotherImg.style.opacity = '0';
          setTimeout(() => {
            brotherImg.src = RAKSHA_CONFIG.tilakRitual.brotherWithTilakPhoto;
            brotherImg.style.opacity = '1';
          }, 350);
        }
        if (frameWrap) frameWrap.classList.add('applied');
        btnTilak.textContent = 'Tilak Applied ✨🔴';
        btnTilak.disabled = true;
        this.createBurstParticles(btnTilak);
        this.showSisterToast(RAKSHA_CONFIG.tilakRitual.blessing);
        setTimeout(() => {
          if (tilakNext) tilakNext.style.display = 'inline-flex';
        }, 1200);
      });
    }

    // Sweet
    const btnSweet      = document.getElementById('btn-feed-sweet');
    const sweetImg      = document.getElementById('sweet-ritual-img');
    const sweetFrame    = document.getElementById('sweet-frame-wrapper');
    const sweetNext     = document.getElementById('btn-sweet-next');

    if (btnSweet) {
      btnSweet.addEventListener('click', () => {
        if (window.soundController) window.soundController.playChime();
        if (sweetImg && RAKSHA_CONFIG.sweetRitual.sweetFedPhoto) {
          sweetImg.style.opacity = '0';
          setTimeout(() => {
            sweetImg.src = RAKSHA_CONFIG.sweetRitual.sweetFedPhoto;
            sweetImg.style.opacity = '1';
          }, 350);
        }
        if (sweetFrame) sweetFrame.classList.add('fed');
        btnSweet.textContent = 'Sweet Fed! 🍬😋';
        btnSweet.disabled = true;
        this.createBurstParticles(btnSweet);
        this.showSisterToast(RAKSHA_CONFIG.sweetRitual.sisterToast);
        setTimeout(() => {
          if (sweetNext) sweetNext.style.display = 'inline-flex';
        }, 1200);
      });
    }
  }

  /* ───────────────────────────────────────────────────────────────────────────
     SCENE 8 — RAKHI TIE
  ─────────────────────────────────────────────────────────────────────────── */
  initRakhiTie() {
    const tieBtn       = document.getElementById('btn-tie-rakhi');
    const rakhiIcon    = document.getElementById('rakhi-icon');
    const tiedBanner   = document.getElementById('rakhi-tied-banner');
    const videoBox     = document.getElementById('rakhi-video-container');
    const videoPlayer  = document.getElementById('rakhi-tying-video');
    const blessingGrid = document.getElementById('blessing-bubbles-grid');

    if (tieBtn) {
      tieBtn.addEventListener('click', () => {
        if (window.soundController) window.soundController.playSparkleBurst();
        if (window.animationEngine?.launchFireworks) window.animationEngine.launchFireworks();

        if (rakhiIcon) rakhiIcon.classList.add('tied');
        if (videoBox)  videoBox.classList.add('playing');
        if (videoPlayer) videoPlayer.play().catch(() => {});

        tieBtn.style.display = 'none';
        this.createBurstParticles(tieBtn);

        setTimeout(() => {
          if (tiedBanner) tiedBanner.classList.add('visible');
          this.showSisterToast("Happy Raksha Bandhan! ❤️🧵");
        }, 700);
      });
    }

    if (blessingGrid) {
      blessingGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.blessing-bubble-btn');
        if (!btn) return;
        if (window.soundController) window.soundController.playChime();
        btn.classList.toggle('popped');
        const msg = btn.getAttribute('data-toast');
        if (msg) {
          this.showSisterToast(msg);
          this.createBurstParticles(btn);
        }
      });
    }
  }

  /* ───────────────────────────────────────────────────────────────────────────
     SCENE 9 — SECRET LOCK
  ─────────────────────────────────────────────────────────────────────────── */
  initSecretLock() {
    const box       = document.getElementById('passcode-box');
    const input     = document.getElementById('passcode-input');
    const unlockBtn = document.getElementById('btn-unlock-gift');

    if (!unlockBtn || !input) return;

    const tryUnlock = () => {
      const val   = input.value.trim().toLowerCase();
      const valid = RAKSHA_CONFIG.secretLock.passcodes.includes(val);
      if (valid) {
        if (window.soundController) window.soundController.playSparkleBurst();
        this.showSisterToast(RAKSHA_CONFIG.secretLock.successToast);
        setTimeout(() => {
          const modal = document.getElementById('letter-modal');
          if (modal) modal.classList.add('active');
        }, 900);
      } else {
        if (window.soundController) window.soundController.playPaperRustle();
        if (box) {
          box.classList.add('shake');
          setTimeout(() => box.classList.remove('shake'), 600);
        }
        this.showSisterToast(RAKSHA_CONFIG.secretLock.errorToast);
      }
    };

    unlockBtn.addEventListener('click', tryUnlock);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryUnlock(); });
  }

  /* ───────────────────────────────────────────────────────────────────────────
     LETTER MODAL
  ─────────────────────────────────────────────────────────────────────────── */
  initEnvelopeModal() {
    const modal    = document.getElementById('letter-modal');
    const closeBtn = document.getElementById('close-letter-btn');
    if (!modal || !closeBtn) return;

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.interactionManager = new InteractionManager();
});
