# Anniversary Surprise — Setup Guide

A single static site: works on any free host, no build step, no backend.

## Folder structure
```
index.html
css/
  style.css      (layout & components — don't need to touch)
  dark.css       (dark theme colors)
  light.css      (light theme colors)
js/
  config.js      (EDIT THIS — all your names, dates, text & image paths)
  main.js        (site logic — don't need to touch)
images/          (replace the placeholder photos with real ones, same filenames)
audio/
  song.wav       (replace with your real song — mp3 or wav both work)
```

## 1. Personalize everything in `js/config.js`
Open `js/config.js` in any text editor. Every name, date, wish, timeline
entry, gallery caption, letter paragraph, and gift message lives there.
Nothing else in the site needs to be touched.

## 2. Replace the images
Drop your own photos into the `images/` folder using the **same filenames**
already referenced in `config.js` (e.g. `hero.jpg`, `gallery1.jpg`,
`timeline1.jpg`, `polaroid1.jpg`...) — or rename the files in `config.js` to
match whatever you upload. Recommended sizes:
- `hero.jpg` — landscape, at least 1600×1000
- `gallery*.jpg` / `polaroid*.jpg` — square, at least 800×800
- `timeline*.jpg` — landscape, at least 700×500

## 3. Replace the music
Swap `audio/song.wav` for your song (mp3 or wav), then update
`audioSrc` in `config.js` if you rename the file.

## 4. Set up the "Send" note (free, no backend)
The final note uses **FormSubmit** (formsubmit.co) to forward whatever your
partner types straight to your email — completely free, works on any static
host.

1. In `config.js`, set `recipientEmail` to the email that should receive notes.
2. Publish the site (see below) and open it once.
3. Fill in the note box and press send — FormSubmit will email that address
   a one-time confirmation link. Click it to activate.
4. From then on, every note submitted goes straight to that inbox.

(If you'd rather not use FormSubmit, any similar free form-relay service —
e.g. Formspree — works the same way: just change the `endpoint` URL inside
`js/main.js`'s `initNoteForm()` function.)

## 5. Host it for free
Any static host works since this is plain HTML/CSS/JS. Easiest options:

**GitHub Pages**
1. Create a new GitHub repo and upload all these files (keep the folder structure).
2. Repo Settings → Pages → set source to the `main` branch, root folder.
3. Your site is live at `https://yourusername.github.io/reponame`.

**Netlify / Vercel (drag & drop)**
1. Go to netlify.com (or vercel.com) → New site → drag the whole project folder in.
2. It's live instantly with a free `.netlify.app` / `.vercel.app` URL.

That's it — no build tools, no npm install, no server required.
