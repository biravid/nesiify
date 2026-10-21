/**
 * Animation Engine
 * – Rich multi-type falling particles (petals, sparkles, stars, threads)
 * – Canvas sits above all scenes; pointer-events:none so nothing is blocked
 * – Fireworks burst for Scene 8 Rakhi climax
 * – IntersectionObserver for .animate-on-scroll elements
 */

class AnimationEngine {
  constructor() {
    this.canvas = document.getElementById('petal-canvas');
    this.ctx    = this.canvas ? this.canvas.getContext('2d') : null;

    // Particle pool — mix of types
    this.particles = [];
    this.TOTAL     = 75;   // total particles across the screen

    this.width  = window.innerWidth;
    this.height = window.innerHeight;
    this.raf    = null;

    this._initCanvas();
    this.initScrollObserver();
  }

  /* ─── Canvas Setup ──────────────────────────────────────────────────────── */
  _initCanvas() {
    if (!this.canvas) return;

    // Float the canvas above all scenes; pointer-events:none is set in CSS
    this.canvas.style.position = 'fixed';
    this.canvas.style.top      = '0';
    this.canvas.style.left     = '0';
    this.canvas.style.zIndex   = '10';
    this.canvas.style.pointerEvents = 'none';

    this._resize();
    window.addEventListener('resize', () => this._resize());

    // Seed particles spread across full height so they don't all appear at once
    for (let i = 0; i < this.TOTAL; i++) {
      this.particles.push(this._spawn(true));
    }

    this._loop();
  }

  _resize() {
    this.width  = window.innerWidth;
    this.height = window.innerHeight;
    if (this.canvas) {
      this.canvas.width  = this.width;
      this.canvas.height = this.height;
    }
  }

  /* ─── Particle Factory ──────────────────────────────────────────────────── */
  _spawn(scatter = false) {
    // Choose a random particle type
    const roll = Math.random();
    let type;
    if      (roll < 0.35) type = 'petal';    // rose/saffron ellipses
    else if (roll < 0.60) type = 'sparkle';  // tiny 4-point stars
    else if (roll < 0.80) type = 'dot';      // soft glowing circles
    else if (roll < 0.92) type = 'thread';   // thin rakhi threads
    else                  type = 'star';     // 6-point stars

    const palette = {
      petal:   ['#F7A6B8', '#F4A261', '#F6C453', '#E89EBB'],
      sparkle: ['#F6C453', '#FFFFFF', '#FFE580', '#F4D3FF'],
      dot:     ['#F7A6B8', '#A855F7', '#F6C453', '#7C3AED'],
      thread:  ['#F6C453', '#D97706', '#F4A261'],
      star:    ['#F6C453', '#FFFFFF', '#FFD700'],
    };
    const colors = palette[type];
    const color  = colors[Math.floor(Math.random() * colors.length)];

    return {
      type,
      color,
      x:             Math.random() * this.width,
      y:             scatter ? Math.random() * this.height * 1.5 - this.height * 0.5 : -20,
      size:          this._sizeFor(type),
      speedY:        Math.random() * 1.2 + 0.4,
      speedX:        (Math.random() - 0.5) * 0.7,
      drift:         Math.random() * 0.04 + 0.01,   // sine drift frequency
      driftAmp:      Math.random() * 1.2 + 0.4,     // horizontal sine amplitude
      rotation:      Math.random() * 360,
      rotSpeed:      (Math.random() - 0.5) * 2.5,
      opacity:       Math.random() * 0.5 + 0.25,
      twinkle:       type === 'sparkle' || type === 'star',
      twinklePhase:  Math.random() * Math.PI * 2,
      twinkleSpeed:  Math.random() * 0.05 + 0.02,
    };
  }

  _sizeFor(type) {
    switch (type) {
      case 'petal':   return Math.random() * 7 + 5;
      case 'sparkle': return Math.random() * 4 + 2;
      case 'dot':     return Math.random() * 5 + 3;
      case 'thread':  return Math.random() * 14 + 8;
      case 'star':    return Math.random() * 6 + 3;
      default:        return 6;
    }
  }

  /* ─── Main Render Loop ──────────────────────────────────────────────────── */
  _loop() {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);

