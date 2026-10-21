/* ==========================================================================
   NESIIFY VINTAGE POSTCARD STUDIO - QR CODE INTEGRATION & STAMP HELPER
   ========================================================================== */

let qrCodeInstance = null;

/**
 * Generates or updates the QR Code inside the vintage postage stamp container
 * @param {string} url - The URL to encode
 */
function updatePostcardQRCode(url) {
  const container = document.getElementById('stampQrContainer');
  if (!container) return;

  container.innerHTML = '';
  const cleanUrl = url ? url.trim() : '';

  if (!cleanUrl) {
    container.innerHTML = `
      <div style="font-size: 0.55rem; color: #888; text-align: center; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100%;">
        Enter Link
      </div>
    `;
    return;
  }

  if (typeof QRCode !== 'undefined') {
    try {
      new QRCode(container, {
        text: cleanUrl,
        width: 120,
        height: 120,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });

      // Synchronize canvas to crisp visible <img> tag for 100% canvas export compatibility
      setTimeout(() => {
        const canvas = container.querySelector('canvas');
        let img = container.querySelector('img');
        if (canvas) {
          try {
            const dataUrl = canvas.toDataURL('image/png');
            if (!img) {
              img = document.createElement('img');
              container.appendChild(img);
            }
            img.src = dataUrl;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.display = 'block';
            canvas.style.display = 'none';
          } catch (e) {
            if (img) img.style.display = 'block';
          }
        } else if (img) {
          img.style.display = 'block';
          img.style.width = '100%';
          img.style.height = '100%';
        }
      }, 50);
    } catch (e) {
      renderFallbackQRCode(container, cleanUrl);
    }
  } else {
    renderFallbackQRCode(container, cleanUrl);
  }
}

/**
 * Fallback QR Code image rendering via reliable public API if CDN script isn't loaded
 */
function renderFallbackQRCode(container, url) {
  const encoded = encodeURIComponent(url);
  const img = document.createElement('img');
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encoded}`;
  img.alt = "Surprise QR Code Stamp";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.display = "block";
  img.onerror = () => {
    // If offline or API fails, render clean SVG stamp placeholder
    container.innerHTML = `
      <div style="font-size: 0.6rem; color: #4a3427; font-family: monospace; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; width: 100%; border: 1px dashed #8c6446; background: #fffdf9;">
        <span style="font-size: 1.2rem;">📱</span>
        <span style="font-weight: bold; margin-top: 2px;">QR STAMP</span>
      </div>
    `;
  };
  container.appendChild(img);
}

/**
 * Validates whether the given string is a valid HTTP/HTTPS URL
 */
function isValidURL(string) {
  if (!string) return false;
  try {
    const url = new URL(string.startsWith('http') ? string : `https://${string}`);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

/**
 * Opens the surprise website in a new window/tab for verification
 */
function testSurpriseURL(url) {
  if (!url || !url.trim()) {
    showToast("Please enter a Surprise Website URL first!", "warning");
    return;
  }

  let finalUrl = url.trim();
  if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
    finalUrl = 'https://' + finalUrl;
  }

  window.open(finalUrl, '_blank', 'noopener,noreferrer');
  showToast("Opening surprise URL in new tab...", "info");
}
