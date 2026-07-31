/**
 * ANNIVERSARY DIGITAL SURPRISE CONFIGURATION
 * 
 * Replace the values below with your own personal details, photos, messages, and dates!
 * This configuration makes it easy to host on free static hosts (GitHub Pages, Netlify, Vercel).
 */

const ANNIVERSARY_CONFIG = {
  // Couple Information & Hero Section
  couple: {
    partner1: "Karthika",
    partner2: "Rahul",
    yearsTogether: "5 Years",
    anniversaryDate: "2026-07-20", // YYYY-MM-DD for countdown
    heroTitle: "Karthika & Rahul",
    anniversaryWishes: "Happy 5th Anniversary, my love! Five years of laughter, endless memories, and unconditional love that grows stronger every single day.",
    heroImage: "images/hero.svg"
  },

  // Audio Configuration (Background Music)
  audio: {
    // High quality romantic royalty-free background track URL (or local relative MP3 file in images/ or media/)
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-wedding-love-116049.mp3",
    autoplayMessage: "Tap anywhere to begin our romantic sound journey 🎵"
  },

  // Visual Effects Toggles
  effects: {
    floatingHearts: true,
    floatingBalloons: true,
    fireworks: true,
    confetti: true
  },

  // Love Journey Timeline Milestones
  timeline: [
    {
      date: "October 14, 2021",
      title: "The First Spark",
      subtitle: "Where our story began",
      description: "A simple coffee catch-up turned into a 4-hour conversation under the starlight. I knew right then my life was changed forever.",
      image: "images/timeline-1.svg",
      icon: "☕"
    },
    {
      date: "February 14, 2022",
      title: "Our First Official Date",
      subtitle: "Candlelight & Magic",
      description: "Dinner by the bay with nervous giggles, shared dessert, and the sweetest first kiss under the moonlit sky.",
      image: "images/timeline-2.svg",
      icon: "🕯️"
    },
    {
      date: "December 25, 2024",
      title: "The Forever Promise",
      subtitle: "Saying 'I Love You'",
      description: "Surrounded by festive lights, holding hands in the crisp winter air, we promised each other a lifetime of adventures.",
      image: "images/timeline-3.svg",
      icon: "💍"
    },
    {
      date: "July 20, 2026",
      title: "Celebrating Today",
      subtitle: "5 Years & Beyond",
      description: "Looking back at every obstacle we conquered and every joy we shared. Here is to eternity together!",
      image: "images/timeline-4.svg",
      icon: "💖"
    }
  ],

  // Gallery of Memories with Captions
  gallery: [
    {
      title: "Sunset Beach Walk",
      caption: "Barefoot in the sand, watching the horizon turn to pure gold.",
      image: "images/gallery-1.svg",
      category: "Travel"
    },
    {
      title: "Starlit Night",
      caption: "Counting shooting stars while wrapped in a warm blanket.",
      image: "images/gallery-2.svg",
      category: "Special Moments"
    },
    {
      title: "First Road Trip",
      caption: "Singing along to our favorite songs with open windows and endless roads.",
      image: "images/gallery-3.svg",
      category: "Adventures"
    },
    {
      title: "Cozy Cabin Weekend",
      caption: "Hot cocoa, crackling fireplace, and endless laughter.",
      image: "images/gallery-4.svg",
      category: "Cozy Times"
    }
  ],

  // Polaroid Memories Section
  polaroids: [
    {
      caption: "Our Silly Laughs 📸",
      date: "Summer '23",
      image: "images/polaroid-1.svg",
      rotation: -5
    },
    {
      caption: "Surprises & Roses 🌹",
      date: "Valentine '24",
      image: "images/polaroid-2.svg",
      rotation: 4
    },
    {
      caption: "First Flight Together ✈️",
      date: "Autumn '25",
      image: "images/polaroid-3.svg",
      rotation: -3
    }
  ],

  // Interactive Love Letter Content
  loveLetter: {
    password: "love", // Secret password to unseal the letter (e.g. "love", "1402", "karthika")
    passwordHint: "💡 Hint: The special 4-letter word that binds our hearts forever (e.g. 'love') ❤️",
    salutation: "My Dearest Karthika,",
    heading: "To My Soulmate and Best Friend",
    body: [
      "Words often fall short when I try to describe how much you mean to me. From the very moment you entered my life, every day has felt brighter, sweeter, and infinitely more meaningful.",
      "Thank you for being my anchor during tough times, my partner in every crazy adventure, and my daily source of pure joy. Your warm smile is my favorite sight, and your voice is my favorite sound.",
      "As we celebrate our anniversary today, I want to promise you that my love for you isn't just for today or tomorrow—it is unconditional, timeless, and everlasting. I would choose you in every lifetime."
    ],
    signOff: "Yours Forever and Always,",
    senderName: "Rahul ❤️"
  },

  // Interactive Exploding Gift Box Surprise
  giftSurprise: {
    title: "Surprise Milestone Unlocked! 🎁✨",
    subtitle: "A Special Anniversary Gift For You",
    message: "Pack your bags! We are heading on a romantic getaway trip to Paris & Rome next month to celebrate our love journey!",
    image: "images/gift-surprise.svg"
  },

  // Automated Love Note Email Configuration
  email: {
    recipientEmail: "biravid26@gmail.com", // Target email address
    subject: "A Special Anniversary Note From Your Love 💌",
    // EmailJS Credentials (optional for direct API sending; mailto works out-of-the-box!)
    emailjsPublicKey: "", // e.g. "user_12345"
    emailjsServiceId: "", // e.g. "service_12345"
    emailjsTemplateId: "" // e.g. "template_12345"
  }
};
