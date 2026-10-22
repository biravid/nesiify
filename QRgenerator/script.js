/* ==========================================================================
   NESIIFY QR CODE GENERATOR - MODULAR VANILLA JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Default Configuration & Application State ---
  const DEFAULT_STATE = {
    currentType: 'url',
    fgColor: '#0F172A',
    bgColor: '#FFFFFF',
    dotsStyle: 'square',
    cornerSquareStyle: 'square',
    cornerDotStyle: 'square',
    size: 300,
    margin: 10,
    ecLevel: 'M',
    logoUrl: null,
    logoScale: 0.3,
    logoName: '',
    // CTA Frame options
    frameStyle: 'bottom-badge',
    ctaText: 'SCAN ME',
    frameColor: '#6366F1',
    frameTextColor: '#FFFFFF'
  };

  // Mutable App State
  let state = { ...DEFAULT_STATE };

  // Global QRCodeStyling Instance
  let qrCode = null;

  // Local Storage History Key
  const HISTORY_STORAGE_KEY = 'nesiify_qr_history';

  // --- DOM Element References ---
  const elements = {
    // Theme & Tabs
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    inputTypeTabs: document.getElementById('inputTypeTabs'),
    
    // Content Panes & Inputs
    paneUrl: document.getElementById('paneUrl'),
    paneText: document.getElementById('paneText'),
    panePhone: document.getElementById('panePhone'),
    paneEmail: document.getElementById('paneEmail'),
    paneWhatsapp: document.getElementById('paneWhatsapp'),
    paneWifi: document.getElementById('paneWifi'),
    paneMaps: document.getElementById('paneMaps'),
    paneVcard: document.getElementById('paneVcard'),
    
    urlInput: document.getElementById('urlInput'),
    urlCounter: document.getElementById('urlCounter'),
    btnCopyUrlInput: document.getElementById('btnCopyUrlInput'),
    
    textInput: document.getElementById('textInput'),
    textCounter: document.getElementById('textCounter'),
    
    phoneInput: document.getElementById('phoneInput'),
    
    emailRecipient: document.getElementById('emailRecipient'),
    emailSubject: document.getElementById('emailSubject'),
    emailBody: document.getElementById('emailBody'),

    waPhone: document.getElementById('waPhone'),
    waMessage: document.getElementById('waMessage'),
    
    wifiSsid: document.getElementById('wifiSsid'),
    wifiPassword: document.getElementById('wifiPassword'),
    wifiEncryption: document.getElementById('wifiEncryption'),

    mapsQuery: document.getElementById('mapsQuery'),

    vFirstName: document.getElementById('vFirstName'),
    vLastName: document.getElementById('vLastName'),
    vOrg: document.getElementById('vOrg'),
    vPhone: document.getElementById('vPhone'),
    vEmail: document.getElementById('vEmail'),
    vUrl: document.getElementById('vUrl'),

    // Colors
    fgColorPicker: document.getElementById('fgColorPicker'),
    fgColorHex: document.getElementById('fgColorHex'),
    bgColorPicker: document.getElementById('bgColorPicker'),
    bgColorHex: document.getElementById('bgColorHex'),

    // CTA Frame Controls
    frameStyleSelect: document.getElementById('frameStyleSelect'),
    ctaTextInput: document.getElementById('ctaTextInput'),
    ctaQuickChips: document.getElementById('ctaQuickChips'),
    frameColorPicker: document.getElementById('frameColorPicker'),
    frameColorHex: document.getElementById('frameColorHex'),
    frameTextColorPicker: document.getElementById('frameTextColorPicker'),
    frameTextColorHex: document.getElementById('frameTextColorHex'),

    // Presets
    designPresetsGrid: document.getElementById('designPresetsGrid'),

    // Grids
    dotStyleGrid: document.getElementById('dotStyleGrid'),
    cornerSquareGrid: document.getElementById('cornerSquareGrid'),

    // Sliders & Size Controls
    sizePresetSelect: document.getElementById('sizePresetSelect'),
    sizeSlider: document.getElementById('sizeSlider'),
    sizeValue: document.getElementById('sizeValue'),
    marginSlider: document.getElementById('marginSlider'),
    marginValue: document.getElementById('marginValue'),
    ecLevelSelect: document.getElementById('ecLevelSelect'),

    // Logo Upload
    logoDropzone: document.getElementById('logoDropzone'),
    logoFileInput: document.getElementById('logoFileInput'),
    logoPreviewWrapper: document.getElementById('logoPreviewWrapper'),
    logoPreviewImg: document.getElementById('logoPreviewImg'),
    logoFileName: document.getElementById('logoFileName'),
    btnRemoveLogo: document.getElementById('btnRemoveLogo'),
    logoScaleSlider: document.getElementById('logoScaleSlider'),
    logoScaleValue: document.getElementById('logoScaleValue'),

    // History
    historyListContainer: document.getElementById('historyListContainer'),
    btnClearHistory: document.getElementById('btnClearHistory'),
    btnSaveToHistory: document.getElementById('btnSaveToHistory'),

    // Display & Live Frame
    qrFrameWrapper: document.getElementById('qrFrameWrapper'),
    topCtaBanner: document.getElementById('topCtaBanner'),
    bottomCtaBanner: document.getElementById('bottomCtaBanner'),
    qrCanvasContainer: document.getElementById('qrCanvasContainer'),
    qrSpinner: document.getElementById('qrSpinner'),
    scannabilityStatus: document.getElementById('scannabilityStatus'),
    
    // Buttons
    btnGenerate: document.getElementById('btnGenerate'),
    btnDownloadPng: document.getElementById('btnDownloadPng'),
    btnDownloadJpg: document.getElementById('btnDownloadJpg'),
    btnDownloadSvg: document.getElementById('btnDownloadSvg'),
    btnWebShare: document.getElementById('btnWebShare'),
    btnCopyClipboard: document.getElementById('btnCopyClipboard'),
    btnResetAll: document.getElementById('btnResetAll'),
    toastContainer: document.getElementById('toastContainer'),

    // Mobile Bar References
    mobileQuickBar: document.getElementById('mobileQuickBar'),
    mobileJumpToPreviewBtn: document.getElementById('mobileJumpToPreviewBtn'),
    mobileMiniQrThumb: document.getElementById('mobileMiniQrThumb'),
    mobileQuickDownloadBtn: document.getElementById('mobileQuickDownloadBtn'),
    previewColumn: document.querySelector('.preview-column')
  };

  // --- Design Presets Definitions ---
  const DESIGN_PRESETS = {
    classic: {
      fgColor: '#000000', bgColor: '#FFFFFF', dotsStyle: 'square', cornerSquareStyle: 'square',
      frameStyle: 'none', ctaText: 'SCAN ME', frameColor: '#000000', frameTextColor: '#FFFFFF'
    },
    modern: {
      fgColor: '#6366F1', bgColor: '#0B0F19', dotsStyle: 'rounded', cornerSquareStyle: 'extra-rounded',
      frameStyle: 'bottom-badge', ctaText: 'SCAN ME', frameColor: '#6366F1', frameTextColor: '#FFFFFF'
    },
    minimal: {
      fgColor: '#334155', bgColor: '#F8FAFC', dotsStyle: 'dots', cornerSquareStyle: 'extra-rounded',
      frameStyle: 'none', ctaText: 'SCAN ME', frameColor: '#334155', frameTextColor: '#FFFFFF'
    },
    luxury: {
      fgColor: '#D4AF37', bgColor: '#0B0F19', dotsStyle: 'classy', cornerSquareStyle: 'extra-rounded',
      frameStyle: 'bottom-badge', ctaText: 'LUXURY QR', frameColor: '#D4AF37', frameTextColor: '#0B0F19'
    },
    birthday: {
      fgColor: '#EC4899', bgColor: '#18181B', dotsStyle: 'rounded', cornerSquareStyle: 'extra-rounded',
      frameStyle: 'bottom-badge', ctaText: 'SCAN FOR SURPRISE', frameColor: '#EC4899', frameTextColor: '#FFFFFF'
    },
    wedding: {
      fgColor: '#C58B82', bgColor: '#FFFDF9', dotsStyle: 'dots', cornerSquareStyle: 'extra-rounded',
      frameStyle: 'bottom-badge', ctaText: 'OUR WEDDING', frameColor: '#C58B82', frameTextColor: '#FFFFFF'
    },
    business: {
      fgColor: '#1E3A8A', bgColor: '#FFFFFF', dotsStyle: 'square', cornerSquareStyle: 'square',
      frameStyle: 'bottom-badge', ctaText: 'SCAN TO CONNECT', frameColor: '#1E3A8A', frameTextColor: '#FFFFFF'
    },
    whatsapp: {
      fgColor: '#25D366', bgColor: '#121B22', dotsStyle: 'rounded', cornerSquareStyle: 'extra-rounded',
      frameStyle: 'bottom-badge', ctaText: 'CHAT ON WHATSAPP', frameColor: '#25D366', frameTextColor: '#121B22'
    },
    instagram: {
      fgColor: '#E1306C', bgColor: '#FFFFFF', dotsStyle: 'extra-rounded', cornerSquareStyle: 'extra-rounded',
      frameStyle: 'bottom-badge', ctaText: 'FOLLOW US', frameColor: '#E1306C', frameTextColor: '#FFFFFF'
    }
  };

  // --- Initialize Application ---
  function init() {
    setupTheme();
    initQRCodeEngine();
    registerEventListeners();
    loadHistoryList();
    updateLiveFrameUI();
    updateScannabilityMeter();
  }

  // --- Theme Toggle Handler ---
  function setupTheme() {
    const savedTheme = localStorage.getItem('nesiify_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    elements.themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('nesiify_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }

  // --- QR Content Data Builder for all 8 types ---
  function getQRContentData() {
    switch (state.currentType) {
      case 'url': {
        const val = elements.urlInput.value.trim();
        return val || 'https://nesiify.com';
      }
      case 'text': {
        const val = elements.textInput.value.trim();
        return val || 'Nesiify QR Generator';
      }
      case 'phone': {
        const num = elements.phoneInput.value.trim().replace(/\s+/g, '');
        return num ? `tel:${num}` : 'tel:+1234567890';
      }
      case 'email': {
        const recipient = elements.emailRecipient.value.trim() || 'contact@nesiify.com';
        const subject = encodeURIComponent(elements.emailSubject.value.trim());
        const body = encodeURIComponent(elements.emailBody.value.trim());
        return `mailto:${recipient}?subject=${subject}&body=${body}`;
      }
      case 'whatsapp': {
        const phone = elements.waPhone.value.trim().replace(/[^\d+]/g, '') || '14155552671';
        const msg = encodeURIComponent(elements.waMessage.value.trim());
        return `https://wa.me/${phone}?text=${msg}`;
      }
      case 'wifi': {
        const ssid = elements.wifiSsid.value.trim() || 'Nesiify_WiFi';
        const pass = elements.wifiPassword.value;
        const enc = elements.wifiEncryption.value;
        return `WIFI:S:${ssid};T:${enc};P:${pass};;`;
      }
      case 'maps': {
        const loc = encodeURIComponent(elements.mapsQuery.value.trim() || 'Times Square, New York');
        return `https://www.google.com/maps/search/?api=1&query=${loc}`;
      }
      case 'vcard': {
        const fn = elements.vFirstName.value.trim() || 'John';
        const ln = elements.vLastName.value.trim() || 'Doe';
        const org = elements.vOrg.value.trim() || 'Nesiify';
        const phone = elements.vPhone.value.trim() || '+1234567890';
        const email = elements.vEmail.value.trim() || 'john@nesiify.com';
        const url = elements.vUrl.value.trim() || 'https://nesiify.com';

        return `BEGIN:VCARD\nVERSION:3.0\nN:${ln};${fn}\nFN:${fn} ${ln}\nORG:${org}\nTEL:${phone}\nEMAIL:${email}\nURL:${url}\nEND:VCARD`;
      }
      default:
        return 'https://nesiify.com';
    }
  }

  // --- Initialize QRCodeStyling Engine ---
  function initQRCodeEngine() {
    if (typeof QRCodeStyling === 'undefined') {
      showToast('Loading QR Engine library...', 'info');
      setTimeout(initQRCodeEngine, 500);
      return;
    }

    const qrData = getQRContentData();

    qrCode = new QRCodeStyling({
      width: state.size,
      height: state.size,
      type: 'canvas',
      data: qrData,
      margin: state.margin,
      qrOptions: {
        errorCorrectionLevel: state.ecLevel
      },
      dotsOptions: {
        color: state.fgColor,
        type: state.dotsStyle
      },
      backgroundOptions: {
        color: state.bgColor
      },
      cornersSquareOptions: {
        color: state.fgColor,
        type: state.cornerSquareStyle
      },
      cornersDotOptions: {
        color: state.fgColor,
        type: state.cornerDotStyle
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 4,
        imageSize: state.logoScale
      }
    });

    elements.qrCanvasContainer.innerHTML = '';
    qrCode.append(elements.qrCanvasContainer);
  }

  // --- Debounce Utility ---
  function debounce(func, wait = 150) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // --- Core Render & Live Frame UI Update ---
  function updateLiveFrameUI() {
    const wrapper = elements.qrFrameWrapper;
    const topBanner = elements.topCtaBanner;
    const bottomBanner = elements.bottomCtaBanner;

    wrapper.className = 'qr-frame-wrapper';

    if (state.frameStyle === 'none') {
      wrapper.classList.add('frame-none');
      topBanner.style.display = 'none';
      bottomBanner.style.display = 'none';
      wrapper.style.backgroundColor = 'transparent';
    } else if (state.frameStyle === 'bottom-badge') {
      topBanner.style.display = 'none';
      bottomBanner.style.display = 'block';
      bottomBanner.textContent = state.ctaText || 'SCAN ME';
      bottomBanner.style.color = state.frameTextColor;
      wrapper.style.backgroundColor = state.frameColor;
    } else if (state.frameStyle === 'top-badge') {
      topBanner.style.display = 'block';
      topBanner.textContent = state.ctaText || 'SCAN ME';
      topBanner.style.color = state.frameTextColor;
      bottomBanner.style.display = 'none';
      wrapper.style.backgroundColor = state.frameColor;
    } else if (state.frameStyle === 'full-border') {
      wrapper.classList.add('frame-full-border');
      topBanner.style.display = 'block';
      topBanner.textContent = state.ctaText || 'SCAN ME';
      topBanner.style.color = state.frameTextColor;
      bottomBanner.style.display = 'block';
      bottomBanner.textContent = state.ctaText || 'SCAN ME';
      bottomBanner.style.color = state.frameTextColor;
      wrapper.style.backgroundColor = state.frameColor;
      wrapper.style.borderColor = state.frameColor;
    }
  }

  const renderQR = debounce(() => {
    if (!qrCode) return;

    elements.qrSpinner.classList.add('active');

    const qrData = getQRContentData();

    qrCode.update({
      width: state.size,
      height: state.size,
      data: qrData,
      margin: state.margin,
      image: state.logoUrl || undefined,
      qrOptions: {
        errorCorrectionLevel: state.ecLevel
      },
      dotsOptions: {
        color: state.fgColor,
        type: state.dotsStyle
      },
      backgroundOptions: {
        color: state.bgColor
      },
      cornersSquareOptions: {
        color: state.fgColor,
        type: state.cornerSquareStyle
      },
      cornersDotOptions: {
        color: state.fgColor,
        type: state.cornerDotStyle
      },
      imageOptions: {
        margin: 4,
        imageSize: state.logoScale
      }
    });

    updateLiveFrameUI();

    updateScannabilityMeter();

    setTimeout(() => {
      updateMobileMiniThumb();
    }, 200);
  }, 150);

  // --- Luminance & Scannability Checker ---
  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  function getLuminance({ r, g, b }) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function updateScannabilityMeter() {
    try {
      const rgbFg = hexToRgb(state.fgColor);
      const rgbBg = hexToRgb(state.bgColor);

      const lum1 = getLuminance(rgbFg);
      const lum2 = getLuminance(rgbBg);

      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      const ratio = (brightest + 0.05) / (darkest + 0.05);

      const statusEl = elements.scannabilityStatus;

      if (ratio >= 4.5) {
        statusEl.innerHTML = `<span class="status-dot" style="background: var(--success-color);"></span> Optimal Contrast (${ratio.toFixed(1)}:1)`;
      } else if (ratio >= 3.0) {
        statusEl.innerHTML = `<span class="status-dot" style="background: var(--warning-color);"></span> Moderate Contrast (${ratio.toFixed(1)}:1)`;
      } else {
        statusEl.innerHTML = `<span class="status-dot" style="background: var(--danger-color);"></span> Low Contrast (${ratio.toFixed(1)}:1)`;
      }
    } catch (e) {
      // Ignore calculation errors
    }
  }

  // --- Offscreen Canvas Compositing for Framed High-Res Export ---
  function getExportCanvas(callback) {
    const rawCanvas = elements.qrCanvasContainer.querySelector('canvas');
    if (!rawCanvas) return;

    if (state.frameStyle === 'none') {
      callback(rawCanvas);
      return;
    }

    const qrW = rawCanvas.width;
    const qrH = rawCanvas.height;
    const padding = Math.round(qrW * 0.08);
    const bannerH = Math.round(qrW * 0.16);

    let canvasW = qrW + (padding * 2);
    let canvasH = qrH + (padding * 2);

    if (state.frameStyle === 'bottom-badge' || state.frameStyle === 'top-badge') {
      canvasH += bannerH;
    }

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvasW;
    exportCanvas.height = canvasH;
    const ctx = exportCanvas.getContext('2d');

    // Fill background frame
    ctx.fillStyle = state.frameColor;
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Calculate QR placement
    let qrX = padding;
    let qrY = padding;
    if (state.frameStyle === 'top-badge') {
      qrY += bannerH;
    }

    // Draw solid QR background box
    ctx.fillStyle = state.bgColor;
    ctx.fillRect(qrX, qrY, qrW, qrH);

    // Draw QR canvas
    ctx.drawImage(rawCanvas, qrX, qrY);

    // Draw CTA Text Banner
    ctx.fillStyle = state.frameTextColor;
    ctx.font = `bold ${Math.round(bannerH * 0.45)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const text = state.ctaText || 'SCAN ME';

    if (state.frameStyle === 'bottom-badge') {
      const textY = qrY + qrH + (bannerH / 2);
      ctx.fillText(text, canvasW / 2, textY);
    } else if (state.frameStyle === 'top-badge') {
      const textY = padding + (bannerH / 2);
      ctx.fillText(text, canvasW / 2, textY);
    } else if (state.frameStyle === 'full-border') {
      ctx.font = `bold ${Math.round(padding * 0.55)}px 'Plus Jakarta Sans', sans-serif`;
      ctx.fillText(text, canvasW / 2, padding / 2);
      ctx.fillText(text, canvasW / 2, canvasH - (padding / 2));
    }

    callback(exportCanvas);
  }

  // --- Local History Management ("My QR Codes") ---
  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveHistory(historyArr) {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyArr));
  }

  function loadHistoryList() {
    const history = getHistory();
    const container = elements.historyListContainer;

    if (history.length === 0) {
      container.innerHTML = `<div class="history-empty">No saved QR codes yet. Click "Save to My QRs" to store your configurations!</div>`;
      return;
    }

    container.innerHTML = history.map(item => `
      <div class="history-item" data-id="${item.id}">
        <div class="history-info">
          <span class="history-title">${escapeHtml(item.title)}</span>
          <span class="history-meta">${item.type.toUpperCase()} &bull; ${item.date}</span>
        </div>
        <div class="history-actions">
          <button class="btn-hist-action btn-hist-load" title="Load Configuration">Load</button>
          <button class="btn-hist-action btn-hist-del" title="Delete">Del</button>
        </div>
      </div>
    `).join('');

    // Attach Delegation Listeners
    container.querySelectorAll('.btn-hist-load').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.closest('.history-item').dataset.id;
        loadHistoryItem(id);
      });
    });

    container.querySelectorAll('.btn-hist-del').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.closest('.history-item').dataset.id;
        deleteHistoryItem(id);
      });
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
  }

  function saveCurrentToHistory() {
    const history = getHistory();
    const titlePrompt = prompt('Enter a name for this QR Code configuration:', `QR - ${state.currentType.toUpperCase()} (${new Date().toLocaleDateString()})`);
    
    if (!titlePrompt) return;

    const newItem = {
      id: 'qr_' + Date.now(),
      title: titlePrompt.trim() || 'Untitled QR',
      type: state.currentType,
      date: new Date().toLocaleDateString(),
      state: { ...state }
    };

    history.unshift(newItem);
    saveHistory(history);
    loadHistoryList();
    showToast('Saved to My QR Codes history!', 'success');
  }

  function loadHistoryItem(id) {
    const history = getHistory();
    const item = history.find(i => i.id === id);
    if (!item) return;

    state = { ...item.state };

    // Select Active Tab
    const tabBtn = document.querySelector(`.tab-btn[data-type="${state.currentType}"]`);
    if (tabBtn) tabBtn.click();

    // Sync Colors
    syncColor('fg', state.fgColor);
    syncColor('bg', state.bgColor);
    syncColor('frame', state.frameColor);
    syncColor('frameText', state.frameTextColor);

    // Sync Frame Controls
    elements.frameStyleSelect.value = state.frameStyle;
    elements.ctaTextInput.value = state.ctaText;

    // Sync Sliders
    elements.sizeSlider.value = state.size;
    elements.sizeValue.textContent = `${state.size} x ${state.size} px`;
    elements.marginSlider.value = state.margin;
    elements.marginValue.textContent = `${state.margin} px`;
    elements.ecLevelSelect.value = state.ecLevel;

    // Sync Styles
    const dotOpt = document.querySelector(`#dotStyleGrid .style-option[data-style="${state.dotsStyle}"]`);
    if (dotOpt) dotOpt.click();

    const cornerOpt = document.querySelector(`#cornerSquareGrid .style-option[data-corner="${state.cornerSquareStyle}"]`);
    if (cornerOpt) cornerOpt.click();

    renderQR();
    showToast(`Loaded "${item.title}"`, 'info');
  }

  function deleteHistoryItem(id) {
    let history = getHistory();
    history = history.filter(i => i.id !== id);
    saveHistory(history);
    loadHistoryList();
    showToast('Item deleted from history', 'info');
  }

  // --- Helper Color Sync Function ---
  function syncColor(type, hex) {
    if (!/^#[0-9A-F]{6}$/i.test(hex)) return;

    if (type === 'fg') {
      state.fgColor = hex;
      elements.fgColorPicker.value = hex;
      elements.fgColorHex.value = hex.toUpperCase();
    } else if (type === 'bg') {
      state.bgColor = hex;
      elements.bgColorPicker.value = hex;
      elements.bgColorHex.value = hex.toUpperCase();
    } else if (type === 'frame') {
      state.frameColor = hex;
      elements.frameColorPicker.value = hex;
      elements.frameColorHex.value = hex.toUpperCase();
    } else if (type === 'frameText') {
      state.frameTextColor = hex;
      elements.frameTextColorPicker.value = hex;
      elements.frameTextColorHex.value = hex.toUpperCase();
    }
    renderQR();
  }

  // --- Event Listeners Registration ---
  function registerEventListeners() {
    
    // 1. Tab Navigation Switcher for 8 Types
    elements.inputTypeTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;

      const type = btn.dataset.type;
      state.currentType = type;

      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Hide all panes
      [elements.paneUrl, elements.paneText, elements.panePhone, elements.paneEmail,
       elements.paneWhatsapp, elements.paneWifi, elements.paneMaps, elements.paneVcard]
      .forEach(pane => pane.style.display = 'none');

      // Display active pane
      if (type === 'url') elements.paneUrl.style.display = 'block';
      if (type === 'text') elements.paneText.style.display = 'block';
      if (type === 'phone') elements.panePhone.style.display = 'block';
      if (type === 'email') elements.paneEmail.style.display = 'block';
      if (type === 'whatsapp') elements.paneWhatsapp.style.display = 'block';
      if (type === 'wifi') elements.paneWifi.style.display = 'block';
      if (type === 'maps') elements.paneMaps.style.display = 'block';
      if (type === 'vcard') elements.paneVcard.style.display = 'block';

      renderQR();
    });

    // 2. Input Listeners
    elements.urlInput.addEventListener('input', () => {
      elements.urlCounter.textContent = `${elements.urlInput.value.length} / 500`;
      renderQR();
    });

    elements.btnCopyUrlInput.addEventListener('click', () => {
      navigator.clipboard.writeText(elements.urlInput.value);
      showToast('URL copied to clipboard!', 'success');
    });

    elements.textInput.addEventListener('input', () => {
      elements.textCounter.textContent = `${elements.textInput.value.length} / 1000`;
      renderQR();
    });

    [elements.phoneInput, elements.emailRecipient, elements.emailSubject, elements.emailBody,
     elements.waPhone, elements.waMessage, elements.wifiSsid, elements.wifiPassword, elements.wifiEncryption,
     elements.mapsQuery, elements.vFirstName, elements.vLastName, elements.vOrg, elements.vPhone,
     elements.vEmail, elements.vUrl]
    .forEach(inputEl => {
      if (!inputEl) return;
      inputEl.addEventListener('input', renderQR);
      inputEl.addEventListener('change', renderQR);
    });

    // 3. Design Presets Card Grid
    elements.designPresetsGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.preset-card');
      if (!card) return;

      document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const presetName = card.dataset.preset;
      const presetData = DESIGN_PRESETS[presetName];

      if (presetData) {
        state = { ...state, ...presetData };

        syncColor('fg', state.fgColor);
        syncColor('bg', state.bgColor);
        syncColor('frame', state.frameColor);
        syncColor('frameText', state.frameTextColor);

        elements.frameStyleSelect.value = state.frameStyle;
        elements.ctaTextInput.value = state.ctaText;

        const dotOpt = document.querySelector(`#dotStyleGrid .style-option[data-style="${state.dotsStyle}"]`);
        if (dotOpt) {
          document.querySelectorAll('#dotStyleGrid .style-option').forEach(o => o.classList.remove('active'));
          dotOpt.classList.add('active');
        }

        const cornerOpt = document.querySelector(`#cornerSquareGrid .style-option[data-corner="${state.cornerSquareStyle}"]`);
        if (cornerOpt) {
          document.querySelectorAll('#cornerSquareGrid .style-option').forEach(o => o.classList.remove('active'));
          cornerOpt.classList.add('active');
        }

        renderQR();
        showToast(`Applied ${card.querySelector('.preset-name').textContent} Preset`, 'success');
      }
    });

    // 4. Color Swatches
    elements.fgColorPicker.addEventListener('input', (e) => syncColor('fg', e.target.value));
    elements.fgColorHex.addEventListener('input', (e) => {
      let val = e.target.value;
      if (!val.startsWith('#')) val = '#' + val;
      syncColor('fg', val);
    });

    elements.bgColorPicker.addEventListener('input', (e) => syncColor('bg', e.target.value));
    elements.bgColorHex.addEventListener('input', (e) => {
      let val = e.target.value;
      if (!val.startsWith('#')) val = '#' + val;
      syncColor('bg', val);
    });

    // 5. CTA Frame Controls
    elements.frameStyleSelect.addEventListener('change', (e) => {
      state.frameStyle = e.target.value;
      renderQR();
    });

    elements.ctaTextInput.addEventListener('input', (e) => {
      state.ctaText = e.target.value;
      renderQR();
    });

    elements.ctaQuickChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip-text-btn');
      if (!chip) return;
      state.ctaText = chip.dataset.cta;
      elements.ctaTextInput.value = state.ctaText;
      renderQR();
    });

    elements.frameColorPicker.addEventListener('input', (e) => syncColor('frame', e.target.value));
    elements.frameColorHex.addEventListener('input', (e) => {
      let val = e.target.value;
      if (!val.startsWith('#')) val = '#' + val;
      syncColor('frame', val);
    });

    elements.frameTextColorPicker.addEventListener('input', (e) => syncColor('frameText', e.target.value));
    elements.frameTextColorHex.addEventListener('input', (e) => {
      let val = e.target.value;
      if (!val.startsWith('#')) val = '#' + val;
      syncColor('frameText', val);
    });

    // 6. Dot & Corner Styles
    elements.dotStyleGrid.addEventListener('click', (e) => {
      const opt = e.target.closest('.style-option');
      if (!opt) return;

      document.querySelectorAll('#dotStyleGrid .style-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');

      state.dotsStyle = opt.dataset.style;
      renderQR();
    });

    elements.cornerSquareGrid.addEventListener('click', (e) => {
      const opt = e.target.closest('.style-option');
      if (!opt) return;

      document.querySelectorAll('#cornerSquareGrid .style-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');

      state.cornerSquareStyle = opt.dataset.corner;
      state.cornerDotStyle = opt.dataset.corner === 'dot' ? 'dot' : 'square';
      renderQR();
    });

    // 7. Size Presets & Sliders
    elements.sizePresetSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val !== 'custom') {
        state.size = parseInt(val, 10);
        elements.sizeSlider.value = state.size;
        elements.sizeValue.textContent = `${state.size} x ${state.size} px`;
        renderQR();
      }
    });

    elements.sizeSlider.addEventListener('input', (e) => {
      state.size = parseInt(e.target.value, 10);
      elements.sizeValue.textContent = `${state.size} x ${state.size} px`;
      elements.sizePresetSelect.value = 'custom';
      renderQR();
    });

    elements.marginSlider.addEventListener('input', (e) => {
      state.margin = parseInt(e.target.value, 10);
      elements.marginValue.textContent = `${state.margin} px`;
      renderQR();
    });

    elements.ecLevelSelect.addEventListener('change', (e) => {
      state.ecLevel = e.target.value;
      renderQR();
    });

    elements.logoScaleSlider.addEventListener('input', (e) => {
      state.logoScale = parseFloat(e.target.value);
      elements.logoScaleValue.textContent = state.logoScale;
      renderQR();
    });

    // 8. Logo Drag & Drop & Upload Handling
    elements.logoDropzone.addEventListener('click', () => elements.logoFileInput.click());

    ['dragenter', 'dragover'].forEach(evt => {
      elements.logoDropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        elements.logoDropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(evt => {
      elements.logoDropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        elements.logoDropzone.classList.remove('dragover');
      });
    });

    elements.logoDropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files && files[0]) processLogoFile(files[0]);
    });

    elements.logoFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) processLogoFile(e.target.files[0]);
    });

    function processLogoFile(file) {
      if (!file.type.match('image.*')) {
        showToast('Upload a valid PNG, JPG, or SVG image', 'info');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image size exceeds 2MB limit', 'info');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        state.logoUrl = e.target.result;
        state.logoName = file.name;
        state.ecLevel = 'H';
        elements.ecLevelSelect.value = 'H';

        elements.logoDropzone.style.display = 'none';
        elements.logoPreviewWrapper.classList.add('active');
        elements.logoPreviewImg.src = state.logoUrl;
        elements.logoFileName.textContent = file.name;

        renderQR();
        showToast('Logo centered! Error correction set to High (30%)', 'success');
      };
      reader.readAsDataURL(file);
    }

    elements.btnRemoveLogo.addEventListener('click', () => {
      state.logoUrl = null;
      state.logoName = '';
      elements.logoFileInput.value = '';
      elements.logoPreviewWrapper.classList.remove('active');
      elements.logoDropzone.style.display = 'block';
      renderQR();
      showToast('Logo removed', 'info');
    });

    // 9. Accordion Collapsibles
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        item.classList.toggle('active');
      });
    });

    // 10. History Actions
    elements.btnSaveToHistory.addEventListener('click', saveCurrentToHistory);
    elements.btnClearHistory.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your saved QR code history?')) {
        saveHistory([]);
        loadHistoryList();
        showToast('History cleared', 'info');
      }
    });

    // 11. Download & Export Functions (PNG, JPG, SVG)
    elements.btnGenerate.addEventListener('click', () => {
      renderQR();
      showToast('QR Code Rendered!', 'success');
    });

    elements.btnDownloadPng.addEventListener('click', () => {
      getExportCanvas((canvas) => {
        const link = document.createElement('a');
        link.download = `nesiify-qr-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('Downloaded High-Res PNG!', 'success');
      });
    });

    elements.btnDownloadJpg.addEventListener('click', () => {
      getExportCanvas((canvas) => {
        const link = document.createElement('a');
        link.download = `nesiify-qr-${Date.now()}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
        showToast('Downloaded High-Res JPG!', 'success');
      });
    });

    elements.btnDownloadSvg.addEventListener('click', () => {
      if (!qrCode) return;
      qrCode.download({ name: `nesiify-qr-${Date.now()}`, extension: 'svg' });
      showToast('Downloaded Vector SVG!', 'success');
    });

    // 12. Web Share API & Copy Clipboard
    elements.btnWebShare.addEventListener('click', async () => {
      getExportCanvas(async (canvas) => {
        canvas.toBlob(async (blob) => {
          if (!blob) return;

          const file = new File([blob], 'nesiify-qr.png', { type: 'image/png' });

          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                title: 'Nesiify QR Code',
                text: 'Created with Nesiify QR Generator',
                files: [file]
              });
              showToast('Shared successfully!', 'success');
            } catch (err) {
              // User cancelled share
            }
          } else {
            // Fallback: Copy link
            navigator.clipboard.writeText(getQRContentData());
            showToast('Sharing not supported: Data copied to clipboard!', 'info');
          }
        });
      });
    });

    elements.btnCopyClipboard.addEventListener('click', () => {
      getExportCanvas((canvas) => {
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            showToast('QR Code image copied to clipboard!', 'success');
          } catch (err) {
            showToast('Copying image not supported on this browser', 'info');
          }
        });
      });
    });

    // 13. Reset All Settings Action
    elements.btnResetAll.addEventListener('click', () => {
      state = { ...DEFAULT_STATE };

      elements.urlInput.value = 'https://nesiify.com';
      elements.urlCounter.textContent = '0 / 500';
      elements.textInput.value = '';
      elements.phoneInput.value = '';
      elements.emailRecipient.value = '';
      elements.emailSubject.value = '';
      elements.emailBody.value = '';
      elements.waPhone.value = '';
      elements.waMessage.value = '';
      elements.wifiSsid.value = '';
      elements.wifiPassword.value = '';
      elements.mapsQuery.value = '';
      elements.vFirstName.value = '';
      elements.vLastName.value = '';
      elements.vOrg.value = '';

      document.querySelector('.tab-btn[data-type="url"]').click();

      syncColor('fg', DEFAULT_STATE.fgColor);
      syncColor('bg', DEFAULT_STATE.bgColor);
      syncColor('frame', DEFAULT_STATE.frameColor);
      syncColor('frameText', DEFAULT_STATE.frameTextColor);

      elements.frameStyleSelect.value = DEFAULT_STATE.frameStyle;
      elements.ctaTextInput.value = DEFAULT_STATE.ctaText;

      document.querySelector('#dotStyleGrid .style-option[data-style="square"]').click();
      document.querySelector('#cornerSquareGrid .style-option[data-corner="square"]').click();

      elements.sizeSlider.value = DEFAULT_STATE.size;
      elements.sizeValue.textContent = `${DEFAULT_STATE.size} x ${DEFAULT_STATE.size} px`;
      elements.sizePresetSelect.value = '300';

      elements.marginSlider.value = DEFAULT_STATE.margin;
      elements.marginValue.textContent = `${DEFAULT_STATE.margin} px`;

      elements.ecLevelSelect.value = DEFAULT_STATE.ecLevel;

      if (state.logoUrl) elements.btnRemoveLogo.click();

      renderQR();
      showToast('Restored default settings', 'info');
    });

    // 14. Mobile Quick Bar Event Listeners
    if (elements.mobileJumpToPreviewBtn && elements.previewColumn) {
      elements.mobileJumpToPreviewBtn.addEventListener('click', () => {
        elements.previewColumn.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    if (elements.mobileQuickDownloadBtn) {
      elements.mobileQuickDownloadBtn.addEventListener('click', () => {
        elements.btnDownloadPng.click();
      });
    }

  }

  // --- Mobile Mini Preview Thumbnail Renderer ---
  function updateMobileMiniThumb() {
    if (!elements.mobileMiniQrThumb) return;
    getExportCanvas((canvas) => {
      if (!canvas) return;
      elements.mobileMiniQrThumb.innerHTML = '';
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/png');
      img.alt = 'QR Thumbnail';
      elements.mobileMiniQrThumb.appendChild(img);
    });
  }

  // --- Toast Notification Engine ---
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? '✓' : 'ℹ';
    toast.innerHTML = `<span style="font-weight: 800; color: var(--accent-cyan);">${icon}</span> ${escapeHtml(message)}`;

    elements.toastContainer.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Run Application
  init();

});
