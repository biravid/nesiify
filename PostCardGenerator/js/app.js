/* ==========================================================================
   NESIIFY VINTAGE POSTCARD STUDIO - MAIN APP CONTROLLER
   ========================================================================== */

let state = { ...DEFAULT_POSTCARD_DATA };

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

/**
 * Initializes the application state, DOM listeners, themes, and default data
 */
function initApp() {
  renderThemeSelectors();
  initStickerGallery();

  // Check if draft exists in localStorage
  const savedState = localStorage.getItem('nesiify_postcard_draft');
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      state = { ...DEFAULT_POSTCARD_DATA, ...parsed };
      if (parsed.stickers) {
        setTimeout(() => restoreStickersState(parsed.stickers), 100);
      }
      showToast("Loaded saved postcard draft", "info");
    } catch (e) {
      console.warn("Failed parsing saved draft:", e);
    }
  }

  // Populate initial form inputs from state
  populateFormFromState();

  // Attach real-time input event listeners
  attachEventListeners();

  // Initial update of preview & QR
  updatePostcardPreview();

  // Add default sample stickers matching reference image if card is new
  if (!savedState) {
    setTimeout(() => {
      addStickerToPostcard(STICKER_CATALOG[0], { id: 'default-heart-1', x: 26, y: 5, scale: 0.9, rotate: -5, zIndex: 10 });
      addStickerToPostcard(STICKER_CATALOG[11], { id: 'default-cloud', x: 3, y: 80, scale: 0.9, rotate: 0, zIndex: 11 });
      addStickerToPostcard(STICKER_CATALOG[7], { id: 'default-star-1', x: 70, y: 4, scale: 0.7, rotate: 10, zIndex: 12 });
      addStickerToPostcard(STICKER_CATALOG[1], { id: 'default-heart-2', x: 92, y: 38, scale: 0.85, rotate: 8, zIndex: 13 });
    }, 200);
  }
}

/**
 * Renders the theme chips grid in sidebar
 */
function renderThemeSelectors() {
  const container = document.getElementById('themeSelectorGrid');
  if (!container) return;

  container.innerHTML = '';
  POSTCARD_THEMES.forEach(theme => {
    const chip = document.createElement('div');
    chip.className = `theme-chip ${state.theme === theme.id ? 'active' : ''}`;
    chip.setAttribute('data-theme', theme.id);

    chip.innerHTML = `
      <div class="theme-color-swatch" style="background: ${theme.swatchColor}; border: 1px solid rgba(0,0,0,0.2);"></div>
      <div class="theme-chip-label">${theme.name}</div>
    `;

    chip.addEventListener('click', () => switchTheme(theme.id));
    container.appendChild(chip);
  });
}

/**
 * Switches the active postcard visual theme without altering form inputs
 */
