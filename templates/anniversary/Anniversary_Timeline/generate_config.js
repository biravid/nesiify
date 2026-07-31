const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const password = '2026-01-01'; // Marriage Date: YYYY-MM-DD
const plainData = {
  marriageDate: '2024-05-18',
  coupleNames: 'Vikram & Anjali',
  musicUrl: 'https://assets.codepen.io/25868/acoustic-guitar-romantic-background-music.mp3', // Premium romantic background track
  letterTitle: 'My Dearest Anjali,',
  letterContent: 'From the moment our paths crossed, my world changed. Every single day spent with you has been a blessing filled with warmth, laughter, and endless support. You are my rock, my greatest adventure, and my home. As we celebrate our anniversary, I look back at all these beautiful memories and realize how lucky I am. I promise to hold your hand through every season of life, loving you more with each passing day. Happy Anniversary, my love!',
  milestones: [
    {
      date: '2022-09-12',
      title: 'Our First Coffee',
      description: 'We met at a sunlit green cafe. A simple coffee date turned into hours of effortless conversation, laughter, and a spark that started our journey.',
      image: 'images/first_meet.png'
    },
    {
      date: '2023-11-24',
      title: 'Under a Thousand Stars',
      description: 'By the quiet lake, surrounded by fairy lights and the cool autumn breeze, he asked and she said a beautiful, teary-eyed "Yes".',
      image: 'images/proposal.png'
    },
    {
      date: '2024-05-18',
      title: 'The Day We Became One',
      description: 'We promised forever under a gorgeous arch of blush roses. The day our dream came true and we stepped into a lifetime together.',
      image: 'images/wedding.png'
    }
  ]
};

const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12); // Standard 12 bytes for AES-GCM

// Derive key using PBKDF2
const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');

// Encrypt
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
const encryptedBody = Buffer.concat([
  cipher.update(JSON.stringify(plainData), 'utf8'),
  cipher.final()
]);
const authTag = cipher.getAuthTag();

// Combine ciphertext and authTag for Web Crypto compatibility
const ciphertext = Buffer.concat([encryptedBody, authTag]);

const config = {
  salt: salt.toString('hex'),
  iv: iv.toString('hex'),
  ciphertext: ciphertext.toString('hex'),
  public: {
    lockScreenCover: 'images/lockscreen_cover.png',
    hint: 'Our special day (YYYY-MM-DD)'
  }
};

fs.writeFileSync(
  path.join(__dirname, 'config.json'),
  JSON.stringify(config, null, 2)
);

console.log('config.json has been encrypted and written successfully!');
