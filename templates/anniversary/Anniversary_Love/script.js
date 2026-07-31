/* ==========================================================================
   Anniversary Surprise Website Core JavaScript
   Features: Canvas Particle Weather Systems, Cursor Trail/Glow, Timeline,
   Masonry Lightbox (with Gradient Fallback), Quotes Carousel, Audio Player,
   Gift Box opening, Password verification, and typing animation.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. User Settings Configuration
   -------------------------------------------------------------------------- */
const CONFIG = {
  // Wedding Date (Format: YYYY-MM-DDTHH:MM:SS)
  weddingDate: "2023-06-18T10:00:00",
  
  // Countdown Mode:
  // 'since' -> Show time elapsed since the wedding (Days of Love)
  // 'until' -> Show countdown until the next upcoming anniversary
  countdownMode: "since", 
  
  // Letter Content
  letterGreeting: "My Dearest Husband / Wife,",
  letterMessage: `Happy Anniversary, my love! 💖

From the moment our eyes first met, my world took on a completely different color. Together, we have built a beautiful life filled with shared cups of coffee, silent conversations, warm embraces, and endless laughter.

Thank you for being my constant support, my greatest adventure, and my safest home. I promise to hold your hand, share your dreams, and walk beside you through every season that lies ahead.

Here's to us, our past, and the beautiful pages of our future yet to be written.`,
  letterSignature: "Yours Forever,",
  letterAuthor: "My Beloved",

  // Secret password lock configuration
  secretPassword: "love", // Password is case-insensitive, correct answers: "love" or wedding date e.g. "0618" or "1208"

  // YouTube / Vimeo Video Embed URL (Use embed code link, not simple page link)
  videoEmbedUrl: "https://www.youtube.com/embed/a1_M1_wW_lQ", // Replace with your wedding video/song video url

  // Vows & Quotes Carousel Content
  quotes: [
    {
      text: "I love you not only for what you are, but for what I am when I am with you. I love you for the part of me that you bring out.",
      author: "Roy Croft"
    },
    {
      text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
      author: "Maya Angelou"
    },
    {
      text: "If I had a flower for every time I thought of you... I could walk through my garden forever.",
      author: "Alfred Tennyson"
    },
    {
      text: "Love does not consist in gazing at each other, but in looking outward together in the same direction.",
      author: "Antoine de Saint-Exupéry"
    }
  ]
};

/* --------------------------------------------------------------------------
   2. Image Load Error Fallback Controller
   -------------------------------------------------------------------------- */
window.handleImageError = function(img) {
  const container = img.parentElement;
  if (!container) return;
  
  // Add class to signal styling fallback triggers
  container.classList.add('image-fallback-active');
  
  // Create beautiful fallback div card
  const fallback = document.createElement('div');
  fallback.className = 'image-fallback-placeholder';
  
  // Give it a generic heart or symbol
  fallback.innerHTML = `
    <span class="fallback-icon">💖</span>
    <span class="fallback-text">Love & Memories</span>
  `;
  
  // Hide broken img tag, append gradient fallback
  img.style.display = 'none';
  container.appendChild(fallback);
  
  // Mark the parent container so lightbox knows to show gradient fallback
  container.setAttribute('data-image-failed', 'true');
};

/* --------------------------------------------------------------------------
   3. Global Page Initialization & Setup
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Apply Saved Theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  // Initialize Elements
  initThemeToggle();
  initMobileNavigation();
  initScrollEffects();
  initCountdown();
  initEnvelopeLetter();
  initTimelineProgress();
  initMasonryLightbox();
  initQuotesCarousel();
  initAudioPlayer();
  initVideoPlayer();
  initGiftBox();
  initLockBox();
  initCelebrationTriggers();
  
  // Initialize Global Canvas Particles
  initAmbientCanvas();
});

/* Theme Switcher Logic */
function initThemeToggle() {
  const toggleBtn = document.getElementById("themeToggleBtn");
  toggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById("themeIcon");
  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

/* Mobile Sidebar Drawer Navigation */
function initMobileNavigation() {
  const menuToggle = document.getElementById("mobileNavToggle");
  const mobileMenu = document.getElementById("mobileNavMenu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("open");
    });
  });

  // Close menus if user clicks outside
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("open");
    }
  });
}

