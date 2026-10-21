/* ==========================================================================
   NESIIFY VINTAGE POSTCARD STUDIO - INTERACTIVE STICKERS ENGINE
   ========================================================================== */

const STICKER_CATALOG = [
  { id: 'heart-red', icon: '❤️', label: 'Red Heart' },
  { id: 'heart-sparkles', icon: '💖', label: 'Sparkle Heart' },
  { id: 'heart-ribbon', icon: '💝', label: 'Ribbon Heart' },
  { id: 'rose-flower', icon: '🌹', label: 'Red Rose' },
  { id: 'cherry-blossom', icon: '🌸', label: 'Cherry Blossom' },
  { id: 'bouquet', icon: '💐', label: 'Flower Bouquet' },
  { id: 'teddy-bear', icon: '🧸', label: 'Teddy Bear' },
  { id: 'glowing-star', icon: '⭐', label: 'Golden Star' },
  { id: 'sparkles', icon: '✨', label: 'Sparkles' },
  { id: 'pink-bow', icon: '🎀', label: 'Cute Ribbon Bow' },
  { id: 'fluffy-cloud', icon: '☁️', label: 'Cloud' },
  { id: 'butterfly', icon: '🦋', label: 'Butterfly' },
  { id: 'gift-box', icon: '🎁', label: 'Gift Box' },
  { id: 'love-letter', icon: '💌', label: 'Love Letter' },
  { id: 'wax-seal-icon', icon: '🏷️', label: 'Vintage Tag' },
  { id: 'cupid-arrow', icon: '💘', label: 'Cupid Heart' },
  { id: 'crown', icon: '👑', label: 'Golden Crown' },
  { id: 'ring', icon: '💍', label: 'Diamond Ring' }
];

let placedStickers = [];
let activeStickerId = null;
let zIndexCounter = 20;

/**
 * Initializes the sticker tray in the sidebar
 */
function initStickerGallery() {
  const gallery = document.getElementById('stickerGallery');
  if (!gallery) return;

  gallery.innerHTML = '';
  STICKER_CATALOG.forEach(sticker => {
    const item = document.createElement('div');
    item.className = 'sticker-item';
    item.setAttribute('title', sticker.label);
    item.innerHTML = sticker.icon;
    item.addEventListener('click', () => addStickerToPostcard(sticker));
    gallery.appendChild(item);
  });
}

/**
 * Adds a new sticker to the postcard preview
 */
function addStickerToPostcard(stickerData, savedState = null) {
  const layer = document.getElementById('postcardStickersLayer');
  if (!layer) return;

  const id = savedState ? savedState.id : `sticker-${Date.now()}-${Math.floor(Math.random()*1000)}`;
  const x = savedState ? savedState.x : 30 + Math.random() * 40; // Percentage
  const y = savedState ? savedState.y : 30 + Math.random() * 40;
  const scale = savedState ? savedState.scale : 1.0;
  const rotate = savedState ? savedState.rotate : Math.floor(Math.random() * 20 - 10);
  const zIndex = savedState ? savedState.zIndex : ++zIndexCounter;

  const stickerElem = document.createElement('div');
  stickerElem.className = 'placed-sticker';
  stickerElem.id = id;
  stickerElem.style.left = `${x}%`;
  stickerElem.style.top = `${y}%`;
  stickerElem.style.zIndex = zIndex;
  stickerElem.style.transform = `scale(${scale}) rotate(${rotate}deg)`;

  stickerElem.innerHTML = `
    <span class="placed-sticker-content">${stickerData.icon}</span>
    <div class="sticker-delete-handle" title="Remove Sticker">&times;</div>
  `;

  // Store data model
  const stickerObj = {
    id,
    stickerData,
    x,
    y,
    scale,
    rotate,
    zIndex,
    elem: stickerElem
  };

  placedStickers.push(stickerObj);
  layer.appendChild(stickerElem);

  // Setup Drag & Interaction
  setupStickerInteractions(stickerObj);

  // Select newly added sticker
  selectSticker(id);

  if (!savedState) {
    showToast("Sticker added! Click & drag to position.", "info");
  }
}

/**
 * Selects a sticker and updates active controls
 */
function selectSticker(id) {
  activeStickerId = id;
  document.querySelectorAll('.placed-sticker').forEach(el => {
    if (el.id === id) {
      el.classList.add('selected');
    } else {
      el.classList.remove('selected');
    }
  });

  const controlsBar = document.getElementById('stickerControlsBar');
  const activeObj = placedStickers.find(s => s.id === id);

  if (controlsBar && activeObj) {
    controlsBar.style.display = 'flex';
    const scaleInput = document.getElementById('stickerScaleInput');
    const rotateInput = document.getElementById('stickerRotateInput');
    if (scaleInput) scaleInput.value = activeObj.scale;
    if (rotateInput) rotateInput.value = activeObj.rotate;
  }
}

/**
 * Deselects all active stickers
 */
function deselectAllStickers() {
  activeStickerId = null;
  document.querySelectorAll('.placed-sticker').forEach(el => el.classList.remove('selected'));
  const controlsBar = document.getElementById('stickerControlsBar');
  if (controlsBar) controlsBar.style.display = 'none';
}

/**
 * Attaches drag, scale, rotate, delete, and touch events to a sticker
 */
