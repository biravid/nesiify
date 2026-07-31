/* ==========================================================================
   CONFIG.js — the ONLY file you should need to edit.
   Replace the placeholder text and image paths below with your own.
   Keep the structure (keys, brackets, commas) exactly as it is.
   ========================================================================== */

const SITE_CONFIG = {

  /* ---------- Names & core wish (shown in the hero section) ---------- */
  partnerOne: "Aiden",
  partnerTwo: "Maya",
  heroWish: "Ten years, one heart, and every tomorrow still to come.",
  heroSubline: "For the love of my life, on our anniversary.",

  /* Date you got together — used to auto-calculate "days together" */
  togetherSince: "2016-08-14",
  /* This year's anniversary date — used for the little countdown badge */
  anniversaryDate: "2026-08-14",

  /* ---------- Hero background image ---------- */
  heroImage: "images/hero.jpg",

  /* ---------- Entry screen ---------- */
  entryTitle: "A little something for you…",
  entryButtonLabel: "Open Your Surprise",

  /* ---------- Background music ----------
     Works with mp3, wav, or ogg. Replace audio/song.wav with your song. */
  audioSrc: "audio/song.wav",
  audioTitle: "Our Song",

  /* ---------- Timeline of the relationship ---------- */
  timeline: [
    {
      year: "2016",
      title: "Where It Began",
      text: "A rainy afternoon, a shared umbrella, and a conversation that refused to end.",
      image: "images/timeline1.jpg"
    },
    {
      year: "2017",
      title: "Three Little Words",
      text: "Somewhere between the laughter and the silence, we finally said it out loud.",
      image: "images/timeline2.jpg"
    },
    {
      year: "2019",
      title: "One Address",
      text: "We packed two lives into a handful of boxes and made a home out of us.",
      image: "images/timeline3.jpg"
    },
    {
      year: "2022",
      title: "She Said Yes",
      text: "Down on one knee, heart in my throat — and the easiest yes you've ever given.",
      image: "images/timeline4.jpg"
    },
    {
      year: "2026",
      title: "Still Falling",
      text: "Every year adds a chapter, and every chapter makes me fall for you all over again.",
      image: "images/timeline5.jpg"
    }
  ],

  /* ---------- Gallery of memories ---------- */
  gallery: [
    { image: "images/gallery1.jpg", caption: "The very first photo of us" },
    { image: "images/gallery2.jpg", caption: "That road trip with no map" },
    { image: "images/gallery3.jpg", caption: "Counting stars, losing count" },
    { image: "images/gallery4.jpg", caption: "Our worst photobooth faces" },
    { image: "images/gallery5.jpg", caption: "Sunday mornings, slow and soft" },
    { image: "images/gallery6.jpg", caption: "Just the two of us, always" }
  ],

  /* ---------- Polaroid memory strip ---------- */
  polaroids: [
    { image: "images/polaroid1.jpg", caption: "the rainy afternoon", rotate: -6 },
    { image: "images/polaroid2.jpg", caption: "your surprise party", rotate: 4 },
    { image: "images/polaroid3.jpg", caption: "lazy sunday", rotate: -3 },
    { image: "images/polaroid4.jpg", caption: "the proposal", rotate: 5 }
  ],

  /* ---------- The love letter (click-to-open envelope) ---------- */
  loveLetter: {
    salutation: "My love,",
    paragraphs: [
      "If you're reading this, it means you clicked, and I'm smiling somewhere just imagining your face right now.",
      "I wanted to build you something that couldn't fit in a card — a little corner of the internet that holds everything I feel but don't always say out loud.",
      "Every memory on this page is real. Every date, every silly photo, every year — it's us, and I wouldn't trade a single one of them, not even the hard ones.",
      "Thank you for choosing me, again and again, on the ordinary days as much as the extraordinary ones. Here's to every anniversary we haven't had yet."
    ],
    signature: "Forever yours"
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
  recipientEmail: "your-partner@example.com",
  noteSubject: "A note from your anniversary surprise 💌",
  notePlaceholder: "Write a little something they'll open and keep forever...",
  noteButtonLabel: "Send With Love",
  noteSuccessMessage: "Sent! It's on its way to their inbox. 💌",

  /* ---------- Theme ---------- */
  defaultTheme: "dark" /* "dark" or "light" */
};
