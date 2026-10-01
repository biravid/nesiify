/**
 * ====================================================================
 * BOYFRIEND DAY SURPRISE - CONFIGURATION & DATA FILE
 * ====================================================================
 * Real boyfriend photos loaded from the local images/ folder.
 */

const SURPRISE_CONFIG = {
  // Boyfriend details
  boyfriend: {
    nickname: "Purushoth Mama", // You can change this to his real name or nickname
    title: "World's Best Boyfriend",
    avatarLetter: "A", // Letter shown in Google top-right account avatar
    accountEmail: "best.boyfriend@love.gmail.com"
  },

  // Search suggestions when typing in the search bar
  searchSuggestions: [
    "who is the best boyfriend",
    "who is the best boyfriend in the world",
    "who is the best boyfriend for me",
    "who is my favorite person",
    "best boyfriend ever",
    "why is he so handsome and kind",
    "how did I get so lucky to have him"
  ],

  // ====================================================================
  // FEATURED KEY IMAGES (Easily modify these specific paths anytime!)
  // ====================================================================
  featuredImages: {
    // 1. Thumbnail next to Google organic search result #2
    searchResultThumbnail: "images/photo1.jpeg",

    // 2. Main picture in Google's side Knowledge Panel
    knowledgePanelImage: "images/photo10.jpeg",

    // 3. Central photo in the Boyfriend Day Hero Spotlight award card
    heroSpotlightImage: "images/photo9.jpeg",

    // 4. Default screen photo for the mock video player
    videoPlayerDefaultImage: "images/photo18.jpeg"
  },

  // Real boyfriend photos from local images/ folder
  photos: [
    {
      id: "photo-1",
      url: "images/photo1.jpeg",
      caption: "That smile ❤️",
      tag: "His Smile",
      resolution: "1280 × 850",
      details: "The smile that brightens up even my darkest days."
    },
    {
      id: "photo-2",
      url: "images/photo2.jpeg",
      caption: "Favorite person in the world",
      tag: "Handsome",
      resolution: "1024 × 768",
      details: "Always looking so handsome without even trying."
    },
    {
      id: "photo-3",
      url: "images/photo3.jpeg",
      caption: "One of my favorite memories",
      tag: "Memories",
      resolution: "1400 × 900",
      details: "Remember that peaceful afternoon we spent laughing together?"
    },
    {
      id: "photo-4",
      url: "images/photo4.jpeg",
      caption: "Best boyfriend award holder 🏆",
      tag: "Candid",
      resolution: "1200 × 800",
      details: "Candid shot when you were just being your genuine, adorable self."
    },
    {
      id: "photo-5",
      url: "images/photo5.jpeg",
      caption: "Us ❤️ Forever & Always",
      tag: "Us",
      resolution: "1920 × 1080",
      details: "My safe haven, my peace, and my favorite adventure."
    },
    {
      id: "photo-6",
      url: "images/photo6.jpeg",
      caption: "The way you care",
      tag: "Memories",
      resolution: "1080 × 1080",
      details: "Always checking in, always making sure I'm happy and safe."
    },
    {
      id: "photo-7",
      url: "images/photo7.jpeg",
      caption: "My absolute favorite human",
      tag: "Candid",
      resolution: "1600 × 1200",
      details: "No matter where we go, every place feels special with you."
    },
    {
      id: "photo-8",
      url: "images/photo8.jpeg",
      caption: "Unmatched style & charm",
      tag: "Handsome",
      resolution: "1280 × 960",
      details: "Certified 10/10 best boyfriend in the entire galaxy."
    },
    {
      id: "photo-9",
      url: "images/photo9.jpeg",
      caption: "Pure happiness with you",
      tag: "His Smile",
      resolution: "1280 × 850",
      details: "Laughing until our stomachs hurt—these are my favorite moments."
    },
    {
      id: "photo-10",
      url: "images/photo10.jpeg",
      caption: "Unforgettable memory",
      tag: "Memories",
      resolution: "1280 × 960",
      details: "A beautiful day etched into my heart forever."
    },
    {
      id: "photo-11",
      url: "images/photo11.jpeg",
      caption: "Always so effortlessly handsome",
      tag: "Handsome",
      resolution: "1080 × 1350",
      details: "How do you manage to look so good in every single picture?"
    },
    {
      id: "photo-12",
      url: "images/photo12.jpeg",
      caption: "Sweetest soul",
      tag: "Candid",
      resolution: "1200 × 800",
      details: "A heart full of gold and patience."
    },
    {
      id: "photo-13",
      url: "images/photo13.jpeg",
      caption: "Our journey together ❤️",
      tag: "Us",
      resolution: "1400 × 900",
      details: "Every step of this journey with you is pure magic."
    },
    {
      id: "photo-14",
      url: "images/photo14.jpeg",
      caption: "Warmest hugs and safe vibes",
      tag: "Memories",
      resolution: "1280 × 850",
      details: "With you, everything in the world feels calm and secure."
    },
    {
      id: "photo-15",
      url: "images/photo15.jpeg",
      caption: "Look at that charming smile",
      tag: "His Smile",
      resolution: "1080 × 1080",
      details: "The smile that stole my heart and never gave it back."
    },
    {
      id: "photo-16",
      url: "images/photo16.jpeg",
      caption: "Always by my side",
      tag: "Us",
      resolution: "1280 × 960",
      details: "The most dependable, loving, and supportive partner ever."
    },
    {
      id: "photo-17",
      url: "images/photo17.jpeg",
      caption: "Classic handsome look",
      tag: "Handsome",
      resolution: "1200 × 1600",
      details: "My one and only heartthrob."
    },
    {
      id: "photo-18",
      url: "images/photo18.jpeg",
      caption: "Candid perfection",
      tag: "Candid",
      resolution: "1280 × 850",
      details: "Captured in the moment, completely natural and adorable."
    },
    {
      id: "photo-19",
      url: "images/photo19.jpeg",
      caption: "Forever my favorite view ❤️",
      tag: "Us",
      resolution: "1920 × 1080",
      details: "Looking at you is my favorite thing to do."
    }
  ],

  // Video results for the Videos tab
  videos: [
    {
      id: "vid-1",
      title: "Our Favorite Memories ❤️",
      source: "YouTube · Love Records",
      date: "2 months ago",
      duration: "03:24",
      thumbnail: "images/photo19.jpeg",
      description: "A collection of some of my favorite moments with you. From quiet laughter to spontaneous adventures that I will cherish forever.",
      views: "1.2M views"
    },
    {
      id: "vid-2",
      title: "Why You Are My Favorite Person",
      source: "YouTube · Heart Studio",
      date: "1 month ago",
      duration: "02:45",
      thumbnail: "images/photo17.jpeg",
      description: "Some moments are impossible to forget. A short tribute to the guy who makes everyday life feel like a comforting movie.",
      views: "890K views"
    },
    {
      id: "vid-3",
      title: "The Best Boyfriend ❤️ (Official Montage)",
      source: "YouTube · Forever Us",
      date: "3 weeks ago",
      duration: "04:12",
      thumbnail: "images/photo16.jpeg",
      description: "A little story about my favorite person in the world. The kindness, the humor, and the unconditional love you give.",
      views: "2.4M views"
    }
  ],

  // News results for the News tab
  news: [
    {
      id: "news-1",
      badge: "BREAKING NEWS",
      title: "World's Best Boyfriend Has Been Found ❤️",
      source: "Love Daily",
      time: "2 hours ago",
      thumbnail: "images/photo4.jpeg",
      summary: "After an extensive search across the universe, the answer has finally been confirmed. Global relationship analysts confirm there is no competition.",
      fullArticle: "In a groundbreaking revelation, researchers and heart experts have unanimously announced that the title of 'World's Best Boyfriend' has officially been claimed. Observers noted an unparalleled blend of thoughtfulness, patience, and contagious humor that leaves everyone else in absolute awe."
    },
    {
      id: "news-2",
      badge: "EXCLUSIVE",
      title: "Scientists confirm: His smile is impossible to ignore.",
      source: "Love Times",
      time: "3 hours ago",
      thumbnail: "images/photo5.jpeg",
      summary: "Neurological scans indicate an instant 200% surge in serotonin and happiness whenever he smiles. Experts recommend unlimited doses.",
      fullArticle: "Medical experts at the Heart Institute have concluded a 365-day study proving that his smile triggers immediate, involuntary happiness. One researcher commented, 'It's scientifically undeniable: looking at him makes everything in life better.'"
    },
    {
      id: "news-3",
      badge: "INVESTIGATION",
      title: "Local investigation reveals: He may officially be the favorite person.",
      source: "Daily Love",
      time: "5 hours ago",
      thumbnail: "images/photo6.jpeg",
      summary: "Secret undercover reports reveal consistent caring habits, adorable texts, and being the sweetest companion in history.",
      fullArticle: "Special investigators spent months observing his daily routine. The findings? He consistently listens patiently, supports every dream, and gives the warmest hugs. The final verdict: Permanently crowned favorite human."
    },
    {
      id: "news-4",
      badge: "LATEST UPDATE",
      title: "The title 'Best Boyfriend' remains occupied with zero vacancies.",
      source: "Heart News",
      time: "1 day ago",
      thumbnail: "images/photo7.jpeg",
      summary: "Committee confirms the position has a permanent lifetime tenure with zero possibility of replacement.",
      fullArticle: "The Supreme Relationship Council has issued an official statement dismissing any alternative candidates. The title of Best Boyfriend is strictly non-negotiable and forever reserved for him."
    }
  ],

  // Reasons Why You're the Best Boyfriend (Surprise section)
  reasons: [
    {
      icon: "✨",
      title: "Your Warm Kindness",
      description: "You have a pure, genuine heart that treats everyone with warmth, especially when no one is watching."
    },
    {
      icon: "😄",
      title: "That Infectious Smile",
      description: "Just one smile from you can instantly turn my worst days into pure sunshine."
    },
    {
      icon: "🛡️",
      title: "My Safest Place",
      description: "Whenever I'm in your arms, the world outside fades and everything feels secure and peaceful."
    },
    {
      icon: "👂",
      title: "The Way You Listen",
      description: "You never dismiss my feelings. You listen with patience, care, and understanding."
    },
    {
      icon: "☕",
      title: "The Little Things",
      description: "Remembering tiny details, checking if I ate, sending sweet texts—the little things mean everything to me."
    },
    {
      icon: "🚀",
      title: "My Biggest Supporter",
      description: "You believe in me even when I doubt myself, pushing me to achieve everything I dream of."
    }
  ],

  // Romantic Letter inside the Surprise reveal
  letter: {
    salutation: "To My Favorite Person in the Whole World,",
    paragraphs: [
      "I know you came here expecting a standard Google search, but the truth is, the internet doesn't have enough pages to describe how incredible you are to me.",
      "Every single day with you is a blessing. Your laughter, your kindness, your unwavering support, and the effortless way you make me smile make you the most amazing boyfriend anyone could ever wish for.",
      "Happy Boyfriend Day! Thank you for choosing to be by my side, for being my best friend, my protector, and my favorite adventure. I love you more than words or search algorithms could ever compute."
    ],
    closing: "Forever & Always Yours,",
    signature: "With All My Love ❤️"
  }
};