/* --------------------------------------------------------------------------
   4. Scroll Progress & Scroll Animation Reveals
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const progressBar = document.getElementById("progressBar");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // Scroll Event Handler
  window.addEventListener("scroll", () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const scrollPercent = (window.scrollY / totalScroll) * 100;
      progressBar.style.width = scrollPercent + "%";
    }

    // Scroll to Top Button Visibility
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }

    // Active Navigation Highlighting
    let currentSectionId = "";
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSectionId = sec.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Reveal Animations via Intersection Observer
  const revealElements = document.querySelectorAll(".reveal-fade-in, .reveal-slide-left, .reveal-slide-right");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Custom Cursor Glow effect (Desktop)
  const cursorGlow = document.querySelector(".cursor-glow");
  if (cursorGlow) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
    });
  }

  // Ripple Buttons Effect
  const rippleButtons = document.querySelectorAll(".ripple");
  rippleButtons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const circle = document.createElement("span");
      circle.className = "ripple-circle";
      circle.style.left = x + "px";
      circle.style.top = y + "px";
      
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });
}

/* --------------------------------------------------------------------------
   5. Countdown & Elapsed Time Ticker
   -------------------------------------------------------------------------- */
function initCountdown() {
  const targetDate = new Date(CONFIG.weddingDate).getTime();
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const subtitleEl = document.querySelector(".hero-subtitle");

  function updateTicker() {
    const now = new Date().getTime();
    let difference;
    
    if (CONFIG.countdownMode === "since") {
      // Calculate total time elapsed since wedding day
      difference = now - targetDate;
      if (subtitleEl && !subtitleEl.dataset.customized) {
        subtitleEl.innerHTML = `Celebrating our beautiful journey of marriage: <span class="gold-text">Days of Togetherness</span>`;
        subtitleEl.dataset.customized = "true";
      }
    } else {
      // Calculate time remaining until next upcoming anniversary
      const wedding = new Date(CONFIG.weddingDate);
      const currentYear = new Date().getFullYear();
      let anniversary = new Date(currentYear, wedding.getMonth(), wedding.getDate(), wedding.getHours(), wedding.getMinutes());
      
      if (now > anniversary.getTime()) {
        // Anniversary already passed this year, count to next year
        anniversary.setFullYear(currentYear + 1);
      }
      difference = anniversary.getTime() - now;
      if (subtitleEl && !subtitleEl.dataset.customized) {
        subtitleEl.innerHTML = `Countdown to our upcoming celebration of marriage anniversary:`;
        subtitleEl.dataset.customized = "true";
      }
    }

    if (difference < 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, "0");
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
  }

  updateTicker();
  setInterval(updateTicker, 1000);
}

/* --------------------------------------------------------------------------
   6. Envelope Letter & Typing Animation
   -------------------------------------------------------------------------- */
function initEnvelopeLetter() {
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const seal = document.getElementById("envelopeSeal");
  const closeBtn = document.getElementById("closeLetterBtn");
  const panel = document.getElementById("letterControlPanel");
  const typingTextEl = document.getElementById("typingText");
  
  let typingTimer = null;
  let letterOpen = false;

  // Open Letter
  function openEnvelope() {
    if (letterOpen) return;
    letterOpen = true;
    
    envelopeWrapper.classList.add("open");
    panel.classList.remove("hidden");
    panel.style.opacity = 1;
    
    // Begin typing content after envelope slides up
    setTimeout(() => {
      startTypingText();
    }, 1100);
  }

  // Close Letter
  function closeEnvelope() {
    letterOpen = false;
    envelopeWrapper.classList.remove("open");
    panel.classList.add("hidden");
    panel.style.opacity = 0;
    
    // Clear typing animation
    if (typingTimer) clearInterval(typingTimer);
    typingTextEl.textContent = "";
  }

  seal.addEventListener("click", openEnvelope);
  envelopeWrapper.addEventListener("click", (e) => {
    // Avoid double trigger if clicking buttons inside the panel
    if (!letterOpen) openEnvelope();
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeEnvelope();
  });

  // Typewriter algorithm
  function startTypingText() {
    if (typingTimer) clearInterval(typingTimer);
    
    typingTextEl.textContent = "";
    const message = CONFIG.letterMessage;
    let idx = 0;

    typingTimer = setInterval(() => {
      if (idx < message.length) {
        typingTextEl.textContent += message.charAt(idx);
        idx++;
      } else {
        clearInterval(typingTimer);
      }
    }, 35); // Adjust typing speed here (lower = faster)
  }
}

