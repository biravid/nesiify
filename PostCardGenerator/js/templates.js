/* ==========================================================================
   NESIIFY VINTAGE POSTCARD STUDIO - THEMES & PRESETS
   ========================================================================== */

const POSTCARD_THEMES = [
  {
    id: 'vintage-love',
    name: 'Vintage Paper',
    className: 'theme-vintage-love',
    swatchColor: '#eadeca'
  },
  {
    id: 'cute-scrapbook',
    name: 'Cute Scrapbook',
    className: 'theme-cute-scrapbook',
    swatchColor: '#f4ebd9'
  },
  {
    id: 'romantic-floral',
    name: 'Romantic Floral',
    className: 'theme-romantic-floral',
    swatchColor: '#f5e4e7'
  },
  {
    id: 'birthday-celebration',
    name: 'Birthday',
    className: 'theme-birthday-celebration',
    swatchColor: '#f9eed7'
  },
  {
    id: 'golden-anniversary',
    name: 'Anniversary',
    className: 'theme-golden-anniversary',
    swatchColor: '#f2e9d4'
  },
  {
    id: 'midnight-secret',
    name: 'Midnight Secret',
    className: 'theme-midnight-secret',
    swatchColor: '#1c2333'
  },
  {
    id: 'minimal-luxury',
    name: 'Minimal Luxury',
    className: 'theme-minimal-luxury',
    swatchColor: '#f5f2eb'
  }
];

const MESSAGE_PRESETS = [
  {
    category: '🎁 Surprise Website & Gift',
    items: [
      {
        title: 'Reference Note',
        text: "Hey there,\nJust a little note to say you're amazing ! Keep shining and chasing your dreams.\nCan't wait to see what the future holds for you.\nStay happy, always!"
      },
      {
        title: 'Open Your Surprise Website',
        text: 'Dearest,\nScan the postage stamp on this vintage card to unlock your secret surprise website! I crafted this special digital memory book just for you.\nWith all my love ❤️'
      }
    ]
  },
  {
    category: '🎂 Birthday Wishes',
    items: [
      {
        title: 'Sweet Birthday Memories',
        text: 'Wishing you the happiest of birthdays!\nMay your day be filled with laughter, endless sweetness, and unforgettable moments.\nScan the stamp for your surprise!'
      }
    ]
  },
  {
    category: '💍 Anniversary & Romance',
    items: [
      {
        title: 'Happy Anniversary My Love',
        text: 'Every single day with you feels like a dream come true. Thank you for being my anchor and my joy.\nScan the QR stamp to journey through our memories!'
      }
    ]
  }
];

const DEFAULT_POSTCARD_DATA = {
  theme: 'vintage-love',
  occasion: 'Surprise Gift',
  fromName: 'Your Name',
  fromAddress: "123 Dreamer's Lane, Cloud City, DD 45678, India",
  toName: 'Someone Special',
  toAddress: '789 Heartfelt Avenue, Happiness Town, HT 12345, India',
  wishMessage: "Hey there,\nJust a little note to say you're amazing ! Keep shining and chasing your dreams.\nCan't wait to see what the future holds for you.\nStay happy, always!",
  surpriseUrl: 'https://surprise.nesiify.com/demo-gift',
  qrLabel: 'SPECIAL DELIVERY',
  date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  bgImage: null
};
