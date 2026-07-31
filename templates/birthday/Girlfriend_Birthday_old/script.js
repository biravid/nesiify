// Digital Gift / Surprise Website Core Logic
document.addEventListener("DOMContentLoaded", () => {
  // Check if config.js is loaded
  if (typeof CONFIG === "undefined") {
    console.error("Config configuration not found! Please check config.js is correctly linked.");
    return;
  }

  // --- INITIALIZE THEME VARIABLES FROM CONFIG ---
  const root = document.documentElement;
  root.style.setProperty('--primary-color', CONFIG.theme.primaryColor);
  root.style.setProperty('--secondary-color', CONFIG.theme.secondaryColor);
  root.style.setProperty('--text-color', CONFIG.theme.textColorDark); // Default light theme text
  
  // Convert hex color to rgb components for CSS opacity variables
  const hexToRgb = (hex) => {
    let c = hex.substring(1);
    if(c.length === 3) c = c.split('').map(x => x + x).join('');
    let num = parseInt(c, 16);
    return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
  };
  root.style.setProperty('--primary-rgb', hexToRgb(CONFIG.theme.primaryColor));

  // --- COMPONENT LOADERS ---
  
  // Image Fallback Handler Utility
  // Checks if an image exists; if not, triggers the animated CSS gradient shimmer fallback.
  const handleImageLoad = (imgElement, fallbackContainer, isBg = false) => {
    if (!imgElement) return;
    
    const setFallback = () => {
      if (isBg) {
        fallbackContainer.classList.add("img-placeholder");
        imgElement.style.display = "none";
      } else {
        const placeholder = document.createElement("div");
        placeholder.className = "img-placeholder";
        placeholder.style.height = imgElement.style.height || "100%";
        placeholder.style.minHeight = "200px";
        imgElement.parentNode.replaceChild(placeholder, imgElement);
      }
    };

    imgElement.onload = () => {
      // Image loaded successfully. Ensure placeholder classes are removed
      fallbackContainer.classList.remove("img-placeholder");
    };

    imgElement.onerror = () => {
      setFallback();
    };

    // Trigger loading
    if (imgElement.src) {
      // Re-assign src to force load event if cached
      const tempSrc = imgElement.src;
      imgElement.src = "";
      imgElement.src = tempSrc;
    } else {
      setFallback();
    }
  };

  // Populate Hero
  const initHero = () => {
    document.title = `${CONFIG.recipientName}'s Birthday Surprise`;
    document.getElementById("logo-text").innerText = CONFIG.recipientName;
    document.getElementById("hero-title").innerText = CONFIG.hero.title;
    document.getElementById("hero-subtitle").innerText = CONFIG.hero.subTitle;
    document.getElementById("hero-cta-text").innerText = CONFIG.hero.ctaText;
    
    const heroBg = document.getElementById("hero-bg");
    const heroBgContainer = document.getElementById("hero-bg-container");
    heroBg.src = CONFIG.hero.backgroundImage;
    handleImageLoad(heroBg, heroBgContainer, true);
  };

  // Populate Story
  const initStory = () => {
    document.getElementById("story-section-title").innerText = CONFIG.story.title;
    const storyImg = document.getElementById("story-img");
    const storyImgContainer = document.getElementById("story-img-container");
    storyImg.src = CONFIG.story.image;
    handleImageLoad(storyImg, storyImgContainer);

    const paragraphsContainer = document.getElementById("story-paragraphs");
    paragraphsContainer.innerHTML = "";
    CONFIG.story.paragraphs.forEach(text => {
      const p = document.createElement("p");
      p.innerText = text;
      paragraphsContainer.appendChild(p);
    });
  };

  // Populate Love Letter Outer Tags
  const initLetter = () => {
    document.getElementById("letter-section-title").innerText = CONFIG.letter.title;
    document.getElementById("letter-title").innerText = CONFIG.letter.title;
    document.getElementById("letter-closing").innerHTML = `${CONFIG.letter.closing}<br><strong>${CONFIG.letter.signature}</strong>`;
  };

  // Populate Timeline Section
  const initTimeline = () => {
    const timelineContainer = document.getElementById("timeline-items");
    timelineContainer.innerHTML = "";
    
    CONFIG.timeline.forEach((item, index) => {
      const timelineItem = document.createElement("div");
      timelineItem.className = "timeline-item reveal-on-scroll";
      
      const dot = document.createElement("div");
      dot.className = "timeline-dot";
      
      const content = document.createElement("div");
      content.className = "timeline-content";
      
      const dateSpan = document.createElement("span");
      dateSpan.className = "timeline-date";
      dateSpan.innerText = item.date;
      
      const title = document.createElement("h3");
      title.className = "timeline-item-title";
      title.innerText = item.title;
      
      const desc = document.createElement("p");
      desc.className = "timeline-item-desc";
      desc.innerText = item.desc;
      
      content.appendChild(dateSpan);
      content.appendChild(title);
      content.appendChild(desc);
      
      if (item.image) {
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        wrapper.style.borderRadius = "var(--border-radius-sm)";
        wrapper.style.overflow = "hidden";
        
        const img = document.createElement("img");
        img.className = "timeline-item-img";
        img.alt = item.title;
        img.src = item.image;
        
        wrapper.appendChild(img);
        content.appendChild(wrapper);
        handleImageLoad(img, wrapper);
      }
      
      timelineItem.appendChild(dot);
      timelineItem.appendChild(content);
      timelineContainer.appendChild(timelineItem);
    });
  };

  // Populate Masonry Gallery
  let galleryItemsList = [];
  const initGallery = () => {
    const galleryGrid = document.getElementById("gallery-grid");
    galleryGrid.innerHTML = "";
    galleryItemsList = CONFIG.gallery;

    galleryItemsList.forEach((item, index) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item reveal-on-scroll";
      galleryItem.setAttribute("data-index", index);
      
      const img = document.createElement("img");
      img.alt = item.caption || "Memory photo";
      img.src = item.image;
      img.loading = "lazy";
      
      const overlay = document.createElement("div");
      overlay.className = "gallery-overlay";
      
      const caption = document.createElement("p");
      caption.className = "gallery-caption";
      caption.innerText = item.caption || "";
      
      overlay.appendChild(caption);
      galleryItem.appendChild(img);
      galleryItem.appendChild(overlay);
      galleryGrid.appendChild(galleryItem);
      
      handleImageLoad(img, galleryItem);
    });
  };

  // Populate Polaroid Wall Section
  const initPolaroids = () => {
    const polaroidsContainer = document.getElementById("polaroids-container");
    polaroidsContainer.innerHTML = "";

    CONFIG.polaroids.forEach((item, index) => {
      const polaroid = document.createElement("div");
      polaroid.className = "polaroid-card reveal-on-scroll";
      
      // Random rotation between -6 and +6 degrees
      const rot = (Math.random() * 12 - 6).toFixed(1);
      polaroid.style.setProperty("--rotation", `${rot}deg`);

      const imgContainer = document.createElement("div");
      imgContainer.className = "polaroid-img-container";

      const img = document.createElement("img");
      img.className = "polaroid-img";
      img.src = item.image;
      img.alt = item.caption;
      img.loading = "lazy";

      const caption = document.createElement("p");
      caption.className = "polaroid-caption";
      caption.innerText = item.caption;

      imgContainer.appendChild(img);
      polaroid.appendChild(imgContainer);
      polaroid.appendChild(caption);
      polaroidsContainer.appendChild(polaroid);

      handleImageLoad(img, imgContainer);
    });
  };

  // Populate Reasons Flip Cards Grid
  const initReasons = () => {
    const reasonsGrid = document.getElementById("reasons-grid");
    reasonsGrid.innerHTML = "";

    CONFIG.reasons.forEach(item => {
      const card = document.createElement("div");
      card.className = "reason-card reveal-on-scroll";
      
      const inner = document.createElement("div");
      inner.className = "reason-inner";
      
      const front = document.createElement("div");
      front.className = "reason-front";
      
      const emoji = document.createElement("span");
      emoji.className = "reason-emoji";
      emoji.innerText = item.emoji;
      
      const title = document.createElement("h3");
      title.className = "reason-title";
      title.innerText = item.title;
      
      front.appendChild(emoji);
      front.appendChild(title);
      
      const back = document.createElement("div");
      back.className = "reason-back";
      
      const desc = document.createElement("p");
      desc.className = "reason-desc";
      desc.innerText = item.desc;
      
      back.appendChild(desc);
      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
      
      // Touch screen support: toggle flipped class on click
      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });
      
      reasonsGrid.appendChild(card);
    });
  };

  // Populate Quotes Carousel
  let currentQuoteIndex = 0;
  let quoteInterval;
  const initQuotes = () => {
    const slidesContainer = document.getElementById("quote-slides");
    const indicatorsContainer = document.getElementById("carousel-indicators");
    slidesContainer.innerHTML = "";
    indicatorsContainer.innerHTML = "";

    CONFIG.quotes.forEach((quote, index) => {
      // Create slide
      const slide = document.createElement("div");
      slide.className = `quote-slide ${index === 0 ? "active" : ""}`;
      slide.innerText = quote;
      slidesContainer.appendChild(slide);

      // Create indicator dot
      const dot = document.createElement("div");
      dot.className = `indicator-dot ${index === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => {
        showQuote(index);
        resetQuoteTimer();
      });
      indicatorsContainer.appendChild(dot);
    });

    startQuoteTimer();
  };

  const showQuote = (index) => {
    const slides = document.querySelectorAll(".quote-slide");
    const dots = document.querySelectorAll(".indicator-dot");
    if (slides.length === 0) return;
    
    slides[currentQuoteIndex].classList.remove("active");
    dots[currentQuoteIndex].classList.remove("active");

    currentQuoteIndex = index;
    if (currentQuoteIndex >= slides.length) currentQuoteIndex = 0;
    if (currentQuoteIndex < 0) currentQuoteIndex = slides.length - 1;

    slides[currentQuoteIndex].classList.add("active");
    dots[currentQuoteIndex].classList.add("active");
  };

  const startQuoteTimer = () => {
    quoteInterval = setInterval(() => {
      showQuote(currentQuoteIndex + 1);
    }, 6000);
  };

  const resetQuoteTimer = () => {
    clearInterval(quoteInterval);
    startQuoteTimer();
  };

  // Populate Secret Password Section Hints
  const initSecret = () => {
    document.getElementById("secret-hint").innerText = CONFIG.secret.hint;
    document.getElementById("secret-prompt").innerText = CONFIG.secret.lockedMessage;
  };

  // Populate Gift Box elements
  const initGiftBox = () => {
    document.getElementById("gift-card-title").innerText = CONFIG.giftBox.surpriseCardTitle;
    document.getElementById("gift-card-desc").innerText = CONFIG.giftBox.surpriseCardDesc;
    document.getElementById("giftbox-prompt").innerText = CONFIG.giftBox.messageBeforeOpen;
  };

  // Populate Footer Details
  const initFooter = () => {
    document.getElementById("footer-quote").innerText = `“You are my favorite view in this whole universe, ${CONFIG.recipientName}.”`;
    document.getElementById("footer-copyright").innerText = `© Created with Love by ${CONFIG.senderName}, ${new Date().getFullYear()}`;
  };

  // Trigger all dynamic loaders
  const populatePageContent = () => {
    initHero();
    initStory();
    initLetter();
    initTimeline();
    initGallery();
    initPolaroids();
    initReasons();
    initQuotes();
    initSecret();
    initGiftBox();
    initFooter();
  };
  populatePageContent();


  // --- INTERACTION & VISUAL EFFECTS ---

  // Custom Cursor logic
  const cursorDot = document.getElementById("cursor-dot");
  const cursorGlow = document.getElementById("cursor-glow");
  let mouseX = -100, mouseY = -100;
  let glowX = -100, glowY = -100;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Custom cursor smooth latency interpolation
  const animateCursorGlow = () => {
    const dx = mouseX - glowX;
    const dy = mouseY - glowY;
    
    glowX += dx * 0.15;
    glowY += dy * 0.15;
    
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
    
    requestAnimationFrame(animateCursorGlow);
  };
  animateCursorGlow();

  // Scale cursor dot on interactive elements hover
  const interactives = document.querySelectorAll("a, button, .envelope, .gallery-item, .reason-card, .gift-box-wrapper, input");
  interactives.forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(2)";
      cursorGlow.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorGlow.style.backgroundColor = "rgba(255, 77, 109, 0.15)";
    });
    el.addEventListener("mouseleave", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
      cursorGlow.style.transform = "translate(-50%, -50%) scale(1)";
      cursorGlow.style.backgroundColor = "rgba(255, 117, 143, 0.05)";
    });
  });


  // --- RIPPLE BUTTON EFFECT ---
  const createRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    
    // Remove previous ripples if any
    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }
    
    button.appendChild(ripple);
  };

  const rippleButtons = document.querySelectorAll(".btn-ripple");
  rippleButtons.forEach(btn => {
    btn.addEventListener("click", createRipple);
  });


  // --- NAVIGATION CONTROLS ---

  // Sticky header progress update & shadow reveal
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const bodyHeight = document.body.scrollHeight;
    const winHeight = window.innerHeight;
    
    const scrollPercent = (scrollY / (bodyHeight - winHeight)) * 100;
    root.style.setProperty('--scroll-progress', `${scrollPercent}%`);

    const headerEl = document.getElementById("header");
    if (scrollY > 50) {
      headerEl.style.padding = "0.5rem 2rem";
      headerEl.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
    } else {
      headerEl.style.padding = "1rem 2rem";
      headerEl.style.boxShadow = "none";
    }

    // Reveal scroll to top button
    const scrollTopBtn = document.getElementById("scroll-top-btn");
    if (scrollY > winHeight / 2) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  // Mobile navigation panel toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinksList = document.getElementById("nav-links");
  
  mobileToggle.addEventListener("click", () => {
    navLinksList.classList.toggle("active");
    mobileToggle.innerText = navLinksList.classList.contains("active") ? "✕" : "☰";
  });

  // Close sidebar on click link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinksList.classList.remove("active");
      mobileToggle.innerText = "☰";
    });
  });

  // Active Link Highlighting using Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        document.querySelectorAll(".nav-links a").forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  };

  const sectionsToObserve = document.querySelectorAll("section[id]");
  const navObserver = new IntersectionObserver(observerCallback, observerOptions);
  sectionsToObserve.forEach(section => navObserver.observe(section));

  // Reveal Sections on Scroll (Fade in up elements)
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.1
  });

  const elementsToReveal = document.querySelectorAll(".reveal-on-scroll");
  elementsToReveal.forEach(el => revealObserver.observe(el));

  // Scroll to Top Button Action
  document.getElementById("scroll-top-btn").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Hero CTA button action
  document.getElementById("hero-cta").addEventListener("click", () => {
    const nextSection = document.getElementById("countdown-section");
    nextSection.scrollIntoView({ behavior: "smooth" });
  });


  // --- COUNTDOWN TIMER LOGIC ---
  const updateCountdown = () => {
    const targetTime = new Date(CONFIG.birthdayDate).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = targetTime - currentTime;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const messageEl = document.getElementById("countdown-message");

    if (timeDiff <= 0) {
      daysEl.innerText = "00";
      hoursEl.innerText = "00";
      minutesEl.innerText = "00";
      secondsEl.innerText = "00";
      messageEl.innerText = CONFIG.countdown.activeMessage;
      
      // Auto-trigger fireworks once birthday arrives
      if (!window.birthdayCelebrated) {
        window.birthdayCelebrated = true;
        triggerAutoCelebration();
      }
      return;
    }

    const d = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const h = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((timeDiff % (1000 * 60)) / 1000);

    daysEl.innerText = d.toString().padStart(2, '0');
    hoursEl.innerText = h.toString().padStart(2, '0');
    minutesEl.innerText = m.toString().padStart(2, '0');
    secondsEl.innerText = s.toString().padStart(2, '0');
    messageEl.innerText = CONFIG.countdown.preMessage;
  };

  const triggerAutoCelebration = () => {
    launchConfetti();
    document.getElementById("fireworks-canvas").style.display = "block";
    startFireworks();
  };

  // Run immediately and update every second
  updateCountdown();
  setInterval(updateCountdown, 1000);


  // --- INTERACTIVE ENVELOPE & LETTER TYPING ---
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const letterSheet = document.getElementById("letter-sheet");
  const letterTextContainer = document.getElementById("letter-text");
  
  let typingInProgress = false;
  let letterOpened = false;

  envelopeWrapper.addEventListener("click", () => {
    if (!letterOpened) {
      envelopeWrapper.classList.add("open");
      letterOpened = true;
      
      // Start typing letter content with slight delay to sync with envelope slide out
      setTimeout(startLetterTypewriter, 1000);
    }
  });

  const startLetterTypewriter = () => {
    if (typingInProgress) return;
    typingInProgress = true;
    
    letterTextContainer.innerHTML = "";
    letterTextContainer.classList.add("letter-typing-cursor");

    const textToType = CONFIG.letter.body;
    let idx = 0;

    const typeNextChar = () => {
      if (idx < textToType.length) {
        letterTextContainer.innerHTML += textToType.charAt(idx);
        idx++;
        // Auto scroll letter sheet downward if text overflows
        letterSheet.scrollTop = letterSheet.scrollHeight;
        setTimeout(typeNextChar, 40); // 40ms typing speed
      } else {
        letterTextContainer.classList.remove("letter-typing-cursor");
        typingInProgress = false;
      }
    };

    typeNextChar();
  };


  // --- INTERACTIVE MASONRY GALLERY LIGHTBOX ---
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  let activeGalleryIndex = 0;

  const openLightbox = (index) => {
    activeGalleryIndex = index;
    const item = galleryItemsList[activeGalleryIndex];
    
    lightboxImg.src = item.image;
    lightboxCaption.innerText = item.caption || "";
    lightboxModal.classList.add("active");
    
    // Add load verification on lightboxed image
    lightboxImg.onerror = () => {
      lightboxImg.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23ffccd5'/%3E%3C/svg%3E";
    };
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove("active");
  };

  const showNextImage = () => {
    let nextIdx = activeGalleryIndex + 1;
    if (nextIdx >= galleryItemsList.length) nextIdx = 0;
    openLightbox(nextIdx);
  };

  const showPrevImage = () => {
    let prevIdx = activeGalleryIndex - 1;
    if (prevIdx < 0) prevIdx = galleryItemsList.length - 1;
    openLightbox(prevIdx);
  };

  // Bind clicks on gallery items
  document.getElementById("gallery-grid").addEventListener("click", (e) => {
    const itemEl = e.target.closest(".gallery-item");
    if (itemEl) {
      const idx = parseInt(itemEl.getAttribute("data-index"), 10);
      openLightbox(idx);
    }
  });

  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox-next").addEventListener("click", showNextImage);
  document.getElementById("lightbox-prev").addEventListener("click", showPrevImage);
  
  // Close lightbox clicking on empty dark overlay space
  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!lightboxModal.classList.contains("active")) return;
    
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNextImage();
    if (e.key === "ArrowLeft") showPrevImage();
  });


  // --- MUSIC PLAYER AUDIO CONTROLLER ---
  const audio = document.getElementById("bg-audio");
  const playBtn = document.getElementById("music-play-btn");
  const musicContainer = document.getElementById("music-player");
  const volumeSlider = document.getElementById("volume-slider");
  const volumeIcon = document.getElementById("volume-icon");
  const trackTitle = document.getElementById("music-track-title");
  const trackArtist = document.getElementById("music-track-artist");

  audio.src = CONFIG.music.audioUrl;
  trackTitle.innerText = CONFIG.music.title;
  trackArtist.innerText = CONFIG.music.artist;
  audio.volume = parseFloat(volumeSlider.value);

  let isPlaying = false;

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
      playBtn.innerText = "▶";
      musicContainer.classList.remove("playing");
    } else {
      // Browser requirements check (Interactions must precede audio play)
      audio.play().then(() => {
        playBtn.innerText = "⏸";
        musicContainer.classList.add("playing");
      }).catch(err => {
        console.log("Audio autoplay prevented. Awaiting user interaction.", err);
      });
    }
    isPlaying = !isPlaying;
  };

  playBtn.addEventListener("click", toggleAudio);
  
  volumeSlider.addEventListener("input", (e) => {
    audio.volume = parseFloat(e.target.value);
    if (audio.volume === 0) {
      volumeIcon.innerText = "🔇";
    } else if (audio.volume < 0.5) {
      volumeIcon.innerText = "🔉";
    } else {
      volumeIcon.innerText = "🔊";
    }
  });

  // Audio mute click toggle
  let savedVolume = 0.5;
  volumeIcon.addEventListener("click", () => {
    if (audio.volume > 0) {
      savedVolume = audio.volume;
      audio.volume = 0;
      volumeSlider.value = 0;
      volumeIcon.innerText = "🔇";
    } else {
      audio.volume = savedVolume;
      volumeSlider.value = savedVolume;
      volumeIcon.innerText = savedVolume < 0.5 ? "🔉" : "🔊";
    }
  });

  // Autoplay music on clicking CTA buttons
  document.getElementById("hero-cta").addEventListener("click", () => {
    if (!isPlaying) {
      toggleAudio();
    }
  });


  // --- DYNAMIC WEATHER EFFECT SYSTEM (Hearts, Snow, Rain, Stars) ---
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  
  let particles = [];
  let weatherModes = ["hearts", "snow", "rain", "stars", "none"];
  let activeWeatherIdx = 0; // Default: Hearts

  // Read config defaults
  if (CONFIG.specialModes.snow) activeWeatherIdx = 1;
  else if (CONFIG.specialModes.rain) activeWeatherIdx = 2;
  else if (CONFIG.specialModes.stars) activeWeatherIdx = 3;
  else if (!CONFIG.specialModes.hearts) activeWeatherIdx = 4; // none

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor(type) {
      this.type = type;
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.size = Math.random() * 8 + 4;
      this.speedY = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.opacity = Math.random() * 0.5 + 0.3;
      
      if (this.type === "snow") {
        this.y = -10;
        this.size = Math.random() * 5 + 2;
        this.color = `rgba(255, 255, 255, ${this.opacity})`;
      } else if (this.type === "rain") {
        this.y = -20;
        this.size = Math.random() * 15 + 10; // Length of rain drop
        this.speedY = Math.random() * 8 + 6;
        this.speedX = -1.5; // Angled falling rain
        this.color = `rgba(174, 217, 224, ${this.opacity * 0.6})`;
      } else if (this.type === "hearts") {
        this.y = canvas.height + 20; // Float upwards
        this.speedY = -(Math.random() * 1.5 + 0.8);
        this.rotation = Math.random() * Math.PI;
        this.rotSpeed = Math.random() * 0.02 - 0.01;
        this.color = `rgba(255, ${Math.floor(Math.random() * 100 + 80)}, ${Math.floor(Math.random() * 120 + 120)}, ${this.opacity})`;
      } else if (this.type === "stars") {
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedY = 0;
        this.speedX = 0;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinkleFactor = Math.random();
        this.color = `rgba(255, 243, 176, ${this.opacity})`;
      }
    }

    update() {
      if (this.type === "stars") {
        this.twinkleFactor += this.twinkleSpeed;
        this.opacity = Math.sin(this.twinkleFactor) * 0.5 + 0.5;
        return;
      }

      this.y += this.speedY;
      this.x += this.speedX;

      // Reset coordinates when leaving boundaries
      if (this.type === "hearts") {
        this.rotation += this.rotSpeed;
        if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
          this.reset();
        }
      } else if (this.type === "snow" || this.type === "rain") {
        if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
          this.reset();
        }
      }
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;

      if (this.type === "snow") {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.type === "rain") {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.speedX, this.y + this.size);
        ctx.stroke();
      } else if (this.type === "hearts") {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.beginPath();
        const topY = -this.size / 2;
        ctx.moveTo(0, topY + this.size / 4);
        // Draw heart shape curves
        ctx.bezierCurveTo(-this.size/2, topY, -this.size, topY + this.size/3, 0, this.size/2);
        ctx.bezierCurveTo(this.size, topY + this.size/3, this.size/2, topY, 0, topY + this.size / 4);
        ctx.fill();
        
        ctx.restore();
      } else if (this.type === "stars") {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.globalAlpha = 1.0;
    }
  }

  const initWeather = () => {
    particles = [];
    const numParticles = weatherModes[activeWeatherIdx] === "rain" ? 120 : 60;
    
    if (weatherModes[activeWeatherIdx] !== "none") {
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(weatherModes[activeWeatherIdx]));
      }
    }
  };

  const animateWeather = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    requestAnimationFrame(animateWeather);
  };

  // Weather selector toggle action
  const weatherToggleBtn = document.getElementById("weather-toggle");
  const weatherIcons = {
    hearts: "💖",
    snow: "❄️",
    rain: "🌧️",
    stars: "✨",
    none: "🚫"
  };

  weatherToggleBtn.addEventListener("click", () => {
    activeWeatherIdx = (activeWeatherIdx + 1) % weatherModes.length;
    const mode = weatherModes[activeWeatherIdx];
    weatherToggleBtn.innerText = weatherIcons[mode];
    weatherToggleBtn.title = `Weather: ${mode.toUpperCase()}`;
    initWeather();
  });

  // Run weather system
  initWeather();
  animateWeather();


  // --- LIGHT/DARK THEME SWITCHER ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  
  const toggleTheme = () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.body.removeAttribute("data-theme");
      themeToggleBtn.innerText = "🌙";
      root.style.setProperty('--text-color', CONFIG.theme.textColorDark);
      root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.7)');
      root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.5)');
    } else {
      document.body.setAttribute("data-theme", "dark");
      themeToggleBtn.innerText = "☀️";
      root.style.setProperty('--text-color', CONFIG.theme.textColorLight);
      root.style.setProperty('--card-bg', 'rgba(25, 18, 36, 0.6)');
      root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.08)');
    }
  };

  themeToggleBtn.addEventListener("click", toggleTheme);


  // --- CANVAS SURPRISE CONFETTI GENERATOR ---
  const launchConfetti = () => {
    const confettiCanvas = document.createElement("canvas");
    confettiCanvas.style.position = "fixed";
    confettiCanvas.style.top = "0";
    confettiCanvas.style.left = "0";
    confettiCanvas.style.width = "100%";
    confettiCanvas.style.height = "100%";
    confettiCanvas.style.pointerEvents = "none";
    confettiCanvas.style.zIndex = "2001";
    document.body.appendChild(confettiCanvas);
    
    const cctx = confettiCanvas.getContext("2d");
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    let localParticles = [];
    const colors = ["#ff4d6d", "#ff758f", "#ff8fa3", "#ffccd5", "#ffb703", "#219ebc"];

    class Confetti {
      constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 6;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedY = Math.random() * 4 + 4;
        this.speedX = Math.random() * 4 - 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
      }
      draw() {
        cctx.fillStyle = this.color;
        cctx.save();
        cctx.translate(this.x, this.y);
        cctx.rotate((this.rotation * Math.PI) / 180);
        cctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        cctx.restore();
      }
    }

    for (let i = 0; i < 150; i++) {
      localParticles.push(new Confetti());
    }

    const animateConfetti = () => {
      cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      
      let elementsActive = false;
      localParticles.forEach(p => {
        if (p.y < confettiCanvas.height) {
          p.update();
          p.draw();
          elementsActive = true;
        }
      });

      if (elementsActive) {
        requestAnimationFrame(animateConfetti);
      } else {
        confettiCanvas.remove();
      }
    };

    animateConfetti();
  };


  // --- SURPRISE GIFT BOX SURPRISE OPENING ---
  const giftBox = document.getElementById("gift-box");
  const giftPrompt = document.getElementById("giftbox-prompt");
  let giftOpened = false;

  giftBox.addEventListener("click", () => {
    if (!giftOpened) {
      giftBox.classList.add("open");
      giftOpened = true;
      giftPrompt.innerText = CONFIG.giftBox.messageAfterOpen;
      
      // Fire confetti burst!
      setTimeout(launchConfetti, 300);
    }
  });


  // --- SECRET MESSAGE FORM CONTROLS ---
  const secretForm = document.getElementById("secret-form");
  const secretInput = document.getElementById("secret-input");
  const secretCard = document.getElementById("secret-card");
  const secretUnlockedPanel = document.getElementById("secret-unlocked-panel");

  secretForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const entry = secretInput.value.trim().toLowerCase();
    
    if (entry === CONFIG.secret.password.toLowerCase()) {
      // Success unlock!
      secretForm.style.display = "none";
      document.getElementById("secret-prompt").style.display = "none";
      
      secretUnlockedPanel.innerText = CONFIG.secret.unlockedMessage;
      secretUnlockedPanel.classList.add("show");
      
      // Hearts confetti celebratory action
      launchConfetti();
    } else {
      // Shake animation to indicate password failure
      secretCard.classList.add("shake");
      secretInput.value = "";
      
      setTimeout(() => {
        secretCard.classList.remove("shake");
      }, 500);
    }
  });


  // --- SURPRISE CANVAS FIREWORKS EFFECT ---
  const fireworksCanvas = document.getElementById("fireworks-canvas");
  const fctx = fireworksCanvas.getContext("2d");
  let fParticles = [];
  let fRockets = [];
  let fireworksTimer = null;
  let fireworksRunning = false;

  const fResize = () => {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
  };
  window.addEventListener("resize", fResize);
  fResize();

  class FireworkRocket {
    constructor() {
      this.x = Math.random() * fireworksCanvas.width;
      this.y = fireworksCanvas.height;
      this.targetY = Math.random() * (fireworksCanvas.height * 0.5) + 80;
      this.speed = Math.random() * 5 + 6;
      this.color = `hsl(${Math.random() * 360}, 100%, 65%)`;
    }
    update() {
      this.y -= this.speed;
      return this.y <= this.targetY;
    }
    draw() {
      fctx.fillStyle = this.color;
      fctx.beginPath();
      fctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
      fctx.fill();
    }
  }

  class FireworkSpark {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = Math.random() * 3 + 1;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.gravity = 0.06;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
    }
    update() {
      this.x += this.vx;
      this.vy += this.gravity;
      this.y += this.vy;
      this.alpha -= this.decay;
      return this.alpha <= 0;
    }
    draw() {
      fctx.save();
      fctx.globalAlpha = this.alpha;
      fctx.fillStyle = this.color;
      fctx.beginPath();
      fctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      fctx.fill();
      fctx.restore();
    }
  }

  const startFireworks = () => {
    if (fireworksRunning) return;
    fireworksRunning = true;
    fireworksCanvas.style.display = "block";

    // Launch initial rockets
    const launchInterval = setInterval(() => {
      if (fRockets.length < 5) {
        fRockets.push(new FireworkRocket());
      }
    }, 450);

    const fAnimate = () => {
      // Clear with slight trailing fade
      fctx.fillStyle = "rgba(10, 5, 20, 0.2)";
      fctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

      // Update rockets
      for (let i = fRockets.length - 1; i >= 0; i--) {
        const r = fRockets[i];
        const exploded = r.update();
        if (exploded) {
          // Explode: create sparks
          for (let s = 0; s < 60; s++) {
            fParticles.push(new FireworkSpark(r.x, r.y, r.color));
          }
          fRockets.splice(i, 1);
        } else {
          r.draw();
        }
      }

      // Update sparks
      for (let i = fParticles.length - 1; i >= 0; i--) {
        const p = fParticles[i];
        const dead = p.update();
        if (dead) {
          fParticles.splice(i, 1);
        } else {
          p.draw();
        }
      }

      if (fireworksRunning) {
        requestAnimationFrame(fAnimate);
      }
    };
    fAnimate();

    // Automatically stop fireworks after 10 seconds to restore interface focus
    setTimeout(() => {
      clearInterval(launchInterval);
      fireworksRunning = false;
      
      // Gracefully clear canvas over a second
      let alphaFade = 0.2;
      const fadeInterval = setInterval(() => {
        fctx.fillStyle = `rgba(10, 5, 20, ${alphaFade})`;
        fctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
        alphaFade += 0.2;
        if (alphaFade >= 1.0) {
          clearInterval(fadeInterval);
          fctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
          fireworksCanvas.style.display = "none";
        }
      }, 100);
      
    }, 10000);
  };

  // Bind trigger button
  document.getElementById("fireworks-trigger").addEventListener("click", () => {
    launchConfetti();
    startFireworks();
  });
});
