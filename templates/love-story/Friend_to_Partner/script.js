/* ==========================================================================
   EDIT EVERYTHING HERE. This is the only file you need to touch.
   Leave any "photo" field as "" to keep the pretty placeholder frame.
   To add a photo, put the image file in this same folder and write its
   filename, e.g. photo1: "us-at-the-lake.jpg"
   ========================================================================== */
const CONFIG = {

  // ---- names & hero ----
  yourName:   "Alex",
  theirName:  "Sam",
  heroTagline: "every story worth telling starts somewhere ordinary.",

  // ---- chapters of friendship ----
  chapters: {
    one: {
      title: "The Beginning",
      text: "Write about how you two met — the ordinary afternoon that turned out to matter more than either of you knew at the time.",
      photo: ""
    },
    two: {
      title: "Through Everything",
      text: "This is where you talk about the years in between — the late-night calls, the terrible decisions talked through together, the version of yourself only they've seen.",
      photo: ""
    },
    three: {
      title: "Something Shifted",
      text: "Somewhere along the way, \"friend\" stopped feeling like the whole truth. Describe the moment you first noticed — a look that lasted too long, a goodbye that felt harder than it should have.",
      photo: ""
    }
  },

  // ---- signs section: short, quotable lines ----
  signs: [
    "I tell you things before I've even decided how I feel about them yet.",
    "I've started saving the good news, just to watch your face when I tell you.",
    "Somehow \"come over\" started meaning something different than it used to.",
    "I keep picturing you in stories that haven't happened yet."
  ],

  // ---- buildup: lines fade in one at a time before the ask ----
  buildupLines: [
    "There's something I've been meaning to say.",
    "I've rewritten it a hundred times in my head.",
    "But maybe it's simpler than I've been making it."
    // the final "So, [Their Name] —" line is added automatically
  ],

  // ---- the ask ----
  proposalHeadline: "Will you start this next chapter with me?",
  proposalMessage: "Not as the friend who knows me best, but as the person I want beside me for everything that's next. You already feel like home — I'd just like to make it official.",
  finalPhoto: "",

  // ---- your own quote ----
  quoteText: "Some people fall in love. We just never fell out of friendship — we grew into something more.",
  quoteAuthor: "Alex",

  // ---- the yes button + celebration ----
  yesButtonText: "Yes, always",
  celebrationTitle: "to forever.",
  celebrationMessage: "Here's to every chapter still unwritten."
};

/* ==========================================================================
   RENDER CONFIG INTO THE PAGE
   ========================================================================== */
(function render(){
  const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  const setPhoto = (imgId, filename) => {
    const img = document.getElementById(imgId);
    if (!img) return;
    if (filename){
      img.src = filename;
      img.alt = "A photo the two of you";
      img.hidden = false;
      const frame = img.closest(".photo-frame");
      const placeholder = frame && frame.querySelector(".photo-placeholder");
      if (placeholder) placeholder.style.display = "none";
    }
  };

  set("cfg-names", `${CONFIG.yourName} & ${CONFIG.theirName}`);
  set("cfg-tagline", CONFIG.heroTagline);

  set("cfg-ch1-title", CONFIG.chapters.one.title);
  set("cfg-ch1-text", CONFIG.chapters.one.text);
  setPhoto("cfg-photo-1", CONFIG.chapters.one.photo);

  set("cfg-ch2-title", CONFIG.chapters.two.title);
  set("cfg-ch2-text", CONFIG.chapters.two.text);
  setPhoto("cfg-photo-2", CONFIG.chapters.two.photo);

  set("cfg-ch3-title", CONFIG.chapters.three.title);
  set("cfg-ch3-text", CONFIG.chapters.three.text);
  setPhoto("cfg-photo-3", CONFIG.chapters.three.photo);

  const signsList = document.getElementById("cfg-signs-list");
  if (signsList){
    signsList.innerHTML = "";
    CONFIG.signs.forEach(line => {
      const li = document.createElement("li");
      li.textContent = line;
      signsList.appendChild(li);
    });
  }

  const buildupWrap = document.getElementById("cfg-buildup-lines");
  if (buildupWrap){
    const nameLine = document.getElementById("cfg-buildup-name-line");
    buildupWrap.innerHTML = "";
    CONFIG.buildupLines.forEach(line => {
      const p = document.createElement("p");
      p.textContent = line;
      buildupWrap.appendChild(p);
    });
    const finalP = document.createElement("p");
    finalP.id = "cfg-buildup-name-line";
    finalP.innerHTML = `So, <span id="cfg-their-name-inline">${CONFIG.theirName}</span> —`;
    buildupWrap.appendChild(finalP);
  }

  set("cfg-proposal-headline", CONFIG.proposalHeadline);
  set("cfg-proposal-message", CONFIG.proposalMessage);
  setPhoto("cfg-photo-final", CONFIG.finalPhoto);

  set("cfg-quote-text", `\u201C${CONFIG.quoteText}\u201D`);
  set("cfg-quote-author", `— ${CONFIG.quoteAuthor}`);

  const yesBtn = document.getElementById("btn-yes");
  if (yesBtn) yesBtn.textContent = CONFIG.yesButtonText;

  set("cfg-celebration-title", CONFIG.celebrationTitle);
  set("cfg-celebration-message", CONFIG.celebrationMessage);
})();

