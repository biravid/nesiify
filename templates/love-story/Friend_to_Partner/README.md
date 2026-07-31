# Our Story — a proposal website

A single scrolling page that starts as an ordinary memory page, walks through
your friendship chapter by chapter, and quietly turns into a proposal by the
end. A thread running down the page (sage green → rose → gold) visually
tracks that shift as you scroll.

## Files
- `index.html` — page structure. You shouldn't need to touch this.
- `style.css` — all colors, fonts, layout, animation. Edit only if you want
  to change the look.
- `script.js` — **edit this one.** Everything you'd want to customize (names,
  chapter text, photos, signs, the ask, your own quote) lives in the `CONFIG`
  object at the very top.

## How to customize it
1. Open `script.js` in any text editor.
2. Fill in `yourName`, `theirName`, and `heroTagline`.
3. Rewrite the three `chapters` (one, two, three) with your own memories.
4. Rewrite the `signs` array — four short, specific lines work best.
5. Optionally rewrite `buildupLines` (keep it to 2–4 short lines for pacing).
6. Fill in `proposalHeadline` and `proposalMessage` — this is the actual ask.
7. Write your own `quoteText` and `quoteAuthor` — make it personal, not generic.
8. Adjust `yesButtonText`, `celebrationTitle`, and `celebrationMessage` if you like.

### Adding photos
Put your image files in the same folder as `index.html` (e.g. `photo1.jpg`),
then set the matching field in `CONFIG`, e.g.:

```js
chapters: {
  one: {
    ...
    photo: "photo1.jpg"
  }
}
```

Leave a photo field as `""` to keep the soft placeholder frame — the site
looks intentional either way, so there's no rush to add real photos before
sharing a preview.

## Hosting it for free
Any static host works since this is plain HTML/CSS/JS with no build step:

**Netlify Drop** (easiest): go to https://app.netlify.com/drop and drag the
whole folder in. You'll get a live link in seconds.

**GitHub Pages**: create a repo, upload these files (and your photos) to it,
then enable Pages in the repo's Settings → Pages, pointing at the main branch.

**Vercel**: `vercel.com/new`, import or drag-and-drop the folder, deploy with
default settings — no framework needed.

Whichever you pick, just make sure `index.html`, `style.css`, `script.js`,
and any photos you add all stay in the same folder together.
