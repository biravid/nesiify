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
    proposalTitle: "There is something my heart has been trying to tell you...",
    proposalSubtitle: "Forget everything around you for a few minutes.<br>This little journey was made with one heart, for another. 💖✨",
    surpriseTitle: "A Little Journey Called Us",
    subtitle: "Every page holds a tiny piece of the love I have for you... 💕",

    // ---- COUNTDOWN (Page 1) ----
    eventDate: "2026-12-14T23:59:59",
    countdownTitle: "Some moments are worth waiting for... and this one is ours. ⏳💖",

    // ---- MUSIC ----
    audioUrl: "images/Happy-Birthday.mp3",       // Background song throughout the journey
    lofiAudioUrl: "images/kaadhal-En-Kaviye.mp3",             // Dedicated song for the Lofi Vinyl Player (Page 5)
    cdSongTitle: "A Song That Sounds Like Us",
    cdSongSub: "Every little note reminds me of you, our silly moments, our quiet moments, and everything in between. 🎵💕",

    // ---- BACKGROUND ----
    backgroundImg: "images/hero.jpeg",

    // ---- PAGE 2: HAPPY BIRTHDAY ----
    birthdayPage: {
        bgText: "HAPPY",
        overlayText: "birthday",
        photo: "images/photo8.jpeg",
        message: "Some people enter our lives and slowly become our favourite part of every day. Somehow, you became mine. Today, I just want you to know how deeply you are loved. 🌷💕"
    },

    // ---- PAGE 9: PASSWORD LOCK ----
    letterPassword: "143",
    passwordHint: "Hint: A tiny number that means a whole lot of love. 💖",

    // ---- PAGE 7: SCRATCH CARD ----
    scratchPhoto: "images/photo10.jpeg",
    scratchCaption: "Behind every little layer is a reminder of us — because even the simplest moments with you feel a little more magical. 💛✨",

    // ---- PAGE 3: GIFT UNBOXING ----
    gift: {
        boxTitle: "Tap the little gift I have been keeping for you... 🎁",
        revealedTitle: "You are the sweetest gift life ever gave me",
        revealedMessage: "I could wrap a thousand gifts and still not find one that says what you mean to me. You are the person I want beside me on ordinary mornings, silly evenings, difficult days, and beautiful ones. If I get to choose again and again, I will keep choosing you. Always. 💗",
        revealPhoto: "images/hero.jpeg"
    },

    // ---- PAGE 5: BALLOON POP WISHES ----
    balloonWishes: [
        {
            id: 1,
            color: "#ff4d6d",
            title: "I wish you peaceful days",
            wish: "I hope life is gentle with you. Whenever the world feels too loud, I hope you find a quiet little place where your heart can breathe — and I hope I am always there beside you. 🤍",
            photo: "images/photo6.jpeg"
        },
        {
            id: 2,
            color: "#ff758f",
            title: "I wish you always remember us",
            wish: "On the days you forget how loved you are, come back to us. You never have to carry everything alone. I may not fix every storm, but I will always sit beside you through it. 🫂❤️",
            photo: "images/photo7.jpeg"
        },
        {
            id: 3,
            color: "#ff8fa3",
            title: "I wish you endless silly moments",
            wish: "I want a lifetime of your random smiles, our stupid jokes, the laughs that make no sense to anyone else, and those tiny moments where we look at each other and just know. 😂💕"
        },
        {
            id: 4,
            color: "#ffb3c1",
            title: "I wish your dreams come true",
            wish: "Dream without being afraid of how big it is. I will always be the person clapping the loudest for you, believing in you on the days you struggle to believe in yourself. 🌙✨"
        },
        {
            id: 5,
            color: "#c9184a",
            title: "I wish for more of us",
            wish: "More late-night talks. More random calls. More hugs that last too long. More photos we will laugh at later. More ordinary days that somehow become our favourite memories. Just more us. Forever. ♾️❤️"
        }
    ],

    // ---- PAGE 6: ROSE BOUQUET VOWS ----
    roses: [
        {
            id: 1,
            title: "I choose you",
            vow: "Not because you are perfect, but because you are you. Your quiet side, your silly side, your stubborn side, your soft side — I love the whole person behind every little smile. ❤️",
            photo: "images/photo8.jpeg"
        },
        {
            id: 2,
            title: "I will stay",
            vow: "When life feels heavy and everything gets confusing, I want you to look beside you and find me there. I cannot promise every day will be easy, but I can promise you will never have to face it feeling alone. 🫂",
            photo: "images/photo9.jpeg"
        },
        {
            id: 3,
            title: "I will be your safe place",
            vow: "When you are tired, come to me. You do not always have to be strong. You can be soft, quiet, messy, emotional and completely yourself with me. Your heart is always safe here. 🤍"
        },
        {
            id: 4,
            title: "I will celebrate every little thing",
            vow: "I will celebrate the big achievements, but I will also celebrate the tiny things nobody else notices — your effort, your progress, your random little victories. I will always be your loudest cheerleader. 🥹💖"
        },
        {
            id: 5,
            title: "You are my forever favourite",
            vow: "If life gave me the chance to meet you all over again, I would still find my way to you. In every version of our story, I would still want your hand in mine. You are my favourite person, my home, my always. ♾️❤️"
        }
    ],

    // ---- PAGE 10: LOVE QUIZ ----
    quizQuestions: [
        {
            question: "What is our little love code?",
            options: [
                "143",
                "520",
                "831"
            ],
            correctIndex: 0,
            message: "You know our secret language! ❤️"
        },
        {
            question: "Where would I choose to escape with you?",
            options: [
                "A quiet beach",
                "A cosy hill station",
                "Anywhere with you"
            ],
            correctIndex: 2,
            message: "Exactly! Anywhere is perfect when it is with you. 🥰"
        },
        {
            question: "Who is my favourite person?",
            options: [
                "Hashini",
                "My pillow",
                "My phone"
            ],
            correctIndex: 0,
            message: "Obviously me! Now come here, idiot. 😂❤️"
        }
    ],

    // ---- PAGE 1: FILM REEL ----
    filmReelPhotos: [
        { image: "images/photo1.jpeg", caption: "The little beginning that became us" },
        { image: "images/photo2.jpeg", caption: "Somewhere along the way, you became home" },
        { image: "images/photo3.jpeg", caption: "And somehow, every moment became precious" }
    ],

    // ---- PAGE 9: MEMORY GALLERY ----
    gallery: [
        {
            image: "images/photo4.jpeg",
            caption: "I did not know that a simple moment could become something my heart would replay this many times.",
            date: "Chapter 1 — The Little Beginning"
        },
        {
            image: "images/photo5.jpeg",
            caption: "Somewhere between the conversations and the smiles, you quietly became someone my heart could not imagine losing.",
            date: "Chapter 2 — When You Became Special"
        },
        {
            image: "images/photo6.jpeg",
            caption: "Look at us. We were never trying to create a perfect story. We were simply creating our own.",
            date: "Chapter 3 — Our Little World"
        },
        {
            image: "images/photo7.jpeg",
            caption: "The best memories are sometimes the most ordinary ones — because somehow, you make ordinary feel magical.",
            date: "Chapter 4 — The Everyday Us"
        },
        {
            image: "images/photo8.jpeg",
            caption: "If I imagine tomorrow, I still see your hand in mine. That is how I know how much you mean to me.",
            date: "Chapter 5 — More Chapters To Come"
        }
    ],

    // ---- PAGE 9: HEART LOCKET ----
    locket: {
        photoLeft: "images/photo10.jpeg",
        photoRight: "images/photo11.jpeg",
        caption: "Two hearts, countless memories, one beautiful little story. ❤️"
    },

    // ---- PAGE 9: THE LETTER ----
    letter: {
        title: "A Letter I Have Written a Hundred Times in My Heart",
        content: `If I could keep one feeling from every moment we have shared, it would be the feeling of finding you.

You came into my life so naturally, and somehow you became such a big part of it. ❤️

I love the way you make ordinary conversations turn into memories. I love our silly fights, our random laughs, our little secrets, and even those quiet moments where we do not need to say anything.

You are not just someone I love.
You are the person I want to tell everything to.

When I am happy, I want to share it with you.
When I am sad, I want your hug.
When something funny happens, you are the first person I want to tell.
And when I imagine my future, somehow, you are already there. 🥹❤️

I do not know what every tomorrow will look like.
But I know one thing — I want to discover those tomorrows with you.

So here is my tiny promise:
I will keep choosing you.
I will keep annoying you.
I will keep making memories with you.
And I will keep loving you in all the little ways that words cannot explain.

To my favourite person, my safest place, and my forever little headache...

I love you, Santhosh. ❤️♾️

And if I had to start our story all over again,
I would still choose you. Every single time.`
    },

    // ---- CHAPTER DOOR TRANSITIONS ----
    // Each entry powers the between-page door card (Pattern 2 + 4).
    // index N = transition FROM page N to page N+1.
    // null at index 0 = cover → page 1 is handled by the start button directly.
    pageTransitions: [
        null, // 0 → 1: cover → hero (no door; startBtn handles this)
        {
            chapter: "Chapter 2",
            bridgeMsg: "Every love story has little moments that become unforgettable... come, let us walk through ours. 🎬❤️",
            image: "images/sweethug.png",
            hint: "Our Story in Frames",
            cta: "See Our Story"
        },
        {
            chapter: "Chapter 3",
            bridgeMsg: "Before we continue, let us pause for a moment and celebrate the person who makes this story so special. ✨💕",
            image: "images/giftsmile.png",
            hint: "A Little Celebration",
            cta: "Celebrate Us"
        },
        {
            chapter: "Chapter 4",
            bridgeMsg: "Of course, I could not make a love story without leaving a tiny surprise for you... 🎁💖",
            image: "images/giftsmile.png",
            hint: "Something For You",
            cta: "Open Your Gift"
        },
        {
            chapter: "Chapter 5",
            bridgeMsg: "Some songs sound beautiful. But some songs become beautiful because they remind us of someone. This one is ours. 🎵❤️",
            image: "images/heartfull.png",
            hint: "Our Little Melody",
            cta: "Play Our Song"
        },
        {
            chapter: "Chapter 6",
            bridgeMsg: "Now let us make a few tiny wishes for our future and turn them into memories. 🎈💕",
            image: "images/heartfull.png",
            hint: "Little Love Wishes",
            cta: "Make A Wish"
        },
        {
            chapter: "Chapter 7",
            bridgeMsg: "A few roses are waiting for you... and each one is hiding a little piece of my heart. 🌹❤️",
            image: "images/bouqetsmile.png",
            hint: "Roses From My Heart",
            cta: "Open The Roses"
        },
        {
            chapter: "Chapter 8",
            bridgeMsg: "There is one more tiny secret hiding here. Take your time and reveal it slowly... ✨💛",
            image: "images/giftsmile.png",
            hint: "A Tiny Secret",
            cta: "Reveal It"
        },
        {
            chapter: "Chapter 9",
            bridgeMsg: "Here are the little moments I wish I could keep inside a glass jar forever. 📸❤️",
            image: "images/sweethug.png",
            hint: "Our Little Memories",
            cta: "Open Our Memories"
        },
        {
            chapter: "Chapter 10",
            bridgeMsg: "And now comes the part I cannot explain with a photo or a song... so I wrote it from my heart. 💌❤️",
            image: "images/heartfull.png",
            hint: "From My Heart",
            cta: "Read My Heart"
        },
        {
            chapter: "Chapter 11",
            bridgeMsg: "One tiny game before the end... let us see if you remember the little things that make us, us. 💘",
            image: "images/sweethug.png",
            hint: "How Well Do You Know Us?",
            cta: "Play Our Quiz"
        },
        {
            chapter: "Grand Finale",
            bridgeMsg: "You made it to the last page... but this is not the end of our story. It is just another beautiful chapter. ✨❤️",
            image: "images/bouqetsmile.png",
            hint: "One Last Thing",
            cta: "Open My Heart"
        }
    ],

    // ---- PAGE 12: GRAND FINALE ----
    finale: {
        badge: "✨ FOREVER & ALWAYS • MADE WITH LOVE BY HASHINI ✨",
        title: "For My Santhosh, With All My Love ❤️",
        subtitle: "If I could choose one person for all my tomorrows, I would still choose you...",
        message: `Santhosh,

If there is one thing I want you to remember after seeing this little journey, it is this:

You are loved. More than you realise. More than I can ever fit into a few pages.

Thank you for being part of my happiest memories, my random conversations, my silly smiles, and even the moments when we drive each other crazy. 😂❤️

I do not need a perfect life.
I just want a real one — with you, with our laughter, our little fights, our late-night talks, our hugs, and all the tiny memories we have not made yet.

I want more birthdays, more sunsets, more photos, more inside jokes, more adventures, and a thousand more ordinary days that somehow feel special because you are there.

Yesterday, I loved you.
Today, I love you.
And tomorrow, I will find another little reason to love you even more.

This is not just a surprise website.
It is a tiny piece of my heart, made just for you.

I love you, my favourite person. ❤️♾️`,
        signature: "Forever & Always Yours, Hashini 💕",
        photo: "images/hero.jpeg"
    }
};

window.SURPRISE_CONFIG = SURPRISE_CONFIG;