function setupStickerInteractions(stickerObj) {
  const elem = stickerObj.elem;
  const deleteBtn = elem.querySelector('.sticker-delete-handle');

  // Select on click
  elem.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    selectSticker(stickerObj.id);
    initDrag(e, stickerObj);
  });

  elem.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    selectSticker(stickerObj.id);
    initTouchDrag(e, stickerObj);
  }, { passive: false });

  // Delete handle
  if (deleteBtn) {
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeSticker(stickerObj.id);
    });
  }
}

/**
 * Mouse Drag Logic (Percentages relative to postcard container)
 */
function initDrag(e, stickerObj) {
  if (e.target.classList.contains('sticker-delete-handle')) return;

  const layer = document.getElementById('postcardStickersLayer');
  const layerRect = layer.getBoundingClientRect();

  let startX = e.clientX;
  let startY = e.clientY;
  let initialLeft = (stickerObj.x / 100) * layerRect.width;
  let initialTop = (stickerObj.y / 100) * layerRect.height;

  function onMouseMove(moveEvent) {
    const deltaX = moveEvent.clientX - startX;
    const deltaY = moveEvent.clientY - startY;

    let newLeftPx = initialLeft + deltaX;
    let newTopPx = initialTop + deltaY;

    // Convert back to percentages
    stickerObj.x = Math.max(0, Math.min(92, (newLeftPx / layerRect.width) * 100));
    stickerObj.y = Math.max(0, Math.min(92, (newTopPx / layerRect.height) * 100));

    stickerObj.elem.style.left = `${stickerObj.x}%`;
    stickerObj.elem.style.top = `${stickerObj.y}%`;
  }

  function onMouseUp() {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
}

/**
 * Touch Drag Logic for Mobile Devices
 */
function initTouchDrag(e, stickerObj) {
  if (e.target.classList.contains('sticker-delete-handle')) return;
  const touch = e.touches[0];

  const layer = document.getElementById('postcardStickersLayer');
  const layerRect = layer.getBoundingClientRect();

  let startX = touch.clientX;
  let startY = touch.clientY;
  let initialLeft = (stickerObj.x / 100) * layerRect.width;
  let initialTop = (stickerObj.y / 100) * layerRect.height;

  function onTouchMove(moveEvent) {
    if (moveEvent.touches.length > 0) {
      const moveTouch = moveEvent.touches[0];
      const deltaX = moveTouch.clientX - startX;
      const deltaY = moveTouch.clientY - startY;

      let newLeftPx = initialLeft + deltaX;
      let newTopPx = initialTop + deltaY;

      stickerObj.x = Math.max(0, Math.min(92, (newLeftPx / layerRect.width) * 100));
      stickerObj.y = Math.max(0, Math.min(92, (newTopPx / layerRect.height) * 100));

      stickerObj.elem.style.left = `${stickerObj.x}%`;
      stickerObj.elem.style.top = `${stickerObj.y}%`;
    }
  }

  function onTouchEnd() {
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
  }

  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('touchend', onTouchEnd);
}

/**
 * Removes a sticker by ID
 */
function removeSticker(id) {
  const index = placedStickers.findIndex(s => s.id === id);
  if (index !== -1) {
    const obj = placedStickers[index];
    if (obj.elem && obj.elem.parentNode) {
      obj.elem.parentNode.removeChild(obj.elem);
    }
    placedStickers.splice(index, 1);
    if (activeStickerId === id) {
      deselectAllStickers();
    }
  }
}

/**
 * Clears all stickers from the postcard
 */
function clearAllStickers() {
  placedStickers.forEach(obj => {
    if (obj.elem && obj.elem.parentNode) {
      obj.elem.parentNode.removeChild(obj.elem);
    }
  });
  placedStickers = [];
  deselectAllStickers();
}

/**
 * Updates the active sticker's scale & rotate transforms
 */
function updateActiveStickerTransform() {
  if (!activeStickerId) return;
  const obj = placedStickers.find(s => s.id === activeStickerId);
  if (!obj) return;

  const scaleInput = document.getElementById('stickerScaleInput');
  const rotateInput = document.getElementById('stickerRotateInput');

  if (scaleInput) obj.scale = parseFloat(scaleInput.value);
  if (rotateInput) obj.rotate = parseInt(rotateInput.value, 10);

  obj.elem.style.transform = `scale(${obj.scale}) rotate(${obj.rotate}deg)`;
}

/**
 * Adjusts Z-Index layer order
 */
function changeActiveStickerZIndex(direction) {
  if (!activeStickerId) return;
  const obj = placedStickers.find(s => s.id === activeStickerId);
  if (!obj) return;

  if (direction === 'up') {
    obj.zIndex = ++zIndexCounter;
  } else if (direction === 'down') {
    obj.zIndex = Math.max(1, obj.zIndex - 1);
  }
  obj.elem.style.zIndex = obj.zIndex;
}

/**
 * Serializes stickers for saving to LocalStorage
 */
function getStickersState() {
  return placedStickers.map(s => ({
    id: s.id,
    stickerData: s.stickerData,
    x: s.x,
    y: s.y,
    scale: s.scale,
    rotate: s.rotate,
    zIndex: s.zIndex
  }));
}

/**
 * Restores saved stickers state
 */
function restoreStickersState(stateArray) {
  clearAllStickers();
  if (Array.isArray(stateArray)) {
    stateArray.forEach(savedState => {
      addStickerToPostcard(savedState.stickerData, savedState);
    });
  }
}
