// Globals
let configData = null;
let activeTheme = 'light';
const themeStylesheet = document.getElementById('themeStylesheet');

// Heart Particles System
let canvas, ctx;
let heartParticles = [];
let particlesAnimationId = null;
let heartsThemeActive = false;

// 1. Helper to convert Hex String to Uint8Array
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

// 2. Derive key from password using PBKDF2
async function deriveKey(password, saltBytes) {
  const enc = new TextEncoder();
  const baseKey = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey", "deriveBits"]
  );

  return await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations: 100000,
      hash: "SHA-256"
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
}

// 3. Decrypt payload
async function decryptData(password, saltHex, ivHex, ciphertextHex) {
  const saltBytes = hexToBytes(saltHex);
  const ivBytes = hexToBytes(ivHex);
  const ciphertextBytes = hexToBytes(ciphertextHex);

  const key = await deriveKey(password, saltBytes);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: ivBytes,
      tagLength: 128 // 16-byte auth tag is 128 bits
    },
    key,
    ciphertextBytes
  );

  const dec = new TextDecoder();
  return JSON.parse(dec.decode(decryptedBuffer));
}

// 4. Initialize Particle Canvas
function initHeartsCanvas() {
  canvas = document.getElementById('heartsCanvas');
  ctx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

class HeartParticle {
  constructor() {
    this.reset();
    this.y = Math.random() * canvas.height; // Spread initially
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = Math.random() * 12 + 6;
    this.speedY = Math.random() * 1.2 + 0.6;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.color = `rgba(${220 + Math.floor(Math.random() * 35)}, ${50 + Math.floor(Math.random() * 80)}, ${100 + Math.floor(Math.random() * 50)}, ${this.opacity})`;
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    
    // Wave drifting effect
    this.speedX += Math.sin(this.y / 40) * 0.015;

    if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    const topCurveHeight = this.size * 0.3;
    ctx.moveTo(this.x, this.y + topCurveHeight);
    
    // Draw heart curves
    ctx.bezierCurveTo(
      this.x - this.size / 2, this.y - topCurveHeight, 
      this.x - this.size, this.y + this.size / 3, 
      this.x, this.y + this.size
    );
    ctx.bezierCurveTo(
      this.x + this.size, this.y + this.size / 3, 
      this.x + this.size / 2, this.y - topCurveHeight, 
      this.x, this.y + topCurveHeight
    );
    
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'rgba(255, 77, 109, 0.3)';
    ctx.fill();
    ctx.restore();
  }
}

function animateParticles() {
  if (!heartsThemeActive) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesAnimationId = null;
    return;
  }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (heartParticles.length < 60) {
    heartParticles.push(new HeartParticle());
  }

  for (let particle of heartParticles) {
    particle.update();
    particle.draw();
  }

  particlesAnimationId = requestAnimationFrame(animateParticles);
}

function startHeartsEffect() {
  heartsThemeActive = true;
  heartParticles = [];
  for (let i = 0; i < 30; i++) {
    heartParticles.push(new HeartParticle());
  }
  if (!particlesAnimationId) {
    animateParticles();
  }
}

