/* ==========================================================================
   CONFIG.js — the ONLY file you should need to edit.
   Replace the placeholder text and image paths below with your own.
   Keep the structure (keys, brackets, commas) exactly as it is.
   ========================================================================== */

const SITE_CONFIG = {

  /* ---------- Names & core wish (shown in the hero section) ---------- */
  partnerOne: "Narmada",
  partnerTwo: "Vijayakumar",
  heroWish: "Eight years, one heart, and every tomorrow still to come.",
  heroSubline: "For the love of my life, on our anniversary.",

  /* Date you got together — used to auto-calculate "days together" */
  togetherSince: "2018-08-23",
  /* This year's anniversary date — used for the little countdown badge */
  anniversaryDate: "2026-08-23",

  /* ---------- Hero background image ---------- */
  heroImage: "images/hero.jpeg",

  /* ---------- Entry screen ---------- */
  entryTitle: "A little something for you…",
  entryButtonLabel: "Open Your Surprise",

  /* ---------- Background music ----------
     Works with mp3, wav, or ogg. Replace audio/song.wav with your song. */
  audioSrc: "images/venmathiye.mp3",
  audioTitle: "Our Song",

  /* ---------- Timeline of the relationship ---------- */
  timeline: [
    {
      year: "2016",
      title: "our first photo together",
      text: "A rainy afternoon, a shared umbrella, and a conversation that refused to end.",
      image: "images/photo4.jpeg"
    },
    {
      year: "2017",
      title: "First lovers day",
      text: "First lovers day after proposal with his saree gift ",
      image: "images/photo14.jpeg"
    },
    {
      year: "2017",
      title: "budding lovers",
      text: "Invited to a marriage as lovers where we took photo and cropped us alone and edited him weds me",
      image: "images/photo5.jpeg"
    },
    {
      year: "2018",
      title: "Two souls one heart",
      text: "Its our wedding day officially husband and wife",
      image: "images/photo6.jpeg"
    },
    {
      year: "2018",
      title: "we promised each other",
      text: "You're my forever favorite love story",
      image: "images/photo7.jpeg"
    },
    {
      year: "2023",
      title: "The most precious gift",
      text: "31 st March 2023 ,this sparkle of our life Ela kutty born",
      image: "images/photo3.jpeg"
    }
  ],

  /* ---------- Gallery of memories ---------- */
  gallery: [
    { image: "images/photo8.jpeg", caption: "First kabbadi match experience in stadium as husband and wife" },
    { image: "images/photo9.jpeg", caption: "First outing after marriage in ECR" },
    { image: "images/photo10.jpeg", caption: "First car-couple goals achieved" },
    { image: "images/photo11.jpeg", caption: "First trip out of Tamilnadu-Coorg part of goa trip" },
    { image: "images/photo12.jpeg", caption: "Beach and you-Goa Trip" },
    { image: "images/photo13.jpeg", caption: "swimmer is swimming,non-swimmer is floating" }
  ],

  /* ---------- Polaroid memory strip ---------- */
  polaroids: [
    { image: "images/photo15.jpeg", caption: "Ela kutty's First Birthday", rotate: -6 },
    { image: "images/photo16.jpeg", caption: "Cute Family", rotate: 4 },
    { image: "images/photo17.jpeg", caption: "with Baby bump", rotate: -3 },
    { image: "images/photo18.jpeg", caption: "First start to study", rotate: 5 }
  ],

  /* ---------- The love letter (click-to-open envelope) ---------- */
  loveLetter: {
    passcode: "Letsgo@123",
    salutation: "என் அன்பே,",
    tamilVerse: `நான் உன்னோடில்லா
இப்பொழுதுகளில்

நீ கண் திறக்கும் வேளைகளில்
கண் கூசா வெளிச்சமாகவும்

எழுந்து நடக்கும் வேளைகளில்
பாதம் நோகா பாதைகளாகவும்

நீ பல்துலக்கும் வேளைகளில்
உனக்கு காரா பற்பசையாகவும்

தேனீர் அருந்தும் வேளைகளில்
இளஞ்சூட்டின் இதமாகவும்

உண்ணும் வேளைகளில் உணவின் கடைசி பருக்கையின் சுவையாகவும்

பயணிக்கும் வேளைகளில்
உனக்கு அமரும் இருக்கையாகவும்

அழும் வேளைகளில் கண்ணீரை 
கீழ் தள்ளிவிடும் உன் கன்ன மேடாகவும்

சிரிக்கும் வேளைகளில்
விழும் உன் கன்னக் குழியாகவும்

நீ இமை மூடும் வேளைகளில்
அந்தக் காரிருளாகவும்

அந்தக் காரிருள் வேளைகளில்
வரும் ஆழ்ந்த தூக்கமாகவும்

தூக்கத்தில் வரும்
கனவாகவும்

ஆக எல்லா 
வேளைகளிலும்
நீ செய்யும் எல்லா
வேலைகளிலும்
இருக்கத் தோணுதடா!

எப்பொழுதுகளிலும்
உன்னைச் 
சுற்றி சுற்றி
தழுவி கட்டிக் கொள்ளும் 
காற்றாகவாது 
வரம் தருவாய்!`,
    signature: "என்றும் உன் அன்புடன்"
  },

  /* ---------- Gift box (click to explode with confetti) ---------- */
  giftBox: {
    title: "One more thing…",
    message: "Happy Anniversary. You are, and will always be, my favourite person."
  },

  /* ---------- Final note — sent by email when the button is pressed ----------
     This site uses FormSubmit (https://formsubmit.co), a free service that
     forwards form submissions to an email address — no backend server needed,
     so it works on any free static host (GitHub Pages, Netlify, Vercel, etc).

     SETUP (one-time, takes 1 minute):
     1. Replace "recipientEmail" below with the email you want notes sent to.
     2. Open your live site once and send a test note — FormSubmit will email
        that address asking to confirm/activate it. Click the confirm link.
     3. After that, every note submitted on the site will arrive by email.
  */
  recipientEmail: "biravid26@gmail.com",
  noteSubject: "A note from your anniversary surprise 💌",
  notePlaceholder: "Write a little something they'll open and keep forever...",
  noteButtonLabel: "Send With Love",
  noteSuccessMessage: "Sent! It's on its way to their inbox. 💌",

  /* ---------- Theme ---------- */
  defaultTheme: "dark" /* "dark" or "light" */
};

// Expose globally so main.js can read it (top-level const/let does not
// automatically become a window property in a classic script).
window.SITE_CONFIG = SITE_CONFIG;
