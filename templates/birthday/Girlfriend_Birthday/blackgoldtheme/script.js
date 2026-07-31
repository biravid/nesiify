// Digital Gift / Surprise Website Core Logic (Black & Gold Premium Theme Version)
document.addEventListener("DOMContentLoaded", () => {
  // Check if config.js is loaded
  if (typeof CONFIG === "undefined") {
    console.error("Config configuration not found! Please check config.js is correctly linked.");
    return;
  }

  // --- INITIALIZE THEME VARIABLES FROM CONFIG ---
  const root = document.documentElement;
  if (CONFIG.theme && CONFIG.theme.primaryColor) {
    root.style.setProperty('--primary-color', CONFIG.theme.primaryColor);
  }
  if (CONFIG.theme && CONFIG.theme.secondaryColor) {
    root.style.setProperty('--secondary-color', CONFIG.theme.secondaryColor);
  }
  
  // Convert hex color to rgb components for CSS opacity variables
  const hexToRgb = (hex) => {
    let c = hex.substring(1);
    if(c.length === 3) c = c.split('').map(x => x + x).join('');
    let num = parseInt(c, 16);
    return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
  };
  if (CONFIG.theme && CONFIG.theme.primaryColor) {
    root.style.setProperty('--primary-rgb', hexToRgb(CONFIG.theme.primaryColor));
  }

  // --- COMPONENT LOADERS ---
  
  // Image Fallback Handler Utility
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
      fallbackContainer.classList.remove("img-placeholder");
    };

    imgElement.onerror = () => {
      setFallback();
    };

    if (imgElement.src) {
      const tempSrc = imgElement.src;
      imgElement.src = "";
      imgElement.src = tempSrc;
    } else {
      setFallback();
    }
  };

  // Populate Hero
  const initHero = () => {
    document.title = `${CONFIG.recipientName}'s Premium Black & Gold Birthday Surprise ✨👑`;
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

  // Typewriter effect for Love Letter Body
  let letterTyped = false;
  const triggerLetterTypewriter = () => {
    if (letterTyped) return;
    letterTyped = true;

    const letterContainer = document.getElementById("letter-text");
    letterContainer.innerHTML = "";
    const fullText = `${CONFIG.letter.greeting}\n\n${CONFIG.letter.body}`;
    let charIndex = 0;

    letterContainer.classList.add("letter-typing-cursor");

    const typeChar = () => {
      if (charIndex < fullText.length) {
        if (fullText.charAt(charIndex) === "\n") {
          letterContainer.innerHTML += "<br>";
        } else {
          letterContainer.innerHTML += fullText.charAt(charIndex);
        }
        charIndex++;
        setTimeout(typeChar, 35);
      } else {
        letterContainer.classList.remove("letter-typing-cursor");
      }
    };

    typeChar();
  };

  // Envelope Interactive Flip/Open
  const initEnvelopeInteraction = () => {
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    if (!envelopeWrapper) return;

    envelopeWrapper.addEventListener("click", () => {
      envelopeWrapper.classList.toggle("open");
      if (envelopeWrapper.classList.contains("open")) {
        setTimeout(triggerLetterTypewriter, 600);
      }
    });
  };

  // Countdown Timer System
  const initCountdown = () => {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const msgEl = document.getElementById("countdown-message");

    const targetDate = new Date(CONFIG.birthdayDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        daysEl.innerText = "00";
        hoursEl.innerText = "00";
        minutesEl.innerText = "00";
        secondsEl.innerText = "00";
        msgEl.innerText = CONFIG.countdown.activeMessage;
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      daysEl.innerText = days < 10 ? `0${days}` : days;
      hoursEl.innerText = hours < 10 ? `0${hours}` : hours;
      minutesEl.innerText = minutes < 10 ? `0${minutes}` : minutes;
      secondsEl.innerText = seconds < 10 ? `0${seconds}` : seconds;
      msgEl.innerText = CONFIG.countdown.preMessage;
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  };

  // Populate Memory Timeline
  const initTimeline = () => {
    const container = document.getElementById("timeline-items");
    if (!container) return;
    container.innerHTML = "";

    CONFIG.timeline.forEach((item) => {
      const timelineItem = document.createElement("div");
      timelineItem.className = "timeline-item reveal-on-scroll";

      timelineItem.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-date">${item.date}</span>
          <h3 class="timeline-item-title">${item.title}</h3>
          <p class="timeline-item-desc">${item.desc}</p>
          <img src="${item.image}" alt="${item.title}" class="timeline-item-img">
        </div>
      `;

      const img = timelineItem.querySelector(".timeline-item-img");
      const imgContainer = timelineItem.querySelector(".timeline-content");
      handleImageLoad(img, imgContainer);

      container.appendChild(timelineItem);
    });
  };

  // Lightbox Modal Controller
  let currentGalleryIndex = 0;
  const galleryItemsList = CONFIG.gallery;

  const openLightbox = (index) => {
    currentGalleryIndex = index;
    const modal = document.getElementById("lightbox-modal");
    const img = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");

    img.src = galleryItemsList[currentGalleryIndex].image;
    caption.innerText = galleryItemsList[currentGalleryIndex].caption;
    modal.classList.add("active");
  };

  const initLightboxEvents = () => {
    const modal = document.getElementById("lightbox-modal");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    if (!modal) return;

    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });

    prevBtn.addEventListener("click", () => {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryItemsList.length) % galleryItemsList.length;
      openLightbox(currentGalleryIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryItemsList.length;
      openLightbox(currentGalleryIndex);
    });
  };

  // Populate Masonry Gallery
  const initGallery = () => {
    const container = document.getElementById("gallery-grid");
    if (!container) return;
    container.innerHTML = "";

    CONFIG.gallery.forEach((item, index) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item";

      galleryItem.innerHTML = `
        <img src="${item.image}" alt="Memory photo ${index + 1}">
        <div class="gallery-overlay">
          <p class="gallery-caption">${item.caption}</p>
        </div>
      `;

      const img = galleryItem.querySelector("img");
      handleImageLoad(img, galleryItem);

      galleryItem.addEventListener("click", () => openLightbox(index));
      container.appendChild(galleryItem);
    });

    initLightboxEvents();
  };

  // Populate Polaroids Wall
  const initPolaroids = () => {
    const container = document.getElementById("polaroids-container");
    if (!container) return;
    container.innerHTML = "";

    const rotations = [-4, 3, -6, 5, -3, 4];

    CONFIG.polaroids.forEach((item, index) => {
      const polaroid = document.createElement("div");
      polaroid.className = "polaroid-card";
      const rot = rotations[index % rotations.length];
      polaroid.style.setProperty('--rotation', `${rot}deg`);

      polaroid.innerHTML = `
        <div class="polaroid-img-container">
          <img src="${item.image}" alt="${item.caption}" class="polaroid-img">
        </div>
        <p class="polaroid-caption">${item.caption}</p>
      `;

      const img = polaroid.querySelector("img");
      const imgContainer = polaroid.querySelector(".polaroid-img-container");
      handleImageLoad(img, imgContainer);

      container.appendChild(polaroid);
    });
  };

  // Populate Reasons 3D Flip Cards
  const initReasons = () => {
    const container = document.getElementById("reasons-grid");
    if (!container) return;
    container.innerHTML = "";

    CONFIG.reasons.forEach((reason) => {
      const card = document.createElement("div");
      card.className = "reason-card";

      card.innerHTML = `
        <div class="reason-inner">
          <div class="reason-front">
            <div class="reason-emoji">${reason.emoji}</div>
            <h3 class="reason-title">${reason.title}</h3>
          </div>
          <div class="reason-back">
            <p class="reason-desc">${reason.desc}</p>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });

      container.appendChild(card);
    });
  };

  // Populate Quotes Carousel
  let currentQuoteIndex = 0;
  const initQuotes = () => {
    const slidesContainer = document.getElementById("quote-slides");
    const indicatorsContainer = document.getElementById("carousel-indicators");

    if (!slidesContainer || !indicatorsContainer) return;

    slidesContainer.innerHTML = "";
    indicatorsContainer.innerHTML = "";

    CONFIG.quotes.forEach((quote, index) => {
      const slide = document.createElement("div");
      slide.className = `quote-slide ${index === 0 ? "active" : ""}`;
      slide.innerText = quote;
      slidesContainer.appendChild(slide);

      const dot = document.createElement("div");
      dot.className = `indicator-dot ${index === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => switchQuote(index));
      indicatorsContainer.appendChild(dot);
    });

    const switchQuote = (index) => {
      const slides = slidesContainer.querySelectorAll(".quote-slide");
      const dots = indicatorsContainer.querySelectorAll(".indicator-dot");

      slides.forEach((s, i) => s.classList.toggle("active", i === index));
      dots.forEach((d, i) => d.classList.toggle("active", i === index));
      currentQuoteIndex = index;
    };

    setInterval(() => {
      const nextIndex = (currentQuoteIndex + 1) % CONFIG.quotes.length;
      switchQuote(nextIndex);
    }, 6000);
  };

  // Gift Box Interaction
  const initGiftBox = () => {
    const giftBox = document.getElementById("gift-box");
    const prompt = document.getElementById("giftbox-prompt");
    const cardTitle = document.getElementById("gift-card-title");
    const cardDesc = document.getElementById("gift-card-desc");

    if (!giftBox) return;

    prompt.innerText = CONFIG.giftBox.messageBeforeOpen;
    cardTitle.innerText = CONFIG.giftBox.surpriseCardTitle;
    cardDesc.innerText = CONFIG.giftBox.surpriseCardDesc;

    giftBox.addEventListener("click", () => {
      giftBox.classList.toggle("open");
      if (giftBox.classList.contains("open")) {
        prompt.innerText = CONFIG.giftBox.messageAfterOpen;
        triggerConfettiBurst();
      } else {
        prompt.innerText = CONFIG.giftBox.messageBeforeOpen;
      }
    });
  };

  // Secret Form Password Check
  const initSecretForm = () => {
    const form = document.getElementById("secret-form");
    const input = document.getElementById("secret-input");
    const hint = document.getElementById("secret-hint");
    const card = document.getElementById("secret-card");
    const unlockedPanel = document.getElementById("secret-unlocked-panel");
    const prompt = document.getElementById("secret-prompt");

    if (!form) return;

    hint.innerText = CONFIG.secret.hint;
    document.getElementById("secret-title").innerText = CONFIG.secret.title;
    prompt.innerText = CONFIG.secret.lockedMessage;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = input.value.trim().toLowerCase();

      if (val === CONFIG.secret.password.toLowerCase()) {
        form.style.display = "none";
        prompt.style.display = "none";
        unlockedPanel.innerText = CONFIG.secret.unlockedMessage;
        unlockedPanel.classList.add("show");
        triggerConfettiBurst();
      } else {
        card.classList.add("shake");
        input.style.borderColor = "#dfb76c";
        setTimeout(() => card.classList.remove("shake"), 500);
      }
    });
  };

  // --- FLOATING MUSIC PLAYER ---
  const initMusicPlayer = () => {
    const audio = document.getElementById("bg-audio");
    const playBtn = document.getElementById("music-play-btn");
    const playerContainer = document.getElementById("music-player");
    const trackTitle = document.getElementById("music-track-title");
    const trackArtist = document.getElementById("music-track-artist");
    const volumeSlider = document.getElementById("volume-slider");
    const volumeIcon = document.getElementById("volume-icon");

    if (!audio || !playBtn) return;

    audio.src = CONFIG.music.audioUrl;
    trackTitle.innerText = CONFIG.music.title;
    trackArtist.innerText = CONFIG.music.artist;

    let isPlaying = false;

    const togglePlay = () => {
      if (isPlaying) {
        audio.pause();
        playBtn.innerText = "▶";
        playerContainer.classList.remove("playing");
      } else {
        audio.play().then(() => {
          playBtn.innerText = "⏸";
          playerContainer.classList.add("playing");
        }).catch(err => {
          console.log("Audio autoplay prevented:", err);
        });
      }
      isPlaying = !isPlaying;
    };

    playBtn.addEventListener("click", togglePlay);

    volumeSlider.addEventListener("input", (e) => {
      audio.volume = e.target.value;
      if (audio.volume === 0) {
        volumeIcon.innerText = "🔇";
      } else {
        volumeIcon.innerText = "🔊";
      }
    });

    volumeIcon.addEventListener("click", () => {
      if (audio.volume > 0) {
        audio.volume = 0;
        volumeSlider.value = 0;
        volumeIcon.innerText = "🔇";
      } else {
        audio.volume = 0.5;
        volumeSlider.value = 0.5;
        volumeIcon.innerText = "🔊";
      }
    });
  };

  // --- CANVAS WEATHER / FALLING EFFECTS (HEARTS, SNOW, RAIN, STARS) ---
  const initParticleCanvas = () => {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = (canvas.width = window.innerWidth);
      height = (canvas.height = window.innerHeight);
    });

    const weatherModes = ["hearts", "snow", "rain", "stars", "none"];
    const weatherIcons = {
      hearts: "💖",
      snow: "❄️",
      rain: "🌧️",
      stars: "✨",
      none: "🚫"
    };
    let activeWeatherIdx = 0;
    let particles = [];

    class Particle {
      constructor(type) {
        this.type = type;
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
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
          this.size = Math.random() * 15 + 10;
          this.speedY = Math.random() * 8 + 6;
          this.speedX = -1.5;
          this.color = `rgba(174, 217, 224, ${this.opacity * 0.6})`;
        } else if (this.type === "hearts") {
          this.y = height + 20;
          this.speedY = -(Math.random() * 1.5 + 0.8);
          this.rotation = Math.random() * Math.PI;
          this.rotSpeed = Math.random() * 0.02 - 0.01;
          this.color = `rgba(223, 183, 108, ${this.opacity})`;
        } else if (this.type === "stars") {
          this.y = Math.random() * height;
          this.size = Math.random() * 3 + 1;
          this.speedY = 0;
          this.speedX = 0;
          this.twinkleSpeed = Math.random() * 0.02 + 0.01;
          this.twinkleFactor = Math.random();
          this.color = `rgba(212, 175, 55, ${this.opacity})`;
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

        if (this.type === "hearts") {
          this.rotation += this.rotSpeed;
          if (this.y < -20 || this.x < -20 || this.x > width + 20) {
            this.reset();
          }
        } else if (this.type === "snow" || this.type === "rain") {
          if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
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
      const mode = weatherModes[activeWeatherIdx];
      const numParticles = mode === "rain" ? 120 : 60;
      
      if (mode !== "none") {
        for (let i = 0; i < numParticles; i++) {
          particles.push(new Particle(mode));
        }
      }
    };

    const animateWeather = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateWeather);
    };

    const weatherToggleBtn = document.getElementById("weather-toggle");
    if (weatherToggleBtn) {
      weatherToggleBtn.innerText = weatherIcons[weatherModes[0]];
      weatherToggleBtn.addEventListener("click", () => {
        activeWeatherIdx = (activeWeatherIdx + 1) % weatherModes.length;
        const mode = weatherModes[activeWeatherIdx];
        weatherToggleBtn.innerText = weatherIcons[mode];
        weatherToggleBtn.title = `Weather: ${mode.toUpperCase()}`;
        initWeather();
      });
    }

    initWeather();
    animateWeather();
  };

  // Black & Gold Theme Confetti Explosion System (using palette colors)
  const triggerConfettiBurst = () => {
    const canvas = document.getElementById("fireworks-canvas");
    if (!canvas) return;
    canvas.style.display = "block";
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettis = [];
    const colors = ["#dfb76c", "#d4af37", "#b8860b", "#f7e7c4", "#ffffff", "#333333"];

    for (let i = 0; i < 120; i++) {
      confettis.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        opacity: 1
      });
    }

    let frames = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettis.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.2;
        c.opacity -= 0.012;

        ctx.save();
        ctx.globalAlpha = Math.max(c.opacity, 0);
        ctx.fillStyle = c.color;
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
        ctx.restore();
      });

      frames++;
      if (frames < 120) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = "none";
      }
    };

    animate();
  };

  // --- FULL ROCKET FIREWORKS & CRACKERS EXPLOSIONS SYSTEM ---
  const initFireworks = () => {
    const fireworksCanvas = document.getElementById("fireworks-canvas");
    if (!fireworksCanvas) return;
    const fctx = fireworksCanvas.getContext("2d");
    let fParticles = [];
    let fRockets = [];
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

      const launchInterval = setInterval(() => {
        if (fRockets.length < 6) {
          fRockets.push(new FireworkRocket());
        }
      }, 400);

      const fAnimate = () => {
        fctx.fillStyle = "rgba(10, 5, 20, 0.2)";
        fctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

        for (let i = fRockets.length - 1; i >= 0; i--) {
          const r = fRockets[i];
          const exploded = r.update();
          if (exploded) {
            for (let s = 0; s < 60; s++) {
              fParticles.push(new FireworkSpark(r.x, r.y, r.color));
            }
            fRockets.splice(i, 1);
          } else {
            r.draw();
          }
        }

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

      setTimeout(() => {
        clearInterval(launchInterval);
        fireworksRunning = false;
        
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

    const btn = document.getElementById("fireworks-trigger");
    if (btn) {
      btn.addEventListener("click", () => {
        triggerConfettiBurst();
        startFireworks();
      });
    }
  };

  // --- REVEAL ON SCROLL INTERSECTION OBSERVER ---
  const initScrollObserver = () => {
    const elements = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
  };

  // --- SCROLL PROGRESS & STICKY HEADER & SCROLL-TOP ---
  const initScrollHandlers = () => {
    const progressBar = document.getElementById("scroll-progress");
    const scrollTopBtn = document.getElementById("scroll-top-btn");

    window.addEventListener("scroll", () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;

      if (progressBar) {
        progressBar.style.width = scrolled + "%";
      }

      if (scrollTopBtn) {
        if (winScroll > 400) {
          scrollTopBtn.classList.add("visible");
        } else {
          scrollTopBtn.classList.remove("visible");
        }
      }
    });

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  // --- THEME SWITCHER TOGGLE (LIGHT / DARK) ---
  const initThemeToggle = () => {
    const themeBtn = document.getElementById("theme-toggle");
    if (!themeBtn) return;

    let currentTheme = localStorage.getItem("birthday_theme") || "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    themeBtn.innerText = currentTheme === "dark" ? "☀️" : "🌙";

    themeBtn.addEventListener("click", () => {
      currentTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", currentTheme);
      localStorage.setItem("birthday_theme", currentTheme);
      themeBtn.innerText = currentTheme === "dark" ? "☀️" : "🌙";
    });
  };

  // --- MOBILE NAV MENU TOGGLE ---
  const initMobileNav = () => {
    const toggleBtn = document.getElementById("mobile-toggle");
    const navLinks = document.getElementById("nav-links");

    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  };

  // --- CUSTOM CURSOR TRAIL ---
  const initCustomCursor = () => {
    const dot = document.getElementById("cursor-dot");
    const glow = document.getElementById("cursor-glow");

    if (!dot || !glow) return;

    window.addEventListener("mousemove", (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  };

  // MASTER INITIALIZATION CALL
  initHero();
  initStory();
  initLetter();
  initEnvelopeInteraction();
  initCountdown();
  initTimeline();
  initGallery();
  initPolaroids();
  initReasons();
  initQuotes();
  initGiftBox();
  initSecretForm();
  initMusicPlayer();
  initParticleCanvas();
  initFireworks();
  initScrollObserver();
  initScrollHandlers();
  initThemeToggle();
  initMobileNav();
  initCustomCursor();
});
