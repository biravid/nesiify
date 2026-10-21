/**
 * Raksha Bandhan Surprise Story Configuration
 * Customize text, names, mystery quiz, thali items, secret password, roasts, and letter content.
 */
const RAKSHA_CONFIG = {
  // Names
  brotherName: "Brother",
  sisterName: "Sister",
  
  // Scene 1: Mysterious Opening
  mysteryOpening: {
    title: "Hey... Someone has prepared something for you.",
    subtitle: "But first... Promise me you'll stay until the end? 👀",
    buttonText: "Okay, I'm Curious →",
    promiseAccepted: "Good. Let's begin. ✨"
  },

  // Scene 2: Guess Who Sent This
  guessQuiz: {
    heading: "Can You Guess Who Sent This?",
    hints: [
      { icon: "👤", text: "Someone who knows all your secrets" },
      { icon: "😂", text: "Someone who fights with you for no reason" },
      { icon: "❤️", text: "Someone who cares about you more than they admit" }
    ],
    question: "Who do you think it is?",
    options: [
      "A. Mom 👩",
      "B. Your Best Friend 🤝",
      "C. Your Sister 👧",
      "D. Someone suspicious 👀"
    ],
    feedback: "Hmm... keep going to reveal! 😏"
  },

  // Scene 3: Childhood Memory Unblur
  childhoodUnblur: {
    heading: "You Probably Don't Remember This…",
    subtitle: "Tap the button below to clear the blur and reveal a memory.",
    buttonText: "Reveal Memory ✨",
    memories: [
      {
        title: "You grew up annoying her...",
        caption: "Remember when you stole all the chocolates and blamed the cat? 😂",
        img: "assets/images/childhood_art.webp"
      },
      {
        title: "You fought over the TV remote...",
        caption: "World War 3 over cartoon channels, but you always let her win in the end.",
        img: "assets/images/hero_rakhi.webp"
      }
    ]
  },

  // Scene 4: Sister Reveal
  sisterReveal: {
    heading: "Okay... You probably know who this is now.",
    subheading: "It's your sister. ❤️",
    photo: "assets/images/sister_art.webp",
    message: "“Since I can't be there to annoy you in person right now... I still want to celebrate our virtual Raksha Bandhan together!”"
  },

  // Scene 5: Interactive Rakhi Thali Ritual
  thaliRitual: {
    heading: "Prepare the Rakhi Thali",
    instruction: "Tap each sacred item to place it onto your Thali tray!",
    items: [
      { id: "diya", name: "Diya 🪔", icon: "🪔", toast: "Good job! The light is glowing 😌" },
      { id: "flowers", name: "Flowers 🌸", icon: "🌸", toast: "At least you know how to decorate something! 😂" },
      { id: "kumkum", name: "Kumkum 🔴", icon: "🔴", toast: "Ready for your blessing 🔴" },
      { id: "sweet", name: "Sweet 🍬", icon: "🍬", toast: "Don't eat it yet! 😂" },
      { id: "rakhi", name: "Rakhi 🧵", icon: "🧵", toast: "The sacred thread is set! 🧵" }
    ]
  },

  // Scene 6: Virtual Tilak
  tilakRitual: {
    title: "Close Your Eyes... Just Kidding 😂",
    subtitle: "I wish I could put this Tilak on your forehead myself.",
    btnText: "Apply Virtual Tilak 🔴",
    brotherNoTilakPhoto: "assets/images/brother_no_tilak.webp",
    brotherWithTilakPhoto: "assets/images/brother_with_tilak.webp",
    blessing: "Consider this my little blessing & lifelong protection for you! 🥺❤️"
  },

  // Scene 7: Feed Sweet Ritual
  sweetRitual: {
    title: "Now Eat Your Sweet 🍬",
    subtitle: "You know what comes next in every Indian ritual!",
    btnText: "Feed Brother Sweet 🍬",
    sweetWaitingPhoto: "assets/images/sweet_waiting.webp",
    sweetFedPhoto: "assets/images/sweet_fed.webp",
    sisterToast: "See? You still listen to me! 😂"
  },

  // Scene 8: The Rakhi Moment Climax
  rakhiRitual: {
    title: "The Main Moment",
    subtitle: "Drag or tap the sacred Rakhi onto the wrist below to complete the ceremony!",
    btnText: "Tie the Rakhi 🧵",
    climaxQuote: "This thread may be on your wrist... but my love is always with you. ❤️",
    blessingBubbles: [
      { icon: "🌸", text: "Long Life & Health", toast: "May you live 1,000 years! 🌸" },
      { icon: "🏆", text: "Endless Success", toast: "Achieve all your dreams! 🏆" },
      { icon: "💰", text: "Pocket Money Doubled", toast: "Still owe me pizza though! 😂🍕" },
      { icon: "🛡️", text: "Forever Protection", toast: "You'll always be protected! 🛡️❤️" }
    ]
  },

  // Scene 9: Secret Password Lock
  secretLock: {
    heading: "Wait... There's One Secret Gift 🎁",
    subtitle: "Your sister locked this final surprise box. Only her real brother knows the passcode!",
    hint: "Hint: Try 'brother' or 'anna'",
    passcodes: ["brother", "anna"],
    successToast: "You really are my brother! 😂❤️ Unlocking your letter...",
    errorToast: "Nice try imposter! 😂 Think harder or check the hint!"
  },

  // Scene 10: Personal Letter
  letter: {
    envelopeTitle: "For My Brother",
    buttonText: "Open My Letter 💌",
    salutation: "Dear Brother,",
    paragraphs: [
      "We fight.",
      "We annoy each other endlessly.",
      "You steal my food.",
      "I steal your patience. 😂",
      "But no matter how much we grow up, distance doesn't change a single thing.",
      "Thank you for always having my back, picking up my calls, and being my safe place."
    ],
    closing: "Happy Raksha Bandhan ❤️",
    signature: "From your loving Sister ❤️"
  },

  // Scene 11: Sister's Secret Roast Cards
  sisterRoasts: [
    { icon: "😂", title: "Truth #1", text: "You're annoying. But you're MY annoying brother." },
    { icon: "🍕", title: "Truth #2", text: "You still owe me pizza from 2 years ago." },
    { icon: "📱", title: "Truth #3", text: "You never reply to my WhatsApp messages on time." },
    { icon: "🤫", title: "Truth #4", text: "I know all your embarrassing secrets!" },
    { icon: "❤️", title: "Truth #5", text: "Don't let this website make you emotional... okay maybe a little!" }
  ],

  // Scene 12: Night Sky Ending
  ending: {
    lines: [
      "Distance doesn't matter.",
      "Age doesn't matter.",
      "How much we fight doesn't matter.",
      "You'll always be my brother. ❤️"
    ],
    mainWish: "Happy Raksha Bandhan",
    subWish: "From your annoying little/big sister."
  }
};
