/**
 * ====================================================================
 * TAMIL BIRTHDAY WISHES WEBSITE - MAIN LOGIC & INTERACTION ENGINE
 * ====================================================================
 */

let currentParticleMode = 'hearts'; // 'hearts' or 'balloons'

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Application Components
  initDOMContent();
  initPasscodeProtection();
  initCountdownAndCounters();
  initMusicPlayer();
  initThemeAndParticleCustomizer();
  initHeartsAndBalloonsCanvas();
  initConfettiEngine();
  initInteractiveEvents();
});

/* ====================================================================
   1. DOM INITIALIZATION FROM CONFIG.JS
   ==================================================================== */
function initDOMContent() {
  if (typeof CONFIG === 'undefined') {
    console.error('Config file not loaded!');
    return;
  }

  // Hero Section Population
  const heroImg = document.getElementById('heroImage');
  const heroBadge = document.getElementById('heroBadge');
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroCtaBtn = document.getElementById('heroCtaBtn');

  if (heroImg && CONFIG.hero.image) heroImg.src = CONFIG.hero.image;
  if (heroBadge) heroBadge.textContent = CONFIG.hero.badgeText;
  if (heroTitle) heroTitle.textContent = CONFIG.hero.title;
  if (heroSubtitle) heroSubtitle.textContent = CONFIG.hero.subtitle;
  if (heroCtaBtn && CONFIG.hero.ctaText) {
    heroCtaBtn.innerHTML = `${CONFIG.hero.ctaText} <i class="fa-solid fa-chevron-down"></i>`;
  }

  // Render Tamil Verses Cards
  const versesGrid = document.getElementById('versesGrid');
  if (versesGrid && CONFIG.verses) {
    versesGrid.innerHTML = CONFIG.verses.map(v => `
      <div class="verse-card glass-panel">
        <div class="verse-header">
          <h3 class="verse-title">${v.title}</h3>
          <i class="fa-solid fa-quote-right verse-quote-icon"></i>
        </div>
        <div class="verse-content">
          ${v.lines.map(line => `<p>${line}</p>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // Render Interactive Love Letter Content
  const modalLetterTitle = document.getElementById('modalLetterTitle');
  const modalLetterBody = document.getElementById('modalLetterBody');
  const modalLetterClosing = document.getElementById('modalLetterClosing');
  const modalLetterSignOff = document.getElementById('modalLetterSignOff');

  if (modalLetterTitle && CONFIG.loveLetter) {
    modalLetterTitle.textContent = CONFIG.loveLetter.title;
    let paragraphsHTML = `<p class="salutation"><b>${CONFIG.loveLetter.salutation}</b></p>`;
    paragraphsHTML += CONFIG.loveLetter.paragraphs.map(p => `<p>${p}</p>`).join('');
    modalLetterBody.innerHTML = paragraphsHTML;
    modalLetterClosing.textContent = CONFIG.loveLetter.closing;
    modalLetterSignOff.textContent = CONFIG.loveLetter.signOff;
  }

  // Render Expanded Timeline Items (7 Items)
  const timelineContainer = document.getElementById('timelineContainer');
  if (timelineContainer && CONFIG.timeline) {
    timelineContainer.innerHTML = CONFIG.timeline.map(t => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-card glass-panel">
          <div class="timeline-date">${t.date} • <span class="badge">${t.tag}</span></div>
          <h3 class="timeline-title">${t.title}</h3>
          ${t.image ? `<img src="${t.image}" alt="${t.title}" class="timeline-img">` : ''}
          <p class="timeline-desc">${t.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Render 10 Reasons Grid
  const reasonsGrid = document.getElementById('reasonsGrid');
  if (reasonsGrid && CONFIG.reasonsToLove) {
    reasonsGrid.innerHTML = CONFIG.reasonsToLove.map(r => `
      <div class="reason-card glass-panel">
        <div class="reason-num">${r.num}</div>
        <div class="reason-text">${r.text}</div>
      </div>
    `).join('');
  }

  // Footer Sender Name
  const senderNameFooter = document.getElementById('senderNameFooter');
  if (senderNameFooter && CONFIG.senderName) {
    senderNameFooter.textContent = CONFIG.senderName;
  }
}

/* ====================================================================
   2. PASSWORD / PIN ENCRYPTION & UNLOCK GATE
   ==================================================================== */
function initPasscodeProtection() {
  const lockScreen = document.getElementById('lockScreen');
  const mainContent = document.getElementById('mainContent');
  const passcodeInput = document.getElementById('passcodeInput');
  const unlockBtn = document.getElementById('unlockBtn');
  const hintBtn = document.getElementById('hintBtn');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const lockMessage = document.getElementById('lockMessage');
  const hintMessage = document.getElementById('hintMessage');

  // Toggle Password Masking
  if (togglePasswordBtn && passcodeInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const type = passcodeInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passcodeInput.setAttribute('type', type);
      togglePasswordBtn.innerHTML = type === 'password' 
        ? '<i class="fa-solid fa-eye"></i>' 
        : '<i class="fa-solid fa-eye-slash"></i>';
    });
  }

  // Show Passcode Hint
  if (hintBtn && hintMessage) {
    hintBtn.addEventListener('click', () => {
      hintMessage.textContent = CONFIG.passcodeHint || "குறிப்பு இல்லை";
      hintMessage.style.display = 'block';
    });
  }

  // Validate Passcode Function
  function handleUnlock() {
    const entered = passcodeInput.value.trim();
    if (entered === CONFIG.passcode) {
      lockMessage.style.color = '#4caf50';
      lockMessage.textContent = "ரகசிய எண் சரி! உள்ளே நுழைகிறது... ✨";
      
      // Trigger Confetti & Burst
      triggerConfettiBurst();

      // Smooth Unlock Transition
      setTimeout(() => {
        lockScreen.classList.remove('active');
        mainContent.classList.add('visible');

        // Autoplay Music
        const audio = document.getElementById('audioElement');
        if (audio) {
          audio.play().catch(err => console.log('Autoplay audio policy:', err));
        }
      }, 700);
    } else {
      lockMessage.style.color = '#ff4d4d';
      lockMessage.textContent = "தவறான ரகசிய எண்! மீண்டும் முயற்சிக்கவும்.";
      const lockCard = document.querySelector('.lock-card');
      if (lockCard) {
        lockCard.classList.add('shake');
        setTimeout(() => lockCard.classList.remove('shake'), 500);
      }
      passcodeInput.value = '';
    }
  }

  if (unlockBtn) unlockBtn.addEventListener('click', handleUnlock);
  if (passcodeInput) {
    passcodeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUnlock();
    });
  }
}

/* ====================================================================
   3. COUNTDOWN & RELATIONSHIP DAYS COUNTER
   ==================================================================== */
function initCountdownAndCounters() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const daysTogetherNum = document.getElementById('daysTogetherNum');

  // Calculate Days Together Count
  if (daysTogetherNum && CONFIG.relationshipStartDate) {
    const startDate = new Date(CONFIG.relationshipStartDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Animate Number Count Up
    let count = 0;
    const speed = Math.max(1, Math.floor(diffDays / 60));
    const timer = setInterval(() => {
      count += speed;
      if (count >= diffDays) {
        count = diffDays;
        clearInterval(timer);
      }
      daysTogetherNum.textContent = count.toLocaleString('en-US');
    }, 20);
  }

  // Live Birthday Countdown Timer
  function updateCountdown() {
    if (!CONFIG.birthdayTargetDate) return;
    const target = new Date(CONFIG.birthdayTargetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = days < 10 ? '0' + days : days;
    if (hoursEl) hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    if (minutesEl) minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    if (secondsEl) secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ====================================================================
   4. AUDIO PLAYLIST CONTROLLER WIDGET
   ==================================================================== */
function initMusicPlayer() {
  const playlist = CONFIG.playlist || [];
  if (playlist.length === 0) return;

  let currentTrackIndex = 0;
  const audio = document.getElementById('audioElement');
  const playerCover = document.getElementById('playerCover');
  const playerTitle = document.getElementById('playerTitle');
  const playerArtist = document.getElementById('playerArtist');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const prevTrackBtn = document.getElementById('prevTrackBtn');
  const nextTrackBtn = document.getElementById('nextTrackBtn');
  const visualizer = document.getElementById('visualizer');

  function loadTrack(index) {
    const track = playlist[index];
    if (!track) return;
    audio.src = track.src;
    playerTitle.textContent = track.title;
    playerArtist.textContent = track.artist;
    if (playerCover && track.cover) playerCover.src = track.cover;
  }

  function togglePlay() {
    if (audio.paused) {
      audio.play().then(() => {
        updatePlayerUI(true);
      }).catch(err => console.log('Audio play error:', err));
    } else {
      audio.pause();
      updatePlayerUI(false);
    }
  }

  function updatePlayerUI(isPlaying) {
    if (isPlaying) {
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      if (playerCover) playerCover.classList.add('spinning');
      if (visualizer) visualizer.classList.add('playing');
    } else {
      playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      if (playerCover) playerCover.classList.remove('spinning');
      if (visualizer) visualizer.classList.remove('playing');
    }
  }

  loadTrack(currentTrackIndex);

  if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);

  if (nextTrackBtn) {
    nextTrackBtn.addEventListener('click', () => {
      currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
      loadTrack(currentTrackIndex);
      audio.play().then(() => updatePlayerUI(true));
    });
  }

  if (prevTrackBtn) {
    prevTrackBtn.addEventListener('click', () => {
      currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      loadTrack(currentTrackIndex);
      audio.play().then(() => updatePlayerUI(true));
    });
  }

  audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play().then(() => updatePlayerUI(true));
  });
}

/* ====================================================================
   5. THEME (LIGHT/DARK) & PARTICLE (HEARTS/BALLOONS) SWITCHER
   ==================================================================== */
function initThemeAndParticleCustomizer() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeLabel = document.getElementById('themeLabel');
  const particleToggleBtn = document.getElementById('particleToggleBtn');
  const particleLabel = document.getElementById('particleLabel');

  // Toggle Theme (Dark / Light)
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('theme-dark');
      if (isDark) {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i> <span id="themeLabel">பகல் தீம் ☀️</span>';
      } else {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i> <span id="themeLabel">இரவு தீம் 🌙</span>';
      }
    });
  }

  // Toggle Particle Mode (Hearts / Balloons)
  if (particleToggleBtn) {
    particleToggleBtn.addEventListener('click', () => {
      if (currentParticleMode === 'hearts') {
        currentParticleMode = 'balloons';
        particleToggleBtn.innerHTML = '<i class="fa-solid fa-balloon"></i> <span id="particleLabel">பலூன்கள் 🎈</span>';
      } else {
        currentParticleMode = 'hearts';
        particleToggleBtn.innerHTML = '<i class="fa-solid fa-heart"></i> <span id="particleLabel">இதயங்கள் 💖</span>';
      }
    });
  }
}

