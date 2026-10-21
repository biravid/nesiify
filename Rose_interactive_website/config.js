/**
 * Nesiify Cinematic Surprise Opening Configuration
 * Customize recipient name, subtitles, sender name, timing, and Floating Rose Garden memories.
 * You can also override via URL parameters:
 *   ?name=YourName
 *   ?sender=YourName
 *   ?initials=A
 *   ?target=../Paralax-pink/index.html
 */

window.SURPRISE_CONFIG = {
  // Recipient Name shown when bubbles merge
  recipientName: "Ananya",

  // Romantic subtitle / tagline shown underneath the name
  subtitle: "Every moment is a memory waiting to blossom ✨",

  // Sender name / dynamic note revealed in the envelope
  senderName: "Someone who adores you",
  envelopeNote: "Made especially for you ❤️",
  finalMessage: "No matter where life takes us,\nyou will always have my heart.\nThank you for filling my world\nwith warmth, wonder, and endless love. ❤️",

  // Target Nesiify site URL to open if needed in future
  targetUrl: "../Paralax-pink/index.html",

  // Timing configuration (in milliseconds)
  timings: {
    countdownInterval: 2000,    // 2 seconds per number (3, 2, 1)
    bubbleFloatDuration: 2200,  // time bubbles float before merging
    bubbleMergeDuration: 900,   // time taken to merge into name
    flowerBloomDuration: 2600,  // time taken for flowers to blossom
  },

  // Floating Rose Garden Experience
  roseGarden: {
    title: "Some memories are meant to be picked. 🌹",
    subtitle: "Pick a rose",
    initials: "A", // Recipient initials displayed in bouquet center
    roses: [
      {
        id: 1,
        caption: "A moment worth keeping ❤️",
        image: "",
        fallbackText: "Our First Memory"
      },
      {
        id: 2,
        caption: "Where time stood still ✨",
        image: "",
        fallbackText: "Unforgettable Moments"
      },
      {
        id: 3,
        caption: "Laughter we'll never forget 🥰",
        image: "",
        fallbackText: "Pure Happiness"
      },
      {
        id: 4,
        caption: "Forever grateful for you 💖",
        image: "",
        fallbackText: "Cherished Forever"
      }
    ]
  },

  // Audio settings (generates dynamic crystal chime sounds via Web Audio API)
  audio: {
    enabled: true,
    volume: 0.35,
  },

  // Stage "Choose Your Moment" Configuration
  moments: {
    message: {
      headline: "Someone has something to tell you...",
      subtext: "Tap to open",
      body: "Every single day with you is a gift. Thank you for being my smile, my comfort, and my favorite adventure. I'm so lucky to have you in my life. ❤️"
    },
    song: {
      title: "Kaadhal En Kaviye",
      prompt: "There's a song that reminds me of you...",
      audioSrc: "../Paralax-pink/images/Kaadhal-En-Kaviye.mp3"
    }
  },

  // Stage "I LOVE YOU — HEART REVEAL" Configuration
  heartReveal: {
    enabled: true,
    introText: "There's something I've been wanting to say...",
    particleText: "I LOVE YOU",
    finalSubtext: "Some words are worth saying again...",
    finalText: "I LOVE YOU ❤️",
    continueText: "Continue →"
  },

  // Color theme accents
  theme: {
    primaryGlow: "rgba(255, 182, 193, 0.8)", // Rose gold / soft pink
    secondaryGlow: "rgba(255, 215, 0, 0.6)",  // Champagne gold
    accentColor: "#fbc2eb",
    textColor: "#fff5f8",
  },

  // Bubble settings
  bubbles: {
    count: 24,
    colors: [
      "rgba(255, 192, 203, 0.6)",
      "rgba(255, 223, 186, 0.6)",
      "rgba(225, 204, 255, 0.6)",
      "rgba(186, 225, 255, 0.55)",
      "rgba(255, 240, 245, 0.7)"
    ]
  }
};

// Allow URL parameter overrides
(function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("name")) {
    window.SURPRISE_CONFIG.recipientName = params.get("name");
    // Automatically set initials from first character if not provided
    window.SURPRISE_CONFIG.roseGarden.initials = params.get("name").charAt(0).toUpperCase();
  }
  if (params.has("initials")) {
    window.SURPRISE_CONFIG.roseGarden.initials = params.get("initials").toUpperCase();
  }
  if (params.has("sender")) {
    window.SURPRISE_CONFIG.senderName = params.get("sender");
  }
  if (params.has("from")) {
    window.SURPRISE_CONFIG.senderName = params.get("from");
  }
  if (params.has("note")) {
    window.SURPRISE_CONFIG.envelopeNote = params.get("note");
  }
  if (params.has("final")) {
    window.SURPRISE_CONFIG.finalMessage = params.get("final");
  }
  if (params.has("message")) {
    window.SURPRISE_CONFIG.finalMessage = params.get("message");
  }
  if (params.has("target")) {
    window.SURPRISE_CONFIG.targetUrl = params.get("target");
  }
  if (params.has("subtitle")) {
    window.SURPRISE_CONFIG.subtitle = params.get("subtitle");
  }
  if (params.has("heartIntro")) {
    window.SURPRISE_CONFIG.heartReveal.introText = params.get("heartIntro");
  }
  if (params.has("heartText")) {
    window.SURPRISE_CONFIG.heartReveal.finalText = params.get("heartText");
  }
  if (params.has("sound") && params.get("sound") === "false") {
    window.SURPRISE_CONFIG.audio.enabled = false;
  }
})();
