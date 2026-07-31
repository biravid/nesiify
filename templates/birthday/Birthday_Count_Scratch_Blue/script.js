/* ==========================================================================
   Birthday Countdown & Wish Website - Core JavaScript (Vanilla JS)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Check if configuration exists
  if (typeof BirthdayConfig === "undefined") {
    console.error("BirthdayConfig is not defined! Make sure config.js is loaded first.");
    return;
  }

  // State Variables
  let audioContext = null;
  let birthdayAudio = null;
  let isAudioPlaying = false;
  let bgParticles = [];
  let celebrationConfetti = [];
  let currentSlideIndex = 0;
  let galleryAutoplayTimer = null;
  let isScratching = false;
  let lastScratchPoint = { x: 0, y: 0 };
  let isScratchCompleted = false;

  // Initialize Elements
  const enterBtn = document.getElementById("enter-btn");
  const interactionOverlay = document.getElementById("interaction-overlay");
  const celebrantTitleName = document.getElementById("name-placeholder");
  const taglinePlaceholder = document.getElementById("tagline-placeholder");
  
  // Audio UI Elements
  const musicWidget = document.getElementById("music-widget");
  const musicToggle = document.getElementById("music-toggle");
  const musicPlayIcon = musicToggle.querySelector(".icon-play");
  const musicPauseIcon = musicToggle.querySelector(".icon-pause");
  const musicVisualizer = document.getElementById("music-visualizer");
  const volumeSlider = document.getElementById("volume-slider");

  // Countdown Elements
  const timerDays = document.getElementById("days");
  const timerHours = document.getElementById("hours");
  const timerMinutes = document.getElementById("minutes");
  const timerSeconds = document.getElementById("seconds");
  const countdownSection = document.getElementById("countdown-section");
  const celebrationBanner = document.getElementById("celebration-banner");

  // Gallery Elements
  const gallerySlider = document.getElementById("gallery-slider");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const sliderDotsContainer = document.getElementById("slider-dots");

  // Scratch Elements
  const scratchCanvas = document.getElementById("scratch-canvas");
  const scratchCtx = scratchCanvas.getContext("2d");
  const wishTextPlaceholder = document.getElementById("wish-text-placeholder");

  // Canvas References for Particle Effects
  const bgCanvas = document.getElementById("bg-canvas");
  const bgCtx = bgCanvas.getContext("2d");
  const confettiCanvas = document.getElementById("confetti-canvas");
  const confettiCtx = confettiCanvas.getContext("2d");

  // ==========================================================================
  // 1. Dynamic Setup from config.js
  // ==========================================================================
  
  function initDynamicContent() {
    // Set Celebrant Name & Document Title
    celebrantTitleName.innerText = BirthdayConfig.name;
    document.title = `Happy Birthday ${BirthdayConfig.name}! ✨`;
    
    // Set Wish Text for Scratch Card
    wishTextPlaceholder.innerText = BirthdayConfig.scratchMessage;

    // Inject Slides into Memory Gallery
    BirthdayConfig.memories.forEach((memory, index) => {
      // Create Slide Element
      const slide = document.createElement("div");
      slide.className = `slider-slide ${index === 0 ? "active" : ""}`;
      
      const frame = document.createElement("div");
      frame.className = "image-frame";

      const img = document.createElement("img");
      img.src = memory.url;
      img.alt = `Memory ${index + 1}`;
      img.className = "slider-image";
      img.onerror = () => {
        // Fallback in case image file is missing or fails to load
        img.src = `https://picsum.photos/800/500?random=${index}`;
      };

      const captionWrapper = document.createElement("div");
      captionWrapper.className = "slide-caption-wrapper";
      
      const caption = document.createElement("p");
      caption.className = "slide-caption";
      caption.innerText = memory.caption;

      frame.appendChild(img);
      captionWrapper.appendChild(caption);
      slide.appendChild(frame);
      slide.appendChild(captionWrapper);
      gallerySlider.appendChild(slide);

      // Create Dot Indicator
      const dot = document.createElement("span");
      dot.className = `dot ${index === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => goToSlide(index));
      sliderDotsContainer.appendChild(dot);
    });

    // Resize background particle canvas
    resizeCanvas(bgCanvas);
    resizeCanvas(confettiCanvas);
  }

  // Canvas resizing to support high DPI displays
  function resizeCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  window.addEventListener("resize", () => {
    resizeCanvas(bgCanvas);
    resizeCanvas(confettiCanvas);
    setupScratchCardCanvas(); // Redraw foil overlay on resize
  });

  // ==========================================================================
  // 2. Audio & Interactive Overlay Control
  // ==========================================================================
  
  function initAudio() {
    birthdayAudio = new Audio();
    birthdayAudio.src = BirthdayConfig.musicUrl;
    birthdayAudio.loop = true;
    birthdayAudio.volume = volumeSlider.value * BirthdayConfig.musicVolume;
    
    // Safety fallback: if audio URL fails to load, gracefully print warning without breaking other code
    birthdayAudio.addEventListener("error", (e) => {
      console.warn("Failed to load audio file. Background music will not play. Error: ", e);
    });
  }

  function playMusic() {
    if (!birthdayAudio) return;
    
    birthdayAudio.play().then(() => {
      isAudioPlaying = true;
      musicPlayIcon.classList.add("hidden");
      musicPauseIcon.classList.remove("hidden");
      musicVisualizer.classList.add("playing");
    }).catch(err => {
      console.warn("Audio autoplay blocked by browser or failed to load. Interaction overlay is designed to handle this.", err);
    });
  }

  function pauseMusic() {
    if (!birthdayAudio) return;
    birthdayAudio.pause();
    isAudioPlaying = false;
    musicPlayIcon.classList.remove("hidden");
    musicPauseIcon.classList.add("hidden");
    musicVisualizer.classList.remove("playing");
  }

  // Enter Celebration Click Action
  enterBtn.addEventListener("click", () => {
    // Hide Overlay with transition
    interactionOverlay.style.opacity = "0";
    setTimeout(() => {
      interactionOverlay.classList.add("hidden");
    }, 600);

    // Audio Autoplay context initiation
    initAudio();
    playMusic();
    
    // Start countdown timer updates
    startCountdown();
  });

  // Music Mute/Unmute Toggle Widget Click Action
  musicToggle.addEventListener("click", () => {
    if (isAudioPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  // Volume Slider Drag Action
  volumeSlider.addEventListener("input", (e) => {
    if (birthdayAudio) {
      birthdayAudio.volume = e.target.value * BirthdayConfig.musicVolume;
    }
  });

  // ==========================================================================
  // 3. Floating Sparkle Background Particles (Constant Ambient Effect)
  // ==========================================================================
  
  class AmbientParticle {
    constructor() {
      this.x = Math.random() * bgCanvas.width;
      this.y = Math.random() * bgCanvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * -0.5 - 0.2; // Move upwards
      this.alpha = Math.random() * 0.7 + 0.3;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.color = Math.random() > 0.5 ? "226, 183, 103" : "157, 78, 221"; // Gold or Purple
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around screen
      if (this.y < 0) {
        this.y = bgCanvas.height;
        this.x = Math.random() * bgCanvas.width;
      }
      if (this.x < 0 || this.x > bgCanvas.width) {
        this.speedX *= -1;
      }

      // Shimmering alpha fade
      this.alpha += this.pulseSpeed;
      if (this.alpha > 1 || this.alpha < 0.2) {
        this.pulseSpeed *= -1;
      }
    }

    draw() {
      bgCtx.beginPath();
      bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      bgCtx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      bgCtx.shadowBlur = this.size * 2;
      bgCtx.shadowColor = `rgba(${this.color}, 0.5)`;
      bgCtx.fill();
    }
  }

  // Populate ambient particles
  function initAmbientParticles() {
    bgParticles = [];
    const count = Math.min(Math.floor(bgCanvas.width / 15), 60);
    for (let i = 0; i < count; i++) {
      bgParticles.push(new AmbientParticle());
    }
  }

  function animateAmbientParticles() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgCtx.shadowColor = "transparent";
    bgCtx.shadowBlur = 0;
    
    // Draw and update each particle
    bgParticles.forEach(p => {
      p.update();
      p.draw();
    });
    
    requestAnimationFrame(animateAmbientParticles);
  }

  // ==========================================================================
  // 4. Confetti Canvas Celebration Engine
  // ==========================================================================
  
  const confettiColors = [
    "#e2b767", // gold
    "#9d4edd", // purple
    "#ff007f", // pink
    "#7b2cbf", // violet
    "#f3d489", // light gold
    "#ff758c", // coral
    "#ffffff"  // white
  ];

  class ConfettiParticle {
    constructor(x, y, isExplosion = false) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 8 + 6;
      this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      
      // Rectangular, triangular or circular
      this.shape = Math.random() > 0.6 ? "circle" : (Math.random() > 0.5 ? "triangle" : "rect");
      
      if (isExplosion) {
        // High random speeds in all directions
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 12 + 6;
        this.speedX = Math.cos(angle) * velocity;
        this.speedY = Math.sin(angle) * velocity;
      } else {
        // Falling speed
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 4 + 2;
      }

      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 8 - 4;
      this.gravity = 0.15;
      this.friction = 0.98;
      this.opacity = 1;
      this.decay = Math.random() * 0.01 + 0.005; // Fade out slowly
    }

    update() {
      this.speedX *= this.friction;
      this.speedY += this.gravity;
      this.speedY *= this.friction;

      this.x += this.speedX;
      this.y += this.speedY;

      this.rotation += this.rotationSpeed;
      this.opacity -= this.decay;
    }

    draw() {
      if (this.opacity <= 0) return;

      confettiCtx.save();
      confettiCtx.translate(this.x, this.y);
      confettiCtx.rotate((this.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = this.opacity;
      confettiCtx.fillStyle = this.color;

      if (this.shape === "circle") {
        confettiCtx.beginPath();
        confettiCtx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        confettiCtx.fill();
      } else if (this.shape === "triangle") {
        confettiCtx.beginPath();
        confettiCtx.moveTo(0, -this.size / 2);
        confettiCtx.lineTo(this.size / 2, this.size / 2);
        confettiCtx.lineTo(-this.size / 2, this.size / 2);
        confettiCtx.closePath();
        confettiCtx.fill();
      } else {
        confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      }

      confettiCtx.restore();
    }
  }

  function launchConfettiBurst() {
    // Burst from bottom-left corner
    for (let i = 0; i < 70; i++) {
      celebrationConfetti.push(new ConfettiParticle(50, confettiCanvas.height - 50, true));
    }
    // Burst from bottom-right corner
    for (let i = 0; i < 70; i++) {
      celebrationConfetti.push(new ConfettiParticle(confettiCanvas.width - 50, confettiCanvas.height - 50, true));
    }
  }

  function releaseRandomConfetti() {
    if (Math.random() < 0.2) {
      celebrationConfetti.push(new ConfettiParticle(Math.random() * confettiCanvas.width, -10, false));
    }
  }

  function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    // Filter out transparent ones
    celebrationConfetti = celebrationConfetti.filter(p => p.opacity > 0);

    celebrationConfetti.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animateConfetti);
  }

  // ==========================================================================
  // 5. Dynamic Countdown Clock
  // ==========================================================================
  
  let celebrationTriggered = false;

  function updateCountdownClock() {
    const targetDate = new Date(BirthdayConfig.birthdayDate).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      // Countdown finished -> Show Celebration Mode
      countdownSection.classList.add("hidden");
      celebrationBanner.classList.remove("hidden");
      taglinePlaceholder.innerText = "Let the party begin! 🎉🍰";
      
      // Trigger explosion once
      if (!celebrationTriggered) {
        launchConfettiBurst();
        celebrationTriggered = true;
        
        // Spawn subsequent bursts periodically
        setInterval(() => {
          launchConfettiBurst();
        }, 12000);
      }
      
      // Constant slow confetti falling
      releaseRandomConfetti();

      // Set digits to zero
      timerDays.innerText = "00";
      timerHours.innerText = "00";
      timerMinutes.innerText = "00";
      timerSeconds.innerText = "00";
      return;
    }

    // Still counting down
    countdownSection.classList.remove("hidden");
    celebrationBanner.classList.add("hidden");

    // Math conversions
    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    // Format numbers with leading zeros
    timerDays.innerText = d.toString().padStart(2, "0");
    timerHours.innerText = h.toString().padStart(2, "0");
    timerMinutes.innerText = m.toString().padStart(2, "0");
    timerSeconds.innerText = s.toString().padStart(2, "0");
  }

  function startCountdown() {
    updateCountdownClock();
    // Update timer text every 1 second
    setInterval(updateCountdownClock, 1000);
  }

  // ==========================================================================
  // 6. Sliding Photos Memory Gallery (Carousel)
  // ==========================================================================
  
  function goToSlide(index) {
    const slides = document.querySelectorAll(".slider-slide");
    const dots = document.querySelectorAll(".dot");
    if (slides.length === 0) return;

    // Handle wrap-arounds
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    currentSlideIndex = index;

    // Translate slider wrapper container
    gallerySlider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

    // Toggle active classes
    slides.forEach((slide, idx) => {
      if (idx === currentSlideIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === currentSlideIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Manual Slide Control Actions
  prevBtn.addEventListener("click", () => {
    goToSlide(currentSlideIndex - 1);
    resetGalleryAutoplay();
  });

  nextBtn.addEventListener("click", () => {
    goToSlide(currentSlideIndex + 1);
    resetGalleryAutoplay();
  });

  // Autoplay Slideshow
  function startGalleryAutoplay() {
    galleryAutoplayTimer = setInterval(() => {
      goToSlide(currentSlideIndex + 1);
    }, 6000); // Transition slides every 6 seconds
  }

  function resetGalleryAutoplay() {
    clearInterval(galleryAutoplayTimer);
    startGalleryAutoplay();
  }

  // Gestures for Swipe Navigation on Touch Devices
  let touchStartX = 0;
  let touchEndX = 0;

  gallerySlider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  gallerySlider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  }, { passive: true });

  function handleSwipeGesture() {
    const swipeThreshold = 50; // threshold distance in px
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swiped Left -> Show next slide
      goToSlide(currentSlideIndex + 1);
      resetGalleryAutoplay();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swiped Right -> Show previous slide
      goToSlide(currentSlideIndex - 1);
      resetGalleryAutoplay();
    }
  }

  // ==========================================================================
  // 7. Interactive Digital Scratch Card (Canvas Overlay drawing)
  // ==========================================================================
  
  function setupScratchCardCanvas() {
    if (isScratchCompleted) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = scratchCanvas.getBoundingClientRect();
    
    // Scale canvas resolution internally to match Device Pixel Ratio (sharp text/lines on high-res mobile)
    scratchCanvas.width = rect.width * dpr;
    scratchCanvas.height = rect.height * dpr;
    
    // Scale context back to normal size
    scratchCtx.scale(dpr, dpr);
    
    drawFoilOverlay(rect.width, rect.height);
  }

  function drawFoilOverlay(width, height) {
    // Fill background with a golden metallic gradient
    const gradient = scratchCtx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#aa7c11"); // Deep Bronze Gold
    gradient.addColorStop(0.3, "#e2b767"); // Primary Bright Gold
    gradient.addColorStop(0.5, "#f3d489"); // Pale Highlights Gold
    gradient.addColorStop(0.7, "#e2b767"); // Bright Gold
    gradient.addColorStop(1, "#8a640f"); // Dark Gold

    scratchCtx.fillStyle = gradient;
    scratchCtx.fillRect(0, 0, width, height);

    // Draw luxury borders
    scratchCtx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    scratchCtx.lineWidth = 2;
    scratchCtx.strokeRect(10, 10, width - 20, height - 20);

    scratchCtx.strokeStyle = "rgba(0, 0, 0, 0.15)";
    scratchCtx.lineWidth = 1;
    scratchCtx.strokeRect(12, 12, width - 24, height - 24);

    // Draw greeting text instructions over the gold foil
    scratchCtx.fillStyle = "#0c0a1a";
    scratchCtx.font = "italic bold 1.1rem 'Playfair Display', Georgia, serif";
    scratchCtx.textAlign = "center";
    scratchCtx.textBaseline = "middle";
    scratchCtx.fillText("🎁 Scratch Card 🎁", width / 2, height / 2 - 15);

    scratchCtx.fillStyle = "rgba(12, 10, 26, 0.75)";
    scratchCtx.font = "300 0.8rem 'Outfit', sans-serif";
    scratchCtx.fillText("Reveal your personal message here", width / 2, height / 2 + 15);

    // Add gold glitter noise
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 1.5;
      scratchCtx.fillStyle = Math.random() > 0.5 ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.15)";
      scratchCtx.beginPath();
      scratchCtx.arc(x, y, size, 0, Math.PI * 2);
      scratchCtx.fill();
    }
  }

  // Scratch Drawing Handlers
  function getMouseCoordinates(e) {
    const rect = scratchCanvas.getBoundingClientRect();
    let clientX, clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function startScratching(e) {
    isScratching = true;
    lastScratchPoint = getMouseCoordinates(e);
  }

  function scratchMove(e) {
    if (!isScratching || isScratchCompleted) return;
    
    // Prevent mobile page scroll when scratching
    if (e.cancelable) {
      e.preventDefault();
    }

    const currentPoint = getMouseCoordinates(e);

    // Draw circular path with composition destination-out to erase canvas pixels
    scratchCtx.save();
    scratchCtx.globalCompositeOperation = "destination-out";
    scratchCtx.beginPath();
    
    // Smooth scratching drawing by linking points with a thick line instead of single circles
    scratchCtx.moveTo(lastScratchPoint.x, lastScratchPoint.y);
    scratchCtx.lineTo(currentPoint.x, currentPoint.y);
    scratchCtx.lineWidth = 32; // Thickness of the scratching finger/mouse brush
    scratchCtx.lineCap = "round";
    scratchCtx.lineJoin = "round";
    scratchCtx.stroke();
    
    scratchCtx.restore();

    lastScratchPoint = currentPoint;

    // Check scratching percentage occasionally to save operations
    if (Math.random() < 0.15) {
      checkScratchPercentage();
    }
  }

  function stopScratching() {
    isScratching = false;
  }

  // Percentage Calculations to auto-clear
  function checkScratchPercentage() {
    if (isScratchCompleted) return;

    const width = scratchCanvas.width;
    const height = scratchCanvas.height;
    
    // Check alpha channels in a pixel grid
    const imgData = scratchCtx.getImageData(0, 0, width, height);
    const pixels = imgData.data;
    let clearedCount = 0;
    const step = 20; // Sample every 20th pixel to keep performance smooth
    let totalSamples = 0;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        totalSamples++;
        const index = (y * width + x) * 4;
        // alpha < 128 means pixel is transparent or mostly erased
        if (pixels[index + 3] < 128) {
          clearedCount++;
        }
      }
    }

    const percentage = (clearedCount / totalSamples) * 100;
    
    if (percentage > 45) {
      revealHiddenCard();
    }
  }

  function revealHiddenCard() {
    isScratchCompleted = true;
    
    // Trigger smooth fade transition
    scratchCanvas.classList.add("fade-out");
    
    // Remove instruction text
    const instruct = document.getElementById("scratch-instructions");
    if (instruct) {
      instruct.style.opacity = "0";
      setTimeout(() => instruct.classList.add("hidden"), 500);
    }

    // Launch celebratory confetti burst
    launchConfettiBurst();
  }

  // Event Listeners for scratch card controls
  scratchCanvas.addEventListener("mousedown", startScratching);
  scratchCanvas.addEventListener("mousemove", scratchMove);
  window.addEventListener("mouseup", stopScratching);

  scratchCanvas.addEventListener("touchstart", startScratching, { passive: false });
  scratchCanvas.addEventListener("touchmove", scratchMove, { passive: false });
  window.addEventListener("touchend", stopScratching);

  // ==========================================================================
  // 8. Initialization & Execution Orchestration
  // ==========================================================================
  
  // Setup elements & configurations
  initDynamicContent();
  
  // Ambient floating background dots
  initAmbientParticles();
  animateAmbientParticles();
  
  // Confetti overlay elements
  animateConfetti();

  // Load scratch canvas setup
  setTimeout(setupScratchCardCanvas, 150);

  // Start gallery rotation
  startGalleryAutoplay();
});