    this.particles.forEach((p, i) => {
      // Move
      p.y          += p.speedY;
      p.x          += Math.sin(p.y * p.drift) * p.driftAmp + p.speedX;
      p.rotation   += p.rotSpeed;

      // Twinkle opacity
      if (p.twinkle) {
        p.twinklePhase += p.twinkleSpeed;
        p.opacity = 0.25 + Math.abs(Math.sin(p.twinklePhase)) * 0.55;
      }

      // Recycle when off-screen
      if (p.y > this.height + 20 || p.x < -50 || p.x > this.width + 50) {
        this.particles[i] = this._spawn(false);
        return;
      }

      // Draw
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      switch (p.type) {
        case 'petal':   this._drawPetal(ctx, p);   break;
        case 'sparkle': this._drawSparkle(ctx, p); break;
        case 'dot':     this._drawDot(ctx, p);     break;
        case 'thread':  this._drawThread(ctx, p);  break;
        case 'star':    this._drawStar(ctx, p);    break;
      }

      ctx.restore();
    });

    this.raf = requestAnimationFrame(() => this._loop());
  }

  /* ─── Shape Drawers ────────────────────────────────────────────────────── */
  _drawPetal(ctx, p) {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  _drawSparkle(ctx, p) {
    // 4-pointed sparkle
    ctx.strokeStyle = p.color;
    ctx.lineWidth   = 1.2;
    ctx.lineCap     = 'round';
    const r = p.size;
    ctx.beginPath();
    ctx.moveTo(0, -r);  ctx.lineTo(0, r);
    ctx.moveTo(-r, 0);  ctx.lineTo(r, 0);
    ctx.stroke();
    // Tiny center dot
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  _drawDot(ctx, p) {
    // Soft radial glow circle
    const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
    grd.addColorStop(0,   p.color);
    grd.addColorStop(0.5, p.color + '99');
    grd.addColorStop(1,   p.color + '00');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
    ctx.fill();
  }

  _drawThread(ctx, p) {
    // Thin rakhi-style thread line
    ctx.strokeStyle = p.color;
    ctx.lineWidth   = 1.2;
    ctx.lineCap     = 'round';
    ctx.globalAlpha = p.opacity * 0.7;
    ctx.beginPath();
    ctx.moveTo(0, -p.size / 2);
    ctx.lineTo(0,  p.size / 2);
    ctx.stroke();
  }

  _drawStar(ctx, p) {
    // 6-pointed star
    ctx.fillStyle = p.color;
    const r1 = p.size, r2 = p.size * 0.45;
    const pts = 6;
    ctx.beginPath();
    for (let i = 0; i < pts * 2; i++) {
      const angle = (i * Math.PI) / pts;
      const r     = i % 2 === 0 ? r1 : r2;
      i === 0
        ? ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
        : ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    ctx.closePath();
    ctx.fill();
  }

  /* ─── Scroll Observer (re-used by main.js) ──────────────────────────────── */
  initScrollObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animated'); });
      },
      { root: null, threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  }

  /* ─── Fireworks Burst (Scene 8 Rakhi climax) ────────────────────────────── */
  launchFireworks() {
    const fwCanvas = document.getElementById('fireworks-canvas');
    if (!fwCanvas) return;

    const ctx = fwCanvas.getContext('2d');
    const w   = fwCanvas.offsetWidth;
    const h   = fwCanvas.offsetHeight;
    fwCanvas.width  = w;
    fwCanvas.height = h;

    const colors = ['#F6C453', '#F7A6B8', '#F4A261', '#FFFFFF', '#C62A47', '#A855F7'];
    const burst  = [];

    // Multiple bursts at random positions
    const launchBurst = (bx, by) => {
      for (let i = 0; i < 55; i++) {
        const angle = (i / 55) * Math.PI * 2;
        const speed = Math.random() * 8 + 3;
        burst.push({
          x: bx, y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size:  Math.random() * 6 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.022 + 0.012
        });
      }
    };

    launchBurst(w * 0.5,  h * 0.4);
    setTimeout(() => launchBurst(w * 0.25, h * 0.5), 300);
    setTimeout(() => launchBurst(w * 0.75, h * 0.45), 600);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      let alive = false;
      burst.forEach(p => {
        if (p.alpha <= 0) return;
        alive = true;
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.15;        // gravity
        p.vx *= 0.99;        // air resistance
        p.alpha -= p.decay;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      alive ? requestAnimationFrame(animate) : ctx.clearRect(0, 0, w, h);
    };

    animate();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.animationEngine = new AnimationEngine();
});