function switchTheme(themeId) {
  state.theme = themeId;
  const themeObj = POSTCARD_THEMES.find(t => t.id === themeId);
  const card = document.getElementById('postcardPreview');

  if (card && themeObj) {
    POSTCARD_THEMES.forEach(t => card.classList.remove(t.className));
    card.classList.add(themeObj.className);
  }

  document.querySelectorAll('.theme-chip').forEach(chip => {
    if (chip.getAttribute('data-theme') === themeId) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  showToast(`Switched theme to "${themeObj ? themeObj.name : themeId}"`, "info");
}

/**
 * Fills input fields with values from `state`
 */
function populateFormFromState() {
  const setElemValue = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };

  setElemValue('inputFromName', state.fromName || '');
  setElemValue('inputFromAddress', state.fromAddress || '');
  setElemValue('inputToName', state.toName || '');
  setElemValue('inputToAddress', state.toAddress || '');
  setElemValue('inputWishMessage', state.wishMessage || '');
  setElemValue('inputSurpriseUrl', state.surpriseUrl || '');
  setElemValue('inputQrLabel', state.qrLabel || '');
  setElemValue('inputDate', state.date || '');
  setElemValue('inputOccasion', state.occasion || 'Surprise Gift');

  switchTheme(state.theme || 'vintage-love');
  updatePostcardBackground();
  updateCharCounter();
}

/**
 * Attaches real-time event listeners to form controls
 */
function attachEventListeners() {
  const inputsMap = [
    { id: 'inputFromName', key: 'fromName' },
    { id: 'inputFromAddress', key: 'fromAddress' },
    { id: 'inputToName', key: 'toName' },
    { id: 'inputToAddress', key: 'toAddress' },
    { id: 'inputWishMessage', key: 'wishMessage' },
    { id: 'inputSurpriseUrl', key: 'surpriseUrl' },
    { id: 'inputQrLabel', key: 'qrLabel' },
    { id: 'inputDate', key: 'date' },
    { id: 'inputOccasion', key: 'occasion' }
  ];

  inputsMap.forEach(item => {
    const elem = document.getElementById(item.id);
    if (elem) {
      elem.addEventListener('input', (e) => {
        state[item.key] = e.target.value;
        updatePostcardPreview();
        if (item.key === 'wishMessage') updateCharCounter();
      });
    }
  });

  const addEvent = (id, event, handler) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, handler);
  };

  addEvent('btnTestUrl', 'click', () => testSurpriseURL(state.surpriseUrl));
  addEvent('btnBrowsePresets', 'click', openPresetsModal);
  addEvent('btnQuickPresets', 'click', openPresetsModal);
  addEvent('btnClosePresetsModal', 'click', closePresetsModal);

  addEvent('btnSaveDraft', 'click', saveDraft);
  addEvent('btnLoadDraft', 'click', loadDraft);
  addEvent('btnResetForm', 'click', resetForm);
  addEvent('btnPrintPostcard', 'click', printPostcard);
  addEvent('btnDownloadPng', 'click', exportPostcardAsPng);

  addEvent('stickerScaleInput', 'input', updateActiveStickerTransform);
  addEvent('stickerRotateInput', 'input', updateActiveStickerTransform);
  addEvent('btnStickerUp', 'click', () => changeActiveStickerZIndex('up'));
  addEvent('btnStickerDown', 'click', () => changeActiveStickerZIndex('down'));
  addEvent('btnStickerDelete', 'click', () => {
    if (activeStickerId) removeSticker(activeStickerId);
  });

  const inputBgImage = document.getElementById('inputBgImage');
  if (inputBgImage) {
    inputBgImage.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          showToast("Please select a valid image file!", "warning");
          return;
        }
        const reader = new FileReader();
        reader.onload = (evt) => {
          state.bgImage = evt.target.result;
          updatePostcardBackground();
          showToast("Custom background image applied!", "info");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  addEvent('btnRemoveBgImage', 'click', () => {
    state.bgImage = null;
    const input = document.getElementById('inputBgImage');
    if (input) input.value = '';
    updatePostcardBackground();
    showToast("Removed custom background image", "info");
  });

  const cardPreview = document.getElementById('postcardPreview');
  if (cardPreview) {
    cardPreview.addEventListener('click', (e) => {
      if (!e.target.closest('.placed-sticker')) {
        deselectAllStickers();
      }
    });
  }
}

/**
 * Updates postcard card background with custom uploaded image or default theme paper texture
 */
function updatePostcardBackground() {
  const card = document.getElementById('postcardPreview');
  const removeBtn = document.getElementById('btnRemoveBgImage');
  const statusDiv = document.getElementById('bgImageStatus');

  if (!card) return;

  if (state.bgImage) {
    card.style.backgroundImage = `linear-gradient(rgba(248, 237, 218, 0.45), rgba(248, 237, 218, 0.45)), url("${state.bgImage}")`;
    card.style.backgroundSize = 'cover';
    card.style.backgroundPosition = 'center';
    card.style.backgroundRepeat = 'no-repeat';

    if (removeBtn) removeBtn.style.display = 'inline-block';
    if (statusDiv) {
      statusDiv.style.display = 'block';
      statusDiv.textContent = '✨ Custom background image active';
    }
  } else {
    card.style.backgroundImage = '';
    card.style.backgroundSize = '';
    card.style.backgroundPosition = '';
    card.style.backgroundRepeat = '';

    if (removeBtn) removeBtn.style.display = 'none';
    if (statusDiv) {
      statusDiv.style.display = 'none';
      statusDiv.textContent = '';
    }
  }
}

