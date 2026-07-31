from PIL import Image, ImageDraw, ImageFont
import random, math

def get_font(size):
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    for p in paths:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()

def gradient(w, h, c1, c2, diag=True):
    img = Image.new("RGB", (w, h), c1)
    top = Image.new("RGB", (w, h), c1)
    bottom = Image.new("RGB", (w, h), c2)
    mask = Image.new("L", (w, h))
    md = mask.load()
    for y in range(h):
        for x in range(0, w, 4):
            v = int(255 * ((x + y) / (w + h))) if diag else int(255 * (y / h))
            for dx in range(4):
                if x + dx < w:
                    md[x+dx, y] = v
    img = Image.composite(bottom, top, mask)
    return img

def add_hearts(draw, w, h, n, color, seed):
    rnd = random.Random(seed)
    for _ in range(n):
        x = rnd.randint(0, w)
        y = rnd.randint(0, h)
        s = rnd.randint(8, 26)
        draw_heart(draw, x, y, s, color)

def draw_heart(draw, cx, cy, size, color):
    pts = []
    for t in range(0, 360, 6):
        a = math.radians(t)
        x = 16 * math.sin(a) ** 3
        y = 13*math.cos(a) - 5*math.cos(2*a) - 2*math.cos(3*a) - math.cos(4*a)
        pts.append((cx + x*size/16, cy - y*size/16))
    draw.polygon(pts, fill=color)

def make_placeholder(path, w, h, c1, c2, label, sub="", heart_color=None, heart_n=14, seed=1):
    img = gradient(w, h, c1, c2)
    draw = ImageDraw.Draw(img, "RGBA")
    if heart_color:
        add_hearts(draw, w, h, heart_n, heart_color, seed)
    # soft vignette frame
    draw.rectangle([0,0,w-1,h-1], outline=(255,255,255,60), width=3)
    f1 = get_font(max(18, w//18))
    f2 = get_font(max(12, w//34))
    tw = draw.textlength(label, font=f1)
    draw.text(((w-tw)/2, h/2 - 30), label, font=f1, fill=(255,255,255,235))
    if sub:
        tw2 = draw.textlength(sub, font=f2)
        draw.text(((w-tw2)/2, h/2 + 20), sub, font=f2, fill=(255,255,255,190))
    img.save(path, quality=88)

# Hero image
make_placeholder("images/hero.jpg", 1600, 1000, (40,20,60), (90,35,55),
                  "Replace: hero.jpg", "Your favourite photo together (1600x1000)",
                  heart_color=(255,255,255,40), heart_n=10, seed=1)

# Gallery images
gallery_meta = [
    ("First date", (60,20,50),(120,60,60)),
    ("Road trip", (30,40,70),(80,60,110)),
    ("Under the stars", (20,25,55),(70,40,90)),
    ("Silly faces", (70,30,40),(140,70,60)),
    ("Home together", (35,35,60),(90,80,120)),
    ("Just us", (55,20,45),(130,55,70)),
]
for i, (lbl, c1, c2) in enumerate(gallery_meta, start=1):
    make_placeholder(f"images/gallery{i}.jpg", 900, 900, c1, c2,
                      f"gallery{i}.jpg", lbl, heart_color=(255,255,255,35), heart_n=8, seed=i+10)

# Polaroid images
polaroid_meta = [
    "That rainy afternoon",
    "Birthday surprise",
    "Lazy Sunday",
    "The proposal",
]
for i, lbl in enumerate(polaroid_meta, start=1):
    make_placeholder(f"images/polaroid{i}.jpg", 700, 700, (50,30,40),(110,70,70),
                      f"polaroid{i}.jpg", lbl, heart_color=(255,255,255,30), heart_n=6, seed=i+20)

# Timeline images
timeline_meta = [
    "We met",
    "First 'I love you'",
    "Moved in together",
    "Said yes",
    "Still falling",
]
for i, lbl in enumerate(timeline_meta, start=1):
    make_placeholder(f"images/timeline{i}.jpg", 700, 500, (25,30,55),(95,55,80),
                      f"timeline{i}.jpg", lbl, heart_color=(255,255,255,30), heart_n=6, seed=i+30)

print("done")