/* ====================================================================
   6. FLOATING HEARTS & BALLOONS CANVAS PHYSICS
   ==================================================================== */
function initHeartsAndBalloonsCanvas() {
  const canvas = document.getElementById('heartsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const heartSymbols = ['💗', '💖', '💕', '🌹', '✨', '🌸'];
  const balloonSymbols = ['🎈', '🎉', '🎁', '🎈', '✨', '🎈'];
  const particles = [];
  const maxParticles = 30;

  class FloatingParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 50;
      this.size = Math.random() * 22 + 14;
      this.speedY = Math.random() * 1.6 + 0.8;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
      this.opacity = Math.random() * 0.75 + 0.25;
      this.swingSpeed = Math.random() * 0.03 + 0.01;
      this.swing = Math.random() * Math.PI * 2;
    }
    update() {
      this.y -= this.speedY;
      this.swing += this.swingSpeed;
      this.x += Math.sin(this.swing) * 0.8;
      if (this.y < -40) {
        this.reset();
      }
    }
    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.font = `${this.size}px sans-serif`;
      const pool = currentParticleMode === 'hearts' ? heartSymbols : balloonSymbols;
      const symbol = pool[Math.floor(this.x) % pool.length];
      ctx.fillText(symbol, this.x, this.y);
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    const p = new FloatingParticle();
    p.y = Math.random() * height;
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ====================================================================
   7. FULL SCREEN CONFETTI & FIREWORKS SYSTEM
   ==================================================================== */
let triggerConfettiBurst = function() {};

function initConfettiEngine() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let confettiPieces = [];
  const colors = ['#ff3b68', '#ffd700', '#ffb3c6', '#9d4edd', '#4cc9f0', '#ffffff'];

  class Confetti {
    constructor(x, y) {
      this.x = x || Math.random() * width;
      this.y = y || -20;
      this.size = Math.random() * 10 + 6;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speedY = Math.random() * 4 + 2;
      this.speedX = (Math.random() - 0.5) * 4;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 10;
      this.opacity = 1;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;
      if (this.y > height) {
        this.opacity -= 0.02;
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }

  triggerConfettiBurst = function() {
    for (let i = 0; i < 120; i++) {
      confettiPieces.push(new Confetti(width / 2, height / 3));
    }
  };

  function animate() {
    ctx.clearRect(0, 0, width, height);
    confettiPieces.forEach((c, index) => {
      c.update();
      c.draw();
      if (c.opacity <= 0 || c.y > height + 50) {
        confettiPieces.splice(index, 1);
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ====================================================================
   8. INTERACTIVE EVENTS (Envelope, Buttons & Cursor Trails)
   ==================================================================== */
function initInteractiveEvents() {
  const envelope = document.getElementById('envelope');
  const letterModal = document.getElementById('letterModal');
  const closeLetterBtn = document.getElementById('closeLetterBtn');

  function openLetterModal() {
    if (envelope) envelope.classList.add('open');
    setTimeout(() => {
      if (letterModal) letterModal.classList.add('active');
    }, 400);
  }

  if (envelope) envelope.addEventListener('click', openLetterModal);
  if (closeLetterBtn) {
    closeLetterBtn.addEventListener('click', () => {
      if (letterModal) letterModal.classList.remove('active');
    });
  }

  if (letterModal) {
    letterModal.addEventListener('click', (e) => {
      if (e.target === letterModal) {
        letterModal.classList.remove('active');
      }
    });
  }

  const sendLoveBtn = document.getElementById('sendLoveBtn');
  const fireworksBtn = document.getElementById('fireworksBtn');

  if (sendLoveBtn) {
    sendLoveBtn.addEventListener('click', () => {
      triggerConfettiBurst();
      createFlyingHeartCluster();
    });
  }

  if (fireworksBtn) {
    fireworksBtn.addEventListener('click', () => {
      triggerConfettiBurst();
      setTimeout(triggerConfettiBurst, 300);
      setTimeout(triggerConfettiBurst, 600);
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target.closest('#lockScreen') || e.target.closest('button')) return;
    createSingleFlyingHeart(e.clientX, e.clientY);
  });
}

function createSingleFlyingHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'click-heart';
  heart.innerHTML = currentParticleMode === 'hearts' ? '💖' : '🎈';
  heart.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    font-size: 24px;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%) scale(1);
    transition: transform 0.8s ease-out, opacity 0.8s ease-out;
  `;
  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.transform = `translate(-50%, -100px) scale(1.6)`;
    heart.style.opacity = '0';
  });

  setTimeout(() => heart.remove(), 800);
}

function createFlyingHeartCluster() {
  for (let i = 0; i < 15; i++) {
    const randomX = window.innerWidth / 2 + (Math.random() - 0.5) * 300;
    const randomY = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
    setTimeout(() => createSingleFlyingHeart(randomX, randomY), i * 60);
  }
}
