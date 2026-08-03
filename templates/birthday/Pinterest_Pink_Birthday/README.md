# Birthday Surprise — static mobile website

A single-page, no-build birthday experience inspired by the supplied pink / rose / tulip / polaroid references.

## Files

- `index.html` — all seven screens and markup.
- `style.css` — responsive visual design and animations.
- `script.js` — navigation, balloons, audio player, replay, swipe and keyboard support.
- `config.js` — **the only file you normally need to edit**.
- `assets/` — supplied reference artwork plus your own photos/audio.

## Personalize it

1. Put your files in `assets/`.
2. Open `config.js`.
3. Change:
   - `from`
   - `personName`
   - `date`
   - `coverIntro`
   - `songTitle`
   - `audio`
   - `userPhoto`
   - `gallery`
   - `cakeMessage`
   - `finalMessage`
4. Open `index.html` in a browser, or upload the entire folder to a static host.

### Recommended asset setup

```text
assets/
  your-photo.jpg
  memory-1.jpg
  memory-2.jpg
  memory-3.jpg
  memory-4.jpg
  song.mp3
```

The site has fallback artwork from the supplied references, so it still renders while you are setting up your own files.

## Free hosting

No Node.js, database, build command, or server is required.

Upload the folder as-is to any static hosting provider. GitHub Pages is especially simple: create a repository, upload these files, then enable Pages from the repository settings.

## Interaction flow

1. Open surprise
2. Accept my love → bouquet
3. Photo frame + audio player
4. Tap three balloons → launch surprise
5. Polaroid memory gallery
6. Cake + Happy Birthday
7. Final wishes + replay

On mobile, horizontal swipe also moves between screens. On desktop, arrow keys work too.

## Notes

Browsers commonly block autoplay with sound until the visitor interacts with the page. This design intentionally starts audio when the user presses the player button.
