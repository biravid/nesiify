// Custom data configuration for the surprise website (Peacock Feather Theme Version).
const CONFIG = {
  // Website configuration
  birthdayDate: "2026-10-24T00:00:00", // Target date for countdown (YYYY-MM-DDTHH:mm:ss)
  recipientName: "Sophia", // Name of the birthday girl
  senderName: "Alex", // Your name

  // Peacock Feather Theme Customization
  theme: {
    primaryColor: "#0f4c81", // Deep Royal Peacock Sapphire Blue
    secondaryColor: "#d4af37", // Regal Shimmering Gold
    textColorDark: "#0e2238", // Deep Midnight Peacock Blue/Navy
    textColorLight: "#f2f7f6", // Light Silk Cream
    fontFamilyTitle: "'Cormorant Garamond', serif", // High-end elegant display serif
    fontFamilyBody: "'Montserrat', sans-serif" // Sophisticated clean body font
  },

  // Hero Section
  hero: {
    title: "Happy Birthday, Sophia! 🦚✨",
    subTitle: "Welcome to your royal digital corner. A majestic journey through our love, precious memories, and everything that makes you extraordinary to me.",
    ctaText: "Begin the Regal Journey 👑",
    backgroundImage: "images/photo1.jpeg" // Will fall back to royal peacock gradient if missing
  },

  // Story / About Section
  story: {
    title: "Our Royal Story 🦚",
    paragraphs: [
      "From the very first moment we talked, I knew there was something exceptionally special about you. Your smile, your laugh, and the warmth you bring into my life have turned ordinary days into unforgettable adventures.",
      "Every single day spent with you is a gift. You've taught me what love truly means, and I am so grateful for all the quiet moments, the loud laughs, and the beautiful dreams we share.",
      "This website is a tiny celebration of you—your beauty, your kindness, and the incredible person you are. Happy Birthday, my love!"
    ],
    image: "images/photo10.jpeg" // Will fall back to gradient if missing
  },

  // Interactive Love Letter
  letter: {
    title: "A Letter For You 💌",
    greeting: "Dearest Sophia,",
    body: "I wanted to write you something that you could keep forever. Words often fall short when I try to describe how much you mean to me, but here is my honest attempt. You are my best friend, my greatest comfort, and my favorite adventure. Thank you for being your beautiful, authentic self. Thank you for choosing to walk this path with me. I love you more than words can say. Happy Birthday!",
    closing: "Always & Forever,",
    signature: "Alex"
  },

  // Countdown Section Messages
  countdown: {
    preMessage: "Counting down to your regal day... ⏳💎",
    activeMessage: "Happy Birthday, My Queen! The celebration is live! 🎉",
    postMessage: "Celebrating another royal year of you. 🦚"
  },

  // Memory Timeline
  timeline: [
    {
      date: "October 12, 2024",
      title: "First Met 👑",
      desc: "The day our worlds crossed and my life changed forever. That first conversation started it all.",
      image: "images/photo2.jpeg"
    },
    {
      date: "December 25, 2024",
      title: "First Christmas Together 🎄",
      desc: "Under the twinkling lights, I realized you were the only gift I would ever need.",
      image: "images/photo3.jpeg"
    },
    {
      date: "May 14, 2025",
      title: "Our First Road Trip 🚗",
      desc: "Getting lost on winding roads, singing along to our favorite songs at the top of our lungs.",
      image: "images/photo4.jpeg"
    },
    {
      date: "July 7, 2025",
      title: "Celebrating under the Stars 🌟",
      desc: "A quiet beach night talking about our dreams, watching the stars align.",
      image: "images/photo5.jpeg"
    }
  ],

  // Masonry Photo Gallery (8 images)
  gallery: [
    { image: "images/photo1.jpeg", caption: "Your beautiful smile that brightens my darkest days." },
    { image: "images/photo2.jpeg", caption: "The cozy afternoon where time stood completely still." },
    { image: "images/photo3.jpeg", caption: "That spontaneous picture I love so much." },
    { image: "images/photo4.jpeg", caption: "A memory etched forever in my heart." },
    { image: "images/photo5.jpeg", caption: "Adventure is wherever I am with you." },
    { image: "images/photo6.jpeg", caption: "Making memories one laugh at a time." },
    { image: "images/photo7.jpeg", caption: "Under the warm glow of the summer sun." },
    { image: "images/photo8.jpeg", caption: "Holding your hand is my favorite place to be." }
  ],

  // Polaroid Memory Wall
  polaroids: [
    { image: "images/photo1.jpeg", caption: "Pure Happiness ☀️" },
    { image: "images/photo3.jpeg", caption: "My Favorite Smile ❤️" },
    { image: "images/photo5.jpeg", caption: "Partners in Crime 🕶️" },
    { image: "images/photo7.jpeg", caption: "A Quiet Moment ☕" }
  ],

  // Reasons Why I Love You
  reasons: [
    {
      emoji: "🌟",
      title: "Your Kind Heart",
      desc: "You show kindness to everyone you meet, reminding me daily of the beauty in this world."
    },
    {
      emoji: "😂",
      title: "Your Goofy Laugh",
      desc: "That special laugh of yours is the absolute best sound on earth. It immediately cures my bad days."
    },
    {
      emoji: "💪",
      title: "Your Strength",
      desc: "How gracefully you handle challenges inspire me to be a better person every single day."
    },
    {
      emoji: "🌸",
      title: "Your Inner Radiance",
      desc: "You bring warmth, light, and comfortable silence wherever you walk."
    },
    {
      emoji: "🍳",
      title: "Our Shared Dreams",
      desc: "Planning the future with you makes me so excited for the days, months, and years to come."
    },
    {
      emoji: "☕",
      title: "The Little Things",
      desc: "How you hold my hand, make me coffee, and remember details I forgot myself."
    }
  ],

  // Quotes Carousel
  quotes: [
    "“In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.” — Maya Angelou",
    "“I love you not only for what you are, but for what I am when I am with you.” — Roy Croft",
    "“If I had a flower for every time I thought of you... I could walk through my garden forever.” — Alfred Tennyson",
    "“You are my today and all of my tomorrows.” — Leo Christopher"
  ],

  // Background Music Settings
  music: {
    title: "Sweet Romantic Melody",
    artist: "Relaxing Love Themes",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },

  // Secret Password Section
  secret: {
    password: "love",
    hint: "Hint: What makes the world go round? (4 letters, lowercase)",
    title: "🔒 A Locked Surprise",
    lockedMessage: "Enter the secret key to unlock a very special note meant only for your eyes...",
    unlockedMessage: "💌 Surprise! You unlocked the secret note! My favorite promise to you: I promise to choose you, every single day, to support your wildest dreams, to laugh with you, cry with you, and love you fiercely through every season of life. You are my home. Happy Birthday!"
  },

  // Interactive Gift Box Section
  giftBox: {
    messageBeforeOpen: "Click the gift to unwrap your birthday surprise! 🎁",
    messageAfterOpen: "Yay! Happy Birthday! 🎉 Enjoy this beautiful page created just for you!",
    surpriseCardTitle: "Special Birthday Coupon 🎟️",
    surpriseCardDesc: "Valid for: One full day of pampered royal treatment, your favorite dinner, and a movie night of your choosing. No exceptions!"
  },

  // Optional Special Modes
  specialModes: {
    snow: false,
    rain: false,
    hearts: true,
    stars: true
  }
};