/* --------------------------------------------------------------------------
   7. Timeline Vertical Scroll Progress Indicator
   -------------------------------------------------------------------------- */
function initTimelineProgress() {
  const timelineLine = document.getElementById("timelineLine");
  const timelineProgress = document.getElementById("timelineProgress");
  
  if (!timelineLine || !timelineProgress) return;

  window.addEventListener("scroll", () => {
    const rect = timelineLine.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Scroll progress relative to position of timeline line on screen
    if (rect.top < windowHeight && rect.bottom > 0) {
      const totalLineHeight = rect.height;
      const visibleScrolled = windowHeight - rect.top;
      const progressPercent = Math.min(Math.max((visibleScrolled / totalLineHeight) * 100, 0), 100);
      
      // Fine tune progress bar fill
      timelineProgress.style.height = (progressPercent * 0.9) + "%";
    }
  });
}

/* --------------------------------------------------------------------------
   8. Interactive Masonry Gallery Lightbox Modal
   -------------------------------------------------------------------------- */
function initMasonryLightbox() {
  const gridItems = document.querySelectorAll(".masonry-item");
  const modal = document.getElementById("lightboxModal");
  const content = document.getElementById("lightboxContent");
  const caption = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxCloseBtn");
  const prevBtn = document.getElementById("lightboxPrevBtn");
  const nextBtn = document.getElementById("lightboxNextBtn");

  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function showImage(idx) {
    currentIndex = idx;
    content.innerHTML = "";
    
    const targetItem = gridItems[idx];
    const originalImg = targetItem.querySelector("img");
    const descText = targetItem.querySelector(".masonry-desc")?.textContent || originalImg.alt;
    const isFailed = targetItem.getAttribute("data-image-failed") === "true";

    if (isFailed) {
      // Re-create beautiful gradient fallback for lightbox view
      const fbBox = document.createElement("div");
      fbBox.className = "image-fallback-placeholder";
      fbBox.innerHTML = `
        <span class="fallback-icon">💖</span>
        <span class="fallback-text">Our Memory Box</span>
      `;
      content.appendChild(fbBox);
    } else {
      // Build a fresh high quality image inside lightbox
      const img = document.createElement("img");
      img.src = originalImg.src;
      img.alt = originalImg.alt;
      content.appendChild(img);
    }
    
    caption.textContent = descText;
    modal.classList.add("open");
  }

  function nextImage() {
    showImage((currentIndex + 1) % gridItems.length);
  }

  function prevImage() {
    showImage((currentIndex - 1 + gridItems.length) % gridItems.length);
  }

  function closeModal() {
    modal.classList.remove("open");
  }

  // Click gallery card
  gridItems.forEach((item, index) => {
    item.addEventListener("click", () => showImage(index));
  });

  // Lightbox Buttons
  closeBtn.addEventListener("click", closeModal);
  nextBtn.addEventListener("click", (e) => { e.stopPropagation(); nextImage(); });
  prevBtn.addEventListener("click", (e) => { e.stopPropagation(); prevImage(); });
  
  // Close on backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target === content) {
      closeModal();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeModal();
  });

  // Touch/Swipe support for mobile devices
  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swiped Left -> Next Image
      nextImage();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swiped Right -> Previous Image
      prevImage();
    }
  }
}

/* --------------------------------------------------------------------------
   9. Quotes Carousel Slider
   -------------------------------------------------------------------------- */
