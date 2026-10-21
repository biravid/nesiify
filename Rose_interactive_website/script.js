/**
 * NESIIFY CINEMATIC SURPRISE OPENING & ENVELOPE REVEAL
 *
 * Preserved Sequence:
 * 1. Fullscreen Automatic Countdown (3, 2, 1) every 2 seconds
 * 2. Floating Iridescent Bubbles & Magnetic Merge into Name
 * 3. Animated Flower Bloom & Falling Petals
 * 4. 'Open Your Surprise' Button
 *
 * New Interactive Sequence (Post-Button):
 * 5. Cinematic Portal Transition
 * 6. Stage 1: 'Wait... 👀'
 * 7. Stage 2: Animated Sequential Story Messages
 * 8. Stage 3: Sealed Envelope with 3D Opening, Wax Seal Break & Dynamic Letter Reveal
 * 9. 'There's more waiting...' and 'Continue →'
 */

(function () {
  'use strict';

  // Configuration with fallbacks
  const config = window.SURPRISE_CONFIG || {
    recipientName: "Ananya",
    subtitle: "Every moment is a memory waiting to blossom ✨",
    senderName: "Someone who adores you",
    envelopeNote: "Made especially for you ❤️",
    targetUrl: "../Paralax-pink/index.html",
    timings: {
      countdownInterval: 2000,
      bubbleFloatDuration: 2200,
      bubbleMergeDuration: 900,
      flowerBloomDuration: 2600
    },
    audio: { enabled: true, volume: 0.35 },
    bubbles: { count: 24 }
  };

  const timings = config.timings || {
    countdownInterval: 2000,
    bubbleFloatDuration: 2200,
    bubbleMergeDuration: 900,
    flowerBloomDuration: 2600
  };

  // DOM Elements - Stage 1 & 2
  const appEl = document.getElementById('app');
  const ambientCanvas = document.getElementById('ambient-canvas');
  const flowerCanvas = document.getElementById('flower-canvas');
  const burstCanvas = document.getElementById('burst-canvas');
  const petalNameCanvas = document.getElementById('petal-name-canvas');
  const bubbleField = document.getElementById('bubble-field');
  const soundToggleBtn = document.getElementById('sound-toggle');
  const countdownStage = document.getElementById('countdown-stage');
  const countdownDisplay = document.getElementById('countdown-display');
  const countdownSubtext = document.getElementById('countdown-subtext');
  const timerCircle = document.getElementById('timer-progress-circle');
  const showcaseStage = document.getElementById('showcase-stage');
  const nameCard = document.querySelector('.name-card');
  const recipientNameEl = document.getElementById('recipient-name');
  const nameSubtitleEl = document.getElementById('name-subtitle');
  const actionWrapper = document.getElementById('action-wrapper');
  const openSurpriseBtn = document.getElementById('open-surprise-btn');
  const transitionPortal = document.getElementById('transition-portal');

  // DOM Elements - Stage 3 Envelope Experience
  const envelopeExperienceStage = document.getElementById('envelope-experience-stage');
  const substageWait = document.getElementById('substage-wait');
  const substageMessages = document.getElementById('substage-messages');
  const storyMessageText = document.getElementById('story-message-text');
  const messageProgressFill = document.getElementById('message-progress-fill');
  const substageEnvelope = document.getElementById('substage-envelope');
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const envelopeFlap = document.getElementById('envelope-flap');
  const waxSeal = document.getElementById('wax-seal');
  const letterCard = document.getElementById('letter-card');
  const envelopeDynamicNote = document.getElementById('envelope-dynamic-note');
  const envelopeDynamicSender = document.getElementById('envelope-dynamic-sender');
  const envelopeTapPrompt = document.getElementById('envelope-tap-prompt');
  const continueStageBtn = document.getElementById('continue-stage-btn');

  // Populate Config
  if (recipientNameEl) recipientNameEl.textContent = config.recipientName;
  if (nameSubtitleEl) nameSubtitleEl.textContent = config.subtitle;
  if (envelopeDynamicNote) envelopeDynamicNote.textContent = config.envelopeNote || "Made especially for you ❤️";
  if (envelopeDynamicSender) envelopeDynamicSender.textContent = `From ${config.senderName || 'Someone who adores you'}`;

  let width = window.innerWidth;
  let height = window.innerHeight;

  /* ==========================================================================
     WEB AUDIO SYNTHESIZER (Pure Web Audio API)
     ========================================================================== */
  let audioCtx = null;
  let isMuted = !config.audio.enabled;

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playChime(freq, type = 'sine', duration = 1.2, delay = 0) {
    if (isMuted || !audioCtx) return;
    try {
      const startTime = audioCtx.currentTime + delay;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(config.audio.volume, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch (e) {
      // Audio context safe ignore
    }
  }

  function playHarpChord(notes, stagger = 0.09) {
    if (isMuted || !audioCtx) return;
    notes.forEach((freq, idx) => {
      playChime(freq, 'sine', 1.8, idx * stagger);
    });
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      isMuted = !isMuted;
      soundToggleBtn.innerHTML = isMuted ? '🔇' : '✨';
      soundToggleBtn.setAttribute('aria-label', isMuted ? 'Unmute Sound' : 'Mute Sound');
      if (!isMuted) {
        playChime(784, 'sine', 0.8);
      }
    });
  }

  /* ==========================================================================
     CANVAS 1: AMBIENT FLOATING STARS (60FPS)
     ========================================================================== */
  const ambientCtx = ambientCanvas.getContext('2d');
  let stars = [];

  function resizeCanvases() {
    width = window.innerWidth;
    height = window.innerHeight;
    const fac = document.getElementById('final-ambient-canvas');
    const hac = document.getElementById('heart-ambient-canvas');
    [ambientCanvas, flowerCanvas, burstCanvas, petalNameCanvas, fac, hac].forEach(c => {
      if (c) {
        c.width = width;
        c.height = height;
      }
    });
    initStars();
  }

  function initStars() {
    stars = [];
    const count = Math.min(Math.floor((width * height) / 9500), 75);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.25 + 0.1,
        color: Math.random() > 0.4 ? '#ffd166' : '#f472b6',
        twinkleSpeed: Math.random() * 0.02 + 0.01
      });
    }
  }

  function renderAmbient() {
    ambientCtx.clearRect(0, 0, width, height);
    stars.forEach(star => {
      star.y -= star.speed;
      if (star.y < 0) {
        star.y = height;
        star.x = Math.random() * width;
      }
      star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
      star.alpha = Math.max(0.2, Math.min(0.85, star.alpha));

      ambientCtx.beginPath();
      ambientCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ambientCtx.fillStyle = star.color;
      ambientCtx.globalAlpha = star.alpha;
      ambientCtx.shadowBlur = 5;
      ambientCtx.shadowColor = star.color;
      ambientCtx.fill();
    });
    ambientCtx.globalAlpha = 1;
    ambientCtx.shadowBlur = 0;
    requestAnimationFrame(renderAmbient);
  }

  /* ==========================================================================
     CANVAS 2: TOUCH & CLICK PARTICLES (HEARTS & SPARKS)
     ========================================================================== */
  const burstCtx = burstCanvas.getContext('2d');
  let sparks = [];

  function addTapBurst(x, y, count = 18) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() * 0.4 - 0.2);
      const velocity = Math.random() * 4.5 + 2;
      sparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: Math.random() * 3.5 + 2,
        alpha: 1,
        color: i % 2 === 0 ? '#ffd166' : (i % 3 === 0 ? '#f472b6' : '#ffffff'),
        isHeart: i % 4 === 0,
        decay: Math.random() * 0.025 + 0.015
      });
    }
  }

  function renderSparks() {
    burstCtx.clearRect(0, 0, width, height);
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.08;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      burstCtx.save();
      burstCtx.globalAlpha = s.alpha;
      burstCtx.fillStyle = s.color;
      burstCtx.shadowBlur = 8;
      burstCtx.shadowColor = s.color;

      if (s.isHeart) {
        burstCtx.translate(s.x, s.y);
        burstCtx.scale(s.size * 0.28, s.size * 0.28);
        burstCtx.beginPath();
        burstCtx.moveTo(0, 0);
        burstCtx.bezierCurveTo(-2, -3, -5, -1, -5, 2);
        burstCtx.bezierCurveTo(-5, 5, 0, 7, 0, 9);
        burstCtx.bezierCurveTo(0, 7, 5, 5, 5, 2);
        burstCtx.bezierCurveTo(5, -1, 2, -3, 0, 0);
        burstCtx.fill();
      } else {
        burstCtx.beginPath();
        burstCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        burstCtx.fill();
      }
      burstCtx.restore();
    }
    requestAnimationFrame(renderSparks);
  }

  /* ==========================================================================
     CANVAS 3: BOTANICAL FLOWER BLOOM & DRIFTING PETALS
     ========================================================================== */
  const flowerCtx = flowerCanvas.getContext('2d');
  let flowerGrowthProgress = 0;
  let isBlooming = false;
  let fallingPetals = [];

  function startFlowerBloom() {
    isBlooming = true;
    flowerGrowthProgress = 0;

    fallingPetals = [];
    for (let i = 0; i < 28; i++) {
      fallingPetals.push({
        x: Math.random() * width,
        y: Math.random() * -height * 0.7,
        vx: Math.random() * 1.2 - 0.4,
        vy: Math.random() * 1.5 + 1.2,
        size: Math.random() * 12 + 10,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: Math.random() * 0.03 - 0.015,
        color: Math.random() > 0.5 ? 'rgba(251, 182, 206, 0.85)' : 'rgba(244, 114, 182, 0.78)',
        wobble: Math.random() * Math.PI * 2
      });
    }

    playHarpChord([440, 554.37, 659.25, 830.61, 880, 1108.73], 0.12);
  }

  function drawPetalShape(ctx, x, y, size, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(size * 0.6, -size * 0.8, size, 0);
    ctx.quadraticCurveTo(size * 0.6, size * 0.8, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  function drawRose(ctx, x, y, scale, progress) {
    if (progress <= 0) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale * progress, scale * progress);

    const petalCount = 14;
    for (let i = 0; i < petalCount; i++) {
      const pAngle = (i * 0.85);
      const dist = (i / petalCount) * 18;
      const petalSize = 14 + (i * 1.4);
      const px = Math.cos(pAngle) * dist;
      const py = Math.sin(pAngle) * dist;
      const alpha = Math.min(1, progress * 1.5);
      const petalColor = i < 4 
        ? `rgba(255, 230, 240, ${alpha})`
        : (i < 9 ? `rgba(244, 114, 182, ${alpha * 0.9})` : `rgba(219, 39, 119, ${alpha * 0.85})`);
      
      drawPetalShape(ctx, px, py, petalSize, pAngle + Math.PI / 2, petalColor);
    }

    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd166';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#ffd166';
    ctx.fill();
    ctx.restore();
  }

  function renderFlowers() {
    flowerCtx.clearRect(0, 0, width, height);

    if (isBlooming) {
      if (flowerGrowthProgress < 1) {
        flowerGrowthProgress += 0.012;
      }

      const botY = height;
      const leftX = width * 0.12;
      const rightX = width * 0.88;

      flowerCtx.save();
      flowerCtx.lineWidth = 3;
      flowerCtx.strokeStyle = 'rgba(74, 222, 128, 0.45)';
      flowerCtx.shadowBlur = 6;
      flowerCtx.shadowColor = 'rgba(74, 222, 128, 0.6)';

      flowerCtx.beginPath();
      flowerCtx.moveTo(0, botY);
      flowerCtx.quadraticCurveTo(leftX * 0.5, botY - (150 * flowerGrowthProgress), leftX, botY - (240 * flowerGrowthProgress));
      flowerCtx.stroke();

      flowerCtx.beginPath();
      flowerCtx.moveTo(width, botY);
      flowerCtx.quadraticCurveTo(width - (width * 0.06), botY - (150 * flowerGrowthProgress), rightX, botY - (240 * flowerGrowthProgress));
      flowerCtx.stroke();
      flowerCtx.restore();

      drawRose(flowerCtx, leftX * 0.6, botY - (130 * flowerGrowthProgress), 1.15, flowerGrowthProgress);
      drawRose(flowerCtx, leftX, botY - (240 * flowerGrowthProgress), 1.4, Math.max(0, flowerGrowthProgress - 0.1) / 0.9);
      drawRose(flowerCtx, leftX * 1.35, botY - (85 * flowerGrowthProgress), 0.95, Math.max(0, flowerGrowthProgress - 0.2) / 0.8);

      drawRose(flowerCtx, width - (leftX * 0.6), botY - (130 * flowerGrowthProgress), 1.15, flowerGrowthProgress);
      drawRose(flowerCtx, rightX, botY - (240 * flowerGrowthProgress), 1.4, Math.max(0, flowerGrowthProgress - 0.1) / 0.9);
      drawRose(flowerCtx, width - (leftX * 1.35), botY - (85 * flowerGrowthProgress), 0.95, Math.max(0, flowerGrowthProgress - 0.2) / 0.8);

      fallingPetals.forEach(p => {
        p.wobble += 0.03;
        p.x += p.vx + Math.sin(p.wobble) * 0.8;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        drawPetalShape(flowerCtx, p.x, p.y, p.size, p.rotation, p.color);
      });
    }

    requestAnimationFrame(renderFlowers);
  }

  /* ==========================================================================
     STAGE 1: AUTOMATIC CINEMATIC COUNTDOWN (3, 2, 1) EVERY 2 SECONDS
     ========================================================================== */
  const COUNTDOWN_STEPS = [
    { num: "3", sub: "Get ready for something magical...", freq: 523.25 },
    { num: "2", sub: "A special moment prepared for you...", freq: 659.25 },
    { num: "1", sub: "Here comes the magic ✨", freq: 783.99 }
  ];

  function startCountdownTimer(index = 0) {
    if (index >= COUNTDOWN_STEPS.length) {
      countdownStage.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      countdownStage.style.opacity = '0';
      countdownStage.style.transform = 'scale(1.1)';
      setTimeout(() => {
        countdownStage.classList.remove('active');
        countdownStage.style.display = 'none';
        startPetalNameSequence();
      }, 700);
      return;
    }

    const step = COUNTDOWN_STEPS[index];

    countdownDisplay.style.animation = 'none';
    void countdownDisplay.offsetWidth;
    countdownDisplay.textContent = step.num;
    countdownDisplay.style.animation = 'numberBurst 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

    countdownSubtext.style.opacity = '0';
    setTimeout(() => {
      countdownSubtext.textContent = step.sub;
      countdownSubtext.style.opacity = '1';
    }, 200);

    playChime(step.freq, 'sine', 1.0);

    const intervalMs = timings.countdownInterval || 2000;
    if (timerCircle) {
      timerCircle.style.transition = 'none';
      timerCircle.style.strokeDashoffset = '0';
      void timerCircle.offsetWidth;
      timerCircle.style.transition = `stroke-dashoffset ${intervalMs}ms linear`;
      timerCircle.style.strokeDashoffset = '440';
    }

    setTimeout(() => {
      startCountdownTimer(index + 1);
    }, intervalMs);
  }

  /* ==========================================================================
     STAGE 2: FLOATING PETALS & FORMATION INTO RECIPIENT'S NAME
     ========================================================================== */
  let petalNameCtx = petalNameCanvas ? petalNameCanvas.getContext('2d') : null;
  let petalNameAnimId = null;
  let namePetals = [];
  let ambientPetals = [];
  let petalSequenceState = 'idle'; // 'floating', 'converging', 'formed', 'fading'
  let sequenceStartTime = 0;

  // Romantic luxury color palette for petals
  const PETAL_PALETTES = [
    ['#fff1f2', '#fda4af', '#f43f5e'], // Blush Rose
    ['#ffe4e6', '#fb7185', '#e11d48'], // Velvet Carmine
    ['#fffbeb', '#fef08a', '#f472b6'], // Champagne Pearl
    ['#fdf2f8', '#f472b6', '#db2777'], // Soft Orchid Pink
    ['#ffffff', '#fbcfe8', '#f43f5e']  // Pure Rose Silk
  ];

  // Draw an individual organic rose petal with bezier curvature, gradient & vein
  function drawRosePetal(ctx, x, y, size, angle, palette, opacity, scaleX = 1, scaleY = 1.1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scaleX, scaleY);
    ctx.globalAlpha = Math.max(0, Math.min(1, opacity));

    // Petal outer bezier path
    ctx.beginPath();
    ctx.moveTo(0, size * 0.52);
    ctx.bezierCurveTo(size * 0.48, size * 0.26, size * 0.58, -size * 0.22, 0, -size * 0.56);
    ctx.bezierCurveTo(-size * 0.58, -size * 0.22, -size * 0.48, size * 0.26, 0, size * 0.52);
    ctx.closePath();

    // Linear gradient across petal length
    const grad = ctx.createLinearGradient(0, -size * 0.56, 0, size * 0.52);
    grad.addColorStop(0, palette[0]);
    grad.addColorStop(0.55, palette[1]);
    grad.addColorStop(1, palette[2]);
    ctx.fillStyle = grad;
    ctx.shadowColor = 'rgba(244, 63, 94, 0.32)';
    ctx.shadowBlur = 6;
    ctx.fill();

    // Delicate inner vein highlight
    ctx.beginPath();
    ctx.moveTo(0, size * 0.42);
    ctx.quadraticCurveTo(size * 0.05, 0, 0, -size * 0.4);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  }

  // Sample target coordinates from recipient's name glyphs using an offscreen canvas
  function sampleNameGlyphPoints(recipientName) {
    const cleanName = (recipientName || "Ananya").trim().toUpperCase();
    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d');

    // Dynamic responsive font size: ensure name fits inside 82% of screen width
    const maxAvailableWidth = Math.min(width * 0.82, 750);
    let fontSize = Math.floor(maxAvailableWidth / Math.max(cleanName.length * 0.65, 4.2));
    fontSize = Math.max(30, Math.min(80, fontSize));

    const fontString = `bold ${fontSize}px "Cinzel Decorative", "Cinzel", "Playfair Display", "Montserrat", Georgia, serif`;
    offCtx.font = fontString;
    const textMetrics = offCtx.measureText(cleanName);
    const textWidth = Math.ceil(textMetrics.width);
    const textHeight = Math.ceil(fontSize * 1.35);

    offscreen.width = textWidth + 60;
    offscreen.height = textHeight + 60;

    // Render high-contrast black glyphs on transparent background
    offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
    offCtx.fillStyle = '#000000';
    offCtx.font = fontString;
    offCtx.textBaseline = 'middle';
    offCtx.textAlign = 'center';
    offCtx.fillText(cleanName, offscreen.width / 2, offscreen.height / 2);

    const imgData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
    const pixels = imgData.data;

    // Scan pixels for opaque stroke areas
    const candidates = [];
    const stride = Math.max(3, Math.floor(fontSize / 13));
    for (let y = 0; y < offscreen.height; y += stride) {
      for (let x = 0; x < offscreen.width; x += stride) {
        const alpha = pixels[(y * offscreen.width + x) * 4 + 3];
        if (alpha > 140) {
          candidates.push({
            relX: x - offscreen.width / 2,
            relY: y - offscreen.height / 2
          });
        }
      }
    }

    // Adaptively downsample to optimal petal count: 100 to 145 petals
    const targetCount = Math.max(80, Math.min(145, Math.floor(candidates.length * 0.42) || 110));
    let selected = [];
    if (candidates.length <= targetCount) {
      selected = candidates;
    } else {
      const step = candidates.length / targetCount;
      for (let i = 0; i < targetCount; i++) {
        selected.push(candidates[Math.floor(i * step)]);
      }
    }

    // Center coordinates relative to screen (matching name card placement)
    const targetCenterX = width / 2;
    const targetCenterY = height / 2 - 35;

    return selected.map(pt => ({
      targetX: targetCenterX + pt.relX,
      targetY: targetCenterY + pt.relY,
      relX: pt.relX,
      relY: pt.relY
    }));
  }

  // Smooth easing function for fluid convergence (cubic ease-in-out)
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function startPetalNameSequence() {
    if (!petalNameCanvas) return;
    petalNameCtx = petalNameCanvas.getContext('2d');
    petalNameCanvas.width = width;
    petalNameCanvas.height = height;
    petalNameCanvas.style.opacity = '1';

    // Sample glyph points for dynamic recipient name
    const glyphTargets = sampleNameGlyphPoints(config.recipientName || "Ananya");

    // Initialize forming petals
    namePetals = glyphTargets.map((target, idx) => {
      // Spawn naturally from edges or spread across screen
      const angle = Math.random() * Math.PI * 2;
      const spawnDist = Math.max(width, height) * 0.45 + Math.random() * 150;
      const startX = width / 2 + Math.cos(angle) * spawnDist;
      const startY = height / 2 + Math.sin(angle) * spawnDist;

      const palette = PETAL_PALETTES[Math.floor(Math.random() * PETAL_PALETTES.length)];
      const baseSize = Math.random() * 7 + 14;

      return {
        startX: startX,
        startY: startY,
        currentX: startX,
        currentY: startY,
        targetX: target.targetX,
        targetY: target.targetY,
        size: baseSize,
        palette: palette,
        opacity: 0,
        targetOpacity: Math.random() * 0.15 + 0.85,
        rotation: Math.random() * Math.PI * 2,
        targetRotation: (Math.random() - 0.5) * 1.2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        scaleX: Math.random() * 0.25 + 0.85,
        scaleY: Math.random() * 0.3 + 1.0,
        wobbleSpeed: Math.random() * 0.025 + 0.015,
        wobbleOffset: Math.random() * Math.PI * 2,
        driftSpeedX: (Math.random() - 0.5) * 0.7,
        driftSpeedY: Math.random() * 0.5 + 0.3
      };
    });

    // Initialize ambient background petals that gently float across the scene
    ambientPetals = [];
    const ambientCount = 22;
    for (let i = 0; i < ambientCount; i++) {
      ambientPetals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 10,
        palette: PETAL_PALETTES[Math.floor(Math.random() * PETAL_PALETTES.length)],
        opacity: Math.random() * 0.4 + 0.3,
        speedY: Math.random() * 0.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        wobbleOffset: Math.random() * Math.PI * 2,
        scaleX: Math.random() * 0.2 + 0.8,
        scaleY: Math.random() * 0.25 + 0.95
      });
    }

    sequenceStartTime = performance.now();
    petalSequenceState = 'floating';

    // Play initial gentle harp chord as petals float in
    playHarpChord([523.25, 659.25, 783.99, 1046.50], 0.08);

    // Audio chime cue for convergence
    setTimeout(() => {
      playChime(659.25, 'triangle', 0.8);
      playChime(880, 'sine', 1.1, 0.25);
    }, 1800);

    // Audio cue for name completion / hold
    setTimeout(() => {
      playChime(1046.5, 'sine', 1.4, 0.05);
      playChime(1318.51, 'sine', 1.6, 0.25);
    }, 3200);

    // Trigger transition to Flower Bloom after cinematic hold
    setTimeout(() => {
      finishPetalSequenceAndBloom();
    }, 5400);

    if (petalNameAnimId) cancelAnimationFrame(petalNameAnimId);
    animatePetalNameLoop();
  }

  function animatePetalNameLoop() {
    if (!petalNameCtx) return;
    const now = performance.now();
    const elapsed = now - sequenceStartTime;

    petalNameCtx.clearRect(0, 0, width, height);

    // Phase 1: 0 - 1800ms -> Floating Petal Appearance & Drift
    // Phase 2: 1800 - 3200ms (duration 1400ms) -> Gentle Convergence into Name
    // Phase 3: 3200 - 5400ms -> Formed Name Presentation & Cinematic Hold
    // Phase 4: > 5400ms -> Hand-off to Flower Bloom

    // Render ambient drifting background petals first
    ambientPetals.forEach(ap => {
      ap.y += ap.speedY;
      ap.x += ap.speedX + Math.sin(now * 0.002 + ap.wobbleOffset) * 0.4;
      ap.rotation += ap.rotationSpeed;

      if (ap.y > height + 30) {
        ap.y = -30;
        ap.x = Math.random() * width;
      }
      if (ap.x < -30) ap.x = width + 30;
      if (ap.x > width + 30) ap.x = -30;

      drawRosePetal(
        petalNameCtx,
        ap.x,
        ap.y,
        ap.size,
        ap.rotation,
        ap.palette,
        ap.opacity,
        ap.scaleX,
        ap.scaleY
      );
    });

    // Render name-forming petals
    namePetals.forEach(p => {
      if (elapsed < 1800) {
        // Phase 1: Floating
        const fadeIn = Math.min(1, elapsed / 800);
        p.opacity = p.targetOpacity * fadeIn;

        // Floating movement with gentle drift and wobble
        p.currentX = p.startX + Math.sin(now * 0.0015 + p.wobbleOffset) * 25 + (elapsed * 0.02 * p.driftSpeedX);
        p.currentY = p.startY + Math.cos(now * 0.0015 + p.wobbleOffset) * 15 + (elapsed * 0.03 * p.driftSpeedY);
        p.rotation += p.rotationSpeed;
      } else if (elapsed < 3200) {
        // Phase 2: Converging
        const convergeProgress = Math.min(1, (elapsed - 1800) / 1400);
        const easedT = easeInOutCubic(convergeProgress);

        // Interpolate position from float position to target glyph position
        const fromX = p.startX + Math.sin((sequenceStartTime + 1800) * 0.0015 + p.wobbleOffset) * 25;
        const fromY = p.startY + Math.cos((sequenceStartTime + 1800) * 0.0015 + p.wobbleOffset) * 15;

        p.currentX = fromX + (p.targetX - fromX) * easedT;
        p.currentY = fromY + (p.targetY - fromY) * easedT;

        // Align rotation toward target petal angle
        p.rotation += (p.targetRotation - p.rotation) * 0.04;
        p.opacity = p.targetOpacity;
      } else {
        // Phase 3 & 4: Formed Name Presentation & Cinematic Hold
        // Subtle micro-swaying and breathing motion so it does not look frozen
        const microSwayX = Math.sin(now * 0.0025 + p.wobbleOffset) * 1.4;
        const microSwayY = Math.cos(now * 0.0025 + p.wobbleOffset) * 1.4;
        const microRot = Math.sin(now * 0.002 + p.wobbleOffset) * 0.04;

        p.currentX = p.targetX + microSwayX;
        p.currentY = p.targetY + microSwayY;
        p.rotation = p.targetRotation + microRot;
      }

      drawRosePetal(
        petalNameCtx,
        p.currentX,
        p.currentY,
        p.size,
        p.rotation,
        p.palette,
        p.opacity,
        p.scaleX,
        p.scaleY
      );
    });

    // Formed name subtle golden/rose ambient glow
    if (elapsed >= 3200 && elapsed < 5400) {
      const glowT = Math.sin(now * 0.003) * 0.2 + 0.8;
      petalNameCtx.save();
      petalNameCtx.textAlign = 'center';
      petalNameCtx.textBaseline = 'middle';
      const cleanName = (config.recipientName || "Ananya").trim().toUpperCase();
      const maxW = Math.min(width * 0.82, 750);
      let fontSize = Math.floor(maxW / Math.max(cleanName.length * 0.65, 4.2));
      fontSize = Math.max(30, Math.min(80, fontSize));
      petalNameCtx.font = `bold ${fontSize}px "Cinzel Decorative", "Cinzel", "Playfair Display", serif`;
      petalNameCtx.shadowColor = 'rgba(255, 209, 102, 0.45)';
      petalNameCtx.shadowBlur = 18 * glowT;
      petalNameCtx.fillStyle = `rgba(255, 240, 245, ${0.12 * glowT})`;
      petalNameCtx.fillText(cleanName, width / 2, height / 2 - 35);
      petalNameCtx.restore();
    }

    petalNameAnimId = requestAnimationFrame(animatePetalNameLoop);
  }

  function finishPetalSequenceAndBloom() {
    petalSequenceState = 'fading';

    // Sparkle burst at center to announce the bloom
    addTapBurst(width / 2, height / 2 - 35, 28);
    addTapBurst(width / 2 - 30, height / 2 - 25, 14);
    addTapBurst(width / 2 + 30, height / 2 - 45, 14);

    // Reveal showcase stage and name card
    if (showcaseStage) showcaseStage.classList.add('active');
    if (nameCard) nameCard.classList.add('revealed');
    playHarpChord([523.25, 659.25, 783.99, 1046.50], 0.1);

    // Smoothly fade out petal name canvas over 800ms
    if (petalNameCanvas) {
      petalNameCanvas.style.transition = 'opacity 0.8s ease';
      petalNameCanvas.style.opacity = '0';
    }

    setTimeout(() => {
      if (petalNameAnimId) cancelAnimationFrame(petalNameAnimId);
      if (petalNameCtx) petalNameCtx.clearRect(0, 0, width, height);
      namePetals = [];
      ambientPetals = [];
    }, 850);

    // Trigger existing Flower Bloom sequence
    setTimeout(() => {
      startFlowerBloomSequence();
    }, 450);
  }

  /* ==========================================================================
     STAGE 3: FLOWER BLOOM & REVEAL OF 'OPEN YOUR SURPRISE' BUTTON
     ========================================================================== */
  function startFlowerBloomSequence() {
    startFlowerBloom();

    const bloomDuration = timings.flowerBloomDuration || 2600;
    setTimeout(() => {
      if (actionWrapper) {
        actionWrapper.classList.add('revealed');
      }
      playHarpChord([659.25, 783.99, 987.77, 1318.51], 0.1);
    }, bloomDuration);
  }

  /* ==========================================================================
     STAGE 4: 'OPEN YOUR SURPRISE' CLICK -> LAUNCH NEW ENVELOPE EXPERIENCE
     (Without redirecting to the old site!)
     ========================================================================== */
  if (openSurpriseBtn) {
    const handleOpenSurprise = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      initAudio();

      // Audio crescendo
      playHarpChord([523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98], 0.07);

      // Button tap burst
      const rect = openSurpriseBtn.getBoundingClientRect();
      addTapBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 26);

      // Trigger smooth cinematic portal flash
      if (transitionPortal) {
        transitionPortal.classList.add('ignite');
      }

      // Transition smoothly into the new envelope experience (no redirect)
      setTimeout(() => {
        // Hide initial showcase stage
        showcaseStage.classList.remove('active');
        showcaseStage.style.display = 'none';

        // Unveil envelope experience stage
        envelopeExperienceStage.classList.add('active');

        // Dismiss portal flash
        if (transitionPortal) {
          transitionPortal.classList.remove('ignite');
        }

        // Launch Post-Button Stage 1: 'Wait... 👀'
        launchPostButtonExperience();
      }, 850);
    };

    openSurpriseBtn.addEventListener('click', handleOpenSurprise);
    openSurpriseBtn.addEventListener('touchend', handleOpenSurprise, { passive: false });
  }

  /* ==========================================================================
     POST-BUTTON EXPERIENCE: STAGES 1, 2, and 3
     ========================================================================== */
  function launchPostButtonExperience() {
    // Stage 1: Display 'Wait... 👀'
    substageWait.classList.add('active');
    playChime(440, 'sine', 1.2); // Suspense A4

    // After 2 seconds, transition to Stage 2: Animated Story Messages
    setTimeout(() => {
      substageWait.classList.remove('active');
      setTimeout(() => {
        launchStoryMessages();
      }, 400);
    }, 2000);
  }

  // Stage 2: Animated Sequential Story Messages
  const STORY_MESSAGES = [
    { text: "Someone made something special for you", duration: 2300, freq: 523.25 },
    { text: "Every detail was chosen for you", duration: 2300, freq: 659.25 },
    { text: "Are you ready?", duration: 2000, freq: 783.99 }
  ];

  function launchStoryMessages(index = 0) {
    if (index === 0) {
      substageMessages.classList.add('active');
    }

    if (index >= STORY_MESSAGES.length) {
      // Finished all messages -> Fade out message container and launch Stage 3
      substageMessages.classList.remove('active');
      setTimeout(() => {
        launchEnvelopeStage();
      }, 500);
      return;
    }

    const currentMsg = STORY_MESSAGES[index];

    // Update progress bar
    const progressPercent = Math.round(((index + 1) / STORY_MESSAGES.length) * 100);
    if (messageProgressFill) {
      messageProgressFill.style.width = `${progressPercent}%`;
    }

    // Animate message text in
    storyMessageText.style.opacity = '0';
    storyMessageText.style.transform = 'translateY(10px)';

    setTimeout(() => {
      storyMessageText.textContent = currentMsg.text;
      storyMessageText.style.opacity = '1';
      storyMessageText.style.transform = 'translateY(0)';
      playChime(currentMsg.freq, 'sine', 1.1);
    }, 250);

    // Schedule next message
    setTimeout(() => {
      storyMessageText.style.opacity = '0';
      storyMessageText.style.transform = 'translateY(-10px)';

      setTimeout(() => {
        launchStoryMessages(index + 1);
      }, 400);
    }, currentMsg.duration);
  }

  // Stage 3: Sealed Envelope Reveal & Interactive Open
  let isEnvelopeOpened = false;

  function launchEnvelopeStage() {
    substageEnvelope.classList.add('active');
    playHarpChord([523.25, 659.25, 783.99, 1046.50], 0.1);

    // Add gentle spark burst around envelope
    const envRect = envelopeWrapper.getBoundingClientRect();
    const envCenterX = envRect.left + envRect.width / 2;
    const envCenterY = envRect.top + envRect.height / 2;
    addTapBurst(envCenterX, envCenterY, 16);
  }

  function openEnvelope() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    initAudio();

    // Wax seal location for burst
    const sealRect = waxSeal.getBoundingClientRect();
    const burstX = sealRect.left + sealRect.width / 2;
    const burstY = sealRect.top + sealRect.height / 2;

    // Break seal with particles & sound
    waxSeal.classList.add('broken');
    addTapBurst(burstX, burstY, 26);
    addTapBurst(burstX - 20, burstY, 14);
    addTapBurst(burstX + 20, burstY, 14);

    playChime(880, 'triangle', 0.6);
    playHarpChord([659.25, 783.99, 987.77, 1318.51], 0.08);

    // Open Flap in 3D
    envelopeFlap.classList.add('opened');

    // Hide tap hint
    if (envelopeTapPrompt) {
      envelopeTapPrompt.classList.add('hidden');
    }

    // Slide out Letter Card after flap opens
    setTimeout(() => {
      letterCard.classList.add('unveiled');
      playHarpChord([523.25, 659.25, 783.99, 1046.50, 1318.51], 0.1);
    }, 450);
  }

  // Envelope Tap Listener
  if (envelopeWrapper) {
    envelopeWrapper.addEventListener('click', (e) => {
      if (e.target.closest('#continue-stage-btn')) return;
      openEnvelope();
    });
  }

  if (envelopeTapPrompt) {
    envelopeTapPrompt.addEventListener('click', () => {
      openEnvelope();
    });
  }

  /* ==========================================================================
     STAGE 4: FLOATING ROSE GARDEN LAUNCH & INTERACTIONS
     ========================================================================== */
  const roseGardenStage = document.getElementById('rose-garden-stage');
  const gardenAmbientCanvas = document.getElementById('garden-ambient-canvas');
  const gardenTitle = document.getElementById('garden-title');
  const gardenSubtitle = document.getElementById('garden-subtitle');
  const roseDiscoveryDots = document.getElementById('rose-discovery-dots');
  const floatingRosesField = document.getElementById('floating-roses-field');
  const bouquetShowcase = document.getElementById('bouquet-showcase');
  const bouquetRosesCluster = document.getElementById('bouquet-roses-cluster');
  const bouquetInitials = document.getElementById('bouquet-initials');
  const takeBouquetBtn = document.getElementById('take-bouquet-btn');
  const photoMemoryModal = document.getElementById('photo-memory-modal');
  const memoryModalImg = document.getElementById('memory-modal-img');
  const memoryFallbackPlaceholder = document.getElementById('memory-fallback-placeholder');
  const fallbackCaptionText = document.getElementById('fallback-caption-text');
  const memoryModalCaption = document.getElementById('memory-modal-caption');
  const closeMemoryBtn = document.getElementById('close-memory-btn');

  // Handle 'Continue →' Click: Launch Floating Rose Garden
  if (continueStageBtn) {
    continueStageBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();

      const rect = continueStageBtn.getBoundingClientRect();
      addTapBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 24);

      playHarpChord([523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98], 0.06);

      // Light flash transition into Floating Rose Garden
      if (transitionPortal) {
        transitionPortal.classList.add('ignite');
      }

      setTimeout(() => {
        // Hide envelope stage
        envelopeExperienceStage.classList.remove('active');
        envelopeExperienceStage.style.display = 'none';

        // Unveil Rose Garden
        roseGardenStage.classList.add('active');

        if (transitionPortal) {
          transitionPortal.classList.remove('ignite');
        }

        launchFloatingRoseGarden();
      }, 750);
    });
  }

  // Floating Rose Garden State
  let gardenRosesData = [];
  let discoveredRosesCount = 0;
  let isBouquetLaunched = false;

  // Garden Ambient Canvas (Bokeh Orbs & Drifting Fairy Dust)
  const gardenCtx = gardenAmbientCanvas ? gardenAmbientCanvas.getContext('2d') : null;
  let gardenBokeh = [];

  function initGardenCanvas() {
    if (!gardenAmbientCanvas || !gardenCtx) return;
    gardenAmbientCanvas.width = width;
    gardenAmbientCanvas.height = height;

    gardenBokeh = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      gardenBokeh.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 22 + 8,
        alpha: Math.random() * 0.3 + 0.1,
        vx: Math.random() * 0.3 - 0.15,
        vy: Math.random() * -0.5 - 0.2,
        color: i % 2 === 0 ? 'rgba(244, 114, 182, ' : 'rgba(255, 215, 0, '
      });
    }
  }

  function renderGardenAmbient() {
    if (!gardenCtx) return;
    gardenCtx.clearRect(0, 0, width, height);

    gardenBokeh.forEach(b => {
      b.x += b.vx;
      b.y += b.vy;
      if (b.y < -30) {
        b.y = height + 30;
        b.x = Math.random() * width;
      }

      gardenCtx.beginPath();
      gardenCtx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      gardenCtx.fillStyle = `${b.color}${b.alpha})`;
      gardenCtx.shadowBlur = 12;
      gardenCtx.shadowColor = `${b.color}0.6)`;
      gardenCtx.fill();
    });

    if (roseGardenStage && roseGardenStage.classList.contains('active')) {
      requestAnimationFrame(renderGardenAmbient);
    }
  }

  // Create Realistic Natural Botanical Rose SVG Markup
  let roseSvgCounter = 0;
  function getRoseSvgMarkup() {
    roseSvgCounter++;
    const id = `rose-${roseSvgCounter}`;
    return `
      <svg class="rose-petals-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Sepal Gradient: Natural botanical green -->
          <linearGradient id="sepalGrad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4ade80" />
            <stop offset="45%" stop-color="#15803d" />
            <stop offset="100%" stop-color="#0f391b" />
          </linearGradient>

          <!-- Outer Guard Petals: Deep velvety burgundy with soft coral rim -->
          <radialGradient id="outerPetalGrad-${id}" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#fda4af" />
            <stop offset="25%" stop-color="#f43f5e" />
            <stop offset="65%" stop-color="#be123c" />
            <stop offset="100%" stop-color="#58071e" />
          </radialGradient>

          <!-- Mid Layer Petals: Rich ruby with curved highlights -->
          <radialGradient id="midPetalGrad-${id}" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#ffe4e6" />
            <stop offset="28%" stop-color="#fb7185" />
            <stop offset="68%" stop-color="#9f1239" />
            <stop offset="100%" stop-color="#4c0519" />
          </radialGradient>

          <!-- Inner Petal Core: Deep velvet spiral -->
          <radialGradient id="corePetalGrad-${id}" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#fff1f2" />
            <stop offset="30%" stop-color="#f43f5e" />
            <stop offset="75%" stop-color="#881337" />
            <stop offset="100%" stop-color="#2e0310" />
          </radialGradient>

          <!-- Petal Depth Soft Shadow -->
          <filter id="petalShadow-${id}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#2a020d" flood-opacity="0.55" />
          </filter>
        </defs>

        <!-- 1. NATURAL GREEN SEPALS (Botanical calyx cupping the flower) -->
        <g class="rose-sepals-layer">
          <!-- Top Left Sepal -->
          <path d="M55 58 C42 46 26 36 14 24 C24 35 44 48 55 55 Z" fill="url(#sepalGrad-${id})" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.4))" />
          <!-- Top Right Sepal -->
          <path d="M65 58 C78 46 94 36 106 24 C96 35 76 48 65 55 Z" fill="url(#sepalGrad-${id})" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.4))" />
          <!-- Bottom Left Sepal -->
          <path d="M54 62 C38 68 22 80 12 90 C26 84 44 76 56 66 Z" fill="url(#sepalGrad-${id})" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
          <!-- Bottom Right Sepal -->
          <path d="M66 62 C82 68 98 80 108 90 C94 84 76 76 64 66 Z" fill="url(#sepalGrad-${id})" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
          <!-- Bottom Center Sepal / Calyx -->
          <path d="M56 64 C54 78 52 94 58 106 C64 94 62 78 64 64 Z" fill="url(#sepalGrad-${id})" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
        </g>

        <!-- 2. OUTER GUARD PETALS (Layer 1 - Wavy, curved natural edges) -->
        <g class="rose-petal-group petal-group-outer" filter="url(#petalShadow-${id})">
          <!-- Top Outer Petal -->
          <path d="M36 46 C34 26 50 16 60 16 C70 16 86 26 84 46 C74 50 68 47 60 49 C52 47 46 50 36 46 Z" fill="url(#outerPetalGrad-${id})" stroke="#fda4af" stroke-width="0.6" stroke-opacity="0.6" />
          <!-- Left Outer Petal -->
          <path d="M22 56 C16 40 28 26 44 26 C48 38 48 50 52 60 C38 64 26 66 22 56 Z" fill="url(#outerPetalGrad-${id})" stroke="#fda4af" stroke-width="0.6" stroke-opacity="0.6" />
          <!-- Right Outer Petal -->
          <path d="M98 56 C104 40 92 26 76 26 C72 38 72 50 68 60 C82 64 94 66 98 56 Z" fill="url(#outerPetalGrad-${id})" stroke="#fda4af" stroke-width="0.6" stroke-opacity="0.6" />
          <!-- Bottom Left Outer Petal -->
          <path d="M24 64 C26 80 44 90 60 88 C58 76 54 66 48 58 C36 56 26 56 24 64 Z" fill="url(#outerPetalGrad-${id})" stroke="#fda4af" stroke-width="0.6" stroke-opacity="0.6" />
          <!-- Bottom Right Outer Petal -->
          <path d="M96 64 C94 80 76 90 60 88 C62 76 66 66 72 58 C84 56 94 56 96 64 Z" fill="url(#outerPetalGrad-${id})" stroke="#fda4af" stroke-width="0.6" stroke-opacity="0.6" />
        </g>

        <!-- 3. MIDDLE PETALS (Layer 2 - Overlapping velvet folds) -->
        <g class="rose-petal-group petal-group-mid" filter="url(#petalShadow-${id})">
          <!-- Top Mid Petal -->
          <path d="M34 42 C36 30 50 24 60 24 C70 24 84 30 86 42 C78 50 72 48 60 50 C48 48 42 50 34 42 Z" fill="url(#midPetalGrad-${id})" stroke="#fecdd3" stroke-width="0.7" stroke-opacity="0.7" />
          <!-- Left Mid Petal -->
          <path d="M28 58 C26 44 38 34 50 36 C52 46 54 56 58 64 C46 68 34 68 28 58 Z" fill="url(#midPetalGrad-${id})" stroke="#fecdd3" stroke-width="0.7" stroke-opacity="0.7" />
          <!-- Right Mid Petal -->
          <path d="M92 58 C94 44 82 34 70 36 C68 46 66 56 62 64 C74 68 86 68 92 58 Z" fill="url(#midPetalGrad-${id})" stroke="#fecdd3" stroke-width="0.7" stroke-opacity="0.7" />
          <!-- Bottom Center Mid Petal -->
          <path d="M38 68 C44 80 56 84 68 82 C78 78 82 70 82 62 C70 66 50 66 38 68 Z" fill="url(#midPetalGrad-${id})" stroke="#fecdd3" stroke-width="0.7" stroke-opacity="0.7" />
        </g>

        <!-- 4. INNER SWIRL & ROSETTE CORE (Layer 3 - Dense blooming spirals) -->
        <g class="rose-petal-group petal-group-core">
          <!-- Outer Swirl -->
          <path d="M42 46 C44 36 54 32 62 32 C70 32 76 38 76 46 C70 52 64 54 60 54 C54 54 48 52 42 46 Z" fill="url(#corePetalGrad-${id})" stroke="#ffe4e6" stroke-width="0.7" stroke-opacity="0.8" />
          <path d="M40 54 C42 64 52 68 62 66 C70 62 72 54 70 48 C62 51 50 52 40 54 Z" fill="url(#corePetalGrad-${id})" stroke="#ffe4e6" stroke-width="0.7" stroke-opacity="0.8" />
          <!-- Inner Bud Whirl -->
          <path d="M46 44 C50 38 64 38 66 46 C64 54 54 55 48 50 Z" fill="#9f1239" stroke="#fda4af" stroke-width="0.6" />
          <!-- Central Rosette Spiral -->
          <path d="M52 46 C54 42 62 42 64 47 C62 52 56 53 54 50 Z" fill="#e11d48" stroke="#ffe4e6" stroke-width="0.5" />
          <circle cx="58" cy="48" r="2.5" fill="#ffd166" opacity="0.9" filter="drop-shadow(0 0 3px #ffd166)" />
        </g>

        <!-- 5. NATURAL SPECULAR DEW DROP -->
        <ellipse cx="44" cy="40" rx="3.5" ry="2.5" fill="#ffffff" opacity="0.85" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))" />
        <circle cx="43" cy="39" r="1" fill="#ffffff" opacity="0.95" />
      </svg>
    `;
  }

  function launchFloatingRoseGarden() {
    initGardenCanvas();
    renderGardenAmbient();

    const gardenConfig = config.roseGarden || {};
    gardenRosesData = gardenConfig.roses || [
      { id: 1, caption: "A moment worth keeping ❤️", image: "../Paralax-pink/images/photo1.jpeg", fallbackText: "Our First Memory" },
      { id: 2, caption: "Where time stood still ✨", image: "../Paralax-pink/images/photo2.jpeg", fallbackText: "Unforgettable Moments" },
      { id: 3, caption: "Laughter we'll never forget 🥰", image: "../Paralax-pink/images/photo3.jpeg", fallbackText: "Pure Happiness" },
      { id: 4, caption: "Forever grateful for you 💖", image: "../Paralax-pink/images/photo4.jpeg", fallbackText: "Cherished Forever" }
    ];

    if (gardenTitle) gardenTitle.textContent = gardenConfig.title || "Some memories are meant to be picked. 🌹";
    if (gardenSubtitle) gardenSubtitle.textContent = gardenConfig.subtitle || "Pick a rose";

    // Setup Discovery Dots
    if (roseDiscoveryDots) {
      roseDiscoveryDots.innerHTML = '';
      gardenRosesData.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = 'rose-dot';
        dot.id = `rose-dot-${idx}`;
        roseDiscoveryDots.appendChild(dot);
      });
    }

    discoveredRosesCount = 0;
    isBouquetLaunched = false;

    // Spawn Floating Roses
    if (floatingRosesField) {
      floatingRosesField.innerHTML = '';
      floatingRosesField.style.opacity = '1';
      floatingRosesField.style.pointerEvents = 'auto';

      // Positions spread gracefully across viewport (tested for mobile & desktop)
      const positions = [
        { left: 26, top: 34, delay: 0 },
        { left: 74, top: 28, delay: 1.2 },
        { left: 28, top: 66, delay: 2.1 },
        { left: 72, top: 70, delay: 0.8 }
      ];

      gardenRosesData.forEach((rose, idx) => {
        const pos = positions[idx % positions.length];

        const roseWrap = document.createElement('div');
        roseWrap.className = 'floating-rose-wrap';
        roseWrap.style.left = `${pos.left}%`;
        roseWrap.style.top = `${pos.top}%`;
        roseWrap.style.animationDelay = `${pos.delay}s`;
        roseWrap.setAttribute('role', 'button');
        roseWrap.setAttribute('aria-label', `Pick rose ${idx + 1}`);

        roseWrap.innerHTML = `
          <div class="rose-glow-aura"></div>
          <div class="rose-blossom">
            ${getRoseSvgMarkup()}
          </div>
          <div class="rose-stem"></div>
        `;

        roseWrap.addEventListener('click', (e) => {
          e.stopPropagation();
          pickRose(rose, idx, roseWrap);
        });

        floatingRosesField.appendChild(roseWrap);
      });
    }

    playHarpChord([523.25, 659.25, 783.99, 1046.50], 0.12);
  }

  function pickRose(rose, index, roseElement) {
    initAudio();

    const rect = roseElement.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;

    // Trigger natural petal blooming animation
    roseElement.classList.add('blooming');

    addTapBurst(clickX, clickY, 24);
    playChime(659.25, 'triangle', 0.8);
    playHarpChord([523.25, 659.25, 783.99, 1046.50], 0.08);

    // If first time picking this rose
    if (!roseElement.classList.contains('picked')) {
      roseElement.classList.add('picked');

      // Add golden check badge
      const badge = document.createElement('div');
      badge.className = 'picked-badge';
      badge.innerHTML = '✨';
      roseElement.appendChild(badge);

      // Update dots
      const dot = document.getElementById(`rose-dot-${index}`);
      if (dot) dot.classList.add('filled');

      discoveredRosesCount++;

      // Update subtitle counter
      if (gardenSubtitle) {
        gardenSubtitle.textContent = `Discovered ${discoveredRosesCount}/${gardenRosesData.length}`;
      }
    }

    // Open Memory Photo Modal right after natural bloom unfurls
    setTimeout(() => {
      openMemoryModal(rose);
    }, 340);
  }

  function openMemoryModal(rose) {
    if (!photoMemoryModal) return;

    if (memoryModalCaption) {
      memoryModalCaption.textContent = rose.caption || "A moment worth keeping ❤️";
    }

    // Attempt to load image with fallback
    if (memoryModalImg && memoryFallbackPlaceholder) {
      memoryModalImg.style.display = 'block';
      memoryFallbackPlaceholder.style.display = 'none';

      memoryModalImg.onerror = () => {
        memoryModalImg.style.display = 'none';
        memoryFallbackPlaceholder.style.display = 'flex';
        if (fallbackCaptionText) {
          fallbackCaptionText.textContent = rose.fallbackText || "Cherished Memory";
        }
      };

      memoryModalImg.src = rose.image;
    }

    photoMemoryModal.classList.add('active');
    playHarpChord([523.25, 659.25, 783.99, 1046.50], 0.08);
  }

  function closeMemoryModal() {
    if (!photoMemoryModal) return;
    photoMemoryModal.classList.remove('active');

    // If all roses have been discovered, trigger the Bouquet Transition!
    if (discoveredRosesCount >= gardenRosesData.length && !isBouquetLaunched) {
      setTimeout(() => {
        launchBouquetShowcase();
      }, 600);
    }
  }

  if (closeMemoryBtn) {
    closeMemoryBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMemoryModal();
    });
  }

  if (photoMemoryModal) {
    photoMemoryModal.addEventListener('click', (e) => {
      // Close if clicking outside the card or anywhere on backdrop
      if (!e.target.closest('.memory-card-box') || e.target.classList.contains('memory-dismiss-cue')) {
        closeMemoryModal();
      }
    });
  }

  /* ==========================================================================
     BOUQUET TRANSITION (AFTER ALL PHOTOS ARE DISCOVERED)
     ========================================================================== */
  function launchBouquetShowcase() {
    isBouquetLaunched = true;
    initAudio();

    // Fade out scattered floating roses field
    if (floatingRosesField) {
      floatingRosesField.style.transition = 'opacity 0.8s ease';
      floatingRosesField.style.opacity = '0';
      floatingRosesField.style.pointerEvents = 'none';
    }

    // Populate Bouquet Cluster with realistic florist dome of varying rose sizes & leaves
    if (bouquetRosesCluster) {
      bouquetRosesCluster.innerHTML = '';
      const clusterPositions = [
        // Top Apex Rose standing tall at crest (medium-large bloom)
        { left: 50, top: 14, scale: 1.05, rot: -2, zIndex: 3, delay: 0.1, hasLeaves: true },
        // Upper Left & Right Pair (medium blooms gracefully tilted)
        { left: 30, top: 22, scale: 0.96, rot: -14, zIndex: 4, delay: 0.3, hasLeaves: true },
        { left: 70, top: 22, scale: 0.96, rot: 14, zIndex: 4, delay: 0.4, hasLeaves: true },
        // Flank Left & Right (delicate outer budding roses)
        { left: 15, top: 38, scale: 0.84, rot: -24, zIndex: 5, delay: 0.6, hasLeaves: false },
        { left: 85, top: 38, scale: 0.84, rot: 24, zIndex: 5, delay: 0.7, hasLeaves: false },
        // Front Center Focal Rose (prominent, fully opened hero rose)
        { left: 50, top: 35, scale: 1.25, rot: 0, zIndex: 6, delay: 0.2, hasLeaves: true },
        // Lower Center Nestled Rose
        { left: 50, top: 53, scale: 0.92, rot: 4, zIndex: 7, delay: 0.5, hasLeaves: true }
      ];

      clusterPositions.forEach(pos => {
        const bRose = document.createElement('div');
        bRose.className = 'bouquet-rose-item';
        bRose.style.left = `${pos.left}%`;
        bRose.style.top = `${pos.top}%`;
        bRose.style.transform = `translate(-50%, -50%) scale(${pos.scale}) rotate(${pos.rot}deg)`;
        bRose.style.zIndex = pos.zIndex;
        bRose.style.animationDelay = `${pos.delay}s`;

        let leafHtml = '';
        if (pos.hasLeaves) {
          leafHtml = `
            <div class="bouquet-rose-leaves">
              <svg class="bouquet-leaf-svg leaf-left" viewBox="0 0 30 20" fill="none">
                <path d="M2 18 C8 8 20 2 28 2 C24 12 14 18 2 18 Z" fill="#16a34a" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"/>
                <path d="M2 18 Q14 10 28 2" stroke="#4ade80" stroke-width="0.8" opacity="0.6"/>
              </svg>
              <svg class="bouquet-leaf-svg leaf-right" viewBox="0 0 30 20" fill="none">
                <path d="M2 18 C8 8 20 2 28 2 C24 12 14 18 2 18 Z" fill="#15803d" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"/>
                <path d="M2 18 Q14 10 28 2" stroke="#4ade80" stroke-width="0.8" opacity="0.6"/>
              </svg>
            </div>
          `;
        }

        bRose.innerHTML = `
          ${leafHtml}
          ${getRoseSvgMarkup()}
        `;
        bouquetRosesCluster.appendChild(bRose);
      });
    }

    // Set Initials in Bouquet Center Crest
    const initials = (config.roseGarden && config.roseGarden.initials) 
      ? config.roseGarden.initials 
      : (config.recipientName ? config.recipientName.charAt(0).toUpperCase() : "A");

    if (bouquetInitials) {
      bouquetInitials.textContent = initials;
    }

    // Play triumphant celebration cascade
    playHarpChord([523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98], 0.08);

    // Stardust burst at center
    setTimeout(() => {
      addTapBurst(width / 2, height / 2 - 20, 30);
      addTapBurst(width / 2 - 40, height / 2, 16);
      addTapBurst(width / 2 + 40, height / 2, 16);
    }, 400);

    // Reveal Bouquet Showcase
    if (bouquetShowcase) {
      bouquetShowcase.classList.add('revealed');
    }
  }

  // Handle 'Take Your Bouquet →' Click: Launch 'Choose Your Moment' Stage
  if (takeBouquetBtn) {
    takeBouquetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();

      const rect = takeBouquetBtn.getBoundingClientRect();
      addTapBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 28);

      playHarpChord([523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00], 0.07);

      // Light flash transition into Choose Your Moment stage
      if (transitionPortal) {
        transitionPortal.classList.add('ignite');
      }

      setTimeout(() => {
        // Hide Rose Garden stage
        if (roseGardenStage) {
          roseGardenStage.classList.remove('active');
          roseGardenStage.style.display = 'none';
        }

        if (transitionPortal) {
          transitionPortal.classList.remove('ignite');
        }

        launchChooseMomentStage();
      }, 750);
    });
  }

  /* ==========================================================================
     STAGE 5: CHOOSE YOUR MOMENT
     ========================================================================== */
  const chooseMomentStage = document.getElementById('choose-moment-stage');
  const momentAmbientCanvas = document.getElementById('moment-ambient-canvas');
  const momentTopBar = document.getElementById('moment-top-bar');
  const backToChoicesBtn = document.getElementById('back-to-choices-btn');

  // Choices overview panel & cards
  const choicesOverviewPanel = document.getElementById('choices-overview-panel');
  const choiceMessageCard = document.getElementById('choice-message-card');
  const choiceMemoryCard = document.getElementById('choice-memory-card');
  const choiceSongCard = document.getElementById('choice-song-card');

  // Expanded Panels
  const expandedMessagePanel = document.getElementById('expanded-message-panel');
  const expandedMemoryPanel = document.getElementById('expanded-memory-panel');
  const expandedSongPanel = document.getElementById('expanded-song-panel');

  // "A Message" Elements
  const detailEnvelopeBox = document.getElementById('detail-envelope-box');
  const detailRecipientSalutation = document.getElementById('detail-recipient-salutation');
  const detailLetterBody = document.getElementById('detail-letter-body');
  const detailSenderName = document.getElementById('detail-sender-name');
  const detailEnvelopePrompt = document.getElementById('detail-envelope-prompt');

  // "A Memory" Elements (One-by-one cinematic slider)
  const memorySliderCounter = document.getElementById('memory-slider-counter');
  const cinematicPolaroid = document.getElementById('cinematic-polaroid');
  const sliderCurrentImg = document.getElementById('slider-current-img');
  const sliderFallback = document.getElementById('slider-fallback');
  const sliderFallbackText = document.getElementById('slider-fallback-text');
  const sliderCurrentCaption = document.getElementById('slider-current-caption');
  const sliderPrevBtn = document.getElementById('slider-prev-btn');
  const sliderNextBtn = document.getElementById('slider-next-btn');
  const sliderDotsTrack = document.getElementById('slider-dots-track');

  // "A Song" Elements
  const vinylRecord = document.getElementById('vinyl-record');
  const soundwaveVisual = document.getElementById('soundwave-visual');
  const songTitleDisplay = document.getElementById('song-title-display');
  const songSubtitleDisplay = document.getElementById('song-subtitle-display');
  const toggleSongPlayBtn = document.getElementById('toggle-song-play-btn');
  const songBtnIcon = document.getElementById('song-btn-icon');
  const songBtnLabel = document.getElementById('song-btn-label');
  const momentAudioPlayer = document.getElementById('moment-audio-player');

  // State
  let currentMemoryIndex = 0;
  let isMomentStageInitialized = false;
  let isSongPlaying = false;
  let momentCtx = null;
  let momentParticles = [];

  // Initialize Ambient Stardust Canvas for Stage 5
  function initMomentAmbient() {
    if (!momentAmbientCanvas) return;
    momentCtx = momentAmbientCanvas.getContext('2d');
    momentAmbientCanvas.width = width;
    momentAmbientCanvas.height = height;

    momentParticles = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      momentParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 0.8,
        color: i % 2 === 0 ? 'rgba(255, 209, 102,' : 'rgba(244, 114, 182,',
        alpha: Math.random() * 0.5 + 0.2,
        speedY: Math.random() * -0.4 - 0.1,
        speedX: Math.random() * 0.3 - 0.15,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }
  }

  function renderMomentAmbient() {
    if (!momentCtx || !chooseMomentStage || !chooseMomentStage.classList.contains('active')) return;

    momentCtx.clearRect(0, 0, width, height);

    momentParticles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.twinklePhase += p.twinkleSpeed;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.twinklePhase));

      momentCtx.beginPath();
      momentCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      momentCtx.fillStyle = `${p.color} ${currentAlpha})`;
      momentCtx.shadowBlur = 10;
      momentCtx.shadowColor = `${p.color} 0.8)`;
      momentCtx.fill();
    });

    requestAnimationFrame(renderMomentAmbient);
  }

  // Populate Stage 5 Data from Config
  function setupMomentData() {
    // 1. Message Data
    const recipient = config.recipientName || "Ananya";
    if (detailRecipientSalutation) {
      detailRecipientSalutation.textContent = `Dearest ${recipient},`;
    }
    if (detailLetterBody && config.moments && config.moments.message && config.moments.message.body) {
      detailLetterBody.textContent = config.moments.message.body;
    }
    if (detailSenderName) {
      detailSenderName.textContent = config.senderName || "Someone who adores you";
    }

    // 2. Memory Data (Use existing photos from roseGarden)
    initMemorySlider();

    // 3. Song Data
    const songData = (config.moments && config.moments.song) ? config.moments.song : {
      title: "Kaadhal En Kaviye",
      audioSrc: "../Paralax-pink/images/Kaadhal-En-Kaviye.mp3"
    };

    if (songTitleDisplay && songData.title) {
      songTitleDisplay.textContent = songData.title;
    }
    if (momentAudioPlayer && songData.audioSrc) {
      momentAudioPlayer.src = songData.audioSrc;
      momentAudioPlayer.preload = 'auto';
    }
  }

  // Memory Slider Implementation (One by One with Transitions, NOT in a grid)
  function initMemorySlider() {
    const roses = (config.roseGarden && config.roseGarden.roses) ? config.roseGarden.roses : [];
    if (!roses || roses.length === 0) return;

    currentMemoryIndex = 0;

    // Create navigation dots
    if (sliderDotsTrack) {
      sliderDotsTrack.innerHTML = '';
      roses.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to memory ${idx + 1}`);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          initAudio();
          goToMemory(idx);
        });
        sliderDotsTrack.appendChild(dot);
      });
    }

    renderCurrentMemory(0, false);
  }

  function renderCurrentMemory(index, animate = true) {
    const roses = (config.roseGarden && config.roseGarden.roses) ? config.roseGarden.roses : [];
    if (!roses || roses.length === 0) return;

    const memory = roses[index];

    const updateContent = () => {
      // Counter
      if (memorySliderCounter) {
        memorySliderCounter.textContent = `Memory ${index + 1} of ${roses.length}`;
      }

      // Caption
      if (sliderCurrentCaption) {
        sliderCurrentCaption.textContent = memory.caption || "A moment worth keeping ❤️";
      }

      // Image / Fallback
      if (sliderCurrentImg && sliderFallback) {
        sliderFallback.style.display = 'none';
        sliderCurrentImg.style.display = 'block';

        sliderCurrentImg.onerror = () => {
          sliderCurrentImg.style.display = 'none';
          sliderFallback.style.display = 'flex';
          if (sliderFallbackText) {
            sliderFallbackText.textContent = memory.fallbackText || "Cherished Moment";
          }
        };

        sliderCurrentImg.src = memory.image;
      }

      // Update dots
      if (sliderDotsTrack) {
        const dots = sliderDotsTrack.querySelectorAll('.slider-dot');
        dots.forEach((dot, dIdx) => {
          dot.classList.toggle('active', dIdx === index);
        });
      }

      if (cinematicPolaroid) {
        cinematicPolaroid.classList.remove('photo-transitioning');
      }
    };

    if (animate && cinematicPolaroid) {
      cinematicPolaroid.classList.add('photo-transitioning');
      playChime(587.33 + index * 40, 'sine', 0.35);
      setTimeout(updateContent, 220);
    } else {
      updateContent();
    }
  }

  function goToMemory(index) {
    const roses = (config.roseGarden && config.roseGarden.roses) ? config.roseGarden.roses : [];
    if (!roses || roses.length === 0) return;

    if (index < 0) {
      currentMemoryIndex = roses.length - 1;
    } else if (index >= roses.length) {
      currentMemoryIndex = 0;
    } else {
      currentMemoryIndex = index;
    }

    renderCurrentMemory(currentMemoryIndex, true);
  }

  // Memory Navigation Button Handlers
  if (sliderPrevBtn) {
    sliderPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      goToMemory(currentMemoryIndex - 1);
    });
  }

  if (sliderNextBtn) {
    sliderNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      goToMemory(currentMemoryIndex + 1);
    });
  }

  // Tap on the polaroid itself advances to next memory
  if (cinematicPolaroid) {
    cinematicPolaroid.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      const rect = cinematicPolaroid.getBoundingClientRect();
      addTapBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
      goToMemory(currentMemoryIndex + 1);
    });
  }

  // Song Audio Controls
  function toggleSongPlayback() {
    if (!momentAudioPlayer) return;

    initAudio();

    if (momentAudioPlayer.paused) {
      isSongPlaying = true;
      if (vinylRecord) vinylRecord.classList.add('spinning');
      if (soundwaveVisual) soundwaveVisual.classList.add('playing');
      if (songBtnIcon) songBtnIcon.textContent = "⏸";
      if (songBtnLabel) songBtnLabel.textContent = "Pause Our Song";

      momentAudioPlayer.play().catch(err => {
        console.warn("Song play blocked or restricted by browser policy:", err);
      });
    } else {
      momentAudioPlayer.pause();
      isSongPlaying = false;
      if (vinylRecord) vinylRecord.classList.remove('spinning');
      if (soundwaveVisual) soundwaveVisual.classList.remove('playing');
      if (songBtnIcon) songBtnIcon.textContent = "▶";
      if (songBtnLabel) songBtnLabel.textContent = "Play Our Song";
    }
  }

  if (toggleSongPlayBtn) {
    toggleSongPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = toggleSongPlayBtn.getBoundingClientRect();
      addTapBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
      toggleSongPlayback();
    });
  }

  if (momentAudioPlayer) {
    momentAudioPlayer.addEventListener('ended', () => {
      isSongPlaying = false;
      if (vinylRecord) vinylRecord.classList.remove('spinning');
      if (soundwaveVisual) soundwaveVisual.classList.remove('playing');
      if (songBtnIcon) songBtnIcon.textContent = "▶";
      if (songBtnLabel) songBtnLabel.textContent = "Play Our Song";
    });
  }

  // "A Message" Envelope Interaction
  function openDetailEnvelope() {
    if (!detailEnvelopeBox) return;
    if (detailEnvelopeBox.classList.contains('opened')) return;

    initAudio();
    detailEnvelopeBox.classList.add('opened');

    // Wax seal crack & stardust chime
    playHarpChord([440, 554.37, 659.25, 880], 0.08);

    const rect = detailEnvelopeBox.getBoundingClientRect();
    addTapBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 26);

    if (detailEnvelopePrompt) {
      detailEnvelopePrompt.style.opacity = '0';
      setTimeout(() => {
        detailEnvelopePrompt.innerHTML = '<span>Words from the heart ✨</span>';
        detailEnvelopePrompt.style.opacity = '1';
      }, 400);
    }

    // Reveal continue button after user reads message
    if (messageContinueBtn) {
      setTimeout(() => {
        messageContinueBtn.classList.add('visible');
      }, 1200);
    }
  }

  if (detailEnvelopeBox) {
    detailEnvelopeBox.addEventListener('click', (e) => {
      e.stopPropagation();
      openDetailEnvelope();
    });
  }

  // Card Expansion & Transition Functionality
  function expandChoice(choiceType) {
    initAudio();
    playHarpChord([523.25, 659.25, 783.99, 1046.50], 0.07);

    // Fade out choices overview
    if (choicesOverviewPanel) {
      choicesOverviewPanel.classList.add('fading-out');
    }

    setTimeout(() => {
      if (choicesOverviewPanel) {
        choicesOverviewPanel.classList.remove('active');
        choicesOverviewPanel.classList.remove('fading-out');
      }

      // Show top bar
      if (momentTopBar) {
        momentTopBar.classList.add('active');
      }

      // Hide all panels first
      if (expandedMessagePanel) {
        expandedMessagePanel.classList.remove('active');
        expandedMessagePanel.style.display = 'none';
      }
      if (expandedMemoryPanel) {
        expandedMemoryPanel.classList.remove('active');
        expandedMemoryPanel.style.display = 'none';
      }
      if (expandedSongPanel) {
        expandedSongPanel.classList.remove('active');
        expandedSongPanel.style.display = 'none';
      }

      // Activate corresponding panel
      if (choiceType === 'message' && expandedMessagePanel) {
        expandedMessagePanel.style.display = 'flex';
        expandedMessagePanel.classList.add('active');
        if (detailEnvelopeBox && detailEnvelopeBox.classList.contains('opened') && messageContinueBtn) {
          messageContinueBtn.classList.add('visible');
        }
      } else if (choiceType === 'memory' && expandedMemoryPanel) {
        expandedMemoryPanel.style.display = 'flex';
        expandedMemoryPanel.classList.add('active');
        renderCurrentMemory(currentMemoryIndex, false);
        if (memoryContinueBtn) {
          setTimeout(() => {
            memoryContinueBtn.classList.add('visible');
          }, 500);
        }
      } else if (choiceType === 'song' && expandedSongPanel) {
        expandedSongPanel.style.display = 'flex';
        expandedSongPanel.classList.add('active');
        if (songContinueBtn) {
          setTimeout(() => {
            songContinueBtn.classList.add('visible');
          }, 500);
        }
      }
    }, 400);
  }

  function returnToChoices() {
    initAudio();
    playChime(659.25, 'sine', 0.4);

    // Hide top bar
    if (momentTopBar) {
      momentTopBar.classList.remove('active');
    }

    // Hide continue buttons
    if (messageContinueBtn) messageContinueBtn.classList.remove('visible');
    if (memoryContinueBtn) memoryContinueBtn.classList.remove('visible');
    if (songContinueBtn) songContinueBtn.classList.remove('visible');

    // Hide all expanded panels
    if (expandedMessagePanel) {
      expandedMessagePanel.classList.remove('active');
      expandedMessagePanel.style.display = 'none';
    }
    if (expandedMemoryPanel) {
      expandedMemoryPanel.classList.remove('active');
      expandedMemoryPanel.style.display = 'none';
    }
    if (expandedSongPanel) {
      expandedSongPanel.classList.remove('active');
      expandedSongPanel.style.display = 'none';
    }

    // Show overview panel
    setTimeout(() => {
      if (choicesOverviewPanel) {
        choicesOverviewPanel.classList.add('active');
        choicesOverviewPanel.classList.remove('fading-out');
      }
    }, 250);
  }

  if (choiceMessageCard) {
    choiceMessageCard.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = choiceMessageCard.getBoundingClientRect();
      addTapBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
      expandChoice('message');
    });
  }

  if (choiceMemoryCard) {
    choiceMemoryCard.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = choiceMemoryCard.getBoundingClientRect();
      addTapBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
      expandChoice('memory');
    });
  }

  if (choiceSongCard) {
    choiceSongCard.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = choiceSongCard.getBoundingClientRect();
      addTapBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
      expandChoice('song');
    });
  }

  if (backToChoicesBtn) {
    backToChoicesBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      returnToChoices();
    });
  }

  // Launch the Stage
  function launchChooseMomentStage() {
    if (!chooseMomentStage) return;

    chooseMomentStage.style.display = 'flex';
    chooseMomentStage.classList.add('active');
    initMomentAmbient();
    renderMomentAmbient();
    setupMomentData();

    // Ensure overview panel is visible and expanded panels reset
    if (choicesOverviewPanel) {
      choicesOverviewPanel.classList.add('active');
      choicesOverviewPanel.classList.remove('fading-out');
    }
    if (momentTopBar) {
      momentTopBar.classList.remove('active');
    }
    if (expandedMessagePanel) {
      expandedMessagePanel.classList.remove('active');
      expandedMessagePanel.style.display = 'none';
    }
    if (expandedMemoryPanel) {
      expandedMemoryPanel.classList.remove('active');
      expandedMemoryPanel.style.display = 'none';
    }
    if (expandedSongPanel) {
      expandedSongPanel.classList.remove('active');
      expandedSongPanel.style.display = 'none';
    }

    // Soft celebration chime cascade
    playHarpChord([523.25, 659.25, 783.99, 1046.50, 1318.51], 0.08);

    // Stardust burst
    setTimeout(() => {
      addTapBurst(width / 2, height / 2, 28);
    }, 300);
  }

  /* ==========================================================================
     STAGE: I LOVE YOU — HEART REVEAL
     ========================================================================== */
  const heartRevealStage = document.getElementById('heart-reveal-stage');
  const heartAmbientCanvas = document.getElementById('heart-ambient-canvas');
  const heartIntroWrap = document.getElementById('heart-intro-wrap');
  const heartIntroText = document.getElementById('heart-intro-text');
  const heartParticlesContainer = document.getElementById('heart-particles-container');
  const heartRevealBlock = document.getElementById('heart-reveal-block');
  const heartRevealSubtext = document.getElementById('heart-reveal-subtext');
  const heartRevealMain = document.getElementById('heart-reveal-main');
  const heartContinueBtn = document.getElementById('heart-continue-btn');

  let heartCanvasCtx = null;
  let heartStars = [];
  let heartAnimId = null;
  let heartTimeouts = [];

  function clearAllHeartTimeouts() {
    heartTimeouts.forEach(t => clearTimeout(t));
    heartTimeouts = [];
  }

  function initHeartAmbient() {
    if (!heartAmbientCanvas) return;
    heartCanvasCtx = heartAmbientCanvas.getContext('2d');
    heartAmbientCanvas.width = width;
    heartAmbientCanvas.height = height;

    heartStars = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      heartStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.6,
        color: i % 2 === 0 ? 'rgba(255, 209, 102,' : 'rgba(244, 114, 182,',
        alpha: Math.random() * 0.45 + 0.15,
        speedY: Math.random() * -0.3 - 0.05,
        speedX: Math.random() * 0.2 - 0.1,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function renderHeartAmbient() {
    if (!heartCanvasCtx || !heartRevealStage || !heartRevealStage.classList.contains('active')) {
      return;
    }

    heartCanvasCtx.clearRect(0, 0, width, height);

    heartStars.forEach(s => {
      s.y += s.speedY;
      s.x += s.speedX;
      s.phase += 0.02;

      if (s.y < -10) {
        s.y = height + 10;
        s.x = Math.random() * width;
      }
      if (s.x < -10) s.x = width + 10;
      if (s.x > width + 10) s.x = -10;

      const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.phase));
      heartCanvasCtx.beginPath();
      heartCanvasCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      heartCanvasCtx.fillStyle = `${s.color} ${currentAlpha})`;
      heartCanvasCtx.shadowBlur = 8;
      heartCanvasCtx.shadowColor = `${s.color} 0.6)`;
      heartCanvasCtx.fill();
    });

    heartAnimId = requestAnimationFrame(renderHeartAmbient);
  }

  // Generate Heart Points using Heart Parametric Equation
  function getHeartCurvePoints(count) {
    const points = [];
    const scale = Math.min(width * 0.024, height * 0.02, 16.5);

    for (let i = 0; i < count; i++) {
      const t = (Math.PI * 2 * i) / count;
      
      // Parametric Heart Equation:
      // x = 16 * sin^3(t)
      // y = -(13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t))
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      // First derivative for tangent angle
      const dx = 48 * Math.pow(Math.sin(t), 2) * Math.cos(t);
      const dy = 13 * Math.sin(t) - 10 * Math.sin(2 * t) - 6 * Math.sin(3 * t) - 4 * Math.sin(4 * t);

      let angle = Math.atan2(dy, dx);
      if (Math.abs(angle) > Math.PI / 2) {
        angle += Math.PI;
      }

      points.push({
        x: hx * scale,
        y: (hy + 2) * scale,
        rotation: angle
      });
    }

    return points;
  }

  function launchHeartRevealStage() {
    initAudio();

    if (momentAudioPlayer) {
      momentAudioPlayer.pause();
    }
    isSongPlaying = false;
    if (vinylRecord) vinylRecord.classList.remove('spinning');
    if (soundwaveVisual) soundwaveVisual.classList.remove('playing');
    if (songBtnIcon) songBtnIcon.textContent = "▶";
    if (songBtnLabel) songBtnLabel.textContent = "Play Our Song";

    playHarpChord([523.25, 659.25, 783.99, 1046.50, 1318.51], 0.08);

    if (transitionPortal) {
      transitionPortal.classList.add('ignite');
    }

    setTimeout(() => {
      // Hide Stage 5 Choose Your Moment
      if (chooseMomentStage) {
        chooseMomentStage.classList.remove('active');
        chooseMomentStage.style.display = 'none';
      }

      if (transitionPortal) {
        transitionPortal.classList.remove('ignite');
      }

      // Show Heart Reveal Stage
      if (heartRevealStage) {
        heartRevealStage.style.display = 'flex';
        heartRevealStage.classList.add('active');
      }

      initHeartAmbient();
      renderHeartAmbient();

      startHeartRevealSequence();
    }, 750);
  }

  function startHeartRevealSequence() {
    clearAllHeartTimeouts();

    const hrConfig = (config.heartReveal) ? config.heartReveal : {
      introText: "There's something I've been wanting to say...",
      particleText: "I LOVE YOU",
      finalSubtext: "Some words are worth saying again...",
      finalText: "I LOVE YOU ❤️",
      continueText: "Continue →"
    };

    if (heartIntroText && hrConfig.introText) {
      heartIntroText.textContent = hrConfig.introText;
    }
    if (heartRevealSubtext && hrConfig.finalSubtext) {
      heartRevealSubtext.textContent = hrConfig.finalSubtext;
    }
    if (heartRevealMain && hrConfig.finalText) {
      heartRevealMain.textContent = hrConfig.finalText;
    }

    // Reset components
    if (heartIntroWrap) {
      heartIntroWrap.classList.remove('faded-out');
      heartIntroWrap.style.display = 'flex';
    }
    if (heartIntroText) {
      heartIntroText.classList.remove('visible');
    }
    if (heartParticlesContainer) {
      heartParticlesContainer.innerHTML = '';
      heartParticlesContainer.classList.remove('pulsing');
    }
    if (heartRevealBlock) {
      heartRevealBlock.classList.remove('active');
    }

    // 1. Intro Line Fade-In
    heartTimeouts.push(setTimeout(() => {
      if (heartIntroText) {
        heartIntroText.classList.add('visible');
        playChime(440, 'sine', 1.2);
      }
    }, 500));

    // 2. Pause ~2.2s, then fade out intro and prepare heart particles
    heartTimeouts.push(setTimeout(() => {
      if (heartIntroWrap) {
        heartIntroWrap.classList.add('faded-out');
        setTimeout(() => {
          heartIntroWrap.style.display = 'none';
        }, 700);
      }
      beginHeartFormation(hrConfig.particleText || "I LOVE YOU");
    }, 2800));
  }

  function beginHeartFormation(text) {
    if (!heartParticlesContainer) return;
    heartParticlesContainer.innerHTML = '';

    const particleCount = 32;
    const heartPoints = getHeartCurvePoints(particleCount);
    const particleEls = [];

    // Create 32 particles
    for (let i = 0; i < particleCount; i++) {
      const pt = heartPoints[i];
      const span = document.createElement('span');
      span.className = 'heart-text-particle';
      span.textContent = text;

      // Random scattered initial positions
      const scatX = (Math.random() - 0.5) * (width * 0.9);
      const scatY = (Math.random() - 0.5) * (height * 0.9);

      span.style.setProperty('--scat-x', `${scatX}px`);
      span.style.setProperty('--scat-y', `${scatY}px`);
      span.style.setProperty('--heart-x', `${pt.x}px`);
      span.style.setProperty('--heart-y', `${pt.y}px`);
      span.style.setProperty('--heart-rot', `${pt.rotation}rad`);

      const delay = (i % 6) * 0.16 + Math.floor(i / 6) * 0.25;
      span.style.transitionDelay = `${delay}s`;

      heartParticlesContainer.appendChild(span);
      particleEls.push(span);
    }

    // 1. First appear scattered
    requestAnimationFrame(() => {
      particleEls.forEach(el => el.classList.add('scattered'));
      playChime(523.25, 'sine', 1.0);
    });

    // 2. Wave of particles gliding into the heart curve
    heartTimeouts.push(setTimeout(() => {
      particleEls.forEach(el => {
        el.classList.remove('scattered');
        el.classList.add('formed');
      });

      playHarpChord([440, 554.37, 659.25, 880, 1108.73], 0.14);
    }, 800));

    // 3. Heart formed -> pulse once gently with warm glow
    heartTimeouts.push(setTimeout(() => {
      if (heartParticlesContainer) {
        heartParticlesContainer.classList.add('pulsing');
      }
      playHarpChord([523.25, 659.25, 783.99, 1046.50, 1318.51], 0.08);

      addTapBurst(width / 2, height / 2, 24);
      setTimeout(() => addTapBurst(width / 2, height / 2 - 40, 18), 300);
    }, 3600));

    // 4. Reveal the center text & continue button
    heartTimeouts.push(setTimeout(() => {
      if (heartRevealBlock) {
        heartRevealBlock.classList.add('active');
        playChime(784, 'sine', 1.1);
      }
    }, 4800));
  }

  /* ==========================================================================
     STAGE 6: ONE LAST SURPRISE
     ========================================================================== */
  const finalSurpriseStage = document.getElementById('final-surprise-stage');
  const finalAmbientCanvas = document.getElementById('final-ambient-canvas');
  const messageContinueBtn = document.getElementById('message-continue-btn');
  const memoryContinueBtn = document.getElementById('memory-continue-btn');
  const songContinueBtn = document.getElementById('song-continue-btn');

  // Step 1 Elements (Intro Lines)
  const finalIntroContainer = document.getElementById('final-intro-container');
  const finalIntroLine1 = document.getElementById('final-intro-line-1');
  const finalIntroLine2 = document.getElementById('final-intro-line-2');
  const finalIntroLine3 = document.getElementById('final-intro-line-3');
  const finalIntroLine4 = document.getElementById('final-intro-line-4');

  // Step 2 Elements (Gift Box)
  const finalGiftboxContainer = document.getElementById('final-giftbox-container');
  const finalGiftBox = document.getElementById('final-gift-box');
  const finalBoxPrompt = document.getElementById('final-box-prompt');

  // Step 3 Elements (Teaser & Reveal Button)
  const finalTeaserContainer = document.getElementById('final-teaser-container');
  const finalRevealBtn = document.getElementById('final-reveal-btn');

  // Step 4 Elements (Sender & Final Message & Celebration)
  const finalRevealContainer = document.getElementById('final-reveal-container');
  const finalFromLabel = document.getElementById('final-from-label');
  const finalSenderName = document.getElementById('final-sender-name');
  const finalMessageBlock = document.getElementById('final-message-block');
  const finalMessageText = document.getElementById('final-message-text');
  const finalDedicationBlock = document.getElementById('final-dedication-block');
  const finalDedicationText = document.getElementById('final-dedication-text');
  const replaySurpriseBtn = document.getElementById('replay-surprise-btn');

  // State
  let isBoxOpened = false;
  let finalCanvasCtx = null;
  let finalStars = [];
  let finalPetals = [];
  let isFinalCelebration = false;
  let introTimeouts = [];

  function clearAllIntroTimeouts() {
    introTimeouts.forEach(t => clearTimeout(t));
    introTimeouts = [];
  }

  function initFinalAmbient() {
    if (!finalAmbientCanvas) return;
    finalCanvasCtx = finalAmbientCanvas.getContext('2d');
    finalAmbientCanvas.width = width;
    finalAmbientCanvas.height = height;

    finalStars = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      finalStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        color: i % 2 === 0 ? 'rgba(255, 209, 102,' : 'rgba(244, 114, 182,',
        alpha: Math.random() * 0.45 + 0.15,
        speedY: Math.random() * -0.35 - 0.08,
        speedX: Math.random() * 0.2 - 0.1,
        phase: Math.random() * Math.PI * 2
      });
    }

    finalPetals = [];
    isFinalCelebration = false;
  }

  function startFinalCelebration() {
    isFinalCelebration = true;
    finalPetals = [];

    const petalCount = 28;
    for (let i = 0; i < petalCount; i++) {
      finalPetals.push({
        x: Math.random() * width,
        y: Math.random() * -height * 0.8,
        vx: Math.random() * 1.4 - 0.6,
        vy: Math.random() * 1.3 + 0.9,
        size: Math.random() * 10 + 9,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: Math.random() * 0.02 - 0.01,
        color: i % 3 === 0 
          ? 'rgba(251, 182, 206, 0.85)' 
          : (i % 3 === 1 ? 'rgba(244, 114, 182, 0.8)' : 'rgba(225, 29, 72, 0.75)'),
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.015
      });
    }

    playHarpChord([523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98], 0.09);

    setTimeout(() => {
      addTapBurst(width * 0.25, height * 0.35, 18);
      addTapBurst(width * 0.75, height * 0.35, 18);
    }, 200);
    setTimeout(() => {
      addTapBurst(width * 0.5, height * 0.3, 24);
    }, 550);
  }

  function renderFinalAmbient() {
    if (!finalCanvasCtx || !finalSurpriseStage || !finalSurpriseStage.classList.contains('active')) {
      return;
    }

    finalCanvasCtx.clearRect(0, 0, width, height);

    // 1. Ambient Stardust
    finalStars.forEach(s => {
      s.y += s.speedY;
      s.x += s.speedX;
      s.phase += 0.02;

      if (s.y < -10) {
        s.y = height + 10;
        s.x = Math.random() * width;
      }
      if (s.x < -10) s.x = width + 10;
      if (s.x > width + 10) s.x = -10;

      const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.phase));
      finalCanvasCtx.beginPath();
      finalCanvasCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      finalCanvasCtx.fillStyle = `${s.color} ${currentAlpha})`;
      finalCanvasCtx.shadowBlur = 8;
      finalCanvasCtx.shadowColor = `${s.color} 0.6)`;
      finalCanvasCtx.fill();
    });

    // 2. Celebration Petals
    if (isFinalCelebration) {
      finalPetals.forEach(p => {
        p.wobble += p.wobbleSpeed;
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.wobble) * 0.7;
        p.angle += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        drawPetalShape(finalCanvasCtx, p.x, p.y, p.size, p.angle, p.color);
      });
    }

    requestAnimationFrame(renderFinalAmbient);
  }

  function startIntroSequence() {
    clearAllIntroTimeouts();

    [finalIntroLine1, finalIntroLine2, finalIntroLine3, finalIntroLine4].forEach(l => {
      if (l) {
        l.classList.remove('visible');
        l.classList.remove('fade-out');
      }
    });

    if (finalIntroContainer) {
      finalIntroContainer.style.display = 'flex';
      finalIntroContainer.classList.remove('faded-out');
    }

    // Line 1: "You've discovered the memories..."
    introTimeouts.push(setTimeout(() => {
      if (finalIntroLine1) finalIntroLine1.classList.add('visible');
      playChime(440, 'sine', 1.2);
    }, 600));

    // Line 2: "You've heard the song..."
    introTimeouts.push(setTimeout(() => {
      if (finalIntroLine2) finalIntroLine2.classList.add('visible');
      playChime(523.25, 'sine', 1.2);
    }, 2400));

    // Line 3: "You've read the words..."
    introTimeouts.push(setTimeout(() => {
      if (finalIntroLine3) finalIntroLine3.classList.add('visible');
      playChime(587.33, 'sine', 1.2);
    }, 4200));

    // Line 4: "But I saved one last thing for you. ✨"
    introTimeouts.push(setTimeout(() => {
      if (finalIntroLine4) finalIntroLine4.classList.add('visible');
      playHarpChord([523.25, 659.25, 783.99, 1046.50], 0.08);
      addTapBurst(width / 2, height / 2 + 50, 18);
    }, 6100));

    // Advance to Step 2 Gift Box
    introTimeouts.push(setTimeout(() => {
      advanceToGiftBox();
    }, 8400));
  }

  function advanceToGiftBox() {
    if (finalIntroContainer) {
      finalIntroContainer.classList.add('faded-out');
      setTimeout(() => {
        finalIntroContainer.style.display = 'none';
      }, 700);
    }

    setTimeout(() => {
      if (finalGiftboxContainer) {
        finalGiftboxContainer.style.display = 'flex';
        setTimeout(() => {
          finalGiftboxContainer.classList.add('active');
          playHarpChord([587.33, 739.99, 880, 1174.66], 0.08);
          addTapBurst(width / 2, height / 2, 16);
        }, 80);
      }
    }, 450);
  }

  function handleGiftBoxOpen() {
    if (isBoxOpened) return;
    isBoxOpened = true;

    initAudio();
    playHarpChord([329.63, 440, 554.37, 659.25, 880, 1108.73], 0.08);

    if (finalBoxPrompt) {
      finalBoxPrompt.style.opacity = '0';
    }

    if (finalGiftBox) {
      finalGiftBox.classList.add('shaking');
    }

    setTimeout(() => {
      if (finalGiftBox) {
        finalGiftBox.classList.remove('shaking');
        finalGiftBox.classList.add('opening');
      }

      const rect = finalGiftBox ? finalGiftBox.getBoundingClientRect() : { left: width/2, top: height/2, width: 0, height: 0 };
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      addTapBurst(cx, cy, 32);
      setTimeout(() => addTapBurst(cx, cy - 35, 24), 280);
      setTimeout(() => addTapBurst(cx, cy - 70, 24), 580);
    }, 600);

    // Smooth cinematic transition into Step 3
    setTimeout(() => {
      if (finalGiftboxContainer) {
        finalGiftboxContainer.classList.remove('active');
        setTimeout(() => {
          finalGiftboxContainer.style.display = 'none';
        }, 600);
      }

      setTimeout(() => {
        if (finalTeaserContainer) {
          finalTeaserContainer.style.display = 'flex';
          setTimeout(() => {
            finalTeaserContainer.classList.add('active');
            playChime(659.25, 'sine', 0.8);
          }, 60);
        }
      }, 400);
    }, 2200);
  }

  function handleReveal() {
    initAudio();
    playHarpChord([523.25, 659.25, 783.99, 1046.50, 1318.51], 0.07);

    if (finalRevealBtn) {
      const rBtnRect = finalRevealBtn.getBoundingClientRect();
      addTapBurst(rBtnRect.left + rBtnRect.width / 2, rBtnRect.top + rBtnRect.height / 2, 22);
    }

    if (finalTeaserContainer) {
      finalTeaserContainer.classList.remove('active');
      setTimeout(() => {
        finalTeaserContainer.style.display = 'none';
      }, 500);
    }

    const sender = config.senderName || "Someone who adores you";
    const recipient = config.recipientName || "Ananya";
    const msg = config.finalMessage || config.envelopeNote || "Made especially for you,\nwith all my love. ❤️";

    if (finalSenderName) {
      finalSenderName.textContent = `${sender} ❤️`;
    }
    if (finalMessageText) {
      finalMessageText.textContent = msg;
    }
    if (finalDedicationText) {
      finalDedicationText.textContent = `Made especially for you, ${recipient} ❤️`;
    }

    setTimeout(() => {
      if (finalRevealContainer) {
        finalRevealContainer.style.display = 'flex';
        setTimeout(() => finalRevealContainer.classList.add('active'), 50);
      }

      // Step 6: "From" label
      setTimeout(() => {
        if (finalFromLabel) finalFromLabel.classList.add('visible');
      }, 600);

      // Step 6: Dynamic sender name in signature reveal
      setTimeout(() => {
        if (finalSenderName) finalSenderName.classList.add('revealed');
        playHarpChord([659.25, 830.61, 987.77, 1318.51, 1661.22], 0.08);
        if (finalSenderName) {
          const sRect = finalSenderName.getBoundingClientRect();
          addTapBurst(sRect.left + sRect.width / 2, sRect.top + sRect.height / 2, 24);
        }
      }, 1500);

      // Step 7: Personalized final message
      setTimeout(() => {
        if (finalMessageBlock) finalMessageBlock.classList.add('visible');
        playChime(784, 'sine', 0.9);
      }, 2700);

      // Step 8: Final Celebration
      setTimeout(() => {
        if (finalDedicationBlock) finalDedicationBlock.classList.add('visible');
        startFinalCelebration();
      }, 3700);

      // Step 9: Replay button
      setTimeout(() => {
        if (replaySurpriseBtn) replaySurpriseBtn.classList.add('visible');
      }, 4500);

    }, 450);
  }

  function replayFinalSurprise() {
    initAudio();
    playHarpChord([523.25, 659.25, 783.99, 1046.50, 1318.51], 0.08);

    if (transitionPortal) {
      transitionPortal.classList.add('ignite');
    }

    setTimeout(() => {
      window.location.reload();
    }, 450);
  }

  function launchOneLastSurprise() {
    initAudio();

    if (momentAudioPlayer) {
      momentAudioPlayer.pause();
    }
    isSongPlaying = false;
    if (vinylRecord) vinylRecord.classList.remove('spinning');
    if (soundwaveVisual) soundwaveVisual.classList.remove('playing');
    if (songBtnIcon) songBtnIcon.textContent = "▶";
    if (songBtnLabel) songBtnLabel.textContent = "Play Our Song";

    playHarpChord([523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98], 0.08);

    if (transitionPortal) {
      transitionPortal.classList.add('ignite');
    }

    setTimeout(() => {
      if (chooseMomentStage) {
        chooseMomentStage.classList.remove('active');
        chooseMomentStage.style.display = 'none';
      }

      if (transitionPortal) {
        transitionPortal.classList.remove('ignite');
      }

      if (finalSurpriseStage) {
        finalSurpriseStage.style.display = 'flex';
        finalSurpriseStage.classList.add('active');
      }

      initFinalAmbient();
      renderFinalAmbient();

      if (finalGiftboxContainer) {
        finalGiftboxContainer.classList.remove('active');
        finalGiftboxContainer.style.display = 'none';
      }
      if (finalTeaserContainer) {
        finalTeaserContainer.classList.remove('active');
        finalTeaserContainer.style.display = 'none';
      }
      if (finalRevealContainer) {
        finalRevealContainer.classList.remove('active');
        finalRevealContainer.style.display = 'none';
      }
      if (finalGiftBox) {
        finalGiftBox.classList.remove('shaking', 'opening');
      }
      if (finalBoxPrompt) {
        finalBoxPrompt.style.opacity = '1';
      }
      isBoxOpened = false;

      startIntroSequence();
    }, 750);
  }

  // Attach Event Listeners for Stages 5 -> Heart Reveal -> One Last Surprise
  if (messageContinueBtn) {
    messageContinueBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      launchHeartRevealStage();
    });
  }

  if (memoryContinueBtn) {
    memoryContinueBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      launchHeartRevealStage();
    });
  }

  if (songContinueBtn) {
    songContinueBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      launchHeartRevealStage();
    });
  }

  if (heartContinueBtn) {
    heartContinueBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      playHarpChord([587.33, 739.99, 880, 1174.66], 0.07);

      const r = heartContinueBtn.getBoundingClientRect();
      addTapBurst(r.left + r.width / 2, r.top + r.height / 2, 20);

      if (heartRevealStage) {
        heartRevealStage.classList.remove('active');
        setTimeout(() => {
          heartRevealStage.style.display = 'none';
        }, 500);
      }

      launchOneLastSurprise();
    });
  }

  if (finalGiftBox) {
    finalGiftBox.addEventListener('click', (e) => {
      e.stopPropagation();
      handleGiftBoxOpen();
    });
  }

  if (finalRevealBtn) {
    finalRevealBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleReveal();
    });
  }

  if (replaySurpriseBtn) {
    replaySurpriseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      replayFinalSurprise();
    });
  }

  /* ==========================================================================
     GLOBAL USER INTERACTION (Audio unlock & Tap Sparks)
     ========================================================================== */
  appEl.addEventListener('click', (e) => {
    initAudio();
    if (!e.target.closest('#sound-toggle') && 
        !e.target.closest('#open-surprise-btn') && 
        !e.target.closest('#continue-stage-btn') && 
        !e.target.closest('#take-bouquet-btn') &&
        !e.target.closest('.floating-rose-wrap') &&
        !e.target.closest('.close-memory-btn') &&
        !e.target.closest('.choice-card') &&
        !e.target.closest('.back-to-choices-btn') &&
        !e.target.closest('#detail-envelope-box') &&
        !e.target.closest('.slider-nav-btn') &&
        !e.target.closest('#toggle-song-play-btn') &&
        !e.target.closest('.slider-dot') &&
        !e.target.closest('.moment-continue-surprise-btn') &&
        !e.target.closest('#heart-continue-btn') &&
        !e.target.closest('#final-gift-box') &&
        !e.target.closest('#final-reveal-btn') &&
        !e.target.closest('#replay-surprise-btn')) {
      addTapBurst(e.clientX, e.clientY, 12);
    }
  });

  appEl.addEventListener('touchstart', (e) => {
    initAudio();
    if (e.touches && e.touches.length > 0) {
      if (!e.target.closest('#sound-toggle') && 
          !e.target.closest('#open-surprise-btn') && 
          !e.target.closest('#continue-stage-btn') && 
          !e.target.closest('#take-bouquet-btn') &&
          !e.target.closest('.floating-rose-wrap') &&
          !e.target.closest('.close-memory-btn') &&
          !e.target.closest('.choice-card') &&
          !e.target.closest('.back-to-choices-btn') &&
          !e.target.closest('#detail-envelope-box') &&
          !e.target.closest('.slider-nav-btn') &&
          !e.target.closest('#toggle-song-play-btn') &&
          !e.target.closest('.slider-dot') &&
          !e.target.closest('.moment-continue-surprise-btn') &&
          !e.target.closest('#heart-continue-btn') &&
          !e.target.closest('#final-gift-box') &&
          !e.target.closest('#final-reveal-btn') &&
          !e.target.closest('#replay-surprise-btn')) {
        addTapBurst(e.touches[0].clientX, e.touches[0].clientY, 12);
      }
    }
  }, { passive: true });


  /* ==========================================================================
     STARTUP ON LOAD
     ========================================================================== */
  window.addEventListener('resize', () => {
    resizeCanvases();
    initGardenCanvas();
    if (heartAmbientCanvas) {
      initHeartAmbient();
    }
    if (finalAmbientCanvas) {
      initFinalAmbient();
    }
  });

  window.addEventListener('DOMContentLoaded', () => {
    resizeCanvases();
    renderAmbient();
    renderSparks();
    renderFlowers();

    // Ensure Stage 5 and its panels are completely hidden initially
    if (chooseMomentStage) {
      chooseMomentStage.style.display = 'none';
      chooseMomentStage.classList.remove('active');
    }
    if (expandedMessagePanel) {
      expandedMessagePanel.classList.remove('active');
      expandedMessagePanel.style.display = 'none';
    }
    if (expandedMemoryPanel) {
      expandedMemoryPanel.classList.remove('active');
      expandedMemoryPanel.style.display = 'none';
    }
    if (expandedSongPanel) {
      expandedSongPanel.classList.remove('active');
      expandedSongPanel.style.display = 'none';
    }

    // Ensure Heart Reveal Stage is completely hidden initially
    if (heartRevealStage) {
      heartRevealStage.style.display = 'none';
      heartRevealStage.classList.remove('active');
    }

    // Ensure Stage 6 One Last Surprise is completely hidden initially
    if (finalSurpriseStage) {
      finalSurpriseStage.style.display = 'none';
      finalSurpriseStage.classList.remove('active');
    }

    // Start automatic countdown immediately on page load
    setTimeout(() => {
      startCountdownTimer(0);
    }, 200);
  });

})();
