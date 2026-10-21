// ==========================================
// ROSE SURPRISE APP - MULTI-PAGE ENGINE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const config = window.SURPRISE_CONFIG || {};

    let currentPage = 0;
    const totalPages = 10;

    // DOM Elements
    const musicToggle = document.getElementById("musicToggle");
    const bgAudio = document.getElementById("bgAudio");
    const bottomNav = document.getElementById("bottomNav");
    const prevPageBtn = document.getElementById("prevPageBtn");
    const nextPageBtn = document.getElementById("nextPageBtn");
    const mainFooter = document.getElementById("mainFooter");
    const pageDots = document.querySelectorAll(".dot");

    // ------------------------------------------
    // 1. POPULATE INITIAL DOM FROM CONFIG
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
            if (introSub) introSub.textContent = config.proposalSubtitle;
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

        // Audio Source
        if (bgAudio && config.audioUrl) {
            bgAudio.src = config.audioUrl;
        }

        // Password Hint
        const pwdHint = document.getElementById("passwordHint");
        if (pwdHint && config.passwordHint) {
            pwdHint.textContent = config.passwordHint;
        }

        // Features Init
        initCDPlayer();
        initBalloons();
        initQuiz();
        initRosesBouquet();
        initScratchCard();
        initGallery();
        initPasswordLock();
    }

    // ------------------------------------------
    // 2. PAGE NAVIGATION ENGINE
    // ------------------------------------------
    function goToPage(pageNumber) {
        if (pageNumber < 0 || pageNumber > totalPages) return;

        // Hide active screen
        const activeScreen = document.querySelector(".page-screen:not(.hidden)");
        if (activeScreen) {
            activeScreen.classList.add("hidden");
        }

        // Show target screen
        const targetScreen = document.getElementById(`page-${pageNumber}`);
        if (targetScreen) {
            targetScreen.classList.remove("hidden");
            targetScreen.style.animation = 'none';
            targetScreen.offsetHeight; /* trigger reflow */
            targetScreen.style.animation = 'slideInRight 0.4s ease-out forwards';
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
            prevPageBtn.disabled = (currentPage <= 1);
        }

        if (nextPageBtn) {
            if (currentPage === totalPages) {
                nextPageBtn.innerHTML = `Replay <i class="fa-solid fa-rotate-right"></i>`;
            } else {
                nextPageBtn.innerHTML = `Next <i class="fa-solid fa-arrow-right"></i>`;
            }
        }

        // Pagination Dots
        pageDots.forEach(dot => {
            const p = parseInt(dot.getAttribute("data-page"), 10);
            if (p === currentPage) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });

        // Trigger Page 4 CD Auto-play
        if (currentPage === 4) {
            playAudio();
            updateCDUI(true);
        }
    }

    if (prevPageBtn) {
        prevPageBtn.addEventListener("click", () => {
            if (currentPage > 1) goToPage(currentPage - 1);
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener("click", (e) => {
            spawnFloatingHearts(e.clientX, e.clientY, 6);
            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            } else {
                goToPage(1);
            }
        });
    }

    pageDots.forEach(dot => {
        dot.addEventListener("click", () => {
            const pageNum = parseInt(dot.getAttribute("data-page"), 10);
            if (pageNum) goToPage(pageNum);
        });
    });

    const startBtn = document.getElementById("startBtn");
    if (startBtn) {
        startBtn.addEventListener("click", (e) => {
            spawnFloatingHearts(e.clientX, e.clientY, 12);
            playAudio();
            goToPage(1);
        });
    }

    // Proposal Screen: "NO" button fleeing behavior (User can ONLY click YES)
    const noProposalBtn = document.getElementById("noProposalBtn");
    const noBtnHint = document.getElementById("noBtnHint");

    function evadeNoButton() {
        if (!noProposalBtn) return;

        const card = document.querySelector("#page-0 .intro-card");
        const cardRect = card ? card.getBoundingClientRect() : { width: 300, height: 400 };
        const btnRect = noProposalBtn.getBoundingClientRect();

        // Calculate random offsets ensuring NO button stays within card boundaries
        const maxX = Math.min((cardRect.width / 2) - (btnRect.width / 2) - 15, 120);
        const maxY = 90;

        const randomX = (Math.random() * (maxX * 2)) - maxX;
        const randomY = (Math.random() * (maxY * 2)) - maxY;

        noProposalBtn.style.position = "relative";
        noProposalBtn.style.transition = "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)";
        noProposalBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

        if (noBtnHint) {
            noBtnHint.classList.remove("hidden");
        }
    }

    if (noProposalBtn) {
        noProposalBtn.addEventListener("mouseover", evadeNoButton);
        noProposalBtn.addEventListener("mouseenter", evadeNoButton);
        noProposalBtn.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            evadeNoButton();
        });
        noProposalBtn.addEventListener("touchstart", (e) => {
            e.preventDefault();
            evadeNoButton();
        });
        noProposalBtn.addEventListener("click", (e) => {
            e.preventDefault();
            evadeNoButton();
        });
    }

    const restartBtn = document.getElementById("restartBtn");
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            goToPage(1);
        });
    }

    // ------------------------------------------
    // 3. AUDIO MANAGEMENT
    // ------------------------------------------
    let isPlayingAudio = false;

    function playAudio() {
        if (bgAudio && bgAudio.src) {
            bgAudio.play().then(() => {
                isPlayingAudio = true;
                if (musicToggle) musicToggle.classList.add("playing");
                updateCDUI(true);
            }).catch(err => {
                console.log("Audio autoplay waiting for user gesture:", err);
            });
        }
    }

    function pauseAudio() {
        if (bgAudio) {
            bgAudio.pause();
            isPlayingAudio = false;
            if (musicToggle) musicToggle.classList.remove("playing");
            updateCDUI(false);
        }
    }

    function toggleAudio() {
        if (isPlayingAudio) {
            pauseAudio();
        } else {
            playAudio();
        }
    }

    if (musicToggle) {
        musicToggle.addEventListener("click", toggleAudio);
    }

    // ------------------------------------------
    // 4. MUSIC CD PLAYER ENGINE (PAGE 3)
    // ------------------------------------------
    function initCDPlayer() {
        const cdPlayBtn = document.getElementById("cdPlayPauseBtn");
        if (cdPlayBtn) {
            cdPlayBtn.addEventListener("click", () => {
                toggleAudio();
            });
        }
    }

    function updateCDUI(isPlaying) {
        const cdDisc = document.getElementById("cdDisc");
        const cdIcon = document.getElementById("cdPlayIcon");
        const cdText = document.getElementById("cdPlayText");

        if (cdDisc) {
            if (isPlaying) {
                cdDisc.classList.add("spinning");
            } else {
                cdDisc.classList.remove("spinning");
            }
        }

        if (cdIcon && cdText) {
            if (isPlaying) {
                cdIcon.className = "fa-solid fa-pause";
                cdText.textContent = "Pause Custom Song";
            } else {
                cdIcon.className = "fa-solid fa-play";
                cdText.textContent = "Play Custom Song";
            }
        }
    }

    // ------------------------------------------
    // 5. COUNTDOWN TIMER
    // ------------------------------------------
    function updateCountdown() {
        if (!config.eventDate) return;
        const target = new Date(config.eventDate).getTime();
        const now = new Date().getTime();
        const diff = target - now;

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minsEl = document.getElementById("minutes");
        const secsEl = document.getElementById("seconds");

        if (diff <= 0) {
            if (daysEl) daysEl.textContent = "00";
            if (hoursEl) hoursEl.textContent = "00";
            if (minsEl) minsEl.textContent = "00";
            if (secsEl) secsEl.textContent = "00";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // ------------------------------------------
    // 6. GIFT UNBOXING
    // ------------------------------------------
    const giftBox = document.getElementById("giftBox");
    const giftRevealed = document.getElementById("giftRevealed");

    if (giftBox) {
        giftBox.addEventListener("click", (e) => {
            const rect = giftBox.getBoundingClientRect();
            spawnFloatingHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);

            giftBox.style.transform = "scale(1.2) rotate(10deg)";
            setTimeout(() => {
                giftBox.classList.add("hidden");
                if (giftRevealed) giftRevealed.classList.remove("hidden");
            }, 350);
        });
    }

    // ------------------------------------------
    // 7. PAGE 4: BALLOON POPPING ENGINE
    // ------------------------------------------
    function initBalloons() {
        const balloonArea = document.getElementById("balloonArea");
        const poppedWishesList = document.getElementById("poppedWishesList");
        if (!balloonArea || !config.balloonWishes) return;

        balloonArea.innerHTML = "";
        poppedWishesList.innerHTML = "";

        config.balloonWishes.forEach(item => {
            const balloon = document.createElement("div");
            balloon.className = "balloon-item";
            balloon.style.background = item.color;
            balloon.textContent = "🎈";

            balloon.addEventListener("click", (e) => {
                spawnFloatingHearts(e.clientX, e.clientY, 12);
                
                balloon.style.transform = "scale(1.5)";
                balloon.style.opacity = "0";
                setTimeout(() => {
                    balloon.style.display = "none";
                }, 200);

                const card = document.createElement("div");
                card.className = "popped-wish-card";
                card.innerHTML = `
                    <h4>${item.title}</h4>
                    <p>${item.wish}</p>
                `;
                poppedWishesList.prepend(card);
            });

            balloonArea.appendChild(balloon);
        });
    }

    // ------------------------------------------
    // 8. PAGE 5: ROMANTIC LOVE QUIZ ENGINE
    // ------------------------------------------
    let currentQuizIdx = 0;

    function initQuiz() {
        if (!config.quizQuestions || !config.quizQuestions.length) return;
        renderQuizQuestion(0);
    }

    function renderQuizQuestion(idx) {
        const q = config.quizQuestions[idx];
        if (!q) return;

        currentQuizIdx = idx;

        const questionTitle = document.getElementById("quizQuestionText");
        const optionsGrid = document.getElementById("quizOptions");
        const feedback = document.getElementById("quizFeedback");
        const progressBar = document.getElementById("quizProgress");

        if (questionTitle) questionTitle.textContent = q.question;
        if (progressBar) progressBar.style.width = `${((idx + 1) / config.quizQuestions.length) * 100}%`;
        if (feedback) feedback.classList.add("hidden");

        if (optionsGrid) {
            optionsGrid.innerHTML = "";
            q.options.forEach((optText, optIdx) => {
                const btn = document.createElement("button");
                btn.className = "option-btn";
                btn.textContent = optText;

                btn.addEventListener("click", (e) => {
                    spawnFloatingHearts(e.clientX, e.clientY, 8);
                    
                    document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
                    btn.classList.add("selected");

                    if (feedback) {
                        feedback.textContent = q.message || "Correct! My heart is all yours! ❤️";
                        feedback.classList.remove("hidden");
                    }

                    setTimeout(() => {
                        if (currentQuizIdx + 1 < config.quizQuestions.length) {
                            renderQuizQuestion(currentQuizIdx + 1);
                        }
                    }, 1800);
                });

                optionsGrid.appendChild(btn);
            });
        }
    }

    // ------------------------------------------
    // 9. PAGE 6: 5 ROSES BOUQUET COLLECTOR ENGINE
    // ------------------------------------------
    let collectedRosesCount = 0;

    function initRosesBouquet() {
        const garden = document.getElementById("roseGarden");
        const bouquetRoses = document.getElementById("bouquetRoses");
        const vowText = document.getElementById("bouquetVowText");
        if (!garden || !config.roses) return;

        garden.innerHTML = "";
        bouquetRoses.innerHTML = `<span class="bouquet-placeholder-text">Tap the 5 roses above to bundle your bouquet ❤️</span>`;
        if (vowText) vowText.classList.add("hidden");
        collectedRosesCount = 0;

        config.roses.forEach((roseItem, index) => {
            const roseBtn = document.createElement("div");
            roseBtn.className = "rose-item";
            roseBtn.innerHTML = `<img src="images/rose.png" alt="${roseItem.title}" class="rose-img">`;

            roseBtn.addEventListener("click", (e) => {
                if (roseBtn.classList.contains("collected")) return;

                spawnFloatingHearts(e.clientX, e.clientY, 10);
                roseBtn.classList.add("collected");
                collectedRosesCount++;

                if (collectedRosesCount === 1) {
                    bouquetRoses.innerHTML = "";
                }

                const gatheredRose = document.createElement("span");
                gatheredRose.className = "gathered-rose-item";
                gatheredRose.innerHTML = `<img src="images/rose.png" alt="Rose" class="gathered-rose-img">`;
                gatheredRose.style.animation = "scaleUp 0.4s ease";
                bouquetRoses.appendChild(gatheredRose);

                if (vowText) {
                    vowText.textContent = `${roseItem.title}: "${roseItem.vow}"`;
                    vowText.classList.remove("hidden");
                }

                if (collectedRosesCount === 5) {
                    setTimeout(() => {
                        bouquetRoses.innerHTML = `<img src="images/rose_bouquet.png" alt="Bouquet of Love" class="bouquet-final-img">`;
                        if (vowText) {
                            vowText.textContent = "🎉 Your Bouquet of Infinite Love is Complete! 💐❤️ I give you my whole heart forever!";
                        }
                    }, 600);
                }
            });

            garden.appendChild(roseBtn);
        });
    }

    // ------------------------------------------
    // 10. PAGE 7: SCRATCH CARD ENGINE (REVEAL AFTER 3 SCRATCHES)
    // ------------------------------------------
    let scratchCount = 0;
    let isScratching = false;

    function initScratchCard() {
        const canvas = document.getElementById("scratchCanvas");
        const msgContainer = document.getElementById("scratchRevealedMsg");
        const resetBtn = document.getElementById("resetScratchBtn");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        function drawOverlay() {
            scratchCount = 0;
            if (msgContainer) msgContainer.classList.add("hidden");

            ctx.globalCompositeOperation = "source-over";

            // Multi-stop Rich Metallic Golden Gradient
            const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            grad.addColorStop(0, "#d4af37");   // Metallic Gold
            grad.addColorStop(0.25, "#fff2a3"); // Bright Gold Highlight Sheen
            grad.addColorStop(0.5, "#e6b800");  // Rich Golden Yellow
            grad.addColorStop(0.75, "#b8860b"); // Dark Goldenrod Shadow
            grad.addColorStop(1, "#f3e5ab");   // Warm Gold Finish

            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Gold Foil Metallic Diagonal Sheen Stripes
            ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
            for (let x = -canvas.height; x < canvas.width + canvas.height; x += 16) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x + 12, 0);
                ctx.lineTo(x + 12 - canvas.height, canvas.height);
                ctx.lineTo(x - canvas.height, canvas.height);
                ctx.closePath();
                ctx.fill();
            }

            // Gold Glitter / Sparkle Particles
            ctx.fillStyle = "rgba(255, 215, 0, 0.4)";
            for (let i = 0; i < 45; i++) {
                const rx = Math.random() * canvas.width;
                const ry = Math.random() * canvas.height;
                ctx.fillRect(rx, ry, 2.5, 2.5);
            }

            // Inner Gold Ticket Border Frame
            ctx.strokeStyle = "rgba(139, 90, 0, 0.45)";
            ctx.lineWidth = 3;
            ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

            ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
            ctx.lineWidth = 1;
            ctx.strokeRect(11, 11, canvas.width - 22, canvas.height - 22);

            // Bold Golden Ticket Text Prompts
            ctx.fillStyle = "#3d1300";
            ctx.font = "bold 15px 'Outfit', 'Baloo Thambi 2', 'Catamaran', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("🪙 LUCKY GOLDEN SCRATCH 🪙", canvas.width / 2, canvas.height / 2 - 8);

            ctx.fillStyle = "#5c1d00";
            ctx.font = "600 12px 'Poppins', 'Mukta Malar', 'Catamaran', sans-serif";
            ctx.fillText("Scratch 3 times to reveal photo! ✨", canvas.width / 2, canvas.height / 2 + 14);
        }

        drawOverlay();

        function scratch(x, y) {
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 28, 0, Math.PI * 2);
            ctx.fill();
        }

        function handleStart(e) {
            isScratching = true;
            scratchCount++;
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            scratch(clientX - rect.left, clientY - rect.top);
            checkScratchThreshold(clientX, clientY);
        }

        function handleMove(e) {
            if (!isScratching) return;
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            scratch(clientX - rect.left, clientY - rect.top);
        }

        function handleEnd() {
            isScratching = false;
        }

        function checkScratchThreshold(x, y) {
            // After 3 scratch interactions, reveal the whole photo!
            if (scratchCount >= 3) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                spawnFloatingHearts(x, y, 15);
                if (msgContainer) msgContainer.classList.remove("hidden");
            }
        }

        canvas.addEventListener("mousedown", handleStart);
        canvas.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleEnd);

        canvas.addEventListener("touchstart", handleStart, { passive: true });
        canvas.addEventListener("touchmove", handleMove, { passive: true });
        window.addEventListener("touchend", handleEnd);

        if (resetBtn) {
            resetBtn.addEventListener("click", drawOverlay);
        }
    }

    // ------------------------------------------
    // 11. PAGE 8: MEMORY GALLERY CAROUSEL (6 PHOTOS)
    // ------------------------------------------
    let currentGalleryIdx = 0;

    function initGallery() {
        if (!config.gallery || !config.gallery.length) return;
        renderGalleryItem(0);

        const prevBtn = document.getElementById("prevImgBtn");
        const nextBtn = document.getElementById("nextImgBtn");

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                currentGalleryIdx = (currentGalleryIdx - 1 + config.gallery.length) % config.gallery.length;
                renderGalleryItem(currentGalleryIdx);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                currentGalleryIdx = (currentGalleryIdx + 1) % config.gallery.length;
                renderGalleryItem(currentGalleryIdx);
            });
        }
    }

    function renderGalleryItem(index) {
        const item = config.gallery[index];
        if (!item) return;

        const img = document.getElementById("galleryImg");
        const caption = document.getElementById("galleryCaption");
        const date = document.getElementById("galleryDate");

        if (img) img.src = item.image;
        if (caption) caption.textContent = item.caption;
        if (date) date.textContent = `${item.date} (${index + 1} of ${config.gallery.length})`;
    }

    // ------------------------------------------
    // 12. PAGE 9: PASSWORD-PROTECTED SECRET LETTER
    // ------------------------------------------
    function initPasswordLock() {
        const unlockBtn = document.getElementById("unlockLetterBtn");
        const pwdInput = document.getElementById("letterPasswordInput");
        const errorMsg = document.getElementById("passwordErrorMsg");

        function handleUnlock() {
            const val = pwdInput ? pwdInput.value.trim() : "";
            const correctPass = (config.letterPassword || "1234").trim();

            if (val === correctPass || val.toUpperCase() === "LOVE" || val === "1234") {
                if (errorMsg) errorMsg.classList.add("hidden");
                unlockLetterContent();
            } else {
                if (errorMsg) errorMsg.classList.remove("hidden");
                if (pwdInput) {
                    pwdInput.style.transform = "translateX(6px)";
                    setTimeout(() => pwdInput.style.transform = "translateX(-6px)", 100);
                    setTimeout(() => pwdInput.style.transform = "none", 200);
                }
            }
        }

        if (unlockBtn) unlockBtn.addEventListener("click", handleUnlock);
        if (pwdInput) {
            pwdInput.addEventListener("keyup", (e) => {
                if (e.key === "Enter") handleUnlock();
            });
        }
    }

    function unlockLetterContent() {
        const lockScreen = document.getElementById("letterLockScreen");
        const unlockedScreen = document.getElementById("letterUnlockedScreen");
        const letterBody = document.getElementById("letterBody");

        if (lockScreen) lockScreen.classList.add("hidden");
        if (unlockedScreen) unlockedScreen.classList.remove("hidden");

        if (config.letter && letterBody) {
            typewriterText(config.letter.content, letterBody);
        }
    }

    function typewriterText(text, container) {
        container.textContent = "";
        let i = 0;
        const speed = 25;
        function type() {
            if (i < text.length) {
                container.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // ------------------------------------------
    // 13. CLICK TAP HEART SPARKLE BURST
    // ------------------------------------------
    function spawnFloatingHearts(x, y, count = 8) {
        const icons = ["🌹", "💖", "❤️", "✨", "🌸", "🎶", "🪙", "💕"];
        for (let i = 0; i < count; i++) {
            const heart = document.createElement("div");
            heart.textContent = icons[Math.floor(Math.random() * icons.length)];
            heart.style.position = "fixed";
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.fontSize = `${Math.random() * 18 + 16}px`;
            heart.style.pointerEvents = "none";
            heart.style.zIndex = "999";
            heart.style.transition = "all 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
            document.body.appendChild(heart);

            const destX = x + (Math.random() * 160 - 80);
            const destY = y - (Math.random() * 150 + 50);

            requestAnimationFrame(() => {
                heart.style.transform = `translate(${destX - x}px, ${destY - y}px) scale(1.3)`;
                heart.style.opacity = "0";
            });

            setTimeout(() => {
                heart.remove();
            }, 1200);
        }
    }

    document.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON" && !e.target.closest("button") && e.target.tagName !== "INPUT" && e.target.tagName !== "CANVAS") {
            spawnFloatingHearts(e.clientX, e.clientY, 4);
        }
    });

    // Run DOM Initialization
    initDOM();
});
