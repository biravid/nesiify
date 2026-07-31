/* ============================================================
   Love Letter — interaction script
   Reads all personal content from CONFIG (config.js)
   ============================================================ */

(() => {
  'use strict';

  /* ---------- helpers ---------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function showStage(id){
    $$('.stage').forEach(s => s.classList.remove('stage--active'));
    $(`#${id}`).classList.add('stage--active');
  }

  /* ============================================================
     0. POPULATE STATIC TEXT FROM CONFIG
     ============================================================ */
  function populateContent(){
    $('#lock-title').textContent = CONFIG.lockTitle;
    $('#lock-subtitle').textContent = CONFIG.lockSubtitle;
    $('#envelope-label').textContent = CONFIG.envelopeLabel;

    $('#hero-eyebrow').textContent = `A little something for`;
    $('#hero-name').textContent = CONFIG.recipientName;
    $('#letter-date').textContent = CONFIG.letterDate;
    $('#letter-title').textContent = CONFIG.letterTitle;
    $('#letter-closing').textContent = CONFIG.closingLine;
    $('#letter-signature').textContent = CONFIG.senderName;

    $('#counter-label').textContent = CONFIG.specialDateLabel;
    $('#surprise-heading').textContent = CONFIG.surpriseHeading;
    $('#surprise-message').textContent = CONFIG.surpriseMessage;

    document.title = `A Letter For ${CONFIG.recipientName}`;

    if (CONFIG.hint && CONFIG.hint.trim()){
      $('#hint-btn').style.display = 'inline-block';
    } else {
      $('#hint-btn').style.display = 'none';
    }

    buildReasonCards();
    buildGallery();
  }

  /* ============================================================
     1. AMBIENT BACKGROUND — floating hearts & stars
     ============================================================ */
  const ambientCanvas = $('#ambient-canvas');
  const actx = ambientCanvas.getContext('2d');
  let ambientParticles = [];

  function resizeCanvases(){
    [ambientCanvas, fxCanvas].forEach(c => {
      c.width = window.innerWidth * devicePixelRatio;
      c.height = window.innerHeight * devicePixelRatio;
      c.style.width = window.innerWidth + 'px';
      c.style.height = window.innerHeight + 'px';
    });
  }

  function initAmbient(){
    ambientParticles = [];
    const count = Math.min(70, Math.floor(window.innerWidth / 16));
    for (let i = 0; i < count; i++){
      ambientParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.6 + 0.4,
        isHeart: Math.random() < 0.12,
        speed: Math.random() * 0.25 + 0.05,
        drift: Math.random() * 0.4 - 0.2,
        twinkle: Math.random() * Math.PI * 2,
        size: Math.random() * 10 + 8,
      });
    }
  }

  function drawHeart(ctx, x, y, size, alpha){
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.scale(size / 20, size / 20);
    ctx.fillStyle = '#e78ea1';
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(0, 2, -6, -4, -10, 0);
    ctx.bezierCurveTo(-14, 6, -6, 12, 0, 18);
    ctx.bezierCurveTo(6, 12, 14, 6, 10, 0);
    ctx.bezierCurveTo(6, -4, 0, 2, 0, 6);
    ctx.fill();
    ctx.restore();
  }

  function animateAmbient(){
    actx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    actx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of ambientParticles){
      p.y -= p.speed;
      p.x += Math.sin(p.twinkle) * p.drift * 0.05;
      p.twinkle += 0.02;
      if (p.y < -20){ p.y = window.innerHeight + 20; p.x = Math.random() * window.innerWidth; }

      const alpha = 0.35 + Math.sin(p.twinkle) * 0.25;
      if (p.isHeart){
        drawHeart(actx, p.x, p.y, p.size, Math.max(0.1, alpha));
      } else {
        actx.beginPath();
        actx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        actx.fillStyle = `rgba(255,246,232,${Math.max(0.1, alpha)})`;
        actx.fill();
      }
    }
    requestAnimationFrame(animateAmbient);
  }

  /* ============================================================
     2. FX CANVAS — confetti + fireworks for big surprise moments
     ============================================================ */
  const fxCanvas = $('#fx-canvas');
  const fctx = fxCanvas.getContext('2d');
  let fxParticles = [];
  let fxRunning = false;

  const FX_COLORS = ['#e78ea1', '#f0cc8a', '#d8ae64', '#fbf3e3', '#c96b83'];

  function spawnConfettiBurst(cx, cy, amount = 60){
    for (let i = 0; i < amount; i++){
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      fxParticles.push({
        type: 'confetti',
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 6 + 4,
        color: FX_COLORS[Math.floor(Math.random() * FX_COLORS.length)],
        life: 1,
        decay: 0.006 + Math.random() * 0.006,
        gravity: 0.12,
        shape: Math.random() < 0.5 ? 'rect' : 'heart',
      });
    }
  }

  function spawnFirework(cx, cy){
    const count = 34;
    const color = FX_COLORS[Math.floor(Math.random() * FX_COLORS.length)];
    for (let i = 0; i < count; i++){
      const angle = (Math.PI * 2 * i) / count;
      const speed = Math.random() * 3.5 + 2.5;
      fxParticles.push({
        type: 'spark',
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2.5 + 1.5,
        color,
        life: 1,
        decay: 0.012 + Math.random() * 0.01,
        gravity: 0.03,
      });
    }
  }

  function drawConfettiHeart(ctx, size){
    ctx.beginPath();
    ctx.moveTo(0, size * 0.3);
    ctx.bezierCurveTo(0, 0, -size, -size * 0.2, -size, size * 0.3);
    ctx.bezierCurveTo(-size, size * 0.8, 0, size, 0, size * 1.3);
    ctx.bezierCurveTo(0, size, size, size * 0.8, size, size * 0.3);
    ctx.bezierCurveTo(size, -size * 0.2, 0, 0, 0, size * 0.3);
    ctx.fill();
  }

  function animateFx(){
    fctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    fctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    fxParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.life -= p.decay;
      if (p.type === 'confetti') p.rot += p.vrot;
    });
    fxParticles = fxParticles.filter(p => p.life > 0);

    for (const p of fxParticles){
      fctx.save();
      fctx.globalAlpha = Math.max(0, p.life);
      if (p.type === 'confetti'){
        fctx.translate(p.x, p.y);
        fctx.rotate(p.rot);
        fctx.fillStyle = p.color;
        if (p.shape === 'rect'){
          fctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          drawConfettiHeart(fctx, p.size * 0.5);
        }
      } else {
        fctx.beginPath();
        fctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        fctx.fillStyle = p.color;
        fctx.shadowBlur = 8;
        fctx.shadowColor = p.color;
        fctx.fill();
      }
      fctx.restore();
    }

    if (fxParticles.length > 0 || fxRunning){
      requestAnimationFrame(animateFx);
    }
  }

  function bigCelebration(){
    fxRunning = true;
    const w = window.innerWidth, h = window.innerHeight;

    // immediate confetti burst across the top
    for (let i = 0; i < 5; i++){
      setTimeout(() => spawnConfettiBurst(Math.random() * w, -20, 40), i * 120);
    }
    // fireworks popping across the screen
    let fw = 0;
    const fwInterval = setInterval(() => {
      spawnFirework(Math.random() * w * 0.8 + w * 0.1, Math.random() * h * 0.5 + h * 0.1);
      fw++;
      if (fw >= 6){ clearInterval(fwInterval); }
    }, 350);

    requestAnimationFrame(animateFx);
    setTimeout(() => { fxRunning = false; }, 4200);
  }

  function smallBurst(x, y){
    spawnConfettiBurst(x, y, 26);
    fxRunning = true;
    requestAnimationFrame(animateFx);
    setTimeout(() => { fxRunning = false; }, 1500);
  }

  /* ============================================================
     3. PASSWORD GATE
     ============================================================ */
  function normalize(str){
    return str.trim().toLowerCase();
  }

  function initPasswordGate(){
    const form = $('#password-form');
    const input = $('#password-input');
    const wrongMsg = $('#wrong-msg');
    const hintBtn = $('#hint-btn');
    const hintText = $('#hint-text');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = normalize(input.value);
      const correct = normalize(CONFIG.password || '');

      if (val.length > 0 && val === correct){
        wrongMsg.classList.remove('show');
        unlockSequence();
      } else {
        wrongMsg.classList.add('show');
        input.classList.remove('shake');
        void input.offsetWidth; // restart animation
        input.classList.add('shake');
        setTimeout(() => wrongMsg.classList.remove('show'), 2200);
      }
    });

    hintBtn.addEventListener('click', () => {
      hintText.textContent = CONFIG.hint || '';
      hintText.classList.toggle('show');
    });
  }

  function unlockSequence(){
    showStage('stage-envelope');
    initEnvelopeStage();
  }

  /* ============================================================
     4. ENVELOPE OPENING
     ============================================================ */
  function initEnvelopeStage(){
    const envelope = $('#envelope');
    if (envelope.dataset.bound) return;
    envelope.dataset.bound = 'true';

    envelope.addEventListener('click', () => {
      if (envelope.classList.contains('is-open')) return;
      envelope.classList.add('is-open');

      const rect = envelope.getBoundingClientRect();
      smallBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

      setTimeout(() => {
        showStage('stage-letter');
        revealLetterPage();
      }, 1300);
    });
  }

  /* ============================================================
     5. LETTER PAGE — typewriter, reasons, counter, gallery
     ============================================================ */
  let letterRevealed = false;

  function revealLetterPage(){
    if (letterRevealed) return;
    letterRevealed = true;

    // grand entrance celebration
    bigCelebration();

    typeParagraphs(CONFIG.letterParagraphs, () => {
      $('#letter-closing').classList.add('show');
      setTimeout(() => $('#letter-signature').classList.add('show'), 350);
    });

    startCounter();
  }

  function typeParagraphs(paragraphs, onDone){
    const container = $('#letter-body');
    container.innerHTML = '';
    let pIndex = 0;

    function typeNext(){
      if (pIndex >= paragraphs.length){
        if (onDone) onDone();
        return;
      }
      const p = document.createElement('p');
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      container.appendChild(p);
      p.classList.add('typed');

      const text = paragraphs[pIndex];
      let charIndex = 0;
      p.appendChild(document.createTextNode(''));
      p.appendChild(cursor);

      const speed = 14; // ms per character — quick but readable
      const timer = setInterval(() => {
        charIndex++;
        p.firstChild.textContent = text.slice(0, charIndex);
        if (charIndex >= text.length){
          clearInterval(timer);
          cursor.remove();
          pIndex++;
          setTimeout(typeNext, 260);
        }
      }, speed);
    }

    typeNext();
  }

  function buildReasonCards(){
    const grid = $('#reasons-grid');
    grid.innerHTML = '';
    (CONFIG.loveReasons || []).forEach((reason) => {
      const card = document.createElement('div');
      card.className = 'reason-card';
      card.innerHTML = `
        <div class="reason-card__inner">
          <div class="reason-card__face reason-card__face--front">
            <div class="reason-card__icon">${reason.icon || '♡'}</div>
            <div class="reason-card__label">tap to reveal</div>
          </div>
          <div class="reason-card__face reason-card__face--back">
            ${escapeHtml(reason.text || '')}
          </div>
        </div>
      `;
      card.addEventListener('click', () => card.classList.toggle('is-flipped'));
      grid.appendChild(card);
    });
  }

  function buildGallery(){
    const grid = $('#gallery-grid');
    grid.innerHTML = '';
    (CONFIG.gallery || []).forEach((item) => {
      const card = document.createElement('div');
      card.className = 'polaroid';
      card.innerHTML = `
        <div class="polaroid__img-wrap">
          <img src="${item.src}" alt="${escapeHtml(item.caption || '')}" loading="lazy" />
          <div class="polaroid__placeholder" style="display:none;">♡</div>
        </div>
        <div class="polaroid__caption">${escapeHtml(item.caption || '')}</div>
      `;
      const img = card.querySelector('img');
      const placeholder = card.querySelector('.polaroid__placeholder');
      img.addEventListener('error', () => {
        img.style.display = 'none';
        placeholder.style.display = 'flex';
      });
      card.addEventListener('click', () => openPhotoModal(item, img.style.display !== 'none'));
      grid.appendChild(card);
    });
  }

  function openPhotoModal(item, hasImage){
    const modal = $('#photo-modal');
    const img = $('#modal-img');
    const caption = $('#modal-caption');
    if (hasImage){
      img.src = item.src;
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }
    caption.textContent = item.caption || '';
    modal.classList.add('is-open');
  }

  function startCounter(){
    const target = new Date(CONFIG.specialDate);
    if (isNaN(target.getTime())) return;

    function tick(){
      const now = new Date();
      let diff = Math.max(0, now - target);

      const days = Math.floor(diff / 86400000);
      diff -= days * 86400000;
      const hours = Math.floor(diff / 3600000);
      diff -= hours * 3600000;
      const mins = Math.floor(diff / 60000);
      diff -= mins * 60000;
      const secs = Math.floor(diff / 1000);

      $('#count-days').textContent = days;
      $('#count-hours').textContent = String(hours).padStart(2, '0');
      $('#count-mins').textContent = String(mins).padStart(2, '0');
      $('#count-secs').textContent = String(secs).padStart(2, '0');
    }
    tick();
    setInterval(tick, 1000);
  }

  function escapeHtml(str){
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ============================================================
     6. SURPRISE BUTTON + MODALS
     ============================================================ */
  function initSurprise(){
    $('#surprise-btn').addEventListener('click', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      smallBurst(rect.left + rect.width / 2, rect.top);
      $('#surprise-modal').classList.add('is-open');
      setTimeout(bigCelebration, 200);
    });
  }

  function initModals(){
    $$('.modal').forEach(modal => {
      modal.querySelector('.modal__backdrop').addEventListener('click', () => modal.classList.remove('is-open'));
      const closeBtn = modal.querySelector('.modal__close');
      if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('is-open'));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') $$('.modal.is-open').forEach(m => m.classList.remove('is-open'));
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init(){
    resizeCanvases();
    window.addEventListener('resize', () => { resizeCanvases(); initAmbient(); });
    initAmbient();
    requestAnimationFrame(animateAmbient);

    populateContent();
    initPasswordGate();
    initSurprise();
    initModals();

    showStage('stage-lock');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
