/* ==========================================================================
   BIRTHDAY SURPRISE ✨ | MAGIC CLASSIC PACK
   Mobile-Friendly Page-By-Page Web Application Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 0. DATA & CONFIG DEFINITIONS
  // ------------------------------------------------------------------------
  const MEMORY_PHOTOS = [
    { src: 'assets/memory_1.jpg', caption: 'Sunset Promises by the Shore ♡' },
    { src: 'assets/memory_2.jpg', caption: 'Wrapped in Warm Golden Lights ♡' },
    { src: 'assets/memory_3.jpg', caption: 'Whispers Under the Soft Glow ♡' },
    { src: 'assets/memory_4.jpg', caption: 'Beneath a Starlit Universe ♡' },
    { src: 'assets/memory_5.jpg', caption: 'Infinite Smiles Together ♡' }
  ];

  const SURPRISE_WISHES = [
    "Wish #1: May your days be filled with infinite smiles & warmth! ☀️",
    "Wish #2: May every dream in your heart come true! ✨",
    "Wish #3: You deserve all the love in the universe! 💖",
    "Wish #4: Always remember how special you are to me! 💕",
    "Wish #5: Endless laughter and joyful adventures ahead! 🌟"
  ];

  function applyConfigSettings() {
    if (typeof CONFIG === 'undefined') return;

    const trackTitle = document.getElementById('track-title');
    if (trackTitle && CONFIG.songTitle) trackTitle.textContent = CONFIG.songTitle;

    const trackArtist = document.getElementById('track-artist');
    if (trackArtist && CONFIG.songArtist) trackArtist.textContent = `(${CONFIG.songArtist})`;

    const letterHeading = document.getElementById('letter-heading');
    if (letterHeading && CONFIG.letterHeading) letterHeading.textContent = CONFIG.letterHeading;

    const letterBody = document.getElementById('letter-body');
    if (letterBody && CONFIG.letterBody) letterBody.innerHTML = CONFIG.letterBody;

    const letterSignature = document.getElementById('letter-signature');
    if (letterSignature && CONFIG.senderName) {
      letterSignature.innerHTML = `${CONFIG.letterSignature || 'Forever & Always,'}<br><span>${CONFIG.senderName}</span>`;
    }

    const finalWishHeading = document.getElementById('final-wish-heading');
    if (finalWishHeading && CONFIG.finalWishHeading) finalWishHeading.textContent = CONFIG.finalWishHeading;

    const finalWishMessage = document.getElementById('final-wish-message');
    if (finalWishMessage && CONFIG.finalWishMessage) finalWishMessage.textContent = CONFIG.finalWishMessage;
  }
  applyConfigSettings();

  // ------------------------------------------------------------------------
  // 1. PAGE-BY-PAGE SLIDER ENGINE (6 PAGES: Page 0 to Page 5)
  // ------------------------------------------------------------------------
  let currentPage = 0;
  const totalPages = 6;
  const pageScreens = document.querySelectorAll('.page-screen');
  const stepDots = document.querySelectorAll('.step-dot');
  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');
  const pagesViewport = document.getElementById('pages-viewport');

  function animatePageEntry(pageIndex) {
    if (typeof gsap === 'undefined') return;
    const targetPage = pageScreens[pageIndex];
    if (!targetPage) return;

    if (pageIndex === 0) {
      // Create a cinematic GSAP timeline for Intro Page text & elements animation
      const tl = gsap.timeline();

      tl.fromTo('#page-0 .glow-heart-badge', 
        { scale: 0, opacity: 0, rotation: -45 }, 
        { scale: 1, opacity: 1, rotation: 0, duration: 0.65, ease: 'back.out(2)' }
      );

      tl.fromTo('#page-0 .top-whisper-text', 
        { y: -20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, 
        '-=0.3'
      );

      tl.fromTo('#page-0 .main-hero-title', 
        { y: 35, opacity: 0, scale: 0.85, rotationX: -25 }, 
        { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 0.6, ease: 'power3.out' }, 
        '-=0.25'
      );

      tl.fromTo('#page-0 .script-gold', 
        { scale: 0.3, opacity: 0, rotation: -12, filter: 'blur(8px)' }, 
        { scale: 1, opacity: 1, rotation: 0, filter: 'blur(0px)', duration: 0.75, ease: 'elastic.out(1.2, 0.45)' }, 
        '-=0.3'
      );

      tl.fromTo('#page-0 .gold-script-subheading', 
        { y: 20, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, 
        '-=0.35'
      );

      tl.fromTo('#page-0 .sub-whisper-text', 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.4, ease: 'power1.out' }, 
        '-=0.2'
      );

      tl.fromTo('#page-0-cta', 
        { scale: 0.75, opacity: 0, y: 25 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.8)' }, 
        '-=0.2'
      );

    } else if (pageIndex === 1) {
      gsap.fromTo('#lofi-vinyl', { rotation: -120, opacity: 0, scale: 0.7 }, { rotation: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' });
      gsap.fromTo('#page-1 .lofi-player-card', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, delay: 0.1, ease: 'power3.out' });
    } else if (pageIndex === 2) {
      gsap.fromTo('#page-2 .balloon-item', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(1.5)' });
    } else if (pageIndex === 3) {
      gsap.fromTo('#wax-envelope-wrapper', { scale: 0.85, opacity: 0, rotationX: 15 }, { scale: 1, opacity: 1, rotationX: 0, duration: 0.55, ease: 'power3.out' });
    } else if (pageIndex === 4) {
      gsap.fromTo('#page-4 .vertical-memory-card', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: 'power2.out' });
    } else if (pageIndex === 5) {
      gsap.fromTo('#page-5 .final-wishes-card', { scale: 0.85, opacity: 0, rotationX: 15 }, { scale: 1, opacity: 1, rotationX: 0, duration: 0.55, ease: 'back.out(1.5)' });
      gsap.fromTo('#page-5-cta', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, delay: 0.25, ease: 'back.out(1.6)' });
    }
  }

  function goToPage(targetPageIndex) {
    if (targetPageIndex < 0 || targetPageIndex >= totalPages) return;

    pageScreens.forEach((screen, idx) => {
      screen.classList.remove('active', 'prev');
      if (idx < targetPageIndex) screen.classList.add('prev');
      else if (idx === targetPageIndex) screen.classList.add('active');
    });

    currentPage = targetPageIndex;

    stepDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentPage);
    });

    if (prevBtn) prevBtn.disabled = currentPage === 0;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages - 1;

    animatePageEntry(currentPage);
  }

  // Prev & Next Buttons
  if (prevBtn) prevBtn.addEventListener('click', () => { playChimeSound(); goToPage(currentPage - 1); });
  if (nextBtn) nextBtn.addEventListener('click', () => { playChimeSound(); goToPage(currentPage + 1); });

  // Step Dots Click
  stepDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => { playChimeSound(); goToPage(idx); });
  });

  // CTA Buttons Navigation Handlers
  const page0Cta = document.getElementById('page-0-cta');
  if (page0Cta) {
    page0Cta.addEventListener('click', () => {
      playChimeSound();
      togglePlayAudio(true);
      if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      goToPage(1);
    });
  }

  const page1Cta = document.getElementById('page-1-cta');
  if (page1Cta) {
    page1Cta.addEventListener('click', () => {
      playChimeSound();
      goToPage(2);
    });
  }

  const page2Cta = document.getElementById('page-2-cta');
  if (page2Cta) {
    page2Cta.addEventListener('click', () => {
      playChimeSound();
      goToPage(3);
    });
  }

  const page3Cta = document.getElementById('page-3-cta');
  if (page3Cta) {
    page3Cta.addEventListener('click', () => {
      playChimeSound();
      goToPage(4);
    });
  }

  const page4Cta = document.getElementById('page-4-cta');
  if (page4Cta) {
    page4Cta.addEventListener('click', () => {
      playChimeSound();
      goToPage(5);
    });
  }

  const page5Cta = document.getElementById('page-5-cta');
  if (page5Cta) {
    page5Cta.addEventListener('click', () => {
      playChimeSound();
      if (typeof confetti === 'function') confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      goToPage(0);
    });
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
      const dist = touchEndX - touchStartX;
      if (Math.abs(dist) > 50) {
        if (dist < 0) goToPage(currentPage + 1);
        else goToPage(currentPage - 1);
      }
    }, { passive: true });
  }

  goToPage(0);

  // ------------------------------------------------------------------------
  // 2. BACKGROUND FALLING PARTICLES ENGINE (HEARTS, STARS, PETALS & DUST)
  // ------------------------------------------------------------------------
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let bursts = [];

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('mousemove', (e) => addSparkleBurst(e.clientX, e.clientY, 1));
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) addSparkleBurst(e.touches[0].clientX, e.touches[0].clientY, 1);
    }, { passive: true });

    class FallingParticle {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -30;
        this.size = Math.random() * 3.5 + 1.5;
        this.speedY = Math.random() * 1.6 + 0.6; // Falling downward
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.sineAngle = Math.random() * Math.PI * 2;
        this.sineSpeed = Math.random() * 0.025 + 0.01;
        this.opacity = Math.random() * 0.75 + 0.25;
        this.type = Math.random() < 0.35 ? 'heart' : (Math.random() < 0.65 ? 'star' : (Math.random() < 0.85 ? 'petal' : 'dust'));
        this.color = this.type === 'heart' ? '#ff2a85' : (this.type === 'star' ? '#ffd700' : (this.type === 'petal' ? '#ff69b4' : '#f7a4b8'));
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.04;
      }

      update() {
        this.sineAngle += this.sineSpeed;
        this.y += this.speedY; // Continuous falling down
        this.x += this.speedX + Math.sin(this.sineAngle) * 0.8;
        this.rotation += this.rotSpeed;
        if (this.y > height + 30) this.reset(false);
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;

        if (this.type === 'heart') {
          ctx.font = `${Math.floor(this.size * 4 + 7)}px sans-serif`;
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
        } else if (this.type === 'petal') {
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 2, this.size * 3.5, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    function addSparkleBurst(x, y, count = 2) {
      for (let i = 0; i < count; i++) {
        bursts.push({
          x: x, y: y,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 1,
          size: Math.random() * 2.5 + 1,
          life: 1.0,
          color: Math.random() < 0.5 ? '#ff2a85' : '#ffd700'
        });
      }
    }

    for (let i = 0; i < 75; i++) particles.push(new FallingParticle());

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });

      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx; b.y += b.vy; b.life -= 0.04;
        if (b.life <= 0) { bursts.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = b.life;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ------------------------------------------------------------------------
  // 3. AUDIO SYNTHESIZER & REAL LOFI MP3 PLAYER ENGINE
  // ------------------------------------------------------------------------
  let audioCtx = null;
  let isPlaying = false;
  let synthInterval = null;
  let audioElem = null;
  let currentTimeSec = 84;
  let totalTimeSec = 263;

  const lofiVinyl = document.getElementById('lofi-vinyl');
  const mainPlayBtn = document.getElementById('main-play-btn');
  const playIcon = document.getElementById('play-icon');
  const currTimeElem = document.getElementById('curr-time');
  const totalTimeElem = document.getElementById('total-time');
  const lofiProgressFill = document.getElementById('lofi-progress-fill');
  const lofiProgressTrack = document.getElementById('lofi-progress-track');
  const topMusicToggle = document.getElementById('top-music-toggle');

  function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updateProgressUI() {
    if (currTimeElem) currTimeElem.textContent = formatTime(currentTimeSec);
    if (totalTimeElem) totalTimeElem.textContent = formatTime(totalTimeSec);
    if (lofiProgressFill) lofiProgressFill.style.width = `${(currentTimeSec / Math.max(1, totalTimeSec)) * 100}%`;
  }

  function initAudioElement() {
    if (!audioElem && typeof CONFIG !== 'undefined' && CONFIG.musicUrl) {
      audioElem = new Audio(CONFIG.musicUrl);
      audioElem.loop = true;
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
      if (AudioCtxClass) audioCtx = new AudioCtxClass();
    }
  }

  function playSynthesizedLofiMelody() {
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
      } catch (e) {}
    }, 1000);
  }

  function playChimeSound() {
    initAudioContext();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch(e){}
  }

  function playPopSound() {
    initAudioContext();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.14);
    } catch(e){}
  }

  function togglePlayAudio(forcePlay = null) {
    initAudioElement();
    initAudioContext();
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();

    isPlaying = forcePlay !== null ? forcePlay : !isPlaying;

    if (isPlaying) {
      if (lofiVinyl) lofiVinyl.classList.add('spinning');
      if (playIcon) playIcon.className = 'fa-solid fa-pause';

      if (audioElem) {
        audioElem.play().catch(() => playSynthesizedLofiMelody());
      } else {
        playSynthesizedLofiMelody();
      }
    } else {
      if (lofiVinyl) lofiVinyl.classList.remove('spinning');
      if (playIcon) playIcon.className = 'fa-solid fa-play';

      if (audioElem) audioElem.pause();
      if (synthInterval) clearInterval(synthInterval);
    }
  }

  if (mainPlayBtn) mainPlayBtn.addEventListener('click', () => togglePlayAudio());
  if (topMusicToggle) topMusicToggle.addEventListener('click', () => togglePlayAudio());

  if (lofiProgressTrack) {
    lofiProgressTrack.addEventListener('click', (e) => {
      const rect = lofiProgressTrack.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      currentTimeSec = Math.floor(pct * totalTimeSec);
      if (audioElem && audioElem.duration) audioElem.currentTime = currentTimeSec;
      updateProgressUI();
    });
  }

  updateProgressUI();

  // ------------------------------------------------------------------------
  // 4. BALLOON POP UP & USER PHOTO REVEAL ENGINE (EXACTLY 5 BALLOONS)
  // ------------------------------------------------------------------------
  let score = 260;
  let popsLeft = 5;
  const balloonScoreVal = document.getElementById('balloon-score-val');
  const popsLeftCount = document.getElementById('pops-left-count');
  const balloonsStage = document.getElementById('balloons-stage');
  const resetBalloonsBtn = document.getElementById('reset-balloons-btn');
  const balloonToast = document.getElementById('balloon-toast');
  const balloonToastText = document.getElementById('balloon-toast-text');

  const BALLOONS_DATA = [
    { bg: 'linear-gradient(135deg, #ff2a85 0%, #b3004b 100%)', icon: '♥', img: 'assets/memory_1.jpg', caption: 'Sunset Promises ♡' },
    { bg: 'linear-gradient(135deg, #8a2be2 0%, #4b0082 100%)', icon: '★', img: 'assets/memory_2.jpg', caption: 'Cozy Evenings ♡' },
    { bg: 'linear-gradient(135deg, #ffd700 0%, #ccac00 100%)', icon: '✦', img: 'assets/memory_3.jpg', caption: 'Sweet Whispers ♡' },
    { bg: 'linear-gradient(135deg, #ff69b4 0%, #c71585 100%)', icon: '♥', img: 'assets/memory_4.jpg', caption: 'Starlit Night ♡' },
    { bg: 'linear-gradient(135deg, #e6b800 0%, #8b6d00 100%)', icon: '★', img: 'assets/memory_5.jpg', caption: 'Pure Happiness ♡' }
  ];

  function showToast(text) {
    if (!balloonToast || !balloonToastText) return;
    balloonToastText.textContent = text;
    balloonToast.classList.add('show');
    setTimeout(() => balloonToast.classList.remove('show'), 3000);
  }

  function renderBalloons() {
    if (!balloonsStage) return;
    balloonsStage.innerHTML = '';

    BALLOONS_DATA.forEach((data, idx) => {
      const slot = document.createElement('div');
      slot.className = 'balloon-slot';

      const bEl = document.createElement('div');
      bEl.className = 'balloon-item';
      bEl.style.background = data.bg;
      bEl.style.animationDelay = `${(idx * 0.35).toFixed(2)}s`;
      bEl.innerHTML = data.icon;

      const photoCard = document.createElement('div');
      photoCard.className = 'revealed-photo-card';
      photoCard.innerHTML = `
        <img src="${data.img}" alt="${data.caption}">
        <div class="revealed-photo-overlay">
          <div class="revealed-caption">${data.caption}</div>
        </div>
      `;
      photoCard.addEventListener('click', () => openLightbox({ src: data.img, caption: data.caption }));

      bEl.addEventListener('click', (e) => popBalloon(bEl, photoCard, idx, e));

      slot.appendChild(bEl);
      slot.appendChild(photoCard);
      balloonsStage.appendChild(slot);
    });
  }

  function popBalloon(bEl, photoCard, index, event) {
    if (bEl.classList.contains('popped')) return;
    bEl.classList.add('popped');
    playPopSound();

    if (typeof confetti === 'function') {
      const rect = bEl.getBoundingClientRect();
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }
      });
    }

    if (typeof gsap !== 'undefined') {
      gsap.to(bEl, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'back.in(1.8)',
        onComplete: () => {
          bEl.style.display = 'none';
          photoCard.style.display = 'flex';

          gsap.fromTo(photoCard, 
            { scale: 0.1, rotationY: -180, opacity: 0 }, 
            { scale: 1, rotationY: 0, opacity: 1, duration: 0.65, ease: 'back.out(1.7)' }
          );
        }
      });
    } else {
      bEl.style.display = 'none';
      photoCard.style.display = 'flex';
    }

    score += 20;
    popsLeft = Math.max(0, popsLeft - 1);
    if (balloonScoreVal) balloonScoreVal.textContent = score;
    if (popsLeftCount) popsLeftCount.textContent = popsLeft;

    showToast(`✨ Revealed: ${BALLOONS_DATA[index].caption}`);

    if (popsLeft === 0) {
      setTimeout(() => {
        if (typeof confetti === 'function') confetti({ particleCount: 140, spread: 85, origin: { y: 0.5 } });
        showToast('🎉 All 5 Balloons Popped! Memories Unlocked! ❤️');
      }, 600);
    }
  }

  function resetBalloons() {
    score = 260;
    popsLeft = 5;
    if (balloonScoreVal) balloonScoreVal.textContent = score;
    if (popsLeftCount) popsLeftCount.textContent = popsLeft;
    renderBalloons();
  }

  if (resetBalloonsBtn) resetBalloonsBtn.addEventListener('click', resetBalloons);
  renderBalloons();

  // ------------------------------------------------------------------------
  // 5. ANIMATED WAX SEALED ENVELOPE ENGINE
  // ------------------------------------------------------------------------
  const waxSealStamp = document.getElementById('wax-seal-stamp');
  const waxEnvelopeWrapper = document.getElementById('wax-envelope-wrapper');
  const letterModalOverlay = document.getElementById('letter-modal-overlay');
  const closeLetterBtn = document.getElementById('close-letter-btn');

  function openWaxEnvelope() {
    playChimeSound();
    if (typeof confetti === 'function') confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    if (letterModalOverlay) letterModalOverlay.classList.add('show');
  }

  if (waxSealStamp) waxSealStamp.addEventListener('click', openWaxEnvelope);
  if (waxEnvelopeWrapper) waxEnvelopeWrapper.addEventListener('click', openWaxEnvelope);
  if (closeLetterBtn) closeLetterBtn.addEventListener('click', () => {
    if (letterModalOverlay) letterModalOverlay.classList.remove('show');
  });

  // ------------------------------------------------------------------------
  // 6. GALLERY OF 5 PHOTOS ENGINE (VERTICALLY SCROLLED) & LIGHTBOX MODAL
  // ------------------------------------------------------------------------
  const galleryVerticalScroll = document.getElementById('gallery-vertical-scroll');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(photo) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = photo.src;
    if (lightboxCaption) lightboxCaption.textContent = photo.caption;
    lightboxModal.classList.add('show');
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightboxModal.classList.remove('show'));
  }

  function render5VerticalGallery() {
    if (!galleryVerticalScroll) return;
    galleryVerticalScroll.innerHTML = '';

    MEMORY_PHOTOS.forEach((photo, idx) => {
      const card = document.createElement('div');
      card.className = 'vertical-memory-card';
      card.innerHTML = `
        <img src="${photo.src}" alt="${photo.caption}">
        <div class="vertical-card-overlay">
          <span class="vertical-moment-badge">Moment ${idx + 1}</span>
          <div class="vertical-caption-text">${photo.caption}</div>
        </div>
      `;
      card.addEventListener('click', () => openLightbox(photo));
      galleryVerticalScroll.appendChild(card);
    });
  }

  render5VerticalGallery();

});