function initQuotesCarousel() {
  const track = document.getElementById("carouselTrack");
  const dotsContainer = document.getElementById("carouselDots");
  
  // Clear HTML content of track, insert CONFIG quotes
  track.innerHTML = "";
  CONFIG.quotes.forEach((q, idx) => {
    const slide = document.createElement("div");
    slide.className = `carousel-slide ${idx === 0 ? "active" : ""}`;
    slide.innerHTML = `
      <p class="quote-text">"${q.text}"</p>
      <p class="quote-author">— ${q.author}</p>
    `;
    track.appendChild(slide);
  });

  const slides = track.querySelectorAll(".carousel-slide");
  let activeIdx = 0;
  let intervalTimer = null;

  // Render control dots
  dotsContainer.innerHTML = "";
  slides.forEach((_, idx) => {
    const dot = document.createElement("div");
    dot.className = `carousel-dot ${idx === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".carousel-dot");

  function goToSlide(idx) {
    slides[activeIdx].classList.remove("active");
    dots[activeIdx].classList.remove("active");

    activeIdx = idx;

    slides[activeIdx].classList.add("active");
    dots[activeIdx].classList.add("active");
    resetTimer();
  }

  function nextSlide() {
    goToSlide((activeIdx + 1) % slides.length);
  }

  function resetTimer() {
    if (intervalTimer) clearInterval(intervalTimer);
    intervalTimer = setInterval(nextSlide, 6000); // Transitions quotes every 6 seconds
  }

  resetTimer();
}

/* --------------------------------------------------------------------------
   10. Custom Music Audio Player
   -------------------------------------------------------------------------- */
function initAudioPlayer() {
  const bgMusic = document.getElementById("bg-music");
  const playToggleHeader = document.getElementById("musicToggleBtn");
  const musicIconHeader = document.getElementById("musicIcon");
  
  const playBtnPlayer = document.getElementById("playerPlayBtn");
  const playIconPlayer = document.getElementById("playerPlayIcon");
  const record = document.getElementById("vinylRecord");
  
  const progressSlider = document.getElementById("musicProgress");
  const volumeSlider = document.getElementById("musicVolume");
  const currentTimeTxt = document.getElementById("currentTime");
  const durationTimeTxt = document.getElementById("durationTime");

  let isPlaying = false;

  // Standard play-pause toggle
  function toggleMusic() {
    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
      
      // Update UI states
      musicIconHeader.textContent = "🔇";
      playIconPlayer.textContent = "▶";
      record.classList.remove("playing");
      playToggleHeader.title = "Play Music";
    } else {
      bgMusic.play().then(() => {
        isPlaying = true;
        musicIconHeader.textContent = "🔊";
        playIconPlayer.textContent = "⏸";
        record.classList.add("playing");
        playToggleHeader.title = "Pause Music";
      }).catch(err => {
        console.log("Autoplay was blocked by browser. User needs to interact first.", err);
      });
    }
  }

  // Add event listeners to control buttons
  playToggleHeader.addEventListener("click", toggleMusic);
  playBtnPlayer.addEventListener("click", toggleMusic);

  // Sync timeline progress
  bgMusic.addEventListener("timeupdate", () => {
    if (bgMusic.duration) {
      const progressPercent = (bgMusic.currentTime / bgMusic.duration) * 100;
      progressSlider.value = progressPercent;
      
      // Format timestamps
      currentTimeTxt.textContent = formatTime(bgMusic.currentTime);
      durationTimeTxt.textContent = formatTime(bgMusic.duration);
    }
  });

  // Track dragging behavior on seeker
  progressSlider.addEventListener("input", () => {
    if (bgMusic.duration) {
      const seekTime = (progressSlider.value / 100) * bgMusic.duration;
      bgMusic.currentTime = seekTime;
    }
  });

  // Track volume changes
  volumeSlider.addEventListener("input", () => {
    bgMusic.volume = volumeSlider.value / 100;
    if (bgMusic.volume === 0) {
      musicIconHeader.textContent = "🔇";
    } else {
      musicIconHeader.textContent = "🔊";
    }
  });

  // Helper formats seconds to mm:ss
  function formatTime(secs) {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return mins + ":" + remainingSecs.toString().padStart(2, "0");
  }

  // Attempt romantic background play on first user interaction
  const triggerAutoPlay = () => {
    if (!isPlaying) {
      toggleMusic();
    }
    document.removeEventListener("click", triggerAutoPlay);
  };
  document.addEventListener("click", triggerAutoPlay);
}

/* --------------------------------------------------------------------------
   11. Video Preview Overlay Frame Loader
   -------------------------------------------------------------------------- */
function initVideoPlayer() {
  const placeholder = document.getElementById("videoPlaceholder");
  const playBtn = document.getElementById("playVideoBtn");
  const realVideo = document.getElementById("realVideoWrapper");
  const iframe = document.getElementById("videoIframe");

  function launchVideo() {
    // Insert actual YouTube/Vimeo embed src to trigger lazy loading
    iframe.src = CONFIG.videoEmbedUrl + "?autoplay=1&mute=0";
    realVideo.classList.remove("hidden");
    placeholder.style.backgroundImage = "none";
    
    // Pause background website soundtrack to prioritize wedding video audio
    const bgMusic = document.getElementById("bg-music");
    if (bgMusic && !bgMusic.paused) {
      // Simulate click trigger to update record spinning and icons
      document.getElementById("musicToggleBtn").click();
    }
  }

  playBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    launchVideo();
  });
}

/* --------------------------------------------------------------------------
   12. Gift Box Opening & Burst Celebrations
   -------------------------------------------------------------------------- */
function initGiftBox() {
  const gift = document.getElementById("giftBox");
  const surprise = document.getElementById("giftSurprise");
  let isOpened = false;

  gift.addEventListener("click", () => {
    if (isOpened) return;
    
    // Trigger shake animation
    gift.classList.add("shake");
    
    setTimeout(() => {
      gift.classList.remove("shake");
      gift.classList.add("open");
      isOpened = true;
      
      // Delay surprise voucher presentation, trigger massive firework burst!
      setTimeout(() => {
        surprise.classList.remove("hidden");
        triggerCelebrationBurst('fireworks');
        triggerCelebrationBurst('balloons');
      }, 300);
    }, 800);
  });
}

/* --------------------------------------------------------------------------
   13. Secret Password Lock Validation
   -------------------------------------------------------------------------- */
function initLockBox() {
  const passwordInput = document.getElementById("secretPassword");
  const toggleEye = document.getElementById("passwordToggleEye");
  const unlockBtn = document.getElementById("unlockBtn");
  const errorMsg = document.getElementById("lockErrorMsg");
  const formBox = document.getElementById("lockForm");
  const secretContent = document.getElementById("secretContent");

  // Show/Hide password text
  toggleEye.addEventListener("click", () => {
    const isPass = passwordInput.getAttribute("type") === "password";
    passwordInput.setAttribute("type", isPass ? "text" : "password");
    toggleEye.textContent = isPass ? "🙈" : "👁️";
  });

  // Verify inputs
  function checkPassword() {
    const val = passwordInput.value.trim().toLowerCase();
    const correctVal = CONFIG.secretPassword.toLowerCase();
    
    // Accept either configured secret string or wedding month/day combo (e.g. 0618)
    const weddingMatch = CONFIG.weddingDate.replace(/-|:|T/g, "").substring(4, 8); // Extracts MonthDay e.g., '0618'

    if (val === correctVal || val === weddingMatch) {
      errorMsg.classList.add("hidden");
      
      // Run unlock animations
      formBox.classList.add("hidden");
      secretContent.classList.remove("hidden");
      
      // Launch romantic hearts burst!
      triggerCelebrationBurst('hearts');
    } else {
      errorMsg.classList.remove("hidden");
      // Add wiggle effect on error
      passwordInput.classList.add("error-shake");
      setTimeout(() => passwordInput.classList.remove("error-shake"), 400);
    }
  }

  unlockBtn.addEventListener("click", checkPassword);
  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkPassword();
  });
}

/* --------------------------------------------------------------------------
   14. Ambient Weather Canvas Engine & Cursor Trail
   -------------------------------------------------------------------------- */
let canvas, ctx;
let particlesList = [];
let celebrationParticlesList = [];
let activeEffectMode = "none"; // 'hearts', 'snow', 'rain', 'sparkles', 'none'
let canvasAnimationId = null;

// Mouse coordinates tracker for cursor sparkles
let lastMousePos = { x: 0, y: 0 };
let mouseMoved = false;

function initAmbientCanvas() {
  canvas = document.getElementById("ambient-canvas");
  ctx = canvas.getContext("2d");
  
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  
  // Track cursor coordinates
  window.addEventListener("mousemove", (e) => {
    lastMousePos.x = e.clientX;
    lastMousePos.y = e.clientY;
    mouseMoved = true;
    
    // Spawn immediate sparkle on mouse moves if sparkles are active
    if (activeEffectMode === "sparkles" && Math.random() < 0.25) {
      spawnSparkleParticle(e.clientX, e.clientY);
    }
  });

  // Connect Selector Dropdown Buttons
  const selectMenuBtn = document.getElementById("weatherMenuBtn");
  const dropdown = document.getElementById("weatherDropdown");
  const options = document.querySelectorAll(".weather-opt");

  selectMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });

  document.addEventListener("click", () => {
    dropdown.classList.remove("open");
  });

  options.forEach(opt => {
    opt.addEventListener("click", (e) => {
      e.stopPropagation();
      options.forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
      
      const targetEffect = opt.getAttribute("data-effect");
      changeAmbientWeatherMode(targetEffect);
      dropdown.classList.remove("open");
    });
  });

  // Start Animation loop
  runParticlesAnimationLoop();
}

function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function changeAmbientWeatherMode(mode) {
  activeEffectMode = mode;
  particlesList = []; // Clear existing elements to avoid transition lag
  
  if (mode === "none") return;

  // Pre-seed some weather elements so the screen isn't empty immediately
  const count = mode === "rain" ? 100 : 40;
  for (let i = 0; i < count; i++) {
    particlesList.push(createWeatherParticle(true));
  }
}

/* Base Weather Particle Factory */
function createWeatherParticle(randomStartHeight = false) {
  const p = {
    x: Math.random() * canvas.width,
    y: randomStartHeight ? Math.random() * canvas.height : -20,
    size: 0,
    speedY: 0,
    speedX: 0,
    alpha: 0,
    type: activeEffectMode,
    color: "",
    angle: Math.random() * Math.PI * 2,
    swaySpeed: 0.01 + Math.random() * 0.02
  };

  if (activeEffectMode === "snow") {
    p.size = 2 + Math.random() * 4;
    p.speedY = 1 + Math.random() * 1.5;
    p.speedX = -0.5 + Math.random() * 1;
    p.alpha = 0.3 + Math.random() * 0.5;
  } else if (activeEffectMode === "rain") {
    p.size = 1 + Math.random() * 1.5; // Represents width of drop
    p.speedY = 8 + Math.random() * 5;
    p.speedX = -0.5; // Slight slant
    p.alpha = 0.2 + Math.random() * 0.3;
    p.length = 10 + Math.random() * 15;
  } else if (activeEffectMode === "hearts") {
    p.size = 8 + Math.random() * 10;
    p.speedY = -(0.5 + Math.random() * 1); // Float upwards
    p.speedX = -0.5 + Math.random() * 1;
    p.alpha = 0.4 + Math.random() * 0.4;
    p.color = `hsla(${340 + Math.random() * 30}, 85%, 65%, ${p.alpha})`; // Pink/Crimson tones
    if (randomStartHeight) {
      p.y = Math.random() * canvas.height;
    } else {
      p.y = canvas.height + 20; // Start at bottom
    }
  } else if (activeEffectMode === "sparkles") {
    p.x = Math.random() * canvas.width;
    p.y = Math.random() * canvas.height;
    p.size = 2 + Math.random() * 3;
    p.alpha = 0.1;
    p.fadeSpeed = 0.005 + Math.random() * 0.01;
    p.growing = true;
    p.color = `hsla(${45 + Math.random() * 15}, 85%, 65%, 1)`; // Luxury gold tone
  }

  return p;
}

// Special custom cursor sparkles
function spawnSparkleParticle(x, y) {
  const p = {
    x: x + (Math.random() * 20 - 10),
    y: y + (Math.random() * 20 - 10),
    size: 2 + Math.random() * 3,
    alpha: 0.8,
    fadeSpeed: 0.02 + Math.random() * 0.02,
    growing: false,
    speedX: (Math.random() - 0.5) * 1.5,
    speedY: (Math.random() - 0.5) * 1.5 - 0.5,
    color: `hsla(${45 + Math.random() * 15}, 90%, 70%, 1)`,
    type: "sparkles_cursor"
  };
  celebrationParticlesList.push(p);
}

/* Draw a heart shape on canvas coordinate */
function drawHeartShape(cx, cy, size, color) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = color;
  
  // Shift to heart center
  ctx.translate(cx, cy);
  ctx.moveTo(0, -size / 4);
  
  // Left half
  ctx.bezierCurveTo(-size / 2, -size / 2, -size, -size / 4, -size, size / 4);
  ctx.bezierCurveTo(-size, size * 0.6, -size / 4, size * 0.8, 0, size);
  
  // Right half
  ctx.bezierCurveTo(size / 4, size * 0.8, size, size * 0.6, size, size / 4);
  ctx.bezierCurveTo(size, -size / 4, size / 2, -size / 2, 0, -size / 4);
  
  ctx.fill();
  ctx.restore();
}

/* Sparkle cross element */
function drawSparkleCross(cx, cy, size, color, alpha) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  
  // Draw vertical star spike
  ctx.moveTo(cx, cy - size * 2);
  ctx.lineTo(cx, cy + size * 2);
  
  // Draw horizontal spike
  ctx.moveTo(cx - size * 2, cy);
  ctx.lineTo(cx + size * 2, cy);
  
  ctx.stroke();
  ctx.restore();
}

/* --------------------------------------------------------------------------
   15. Explosive Celebrations System (Fireworks, Confetti, and Balloons)
   -------------------------------------------------------------------------- */
function initCelebrationTriggers() {
  const heartsBtn = document.getElementById("triggerHeartsBtn");
  const balloonsBtn = document.getElementById("triggerBalloonsBtn");
  const fireworksBtn = document.getElementById("triggerFireworksBtn");

  heartsBtn.addEventListener("click", () => triggerCelebrationBurst("hearts"));
  balloonsBtn.addEventListener("click", () => triggerCelebrationBurst("balloons"));
  fireworksBtn.addEventListener("click", () => triggerCelebrationBurst("fireworks"));
}

function triggerCelebrationBurst(type) {
  if (type === "hearts") {
    // Spawn 80 hearts from the bottom
    for (let i = 0; i < 80; i++) {
      const p = {
        x: Math.random() * canvas.width,
        y: canvas.height + 20 + (Math.random() * 200),
        size: 8 + Math.random() * 15,
        speedY: -(2 + Math.random() * 4),
        speedX: -1 + Math.random() * 2,
        alpha: 0.9,
        color: `hsla(${335 + Math.random() * 40}, 90%, 65%, 0.8)`,
        type: "hearts_burst",
        swaySpeed: 0.02 + Math.random() * 0.02,
        angle: Math.random() * Math.PI
      };
      celebrationParticlesList.push(p);
    }
  } else if (type === "balloons") {
    // Spawn 20 large balloons floating upwards
    for (let i = 0; i < 20; i++) {
      const p = {
        x: Math.random() * canvas.width,
        y: canvas.height + 60 + (Math.random() * 150),
        size: 25 + Math.random() * 20, // Balloon radius
        speedY: -(1.5 + Math.random() * 2),
        speedX: -0.75 + Math.random() * 1.5,
        color: `hsla(${Math.random() * 360}, 85%, 60%, 0.95)`,
        type: "balloons_burst",
        stringLen: 40 + Math.random() * 20,
        swaySpeed: 0.01 + Math.random() * 0.01,
        angle: Math.random() * Math.PI
      };
      celebrationParticlesList.push(p);
    }
  } else if (type === "fireworks") {
    // Launch 5 distinct fireworks rockets
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        launchFireworkRocket();
      }, i * 350);
    }
  }
}

function launchFireworkRocket() {
  const p = {
    x: 100 + Math.random() * (canvas.width - 200),
    y: canvas.height + 10,
    targetY: 100 + Math.random() * (canvas.height * 0.5),
    speedY: -(7 + Math.random() * 5),
    speedX: -1 + Math.random() * 2,
    size: 3,
    color: "#fff",
    type: "firework_rocket"
  };
  celebrationParticlesList.push(p);
}

function explodeRocket(rx, ry) {
  const particleCount = 60 + Math.floor(Math.random() * 40);
  const baseHue = Math.random() * 360;
  
  // Confetti ribbons + firework dust
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 6;
    
    const p = {
      x: rx,
      y: ry,
      speedX: Math.cos(angle) * velocity,
      speedY: Math.sin(angle) * velocity,
      size: 1.5 + Math.random() * 2.5,
      alpha: 1.0,
      decay: 0.012 + Math.random() * 0.015,
      gravity: 0.06,
      color: `hsla(${baseHue + (Math.random() * 45 - 22)}, 90%, 65%, 1)`,
      type: "firework_sparks"
    };
    celebrationParticlesList.push(p);
  }
}

/* Draw a Balloon shape with ribbon string */
function drawBalloon(bx, by, r, color, stringLen) {
  ctx.save();
  ctx.beginPath();
  
  // Draw primary oval body
  ctx.fillStyle = color;
  ctx.ellipse(bx, by, r * 0.8, r, 0, 0, Math.PI * 2);
  ctx.fill();

  // Draw tiny triangular tie at balloon bottom
  ctx.beginPath();
  ctx.moveTo(bx, by + r);
  ctx.lineTo(bx - 5, by + r + 6);
  ctx.lineTo(bx + 5, by + r + 6);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  // Draw wavy hanging string line
  ctx.beginPath();
  ctx.strokeStyle = "rgba(150, 150, 150, 0.4)";
  ctx.lineWidth = 1;
  ctx.moveTo(bx, by + r + 6);
  ctx.bezierCurveTo(
    bx - 8, by + r + 20, 
    bx + 8, by + r + stringLen - 20, 
    bx, by + r + stringLen
  );
  ctx.stroke();
  
  ctx.restore();
}

/* --------------------------------------------------------------------------
   16. High-Performance Particles Refresh Loop
   -------------------------------------------------------------------------- */
function runParticlesAnimationLoop() {
  // Semi transparent clear to give fireworks and sparkles a subtle trail
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Update & Draw Weather particles
  if (activeEffectMode !== "none") {
    // Keep list populated
    const targetCount = activeEffectMode === "rain" ? 100 : 40;
    while (particlesList.length < targetCount) {
      particlesList.push(createWeatherParticle(false));
    }

    particlesList.forEach((p, idx) => {
      p.angle += p.swaySpeed;

      if (p.type === "snow") {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.5;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Boundaries
        if (p.y > canvas.height) {
          particlesList[idx] = createWeatherParticle(false);
        }
      } else if (p.type === "rain") {
        p.y += p.speedY;
        p.x += p.speedX;
        
        ctx.strokeStyle = `rgba(174, 219, 240, ${p.alpha})`;
        ctx.lineWidth = p.size;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.speedX, p.y + p.length);
        ctx.stroke();

        if (p.y > canvas.height) {
          particlesList[idx] = createWeatherParticle(false);
        }
      } else if (p.type === "hearts") {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.4;
        
        drawHeartShape(p.x, p.y, p.size, p.color);

        if (p.y < -20) {
          particlesList[idx] = createWeatherParticle(false);
        }
      } else if (p.type === "sparkles") {
        // Handle fading pulse
        if (p.growing) {
          p.alpha += p.fadeSpeed;
          if (p.alpha >= 0.8) p.growing = false;
        } else {
          p.alpha -= p.fadeSpeed;
        }

        drawSparkleCross(p.x, p.y, p.size, p.color, p.alpha);

        if (p.alpha <= 0 || p.y > canvas.height) {
          particlesList[idx] = createWeatherParticle(false);
        }
      }
    });
  }

  // 2. Update & Draw Celebration / Burst Particles
  celebrationParticlesList.forEach((p, idx) => {
    p.angle = (p.angle || 0) + (p.swaySpeed || 0);

    if (p.type === "hearts_burst") {
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.angle) * 0.6;
      p.alpha -= 0.005; // Fade over time
      
      const parsedColor = p.color.replace("0.8", p.alpha.toFixed(2));
      drawHeartShape(p.x, p.y, p.size, parsedColor);

      if (p.alpha <= 0 || p.y < -20) {
        celebrationParticlesList.splice(idx, 1);
      }
    } else if (p.type === "balloons_burst") {
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.angle) * 0.4;
      
      drawBalloon(p.x, p.y, p.size, p.color, p.stringLen);

      // Boundaries
      if (p.y < -p.size * 2) {
        celebrationParticlesList.splice(idx, 1);
      }
    } else if (p.type === "sparkles_cursor") {
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha -= p.fadeSpeed;

      drawSparkleCross(p.x, p.y, p.size, p.color, p.alpha);

      if (p.alpha <= 0) {
        celebrationParticlesList.splice(idx, 1);
      }
    } else if (p.type === "firework_rocket") {
      p.y += p.speedY;
      p.x += p.speedX;

      // Draw small tail trail for rocket
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Trigger explode once rocket reaches apex
      if (p.speedY >= 0 || p.y <= p.targetY) {
        explodeRocket(p.x, p.y);
        celebrationParticlesList.splice(idx, 1);
      }
    } else if (p.type === "firework_sparks") {
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += p.gravity; // Gravity pull downward
      p.alpha -= p.decay;

      // Draw fading spark particle
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (p.alpha <= 0) {
        celebrationParticlesList.splice(idx, 1);
      }
    }
  });

  // Call next animation frame
  canvasAnimationId = requestAnimationFrame(runParticlesAnimationLoop);
}
