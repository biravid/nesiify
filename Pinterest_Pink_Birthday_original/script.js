(() => {
  "use strict";

  const CONFIG = window.BIRTHDAY_CONFIG || {};
  const app = document.getElementById("app");
  const screens = [...document.querySelectorAll(".screen")];
  const dots = [...document.querySelectorAll(".progress-dots i")];
  let current = 0;

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  // Audio Context for synthetic sound feedback (Polaroid shutter / paper touch)
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioCtx = new AudioCtx();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playShutterSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      // Soft mechanical paper click / camera shutter simulation
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }

  function bindText() {
    $$("[data-bind]").forEach(el => {
      const key = el.dataset.bind;
      if (CONFIG[key] !== undefined) el.textContent = CONFIG[key];
    });
  }

  function setImage(id, path, fallback) {
    const img = document.getElementById(id);
    if (!img) return;
    img.src = path || fallback || "";
    img.onerror = () => {
      img.onerror = null;
      if (fallback) img.src = fallback;
      else img.style.opacity = "0";
    };
  }

  function loadAssets() {
    const ref = {
      hero: "assets/hero-object.png",
      main: "assets/cake-flowers-reference.png",
      cake: "assets/original-butterfly-cake-transparent.png",
      one: "assets/bouquet-transparent.png",
      two: "assets/cake-flowers-reference.png",
      three: "assets/cake-balloons-reference.jpg",
      four: "assets/polaroid-reference.png"
    };

    // Hero Object (Intro page cutout)
    setImage("heroObjectImg", CONFIG.heroObject, ref.hero);

    // Main user photo
    setImage("userPhoto", CONFIG.userPhoto, ref.main);

    // Cake image
    setImage("realCakeImg", CONFIG.cakeImage, ref.cake);

    // Gallery array handling (objects or plain strings)
    const g = CONFIG.gallery || [];
    const getGalleryItem = (idx, fallbackImg, defaultCaption) => {
      const item = g[idx];
      if (!item) return { img: fallbackImg, caption: defaultCaption };
      if (typeof item === "string") return { img: item, caption: defaultCaption };
      return { img: item.image || fallbackImg, caption: item.caption || defaultCaption };
    };

    const g1 = getGalleryItem(0, ref.one, "the smiles ♡");
    const g2 = getGalleryItem(1, ref.two, "the laughter");
    const g3 = getGalleryItem(2, ref.three, "the little things");
    const g4 = getGalleryItem(3, ref.four, "always & forever");

    setImage("gallery1", g1.img, ref.one);
    setImage("gallery2", g2.img, ref.two);
    setImage("gallery3", g3.img, ref.three);
    setImage("gallery4", g4.img, ref.four);

    if ($("#galleryCaption1")) $("#galleryCaption1").textContent = g1.caption;
    if ($("#galleryCaption2")) $("#galleryCaption2").textContent = g2.caption;
    if ($("#galleryCaption3")) $("#galleryCaption3").textContent = g3.caption;
    if ($("#galleryCaption4")) $("#galleryCaption4").textContent = g4.caption;
  }

  function goTo(index) {
    if (index < 0 || index >= screens.length || index === current) return;
    const old = current;
    current = index;
    screens[old].classList.remove("is-active");
    screens[index].classList.add("is-active");
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    if (index === 6) startCake();
    window.setTimeout(() => window.scrollTo(0, 0), 50);
  }

  // Handle generic data-next clicks
  $$("[data-next]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      // If it's the cover open button, handle cinematic sequence first
      if (btn.id === "openSurpriseBtn") {
        e.preventDefault();
        handleCinematicOpen();
        return;
      }
      goTo(Number(btn.dataset.next));
    });
  });

  // ==================================================
  // CINEMATIC TRANSITION ON "OPEN SURPRISE"
  // ==================================================
  function handleCinematicOpen() {
    const btn = $("#openSurpriseBtn");
    const coverCard = $("#coverCard");
    const screenCover = $(".screen-cover");
    const coverPetals = $("#coverPetals");

    if (btn.dataset.transitioning === "true") return;
    btn.dataset.transitioning = "true";

    // 1. Button compresses gently
    coverCard.classList.add("compress");

    // 2. Background brightens
    screenCover.classList.add("brighten");

    // 3. Tiny sparkles / petals float upward
    if (coverPetals) {
      for (let i = 0; i < 12; i++) {
        const petal = document.createElement("div");
        petal.className = "rose-petal";
        petal.style.left = `${10 + Math.random() * 80}%`;
        petal.style.bottom = `${10 + Math.random() * 30}%`;
        petal.style.animationDelay = `${Math.random() * 0.4}s`;
        petal.style.animationDuration = `${2.5 + Math.random() * 1.5}s`;
        coverPetals.appendChild(petal);
      }
    }

    // 4. Card fades toward cream
    window.setTimeout(() => {
      coverCard.classList.add("fade-out-cream");
    }, 350);

    // 5. Transition to Intro screen
    window.setTimeout(() => {
      goTo(1);
    }, 1100);
  }

  // ==================================================
  // FEATURE 1 — PETAL / HEART REVEAL INTERACTION
  // ==================================================
  const heartRevealBtn = $("#heartRevealBtn");
  const revealMessage = $("#revealMessage");
  const introNextBtn = $("#introNextBtn");
  const petalContainer = $("#petalContainer");
  const screenIntro = $(".screen-intro");

  if (heartRevealBtn) {
    heartRevealBtn.addEventListener("click", () => {
      // Generate drifting rose petals
      if (petalContainer) {
        for (let i = 0; i < 16; i++) {
          const petal = document.createElement("div");
          petal.className = "rose-petal";
          petal.style.left = `${5 + Math.random() * 90}%`;
          petal.style.bottom = `${5 + Math.random() * 20}%`;
          petal.style.animationDelay = `${Math.random() * 0.6}s`;
          petal.style.animationDuration = `${3 + Math.random() * 1.5}s`;
          petalContainer.appendChild(petal);
          window.setTimeout(() => petal.remove(), 5000);
        }
      }

      // Warm background
      if (screenIntro) screenIntro.classList.add("warm-bg");

      // Hide heart button, show text & next button
      heartRevealBtn.classList.add("hidden");
      if (revealMessage) revealMessage.classList.remove("hidden");
      if (introNextBtn) introNextBtn.classList.remove("hidden");
    });
  }

  // Tilt/Parallax effect on hero object for phone gyro or mouse
  const heroObjectWrap = $("#heroObjectWrap");
  if (heroObjectWrap) {
    window.addEventListener("mousemove", (e) => {
      if (current !== 1) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      heroObjectWrap.style.transform = `translate3d(${dx * 12}px, ${dy * 12}px, 0) rotate(${dx * 3}deg)`;
    });
  }

  // ==================================================
  // FEATURE 2 — INTERACTIVE MEMORY POLAROIDS
  // ==================================================
  const polaroids = $$(".polaroid");
  const polaroidModal = $("#polaroidModal");
  const modalImg = $("#modalImg");
  const modalCaption = $("#modalCaption");
  const modalCloseBtn = $("#modalCloseBtn");
  const modalBackdrop = $("#modalBackdrop");

  polaroids.forEach((pol, idx) => {
    pol.addEventListener("click", () => {
      playShutterSound();
      const img = pol.querySelector("img");
      const caption = pol.querySelector("span");

      if (modalImg && img) modalImg.src = img.src;
      if (modalCaption && caption) modalCaption.textContent = caption.textContent;

      if (polaroidModal) polaroidModal.classList.remove("hidden");
    });
  });

  function closeModal() {
    if (polaroidModal) polaroidModal.classList.add("hidden");
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

  // ==================================================
  // BALLOON LAUNCH
  // ==================================================
  const balloons = $$("[data-balloon]");
  const launchLabel = $("#launchLabel");
  const launchContinue = $("#launchContinue");
  let popped = 0;

  balloons.forEach(balloon => {
    balloon.addEventListener("click", () => {
      if (balloon.classList.contains("popped")) return;
      balloon.classList.add("popped");
      popped++;
      if (launchLabel) {
        launchLabel.textContent = popped >= 3 ? "you did it — the surprise is ready ♡" : "pop, pop... keep going ♡";
      }
      if (popped >= 3 && launchContinue) {
        launchContinue.classList.remove("hidden");
      }
    });
  });

  // ==================================================
  // AUDIO PLAYER
  // ==================================================
  const audio = $("#audio");
  const playBtn = $("#playBtn");
  const progress = $("#progress");
  const progressDot = $("#progressDot");
  const currentTimeEl = $("#currentTime");
  const durationEl = $("#duration");
  const disc = $(".disc");
  const soundNote = $("#soundNote");

  if (CONFIG.audio && audio) audio.src = CONFIG.audio;

  const fmt = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  function syncPlayer() {
    if (!audio) return;
    const ratio = audio.duration ? audio.currentTime / audio.duration : 0;
    if (progress) progress.style.width = `${ratio * 100}%`;
    if (progressDot) progressDot.style.left = `${ratio * 100}%`;
    if (currentTimeEl) currentTimeEl.textContent = fmt(audio.currentTime);
    if (durationEl) durationEl.textContent = fmt(audio.duration);
  }

  function togglePlay() {
    if (!audio || !audio.src) {
      if (soundNote) {
        soundNote.textContent = "add song.mp3 in assets";
        soundNote.classList.add("on");
        window.setTimeout(() => soundNote.classList.remove("on"), 2200);
      }
      return;
    }
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }

  if (playBtn) playBtn.addEventListener("click", togglePlay);
  if (audio) {
    audio.addEventListener("play", () => {
      if (playBtn) playBtn.textContent = "Ⅱ";
      if (disc) disc.classList.add("playing");
      if (soundNote) {
        soundNote.textContent = "♫ playing";
        soundNote.classList.add("on");
      }
    });
    audio.addEventListener("pause", () => {
      if (playBtn) playBtn.textContent = "▶";
      if (disc) disc.classList.remove("playing");
    });
    audio.addEventListener("loadedmetadata", syncPlayer);
    audio.addEventListener("timeupdate", syncPlayer);
  }

  if ($("#backBtn")) {
    $("#backBtn").addEventListener("click", () => {
      if (audio) audio.currentTime = Math.max(0, audio.currentTime - 10);
    });
  }
  if ($("#forwardBtn")) {
    $("#forwardBtn").addEventListener("click", () => {
      if (audio) audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
    });
  }

  // ==================================================
  // FEATURE 3 — CAKE & CANDLE WISH INTERACTION
  // ==================================================
  let wishMade = false;
  let holdTimer = null;

  function startCake() {
    const candleFlame = $("#candleFlame");
    const candleGlow = $("#candleGlow");
    if (candleFlame) candleFlame.classList.remove("out", "blowing");
    if (candleGlow) candleGlow.style.opacity = "1";
  }

  function makeBirthdayWish() {
    if (wishMade) return;
    wishMade = true;

    const candleFlame = $("#candleFlame");
    const candleGlow = $("#candleGlow");
    const smokeContainer = $("#smokeContainer");
    const screenCake = $(".screen-cake");
    const wishBtn = $("#wishBtn");
    const cakeHint = $("#cakeHint");
    const wishRevealed = $("#wishRevealed");
    const finalNextBtn = $("#finalNextBtn");

    // 1. Candle flame grows & flickers
    if (candleFlame) candleFlame.classList.add("blowing");

    // 2. Screen gets warmer
    if (screenCake) screenCake.classList.add("warm-mode");

    // 3. Flame flickers for 400ms then blows out with smoke
    window.setTimeout(() => {
      if (candleFlame) candleFlame.classList.add("out");
      if (candleGlow) candleGlow.style.opacity = "0";

      // 4. Smoke particles rise
      if (smokeContainer) {
        for (let i = 0; i < 6; i++) {
          const smoke = document.createElement("div");
          smoke.className = "smoke-particle";
          smoke.style.left = `${-15 + Math.random() * 30}px`;
          smoke.style.animationDelay = `${i * 0.15}s`;
          smokeContainer.appendChild(smoke);
          window.setTimeout(() => smoke.remove(), 2500);
        }
      }

      // 5. Hide button & hint, reveal "Wish made. ♡"
      if (wishBtn) wishBtn.classList.add("hidden");
      if (cakeHint) cakeHint.classList.add("hidden");

      window.setTimeout(() => {
        if (wishRevealed) wishRevealed.classList.remove("hidden");
        if (finalNextBtn) finalNextBtn.classList.remove("hidden");
      }, 700);

    }, 450);
  }

  // Candle tap event
  const candleArea = $("#candleArea");
  if (candleArea) {
    candleArea.addEventListener("click", makeBirthdayWish);
  }

  // Wish button click & press-hold handlers
  const wishBtn = $("#wishBtn");
  const holdProgress = $("#holdProgress");

  if (wishBtn) {
    // Tap handler
    wishBtn.addEventListener("click", makeBirthdayWish);

    // Press & Hold handling
    const startHold = () => {
      if (wishMade) return;
      let start = Date.now();
      if (holdProgress) holdProgress.style.width = "0%";
      holdTimer = window.setInterval(() => {
        let elapsed = Date.now() - start;
        let p = Math.min(100, (elapsed / 900) * 100);
        if (holdProgress) holdProgress.style.width = `${p}%`;
        if (elapsed >= 900) {
          clearInterval(holdTimer);
          makeBirthdayWish();
        }
      }, 30);
    };

    const cancelHold = () => {
      if (holdTimer) clearInterval(holdTimer);
      if (holdProgress) holdProgress.style.width = "0%";
    };

    wishBtn.addEventListener("mousedown", startHold);
    wishBtn.addEventListener("mouseup", cancelHold);
    wishBtn.addEventListener("mouseleave", cancelHold);
    wishBtn.addEventListener("touchstart", startHold, { passive: true });
    wishBtn.addEventListener("touchend", cancelHold, { passive: true });
  }

  // ==================================================
  // REPLAY & NAVIGATION
  // ==================================================
  if ($("#restartBtn")) {
    $("#restartBtn").addEventListener("click", () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      // Reset balloon state
      balloons.forEach(b => b.classList.remove("popped"));
      popped = 0;
      if (launchLabel) launchLabel.textContent = "tap any heart balloon";
      if (launchContinue) launchContinue.classList.add("hidden");

      // Reset cover card transition classes
      const coverCard = $("#coverCard");
      const screenCover = $(".screen-cover");
      const openSurpriseBtn = $("#openSurpriseBtn");
      if (coverCard) coverCard.classList.remove("compress", "fade-out-cream");
      if (screenCover) screenCover.classList.remove("brighten");
      if (openSurpriseBtn) delete openSurpriseBtn.dataset.transitioning;

      // Reset intro screen
      if (screenIntro) screenIntro.classList.remove("warm-bg");
      if (heartRevealBtn) heartRevealBtn.classList.remove("hidden");
      if (revealMessage) revealMessage.classList.add("hidden");
      if (introNextBtn) introNextBtn.classList.add("hidden");

      // Reset cake wish state
      wishMade = false;
      const screenCake = $(".screen-cake");
      const candleFlame = $("#candleFlame");
      const candleGlow = $("#candleGlow");
      const cakeHint = $("#cakeHint");
      const wishRevealed = $("#wishRevealed");
      const finalNextBtn = $("#finalNextBtn");

      if (screenCake) screenCake.classList.remove("warm-mode");
      if (candleFlame) candleFlame.classList.remove("out", "blowing");
      if (candleGlow) candleGlow.style.opacity = "1";
      if (wishBtn) wishBtn.classList.remove("hidden");
      if (cakeHint) cakeHint.classList.remove("hidden");
      if (wishRevealed) wishRevealed.classList.add("hidden");
      if (finalNextBtn) finalNextBtn.classList.add("hidden");

      goTo(0);
    });
  }

  // Keyboard navigation for desktop testing
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && current < screens.length - 1) goTo(current + 1);
    if (e.key === "ArrowLeft" && current > 0) goTo(current - 1);
    if (e.key === "Escape") {
      closeModal();
      goTo(0);
    }
  });

  // Swipe support for touch screens
  let touchStartX = 0, touchStartY = 0;
  app.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  app.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      if (dx < 0 && current < screens.length - 1) goTo(current + 1);
      if (dx > 0 && current > 0) goTo(current - 1);
    }
  }, { passive: true });

  bindText();
  loadAssets();
})();
