// ==========================================
// GENZ AESTHETIC MULTI-PAGE ENGINE
// Dedicated for Santhosh from Hashini 💖✨
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const config = window.SURPRISE_CONFIG || {};

    let currentPage = 0;
    const totalPages = 12;

    // DOM Elements
    const musicToggle = document.getElementById("musicToggle");
    const bgAudio = document.getElementById("bgAudio");
    const lofiAudio = document.getElementById("lofiAudio");
    const bottomNav = document.getElementById("bottomNav");
    const prevPageBtn = document.getElementById("prevPageBtn");
    const nextPageBtn = document.getElementById("nextPageBtn");
    const mainFooter = document.getElementById("mainFooter");
    const pageDots = document.querySelectorAll(".dot");

    // -- Door Transition System DOM refs --
    const doorOverlay     = document.getElementById("doorOverlay");
    const doorCard        = document.getElementById("doorCard");
    const doorTypeText    = document.getElementById("doorTypeText");
    const doorCursor      = document.querySelector(".door-cursor");
    const doorHint        = document.getElementById("doorHint");
    const doorHintEmoji   = document.getElementById("doorHintEmoji");
    const doorHintLabel   = document.getElementById("doorHintLabel");
    const doorChapterPill = document.getElementById("doorChapterPill");
    const doorRibbonFill  = document.getElementById("doorRibbonFill");
    const doorRibbonLabel = document.getElementById("doorRibbonLabel");
    const doorTapHint     = document.getElementById("doorTapHint");
    let   _twTimer        = null; // active typewriter setInterval handle

    // ------------------------------------------
    // HORIZONTAL SWIPE GUARD
    // Blocks browser back/forward navigation gesture on mobile.
    // Intercepts touchmove when dx > dy (horizontal intent)
    // and calls preventDefault() — vertical scroll is untouched.
    // ------------------------------------------
    let _swipeStartX = 0;
    let _swipeStartY = 0;

    document.addEventListener("touchstart", (e) => {
        _swipeStartX = e.touches[0].clientX;
        _swipeStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener("touchmove", (e) => {
        const dx = Math.abs(e.touches[0].clientX - _swipeStartX);
        const dy = Math.abs(e.touches[0].clientY - _swipeStartY);
        // Block only horizontal swipes (dx dominates by >8px threshold)
        if (dx > dy && dx > 8 && e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false }); // passive:false required to call preventDefault()


    // Web Audio API Synthesizer Sound Engine
    let audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playSparkleSound() {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } catch (e) {}
    }

    function playPopSound() {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.08);
        } catch (e) {}
    }

    function playFanfareSound() {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
                gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.08 + 0.25);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(ctx.currentTime + idx * 0.08);
                osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
            });
        } catch (e) {}
    }

    function playWhooshSound() {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const osc  = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(420, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.18);
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.2);
        } catch (e) {}
    }

    function playCameraShutterSound() {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const now = ctx.currentTime;

            // Click 1: Shutter curtain open (metallic click)
            const c1 = ctx.createOscillator();
            const g1 = ctx.createGain();
            c1.type = 'triangle';
            c1.frequency.setValueAtTime(1400, now);
            c1.frequency.exponentialRampToValueAtTime(100, now + 0.045);
            g1.gain.setValueAtTime(0.35, now);
            g1.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            c1.connect(g1);
            g1.connect(ctx.destination);
            c1.start(now);
            c1.stop(now + 0.05);

            // Click 2: Shutter slap / snap (0.065s later)
            const c2 = ctx.createOscillator();
            const g2 = ctx.createGain();
            c2.type = 'square';
            c2.frequency.setValueAtTime(800, now + 0.065);
            c2.frequency.exponentialRampToValueAtTime(50, now + 0.12);
            g2.gain.setValueAtTime(0.28, now + 0.065);
            g2.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
            c2.connect(g2);
            g2.connect(ctx.destination);
            c2.start(now + 0.065);
            c2.stop(now + 0.13);

            // Film motor advance sound (0.14s to 0.48s)
            const motor = ctx.createOscillator();
            const mg = ctx.createGain();
            motor.type = 'sawtooth';
            motor.frequency.setValueAtTime(150, now + 0.13);
            motor.frequency.linearRampToValueAtTime(260, now + 0.26);
            motor.frequency.linearRampToValueAtTime(190, now + 0.44);
            mg.gain.setValueAtTime(0.001, now + 0.13);
            mg.gain.linearRampToValueAtTime(0.07, now + 0.2);
            mg.gain.exponentialRampToValueAtTime(0.001, now + 0.46);
            motor.connect(mg);
            mg.connect(ctx.destination);
            motor.start(now + 0.13);
            motor.stop(now + 0.48);
        } catch (e) {}
    }

    // ------------------------------------------
    // 1. BACKGROUND CANVAS FALLING BLUE & WHITE PARTICLES
    // ------------------------------------------
    function initBackgroundCanvas() {
        const canvas = document.getElementById("bgCanvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let dpr = window.devicePixelRatio || 1;

        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for mobile performance
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        resize();
        window.addEventListener("resize", resize);

        // Curated Blue & White palette for Santhosh's sky-blue theme
        const colorPalette = [
            { r: 255, g: 255, b: 255, a: 0.90 }, // Crisp Pure White
            { r: 240, g: 248, b: 255, a: 0.80 }, // Alice Blue / Frost
            { r: 224, g: 242, b: 254, a: 0.75 }, // Ice Blue
            { r: 186, g: 230, b: 253, a: 0.70 }, // Soft Sky Blue
            { r: 125, g: 211, b: 252, a: 0.65 }, // Bright Sky Cyan
            { r: 74,  g: 144, b: 184, a: 0.50 }  // Muted Ocean Mist
        ];

        // Optimized particle count based on screen width
        const count = width < 600 ? 42 : 72;
        const particles = [];

        for (let i = 0; i < count; i++) {
            const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            const isStar = Math.random() < 0.22; // ~22% are 4-point twinkle stars
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: isStar ? (Math.random() * 2.2 + 2.0) : (Math.random() * 2.2 + 0.8),
                baseAlpha: col.a,
                r: col.r,
                g: col.g,
                b: col.b,
                speedY: Math.random() * 0.65 + 0.35,     // Gentle downward drift
                speedX: (Math.random() - 0.5) * 0.25,    // Subtle sideways drift
                angle: Math.random() * Math.PI * 2,
                swaySpeed: Math.random() * 0.018 + 0.008,
                swayAmplitude: Math.random() * 0.55 + 0.25,
                twinkleAngle: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.035 + 0.015,
                isStar: isStar,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.015,
                hasGlow: Math.random() < 0.40
            });
        }

        // Draw a delicate 4-point sparkle star
        function drawStar(cx, cy, spikes, outerRadius, innerRadius, rot) {
            let rotStep = Math.PI / spikes;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(rot);
            ctx.beginPath();
            let x = 0, y = 0;
            for (let i = 0; i < spikes * 2; i++) {
                let r = (i % 2 === 0) ? outerRadius : innerRadius;
                x = Math.cos(i * rotStep) * r;
                y = Math.sin(i * rotStep) * r;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        let animFrameId = null;

        function render() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Gentle horizontal wave sway + downward fall
                p.angle += p.swaySpeed;
                p.twinkleAngle += p.twinkleSpeed;
                p.rotation += p.rotSpeed;

                p.x += Math.sin(p.angle) * p.swayAmplitude + p.speedX;
                p.y += p.speedY;

                // Subtle twinkling alpha
                const currentAlpha = Math.max(0.15, Math.min(1, p.baseAlpha + Math.sin(p.twinkleAngle) * 0.22));

                // Screen recycling
                if (p.y > height + 16) {
                    p.y = -16;
                    p.x = Math.random() * width;
                }
                if (p.x > width + 16) p.x = -16;
                if (p.x < -16) p.x = width + 16;

                ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${currentAlpha.toFixed(3)})`;

                if (p.hasGlow) {
                    ctx.shadowColor = `rgba(186, 230, 253, ${Math.min(currentAlpha * 0.8, 0.75)})`;
                    ctx.shadowBlur = 6;
                } else {
                    ctx.shadowBlur = 0;
                }

                if (p.isStar) {
                    drawStar(p.x, p.y, 4, p.radius * 1.5, p.radius * 0.45, p.rotation);
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            animFrameId = requestAnimationFrame(render);
        }

        render();
    }

    // ------------------------------------------
    // 1b. CINEMATIC FILM REEL BUILDER (PAGE 1)
    // Dynamically creates frames from config.filmReelPhotos
    // Duplicates array for seamless CSS infinite scroll loop
    // ------------------------------------------
    function initFilmReel() {
        const reel = document.getElementById("filmStrip");
        if (!reel) return;
        const photos = config.filmReelPhotos || [];
        if (photos.length === 0) return;

        // Duplicate the set: 3 photos x2 = 6 frames
        // CSS translateX(-50%) scrolls exactly 3 frames — seamless loop
        const allPhotos = [...photos, ...photos];
        allPhotos.forEach(photo => {
            const frame = document.createElement("div");
            frame.className = "film-frame";
            const img = document.createElement("img");
            img.src = photo.image;
            img.alt = photo.caption || "Memory";
            img.loading = "eager";
            img.className = "film-frame-img";
            frame.appendChild(img);
            reel.appendChild(frame);
        });
    }

    // ------------------------------------------
    // 2. CONFEETI EXPLOSION ENGINE
    // ------------------------------------------
    function triggerConfetti() {
        playFanfareSound();
        const colors = ["#FF5E97", "#FFC2D1", "#FFD700", "#D8B4F8", "#E03155", "#FFFFFF"];
        const confettiCount = 60;
        const container = document.body;

        for (let i = 0; i < confettiCount; i++) {
            const piece = document.createElement("div");
            piece.className = "confetti-piece";
            piece.style.position = "fixed";
            piece.style.left = Math.random() * 100 + "vw";
            piece.style.top = "-20px";
            piece.style.width = Math.random() * 10 + 6 + "px";
            piece.style.height = Math.random() * 12 + 8 + "px";
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
            piece.style.zIndex = "9999";
            piece.style.pointerEvents = "none";

            const duration = Math.random() * 2 + 2;
            piece.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${duration}s ease`;

            container.appendChild(piece);

            setTimeout(() => {
                const rotation = Math.random() * 720 - 360;
                piece.style.transform = `translateY(${window.innerHeight + 50}px) rotate(${rotation}deg)`;
                piece.style.opacity = "0";
            }, 50);

            setTimeout(() => {
                if (piece.parentNode) piece.parentNode.removeChild(piece);
            }, duration * 1000);
        }
    }

    // ------------------------------------------
    // 3. POPULATE DOM CONTENT FROM CONFIG
    // ------------------------------------------
    function initDOM() {
        if (config.recipientName) {
            const heading = document.getElementById("recipientHeading");
            if (heading) heading.textContent = config.recipientName;
        }

        if (config.proposalTitle) {
            const introTitle = document.getElementById("introTitle");
            if (introTitle) introTitle.textContent = config.proposalTitle;
        }

        if (config.proposalSubtitle) {
            const introSub = document.getElementById("introSubtitle");
            if (introSub) introSub.innerHTML = config.proposalSubtitle;
        }

        if (config.birthdayPage) {
            const bgText = document.getElementById("hbdBgText");
            if (bgText && config.birthdayPage.bgText) bgText.textContent = config.birthdayPage.bgText;

            const overlayText = document.getElementById("hbdOverlayText");
            if (overlayText && config.birthdayPage.overlayText) overlayText.textContent = config.birthdayPage.overlayText;

            const bPhoto = document.getElementById("birthdayCutoutImg");
            if (bPhoto && config.birthdayPage.photo) bPhoto.src = config.birthdayPage.photo;

            const bMsg = document.getElementById("hbdMessage");
            if (bMsg && config.birthdayPage.message) bMsg.textContent = config.birthdayPage.message;
        }

        if (config.senderName) {
            const senderFooter = document.getElementById("senderFooter");
            if (senderFooter) senderFooter.textContent = `Created with ❤️ by ${config.senderName}`;
        }

        if (config.countdownTitle) {
            const cTitle = document.getElementById("countdownTitle");
            if (cTitle) cTitle.textContent = config.countdownTitle;
        }

        if (config.cdSongTitle) {
            const cdTitle = document.getElementById("cdSongTitle");
            if (cdTitle) cdTitle.textContent = config.cdSongTitle;
        }

        if (config.cdSongSub) {
            const cdSub = document.getElementById("cdSongSub");
            if (cdSub) cdSub.textContent = config.cdSongSub;
        }

        if (config.scratchPhoto) {
            const scratchImg = document.getElementById("scratchImg");
            if (scratchImg) scratchImg.src = config.scratchPhoto;
        }

        if (config.scratchCaption) {
            const scratchCap = document.getElementById("scratchCaption");
            if (scratchCap) scratchCap.textContent = config.scratchCaption;
        }

        if (config.gift) {
            const gInst = document.getElementById("giftInstruction");
            if (gInst && config.gift.boxTitle) gInst.textContent = config.gift.boxTitle;

            const rTitle = document.getElementById("revealedTitle");
            if (rTitle && config.gift.revealedTitle) rTitle.textContent = config.gift.revealedTitle;

            const rMsg = document.getElementById("revealedMessage");
            if (rMsg && config.gift.revealedMessage) rMsg.textContent = config.gift.revealedMessage;
        }

        if (bgAudio && config.audioUrl) {
            bgAudio.src = config.audioUrl;
        }

        if (lofiAudio) {
            lofiAudio.src = config.lofiAudioUrl || "images/lofi.mp3";
        }

        const pwdHint = document.getElementById("passwordHint");
        if (pwdHint && config.passwordHint) {
            pwdHint.textContent = config.passwordHint;
        }

        // Gift reveal photo (Page 3)
        if (config.gift && config.gift.revealPhoto) {
            const giftPhoto = document.getElementById("giftRevealPhoto");
            if (giftPhoto) giftPhoto.src = config.gift.revealPhoto;
        }

        // Heart locket photos & caption (Page 9)
        if (config.locket) {
            const locketLeft  = document.getElementById("locketPhotoLeft");
            const locketRight = document.getElementById("locketPhotoRight");
            const locketCap   = document.getElementById("locketCaption");
            if (locketLeft  && config.locket.photoLeft)  locketLeft.src         = config.locket.photoLeft;
            if (locketRight && config.locket.photoRight) locketRight.src        = config.locket.photoRight;
            if (locketCap   && config.locket.caption)    locketCap.textContent  = config.locket.caption;
        }

        // Initialize Module Engine Features
        initBackgroundCanvas();
        init3DTilt();
        initProposalPage();
        initCountdown();
        initCDPlayer();
        initBalloons();
        initExpectationReality();
        initScratchCard();
        initGallery();
        initPasswordLock();
        initQuiz();
        initFilmReel();
        initCatCompanions(); // 🐾 Cat sidekick system
        initFinalePage();    // 💍 Grand Finale Page
    }

    // ------------------------------------------
    // 4. 3D TILT EFFECT ON CARDS (DISABLED FOR FLAT CLEAN LAYOUT)
    // ------------------------------------------
    function init3DTilt() {
        // Disabled so elements display cleanly directly on the main page surface
    }

    // ------------------------------------------
    // 5. PAGE NAVIGATION ENGINE
    // ------------------------------------------
    function goToPage(pageNumber) {
        if (pageNumber < 0 || pageNumber > totalPages) return;

        playSparkleSound();

        const activeScreen = document.querySelector(".page-screen:not(.hidden)");
        if (activeScreen) {
            activeScreen.classList.add("hidden");
        }

        const targetScreen = document.getElementById(`page-${pageNumber}`);
        if (targetScreen) {
            targetScreen.classList.remove("hidden");
            targetScreen.style.animation = "none";
            targetScreen.offsetHeight; /* trigger reflow */
            targetScreen.style.animation = "elasticSlideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.15) forwards";
        }

        currentPage = pageNumber;

        // Navbar & Controls Visibility
        if (currentPage === 0) {
            bottomNav.classList.add("hidden");
            if (musicToggle) musicToggle.classList.add("hidden");
            if (mainFooter) mainFooter.classList.add("hidden");
        } else {
            bottomNav.classList.remove("hidden");
            if (musicToggle) musicToggle.classList.remove("hidden");
            if (mainFooter) mainFooter.classList.remove("hidden");
        }

        // Prev / Next Buttons
        if (prevPageBtn) {
            prevPageBtn.disabled = currentPage <= 1;
        }

        if (nextPageBtn) {
            if (currentPage === totalPages) {
                nextPageBtn.classList.add("hidden");
            } else {
                nextPageBtn.classList.remove("hidden");
            }
        }

        // Update Dots
        pageDots.forEach((dot, index) => {
            if (index + 1 === currentPage) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });

        // Auto-confetti on Birthday page (Page 3)
        if (pageNumber === 3) {
            setTimeout(() => triggerConfetti(), 500);
        }
    }

    // ------------------------------------------
    // 6. PROPOSAL / SURPRISE COVER (PAGE 0)
    // ------------------------------------------
    function initProposalPage() {
        const startBtn = document.getElementById("startBtn");
        const noBtn = document.getElementById("noProposalBtn");
        const noHint = document.getElementById("noBtnHint");

        if (startBtn) {
            startBtn.addEventListener("click", () => {
                triggerConfetti();
                // Play Audio
                if (bgAudio && bgAudio.src) {
                    bgAudio.play().catch(() => {});
                    if (musicToggle) musicToggle.classList.add("playing");
                }
                setTimeout(() => goToPage(1), 600);
            });
        }

        if (noBtn) {
            const jokes = [
                "No way Santhosh! Only YES is allowed! 💖",
                "You can't escape my love! Click YES! 💍✨",
                "We are in this together forever, my love! 🫶🏻",
                "Two hearts, one journey — click YES! 🥹❤️",
                "No is not in our dictionary, Santhosh! 🔒💖"
            ];
            let jokeIdx = 0;

            function dodgeButton() {
                playSparkleSound();
                const randomX = (Math.random() - 0.5) * 160;
                const randomY = (Math.random() - 0.5) * 100;
                noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

                if (noHint) {
                    noHint.textContent = jokes[jokeIdx % jokes.length];
                    noHint.classList.remove("hidden");
                    jokeIdx++;
                }
            }

            noBtn.addEventListener("mouseover", dodgeButton);
            noBtn.addEventListener("touchstart", (e) => {
                e.preventDefault();
                dodgeButton();
            });
        }
    }

    // ------------------------------------------
    // 7. COUNTDOWN ENGINE & SEND LOVE (PAGE 1)
    // ------------------------------------------
    function initCountdown() {
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minsEl = document.getElementById("minutes");
        const secsEl = document.getElementById("seconds");
        const sendLoveBtn = document.getElementById("sendLoveBtn");

        const targetDate = new Date(config.eventDate || "2026-08-24T00:00:00").getTime();

        function updateTimer() {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff <= 0) {
                if (daysEl) daysEl.textContent = "00";
                if (hoursEl) hoursEl.textContent = "00";
                if (minsEl) minsEl.textContent = "00";
                if (secsEl) secsEl.textContent = "00";
                return;
            }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            if (daysEl) daysEl.textContent = String(d).padStart(2, "0");
            if (hoursEl) hoursEl.textContent = String(h).padStart(2, "0");
            if (minsEl) minsEl.textContent = String(m).padStart(2, "0");
            if (secsEl) secsEl.textContent = String(s).padStart(2, "0");
        }

        updateTimer();
        setInterval(updateTimer, 1000);

        if (sendLoveBtn) {
            sendLoveBtn.addEventListener("click", () => {
                triggerConfetti();
                playSparkleSound();
                // Spawn floating heart bubbles from button position
                const rect = sendLoveBtn.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top;
                const hearts = ["❤️", "💖", "💕", "💗", "🩷", "🫶", "✨", "💘"];
                for (let i = 0; i < 8; i++) {
                    (function(delay, idx) {
                        setTimeout(() => {
                            const bubble = document.createElement("div");
                            bubble.className = "love-heart-bubble";
                            bubble.textContent = hearts[idx % hearts.length];
                            bubble.style.fontSize = (1.1 + Math.random() * 1.2) + "rem";
                            bubble.style.left = cx + (Math.random() - 0.5) * 60 + "px";
                            bubble.style.top = cy + "px";
                            bubble.style.setProperty("--hx", (Math.random() - 0.5) * 80 + "px");
                            bubble.style.setProperty("--hy1", -(40 + Math.random() * 60) + "px");
                            bubble.style.setProperty("--hx2", (Math.random() - 0.5) * 120 + "px");
                            bubble.style.setProperty("--hy2", -(120 + Math.random() * 150) + "px");
                            document.body.appendChild(bubble);
                            bubble.addEventListener("animationend", () => {
                                if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
                            }, { once: true });
                        }, delay);
                    })(i * 120, i);
                }
            });
        }

        // Page 4 Gift Box Unboxing - 3D Lid-Pop & Eruption
        const giftBox = document.getElementById("giftBox");
        const giftRevealed = document.getElementById("giftRevealed");
        const giftLidWrap = document.getElementById("giftLidWrap");
        const giftLightBurst = document.getElementById("giftLightBurst");
        const giftEruptionParticles = document.getElementById("giftEruptionParticles");
        const catBubble4 = document.getElementById("catBubble4");
        const giftInstruction = document.getElementById("giftInstruction");
        let giftBoxOpened = false;

        if (giftBox) {
            giftBox.addEventListener("click", () => {
                if (giftBoxOpened) return;
                giftBoxOpened = true;

                playPopSound();

                // Phase 1: Tension coil / shake
                giftBox.classList.add("opening");
                if (catBubble4) {
                    catBubble4.textContent = "WAAAH! It's opening! Look at the surprise! 🎁💖✨";
                }

                // Phase 2: Lid pops off in 3D & light beams burst out (at 280ms)
                setTimeout(() => {
                    if (giftLidWrap) giftLidWrap.classList.add("lid-flying");
                    if (giftLightBurst) giftLightBurst.classList.add("active");
                    triggerConfetti();

                    // Spawn eruption particles (emojis erupting upward in a fountain)
                    if (giftEruptionParticles) {
                        const emojis = ["👑", "💖", "✨", "🌸", "⭐", "🎉", "💙", "🎀", "💫"];
                        for (let i = 0; i < 14; i++) {
                            const p = document.createElement("span");
                            p.className = "gift-particle";
                            p.textContent = emojis[Math.floor(Math.random() * emojis.length)];

                            // Spread in upward fountain arc
                            const angle = (Math.PI * (0.8 + Math.random() * 1.4));
                            const dist = 75 + Math.random() * 95;
                            const dx = Math.cos(angle) * dist;
                            const dy = -Math.abs(Math.sin(angle)) * dist - 30;
                            const rot = -180 + Math.random() * 360;
                            const scale = 0.8 + Math.random() * 0.6;

                            p.style.setProperty("--dx", `${dx}px`);
                            p.style.setProperty("--dy", `${dy}px`);
                            p.style.setProperty("--rot", `${rot}deg`);
                            p.style.setProperty("--s", scale);
                            p.style.animationDelay = `${Math.random() * 0.15}s`;

                            giftEruptionParticles.appendChild(p);
                            setTimeout(() => p.remove(), 1300);
                        }
                    }
                }, 280);

                // Phase 3: Box base dissolves & revealed card ascends smoothly (at 550ms)
                setTimeout(() => {
                    giftBox.classList.add("box-dissolve");
                    if (giftInstruction) {
                        giftInstruction.textContent = "Your special surprise unlocked with pure love! ❤️✨";
                    }
                    setTimeout(() => {
                        giftBox.classList.add("hidden");
                        if (giftRevealed) {
                            giftRevealed.classList.remove("hidden");
                            giftRevealed.classList.add("revealed-animate");
                        }
                    }, 350);
                }, 550);
            });
        }
    }

    // ------------------------------------------
    // 8. MUSIC CD / VINYL PLAYER (PAGE 4)
    // ------------------------------------------
    function initCDPlayer() {
        const playBtn = document.getElementById("cdPlayPauseBtn");
        const playIcon = document.getElementById("cdPlayIcon");
        const playText = document.getElementById("cdPlayText");
        const cdDisc = document.getElementById("cdDisc");
        const equalizer = document.getElementById("equalizer");

        function updateLofiUI(isPlaying) {
            if (cdDisc) {
                if (isPlaying) cdDisc.classList.add("spinning");
                else cdDisc.classList.remove("spinning");
            }
            if (equalizer) {
                if (isPlaying) equalizer.classList.add("playing");
                else equalizer.classList.remove("playing");
            }
            if (playIcon) {
                playIcon.className = isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play";
            }
            if (playText) {
                playText.textContent = isPlaying ? "Pause Lofi Melody" : "Play Lofi Melody";
            }
        }

        function playLofi() {
            // When Lofi player is ON, the background song MUST BE OFF
            if (bgAudio && !bgAudio.paused) {
                bgAudio.pause();
            }
            if (musicToggle) {
                musicToggle.classList.remove("playing");
            }

            if (lofiAudio) {
                lofiAudio.play().then(() => {
                    updateLofiUI(true);
                }).catch((err) => {
                    console.warn("Lofi audio play error:", err);
                    updateLofiUI(false);
                });
            }
        }

        function pauseLofi() {
            if (lofiAudio) {
                lofiAudio.pause();
            }
            updateLofiUI(false);
        }

        function toggleLofi() {
            if (!lofiAudio) return;
            if (lofiAudio.paused) {
                playLofi();
            } else {
                pauseLofi();
            }
        }

        // Floating music toggle controls Background Song (bgAudio)
        if (musicToggle) {
            musicToggle.addEventListener("click", () => {
                if (!bgAudio) return;
                if (bgAudio.paused) {
                    // Turn OFF Lofi player if it was playing
                    if (lofiAudio && !lofiAudio.paused) {
                        pauseLofi();
                    }
                    bgAudio.play().then(() => {
                        musicToggle.classList.add("playing");
                    }).catch(() => {});
                } else {
                    bgAudio.pause();
                    musicToggle.classList.remove("playing");
                }
            });
        }

        // Page 5 vinyl player button & album stage toggle the dedicated Lofi Player
        if (playBtn) {
            playBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleLofi();
            });
        }

        const vinylStage = document.getElementById("vinylAlbumStage");
        if (vinylStage) {
            vinylStage.addEventListener("click", (e) => {
                if (e.target.closest("#cdPlayPauseBtn")) return;
                toggleLofi();
            });
        }

        // Initialize Lofi player UI to paused state
        updateLofiUI(false);
    }

    // ------------------------------------------
    // 9. BALLOON POP PHYSICS GAME (PAGE 5)
    // Mechanics: sine-wave float paths, dodge on 1st tap,
    // canvas particle burst on pop, last-balloon gold drama
    // ------------------------------------------
    function initBalloons() {
        const area       = document.getElementById("balloonArea");
        const wishesList = document.getElementById("poppedWishesList");
        const canvas     = document.getElementById("balloonCanvas");
        const countEl    = document.getElementById("balloonCount");
        const progressEl = document.getElementById("balloonProgress");
        const scoreLabel = document.getElementById("balloonScoreLabel");
        const lastHint   = document.getElementById("lastBalloonHint");
        const modal         = document.getElementById("balloonWishModal");
        const modalBackdrop = document.getElementById("wishModalBackdrop");
        const modalBadge    = document.getElementById("wishModalBadge");
        const modalPhotoWrap= document.getElementById("wishModalPhotoWrap");
        const modalPhoto    = document.getElementById("wishModalPhoto");
        const modalTitle    = document.getElementById("wishModalTitle");
        const modalText     = document.getElementById("wishModalText");
        const modalCloseBtn = document.getElementById("wishModalCloseBtn");
        if (!area || !wishesList) return;

        const wishes       = config.balloonWishes || [];
        const totalCount   = wishes.length;
        let   poppedCount  = 0;
        let   animId       = null;
        const states       = [];
        const particles    = [];

        area.innerHTML       = "";
        wishesList.innerHTML = "";

        function openWishModal(item, count, isFinal) {
            if (!modal) return;
            if (modalBadge) modalBadge.textContent = `🎈 Wish ${count} of ${totalCount} Unlocked!`;
            if (modalTitle) modalTitle.textContent = item.title || "Heartfelt Wish";
            if (modalText) modalText.textContent = item.wish || "";
            if (item.photo) {
                if (modalPhoto) modalPhoto.src = item.photo;
                if (modalPhotoWrap) modalPhotoWrap.classList.remove("hidden");
            } else {
                if (modalPhotoWrap) modalPhotoWrap.classList.add("hidden");
            }
            if (modalCloseBtn) {
                modalCloseBtn.textContent = isFinal ? "See All Wishes 🎂💖" : "Keep Popping 🎈💖";
            }
            modal.classList.remove("hidden");
            modal.setAttribute("aria-hidden", "false");
        }

        function closeWishModal() {
            if (!modal) return;
            modal.classList.add("hidden");
            modal.setAttribute("aria-hidden", "true");
        }

        if (modal) {
            modal.classList.add("hidden");
            modal.setAttribute("aria-hidden", "true");
        }
        if (modalCloseBtn) {
            modalCloseBtn.onclick = closeWishModal;
        }
        if (modalBackdrop) {
            modalBackdrop.onclick = closeWishModal;
        }

        // --- Canvas setup ---
        let ctx2d = null;
        if (canvas) {
            canvas.width  = area.offsetWidth  || 320;
            canvas.height = area.offsetHeight || 220;
            ctx2d = canvas.getContext("2d");
        }

        // --- Lighten hex color for radial gradient shine ---
        function lightenHex(hex) {
            const n = parseInt(hex.replace('#',''), 16);
            const r = Math.min(255, (n >> 16) + 70);
            const g = Math.min(255, ((n >> 8) & 0xff) + 70);
            const b = Math.min(255, (n & 0xff) + 70);
            return `rgb(${r},${g},${b})`;
        }

        // --- Build balloon DOM elements ---
        wishes.forEach((item, index) => {
            const wrapper = document.createElement("div");
            wrapper.className = "balloon-float-item";

            const body = document.createElement("div");
            body.className = "balloon-body-new";
            const base   = item.color || "#FF5E97";
            const light  = lightenHex(base);
            body.style.background = `radial-gradient(circle at 38% 35%, ${light}, ${base})`;

            const str = document.createElement("div");
            str.className = "balloon-string-new";

            wrapper.appendChild(body);
            wrapper.appendChild(str);
            area.appendChild(wrapper);

            // --- Physics state per balloon ---
            const aW = area.offsetWidth  || 320;
            const aH = area.offsetHeight || 220;
            const bW = 65; // approx balloon+string width
            const spacing = aW / (totalCount + 1);
            const startX  = spacing * (index + 1) - bW / 2;

            states.push({
                el:         wrapper,
                body:       body,
                x:          startX,
                y:          aH + index * 45,        // stagger start
                speed:      0.55 + Math.random() * 0.45,
                amplitude:  18  + Math.random() * 18,
                phase:      Math.random() * Math.PI * 2,
                phaseSpeed: 0.018 + Math.random() * 0.012,
                tapped:     false,
                popped:     false,
                dodgeX:     0,
                dodgeY:     0,
                color:      base,
                item:       item,
            });
        });

        // --- rAF animation loop ---
        function animate() {
            const aW = area.offsetWidth  || 320;
            const aH = area.offsetHeight || 220;

            // Draw particles
            if (ctx2d) {
                if (canvas.width !== aW)  canvas.width  = aW;
                if (canvas.height !== aH) canvas.height = aH;
                ctx2d.clearRect(0, 0, aW, aH);
                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    p.x  += p.vx;
                    p.y  += p.vy;
                    p.vy += 0.18;       // gravity
                    p.life -= 0.032;
                    if (p.life <= 0) { particles.splice(i, 1); continue; }
                    ctx2d.globalAlpha = Math.max(0, p.life);
                    ctx2d.fillStyle   = p.color;
                    ctx2d.beginPath();
                    ctx2d.arc(p.x, p.y, p.radius * Math.max(0, p.life), 0, Math.PI * 2);
                    ctx2d.fill();
                }
                ctx2d.globalAlpha = 1;
            }

            // Move balloons
            states.forEach(s => {
                if (s.popped) return;
                s.phase += s.phaseSpeed;
                s.y     -= s.speed;

                // Wrap from top back to bottom
                if (s.y < -90) {
                    s.y     = aH + 10;
                    s.x     = Math.random() * (aW - 70) + 5;
                    s.tapped = false;   // reset dodge on re-entry
                }

                const sx = Math.sin(s.phase) * s.amplitude;
                s.el.style.transform = `translate(${s.x + sx + s.dodgeX}px, ${s.y + s.dodgeY}px)`;

                // Ease dodge back to zero
                s.dodgeX *= 0.82;
                s.dodgeY *= 0.82;
            });

            animId = requestAnimationFrame(animate);
        }

        // Init positions
        states.forEach(s => {
            s.el.style.transform = `translate(${s.x}px, ${s.y}px)`;
        });
        animate();

        // --- Tap / click handling ---
        states.forEach(s => {
            let lastTouch = 0;

            function handleTap(e) {
                e.preventDefault();
                e.stopPropagation();
                if (s.popped) return;

                if (!s.tapped) {
                    // ---- FIRST TAP: DODGE ----
                    s.tapped  = true;
                    s.dodgeX  = (Math.random() < 0.5 ? -1 : 1) * (60 + Math.random() * 60);
                    s.dodgeY  = (Math.random() < 0.5 ? -1 : 1) * (30 + Math.random() * 30);
                    playWhooshSound();

                    // Wiggle body
                    s.body.style.animation = 'balloonWiggle 0.35s ease';
                    setTimeout(() => { s.body.style.animation = ''; }, 360);

                    // Show dodge tooltip
                    const tip = document.createElement('div');
                    tip.className = 'balloon-dodge-tip';
                    tip.textContent = 'Missed! Try again! 😝';
                    s.el.appendChild(tip);
                    setTimeout(() => tip.remove(), 1600);

                } else {
                    // ---- SECOND TAP: POP! ----
                    s.popped = true;

                    // Particle burst at balloon center
                    const rect     = s.el.getBoundingClientRect();
                    const areaRect = area.getBoundingClientRect();
                    const cx = rect.left - areaRect.left + rect.width  / 2;
                    const cy = rect.top  - areaRect.top  + rect.height / 2;
                    spawnParticles(cx, cy, s.color);

                    playPopSound();

                    // Pop scale-out animation
                    s.body.style.transition = 'transform 0.18s ease, opacity 0.18s ease';
                    s.body.style.transform  = 'scale(2)';
                    s.body.style.opacity    = '0';
                    const strEl = s.el.querySelector('.balloon-string-new');
                    if (strEl) { strEl.style.transition = 'opacity 0.18s'; strEl.style.opacity = '0'; }

                    setTimeout(() => {
                        s.el.style.display = 'none';
                        poppedCount++;
                        updateScore();

                        // Append interactive wish chip
                        const chip = document.createElement('button');
                        chip.type = 'button';
                        chip.className = 'wish-chip';
                        chip.innerHTML = `<span>🎈</span> <strong>Wish ${poppedCount}:</strong> ${s.item.title}`;
                        const capturedItem = s.item;
                        const capturedCount = poppedCount;
                        chip.addEventListener('click', (ev) => {
                            ev.stopPropagation();
                            openWishModal(capturedItem, capturedCount, poppedCount === totalCount);
                        });
                        wishesList.appendChild(chip);

                        // Pop up the full sweetheart modal
                        const isFinal = (poppedCount === totalCount);
                        openWishModal(s.item, poppedCount, isFinal);

                        if (poppedCount === totalCount) {
                            onAllPopped();
                        } else if (poppedCount === totalCount - 1) {
                            onLastBalloon();
                        }
                    }, 180);
                }
            }

            s.el.addEventListener('touchstart', (e) => {
                lastTouch = Date.now();
                handleTap(e);
            }, { passive: false });

            s.el.addEventListener('click', (e) => {
                if (Date.now() - lastTouch < 400) return; // debounce touch+click
                handleTap(e);
            });
        });

        // --- Score & progress update ---
        function updateScore() {
            if (countEl) countEl.textContent = poppedCount;
            if (scoreLabel) {
                scoreLabel.classList.remove('scored');
                void scoreLabel.offsetWidth; // reflow to retrigger animation
                scoreLabel.classList.add('scored');
            }
            if (progressEl) {
                progressEl.style.width = `${(poppedCount / totalCount) * 100}%`;
            }
        }

        // --- Last balloon drama ---
        function onLastBalloon() {
            if (lastHint) lastHint.classList.add('visible');
            const last = states.find(s => !s.popped);
            if (last) {
                last.speed     *= 1.85;
                last.amplitude *= 1.4;
                last.el.classList.add('last-balloon');
            }
        }

        // --- All popped — victory ---
        function onAllPopped() {
            if (lastHint) lastHint.classList.remove('visible');
            playFanfareSound();
            triggerConfetti();
            cancelAnimationFrame(animId);
            // Cat 2 victory reaction
            setTimeout(function() {
                if (window.catVictory) window.catVictory(6, 'YESSS! You caught every wish! 🎉😻');
            }, 300);
            setTimeout(() => {
                const victory = document.createElement('div');
                victory.className = 'all-wishes-completed-banner';
                victory.innerHTML = `
                    <div style="font-size:1.4rem; margin-bottom:3px;">🎊 🎈 💖</div>
                    <h3 style="color:#0a3d5e; font-size:0.95rem; margin:0 0 4px; font-weight:700;">All 5 Wishes Collected!</h3>
                    <p style="font-size:0.78rem; color:#143d5c; font-weight:500; margin:0;">Every wish from Hashini's heart belongs to you, Santhosh. Tap any wish above to read again! 🎂✨</p>
                `;
                wishesList.appendChild(victory);
            }, 600);
        }

        // --- Canvas particle burst ---
        function spawnParticles(cx, cy, color) {
            const count = 16;
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const speed = 3 + Math.random() * 4.5;
                particles.push({
                    x:      cx,
                    y:      cy,
                    vx:     Math.cos(angle) * speed,
                    vy:     Math.sin(angle) * speed - 2.5,
                    radius: 5 + Math.random() * 5,
                    color:  i % 2 === 0 ? color : '#FFD700',
                    life:   1.0,
                });
            }
        }
    }

    // ------------------------------------------
    // 10. LOVE & PARTNERSHIP QUIZ (PAGE 6)
    // ------------------------------------------
    function initQuiz() {
        const questions = config.quizQuestions || [];
        let currentQ = 0;
        let score = 0;

        const qText = document.getElementById("quizQuestionText");
        const optionsGrid = document.getElementById("quizOptions");
        const progress = document.getElementById("quizProgress");
        const feedback = document.getElementById("quizFeedback");

        function loadQuestion(idx) {
            if (!qText || !optionsGrid) return;
            if (feedback) feedback.classList.add("hidden");

            if (idx >= questions.length) {
                // Quiz Completed
                qText.textContent = "🎉 Love & Partnership Quiz Complete!";
                optionsGrid.innerHTML = `
                    <div class="wish-card text-center" style="padding:20px;">
                        <h3 style="color:var(--accent-gold); font-size:1.4rem;">Score: ${score} / ${questions.length} 👑</h3>
                        <p style="margin-top:8px;">You know me so well, my love! 💖✨</p>
                        <button id="toFinaleBtn" class="primary-btn glowing-btn" style="margin-top:14px; width:100%;">
                            <i class="fa-solid fa-cake-candles"></i> Enter Grand Birthday Finale 🎂✨
                        </button>
                    </div>
                `;
                if (progress) progress.style.width = "100%";
                triggerConfetti();

                const toFinale = document.getElementById("toFinaleBtn");
                if (toFinale) {
                    toFinale.addEventListener("click", () => {
                        showDoorTransition(11, 12);
                    });
                }
                return;
            }

            const item = questions[idx];
            qText.textContent = item.question;
            if (progress) progress.style.width = `${((idx + 1) / questions.length) * 100}%`;

            optionsGrid.innerHTML = "";
            item.options.forEach((optText, optIdx) => {
                const btn = document.createElement("button");
                btn.className = "quiz-option-btn";
                btn.textContent = optText;

                btn.addEventListener("click", () => {
                    const allBtns = optionsGrid.querySelectorAll(".quiz-option-btn");
                    allBtns.forEach((b) => (b.disabled = true));

                    if (optIdx === item.correctIndex) {
                        btn.classList.add("correct");
                        playSparkleSound();
                        score++;
                        if (feedback) {
                            feedback.textContent = item.message || "Correct! 💖";
                            feedback.style.color = "#2ecc71";
                            feedback.classList.remove("hidden");
                        }
                    } else {
                        btn.classList.add("wrong");
                        playPopSound();
                        if (feedback) {
                            feedback.textContent = "Oops! But I love you anyway! 💕";
                            feedback.style.color = "#e74c3c";
                            feedback.classList.remove("hidden");
                        }
                    }

                    setTimeout(() => {
                        currentQ++;
                        loadQuestion(currentQ);
                    }, 1400);
                });

                optionsGrid.appendChild(btn);
            });
        }

        loadQuestion(0);
    }

    // ------------------------------------------
    // 10. INTERACTIVE KITTY SHOWCASE (PAGE 7)
    // Tap Kitty 1 (Flower Cat) -> Switches to Kitty 2 (Party Joy Cat)
    // Tap Kitty 2 -> Switches back to Kitty 1
    // ------------------------------------------
    function initExpectationReality() {
        const cardExpectation = document.getElementById("evrExpectationCard");
        const cardReality     = document.getElementById("evrRealityCard");
        const cat6Box         = document.getElementById("cat6Box");
        const cat7Box         = document.getElementById("cat7Box");
        const evrStage        = document.getElementById("evrStage");

        if (!cardExpectation || !cardReality) return;

        function showKitty2() {
            playSparkleSound();
            playPopSound();
            triggerConfetti();

            if (evrStage) {
                evrStage.classList.add("screen-jiggle-effect");
                setTimeout(() => evrStage.classList.remove("screen-jiggle-effect"), 400);
            }

            cardExpectation.classList.add("hidden");
            cardExpectation.classList.remove("expectation-zoom-in");
            cardReality.classList.remove("hidden");
            cardReality.classList.add("reality-zoom-in");
        }

        function showKitty1() {
            playSparkleSound();
            playPopSound();

            cardReality.classList.add("hidden");
            cardReality.classList.remove("reality-zoom-in");
            cardExpectation.classList.remove("hidden");
            cardExpectation.classList.add("expectation-zoom-in");
        }

        if (cat6Box) {
            cat6Box.addEventListener("click", showKitty2);
        } else if (cardExpectation) {
            cardExpectation.addEventListener("click", showKitty2);
        }

        if (cat7Box) {
            cat7Box.addEventListener("click", showKitty1);
        } else if (cardReality) {
            cardReality.addEventListener("click", showKitty1);
        }
    }


    // ------------------------------------------
    // 11. HOLOGRAPHIC FOIL & COIN SCRATCH CARD (PAGE 8)
    // ------------------------------------------
    function initScratchCard() {
        const canvas = document.getElementById("scratchCanvas");
        const wrapper = document.getElementById("scratchCardWrapper");
        const coinCursor = document.getElementById("scratchCoinCursor");
        const particlesWrap = document.getElementById("scratchParticlesWrap");
        const revealedMsg = document.getElementById("scratchRevealedMsg");
        const resetBtn = document.getElementById("resetScratchBtn");

        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let isScratching = false;
        let isCleared = false;

        function drawCover() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Brushed Metallic Silver-Gold Holographic Gradient
            const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            grad.addColorStop(0.00, "#A6C1D6");
            grad.addColorStop(0.18, "#E9F2FA");
            grad.addColorStop(0.36, "#B4CDDF");
            grad.addColorStop(0.52, "#FFFFFF");
            grad.addColorStop(0.68, "#A9C6DB");
            grad.addColorStop(0.84, "#F0F6FC");
            grad.addColorStop(1.00, "#92B1C9");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 2. Holographic Rainbow Sheen (Diagonal soft sheen)
            const holoGrad = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
            holoGrad.addColorStop(0.15, "rgba(255, 182, 193, 0.22)");
            holoGrad.addColorStop(0.35, "rgba(255, 255, 224, 0.25)");
            holoGrad.addColorStop(0.50, "rgba(173, 216, 230, 0.28)");
            holoGrad.addColorStop(0.70, "rgba(221, 160, 221, 0.22)");
            holoGrad.addColorStop(0.85, "rgba(255, 215, 0, 0.22)");
            ctx.fillStyle = holoGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 3. Embedded Glitter Flake Specks (Metallic texture)
            for (let i = 0; i < 85; i++) {
                const gx = (i * 47) % canvas.width;
                const gy = (i * 71) % canvas.height;
                const gr = (i % 3 === 0) ? 1.5 : 1;
                ctx.fillStyle = (i % 2 === 0) ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 215, 0, 0.65)";
                ctx.beginPath();
                ctx.arc(gx, gy, gr, 0, Math.PI * 2);
                ctx.fill();
            }

            // 4. Ornate Dual Inner Border
            ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
            ctx.lineWidth = 2;
            ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

            ctx.strokeStyle = "rgba(37, 138, 168, 0.35)";
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
            ctx.setLineDash([]);

            // 5. Luxury Typography & Lottery Watermark
            // Top Badge
            ctx.fillStyle = "#144f6f";
            ctx.font = "900 13px Outfit, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("★ LUCKY IN LOVE LOTTERY ★", canvas.width / 2, 45);

            // Subtitle
            ctx.fillStyle = "#337a9e";
            ctx.font = "700 10.5px Outfit, sans-serif";
            ctx.fillText("SANTHOSH'S BIRTHDAY EDITION", canvas.width / 2, 65);

            // Central Call to Action (Embossed look)
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.font = "900 16px Outfit, sans-serif";
            ctx.fillText("🪙 SCRATCH WITH COIN 🪙", canvas.width / 2 + 1, canvas.height / 2 + 1);

            ctx.fillStyle = "#0c3b5e";
            ctx.font = "900 16px Outfit, sans-serif";
            ctx.fillText("🪙 SCRATCH WITH COIN 🪙", canvas.width / 2, canvas.height / 2);

            // Decorative Hearts & Stars
            ctx.fillStyle = "#c9184a";
            ctx.font = "13px sans-serif";
            ctx.fillText("💖 ✨ 🌸 ✨ 💖", canvas.width / 2, canvas.height / 2 + 30);

            // Bottom prize guarantee
            ctx.fillStyle = "#5285a6";
            ctx.font = "600 9.5px Outfit, sans-serif";
            ctx.fillText("PRIZE: UNCONDITIONAL LOVE FOREVER", canvas.width / 2, canvas.height - 28);
        }

        drawCover();

        function getCoords(e) {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: (clientX - rect.left) * (canvas.width / rect.width),
                y: (clientY - rect.top) * (canvas.height / rect.height),
                cssX: clientX - rect.left,
                cssY: clientY - rect.top
            };
        }

        function spawnFoilFlake(x, y) {
            if (!particlesWrap || Math.random() > 0.45) return;
            const flake = document.createElement("span");
            flake.className = "foil-flake";
            const flakes = ["✨", "💫", "🪙", "⭐", "🌸"];
            flake.textContent = flakes[Math.floor(Math.random() * flakes.length)];
            flake.style.left = `${x}px`;
            flake.style.top = `${y}px`;

            const angle = Math.random() * Math.PI * 2;
            const dist = 25 + Math.random() * 45;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist - 15;
            const rot = -180 + Math.random() * 360;
            const s = 0.6 + Math.random() * 0.5;

            flake.style.setProperty("--dx", `${dx}px`);
            flake.style.setProperty("--dy", `${dy}px`);
            flake.style.setProperty("--rot", `${rot}deg`);
            flake.style.setProperty("--s", s);

            particlesWrap.appendChild(flake);
            setTimeout(() => flake.remove(), 650);
        }

        function scratch(e) {
            if (!isScratching || isCleared) return;
            if (e.cancelable && e.type.startsWith("touch")) e.preventDefault();

            const { x, y, cssX, cssY } = getCoords(e);

            if (coinCursor) {
                coinCursor.style.left = `${cssX}px`;
                coinCursor.style.top = `${cssY}px`;
                coinCursor.classList.add("scratching", "visible");
            }

            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 24, 0, Math.PI * 2);
            ctx.fill();

            spawnFoilFlake(cssX, cssY);
            checkCleared();
        }

        function checkCleared() {
            if (isCleared) return;
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let clearPixels = 0;
            const totalPixels = imgData.data.length / 4;

            // Sample every 4th pixel for high performance
            for (let i = 3; i < imgData.data.length; i += 16) {
                if (imgData.data[i] === 0) clearPixels += 4;
            }

            const percentage = clearPixels / totalPixels;

            if (percentage > 0.40) {
                isCleared = true;
                if (coinCursor) coinCursor.classList.remove("visible", "scratching");

                playSparkleSound();
                playFanfareSound();
                triggerConfetti();

                canvas.classList.add("canvas-dissolve");
                setTimeout(() => {
                    canvas.style.display = "none";
                    if (revealedMsg) revealedMsg.classList.remove("hidden");
                }, 550);
            }
        }

        function updateCoinPos(e) {
            if (isCleared || !coinCursor) return;
            const { cssX, cssY } = getCoords(e);
            coinCursor.style.left = `${cssX}px`;
            coinCursor.style.top = `${cssY}px`;
            coinCursor.classList.add("visible");
        }

        if (wrapper) {
            wrapper.addEventListener("mouseenter", (e) => {
                if (!isCleared && coinCursor) {
                    coinCursor.classList.add("visible");
                    updateCoinPos(e);
                }
            });
            wrapper.addEventListener("mousemove", (e) => {
                if (!isCleared) updateCoinPos(e);
            });
            wrapper.addEventListener("mouseleave", () => {
                if (coinCursor) coinCursor.classList.remove("visible", "scratching");
                isScratching = false;
            });
        }

        canvas.addEventListener("mousedown", (e) => {
            if (isCleared) return;
            isScratching = true;
            scratch(e);
        });
        window.addEventListener("mouseup", () => {
            isScratching = false;
            if (coinCursor) coinCursor.classList.remove("scratching");
        });
        canvas.addEventListener("mousemove", scratch);

        canvas.addEventListener("touchstart", (e) => {
            if (isCleared) return;
            isScratching = true;
            if (coinCursor) coinCursor.classList.add("visible", "scratching");
            scratch(e);
        }, { passive: false });

        window.addEventListener("touchend", () => {
            isScratching = false;
            if (coinCursor) coinCursor.classList.remove("visible", "scratching");
        });
        canvas.addEventListener("touchmove", scratch, { passive: false });

        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                isCleared = false;
                canvas.classList.remove("canvas-dissolve");
                canvas.style.display = "block";
                ctx.globalCompositeOperation = "source-over";
                drawCover();
                if (revealedMsg) revealedMsg.classList.add("hidden");
                if (coinCursor) coinCursor.classList.remove("scratching");
            });
        }
    }

    // ------------------------------------------
    // 12. RETRO INSTANT CAMERA & DEVELOPING POLAROID (PAGE 9 - IDEA 2)
    // ------------------------------------------
    function initGallery() {
        const gallery = config.gallery || [];
        if (gallery.length === 0) return;
        let currentIdx = 0;

        const imgEl = document.getElementById("galleryImg");
        const capEl = document.getElementById("galleryCaption");
        const dateEl = document.getElementById("galleryDate");
        const prevBtn = document.getElementById("prevImgBtn");
        const nextBtn = document.getElementById("nextImgBtn");
        const cardContainer = document.getElementById("galleryContainer");
        const shutterBtn = document.getElementById("cameraShutterBtn");
        const flashBurst = document.getElementById("cameraFlashBurst");
        const developingHaze = document.getElementById("developingHaze");
        const dotsContainer = document.getElementById("cameraFilmDots");
        const loveBtn = document.getElementById("instantLoveBtn");
        const loveCount = document.getElementById("instantLoveCount");

        // Modal Elements (Lightbox)
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImg");
        const modalCap = document.getElementById("modalCaption");
        const closeModal = document.getElementById("closeModal");

        // Build film dots
        if (dotsContainer) {
            dotsContainer.innerHTML = "";
            gallery.forEach((_, idx) => {
                const dot = document.createElement("button");
                dot.className = "film-dot" + (idx === 0 ? " active" : "");
                dot.setAttribute("aria-label", "View memory " + (idx + 1));
                dot.addEventListener("click", () => {
                    if (idx !== currentIdx) {
                        currentIdx = idx;
                        snapMemory(currentIdx);
                    }
                });
                dotsContainer.appendChild(dot);
            });
        }

        function updateDots(activeIdx) {
            if (!dotsContainer) return;
            const dots = dotsContainer.querySelectorAll(".film-dot");
            dots.forEach((dot, idx) => {
                if (idx === activeIdx) {
                    dot.classList.add("active");
                } else {
                    dot.classList.remove("active");
                }
            });
        }

        function snapMemory(idx) {
            if (!gallery[idx]) return;
            const item = gallery[idx];

            // 1. Shutter sound & Camera Flash
            playCameraShutterSound();
            if (flashBurst) {
                flashBurst.classList.remove("flashing");
                void flashBurst.offsetWidth;
                flashBurst.classList.add("flashing");
            }

            // 2. Physical Polaroid Ejection Animation
            if (cardContainer) {
                cardContainer.classList.remove("ejecting");
                void cardContainer.offsetWidth;
                cardContainer.classList.add("ejecting");
            }

            // 3. Chemical Developing Effect
            if (imgEl) {
                imgEl.classList.remove("developed");
                imgEl.classList.add("developing-active");
                imgEl.src = item.image;
            }

            if (developingHaze) {
                developingHaze.classList.remove("hidden");
            }

            // 4. Update texts with soft delay
            if (capEl) capEl.textContent = item.caption;
            if (dateEl) dateEl.textContent = item.date;
            updateDots(idx);

            // 5. Complete chemical developing after 1.4s
            setTimeout(() => {
                if (imgEl) {
                    imgEl.classList.remove("developing-active");
                    imgEl.classList.add("developed");
                }
                if (developingHaze) {
                    developingHaze.classList.add("hidden");
                }
                playSparkleSound();
            }, 1400);
        }

        // Shutter Button
        if (shutterBtn) {
            shutterBtn.addEventListener("click", () => {
                currentIdx = (currentIdx + 1) % gallery.length;
                snapMemory(currentIdx);
            });
        }

        // Prev & Next Buttons
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                currentIdx = (currentIdx - 1 + gallery.length) % gallery.length;
                snapMemory(currentIdx);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                currentIdx = (currentIdx + 1) % gallery.length;
                snapMemory(currentIdx);
            });
        }

        // Heart / Love Button
        if (loveBtn && loveCount) {
            let count = 1;
            loveBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                count++;
                loveCount.textContent = count;
                playPopSound();
                loveBtn.style.transform = "scale(1.3) rotate(-8deg)";
                setTimeout(() => (loveBtn.style.transform = "scale(1)"), 200);

                // Floating mini heart
                const heart = document.createElement("span");
                heart.textContent = "💖";
                heart.style.position = "fixed";
                heart.style.left = e.clientX + "px";
                heart.style.top = e.clientY + "px";
                heart.style.fontSize = "1.2rem";
                heart.style.pointerEvents = "none";
                heart.style.zIndex = "9999";
                heart.style.transition = "transform 0.8s ease-out, opacity 0.8s ease-out";
                document.body.appendChild(heart);
                requestAnimationFrame(() => {
                    heart.style.transform = "translateY(-40px) scale(1.4)";
                    heart.style.opacity = "0";
                });
                setTimeout(() => heart.remove(), 850);
            });
        }

        // Image Lightbox
        if (imgEl && modal && modalImg) {
            imgEl.addEventListener("click", (e) => {
                e.stopPropagation();
                const item = gallery[currentIdx];
                if (item) {
                    modalImg.src = item.image;
                    if (modalCap) modalCap.textContent = item.caption;
                    modal.classList.remove("hidden");
                }
            });
        }

        if (closeModal && modal) {
            closeModal.addEventListener("click", () => modal.classList.add("hidden"));
            modal.addEventListener("click", (e) => {
                if (e.target === modal) modal.classList.add("hidden");
            });
        }

        // Initial render (already developed for first view)
        if (gallery[0]) {
            if (imgEl) {
                imgEl.src = gallery[0].image;
                imgEl.classList.add("developed");
            }
            if (capEl) capEl.textContent = gallery[0].caption;
            if (dateEl) dateEl.textContent = gallery[0].date;
            updateDots(0);
        }
    }

    // ------------------------------------------
    // 13. PASSCODE LETTER LOCK & REPLAY (PAGE 9) - CONCEPT C
    // ------------------------------------------
    function triggerLetterEmbers() {
        const container = document.getElementById("letterEmbersContainer");
        if (!container) return;
        container.innerHTML = "";

        const colors = [
            "rgba(255, 215, 0, 0.8)",
            "rgba(255, 175, 195, 0.75)",
            "rgba(255, 235, 150, 0.85)",
            "rgba(240, 160, 185, 0.7)",
            "rgba(255, 205, 110, 0.8)"
        ];

        for (let i = 0; i < 22; i++) {
            const ember = document.createElement("div");
            ember.className = "letter-ember";
            const size = Math.random() * 6 + 4;
            ember.style.width = size + "px";
            ember.style.height = size + "px";
            ember.style.left = Math.random() * 95 + "%";
            const color = colors[Math.floor(Math.random() * colors.length)];
            ember.style.backgroundColor = color;
            ember.style.boxShadow = `0 0 ${size * 2.2}px ${color}`;
            ember.style.animationDuration = (Math.random() * 2.5 + 3.5) + "s";
            ember.style.animationDelay = (Math.random() * 2.5) + "s";
            container.appendChild(ember);
        }
    }

    function initPasswordLock() {
        const unlockBtn = document.getElementById("unlockLetterBtn");
        const passInput = document.getElementById("letterPasswordInput");
        const errMsg = document.getElementById("passwordErrorMsg");
        const passHint = document.getElementById("passwordHint");
        const lockScreen = document.getElementById("letterLockScreen");
        const unlockedScreen = document.getElementById("letterUnlockedScreen");
        const letterBody = document.getElementById("letterBody");
        const restartBtn = document.getElementById("restartBtn");
        const letterTitle = document.getElementById("letterTitle");

        // Popup modal elements
        const letterModalPopup = document.getElementById("letterModalPopup");
        const closeLetterModalBtn = document.getElementById("closeLetterModalBtn");
        const letterModalBackdrop = document.getElementById("letterModalBackdrop");
        const reopenLetterBtn = document.getElementById("reopenLetterBtn");
        const openLocketInlineBtn = document.getElementById("openLocketInlineBtn");
        const openLocketBtn = document.getElementById("openLocketBtn");
        const backToLetterBtn = document.getElementById("backToLetterBtn");
        const heartLocket = document.getElementById("heartLocket");

        const targetPass = (config.letterPassword || "mylu").toLowerCase().trim();

        if (passHint && config.passwordHint) {
            passHint.textContent = config.passwordHint;
        }

        function openLetterModal() {
            if (letterModalPopup) {
                letterModalPopup.classList.remove("hidden");
                triggerLetterEmbers();
            }
        }

        function closeLetterModal() {
            if (letterModalPopup) {
                letterModalPopup.classList.add("hidden");
            }
        }

        if (unlockBtn && passInput) {
            const handleUnlock = () => {
                const entered = passInput.value.toLowerCase().trim();

                if (entered === targetPass || entered === "mylu" || entered === "santhosh" || entered === "sant" || entered === "hashini") {
                    playFanfareSound();
                    triggerConfetti();

                    if (errMsg) errMsg.classList.add("hidden");
                    if (lockScreen) lockScreen.classList.add("hidden");
                    if (unlockedScreen) unlockedScreen.classList.remove("hidden");

                    // Set romantic letter title if configured
                    if (letterTitle && config.letter && config.letter.title) {
                        letterTitle.textContent = config.letter.title;
                    }

                    // Stream Letter Text
                    const fullText = config.letter ? config.letter.content : "";
                    if (letterBody) {
                        letterBody.textContent = fullText;
                    }

                    // Open Letter as Popup Modal!
                    openLetterModal();

                    // Emotional companion reaction
                    const catBubble10 = document.getElementById("catBubble10");
                    const catCompanion10 = document.getElementById("catCompanion10");
                    if (catBubble10) {
                        catBubble10.textContent = "Grab some tissues... 🥹💖 Santhosh, she poured her whole heart into this.";
                        catBubble10.classList.add("visible");
                    }
                    if (catCompanion10) {
                        catCompanion10.classList.add("cat-wiggling");
                    }
                } else {
                    playPopSound();
                    if (errMsg) errMsg.classList.remove("hidden");
                    passInput.style.transform = "translateX(-10px)";
                    setTimeout(() => (passInput.style.transform = "translateX(10px)"), 100);
                    setTimeout(() => (passInput.style.transform = "translateX(0)"), 200);
                }
            };

            unlockBtn.addEventListener("click", handleUnlock);
            passInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") handleUnlock();
            });
        }

        // Close modal buttons
        if (closeLetterModalBtn) {
            closeLetterModalBtn.addEventListener("click", closeLetterModal);
        }
        if (letterModalBackdrop) {
            letterModalBackdrop.addEventListener("click", closeLetterModal);
        }

        // Reopen letter popup
        if (reopenLetterBtn) {
            reopenLetterBtn.addEventListener("click", () => {
                playSparkleSound();
                openLetterModal();
            });
        }

        // Open heart locket from inside modal CTA
        if (openLocketBtn && heartLocket) {
            openLocketBtn.addEventListener("click", () => {
                closeLetterModal();
                playSparkleSound();
                triggerConfetti();
                heartLocket.classList.remove("hidden");
                heartLocket.scrollIntoView({ behavior: "smooth", block: "center" });
            });
        }

        // Open heart locket from inline page button
        if (openLocketInlineBtn && heartLocket) {
            openLocketInlineBtn.addEventListener("click", () => {
                playSparkleSound();
                triggerConfetti();
                heartLocket.classList.remove("hidden");
                heartLocket.scrollIntoView({ behavior: "smooth", block: "center" });
            });
        }

        // Back to letter button from heart locket
        if (backToLetterBtn) {
            backToLetterBtn.addEventListener("click", () => {
                playSparkleSound();
                openLetterModal();
            });
        }

        if (restartBtn) {
            restartBtn.addEventListener("click", () => {
                closeLetterModal();
                if (heartLocket) heartLocket.classList.add("hidden");
                goToPage(0);
            });
        }
    }

    // ------------------------------------------
    // 16. CAT COMPANIONS SYSTEM (Pages 3,4,6,7,10)
    // Tap → wiggle + speech bubble (auto-dismiss 3.2s)
    // Game victory events → spin + gold glow + special msg
    // Flying kiss particles (cat on balloon page)
    // ------------------------------------------
    function initCatCompanions() {

        var catDefs = [
            { id: 'catCompanion3', bubbleId: 'catBubble3', anim: 'cat-wiggling',
              tapMsg: "Happy Birthday to my favourite human! 🎂 You deserve the whole world today! 💖" },
            { id: 'catCompanion4', bubbleId: 'catBubble4', anim: 'cat-bouncing',
              tapMsg: "Psst... tap the gift box! The best surprise is waiting inside! 🎁🌸" },
            { id: 'catCompanion6', bubbleId: 'catBubble6', anim: 'cat-wiggling', kiss: true,
              tapMsg: "Go go go! Pop them all! You have got this! 🎈💪" },
            { id: 'catCompanion7', bubbleId: 'catBubble7', anim: 'cat-wiggling',
              tapMsg: "I told you she couldn't keep a straight face! 😹🎉 Happy Birthday Santhosh!" },
            { id: 'catCompanion10', bubbleId: 'catBubble10', anim: 'cat-bouncing',
              tapMsg: "The password is the name of her favourite person in the world... 🔒💌" }
        ];

        catDefs.forEach(function(def) {
            var catEl    = document.getElementById(def.id);
            var bubbleEl = document.getElementById(def.bubbleId);
            if (!catEl) return;

            var bubbleTimer = null;
            var lastTouch   = 0;

            // Re-trigger entrance when page becomes visible
            var section = catEl.closest('section');
            if (section) {
                var obs = new MutationObserver(function(muts) {
                    muts.forEach(function(m) {
                        if (m.attributeName === 'class' && !section.classList.contains('hidden')) {
                            catEl.style.animation = 'none';
                            void catEl.offsetWidth;
                            catEl.style.animation = '';
                        }
                    });
                });
                obs.observe(section, { attributes: true });
            }

            function triggerCatAnim(animClass) {
                catEl.classList.remove('cat-wiggling', 'cat-bouncing', 'cat-spinning');
                void catEl.offsetWidth;
                catEl.classList.add(animClass);
                setTimeout(function() {
                    catEl.classList.remove(animClass);
                }, 750);
            }

            function showBubble(msg) {
                if (!bubbleEl) return;
                if (bubbleTimer) clearTimeout(bubbleTimer);
                bubbleEl.textContent = msg;
                bubbleEl.classList.add('visible');
                bubbleTimer = setTimeout(function() {
                    bubbleEl.classList.remove('visible');
                }, 3200);
            }

            function handleCatTap(e) {
                e.preventDefault();
                e.stopPropagation();
                playSparkleSound();
                triggerCatAnim(def.anim);
                if (def.kiss) spawnFlyingKiss(catEl);
                showBubble(def.tapMsg);
            }

            catEl.addEventListener('touchstart', function(e) {
                lastTouch = Date.now();
                handleCatTap(e);
            }, { passive: false });

            catEl.addEventListener('click', function(e) {
                if (Date.now() - lastTouch < 400) return;
                handleCatTap(e);
            });
        });

        // Flying kiss particles spawner (Page 5 cat)
        function spawnFlyingKiss(sourceEl) {
            var rect = sourceEl.getBoundingClientRect();
            var cx = rect.left + rect.width  / 2;
            var cy = rect.top  + rect.height / 2;
            for (var i = 0; i < 3; i++) {
                (function(delay) {
                    setTimeout(function() {
                        var kiss = document.createElement('div');
                        kiss.className = 'flying-kiss';
                        kiss.textContent = '💋';
                        kiss.style.left = cx + 'px';
                        kiss.style.top  = cy + 'px';
                        var tx  = (Math.random() - 0.5) * 130;
                        var ty  = -(55 + Math.random() * 90);
                        kiss.style.setProperty('--kx',  (tx * 0.45) + 'px');
                        kiss.style.setProperty('--ky',  (ty * 0.45) + 'px');
                        kiss.style.setProperty('--kx2', tx + 'px');
                        kiss.style.setProperty('--ky2', ty + 'px');
                        document.body.appendChild(kiss);
                        kiss.addEventListener('animationend', function() {
                            if (kiss.parentNode) kiss.parentNode.removeChild(kiss);
                        }, { once: true });
                    }, delay);
                })(i * 190);
            }
        }

        // Global victory trigger — called from game systems
        window.catVictory = function(pageNum, msg) {
            var catEl    = document.getElementById('catCompanion' + pageNum);
            var bubbleEl = document.getElementById('catBubble'    + pageNum);
            if (!catEl || !bubbleEl) return;
            catEl.classList.remove('cat-wiggling', 'cat-bouncing', 'cat-spinning', 'cat-glowing');
            void catEl.offsetWidth;
            catEl.classList.add('cat-spinning', 'cat-glowing');
            setTimeout(function() {
                catEl.classList.remove('cat-spinning');
            }, 850);
            bubbleEl.textContent = msg || '🎉 You did it! 😻';
            bubbleEl.classList.add('visible');
            setTimeout(function() {
                bubbleEl.classList.remove('visible');
            }, 4200);
        };
    }

    // ------------------------------------------
    // 17. GRAND FINALE ENGINE (PAGE 12)
    // ------------------------------------------
    function initFinalePage() {
        if (!config.finale) return;
        const badge = document.getElementById("finaleBadge");
        const title = document.getElementById("finaleTitle");
        const sub = document.getElementById("finaleSubtitle");
        const msg = document.getElementById("finaleMessage");
        const sig = document.getElementById("finaleSignature");
        const celebrateBtn = document.getElementById("celebrateAgainBtn");
        const replayBtn = document.getElementById("replayJourneyBtn");

        if (badge && config.finale.badge) badge.textContent = config.finale.badge;
        if (title && config.finale.title) title.textContent = config.finale.title;
        if (sub && config.finale.subtitle) sub.textContent = config.finale.subtitle;
        if (msg && config.finale.message) msg.textContent = config.finale.message;
        if (sig && config.finale.signature) sig.textContent = config.finale.signature;

        if (celebrateBtn) {
            celebrateBtn.addEventListener("click", () => {
                playFanfareSound();
                triggerConfetti();
            });
        }

        if (replayBtn) {
            replayBtn.addEventListener("click", () => {
                goToPage(0);
            });
        }
    }

    // ------------------------------------------
    // DOOR TRANSITION SYSTEM
    // Pattern 2 (Knock to Enter) + Pattern 4 (Typewriter Bridge)
    // Intercepts every forward Next-button click.
    // Going back always skips the door.
    // ------------------------------------------

    /**
     * typewriter(el, text, onComplete)
     * Types `text` into `el` character by character.
     * Stores the interval in _twTimer so it can be cancelled externally.
     */
    function typewriter(el, text, onComplete) {
        if (_twTimer) { clearInterval(_twTimer); _twTimer = null; }
        var i = 0;
        el.textContent = "";
        _twTimer = setInterval(function () {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(_twTimer);
                _twTimer = null;
                if (onComplete) setTimeout(onComplete, 300);
            }
        }, 28);
    }

    /**
     * showDoorTransition(fromPage, toPage)
     * Displays the full-screen door overlay with a personalised typewriter
     * bridge message (from config.pageTransitions[fromPage]).
     * After typing, the emoji hint + CTA button reveal.
     * Clicking the CTA triggers the burst animation then navigates to toPage.
     * Tapping anywhere on the overlay while typing completes it instantly.
     */
    function showDoorTransition(fromPage, toPage) {
        // Guard: if overlay isn't in DOM, fall back to direct navigation
        if (!doorOverlay || !doorCard) {
            goToPage(toPage);
            return;
        }

        // Fetch transition config, fall back to a generic one
        var transitions = (config && config.pageTransitions) ? config.pageTransitions : [];
        var tr = transitions[fromPage] || {
            chapter:   "Chapter " + toPage,
            bridgeMsg: "Something wonderful is waiting just ahead\u2026 \u2728",
            emoji:     "\u2728",
            hint:      "A Surprise Awaits",
            cta:       "Open Chapter " + toPage
        };

        // --- Stop any in-progress typewriter ---
        if (_twTimer) { clearInterval(_twTimer); _twTimer = null; }

        // --- Reset card to its initial hidden state ---
        doorCard.classList.remove("card-in", "card-burst");
        if (doorHint)     doorHint.classList.add("hidden");
        if (doorCursor)   doorCursor.classList.remove("hidden");
        if (doorTapHint)  doorTapHint.classList.remove("hidden-hint");
        if (doorTypeText) doorTypeText.textContent = "";

        // --- Populate content ---
        if (doorChapterPill) doorChapterPill.textContent = tr.chapter;
        if (doorHintEmoji) {
            var imgSrc = tr.image || (tr.emoji && (tr.emoji.endsWith('.png') || tr.emoji.endsWith('.jpg') || tr.emoji.includes('/')) ? tr.emoji : null);
            if (imgSrc) {
                doorHintEmoji.innerHTML = '<img src="' + imgSrc + '" alt="' + (tr.hint || 'Chapter Icon') + '" class="door-hint-img">';
            } else {
                doorHintEmoji.textContent = tr.emoji || '💖';
            }
        }
        if (doorHintLabel)   doorHintLabel.textContent   = tr.hint;

        // Clone the CTA button to remove any stale event listeners from
        // a previous transition, then update its label.
        var oldBtn = document.getElementById("doorKnockBtn");
        var activeKnockBtn = oldBtn;
        if (oldBtn && oldBtn.parentNode) {
            var freshBtn = oldBtn.cloneNode(true);
            oldBtn.parentNode.replaceChild(freshBtn, oldBtn);
            activeKnockBtn = freshBtn;
        }
        var knockSpan = activeKnockBtn ? activeKnockBtn.querySelector("span") : null;
        if (knockSpan) knockSpan.textContent = tr.cta;

        // --- Progress ribbon: fill proportionally to fromPage / totalPages ---
        var pct = Math.round((fromPage / totalPages) * 100);
        if (doorRibbonFill)  doorRibbonFill.style.width  = pct + "%";
        if (doorRibbonLabel) doorRibbonLabel.textContent = fromPage + " / " + totalPages;

        // --- Show overlay ---
        doorOverlay.classList.remove("hidden", "closing");
        void doorOverlay.offsetWidth; // force reflow
        doorOverlay.classList.add("visible");

        // --- Animate card in, then start typewriter ---
        setTimeout(function () {
            doorCard.classList.add("card-in");

            // Helper: complete the hint reveal
            function revealHint() {
                if (doorCursor)  doorCursor.classList.add("hidden");
                if (doorTapHint) doorTapHint.classList.add("hidden-hint");
                if (doorHint)    doorHint.classList.remove("hidden");
            }

            // Tap-to-skip: clicking the overlay instantly completes the typewriter.
            // We ignore clicks that land directly on the CTA button.
            function onOverlayTap(e) {
                if (activeKnockBtn && activeKnockBtn.contains(e.target)) return;
                if (_twTimer) {
                    clearInterval(_twTimer);
                    _twTimer = null;
                    if (doorTypeText) doorTypeText.textContent = tr.bridgeMsg;
                    revealHint();
                    doorOverlay.removeEventListener("click", onOverlayTap);
                }
            }
            doorOverlay.addEventListener("click", onOverlayTap);

            // Start typewriter
            typewriter(doorTypeText, tr.bridgeMsg, function () {
                doorOverlay.removeEventListener("click", onOverlayTap);
                revealHint();
            });

        }, 200);

        // --- CTA Knock button: burst animation → close overlay → navigate ---
        if (activeKnockBtn) {
            activeKnockBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                playSparkleSound();

                // Kill any pending typewriter
                if (_twTimer) { clearInterval(_twTimer); _twTimer = null; }

                // Burst the card upward
                doorCard.classList.remove("card-in");
                void doorCard.offsetWidth;
                doorCard.classList.add("card-burst");

                // After burst (400ms), fade overlay out then navigate
                setTimeout(function () {
                    doorOverlay.classList.remove("visible");
                    doorOverlay.classList.add("closing");
                    setTimeout(function () {
                        doorOverlay.classList.add("hidden");
                        doorOverlay.classList.remove("closing");
                        doorCard.classList.remove("card-burst", "card-in");
                        goToPage(toPage);
                    }, 320);
                }, 400);
            });
        }
    }

    // ------------------------------------------
    // 15. NAV CONTROLS AT BOTTOM
    // ------------------------------------------
    if (prevPageBtn) {
        prevPageBtn.addEventListener("click", () => {
            if (currentPage > 1) goToPage(currentPage - 1);
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener("click", () => {
            // Forward navigation always goes through the door transition
            if (currentPage < totalPages) showDoorTransition(currentPage, currentPage + 1);
        });
    }

    pageDots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const pageNum = parseInt(dot.getAttribute("data-page"));
            if (!isNaN(pageNum)) goToPage(pageNum);
        });
    });

    // Start App
    initDOM();
});