/**
 * Updates all text elements in the live preview panel instantly
 */
function updatePostcardPreview() {
  const previewFromName = document.getElementById('previewFromName');
  const previewFromStreet = document.getElementById('previewFromStreet');
  const previewFromCity = document.getElementById('previewFromCity');
  const previewFromCountry = document.getElementById('previewFromCountry');

  if (previewFromName) previewFromName.textContent = state.fromName || 'Your Name';

  const fromParts = (state.fromAddress || "123 Dreamer's Lane, Cloud City, DD 45678, India").split(',').map(s => s.trim());
  if (previewFromStreet) previewFromStreet.innerHTML = fromParts[0] || '&nbsp;';
  if (previewFromCity) previewFromCity.innerHTML = fromParts[1] || '&nbsp;';
  if (previewFromCountry) previewFromCountry.innerHTML = fromParts.slice(2).join(', ') || '&nbsp;';

  const previewWish = document.getElementById('previewWishMessage');
  if (previewWish) previewWish.textContent = state.wishMessage || 'Your message will appear here...';

  const previewToName = document.getElementById('previewToName');
  const previewToStreet = document.getElementById('previewToStreet');
  const previewToCity = document.getElementById('previewToCity');
  const previewToCountry = document.getElementById('previewToCountry');

  if (previewToName) previewToName.textContent = state.toName || 'Someone Special';

  const toParts = (state.toAddress || '789 Heartfelt Avenue, Happiness Town, HT 12345, India').split(',').map(s => s.trim());
  if (previewToStreet) previewToStreet.innerHTML = toParts[0] || '&nbsp;';
  if (previewToCity) previewToCity.innerHTML = toParts[1] || '&nbsp;';
  if (previewToCountry) previewToCountry.innerHTML = toParts.slice(2).join(', ') || '&nbsp;';

  const previewQrLabel = document.getElementById('previewQrLabel');
  if (previewQrLabel) previewQrLabel.textContent = (state.qrLabel || 'SPECIAL DELIVERY').toUpperCase();

  updatePostcardBackground();
  updatePostcardQRCode(state.surpriseUrl);
}

/**
 * Updates character counter for message textarea
 */
function updateCharCounter() {
  const counter = document.getElementById('charCounter');
  if (counter) {
    const len = (state.wishMessage || '').length;
    counter.textContent = `${len} / 300`;
  }
}

/**
 * Open & Render Presets Modal
 */
function openPresetsModal() {
  const modal = document.getElementById('presetsModal');
  const body = document.getElementById('presetsModalBody');
  if (!modal || !body) return;

  body.innerHTML = '';
  MESSAGE_PRESETS.forEach(cat => {
    const catTitle = document.createElement('div');
    catTitle.className = 'preset-category-title';
    catTitle.textContent = cat.category;
    body.appendChild(catTitle);

    cat.items.forEach(item => {
      const itemCard = document.createElement('div');
      itemCard.className = 'preset-item-card';
      itemCard.innerHTML = `
        <strong style="color: var(--accent-gold); display: block; margin-bottom: 4px;">${item.title}</strong>
        <div>${item.text.replace(/\n/g, '<br>')}</div>
      `;
      itemCard.addEventListener('click', () => {
        state.wishMessage = item.text;
        document.getElementById('inputWishMessage').value = item.text;
        updateCharCounter();
        updatePostcardPreview();
        closePresetsModal();
        showToast("Inserted preset message!", "info");
      });
      body.appendChild(itemCard);
    });
  });

  modal.classList.add('show');
}

function closePresetsModal() {
  const modal = document.getElementById('presetsModal');
  if (modal) modal.classList.remove('show');
}

/**
 * Saves state & stickers to LocalStorage
 */
function saveDraft() {
  try {
    const saveData = {
      ...state,
      stickers: getStickersState()
    };
    localStorage.setItem('nesiify_postcard_draft', JSON.stringify(saveData));
    showToast("Postcard draft saved to browser!", "info");
  } catch (e) {
    showToast("Could not save draft: " + e.message, "warning");
  }
}