/* ==========================================================================
   THE THREAD — draws itself down the page as you scroll, gaining color
   as the story moves from friendship toward the proposal.
   ========================================================================== */
(function thread(){
  const svg = document.getElementById("thread-svg");
  const path = document.getElementById("thread-path");
  const wrap = document.querySelector(".thread-wrap");
  if (!svg || !path || !wrap) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function layout(){
    const h = document.documentElement.scrollHeight;
    wrap.style.height = h + "px";
    svg.setAttribute("viewBox", `0 0 6 ${h}`);
    path.setAttribute("d", `M3,0 L3,${h}`);

    const nodes = document.querySelectorAll(".thread-node");
    nodes.forEach(node => {
      const section = node.closest(".section");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY + rect.height / 2;
      node.style.top = top + "px";
    });
  }

  function draw(){
    const total = path.getTotalLength();
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    const drawn = total * progress;
    path.style.strokeDasharray = `${drawn} ${total}`;
    path.style.strokeWidth = (2.5 + progress * 3.5).toFixed(2);
  }

  let ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { draw(); ticking = false; });
  }

  layout();
  draw();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => { layout(); draw(); });
  if (!prefersReduced){
    // relayout once fonts/images have settled
    window.addEventListener("load", () => { layout(); draw(); });
  }
})();

/* ==========================================================================
   SCROLL REVEALS
   ========================================================================== */
(function reveals(){
  document.querySelectorAll(".chapter-copy, .chapter .photo-frame, .signs-title, .signs-list, .ring-wrap, .final-photo")
    .forEach(el => el.classList.add("reveal"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
})();

/* ==========================================================================
   BUILDUP — lines fade in one by one while the section is in view
   ========================================================================== */
(function buildupSequence(){
  const section = document.getElementById("buildup");
  if (!section) return;
  const lines = section.querySelectorAll("p");

  let played = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !played){
        played = true;
        lines.forEach((line, i) => {
          setTimeout(() => line.classList.add("is-visible"), i * 700);
        });
      }
    });
  }, { threshold: 0.6 });

  io.observe(section);
})();

/* ==========================================================================
   THE YES BUTTON — celebration with lightweight confetti (no libraries)
   ========================================================================== */
(function celebration(){
  const btn = document.getElementById("btn-yes");
  const overlay = document.getElementById("celebration");
  const replay = document.getElementById("btn-replay");
  const canvas = document.getElementById("confetti-canvas");
  if (!btn || !overlay || !canvas) return;

  const ctx = canvas.getContext("2d");
  const colors = ["#E8A0B4", "#B45C7A", "#D4AF7A", "#93A889", "#FBE4E8"];
  let particles = [];
  let animId = null;

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function makeParticles(){
    particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      r: 4 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 1.5 + Math.random() * 2.5,
      drift: (Math.random() - 0.5) * 1.5,
      rot: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      shape: Math.random() > 0.5 ? "heart" : "dot"
    }));
  }

  function drawHeart(x, y, size, color, rot){
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = color;
    ctx.beginPath();
    const s = size / 2;
    ctx.moveTo(0, s * 0.6);
    ctx.bezierCurveTo(-s, -s * 0.4, -s * 0.4, -s * 1.3, 0, -s * 0.4);
    ctx.bezierCurveTo(s * 0.4, -s * 1.3, s, -s * 0.4, 0, s * 0.6);
    ctx.fill();
    ctx.restore();
  }

  function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let stillFalling = false;
    particles.forEach(p => {
      p.y += p.speed;
      p.x += p.drift;
      p.rot += p.rotSpeed;
      if (p.y < canvas.height + 30) stillFalling = true;
      if (p.shape === "heart"){
        drawHeart(p.x, p.y, p.r * 2, p.color, p.rot);
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    if (stillFalling){
      animId = requestAnimationFrame(loop);
    }
  }

  btn.addEventListener("click", () => {
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    resize();
    makeParticles();
    if (animId) cancelAnimationFrame(animId);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      loop();
    }
  });

  window.addEventListener("resize", resize);

  if (replay){
    replay.addEventListener("click", () => {
      overlay.hidden = true;
      document.body.style.overflow = "";
      if (animId) cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
