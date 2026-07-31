# A Letter For You 💌

A surprise, password-protected love letter website. Pure HTML/CSS/JS —
no build step, no dependencies, works by just opening `index.html` or
hosting the folder anywhere static.

## Files

```
index.html     the page structure
style.css      the whole visual theme (midnight + gold + rose)
script.js      all the interaction logic (password gate, envelope
               animation, typewriter letter, flip cards, counter,
               gallery, confetti/fireworks)
config.js      <-- EDIT THIS ONE FILE for your own message, names,
               password, photos and dates. No coding needed.
images/        put your own photos here and list them in config.js
```

## How to customize

Open `config.js` and change the text between the quotes:

- `password` — what your person types to unlock the letter
- `recipientName` / `senderName`
- `letterParagraphs` — your actual letter, one paragraph per line
- `loveReasons` — the flip-card list ("things I love about you")
- `specialDate` — a meaningful date, powers the live "time together" counter
- `gallery` — photo filenames (drop the photos into `images/`) + captions
- `surpriseMessage` — the final surprise line shown in the pop-up

Everything else (colors, animations, layout) lives in `style.css` /
`script.js` if you want to go further, but you don't need to touch them.

## How to host it

Because it's just static files, you can drag-and-drop the whole folder into:

- **Netlify Drop** (netlify.com/drop) — instant free link
- **GitHub Pages** — push the folder to a repo, enable Pages
- **Vercel** — `vercel deploy` from inside the folder
- Or literally just email/AirDrop the folder and have them open `index.html`

## Note on the password

The password check happens in the browser (JavaScript), which keeps this
simple enough to host anywhere for free — but it also means it's a fun
surprise lock, not real security. Don't put anything in here you wouldn't
want a determined snoop to see by reading the page source.