/**
 * Loads draft from LocalStorage
 */
function loadDraft() {
  const savedState = localStorage.getItem('nesiify_postcard_draft');
  if (!savedState) {
    showToast("No saved draft found!", "warning");
    return;
  }

  try {
    const parsed = JSON.parse(savedState);
    state = { ...DEFAULT_POSTCARD_DATA, ...parsed };
    populateFormFromState();
    if (parsed.stickers) restoreStickersState(parsed.stickers);
    updatePostcardPreview();
    showToast("Loaded saved postcard draft!", "info");
  } catch (e) {
    showToast("Failed loading draft", "warning");
  }
}

/**
 * Resets form to initial default values
 */
function resetForm() {
  if (confirm("Are you sure you want to reset all postcard fields?")) {
    state = { ...DEFAULT_POSTCARD_DATA };
    populateFormFromState();
    clearAllStickers();
    updatePostcardPreview();
    localStorage.removeItem('nesiify_postcard_draft');
    showToast("Reset form to default state", "info");
  }
}

/**
 * Ultra-High-Resolution PNG Export guaranteeing 100% QR Code visibility
 */
async function exportPostcardAsPng() {
  const target = document.getElementById('postcardPreview');
  if (!target) return;

  deselectAllStickers();
  showToast("Generating 1:1 high-resolution postcard PNG...", "info");

  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const exportWidth = target.offsetWidth || 900;
  const exportHeight = target.offsetHeight || 592;

  // Extract active QR Code image / canvas data URL from original container
  const origQrContainer = document.getElementById('stampQrContainer');
  let activeQrDataUrl = '';
  if (origQrContainer) {
    const origCanvas = origQrContainer.querySelector('canvas');
    const origImg = origQrContainer.querySelector('img');
    if (origCanvas) {
      try { activeQrDataUrl = origCanvas.toDataURL('image/png'); } catch (_) {}
    }
    if (!activeQrDataUrl && origImg && origImg.src) {
      activeQrDataUrl = origImg.src;
    }
  }

  target.classList.add('is-exporting');

  if (typeof html2canvas === 'undefined') {
    showToast("html2canvas library is missing! Printing instead.", "warning");
    window.print();
    target.classList.remove('is-exporting');
    return;
  }

  try {
    const canvas = await html2canvas(target, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      width: exportWidth,
      height: exportHeight,
      windowWidth: 1280,
      windowHeight: 900,
      onclone: (clonedDoc) => {
        const clonedCard = clonedDoc.getElementById('postcardPreview');
        if (clonedCard) {
          clonedCard.style.width = `${exportWidth}px`;
          clonedCard.style.height = `${exportHeight}px`;
          clonedCard.style.maxWidth = 'none';
          clonedCard.style.maxHeight = 'none';
          clonedCard.style.transform = 'none';
          clonedCard.style.margin = '0';
          clonedCard.style.boxShadow = 'none';
          
          // Inject crisp QR image directly into cloned stamp container
          const clonedQrContainer = clonedCard.querySelector('#stampQrContainer');
          if (clonedQrContainer && activeQrDataUrl) {
            clonedQrContainer.innerHTML = `<img src="${activeQrDataUrl}" style="width:100% !important; height:100% !important; display:block !important;" alt="Surprise QR Code">`;
          }
        }
      }
    });

    target.classList.remove('is-exporting');

    const link = document.createElement('a');
    const recipientClean = (state.toName || 'surprise').toLowerCase().replace(/[^a-z0-9]/g, '-');
    link.download = `nesiify-surprise-postcard-${recipientClean}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("🎉 Postcard PNG downloaded with QR Code!", "info");
  } catch (err) {
    console.error("Export error:", err);
    target.classList.remove('is-exporting');
    showToast("Export failed: " + err.message, "warning");
  }
}

/**
 * Triggers Browser Print dialog formatted for postcard
 */
function printPostcard() {
  deselectAllStickers();
  window.print();
}

/**
 * Custom Toast Notification System
 */
function showToast(message, type = "info") {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icon = type === 'warning' ? '⚠️' : '✨';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}
