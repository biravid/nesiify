/* ==========================================================================
   BIRTHDAY WISH WEBSITE - MOBILE PAGE-BY-PAGE APPLICATION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 0. DYNAMIC CONFIG INITIALIZER
  // ------------------------------------------------------------------------
  function applyConfigSettings() {
    if (typeof CONFIG === 'undefined') return;

    // Wish Page
    const wishHeading = document.querySelector('.wish-heading');
    if (wishHeading && CONFIG.recipientName) {
      wishHeading.innerHTML = `${CONFIG.wishHeading || 'Happy Birthday'}<br>${CONFIG.recipientName} ♡`;
    }
    const wishMessage = document.querySelector('.wish-message');
    if (wishMessage && CONFIG.wishMessage) {
      wishMessage.textContent = CONFIG.wishMessage;
    }

    // BGM Page
    const songTitle = document.querySelector('.song-title');
    if (songTitle && CONFIG.songTitle) {
      songTitle.textContent = CONFIG.songTitle;
    }
    const songArtist = document.querySelector('.song-artist');
    if (songArtist && CONFIG.songArtist) {
      songArtist.textContent = CONFIG.songArtist;
    }

    // Love Letter Page
    const letterHeading = document.querySelector('.letter-heading');
    if (letterHeading && CONFIG.letterHeading) {
      letterHeading.textContent = CONFIG.letterHeading;
    }
    const letterBody = document.querySelector('.letter-body');
    if (letterBody && CONFIG.letterBody) {
      letterBody.innerHTML = CONFIG.letterBody;
    }
    const letterSignature = document.querySelector('.letter-signature');
    if (letterSignature && CONFIG.senderName) {
      letterSignature.innerHTML = `${CONFIG.letterSignature || 'Forever & Always,'}<br><span>${CONFIG.senderName}</span>`;
    }
  }

  applyConfigSettings();

  // ------------------------------------------------------------------------
  // 1. PAGE-BY-PAGE SLIDER NAVIGATION ROUTER
  // ------------------------------------------------------------------------
  let currentPage = 0;
  const totalPages = 6;
  const pageScreens = document.querySelectorAll('.page-screen');
  const pageTabBtns = document.querySelectorAll('.page-tab-btn');
  const stepDots = document.querySelectorAll('.step-dot');
  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');
  const pagesViewport = document.getElementById('pages-viewport');

  function animatePageEntry(pageIndex) {
    if (typeof gsap === 'undefined') return;

    if (pageIndex === 0) {
      // PAGE 1: Secret Surprise Envelope (Interactive Pop & Glow)
      const tl = gsap.timeline();
      tl.fromTo('#page-0 .envelope-heart-glow', 
        { scale: 0, opacity: 0, rotation: -30 }, 
        { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1.2, 0.5)' }
      )
      .fromTo('#page-0 .envelope-title', 
        { y: 25, opacity: 0, rotationX: 15 }, 
        { y: 0, opacity: 1, rotationX: 0, duration: 0.4, ease: 'power3.out' }, 
        '-=0.25'
      )
      .fromTo('#page-0 .envelope-desc', 
        { y: 15, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 
        '-=0.2'
      )
      .fromTo('#open-surprise-btn', 
        { scale: 0.85, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' }, 
        '-=0.15'
      )
      .fromTo('#page-0 .envelope-footer', 
        { opacity: 0, y: 10 }, 
        { opacity: 0.85, y: 0, duration: 0.3 }, 
        '-=0.15'
      );
    } else if (pageIndex === 1) {
      // PAGE 2: Birthday Wish (3D Hero Drop & Text Reveal)
      const tl = gsap.timeline();
      tl.fromTo('#page-1 .wish-heading', 
        { y: -30, opacity: 0, rotationX: -20 }, 
        { y: 0, opacity: 1, rotationX: 0, duration: 0.5, ease: 'power3.out' }
      )
      .fromTo('#page-1 .wish-message', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 
        '-=0.25'
      )
      .fromTo('#page-1 .wish-celebrate-btn', 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.6)' }, 
        '-=0.2'
      );
    } else if (pageIndex === 2) {
      // PAGE 3: Custom BGM Music Player (Vinyl 3D Drop & Floating Notes)
      const tl = gsap.timeline();
      tl.fromTo('#page-2 .vinyl-disc', 
        { scale: 0.65, opacity: 0, rotation: -90 }, 
        { scale: 1, opacity: 1, rotation: 0, duration: 0.55, ease: 'back.out(1.5)' }
      )
      .fromTo('#page-2 .f-note', 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 0.8, duration: 0.35, stagger: 0.07, ease: 'back.out(1.4)' }, 
        '-=0.3'
      )
      .fromTo('#page-2 .song-info, #page-2 .player-controls-box', 
        { y: 25, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, 
        '-=0.2'
      );
    } else if (pageIndex === 3) {
      // PAGE 4: Interactive Candle Blow Game (Flame Ignition & Meter Slide)
      const tl = gsap.timeline();
      tl.fromTo('#page-3 .candle-main-title, #page-3 .candle-wish-text', 
        { y: -20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      )
      .fromTo('#flame-glow', 
        { scale: 0, opacity: 0, rotation: 15 }, 
        { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: 'elastic.out(1.2, 0.4)' }, 
        '-=0.2'
      )
      .fromTo('#page-3 .wind-meter-box', 
        { y: 35, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, 
        '-=0.25'
      );
    } else if (pageIndex === 4) {
      // PAGE 5: Memories Gallery (3D Card Cascade Fan & Active Card Zoom)
      gsap.fromTo('#page-4 .memory-card', 
        { y: 45, opacity: 0, rotationY: -15, scale: 0.9 }, 
        { y: 0, opacity: 1, rotationY: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: 'power3.out' }
      );
      setTimeout(updateActiveGalleryCard, 400);
    } else if (pageIndex === 5) {
      // PAGE 6: Love Letter & Replay (Unfolding Letter Card)
      const tl = gsap.timeline();
      tl.fromTo('#page-5 .letter-card', 
        { scaleY: 0.85, opacity: 0, rotationX: 12 }, 
        { scaleY: 1, opacity: 1, rotationX: 0, duration: 0.55, ease: 'back.out(1.4)' }
      )
      .fromTo('#page-5 .letter-stamp', 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.8)' }, 
        '-=0.3'
      )
      .fromTo('#replay-surprise-btn', 
        { scale: 0.88, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.5)' }, 
        '-=0.2'
      );
    }
  }

  function goToPage(targetPageIndex) {
    if (targetPageIndex < 0 || targetPageIndex >= totalPages) return;

    pageScreens.forEach((screen, idx) => {
      screen.classList.remove('active', 'prev');
      if (idx < targetPageIndex) {
        screen.classList.add('prev');
      } else if (idx === targetPageIndex) {
        screen.classList.add('active');
      }
    });

    currentPage = targetPageIndex;

    // Update Tab Navigation Bar
    pageTabBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === currentPage);
    });

    // Update Bottom Step Dots
    stepDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentPage);
    });

    // Update Prev / Next Button States
    if (prevBtn) prevBtn.disabled = currentPage === 0;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages - 1;

    // Trigger GSAP Entry Animation
    animatePageEntry(currentPage);
  }

  // Event Listeners for Nav Controls
  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
  }

  // Back and Next Header Icon buttons
  document.querySelectorAll('.back-page-btn').forEach(btn => {
    btn.addEventListener('click', () => goToPage(currentPage - 1));
  });

  document.querySelectorAll('.next-page-btn-icon').forEach(btn => {
    btn.addEventListener('click', () => goToPage(currentPage + 1));
  });

  // Page 2 Top Nav Links Router
  document.querySelectorAll('.wish-nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = parseInt(link.getAttribute('data-page'));
      if (!isNaN(targetPage)) goToPage(targetPage);
    });
  });

  pageTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-page'));
      if (!isNaN(idx)) goToPage(idx);
    });
  });

  stepDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-page'));
      if (!isNaN(idx)) goToPage(idx);
    });
  });

  // Gallery Scroll Sync & Dynamic Center Image Zoom
  const galleryRow = document.getElementById('gallery-row');
  const galDots = document.querySelectorAll('.gal-dot');
  const memoryCardsList = document.querySelectorAll('.memory-card');

  function updateActiveGalleryCard() {
    if (!galleryRow || memoryCardsList.length === 0) return;

    const rowRect = galleryRow.getBoundingClientRect();
    const rowCenter = rowRect.left + rowRect.width / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    memoryCardsList.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(rowCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    memoryCardsList.forEach((card, idx) => {
      card.classList.toggle('active', idx === closestIndex);
    });

    galDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === closestIndex);
    });
  }

  if (galleryRow) {
    galleryRow.addEventListener('scroll', updateActiveGalleryCard, { passive: true });

    galDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        if (memoryCardsList[idx]) {
          memoryCardsList[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
    });

    setTimeout(updateActiveGalleryCard, 100);
  }

  // Touch Swipe Gesture Detection for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (pagesViewport) {
    pagesViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    pagesViewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance < 0) {
        goToPage(currentPage + 1);
      } else {
        goToPage(currentPage - 1);
      }
    }
  }

  // Page Action Triggers
  const openSurpriseBtn = document.getElementById('open-surprise-btn');
  if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener('click', () => {
      playToneSequence();
      togglePlayAudio(true);
      goToPage(1); // Move to Page 2 (Wish Page)
    });
  }

  const letCelebrateBtn = document.getElementById('let-celebrate-btn');
  if (letCelebrateBtn) {
    letCelebrateBtn.addEventListener('click', () => {
      goToPage(3); // Move to Page 4 (Candle Game)
    });
  }

  const replaySurpriseBtn = document.getElementById('replay-surprise-btn');
  if (replaySurpriseBtn) {
    replaySurpriseBtn.addEventListener('click', () => {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
      goToPage(0); // Restart from Page 1 (Surprise Envelope)
    });
  }

  goToPage(0);

  // ------------------------------------------------------------------------
  // 2. ENHANCED MOVING PARTICLES & SPARKLES CANVAS ENGINE
  // ------------------------------------------------------------------------
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null };

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      addSparkleBurst(e.clientX, e.clientY, 2);
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        addSparkleBurst(e.touches[0].clientX, e.touches[0].clientY, 2);
      }
    }, { passive: true });

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 80;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.sineAngle = Math.random() * Math.PI * 2;
        this.sineSpeed = Math.random() * 0.03 + 0.01;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.type = Math.random() < 0.3 ? 'heart' : (Math.random() < 0.6 ? 'star' : 'dust');
        this.color = this.type === 'heart' ? '#ff2a85' : (this.type === 'star' ? '#ffd700' : '#f7a4b8');
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.05;
      }

      update() {
        this.sineAngle += this.sineSpeed;
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.sineAngle) * 0.8;
        this.rotation += this.rotSpeed;

        // Interactive mouse attraction effect
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            this.x -= (dx / dist) * 1.5;
            this.y -= (dy / dist) * 1.5;
          }
        }

        if (this.y < -30) this.reset();
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;

        if (this.type === 'heart') {
          ctx.font = `${Math.floor(this.size * 4 + 8)}px sans-serif`;
          ctx.fillText('♥', -this.size * 2, this.size * 2);
        } else if (this.type === 'star') {
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * (this.size * 2.5),
                       -Math.sin((18 + i * 72) * Math.PI / 180) * (this.size * 2.5));
            ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (this.size * 1.2),
                       -Math.sin((54 + i * 72) * Math.PI / 180) * (this.size * 1.2));
          }
          ctx.closePath();
          ctx.fill();
          ctx.shadowBlur = 10;
          ctx.shadowColor = this.color;
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color;
        }

        ctx.restore();
      }
    }

    // Sparkle trail bursts on movement
    let bursts = [];
    function addSparkleBurst(x, y, count = 2) {
      for (let i = 0; i < count; i++) {
        bursts.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 1,
          size: Math.random() * 2.5 + 1,
          life: 1.0,
          color: Math.random() < 0.5 ? '#ff2a85' : '#ffd700'
        });
      }
    }

    for (let i = 0; i < 65; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Render Ambient Background Particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Render Touch/Mouse Trail Bursts
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.life -= 0.04;
        if (b.life <= 0) {
          bursts.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = b.life;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 8;
        ctx.shadowColor = b.color;
        ctx.restore();
      }

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ------------------------------------------------------------------------
  // 3. AUDIO SYNTHESIZER & MP3 MUSIC PLAYER
  // ------------------------------------------------------------------------
  let audioCtx = null;
  let isPlaying = false;
  let synthInterval = null;
  let audioElem = null;
  let currentTimeSec = 0;
  let totalTimeSec = 263;

  const vinylDisc = document.getElementById('vinyl-disc');
  const mainPlayBtn = document.getElementById('main-play-btn');
  const playIcon = document.getElementById('play-icon');
  const currentTimeElem = document.getElementById('current-time');
  const totalTimeElem = document.getElementById('total-time');
  const progressFill = document.getElementById('progress-fill');
  const progressTrack = document.getElementById('progress-track');
  const wishAudioToggle = document.getElementById('wish-audio-toggle');

  function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updateProgressUI() {
    if (currentTimeElem) currentTimeElem.textContent = formatTime(currentTimeSec);
    if (totalTimeElem) totalTimeElem.textContent = formatTime(totalTimeSec);
    if (progressFill) progressFill.style.width = `${(currentTimeSec / Math.max(1, totalTimeSec)) * 100}%`;
  }

  // Initialize HTML5 Audio Element for MP3 file/URL
  function initAudioElement() {
    if (!audioElem && typeof CONFIG !== 'undefined' && CONFIG.musicUrl) {
      audioElem = new Audio(CONFIG.musicUrl);
      audioElem.loop = true;

      audioElem.addEventListener('loadedmetadata', () => {
        if (audioElem.duration && !isNaN(audioElem.duration)) {
          totalTimeSec = Math.floor(audioElem.duration);
          updateProgressUI();
        }
      });

      audioElem.addEventListener('timeupdate', () => {
        if (audioElem) {
          currentTimeSec = Math.floor(audioElem.currentTime);
          if (audioElem.duration && !isNaN(audioElem.duration)) {
            totalTimeSec = Math.floor(audioElem.duration);
          }
          updateProgressUI();
        }
      });
    }
  }

  function initAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
  }

  function playSynthesizedRomanticMelody() {
    if (!audioCtx) return;
    const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 440.00, 349.23];
    let noteIdx = 0;

    if (synthInterval) clearInterval(synthInterval);
    synthInterval = setInterval(() => {
      if (!isPlaying || !audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[noteIdx % notes.length], audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);

        noteIdx++;
        currentTimeSec = (currentTimeSec + 1) % totalTimeSec;
        updateProgressUI();
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }

  function togglePlayAudio(forcePlay = null) {
    initAudioElement();
    initAudioContext();

    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlaying = forcePlay !== null ? forcePlay : !isPlaying;

    if (isPlaying) {
      if (vinylDisc) vinylDisc.classList.add('playing');
      if (playIcon) playIcon.className = 'fa-solid fa-pause';

      // Attempt playing real MP3 audio file
      if (audioElem) {
        audioElem.play().catch(err => {
          console.warn('MP3 playback fallback to synthesized melody:', err);
          playSynthesizedRomanticMelody();
        });
      } else {
        playSynthesizedRomanticMelody();
      }
    } else {
      if (vinylDisc) vinylDisc.classList.remove('playing');
      if (playIcon) playIcon.className = 'fa-solid fa-play';

      if (audioElem) {
        audioElem.pause();
      }
      if (synthInterval) clearInterval(synthInterval);
    }
  }

  function playToneSequence() {
    initAudioContext();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((f, i) => {
      setTimeout(() => {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.value = f;
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      }, i * 150);
    });
  }

  if (mainPlayBtn) mainPlayBtn.addEventListener('click', () => togglePlayAudio());
  if (wishAudioToggle) wishAudioToggle.addEventListener('click', () => togglePlayAudio());

  if (progressTrack) {
    progressTrack.addEventListener('click', (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      currentTimeSec = Math.floor(pct * totalTimeSec);
      updateProgressUI();
    });
  }

  updateProgressUI();

  // ------------------------------------------------------------------------
  // 4. INTERACTIVE CANDLE BLOW GAME
  // ------------------------------------------------------------------------
  let candleBlown = false;
  let blowProgress = 0;
  const flameGlow = document.getElementById('flame-glow');
  const smokeParticles = document.getElementById('smoke-particles');
  const windFill = document.getElementById('wind-fill');
  const windStatus = document.getElementById('wind-status');
  const micToggleBtn = document.getElementById('mic-toggle-btn');
  const candleFlameWrapper = document.getElementById('candle-flame-wrapper');

  function updateBlowMeter(amount) {
    if (candleBlown) return;
    blowProgress = Math.min(100, blowProgress + amount);
    if (windFill) windFill.style.width = `${blowProgress}%`;

    if (blowProgress < 40) {
      if (windStatus) windStatus.textContent = 'Keep blowing... 💨';
    } else if (blowProgress < 90) {
      if (windStatus) windStatus.textContent = 'Almost there! Flame is flickering! 🌬️';
      if (flameGlow) flameGlow.style.transform = `scale(${1 - blowProgress * 0.005}) rotate(${Math.random() * 20 - 10}deg)`;
    } else {
      extinguishCandle();
    }
  }

  function extinguishCandle() {
    candleBlown = true;
    if (flameGlow) flameGlow.classList.add('blown-out');
    if (smokeParticles) smokeParticles.style.display = 'block';
    if (windStatus) {
      windStatus.textContent = '✨ Wish Granted! Happy Birthday! 🎉';
      windStatus.style.color = '#ffd700';
    }

    if (typeof confetti === 'function') {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  }

  if (candleFlameWrapper) {
    candleFlameWrapper.addEventListener('click', () => updateBlowMeter(40));
  }

  if (micToggleBtn) {
    micToggleBtn.addEventListener('click', async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micToggleBtn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i> Listening...';
        micToggleBtn.style.background = '#ff2a85';

        initAudioContext();
        if (!audioCtx) return;
        const micSource = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        micSource.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        function detectMicVolume() {
          if (candleBlown) return;
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
          let average = sum / dataArray.length;

          if (average > 35) {
            updateBlowMeter(average * 0.15);
          }
          requestAnimationFrame(detectMicVolume);
        }
        detectMicVolume();
      } catch (err) {
        alert('Microphone unavailable. You can tap or swipe the flame to blow it out!');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 5. MEMORIES GALLERY LIGHTBOX MODAL
  // ------------------------------------------------------------------------
  const memoryCards = document.querySelectorAll('.memory-card');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  memoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.memory-card-img').src;
      const caption = card.getAttribute('data-caption');
      if (lightboxImg) lightboxImg.src = img;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      if (lightboxModal) lightboxModal.classList.add('show');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      if (lightboxModal) lightboxModal.classList.remove('show');
    });
  }

});