function stopHeartsEffect() {
  heartsThemeActive = false;
  if (particlesAnimationId) {
    cancelAnimationFrame(particlesAnimationId);
    particlesAnimationId = null;
  }
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// 5. Load and apply selected theme
function applyTheme(theme) {
  activeTheme = theme;
  themeStylesheet.setAttribute('href', `theme-${theme}.css`);
  localStorage.setItem('anniversaryTheme', theme);

  if (theme === 'hearts') {
    startHeartsEffect();
  } else {
    stopHeartsEffect();
  }

  // Active state in dropdown
  document.querySelectorAll('.theme-menu-btn').forEach(btn => {
    if (btn.getAttribute('data-theme') === theme) {
      btn.style.fontWeight = 'bold';
      btn.style.opacity = '1';
    } else {
      btn.style.fontWeight = 'normal';
      btn.style.opacity = '0.7';
    }
  });
}

// 6. Live Love Ticker
function startLoveTicker(marriageDateStr) {
  const marriageDate = new Date(marriageDateStr);
  
  function update() {
    const now = new Date();
    const diffMs = now - marriageDate;
    
    if (diffMs < 0) return;
    
    const diffSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(diffSeconds / (24 * 3600));
    const hours = Math.floor((diffSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = diffSeconds % 60;
    
    document.getElementById('tickerDays').innerText = String(days).padStart(2, '0');
    document.getElementById('tickerHours').innerText = String(hours).padStart(2, '0');
    document.getElementById('tickerMinutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('tickerSeconds').innerText = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// 7. Render dynamic decrypted timeline data
function buildTimeline(milestones) {
  const container = document.getElementById('timelineContainer');
  container.innerHTML = ''; // clear

  milestones.forEach((milestone, index) => {
    const side = index % 2 === 0 ? 'left' : 'right';
    
    const item = document.createElement('div');
    item.className = `timeline-item ${side}`;
    
    // Format human readable date
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(milestone.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', dateOptions);

    item.innerHTML = `
      <div class="timeline-node"></div>
      <div class="timeline-card">
        <img src="${milestone.image}" alt="${milestone.title}" class="milestone-img" loading="lazy">
        <span class="milestone-date">${formattedDate}</span>
        <h3 class="milestone-title">${milestone.title}</h3>
        <p class="milestone-desc">${milestone.description}</p>
      </div>
    `;
    
    container.appendChild(item);
  });

  // Attach dynamic scroll intersection animation
  setupScrollAnimations();
}

// 8. Setup Scroll Animations
function setupScrollAnimations() {
  const items = document.querySelectorAll('.timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  items.forEach(item => observer.observe(item));
}

// 9. Audio Player setup
function initAudio(musicUrl) {
  const audio = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicBtn');
  
  audio.src = musicUrl;
  
  musicBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        musicBtn.classList.add('playing');
      }).catch(err => {
        console.log("Autoplay blocked, user interaction required:", err);
      });
    } else {
      audio.pause();
      musicBtn.classList.remove('playing');
    }
  });

  // Attempt autoplay (might fail, button covers it)
  audio.play().then(() => {
    musicBtn.classList.add('playing');
  }).catch(() => {
    console.log("Autoplay deferred until interaction.");
  });
}

// 10. Load Website Components after Decryption
function renderWebsite(data) {
  document.getElementById('coupleNames').innerText = data.coupleNames;
  
  // Set Letter
  document.getElementById('letterTitle').innerText = data.letterTitle;
  document.getElementById('letterBody').innerText = data.letterContent;
  
  // Set timeline
  buildTimeline(data.milestones);
  
  // Start Ticker
  startLoveTicker(data.marriageDate);
  
  // Start Music
  initAudio(data.musicUrl);

  // Set footer date
  document.getElementById('currentYear').innerText = new Date().getFullYear();
  
  // Unlock transition
  const lockScreen = document.getElementById('lockScreen');
  lockScreen.style.opacity = '0';
  
  setTimeout(() => {
    lockScreen.style.display = 'none';
    const mainContent = document.getElementById('mainContent');
    mainContent.style.display = 'block';
    // Small delay to allow CSS display rendering before opacity transition
    setTimeout(() => {
      mainContent.style.opacity = '1';
    }, 50);
  }, 1000);
}

// 11. Unlock Action Handler
async function attemptUnlock() {
  const dateInput = document.getElementById('dateInput').value;
  const errorMsg = document.getElementById('errorMsg');
  const lockCard = document.getElementById('lockCard');

  if (!dateInput) {
    errorMsg.innerText = "Please select a date, my love.";
    errorMsg.classList.add('visible');
    return;
  }

  // Input formats standard calendar input: YYYY-MM-DD
  // Let's decrypt using configData
  try {
    errorMsg.classList.remove('visible');
    const decrypted = await decryptData(
      dateInput,
      configData.salt,
      configData.iv,
      configData.ciphertext
    );
    
    // Success
    renderWebsite(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    // Vibrate/shake effect
    lockCard.classList.add('shake');
    errorMsg.innerText = "That date is not correct, my love. Try again.";
    errorMsg.classList.add('visible');
    
    setTimeout(() => {
      lockCard.classList.remove('shake');
    }, 500);
  }
}

// Load initialization
window.addEventListener('DOMContentLoaded', async () => {
  initHeartsCanvas();
  
  // Retrieve saved theme or default to light
  const savedTheme = localStorage.getItem('anniversaryTheme') || 'light';
  applyTheme(savedTheme);

  // Fetch encrypted config database
  try {
    const response = await fetch('config.json');
    configData = await response.json();
    
    if (configData.public && configData.public.hint) {
      document.getElementById('lockHint').innerText = configData.public.hint;
    }
  } catch (err) {
    console.error("Failed to load configuration file config.json:", err);
    document.getElementById('lockHint').innerText = "Database error. Make sure config.json exists.";
  }

  // Event Listeners
  document.getElementById('unlockBtn').addEventListener('click', attemptUnlock);
  
  // Allow unlocking by pressing Enter
  document.getElementById('dateInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') attemptUnlock();
  });

  // Toggle Theme Switcher Dropdown
  const themeSwitcher = document.getElementById('themeSwitcher');
  const themeBtn = document.getElementById('themeBtn');
  
  themeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeSwitcher.classList.toggle('active');
  });

  document.addEventListener('click', () => {
    themeSwitcher.classList.remove('active');
  });

  document.querySelectorAll('.theme-menu-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      applyTheme(e.target.getAttribute('data-theme'));
    });
  });

  // Envelope Opening interaction
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  envelopeWrapper.addEventListener('click', () => {
    envelopeWrapper.classList.toggle('open');
  });
});
