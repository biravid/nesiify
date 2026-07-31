/* ============================================================
   💌 EDIT ME — everything about YOUR letter lives in this file.
   No HTML/CSS/JS knowledge needed below this line.
   Just change the text between the quotes " " and save.
   ============================================================ */

const CONFIG = {

  // The password your special someone has to type to unlock the letter.
  // Keep it something only they'd know (a nickname, a date like "0704", their pet's name...)
  password: "iloveyou",

  // A gentle hint shown if they tap "Need a hint?" (leave "" for no hint button)
  hint: "The name of the song we danced to at 2am",

  // Names
  recipientName: "My Love",   // who this is for
  senderName: "Your Person",  // who it's from (signs the bottom of the letter)

  // Lock screen text
  lockTitle: "A letter for you",
  lockSubtitle: "Something written just for your eyes. Type the password to open it.",

  // The envelope / opening screen
  envelopeLabel: "To the one who has my whole heart",

  // Main letter title once opened
  letterTitle: "Every reason, in ink.",
  letterDate: "Written on a Tuesday, meant for forever",

  // The letter itself — each item in the array becomes its own paragraph,
  // and will be typed out on screen like handwriting.
  letterParagraphs: [
    "If you're reading this, it means the password worked — which also means you remembered something I wasn't sure I'd said out loud enough. Good. Because everything after this line has been true for a long time.",
    "I wanted to build you something instead of just telling you, because you deserve more than a text message that gets buried under grocery lists and forwarded memes. You deserve a whole page that only opens for you.",
    "So here it is: the version of my feelings that I don't say fast enough, don't say often enough, and definitely don't say as beautifully as I'm about to try to.",
    "I love the way you exist in a room — a little louder than you think, a little softer than you let on. I love that you double-check the stove and still forget your keys. I love being the person you call first.",
    "This isn't a grand gesture. It's a small, stubborn one — a page I built at a weird hour, just to watch you smile at a screen. If it worked, my job here is done.",
  ],

  // Closing line right before the signature
  closingLine: "Forever yours, one bad joke at a time,",

  // "Reasons I love you" flip-card section — as many or as few as you like
  loveReasons: [
    { icon: "☕", text: "The way you make coffee for two without asking" },
    { icon: "🎵", text: "You sing the wrong lyrics with full confidence" },
    { icon: "📚", text: "You dog-ear pages instead of using a bookmark" },
    { icon: "🌧️", text: "You still want to walk in the rain" },
    { icon: "🐢", text: "You stop for every dog. Every single one." },
    { icon: "🕯️", text: "You remember things I forgot I told you" },
  ],

  // A meaningful date to count up from — e.g. the day you met, first date, anniversary.
  // Format: "YYYY-MM-DDTHH:mm:00"
  specialDate: "2023-04-07T00:00:00",
  specialDateLabel: "Since the day it all started, we've shared",

  // Gallery / memories — put your own photos in the /images folder and list the filenames here.
  // If an image is missing, a pretty placeholder heart will show instead, so nothing breaks.
  gallery: [
    { src: "images/memory1.jpg", caption: "That first coffee date" },
    { src: "images/memory2.jpg", caption: "The road trip we didn't plan" },
    { src: "images/memory3.jpg", caption: "Rainy Sunday, no plans, perfect" },
    { src: "images/memory4.jpg", caption: "You, mid-laugh, my favorite sound" },
  ],

  // The big final surprise message shown after they tap the surprise button
  surpriseHeading: "One more thing…",
  surpriseMessage: "I love you more today than the version of me who started building this page — and that version already loved you a lot.",

  // Optional: a background song. Put an mp3 in /images (or anywhere) and put the path here.
  // Leave as "" if you don't want music — the site works perfectly without it.
  musicSrc: "",
};
