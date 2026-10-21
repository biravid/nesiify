// ==========================================
// MOBILE SURPRISE CONFIGURATION FILE
// Easily customize any text, names, images, audio, password & dates!
// ==========================================
//
// PHOTO GUIDE — rename your photos exactly like this and drop them in images/ folder:
// photo1.jpeg  -> Page 1  Film Reel frame 1
// photo2.jpeg  -> Page 1  Film Reel frame 2
// photo3.jpeg  -> Page 1  Film Reel frame 3
// photo4.jpeg  -> Page 2  Hero birthday circle (best solo shot)
// photo5.jpeg  -> Page 3  Gift box reveal surprise photo
// photo6.jpeg  -> Page 5  Balloon 1 pop reveal photo
// photo7.jpeg  -> Page 5  Balloon 2 pop reveal photo
// photo8.jpeg  -> Page 6  Rose 1 tap reveal photo
// photo9.jpeg  -> Page 6  Rose 2 tap reveal photo
// photo10.jpeg -> Page 7  Scratch card hidden photo
// ==========================================

const SURPRISE_CONFIG = {

    // ---- WHO THIS IS FOR ----
    recipientName: "Santhosh",
    senderName: "Hashini",

    // ---- PAGE 0: COVER — The moment it all begins ----
    proposalTitle: "I have been waiting to tell you this...",
    proposalSubtitle: "Close the world out for a few minutes.<br>This entire journey was made — just for you. 💖✨",
    surpriseTitle: "A Journey Written in Love",
    subtitle: "Every page is a piece of me I saved only for you...",

    // ---- COUNTDOWN (Page 1) ----
    eventDate: "2026-09-16T23:59:59",
    countdownTitle: "I have been counting every single day until this moment... ⏳💖",

    // ---- MUSIC ----
    audioUrl: "images/Happy-Birthday.mp3",       // Background song throughout the journey
    lofiAudioUrl: "images/kaadhal-En-Kaviye.mp3",             // Dedicated song for the Lofi Vinyl Player (Page 5)
    cdSongTitle: "Our Song Just For You",
    cdSongSub: "Every time this melody plays, I think of you and everything you mean to me 🎵",

    // ---- BACKGROUND ----
    backgroundImg: "images/hero.jpeg",

    // ---- PAGE 2: HAPPY BIRTHDAY ----
    birthdayPage: {
        bgText: "HAPPY",
        overlayText: "birthday",
        photo: "images/photo8.jpeg",
        message: "You carry so much for everyone around you. Today, put it all down and just feel how deeply, completely loved you truly are. 🌟"
    },

    // ---- PAGE 9: PASSWORD LOCK ----
    letterPassword: "2025",
    passwordHint: "Hint: A year we met 4 numbers💖",

    // ---- PAGE 7: SCRATCH CARD ----
    scratchPhoto: "images/photo10.jpeg",
    scratchCaption: "You scratched away the ordinary and found something real — that is exactly what you do to me every single day. 💛",

    // ---- PAGE 3: GIFT UNBOXING ----
    gift: {
        boxTitle: "Tap to unwrap what I have been holding for you",
        revealedTitle: "You are the only gift I never have to unwrap twice",
        revealedMessage: "I wanted to give you something no store sells — the feeling of being loved without conditions. Of being chosen every single day, not out of habit but out of heart. That is what you are to me. My everyday choice. My favourite person.",
        revealPhoto: "images/hero.jpeg"
    },

    // ---- PAGE 5: BALLOON POP WISHES ----
    balloonWishes: [
        {
            id: 1,
            color: "#ff4d6d",
            title: "I wish you peace",
            wish: "You give so much calm to everyone around you — I hope today the world gives it all back. May your mind always find rest, and your heart always feel safe.",
            photo: "images/photo6.jpeg"
        },
        {
            id: 2,
            color: "#ff758f",
            title: "I wish you to know you are never alone",
            wish: "On the days you feel like you are carrying everything by yourself — I am here. I will always be right here. You never have to face any storm without me beside you.",
            photo: "images/photo7.jpeg"
        },
        {
            id: 3,
            color: "#ff8fa3",
            title: "I wish you laughter that reaches your eyes",
            wish: "Not the polite kind. The real kind — the kind that makes your whole face light up and the room feel warmer. You deserve to laugh like that every single day."
        },
        {
            id: 4,
            color: "#ffb3c1",
            title: "I wish you the courage to dream bigger",
            wish: "You are more capable than you will ever give yourself credit for. I see it in how you show up, how you love, how you never quit. Go after everything. I am your loudest supporter."
        },
        {
            id: 5,
            color: "#c9184a",
            title: "I wish you forever with me",
            wish: "Not just today, not just this birthday — forever. Every ordinary Tuesday, every hard season, every quiet Sunday morning. I choose all of it with you. Always you."
        }
    ],

    // ---- PAGE 6: ROSE BOUQUET VOWS ----
    roses: [
        {
            id: 1,
            title: "I see you",
            vow: "Not the version you show the world — the real you. The tired you, the hopeful you, the one who tries so quietly. I see all of it and I love every single part.",
            photo: "images/photo8.jpeg"
        },
        {
            id: 2,
            title: "I will stay",
            vow: "When life gets heavy and the road feels long — I am not going anywhere. My place is beside you. That is not a feeling, that is a decision I make every morning.",
            photo: "images/photo9.jpeg"
        },
        {
            id: 3,
            title: "I will be your strength",
            vow: "On the days you feel weak, lean on me. I was made to hold things with you — not watch you carry them alone. Your weight is not a burden. It is an honour to share."
        },
        {
            id: 4,
            title: "I will celebrate you",
            vow: "Not just your wins — your efforts, your growth, your small brave moments nobody notices. I will be your applause in an empty room. Your biggest fan on your quietest days."
        },
        {
            id: 5,
            title: "I choose you — forever",
            vow: "Every single day, in every version of life — I choose you first. Before convenience, before comfort, before anything else. You are my person. Now and always."
        }
    ],

    // ---- PAGE 10: LOVE QUIZ ----
    quizQuestions: [
        {
            question: "when we proposed?",
            options: [
                "14 May 2020",
                "14 April 2021",
                "14 September 2021"
            ],
            correctIndex: 1,
            message: "Love you 3000!"
        },
        {
            question: "what is my fav destination?",
            options: [
                "Maldives",
                "Manali",
                "Yercaud"
            ],
            correctIndex: 0,
            message: "Hold my hands forever!"
        },
        {
            question: "who's your first wife?",
            options: [
                "Hashini",
                "Anandha Narayanan",
                "Alaghu"
            ],
            correctIndex: 2,
            message: "Bloody idiot!!"
        }
    ],

    // ---- PAGE 1: FILM REEL ----
    filmReelPhotos: [
        { image: "images/photo1.jpeg", caption: "The beginning of us" },
        { image: "images/photo2.jpeg", caption: "Where we became real" },
        { image: "images/photo3.jpeg", caption: "Every moment since" }
    ],

    // ---- PAGE 9: MEMORY GALLERY ----
    gallery: [
        {
            image: "images/photo4.jpeg",
            caption: "I did not know that day would become one of my favourite memories. I do now.",
            date: "Chapter 1 — The First Spark"
        },
        {
            image: "images/photo5.jpeg",
            caption: "This is the moment I knew — you were not just someone I liked. You were someone I needed.",
            date: "Chapter 2 — When I Knew"
        },
        {
            image: "images/photo6.jpeg",
            caption: "Look at us. We built something so quietly beautiful. I am so grateful we did.",
            date: "Chapter 3 — What We Became"
        },
        {
            image: "images/photo7.jpeg",
            caption: "Even on the quietest, most ordinary days, you make everything feel safe and right.",
            date: "Chapter 4 — Quiet Solace"
        },
        {
            image: "images/photo8.jpeg",
            caption: "Every version of my future has your hand in mine. Happy Birthday, my Santhosh 💖",
            date: "Chapter 5 — Forever With You"
        }
    ],

    // ---- PAGE 9: HEART LOCKET ----
    locket: {
        photoLeft: "images/photo10.jpeg",
        photoRight: "images/photo11.jpeg",
        caption: "Two halves. One heart. Sealed forever."
    },

    // ---- PAGE 9: THE LETTER ----
    letter: {
        title: "A Letter I Have Written a Hundred Times in My Heart",
        content: ` என் தவறுகளையும், என் கோபங்களையும்
எப்போதும் பொறுமையோடு சகித்துக்கொண்டு… ❤️
நான் கேட்பதையெல்லாம்
எனக்காக மாற்றிக்கொண்டு…

என் சந்தோஷத்திலும், என் சோகத்திலும்,
என் கோபத்திலும், என் குழந்தைத்தனத்திலும்
என்னை முழுமையாக ஏற்றுக்கொண்டவன் நீ… ❤️

என் வாழ்க்கையில் வந்த ஒரு மனிதன் அல்ல நீ,
என் வாழ்க்கையே ஆனவன்… 🫂💚

ஒவ்வொரு முறையும் உன்னை பார்க்கும்போதும்,
எனக்கு நீ புதுசாகத்தான் தெரிகிறாய்… 🥹❤️
முதன்முதலாக உன்னை பார்த்த அந்த நொடி,
என்னுள் எப்படி ஒரு உணர்வு இருந்ததோ,
அதே உணர்வுதான் இன்றும் உன்னை பார்க்கும் ஒவ்வொரு முறையும்… ❤️‍🩹

என்னில் முழுமையாக ஆட்கொண்டிருக்கும்
என் அன்பு மச்சானுக்கு… ❤️‍🩹

இனிய பிறந்தநாள் வாழ்த்துக்கள் தங்கமே! 🧿💚🎂

என் வாழ்க்கையின் ஒவ்வொரு நாளும்
உன்னை இன்னும் கொஞ்சம் கொஞ்சமாக
காதலித்துக்கொண்டே இருக்கணும்…
நீயே என் முதல் காதலும்,
என்றும் என் அழகான காதலும்❤️♾️!!`
    },

    // ---- CHAPTER DOOR TRANSITIONS ----
    // Each entry powers the between-page door card (Pattern 2 + 4).
    // index N = transition FROM page N to page N+1.
    // null at index 0 = cover → page 1 is handled by the start button directly.
    pageTransitions: [
        null, // 0 → 1: cover → hero (no door; startBtn handles this)
        {
            chapter: "Chapter 2",
            bridgeMsg: "Every great love story is built frame by frame... let's walk through our most cherished moments 🎬💖",
            image: "images/sweethug.png",
            hint: "Our Story in Frames",
            cta: "Roll the Film"
        },
        {
            chapter: "Chapter 3",
            bridgeMsg: "Before we go any further... there is something very special about today that deserves its very own moment ✨",
            image: "images/giftsmile.png",
            hint: "The Main Event",
            cta: "Celebrate My Love"
        },
        {
            chapter: "Chapter 4",
            bridgeMsg: "And I didn't come empty-handed, my love... I've been saving something for you for a while now 🎁",
            image: "images/giftsmile.png",
            hint: "An Unboxing Awaits",
            cta: "Unwrap It"
        },
        {
            chapter: "Chapter 5",
            bridgeMsg: "There is a song I cannot stop playing whenever I think of you. Every single note feels like you 🎵",
            image: "images/heartfull.png",
            hint: "Our Melody",
            cta: "Press Play"
        },
        {
            chapter: "Chapter 6",
            bridgeMsg: "Now let's make some wishes come true together... are you ready to play a little game? 🎈",
            image: "images/heartfull.png",
            hint: "Pop the Mystery",
            cta: "Let's Play"
        },
        {
            chapter: "Chapter 7",
            bridgeMsg: "I bought you the prettiest flowers... but wait until you see my REAL reaction inside! 😹🌸",
            image: "images/bouqetsmile.png",
            hint: "Expectation vs Reality",
            cta: "Meet the Kitties"
        },
        {
            chapter: "Chapter 8",
            bridgeMsg: "I hid something just for you behind a little glitter and gold... scratch carefully ✨",
            image: "images/giftsmile.png",
            hint: "Hidden Treasure",
            cta: "Find It"
        },
        {
            chapter: "Chapter 9",
            bridgeMsg: "These are the moments I keep coming back to... the ones I never ever want to forget 📸",
            image: "images/sweethug.png",
            hint: "Our Story",
            cta: "Flip Through"
        },
        {
            chapter: "Chapter 10",
            bridgeMsg: "The most important thing of all... I wrote you a letter. I have rewritten it a hundred times in my heart 💌",
            image: "images/heartfull.png",
            hint: "A Sealed Letter",
            cta: "Break the Seal"
        },
        {
            chapter: "Chapter 11",
            bridgeMsg: "One last fun quiz before our grand reveal, my dearest Machan... let's see how well you know us! 💘",
            image: "images/sweethug.png",
            hint: "The Love Quiz",
            cta: "Take the Quiz"
        },
        {
            chapter: "Grand Finale",
            bridgeMsg: "And now, for the grandest moment of all... my whole heart, all my wishes, and our forever future ✨🎂💖",
            image: "images/bouqetsmile.png",
            hint: "Forever & Always",
            cta: "Enter Grand Finale"
        }
    ],

    // ---- PAGE 12: GRAND FINALE ----
    finale: {
        badge: "✨ FOREVER & ALWAYS • YOUR HASHINI! 🔐✨",
        title: "Happy Birthday, My Santhosh🎂💙",
        subtitle: "A life with you is the greatest gift of all...",
        message: `To the man who makes every single day feel like magic, who holds my hand through every storm, and whose smile is my favourite place in this entire world.

May this birthday bring you boundless peace, great success, endless laughter, and every dream your gentle heart has been holding onto.

No matter how wide the sea stretches or where life takes us, my hand will always be inside yours, pointing forward toward our beautiful horizon.

I loved you yesterday, I love you today, and I will choose you in every lifetime to come.

இனிய பிறந்தநாள் வாழ்த்துக்கள் என் தங்கமே! 🧿🌊💙♾️`,
        signature: "Forever & Always Yours, Hashini 💍💖",
        photo: "images/hero.jpeg"
    }
};

window.SURPRISE_CONFIG = SURPRISE_CONFIG;

