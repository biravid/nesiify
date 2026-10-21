/**
 * ====================================================================
 * BOYFRIEND DAY SURPRISE - INTERACTIVE JAVASCRIPT ENGINE
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Home Page
  const homeView = document.getElementById('google-homepage');
  const homeSearchInput = document.getElementById('home-search-input');
  const homeSearchPill = document.getElementById('home-search-pill');
  const homeSearchClear = document.getElementById('home-search-clear');
  const suggestionsBox = document.getElementById('home-suggestions');
  const suggestionsUl = document.getElementById('suggestions-ul');
  const chipAiMode = document.getElementById('chip-ai-mode');
  const chipCreateImages = document.getElementById('chip-create-images');

  // DOM Elements - Results Page
  const resultsView = document.getElementById('google-results-page');
  const resultsLogoBack = document.getElementById('results-logo-back');
  const resultsSearchInput = document.getElementById('results-search-input');
  const resultsClearBtn = document.getElementById('results-clear-btn');
  const btnResultsSearch = document.getElementById('btn-results-search');
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const tabMore = document.getElementById('tab-more');
  const moreDropdown = document.getElementById('more-dropdown-menu');

  // DOM Elements - Modals & Lightbox
  const lightboxModal = document.getElementById('image-lightbox-modal');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxRes = document.getElementById('lightbox-res');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxSurpriseBtn = document.getElementById('lightbox-surprise-btn');

  const videoModal = document.getElementById('video-player-modal');
  const videoModalClose = document.getElementById('btn-video-modal-close');
  const videoBackdrop = document.getElementById('video-modal-close-backdrop');
  const videoScreenImg = document.getElementById('video-screen-img');
  const videoModalTitle = document.getElementById('video-modal-title');
  const videoModalMeta = document.getElementById('video-modal-meta');
  const videoModalDesc = document.getElementById('video-modal-desc');
  const btnVideoToSurprise = document.getElementById('btn-video-to-surprise');

  const newsModal = document.getElementById('news-reader-modal');
  const newsModalClose = document.getElementById('btn-news-modal-close');
  const newsBackdrop = document.getElementById('news-modal-close-backdrop');
  const newsBadge = document.getElementById('news-modal-badge');
  const newsHeadline = document.getElementById('news-modal-headline');
  const newsByline = document.getElementById('news-modal-byline');
  const newsImg = document.getElementById('news-modal-img');
  const newsBody = document.getElementById('news-modal-body');
  const btnNewsToSurprise = document.getElementById('btn-news-to-surprise');

  // DOM Elements - Surprise View
  const surpriseView = document.getElementById('surprise-experience');
  const btnBackToSearch = document.getElementById('btn-back-to-search');
  const btnToggleMusic = document.getElementById('btn-toggle-music');
  const musicStatusText = document.getElementById('music-status-text');
  const musicIconSpan = document.getElementById('music-icon-span');
  const envelopeBox = document.getElementById('envelope-box');
  const letterPaper = document.getElementById('letter-paper');
  const btnFoldLetter = document.getElementById('btn-fold-letter');
  const giftBoxTrigger = document.getElementById('gift-box-trigger');
  const btnCelebrateBurst = document.getElementById('btn-celebrate-burst');
  const confettiCanvas = document.getElementById('confetti-canvas');

  // Surprise Open Triggers
  const openSurpriseButtons = [
    document.getElementById('btn-open-surprise-banner'),
    document.getElementById('btn-open-surprise-main'),
    document.getElementById('kp-open-link')
  ];

  let selectedSuggestionIndex = -1;
  let currentSuggestions = [];

  // ====================================================================
  // 1. INITIALIZE CONTENT FROM CONFIG
  // ====================================================================
  function initContent() {
    // Populate Featured Images from config
    const thumb1 = document.getElementById('organic-thumb-1');
    const kpImg = document.getElementById('kp-img');
    const surpriseSpotlight = document.getElementById('surprise-spotlight-img');
    const videoScreenImg = document.getElementById('video-screen-img');
    const boyfriendName = document.getElementById('surprise-boyfriend-name');

    if (SURPRISE_CONFIG.featuredImages) {
      if (thumb1 && SURPRISE_CONFIG.featuredImages.searchResultThumbnail) {
        thumb1.src = SURPRISE_CONFIG.featuredImages.searchResultThumbnail;
      }
      if (kpImg && SURPRISE_CONFIG.featuredImages.knowledgePanelImage) {
        kpImg.src = SURPRISE_CONFIG.featuredImages.knowledgePanelImage;
      }
      if (surpriseSpotlight && SURPRISE_CONFIG.featuredImages.heroSpotlightImage) {
        surpriseSpotlight.src = SURPRISE_CONFIG.featuredImages.heroSpotlightImage;
      }
      if (videoScreenImg && SURPRISE_CONFIG.featuredImages.videoPlayerDefaultImage) {
        videoScreenImg.src = SURPRISE_CONFIG.featuredImages.videoPlayerDefaultImage;
      }
    } else if (SURPRISE_CONFIG.photos && SURPRISE_CONFIG.photos.length > 0) {
      if (thumb1) thumb1.src = SURPRISE_CONFIG.photos[0].url;
      if (kpImg) kpImg.src = SURPRISE_CONFIG.photos[1]?.url || SURPRISE_CONFIG.photos[0].url;
      if (surpriseSpotlight) surpriseSpotlight.src = SURPRISE_CONFIG.photos[0].url;
    }

    if (boyfriendName && SURPRISE_CONFIG.boyfriend) {
      boyfriendName.textContent = SURPRISE_CONFIG.boyfriend.nickname 
        ? `${SURPRISE_CONFIG.boyfriend.nickname} (${SURPRISE_CONFIG.boyfriend.title})`
        : SURPRISE_CONFIG.boyfriend.title;

      if (SURPRISE_CONFIG.boyfriend.avatarLetter) {
        document.querySelectorAll('.avatar-letter').forEach(el => {
          el.textContent = SURPRISE_CONFIG.boyfriend.avatarLetter;
        });
      }
    }

    // Populate Images Grid
    renderImagesGrid('all');

    // Populate Videos List
    renderVideosList();

    // Populate News List
    renderNewsList();

    // Populate Surprise Reasons
    renderSurpriseReasons();

    // Populate Surprise Memories
    renderSurpriseMemories();

    // Populate Letter
    renderLetter();

    // Spawn floating background decorations
    createFloatingDecorations();
  }

  // ====================================================================
  // 2. SEARCH SUGGESTIONS & AUTOCOMPLETE
  // ====================================================================
  function updateSuggestions(query) {
    const clean = query.trim().toLowerCase();
    const suggestions = SURPRISE_CONFIG.searchSuggestions;

    if (!clean) {
      // Default suggested list
      currentSuggestions = suggestions.slice(0, 5);
    } else {
      // Filter matching or related suggestions
      currentSuggestions = suggestions.filter(s => s.toLowerCase().includes(clean));
      if (currentSuggestions.length === 0) {
        currentSuggestions = [
          clean,
          `who is the best boyfriend`,
          `why is he the best boyfriend`
        ];
      }
    }

    renderSuggestionsDropdown(clean);
  }

  function renderSuggestionsDropdown(query) {
    suggestionsUl.innerHTML = '';
    selectedSuggestionIndex = -1;

    if (currentSuggestions.length === 0) {
      suggestionsBox.classList.add('hidden');
      homeSearchPill.classList.remove('has-suggestions');
      return;
    }

    currentSuggestions.forEach((itemText, index) => {
      const li = document.createElement('li');
      li.className = 'suggestion-item';
      li.setAttribute('data-index', index);

      // Highlight query match
      let displayHtml = itemText;
      if (query && itemText.toLowerCase().includes(query)) {
        const regex = new RegExp(`(${query})`, 'gi');
        displayHtml = itemText.replace(regex, '<strong>$1</strong>');
      }

      li.innerHTML = `
        <span class="suggestion-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </span>
        <span class="suggestion-text">${displayHtml}</span>
      `;

      li.addEventListener('click', () => {
        executeSearch(itemText);
      });

      suggestionsUl.appendChild(li);
    });

    suggestionsBox.classList.remove('hidden');
    homeSearchPill.classList.add('has-suggestions');
  }

  function hideSuggestions() {
    suggestionsBox.classList.add('hidden');
    homeSearchPill.classList.remove('has-suggestions');
  }

  // Home search input listeners
  homeSearchInput.addEventListener('focus', () => {
    homeSearchPill.classList.add('focused');
    updateSuggestions(homeSearchInput.value);
  });

  homeSearchInput.addEventListener('input', () => {
    const val = homeSearchInput.value;
    if (val.length > 0) {
      homeSearchClear.classList.remove('hidden');
    } else {
      homeSearchClear.classList.add('hidden');
    }
    updateSuggestions(val);
  });

  homeSearchClear.addEventListener('click', (e) => {
    e.stopPropagation();
    homeSearchInput.value = '';
    homeSearchClear.classList.add('hidden');
    homeSearchInput.focus();
    updateSuggestions('');
  });

  // Keyboard navigation inside search suggestions
  homeSearchInput.addEventListener('keydown', (e) => {
    const items = suggestionsUl.querySelectorAll('.suggestion-item');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (items.length > 0) {
        selectedSuggestionIndex = (selectedSuggestionIndex + 1) % items.length;
        highlightSuggestion(items);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (items.length > 0) {
        selectedSuggestionIndex = (selectedSuggestionIndex - 1 + items.length) % items.length;
        highlightSuggestion(items);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSuggestionIndex >= 0 && currentSuggestions[selectedSuggestionIndex]) {
        executeSearch(currentSuggestions[selectedSuggestionIndex]);
      } else {
        const query = homeSearchInput.value.trim() || "who is the best boyfriend";
        executeSearch(query);
      }
    } else if (e.key === 'Escape') {
      hideSuggestions();
    }
  });

  function highlightSuggestion(items) {
    items.forEach((item, idx) => {
      if (idx === selectedSuggestionIndex) {
        item.classList.add('selected');
        homeSearchInput.value = currentSuggestions[idx];
      } else {
        item.classList.remove('selected');
      }
    });
  }

  // Close suggestions if clicked outside
  document.addEventListener('click', (e) => {
    if (!homeSearchPill.contains(e.target) && !suggestionsBox.contains(e.target)) {
      hideSuggestions();
      homeSearchPill.classList.remove('focused');
    }
    // Also close more dropdown if open
    if (!tabMore.contains(e.target) && !moreDropdown.contains(e.target)) {
      moreDropdown.classList.add('hidden');
    }
  });

  // Feature Prompt Chips click
  chipAiMode.addEventListener('click', () => {
    executeSearch("who is the best boyfriend");
  });

  chipCreateImages.addEventListener('click', () => {
    executeSearch("who is the best boyfriend");
    switchTab('images');
  });

  // ====================================================================
  // 3. TRANSITION TO GOOGLE SEARCH RESULTS
  // ====================================================================
  function executeSearch(query = "who is the best boyfriend") {
    hideSuggestions();
    homeSearchInput.blur();

    // Sync input values
    resultsSearchInput.value = query;

    // Smooth transition
    homeView.style.opacity = '0';
    homeView.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      homeView.classList.add('hidden');
      homeView.classList.remove('active');

      resultsView.classList.remove('hidden');
      resultsView.classList.add('active');
      window.scrollTo(0, 0);

      // Default to All tab
      switchTab('all');
    }, 280);
  }

  // Back to home from results logo
  resultsLogoBack.addEventListener('click', () => {
    resultsView.classList.add('hidden');
    resultsView.classList.remove('active');

    homeView.classList.remove('hidden');
    homeView.classList.add('active');
    homeView.style.opacity = '1';
    homeView.style.transform = 'translateY(0)';
    homeSearchInput.value = '';
    homeSearchClear.classList.add('hidden');
  });

  // Results search input handlers
  resultsClearBtn.addEventListener('click', () => {
    resultsSearchInput.value = '';
    resultsSearchInput.focus();
  });

  btnResultsSearch.addEventListener('click', () => {
    // Refresh search
    switchTab('all');
  });

  resultsSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      switchTab('all');
    }
  });

  // ====================================================================
  // 4. TAB NAVIGATION (All, Images, Videos, News, More)
  // ====================================================================
  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const tabName = tab.getAttribute('data-tab');

      if (tabName === 'more') {
        e.stopPropagation();
        moreDropdown.classList.toggle('hidden');
        return;
      }

      moreDropdown.classList.add('hidden');
      switchTab(tabName);
    });
  });

  function switchTab(tabName) {
    navTabs.forEach(t => {
      if (t.getAttribute('data-tab') === tabName) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    tabPanes.forEach(pane => {
      if (pane.id === `pane-${tabName}`) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // More dropdown items click (Fun Easter Eggs)
  document.querySelectorAll('.more-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      moreDropdown.classList.add('hidden');
      revealSurprise();
    });
  });

  // People Also Ask Accordion
  document.querySelectorAll('.paa-item').forEach(item => {
    item.addEventListener('click', () => {
      const content = item.querySelector('.paa-content');
      item.classList.toggle('expanded');
      content.classList.toggle('hidden');
    });
  });

  // ====================================================================
  // 5. IMAGES TAB - GRID & LIGHTBOX PREVIEW
  // ====================================================================
  function renderImagesGrid(filter = 'all') {
    const gridContainer = document.getElementById('images-grid-container');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const photos = SURPRISE_CONFIG.photos || [];
    const filtered = filter === 'all' 
      ? photos 
      : photos.filter(p => p.tag.toLowerCase() === filter.toLowerCase());

    filtered.forEach(photo => {
      const card = document.createElement('div');
      card.className = 'image-card';
      card.innerHTML = `
        <div class="image-card-img-wrap">
          <img src="${photo.url}" alt="${photo.caption}" class="image-card-img" loading="lazy">
        </div>
        <div class="image-card-info">
          <div class="image-card-title">${photo.caption}</div>
          <div class="image-card-source">love.google.com · ${photo.tag}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        openLightbox(photo);
      });

      gridContainer.appendChild(card);
    });
  }

  // Filter pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const tag = pill.getAttribute('data-filter');
      renderImagesGrid(tag);
    });
  });

  function openLightbox(photo) {
    lightboxImg.src = photo.url;
    lightboxTitle.textContent = photo.caption;
    lightboxDesc.textContent = photo.details || photo.caption;
    lightboxRes.textContent = photo.resolution || "1920 × 1080";
    lightboxCategory.textContent = photo.tag || "Best Boyfriend";
    lightboxModal.classList.remove('hidden');
  }

  function closeLightbox() {
    lightboxModal.classList.add('hidden');
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);
  lightboxSurpriseBtn.addEventListener('click', () => {
    closeLightbox();
    revealSurprise();
  });

  // ====================================================================
  // 6. VIDEOS TAB - LIST & MODAL PLAYER
  // ====================================================================
  function renderVideosList() {
    const container = document.getElementById('videos-container');
    if (!container) return;
    container.innerHTML = '';

    const videos = SURPRISE_CONFIG.videos || [];
    videos.forEach(vid => {
      const item = document.createElement('div');
      item.className = 'video-result-card';
      item.innerHTML = `
        <div class="video-thumb-wrapper">
          <img src="${vid.thumbnail}" alt="${vid.title}" class="video-thumb-img" loading="lazy">
          <span class="video-duration-badge">${vid.duration}</span>
          <div class="video-play-icon-overlay">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="#ffffff">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div class="video-info">
          <h4 class="video-title">${vid.title}</h4>
          <div class="video-channel-row">${vid.source} · ${vid.views || '1.2M views'} · ${vid.date}</div>
          <p class="video-snippet">${vid.description}</p>
        </div>
      `;

      item.addEventListener('click', () => {
        openVideoModal(vid);
      });

      container.appendChild(item);
    });
  }

  function openVideoModal(vid) {
    videoScreenImg.src = vid.thumbnail;
    videoModalTitle.textContent = vid.title;
    videoModalMeta.textContent = `${vid.source} · ${vid.views} · ${vid.date}`;
    videoModalDesc.textContent = vid.description;
    videoModal.classList.remove('hidden');
  }

  function closeVideoModal() {
    videoModal.classList.add('hidden');
  }

  videoModalClose.addEventListener('click', closeVideoModal);
  videoBackdrop.addEventListener('click', closeVideoModal);
  btnVideoToSurprise.addEventListener('click', () => {
    closeVideoModal();
    revealSurprise();
  });

  // ====================================================================
  // 7. NEWS TAB - ARTICLES & MODAL
  // ====================================================================
  function renderNewsList() {
    const container = document.getElementById('news-container');
    if (!container) return;
    container.innerHTML = '';

    const newsList = SURPRISE_CONFIG.news || [];
    newsList.forEach(newsItem => {
      const card = document.createElement('div');
      card.className = 'news-article-card';
      card.innerHTML = `
        <div class="news-card-content">
          <span class="news-badge">${newsItem.badge || 'NEWS'}</span>
          <h4 class="news-headline">${newsItem.title}</h4>
          <p class="news-summary">${newsItem.summary}</p>
          <div class="news-meta-row">${newsItem.source} · ${newsItem.time}</div>
        </div>
        <div class="news-thumb-box">
          <img src="${newsItem.thumbnail}" alt="News thumbnail" class="news-thumb-img" loading="lazy">
        </div>
      `;

      card.addEventListener('click', () => {
        openNewsModal(newsItem);
      });

      container.appendChild(card);
    });
  }

  function openNewsModal(newsItem) {
    newsBadge.textContent = newsItem.badge || 'SPECIAL REPORT';
    newsHeadline.textContent = newsItem.title;
    newsByline.textContent = `${newsItem.source} · ${newsItem.time}`;
    newsImg.src = newsItem.thumbnail;
    newsBody.innerHTML = `<p>${newsItem.fullArticle || newsItem.summary}</p>`;
    newsModal.classList.remove('hidden');
  }

  function closeNewsModal() {
    newsModal.classList.add('hidden');
  }

  newsModalClose.addEventListener('click', closeNewsModal);
  newsBackdrop.addEventListener('click', closeNewsModal);
  btnNewsToSurprise.addEventListener('click', () => {
    closeNewsModal();
    revealSurprise();
  });

  // ====================================================================
  // 8. FINAL REVEAL TRANSITION TO BOYFRIEND DAY SURPRISE
  // ====================================================================
  openSurpriseButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        revealSurprise();
      });
    }
  });

  function revealSurprise() {
    // 1. Cinematic transition: Blur search results
    resultsView.style.filter = 'blur(8px)';
    resultsView.style.opacity = '0.3';
    resultsView.style.transition = 'filter 0.6s ease, opacity 0.6s ease';

    // 2. Trigger audio chime / background melody
    playMelody();

    // 3. Confetti burst
    fireConfetti();

    setTimeout(() => {
      resultsView.classList.add('hidden');
      resultsView.style.filter = 'none';
      resultsView.style.opacity = '1';

      surpriseView.classList.remove('hidden');
      surpriseView.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Trigger another celebration burst after unveiling
      setTimeout(fireConfetti, 400);
    }, 600);
  }

  // Return to Search
  btnBackToSearch.addEventListener('click', () => {
    surpriseView.classList.add('hidden');
    resultsView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ====================================================================
  // 9. SURPRISE DETAILS - LETTER, REASONS, MEMORIES, AUDIO
  // ====================================================================
  function renderLetter() {
    const salutation = document.getElementById('letter-salutation');
    const paragraphsBox = document.getElementById('letter-paragraphs');
    const closing = document.getElementById('letter-closing');
    const signature = document.getElementById('letter-signature');

    if (SURPRISE_CONFIG.letter) {
      if (salutation) salutation.textContent = SURPRISE_CONFIG.letter.salutation;
      if (closing) closing.textContent = SURPRISE_CONFIG.letter.closing;
      if (signature) signature.textContent = SURPRISE_CONFIG.letter.signature;

      if (paragraphsBox && SURPRISE_CONFIG.letter.paragraphs) {
        paragraphsBox.innerHTML = '';
        SURPRISE_CONFIG.letter.paragraphs.forEach(pText => {
          const p = document.createElement('p');
          p.textContent = pText;
          paragraphsBox.appendChild(p);
        });
      }
    }

    // Envelope click interaction
    if (envelopeBox) {
      envelopeBox.addEventListener('click', () => {
        envelopeBox.classList.add('open');
        setTimeout(() => {
          letterPaper.classList.remove('hidden');
          letterPaper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
      });
    }

    if (btnFoldLetter) {
      btnFoldLetter.addEventListener('click', () => {
        letterPaper.classList.add('hidden');
        envelopeBox.classList.remove('open');
      });
    }
  }

  function renderSurpriseReasons() {
    const container = document.getElementById('reasons-grid-container');
    if (!container) return;
    container.innerHTML = '';

    const reasons = SURPRISE_CONFIG.reasons || [];
    reasons.forEach(r => {
      const card = document.createElement('div');
      card.className = 'reason-card';
      card.innerHTML = `
        <div class="reason-icon">${r.icon || '❤️'}</div>
        <h4 class="reason-title">${r.title}</h4>
        <p class="reason-desc">${r.description}</p>
      `;
      container.appendChild(card);
    });
  }

  function renderSurpriseMemories() {
    const container = document.getElementById('surprise-memories-container');
    if (!container) return;
    container.innerHTML = '';

    const photos = SURPRISE_CONFIG.photos || [];
    photos.forEach(photo => {
      const card = document.createElement('div');
      card.className = 'memory-polaroid-card';
      card.innerHTML = `
        <div class="memory-img-box">
          <img src="${photo.url}" alt="${photo.caption}" class="memory-img" loading="lazy">
        </div>
        <div class="memory-caption">${photo.caption}</div>
      `;
      container.appendChild(card);
    });
  }

  // Interactive Gift Box & Confetti Burst
  if (giftBoxTrigger) {
    giftBoxTrigger.addEventListener('click', () => {
      fireConfetti();
    });
  }

  if (btnCelebrateBurst) {
    btnCelebrateBurst.addEventListener('click', () => {
      fireConfetti();
    });
  }

  // Floating background decorations
  function createFloatingDecorations() {
    const decorBox = document.getElementById('surprise-decorations');
    if (!decorBox) return;

    const symbols = ['❤️', '💖', '✨', '🌸', '💕', '🥰', '⭐'];
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('div');
      el.className = 'floating-heart';
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.left = `${Math.random() * 95}%`;
      el.style.animationDuration = `${7 + Math.random() * 8}s`;
      el.style.animationDelay = `${Math.random() * 6}s`;
      el.style.fontSize = `${18 + Math.random() * 16}px`;
      decorBox.appendChild(el);
    }
  }

  // ====================================================================
  // 10. AMBIENT AUDIO MELODY (Web Audio API Synthesizer)
  // ====================================================================
  let audioCtx = null;
  let isPlayingMusic = false;
  let melodyInterval = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }

  function playTone(freq, duration, type = 'sine', gainVal = 0.08) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback info:', e);
    }
  }

  function playMelody() {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlayingMusic = true;
    btnToggleMusic.classList.add('playing');
    musicStatusText.textContent = "Music: On";
    musicIconSpan.textContent = "🎶";

    // Play a gentle sweet acoustic music loop
    const chords = [
      [261.63, 329.63, 392.00], // C Maj
      [220.00, 261.63, 329.63], // A Min
      [174.61, 220.00, 261.63], // F Maj
      [196.00, 246.94, 293.66]  // G Maj
    ];
    let step = 0;

    if (melodyInterval) clearInterval(melodyInterval);

    melodyInterval = setInterval(() => {
      if (!isPlayingMusic) return;
      const currentChord = chords[step % chords.length];
      currentChord.forEach((note, i) => {
        setTimeout(() => {
          playTone(note * 1.5, 1.4, 'triangle', 0.06);
        }, i * 220);
      });
      step++;
    }, 1200);
  }

  function stopMelody() {
    isPlayingMusic = false;
    if (melodyInterval) {
      clearInterval(melodyInterval);
      melodyInterval = null;
    }
    btnToggleMusic.classList.remove('playing');
    musicStatusText.textContent = "Music: Off";
    musicIconSpan.textContent = "🎵";
  }

  btnToggleMusic.addEventListener('click', () => {
    if (isPlayingMusic) {
      stopMelody();
    } else {
      playMelody();
    }
  });

  // ====================================================================
  // 11. CONFETTI BURST (Lightweight Canvas Particle System)
  // ====================================================================
  function fireConfetti() {
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ff4b72', '#ffbe76', '#1a73e8', '#34a853', '#fbbc05', '#ea4335', '#b01455', '#a855f7'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: confettiCanvas.width / 2 + (Math.random() - 0.5) * 100,
        y: confettiCanvas.height / 2 + 50,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 1.2) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.35,
        alpha: 1
      });
    }

    let animationFrame;
    function renderConfetti() {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        p.alpha -= 0.009;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          ctx.restore();
        }
      });

      if (alive) {
        animationFrame = requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        cancelAnimationFrame(animationFrame);
      }
    }

    renderConfetti();
  }

  // Window resize handler for confetti canvas
  window.addEventListener('resize', () => {
    if (confettiCanvas) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  });

  // Run initial setup
  initContent();
});
