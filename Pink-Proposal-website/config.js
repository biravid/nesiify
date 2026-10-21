// ==========================================
// MOBILE SURPRISE CONFIGURATION FILE
// Easily customize any text, names, images, audio, password & dates!
// ==========================================

const SURPRISE_CONFIG = {
    // Recipient & Sender Details
    recipientName: "My Dearest Love",
    senderName: "Forever & Always Yours",
    proposalTitle: "A Special Proposal 💖",
    proposalSubtitle: "Will you accept this journey of love & open your surprise?",
    surpriseTitle: "A Journey of Infinite Love 🌹",
    subtitle: "Every page holds a piece of my heart crafted just for you...",

    // Event Date for Countdown (Format: YYYY-MM-DDTHH:MM:SS)
    eventDate: "2026-12-31T00:00:00",
    countdownTitle: "Counting down to our next unforgettable moment...",

    // Custom Romantic Audio Song URL
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3",
    cdSongTitle: "Our Heartbeat Melody 🎶",
    cdSongSub: "Dedicated to the one who makes my heart sing every single day ❤️",

    // Background Image
    backgroundImg: "images/background.jpg",

    // Happy Birthday Page Content (Page 2)
    birthdayPage: {
        bgText: "HAPPY",
        overlayText: "birthday",
        photo: "images/user_cutout_transparent.png",
        message: "Wishing the most wonderful person in my world the happiest, brightest birthday filled with pure love! ❤️✨"
    },

    // Password for Secret Letter (Default: 1234 or LOVE)
    letterPassword: "1234",
    passwordHint: "Hint: Enter the magic 4-digit code (default: 1234) or 'LOVE'",

    // Scratch Card Secret Photo & Caption
    scratchPhoto: "images/photo1.png",
    scratchCaption: "🎉 You revealed the hidden treasure of my heart! ❤️",

    // Gift Unboxing Surprise Content
    gift: {
        boxTitle: "Tap the Gift Box to Open Your Surprise!",
        revealedTitle: "🎉 You Are My Greatest Blessing! 🎉",
        revealedMessage: "In a world full of temporary things, my love for you is eternal. You bring warmth, laughter, and endless light into my life every single day! ❤️",
    },

    // 5 Balloon Popping Wishes (Emotional & Heartfelt)
    balloonWishes: [
        { id: 1, color: "#ff4d6d", title: "Eternal Joy 💖", wish: "May your heart always beat with pure happiness, peace, and endless smiles." },
        { id: 2, color: "#ff758f", title: "Unconditional Love 🌹", wish: "I promise to stand by you, cherish you, and hold your hand through every chapter of life." },
        { id: 3, color: "#ff8fa3", title: "Golden Memories ✨", wish: "May every day we share create memories sweeter than the finest dreams." },
        { id: 4, color: "#ffb3c1", title: "Boundless Smiles 😊", wish: "Your smile brightens even my darkest days. May you never lose that beautiful radiance." },
        { id: 5, color: "#c9184a", title: "Forever Together 💍", wish: "You and me, hand in hand, facing tomorrow with infinite hope and love." }
    ],

    // 4 Romantic Quiz Questions with Answers
    quizQuestions: [
        {
            question: "1. What was the exact moment my heart knew you were the one?",
            options: [
                "The very first time your eyes met mine",
                "When you shared your beautiful smile",
                "The moment you held my hand",
                "All of the above — every single second with you!"
            ],
            correctIndex: 3,
            message: "Correct! Every single moment with you made me fall deeper in love! ❤️"
        },
        {
            question: "2. Which word best describes what you mean to me?",
            options: [
                "My Sunshine ☀️",
                "My Safe Haven 🏡",
                "My Entire Universe 🌌",
                "My Everything ❤️"
            ],
            correctIndex: 3,
            message: "Spot on! You are truly my whole world and everything I prayed for! 💞"
        },
        {
            question: "3. How long will my heart belong to you?",
            options: [
                "For a thousand years",
                "Until the stars stop shining",
                "Forever and a day beyond eternity",
                "Always and infinitely"
            ],
            correctIndex: 2,
            message: "Yes, my darling! Forever and a day beyond eternity! 🌹"
        },
        {
            question: "4. What is my favorite thing to do with you?",
            options: [
                "Talk for hours about everything and nothing",
                "Look into your eyes and smile",
                "Create beautiful memories together",
                "Simply being by your side anywhere in the world"
            ],
            correctIndex: 3,
            message: "Aww, absolutely! Anywhere with you is my favorite place in the universe! 💖"
        }
    ],

    // 5 Roses Bouquet Vows
    roses: [
        { id: 1, title: "Rose of Gratitude", vow: "For being the light that guides me through every storm." },
        { id: 2, title: "Rose of Tenderness", vow: "For your gentle heart, warm hugs, and comforting soul." },
        { id: 3, title: "Rose of Passion", vow: "For the fire and joy you ignite in my heart every day." },
        { id: 4, title: "Rose of Loyalty", vow: "For standing by my side unconditionally, no matter what." },
        { id: 5, title: "Rose of Eternity", vow: "For promising our tomorrow together, forever intertwined." }
    ],

    // 6 Memory Gallery Items
    gallery: [
        { image: "images/photo1.png", caption: "The Beginning of Our Story", date: "Memory #1 — First Spark" },
        { image: "images/photo2.png", caption: "Holding Hands Through Life", date: "Memory #2 — Warm Embraces" },
        { image: "images/photo3.png", caption: "Sunset Talks & Sweet Laughs", date: "Memory #3 — Golden Hours" },
        { image: "images/photo4.png", caption: "Endless Adventures Together", date: "Memory #4 — Unforgettable Days" },
        { image: "images/photo5.png", caption: "Under the Sparkling Lights", date: "Memory #5 — Pure Magic" },
        { image: "images/photo6.png", caption: "Forever in My Heart", date: "Memory #6 — Eternal Promise" }
    ],

    // Romantic Secret Letter
    letter: {
        title: "A Letter Sealed With Infinite Love 💌",
        content: `My Dearest,

If you are reading these words, it means you unlocked the secret door to my heart.

Words often fall short when I try to describe how deeply you mean to me. You are my comfort when I am weary, my joy when I am down, and my brightest dream come true.

Thank you for loving me, for holding my hand, and for filling my life with sweet music and blossoming roses. 

No matter where life takes us, remember this promise: my heart is yours, today, tomorrow, and for all eternity.

With all my love and devotion,
Forever Yours ❤️`
    }
};

window.SURPRISE_CONFIG = SURPRISE_CONFIG;
