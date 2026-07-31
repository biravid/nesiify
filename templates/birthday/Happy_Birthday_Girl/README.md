# "For You, Always" — Birthday Surprise Site

A single-file (HTML + CSS + JS, no frameworks) romantic birthday page for couples.

## What's inside
- **Wax-seal envelope intro** — the page opens locked; the person clicks/taps a sealed envelope to "open their gift."
- **Photo memory timeline** — polaroid-style photos alternating down a center line.
- **Interactive candle-blow cake** — click each flame to blow it out; the last one reveals a wish message + confetti.
- **Flip cards** — "reasons I love you," tap to reveal.
- **Final surprise button** — reveals a closing message with a confetti burst.
- Twinkling starfield background, scroll-reveal animations, fully responsive, keyboard accessible.

## How to customize it
Open `index.html`, search for `const CONFIG = {` near the bottom (inside the `<script>` tag).
Everything editable lives there:
- `heroHeadline`, `heroSub` — the big opening message
- `memories` — array of `{ img, date, caption }` for the timeline
- `candleCount`, `wishMessage`
- `reasons` — array of strings for the flip cards
- `finalTitle`, `finalBody`, `finalSignature`

No other code needs to change.

## Adding your photos
1. Put your images inside the `images/` folder.
2. Name them to match the `img` paths in `CONFIG.memories` (e.g. `images/memory1.jpg`), or edit the paths to match your filenames.
3. If a photo is missing, that slot automatically shows a soft gradient placeholder instead of a broken image — so you can preview/host it before your photos are ready.

## Hosting it for free (pick one)

**GitHub Pages**
1. Create a new GitHub repo, upload `index.html` and the `images/` folder.
2. Repo → Settings → Pages → Deploy from branch → `main` → `/root`.
3. Your site is live at `https://yourusername.github.io/repo-name`.

**Netlify Drop** (fastest, no account needed)
1. Go to app.netlify.com/drop
2. Drag the whole project folder (with `index.html` + `images/`) into the browser window.
3. You instantly get a live link you can share.

**Vercel**
1. Sign up at vercel.com, click "Add New Project" → "Deploy" → drag/upload the folder.
2. Done — you get a free `.vercel.app` URL.

**Cloudflare Pages**
1. pages.cloudflare.com → "Upload assets" → drag your folder.
2. Free `.pages.dev` URL.

Any of these work with zero configuration since this is plain static HTML/CSS/JS.
