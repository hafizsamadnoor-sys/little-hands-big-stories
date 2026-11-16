#!/usr/bin/env python3
"""Build the 10 Memory Test scene images (public/mt-scenes/level-N.png).

Each level's scene has exactly 10 things (from memory-test-data.js), drawn
with PIL as simple flat icons in a 2x5 grid — no text labels, so the boy
must remember the thing + its colour from the study list + the picture.
Re-run to regenerate:  python3 tools/build_mt_scenes.py
"""
import os, json, sys
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT_DIR = os.path.join(ROOT, "public", "mt-scenes")
sys.path.insert(0, ROOT)

COL = {
    "red": "#dc2626", "blue": "#2563eb", "green": "#16a34a", "yellow": "#eab308",
    "orange": "#ea580c", "pink": "#ec4899", "purple": "#9333ea", "brown": "#92400e",
    "black": "#1f2937", "white": "#f8fafc", "grey": "#6b7280", "gold": "#d4a017",
    "black and white": "#f8fafc",  # zebra: white body, black stripes (drawn by the zebra fn)
}
OUT = "#334155"          # dark outline
BG = "#eef2f5"           # cell background (light so white objects show)
DARK = "#475569"

def E(d, cx, cy, rx, ry, fill=None, outline=None, w=3):
    d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=fill, outline=outline, width=w)

def R(d, x0, y0, x1, y1, fill=None, outline=None, w=3):
    d.rectangle([x0, y0, x1, y1], fill=fill, outline=outline, width=w)

def P(d, pts, fill=None, outline=None, w=3):
    d.polygon(pts, fill=fill, outline=outline)

def L(d, pts, fill=None, w=3):
    d.line(pts, fill=fill, width=w)

def A(d, box, start, end, fill=None, w=4):
    d.arc(box, start, end, fill=fill, width=w)

# ── one draw function per thing: fn(d, cx, cy, s, C) ─────────────
# cx, cy = cell centre; s = scale (object spans roughly 2s); C = main colour.
def kettle(d, cx, cy, s, C):
    E(d, cx, cy + 0.15 * s, 0.55 * s, 0.45 * s, fill=C, outline=OUT)
    P(d, [(cx - 0.5 * s, cy - 0.1 * s), (cx - 0.95 * s, cy - 0.55 * s), (cx - 0.8 * s, cy - 0.2 * s)], fill=C, outline=OUT)
    A(d, [cx + 0.35 * s, cy - 0.35 * s, cx + 0.95 * s, cy + 0.35 * s], -90, 90, fill=OUT, w=5)
    E(d, cx, cy - 0.32 * s, 0.2 * s, 0.12 * s, fill=DARK, outline=OUT)

def plate(d, cx, cy, s, C):
    E(d, cx, cy, 0.75 * s, 0.55 * s, fill=C, outline=OUT)
    E(d, cx, cy, 0.45 * s, 0.3 * s, fill="#ffffff", outline=OUT)

def mug(d, cx, cy, s, C):
    R(d, cx - 0.4 * s, cy - 0.4 * s, cx + 0.35 * s, cy + 0.5 * s, fill=C, outline=OUT)
    A(d, [cx + 0.2 * s, cy - 0.25 * s, cx + 0.85 * s, cy + 0.35 * s], -90, 90, fill=OUT, w=5)
    E(d, cx - 0.02 * s, cy - 0.4 * s, 0.38 * s, 0.1 * s, fill="#ffffff", outline=OUT)

def spoon(d, cx, cy, s, C):
    E(d, cx, cy - 0.3 * s, 0.28 * s, 0.42 * s, fill=C, outline=OUT)
    R(d, cx - 0.07 * s, cy + 0.05 * s, cx + 0.07 * s, cy + 0.65 * s, fill=C, outline=OUT)

def fork(d, cx, cy, s, C):
    R(d, cx - 0.07 * s, cy - 0.05 * s, cx + 0.07 * s, cy + 0.65 * s, fill=C, outline=OUT)
    for dx in (-0.22, 0, 0.22):
        R(d, cx + dx * s - 0.06 * s, cy - 0.6 * s, cx + dx * s + 0.06 * s, cy - 0.05 * s, fill=C, outline=OUT)

def knife(d, cx, cy, s, C):
    P(d, [(cx - 0.15 * s, cy - 0.65 * s), (cx + 0.25 * s, cy - 0.65 * s), (cx + 0.1 * s, cy + 0.1 * s), (cx - 0.15 * s, cy + 0.1 * s)], fill=C, outline=OUT)
    R(d, cx - 0.12 * s, cy + 0.1 * s, cx + 0.12 * s, cy + 0.65 * s, fill=DARK, outline=OUT)

def pan(d, cx, cy, s, C):
    E(d, cx - 0.1 * s, cy, 0.55 * s, 0.55 * s, fill=C, outline=OUT)
    R(d, cx + 0.4 * s, cy - 0.08 * s, cx + 1.0 * s, cy + 0.08 * s, fill=DARK, outline=OUT)

def pot(d, cx, cy, s, C):
    R(d, cx - 0.5 * s, cy - 0.2 * s, cx + 0.5 * s, cy + 0.5 * s, fill=C, outline=OUT)
    E(d, cx, cy - 0.25 * s, 0.5 * s, 0.14 * s, fill=C, outline=OUT)
    R(d, cx - 0.7 * s, cy - 0.05 * s, cx - 0.5 * s, cy + 0.1 * s, fill=C, outline=OUT)
    R(d, cx + 0.5 * s, cy - 0.05 * s, cx + 0.7 * s, cy + 0.1 * s, fill=C, outline=OUT)

def oven(d, cx, cy, s, C):
    R(d, cx - 0.55 * s, cy - 0.55 * s, cx + 0.55 * s, cy + 0.55 * s, fill=C, outline=OUT)
    R(d, cx - 0.4 * s, cy - 0.2 * s, cx + 0.4 * s, cy + 0.4 * s, fill="#64748b", outline=OUT)
    E(d, cx - 0.25 * s, cy - 0.4 * s, 0.06 * s, 0.06 * s, fill="#f8fafc")
    E(d, cx + 0.25 * s, cy - 0.4 * s, 0.06 * s, 0.06 * s, fill="#f8fafc")

def fridge(d, cx, cy, s, C):
    R(d, cx - 0.4 * s, cy - 0.65 * s, cx + 0.4 * s, cy + 0.65 * s, fill=C, outline=OUT)
    L(d, [(cx - 0.4 * s, cy - 0.1 * s), (cx + 0.4 * s, cy - 0.1 * s)], fill=OUT, w=3)
    R(d, cx + 0.22 * s, cy - 0.55 * s, cx + 0.3 * s, cy - 0.2 * s, fill=DARK)
    R(d, cx + 0.22 * s, cy + 0.05 * s, cx + 0.3 * s, cy + 0.4 * s, fill=DARK)

def barn(d, cx, cy, s, C):
    R(d, cx - 0.55 * s, cy - 0.2 * s, cx + 0.55 * s, cy + 0.6 * s, fill=C, outline=OUT)
    P(d, [(cx - 0.65 * s, cy - 0.2 * s), (cx, cy - 0.65 * s), (cx + 0.65 * s, cy - 0.2 * s)], fill="#7f1d1d", outline=OUT)
    R(d, cx - 0.18 * s, cy + 0.1 * s, cx + 0.18 * s, cy + 0.6 * s, fill="#7f1d1d", outline=OUT)
    R(d, cx - 0.35 * s, cy - 0.05 * s, cx - 0.15 * s, cy + 0.15 * s, fill="#ffffff", outline=OUT)

def fence(d, cx, cy, s, C):
    for dx in (-0.5, 0, 0.5):
        R(d, cx + dx * s - 0.08 * s, cy - 0.5 * s, cx + dx * s + 0.08 * s, cy + 0.5 * s, fill=C, outline=OUT)
    R(d, cx - 0.65 * s, cy - 0.3 * s, cx + 0.65 * s, cy - 0.15 * s, fill=C, outline=OUT)
    R(d, cx - 0.65 * s, cy + 0.15 * s, cx + 0.65 * s, cy + 0.3 * s, fill=C, outline=OUT)

def haystack(d, cx, cy, s, C):
    P(d, [(cx, cy - 0.6 * s), (cx + 0.6 * s, cy + 0.5 * s), (cx - 0.6 * s, cy + 0.5 * s)], fill=C, outline=OUT)
    L(d, [(cx - 0.3 * s, cy + 0.1 * s), (cx - 0.1 * s, cy + 0.4 * s)], fill=OUT, w=3)
    L(d, [(cx + 0.25 * s, cy), (cx + 0.4 * s, cy + 0.35 * s)], fill=OUT, w=3)

def sheep(d, cx, cy, s, C):
    E(d, cx - 0.25 * s, cy, 0.35 * s, 0.3 * s, fill=C, outline=OUT)
    E(d, cx + 0.25 * s, cy, 0.35 * s, 0.3 * s, fill=C, outline=OUT)
    E(d, cx, cy - 0.15 * s, 0.4 * s, 0.32 * s, fill=C, outline=OUT)
    E(d, cx + 0.55 * s, cy - 0.1 * s, 0.18 * s, 0.18 * s, fill="#1f2937", outline=OUT)
    for dx in (-0.3, 0.3):
        R(d, cx + dx * s - 0.05 * s, cy + 0.25 * s, cx + dx * s + 0.05 * s, cy + 0.6 * s, fill="#1f2937")

def donkey(d, cx, cy, s, C):
    E(d, cx, cy + 0.05 * s, 0.55 * s, 0.35 * s, fill=C, outline=OUT)
    E(d, cx + 0.5 * s, cy - 0.25 * s, 0.22 * s, 0.2 * s, fill=C, outline=OUT)
    P(d, [(cx + 0.4 * s, cy - 0.4 * s), (cx + 0.5 * s, cy - 0.7 * s), (cx + 0.6 * s, cy - 0.4 * s)], fill=C, outline=OUT)
    P(d, [(cx + 0.55 * s, cy - 0.4 * s), (cx + 0.68 * s, cy - 0.68 * s), (cx + 0.75 * s, cy - 0.38 * s)], fill=C, outline=OUT)
    for dx in (-0.35, -0.1, 0.15, 0.4):
        R(d, cx + dx * s - 0.05 * s, cy + 0.3 * s, cx + dx * s + 0.05 * s, cy + 0.6 * s, fill=C, outline=OUT)

def turkey(d, cx, cy, s, C):
    for ang in (-60, -30, 0, 30, 60):
        import math
        a = math.radians(ang - 90)
        x2 = cx + 0.55 * s * math.cos(a); y2 = cy - 0.1 * s + 0.55 * s * math.sin(a)
        L(d, [(cx, cy - 0.1 * s), (x2, y2)], fill=C, w=7)
    E(d, cx, cy + 0.1 * s, 0.4 * s, 0.35 * s, fill=C, outline=OUT)
    E(d, cx + 0.15 * s, cy - 0.3 * s, 0.16 * s, 0.16 * s, fill=C, outline=OUT)

def tractor(d, cx, cy, s, C):
    R(d, cx - 0.6 * s, cy - 0.1 * s, cx + 0.35 * s, cy + 0.35 * s, fill=C, outline=OUT)
    R(d, cx - 0.05 * s, cy - 0.55 * s, cx + 0.35 * s, cy - 0.1 * s, fill=C, outline=OUT)
    E(d, cx - 0.35 * s, cy + 0.35 * s, 0.28 * s, 0.28 * s, fill="#1f2937", outline=OUT)
    E(d, cx + 0.35 * s, cy + 0.35 * s, 0.18 * s, 0.18 * s, fill="#1f2937", outline=OUT)
    R(d, cx + 0.35 * s, cy - 0.75 * s, cx + 0.45 * s, cy - 0.55 * s, fill=DARK)

def wateringcan(d, cx, cy, s, C):
    R(d, cx - 0.4 * s, cy - 0.2 * s, cx + 0.35 * s, cy + 0.5 * s, fill=C, outline=OUT)
    P(d, [(cx + 0.3 * s, cy - 0.1 * s), (cx + 0.75 * s, cy - 0.45 * s), (cx + 0.8 * s, cy - 0.3 * s), (cx + 0.4 * s, cy + 0.05 * s)], fill=C, outline=OUT)
    A(d, [cx - 0.75 * s, cy - 0.35 * s, cx - 0.2 * s, cy + 0.3 * s], 90, 270, fill=OUT, w=5)

def wheelbarrow(d, cx, cy, s, C):
    P(d, [(cx - 0.6 * s, cy - 0.2 * s), (cx + 0.5 * s, cy - 0.2 * s), (cx + 0.3 * s, cy + 0.35 * s), (cx - 0.4 * s, cy + 0.35 * s)], fill=C, outline=OUT)
    E(d, cx + 0.15 * s, cy + 0.35 * s, 0.2 * s, 0.2 * s, fill="#1f2937", outline=OUT)
    L(d, [(cx - 0.6 * s, cy - 0.2 * s), (cx - 0.9 * s, cy - 0.4 * s)], fill=OUT, w=5)

def scarecrow(d, cx, cy, s, C):
    P(d, [(cx, cy - 0.65 * s), (cx + 0.4 * s, cy - 0.3 * s), (cx - 0.4 * s, cy - 0.3 * s)], fill="#f59e0b", outline=OUT)
    E(d, cx, cy - 0.15 * s, 0.2 * s, 0.2 * s, fill="#fde68a", outline=OUT)
    R(d, cx - 0.35 * s, cy + 0.05 * s, cx + 0.35 * s, cy + 0.55 * s, fill=C, outline=OUT)
    L(d, [(cx - 0.35 * s, cy + 0.15 * s), (cx - 0.8 * s, cy - 0.05 * s)], fill=OUT, w=5)
    L(d, [(cx + 0.35 * s, cy + 0.15 * s), (cx + 0.8 * s, cy - 0.05 * s)], fill=OUT, w=5)

def train(d, cx, cy, s, C):
    R(d, cx - 0.65 * s, cy - 0.35 * s, cx + 0.65 * s, cy + 0.3 * s, fill=C, outline=OUT)
    R(d, cx - 0.5 * s, cy - 0.25 * s, cx - 0.2 * s, cy + 0.05 * s, fill="#ffffff", outline=OUT)
    R(d, cx - 0.05 * s, cy - 0.25 * s, cx + 0.25 * s, cy + 0.05 * s, fill="#ffffff", outline=OUT)
    R(d, cx + 0.4 * s, cy - 0.25 * s, cx + 0.6 * s, cy + 0.05 * s, fill="#ffffff", outline=OUT)
    E(d, cx - 0.4 * s, cy + 0.3 * s, 0.14 * s, 0.14 * s, fill="#1f2937", outline=OUT)
    E(d, cx + 0.4 * s, cy + 0.3 * s, 0.14 * s, 0.14 * s, fill="#1f2937", outline=OUT)
    R(d, cx + 0.45 * s, cy - 0.6 * s, cx + 0.55 * s, cy - 0.35 * s, fill=DARK)

def signal(d, cx, cy, s, C):
    R(d, cx - 0.05 * s, cy - 0.1 * s, cx + 0.05 * s, cy + 0.65 * s, fill=DARK)
    R(d, cx - 0.18 * s, cy - 0.65 * s, cx + 0.18 * s, cy - 0.1 * s, fill="#1f2937", outline=OUT)
    E(d, cx, cy - 0.45 * s, 0.1 * s, 0.1 * s, fill=C)

def ticket(d, cx, cy, s, C):
    R(d, cx - 0.6 * s, cy - 0.35 * s, cx + 0.6 * s, cy + 0.35 * s, fill=C, outline=OUT)
    L(d, [(cx + 0.25 * s, cy - 0.35 * s), (cx + 0.25 * s, cy + 0.35 * s)], fill=OUT, w=3)
    L(d, [(cx - 0.45 * s, cy - 0.1 * s), (cx + 0.1 * s, cy - 0.1 * s)], fill=OUT, w=3)
    L(d, [(cx - 0.45 * s, cy + 0.1 * s), (cx + 0.1 * s, cy + 0.1 * s)], fill=OUT, w=3)

def platform(d, cx, cy, s, C):
    R(d, cx - 0.7 * s, cy - 0.1 * s, cx + 0.7 * s, cy + 0.35 * s, fill=C, outline=OUT)
    R(d, cx - 0.7 * s, cy - 0.1 * s, cx + 0.7 * s, cy + 0.02 * s, fill="#facc15", outline=OUT)
    R(d, cx - 0.7 * s, cy + 0.35 * s, cx + 0.7 * s, cy + 0.55 * s, fill=DARK)

def signboard(d, cx, cy, s, C):
    R(d, cx - 0.55 * s, cy - 0.5 * s, cx + 0.55 * s, cy + 0.1 * s, fill=C, outline=OUT)
    L(d, [(cx - 0.4 * s, cy - 0.3 * s), (cx + 0.4 * s, cy - 0.3 * s)], fill="#ffffff", w=4)
    L(d, [(cx - 0.4 * s, cy - 0.05 * s), (cx + 0.2 * s, cy - 0.05 * s)], fill="#ffffff", w=4)
    R(d, cx - 0.05 * s, cy + 0.1 * s, cx + 0.05 * s, cy + 0.65 * s, fill=DARK)

def track(d, cx, cy, s, C):
    for dy in (-0.25, 0.25):
        L(d, [(cx - 0.7 * s, cy + dy * s), (cx + 0.7 * s, cy + dy * s)], fill=C, w=6)
    for dx in (-0.55, -0.2, 0.15, 0.5):
        R(d, cx + dx * s - 0.06 * s, cy - 0.35 * s, cx + dx * s + 0.06 * s, cy + 0.35 * s, fill="#92400e", outline=OUT)

def tunnel(d, cx, cy, s, C):
    P(d, [(cx - 0.65 * s, cy + 0.5 * s), (cx - 0.65 * s, cy - 0.1 * s), (cx, cy - 0.65 * s), (cx + 0.65 * s, cy - 0.1 * s), (cx + 0.65 * s, cy + 0.5 * s)], fill=C, outline=OUT)
    P(d, [(cx - 0.4 * s, cy + 0.5 * s), (cx - 0.4 * s, cy - 0.05 * s), (cx, cy - 0.4 * s), (cx + 0.4 * s, cy - 0.05 * s), (cx + 0.4 * s, cy + 0.5 * s)], fill="#1f2937")

def whistle(d, cx, cy, s, C):
    E(d, cx, cy, 0.45 * s, 0.4 * s, fill=C, outline=OUT)
    R(d, cx + 0.3 * s, cy - 0.25 * s, cx + 0.8 * s, cy - 0.05 * s, fill=C, outline=OUT)
    E(d, cx - 0.1 * s, cy - 0.05 * s, 0.12 * s, 0.12 * s, fill="#ffffff", outline=OUT)

def flag(d, cx, cy, s, C):
    R(d, cx - 0.05 * s, cy - 0.65 * s, cx + 0.05 * s, cy + 0.65 * s, fill=DARK)
    P(d, [(cx + 0.05 * s, cy - 0.65 * s), (cx + 0.7 * s, cy - 0.4 * s), (cx + 0.05 * s, cy - 0.15 * s)], fill=C, outline=OUT)

def trolley(d, cx, cy, s, C):
    R(d, cx - 0.45 * s, cy - 0.3 * s, cx + 0.45 * s, cy + 0.25 * s, fill=C, outline=OUT)
    L(d, [(cx - 0.45 * s, cy - 0.3 * s), (cx - 0.7 * s, cy - 0.55 * s)], fill=OUT, w=5)
    E(d, cx - 0.25 * s, cy + 0.25 * s, 0.14 * s, 0.14 * s, fill="#1f2937", outline=OUT)
    E(d, cx + 0.25 * s, cy + 0.25 * s, 0.14 * s, 0.14 * s, fill="#1f2937", outline=OUT)

def curtain(d, cx, cy, s, C):
    R(d, cx - 0.55 * s, cy - 0.55 * s, cx + 0.55 * s, cy + 0.55 * s, fill=C, outline=OUT)
    for dx in (-0.3, 0, 0.3):
        L(d, [(cx + dx * s, cy - 0.55 * s), (cx + dx * s, cy + 0.55 * s)], fill="#1e40af", w=3)
    R(d, cx - 0.65 * s, cy - 0.65 * s, cx + 0.65 * s, cy - 0.55 * s, fill=DARK)

def wardrobe(d, cx, cy, s, C):
    R(d, cx - 0.45 * s, cy - 0.65 * s, cx + 0.45 * s, cy + 0.6 * s, fill=C, outline=OUT)
    L(d, [(cx, cy - 0.65 * s), (cx, cy + 0.6 * s)], fill=OUT, w=3)
    R(d, cx - 0.12 * s, cy - 0.05 * s, cx - 0.04 * s, cy + 0.15 * s, fill="#facc15")
    R(d, cx + 0.04 * s, cy - 0.05 * s, cx + 0.12 * s, cy + 0.15 * s, fill="#facc15")

def bedsheet(d, cx, cy, s, C):
    R(d, cx - 0.6 * s, cy - 0.3 * s, cx + 0.6 * s, cy + 0.5 * s, fill=C, outline=OUT)
    L(d, [(cx - 0.6 * s, cy), (cx + 0.6 * s, cy)], fill="#cbd5e1", w=3)
    L(d, [(cx - 0.6 * s, cy + 0.25 * s), (cx + 0.6 * s, cy + 0.25 * s)], fill="#cbd5e1", w=3)
    R(d, cx - 0.5 * s, cy - 0.55 * s, cx - 0.05 * s, cy - 0.3 * s, fill=C, outline=OUT)

def cushion(d, cx, cy, s, C):
    R(d, cx - 0.5 * s, cy - 0.4 * s, cx + 0.5 * s, cy + 0.4 * s, fill=C, outline=OUT)
    E(d, cx, cy, 0.08 * s, 0.08 * s, fill="#ffffff", outline=OUT)
    L(d, [(cx - 0.5 * s, cy - 0.4 * s), (cx - 0.35 * s, cy - 0.25 * s)], fill=OUT, w=3)

def teddy(d, cx, cy, s, C):
    E(d, cx - 0.3 * s, cy - 0.45 * s, 0.14 * s, 0.14 * s, fill=C, outline=OUT)
    E(d, cx + 0.3 * s, cy - 0.45 * s, 0.14 * s, 0.14 * s, fill=C, outline=OUT)
    E(d, cx, cy - 0.25 * s, 0.32 * s, 0.3 * s, fill=C, outline=OUT)
    E(d, cx, cy + 0.3 * s, 0.4 * s, 0.35 * s, fill=C, outline=OUT)
    E(d, cx, cy + 0.2 * s, 0.22 * s, 0.2 * s, fill="#fef3c7", outline=OUT)

def plant(d, cx, cy, s, C):
    P(d, [(cx - 0.3 * s, cy + 0.1 * s), (cx + 0.3 * s, cy + 0.1 * s), (cx + 0.2 * s, cy + 0.55 * s), (cx - 0.2 * s, cy + 0.55 * s)], fill="#b45309", outline=OUT)
    E(d, cx - 0.25 * s, cy - 0.25 * s, 0.18 * s, 0.35 * s, fill=C, outline=OUT)
    E(d, cx + 0.25 * s, cy - 0.25 * s, 0.18 * s, 0.35 * s, fill=C, outline=OUT)
    E(d, cx, cy - 0.45 * s, 0.18 * s, 0.35 * s, fill=C, outline=OUT)

def shelf(d, cx, cy, s, C):
    R(d, cx - 0.6 * s, cy + 0.1 * s, cx + 0.6 * s, cy + 0.2 * s, fill=C, outline=OUT)
    R(d, cx - 0.5 * s, cy - 0.4 * s, cx - 0.25 * s, cy + 0.1 * s, fill="#2563eb", outline=OUT)
    R(d, cx - 0.15 * s, cy - 0.3 * s, cx + 0.1 * s, cy + 0.1 * s, fill="#16a34a", outline=OUT)
    E(d, cx + 0.35 * s, cy - 0.2 * s, 0.16 * s, 0.3 * s, fill="#dc2626", outline=OUT)

def rug(d, cx, cy, s, C):
    E(d, cx, cy, 0.7 * s, 0.45 * s, fill=C, outline=OUT)
    E(d, cx, cy, 0.45 * s, 0.25 * s, fill="#ffffff", outline=OUT)

def alarmbell(d, cx, cy, s, C):
    E(d, cx, cy + 0.05 * s, 0.45 * s, 0.4 * s, fill=C, outline=OUT)
    R(d, cx - 0.08 * s, cy - 0.55 * s, cx + 0.08 * s, cy - 0.3 * s, fill=C, outline=OUT)
    E(d, cx, cy - 0.55 * s, 0.1 * s, 0.08 * s, fill=C, outline=OUT)
    L(d, [(cx - 0.35 * s, cy + 0.4 * s), (cx - 0.5 * s, cy + 0.6 * s)], fill=OUT, w=4)
    L(d, [(cx + 0.35 * s, cy + 0.4 * s), (cx + 0.5 * s, cy + 0.6 * s)], fill=OUT, w=4)

def photoframe(d, cx, cy, s, C):
    R(d, cx - 0.5 * s, cy - 0.45 * s, cx + 0.5 * s, cy + 0.45 * s, fill=C, outline=OUT)
    R(d, cx - 0.32 * s, cy - 0.28 * s, cx + 0.32 * s, cy + 0.28 * s, fill="#dbeafe", outline=OUT)
    P(d, [(cx - 0.2 * s, cy + 0.28 * s), (cx, cy - 0.05 * s), (cx + 0.2 * s, cy + 0.28 * s)], fill="#16a34a", outline=OUT)

def cross(d, cx, cy, s, C):
    R(d, cx - 0.18 * s, cy - 0.55 * s, cx + 0.18 * s, cy + 0.55 * s, fill=C, outline=OUT)
    R(d, cx - 0.55 * s, cy - 0.18 * s, cx + 0.55 * s, cy + 0.18 * s, fill=C, outline=OUT)

def wheelchair(d, cx, cy, s, C):
    E(d, cx - 0.15 * s, cy + 0.2 * s, 0.35 * s, 0.35 * s, fill=C, outline=OUT)
    E(d, cx - 0.15 * s, cy + 0.2 * s, 0.15 * s, 0.15 * s, fill="#ffffff", outline=OUT)
    E(d, cx + 0.35 * s, cy + 0.3 * s, 0.16 * s, 0.16 * s, fill=C, outline=OUT)
    R(d, cx - 0.15 * s, cy - 0.1 * s, cx + 0.3 * s, cy + 0.05 * s, fill=C, outline=OUT)
    L(d, [(cx + 0.3 * s, cy + 0.05 * s), (cx + 0.3 * s, cy - 0.45 * s)], fill=OUT, w=5)

def stretcher(d, cx, cy, s, C):
    R(d, cx - 0.6 * s, cy - 0.1 * s, cx + 0.6 * s, cy + 0.15 * s, fill=C, outline=OUT)
    for dx in (-0.45, 0.45):
        L(d, [(cx + dx * s, cy + 0.15 * s), (cx + dx * s, cy + 0.55 * s)], fill=OUT, w=5)
    R(d, cx - 0.75 * s, cy - 0.05 * s, cx - 0.6 * s, cy + 0.05 * s, fill=DARK)
    R(d, cx + 0.6 * s, cy - 0.05 * s, cx + 0.75 * s, cy + 0.05 * s, fill=DARK)

def bandage(d, cx, cy, s, C):
    R(d, cx - 0.6 * s, cy - 0.2 * s, cx + 0.6 * s, cy + 0.2 * s, fill=C, outline=OUT)
    E(d, cx - 0.3 * s, cy, 0.05 * s, 0.05 * s, fill=OUT)
    E(d, cx, cy, 0.05 * s, 0.05 * s, fill=OUT)
    E(d, cx + 0.3 * s, cy, 0.05 * s, 0.05 * s, fill=OUT)

def coat(d, cx, cy, s, C):
    P(d, [(cx - 0.2 * s, cy - 0.55 * s), (cx + 0.2 * s, cy - 0.55 * s), (cx + 0.45 * s, cy - 0.3 * s), (cx + 0.35 * s, cy + 0.55 * s), (cx - 0.35 * s, cy + 0.55 * s), (cx - 0.45 * s, cy - 0.3 * s)], fill=C, outline=OUT)
    E(d, cx, cy - 0.2 * s, 0.05 * s, 0.05 * s, fill=OUT)
    E(d, cx, cy + 0.05 * s, 0.05 * s, 0.05 * s, fill=OUT)
    E(d, cx, cy + 0.3 * s, 0.05 * s, 0.05 * s, fill=OUT)

def nursecap(d, cx, cy, s, C):
    P(d, [(cx - 0.55 * s, cy + 0.1 * s), (cx - 0.4 * s, cy - 0.35 * s), (cx + 0.4 * s, cy - 0.35 * s), (cx + 0.55 * s, cy + 0.1 * s)], fill=C, outline=OUT)
    R(d, cx - 0.06 * s, cy - 0.25 * s, cx + 0.06 * s, cy + 0.05 * s, fill="#dc2626")
    R(d, cx - 0.15 * s, cy - 0.16 * s, cx + 0.15 * s, cy - 0.04 * s, fill="#dc2626")

def crutch(d, cx, cy, s, C):
    L(d, [(cx, cy - 0.6 * s), (cx, cy + 0.55 * s)], fill=C, w=7)
    R(d, cx - 0.05 * s, cy - 0.6 * s, cx + 0.35 * s, cy - 0.45 * s, fill=C, outline=OUT)
    R(d, cx - 0.08 * s, cy + 0.55 * s, cx + 0.08 * s, cy + 0.65 * s, fill=DARK)

def thermometer(d, cx, cy, s, C):
    R(d, cx - 0.08 * s, cy - 0.6 * s, cx + 0.08 * s, cy + 0.3 * s, fill=C, outline=OUT)
    E(d, cx, cy + 0.35 * s, 0.2 * s, 0.2 * s, fill=C, outline=OUT)
    L(d, [(cx, cy + 0.3 * s), (cx, cy - 0.45 * s)], fill="#dc2626", w=4)

def medicinebox(d, cx, cy, s, C):
    R(d, cx - 0.5 * s, cy - 0.35 * s, cx + 0.5 * s, cy + 0.4 * s, fill=C, outline=OUT)
    R(d, cx - 0.55 * s, cy - 0.35 * s, cx + 0.55 * s, cy - 0.2 * s, fill=C, outline=OUT)
    R(d, cx - 0.07 * s, cy - 0.15 * s, cx + 0.07 * s, cy + 0.2 * s, fill="#ffffff")
    R(d, cx - 0.2 * s, cy - 0.02 * s, cx + 0.2 * s, cy + 0.08 * s, fill="#ffffff")

def ambulance(d, cx, cy, s, C):
    R(d, cx - 0.6 * s, cy - 0.35 * s, cx + 0.15 * s, cy + 0.3 * s, fill=C, outline=OUT)
    P(d, [(cx + 0.15 * s, cy - 0.35 * s), (cx + 0.45 * s, cy - 0.1 * s), (cx + 0.6 * s, cy - 0.1 * s), (cx + 0.6 * s, cy + 0.3 * s), (cx + 0.15 * s, cy + 0.3 * s)], fill=C, outline=OUT)
    R(d, cx - 0.4 * s, cy - 0.25 * s, cx - 0.1 * s, cy - 0.05 * s, fill="#ffffff", outline=OUT)
    R(d, cx - 0.28 * s, cy - 0.25 * s, cx - 0.22 * s, cy - 0.05 * s, fill="#dc2626")
    R(d, cx - 0.4 * s, cy - 0.13 * s, cx - 0.1 * s, cy - 0.07 * s, fill="#dc2626")
    E(d, cx - 0.35 * s, cy + 0.3 * s, 0.15 * s, 0.15 * s, fill="#1f2937", outline=OUT)
    E(d, cx + 0.35 * s, cy + 0.3 * s, 0.15 * s, 0.15 * s, fill="#1f2937", outline=OUT)

def dome(d, cx, cy, s, C):
    E(d, cx, cy + 0.1 * s, 0.55 * s, 0.5 * s, fill=C, outline=OUT)
    R(d, cx - 0.55 * s, cy + 0.1 * s, cx + 0.55 * s, cy + 0.5 * s, fill=C, outline=OUT)
    L(d, [(cx, cy - 0.4 * s), (cx, cy - 0.7 * s)], fill=OUT, w=4)
    E(d, cx, cy - 0.7 * s, 0.07 * s, 0.07 * s, fill="#d4a017", outline=OUT)

def minaret(d, cx, cy, s, C):
    R(d, cx - 0.18 * s, cy - 0.55 * s, cx + 0.18 * s, cy + 0.6 * s, fill=C, outline=OUT)
    R(d, cx - 0.3 * s, cy - 0.15 * s, cx + 0.3 * s, cy - 0.02 * s, fill=C, outline=OUT)
    P(d, [(cx - 0.18 * s, cy - 0.55 * s), (cx, cy - 0.85 * s), (cx + 0.18 * s, cy - 0.55 * s)], fill=C, outline=OUT)
    R(d, cx - 0.06 * s, cy - 0.35 * s, cx + 0.06 * s, cy - 0.15 * s, fill=DARK)

def crescent(d, cx, cy, s, C):
    E(d, cx - 0.05 * s, cy, 0.45 * s, 0.45 * s, fill=C, outline=OUT)
    E(d, cx + 0.25 * s, cy - 0.08 * s, 0.38 * s, 0.38 * s, fill=BG)
    P(d, [(cx + 0.35 * s, cy - 0.55 * s), (cx + 0.45 * s, cy - 0.35 * s), (cx + 0.55 * s, cy - 0.5 * s), (cx + 0.45 * s, cy - 0.3 * s), (cx + 0.6 * s, cy - 0.25 * s), (cx + 0.42 * s, cy - 0.2 * s), (cx + 0.5 * s, cy - 0.05 * s), (cx + 0.35 * s, cy - 0.15 * s)], fill=C, outline=OUT)

def door(d, cx, cy, s, C):
    R(d, cx - 0.35 * s, cy - 0.1 * s, cx + 0.35 * s, cy + 0.6 * s, fill=C, outline=OUT)
    E(d, cx, cy - 0.1 * s, 0.35 * s, 0.35 * s, fill=C, outline=OUT)
    E(d, cx + 0.2 * s, cy + 0.2 * s, 0.05 * s, 0.05 * s, fill="#facc15", outline=OUT)

def prayermat(d, cx, cy, s, C):
    R(d, cx - 0.4 * s, cy - 0.55 * s, cx + 0.4 * s, cy + 0.55 * s, fill=C, outline=OUT)
    P(d, [(cx - 0.25 * s, cy - 0.35 * s), (cx, cy - 0.5 * s), (cx + 0.25 * s, cy - 0.35 * s), (cx + 0.25 * s, cy + 0.1 * s), (cx - 0.25 * s, cy + 0.1 * s)], fill="#ffffff", outline=OUT)
    for dx in (-0.3, -0.1, 0.1, 0.3):
        L(d, [(cx + dx * s, cy + 0.55 * s), (cx + dx * s, cy + 0.68 * s)], fill=C, w=3)

def arch(d, cx, cy, s, C):
    A(d, [cx - 0.45 * s, cy - 0.5 * s, cx + 0.45 * s, cy + 0.5 * s], 180, 360, fill=C, w=10)
    L(d, [(cx - 0.45 * s, cy), (cx - 0.45 * s, cy + 0.55 * s)], fill=C, w=10)
    L(d, [(cx + 0.45 * s, cy), (cx + 0.45 * s, cy + 0.55 * s)], fill=C, w=10)

def loudspeaker(d, cx, cy, s, C):
    P(d, [(cx - 0.4 * s, cy - 0.2 * s), (cx + 0.3 * s, cy - 0.55 * s), (cx + 0.3 * s, cy + 0.55 * s), (cx - 0.4 * s, cy + 0.2 * s)], fill=C, outline=OUT)
    R(d, cx - 0.55 * s, cy - 0.2 * s, cx - 0.4 * s, cy + 0.2 * s, fill=DARK, outline=OUT)
    E(d, cx + 0.3 * s, cy, 0.12 * s, 0.3 * s, fill="#ffffff", outline=OUT)

def slipperrack(d, cx, cy, s, C):
    R(d, cx - 0.6 * s, cy - 0.05 * s, cx + 0.6 * s, cy + 0.05 * s, fill=C, outline=OUT)
    R(d, cx - 0.6 * s, cy + 0.35 * s, cx + 0.6 * s, cy + 0.45 * s, fill=C, outline=OUT)
    for dx in (-0.4, 0.1):
        E(d, cx + dx * s, cy - 0.2 * s, 0.18 * s, 0.12 * s, fill="#2563eb", outline=OUT)
    for dx in (-0.35, 0.2):
        E(d, cx + dx * s, cy + 0.22 * s, 0.18 * s, 0.12 * s, fill="#dc2626", outline=OUT)

def ablutiontap(d, cx, cy, s, C):
    R(d, cx - 0.1 * s, cy - 0.1 * s, cx + 0.1 * s, cy + 0.5 * s, fill=C, outline=OUT)
    R(d, cx - 0.1 * s, cy - 0.1 * s, cx + 0.5 * s, cy + 0.08 * s, fill=C, outline=OUT)
    R(d, cx + 0.4 * s, cy + 0.08 * s, cx + 0.5 * s, cy + 0.3 * s, fill=C, outline=OUT)
    E(d, cx + 0.45 * s, cy + 0.42 * s, 0.08 * s, 0.12 * s, fill="#2563eb", outline=OUT)
    E(d, cx + 0.45 * s, cy + 0.62 * s, 0.06 * s, 0.09 * s, fill="#2563eb", outline=OUT)

def plantpot(d, cx, cy, s, C):
    P(d, [(cx - 0.3 * s, cy + 0.05 * s), (cx + 0.3 * s, cy + 0.05 * s), (cx + 0.2 * s, cy + 0.55 * s), (cx - 0.2 * s, cy + 0.55 * s)], fill=C, outline=OUT)
    E(d, cx - 0.22 * s, cy - 0.25 * s, 0.16 * s, 0.3 * s, fill="#16a34a", outline=OUT)
    E(d, cx + 0.22 * s, cy - 0.25 * s, 0.16 * s, 0.3 * s, fill="#16a34a", outline=OUT)
    E(d, cx, cy - 0.45 * s, 0.16 * s, 0.3 * s, fill="#16a34a", outline=OUT)

def zebra(d, cx, cy, s, C):
    E(d, cx, cy + 0.05 * s, 0.55 * s, 0.35 * s, fill="#f8fafc", outline=OUT)
    for dx in (-0.3, 0, 0.3):
        L(d, [(cx + dx * s, cy - 0.25 * s), (cx + (dx + 0.12) * s, cy + 0.35 * s)], fill="#1f2937", w=6)
    E(d, cx + 0.55 * s, cy - 0.2 * s, 0.2 * s, 0.18 * s, fill="#f8fafc", outline=OUT)
    P(d, [(cx + 0.45 * s, cy - 0.35 * s), (cx + 0.55 * s, cy - 0.6 * s), (cx + 0.65 * s, cy - 0.35 * s)], fill="#f8fafc", outline=OUT)
    for dx in (-0.35, -0.1, 0.15, 0.4):
        R(d, cx + dx * s - 0.04 * s, cy + 0.3 * s, cx + dx * s + 0.04 * s, cy + 0.6 * s, fill="#f8fafc", outline=OUT)

def hippo(d, cx, cy, s, C):
    E(d, cx, cy + 0.1 * s, 0.55 * s, 0.35 * s, fill=C, outline=OUT)
    E(d, cx + 0.5 * s, cy - 0.1 * s, 0.25 * s, 0.22 * s, fill=C, outline=OUT)
    E(d, cx + 0.4 * s, cy - 0.32 * s, 0.08 * s, 0.08 * s, fill=C, outline=OUT)
    E(d, cx + 0.6 * s, cy - 0.32 * s, 0.08 * s, 0.08 * s, fill=C, outline=OUT)
    for dx in (-0.35, 0.35):
        R(d, cx + dx * s - 0.08 * s, cy + 0.35 * s, cx + dx * s + 0.08 * s, cy + 0.6 * s, fill=C, outline=OUT)

def rhino(d, cx, cy, s, C):
    E(d, cx, cy + 0.05 * s, 0.55 * s, 0.35 * s, fill=C, outline=OUT)
    E(d, cx + 0.55 * s, cy - 0.1 * s, 0.22 * s, 0.2 * s, fill=C, outline=OUT)
    P(d, [(cx + 0.6 * s, cy - 0.28 * s), (cx + 0.72 * s, cy - 0.6 * s), (cx + 0.78 * s, cy - 0.25 * s)], fill="#f8fafc", outline=OUT)
    for dx in (-0.35, -0.1, 0.15, 0.4):
        R(d, cx + dx * s - 0.05 * s, cy + 0.3 * s, cx + dx * s + 0.05 * s, cy + 0.6 * s, fill=C, outline=OUT)

def gorilla(d, cx, cy, s, C):
    E(d, cx, cy + 0.15 * s, 0.45 * s, 0.4 * s, fill=C, outline=OUT)
    E(d, cx, cy - 0.3 * s, 0.28 * s, 0.26 * s, fill=C, outline=OUT)
    E(d, cx, cy - 0.28 * s, 0.16 * s, 0.14 * s, fill="#6b7280", outline=OUT)
    L(d, [(cx - 0.4 * s, cy - 0.05 * s), (cx - 0.6 * s, cy + 0.5 * s)], fill=C, w=9)
    L(d, [(cx + 0.4 * s, cy - 0.05 * s), (cx + 0.6 * s, cy + 0.5 * s)], fill=C, w=9)

def flamingo(d, cx, cy, s, C):
    E(d, cx, cy + 0.1 * s, 0.4 * s, 0.3 * s, fill=C, outline=OUT)
    A(d, [cx + 0.1 * s, cy - 0.7 * s, cx + 0.7 * s, cy + 0.1 * s], 270, 90, fill=C, w=8)
    E(d, cx + 0.55 * s, cy - 0.55 * s, 0.14 * s, 0.12 * s, fill=C, outline=OUT)
    L(d, [(cx - 0.15 * s, cy + 0.35 * s), (cx - 0.15 * s, cy + 0.65 * s)], fill=C, w=4)
    L(d, [(cx + 0.1 * s, cy + 0.35 * s), (cx + 0.1 * s, cy + 0.65 * s)], fill=C, w=4)

def snake(d, cx, cy, s, C):
    pts = []
    import math
    for i in range(21):
        t = i / 20
        x = cx - 0.6 * s + 1.2 * s * t
        y = cy + 0.25 * s * math.sin(t * math.pi * 2.5)
        pts.append((x, y))
    d.line(pts, fill=C, width=14)
    E(d, cx + 0.6 * s, cy - 0.15 * s, 0.16 * s, 0.14 * s, fill=C, outline=OUT)
    L(d, [(cx + 0.75 * s, cy - 0.15 * s), (cx + 0.9 * s, cy - 0.2 * s)], fill="#dc2626", w=3)

def swan(d, cx, cy, s, C):
    E(d, cx - 0.05 * s, cy + 0.15 * s, 0.45 * s, 0.3 * s, fill=C, outline=OUT)
    A(d, [cx + 0.15 * s, cy - 0.65 * s, cx + 0.75 * s, cy + 0.15 * s], 270, 90, fill=C, w=8)
    E(d, cx + 0.6 * s, cy - 0.5 * s, 0.15 * s, 0.13 * s, fill=C, outline=OUT)
    P(d, [(cx + 0.72 * s, cy - 0.52 * s), (cx + 0.9 * s, cy - 0.45 * s), (cx + 0.72 * s, cy - 0.42 * s)], fill="#ea580c", outline=OUT)

def orangutan(d, cx, cy, s, C):
    E(d, cx, cy + 0.15 * s, 0.45 * s, 0.4 * s, fill=C, outline=OUT)
    E(d, cx, cy - 0.3 * s, 0.26 * s, 0.24 * s, fill=C, outline=OUT)
    E(d, cx, cy - 0.28 * s, 0.15 * s, 0.13 * s, fill="#fdba74", outline=OUT)
    L(d, [(cx - 0.4 * s, cy - 0.05 * s), (cx - 0.65 * s, cy + 0.55 * s)], fill=C, w=9)
    L(d, [(cx + 0.4 * s, cy - 0.05 * s), (cx + 0.65 * s, cy + 0.55 * s)], fill=C, w=9)

def panda(d, cx, cy, s, C):
    E(d, cx, cy + 0.1 * s, 0.45 * s, 0.4 * s, fill=C, outline=OUT)
    E(d, cx, cy - 0.35 * s, 0.28 * s, 0.26 * s, fill=C, outline=OUT)
    E(d, cx - 0.22 * s, cy - 0.55 * s, 0.1 * s, 0.1 * s, fill=C, outline=OUT)
    E(d, cx + 0.22 * s, cy - 0.55 * s, 0.1 * s, 0.1 * s, fill=C, outline=OUT)
    E(d, cx, cy + 0.35 * s, 0.25 * s, 0.2 * s, fill="#fef3c7", outline=OUT)

def macaw(d, cx, cy, s, C):
    E(d, cx, cy, 0.4 * s, 0.32 * s, fill=C, outline=OUT)
    E(d, cx - 0.15 * s, cy - 0.1 * s, 0.3 * s, 0.2 * s, fill="#facc15", outline=OUT)
    E(d, cx + 0.35 * s, cy - 0.2 * s, 0.16 * s, 0.14 * s, fill=C, outline=OUT)
    P(d, [(cx + 0.48 * s, cy - 0.2 * s), (cx + 0.65 * s, cy - 0.1 * s), (cx + 0.48 * s, cy - 0.05 * s)], fill="#ea580c", outline=OUT)
    P(d, [(cx - 0.3 * s, cy + 0.1 * s), (cx - 0.7 * s, cy + 0.55 * s), (cx - 0.5 * s, cy + 0.55 * s)], fill=C, outline=OUT)

def football(d, cx, cy, s, C):
    E(d, cx, cy, 0.55 * s, 0.55 * s, fill=C, outline=OUT)
    P(d, [(cx, cy - 0.25 * s), (cx + 0.22 * s, cy - 0.08 * s), (cx + 0.14 * s, cy + 0.2 * s), (cx - 0.14 * s, cy + 0.2 * s), (cx - 0.22 * s, cy - 0.08 * s)], fill="#1f2937")
    E(d, cx - 0.4 * s, cy - 0.35 * s, 0.08 * s, 0.08 * s, fill="#1f2937")
    E(d, cx + 0.4 * s, cy + 0.35 * s, 0.08 * s, 0.08 * s, fill="#1f2937")

def goalpost(d, cx, cy, s, C):
    L(d, [(cx - 0.5 * s, cy - 0.5 * s), (cx - 0.5 * s, cy + 0.55 * s)], fill=C, w=8)
    L(d, [(cx + 0.5 * s, cy - 0.5 * s), (cx + 0.5 * s, cy + 0.55 * s)], fill=C, w=8)
    L(d, [(cx - 0.5 * s, cy - 0.5 * s), (cx + 0.5 * s, cy - 0.5 * s)], fill=C, w=8)
    for dx in (-0.25, 0, 0.25):
        L(d, [(cx + dx * s, cy - 0.5 * s), (cx + dx * s, cy + 0.3 * s)], fill="#94a3b8", w=2)
    L(d, [(cx - 0.5 * s, cy - 0.1 * s), (cx + 0.5 * s, cy - 0.1 * s)], fill="#94a3b8", w=2)

def trophy(d, cx, cy, s, C):
    P(d, [(cx - 0.4 * s, cy - 0.5 * s), (cx + 0.4 * s, cy - 0.5 * s), (cx + 0.25 * s, cy), (cx - 0.25 * s, cy)], fill=C, outline=OUT)
    A(d, [cx - 0.65 * s, cy - 0.5 * s, cx - 0.2 * s, cy - 0.05 * s], 90, 270, fill=OUT, w=5)
    A(d, [cx + 0.2 * s, cy - 0.5 * s, cx + 0.65 * s, cy - 0.05 * s], 270, 90, fill=OUT, w=5)
    R(d, cx - 0.06 * s, cy, cx + 0.06 * s, cy + 0.35 * s, fill=C, outline=OUT)
    R(d, cx - 0.3 * s, cy + 0.35 * s, cx + 0.3 * s, cy + 0.5 * s, fill=C, outline=OUT)

def jersey(d, cx, cy, s, C):
    P(d, [(cx - 0.25 * s, cy - 0.5 * s), (cx + 0.25 * s, cy - 0.5 * s), (cx + 0.55 * s, cy - 0.25 * s), (cx + 0.4 * s, cy + 0.05 * s), (cx + 0.35 * s, cy + 0.55 * s), (cx - 0.35 * s, cy + 0.55 * s), (cx - 0.4 * s, cy + 0.05 * s), (cx - 0.55 * s, cy - 0.25 * s)], fill=C, outline=OUT)
    L(d, [(cx - 0.35 * s, cy + 0.2 * s), (cx + 0.35 * s, cy + 0.2 * s)], fill="#ffffff", w=4)

def cone(d, cx, cy, s, C):
    P(d, [(cx, cy - 0.6 * s), (cx + 0.4 * s, cy + 0.4 * s), (cx - 0.4 * s, cy + 0.4 * s)], fill=C, outline=OUT)
    P(d, [(cx - 0.22 * s, cy - 0.05 * s), (cx + 0.22 * s, cy - 0.05 * s), (cx + 0.3 * s, cy + 0.15 * s), (cx - 0.3 * s, cy + 0.15 * s)], fill="#ffffff")
    R(d, cx - 0.5 * s, cy + 0.4 * s, cx + 0.5 * s, cy + 0.55 * s, fill=C, outline=OUT)

def boots(d, cx, cy, s, C):
    for dx in (-0.3, 0.25):
        P(d, [(cx + dx * s - 0.2 * s, cy - 0.3 * s), (cx + dx * s - 0.05 * s, cy - 0.3 * s), (cx + dx * s - 0.05 * s, cy + 0.1 * s), (cx + dx * s + 0.3 * s, cy + 0.1 * s), (cx + dx * s + 0.3 * s, cy + 0.3 * s), (cx + dx * s - 0.2 * s, cy + 0.3 * s)], fill=C, outline=OUT)

def headband(d, cx, cy, s, C):
    A(d, [cx - 0.55 * s, cy - 0.3 * s, cx + 0.55 * s, cy + 0.3 * s], 180, 360, fill=C, w=14)
    R(d, cx - 0.55 * s, cy - 0.05 * s, cx + 0.55 * s, cy + 0.15 * s, fill=C, outline=OUT)

def scoreboard(d, cx, cy, s, C):
    R(d, cx - 0.6 * s, cy - 0.45 * s, cx + 0.6 * s, cy + 0.25 * s, fill=C, outline=OUT)
    R(d, cx - 0.45 * s, cy - 0.3 * s, cx - 0.05 * s, cy + 0.1 * s, fill="#ffffff", outline=OUT)
    R(d, cx + 0.1 * s, cy - 0.3 * s, cx + 0.45 * s, cy + 0.1 * s, fill="#ffffff", outline=OUT)
    R(d, cx - 0.4 * s, cy + 0.25 * s, cx - 0.3 * s, cy + 0.6 * s, fill=DARK)
    R(d, cx + 0.3 * s, cy + 0.25 * s, cx + 0.4 * s, cy + 0.6 * s, fill=DARK)

def ribbon(d, cx, cy, s, C):
    P(d, [(cx, cy), (cx - 0.6 * s, cy - 0.4 * s), (cx - 0.6 * s, cy + 0.4 * s)], fill=C, outline=OUT)
    P(d, [(cx, cy), (cx + 0.6 * s, cy - 0.4 * s), (cx + 0.6 * s, cy + 0.4 * s)], fill=C, outline=OUT)
    E(d, cx, cy, 0.14 * s, 0.14 * s, fill=C, outline=OUT)
    P(d, [(cx - 0.1 * s, cy + 0.1 * s), (cx - 0.35 * s, cy + 0.6 * s), (cx - 0.15 * s, cy + 0.6 * s)], fill=C, outline=OUT)
    P(d, [(cx + 0.1 * s, cy + 0.1 * s), (cx + 0.35 * s, cy + 0.6 * s), (cx + 0.15 * s, cy + 0.6 * s)], fill=C, outline=OUT)

def badmintonracket(d, cx, cy, s, C):
    E(d, cx, cy - 0.2 * s, 0.35 * s, 0.45 * s, fill=C, outline=OUT)
    E(d, cx, cy - 0.2 * s, 0.25 * s, 0.35 * s, fill="#ffffff", outline=OUT)
    L(d, [(cx - 0.25 * s, cy - 0.35 * s), (cx + 0.25 * s, cy - 0.35 * s)], fill="#94a3b8", w=2)
    L(d, [(cx - 0.25 * s, cy - 0.05 * s), (cx + 0.25 * s, cy - 0.05 * s)], fill="#94a3b8", w=2)
    L(d, [(cx, cy - 0.55 * s), (cx, cy + 0.15 * s)], fill="#94a3b8", w=2)
    R(d, cx - 0.06 * s, cy + 0.25 * s, cx + 0.06 * s, cy + 0.65 * s, fill=DARK, outline=OUT)

def hammer(d, cx, cy, s, C):
    R(d, cx - 0.4 * s, cy - 0.45 * s, cx + 0.4 * s, cy - 0.15 * s, fill=C, outline=OUT)
    R(d, cx - 0.07 * s, cy - 0.15 * s, cx + 0.07 * s, cy + 0.6 * s, fill="#92400e", outline=OUT)

def screwdriver(d, cx, cy, s, C):
    R(d, cx - 0.14 * s, cy - 0.1 * s, cx + 0.14 * s, cy + 0.55 * s, fill=C, outline=OUT)
    R(d, cx - 0.05 * s, cy - 0.6 * s, cx + 0.05 * s, cy - 0.1 * s, fill="#94a3b8", outline=OUT)
    P(d, [(cx - 0.05 * s, cy - 0.6 * s), (cx + 0.05 * s, cy - 0.6 * s), (cx, cy - 0.75 * s)], fill="#94a3b8", outline=OUT)

def saw(d, cx, cy, s, C):
    P(d, [(cx - 0.6 * s, cy - 0.2 * s), (cx + 0.4 * s, cy - 0.2 * s), (cx + 0.4 * s, cy + 0.1 * s), (cx - 0.6 * s, cy + 0.1 * s)], fill=C, outline=OUT)
    for dx in (-0.5, -0.3, -0.1, 0.1, 0.3):
        P(d, [(cx + dx * s, cy + 0.1 * s), (cx + (dx + 0.1) * s, cy + 0.1 * s), (cx + (dx + 0.05) * s, cy + 0.25 * s)], fill=C, outline=OUT)
    R(d, cx + 0.4 * s, cy - 0.25 * s, cx + 0.65 * s, cy + 0.15 * s, fill=DARK, outline=OUT)

def wrench(d, cx, cy, s, C):
    R(d, cx - 0.08 * s, cy - 0.1 * s, cx + 0.08 * s, cy + 0.6 * s, fill=C, outline=OUT)
    E(d, cx, cy - 0.35 * s, 0.3 * s, 0.3 * s, fill=C, outline=OUT)
    P(d, [(cx - 0.1 * s, cy - 0.65 * s), (cx + 0.25 * s, cy - 0.65 * s), (cx + 0.1 * s, cy - 0.35 * s), (cx - 0.05 * s, cy - 0.35 * s)], fill=BG)

def workbench(d, cx, cy, s, C):
    R(d, cx - 0.65 * s, cy - 0.2 * s, cx + 0.65 * s, cy + 0.05 * s, fill=C, outline=OUT)
    for dx in (-0.5, 0.5):
        R(d, cx + dx * s - 0.06 * s, cy + 0.05 * s, cx + dx * s + 0.06 * s, cy + 0.6 * s, fill=C, outline=OUT)
    R(d, cx - 0.4 * s, cy - 0.45 * s, cx - 0.1 * s, cy - 0.2 * s, fill="#2563eb", outline=OUT)
    E(d, cx + 0.3 * s, cy - 0.32 * s, 0.12 * s, 0.12 * s, fill="#dc2626", outline=OUT)

def vice(d, cx, cy, s, C):
    R(d, cx - 0.5 * s, cy - 0.1 * s, cx + 0.5 * s, cy + 0.1 * s, fill=C, outline=OUT)
    R(d, cx - 0.5 * s, cy - 0.1 * s, cx - 0.3 * s, cy + 0.45 * s, fill=C, outline=OUT)
    R(d, cx + 0.3 * s, cy - 0.1 * s, cx + 0.5 * s, cy + 0.45 * s, fill=C, outline=OUT)
    R(d, cx - 0.15 * s, cy - 0.45 * s, cx + 0.15 * s, cy - 0.1 * s, fill=C, outline=OUT)
    L(d, [(cx - 0.25 * s, cy + 0.45 * s), (cx + 0.25 * s, cy + 0.45 * s)], fill=OUT, w=5)

def drill(d, cx, cy, s, C):
    R(d, cx - 0.4 * s, cy - 0.35 * s, cx + 0.35 * s, cy + 0.05 * s, fill=C, outline=OUT)
    R(d, cx - 0.15 * s, cy + 0.05 * s, cx + 0.05 * s, cy + 0.5 * s, fill=C, outline=OUT)
    L(d, [(cx + 0.35 * s, cy - 0.15 * s), (cx + 0.7 * s, cy - 0.15 * s)], fill="#94a3b8", w=5)
    E(d, cx - 0.25 * s, cy - 0.15 * s, 0.07 * s, 0.07 * s, fill="#1f2937")

def toolbox(d, cx, cy, s, C):
    R(d, cx - 0.55 * s, cy - 0.25 * s, cx + 0.55 * s, cy + 0.45 * s, fill=C, outline=OUT)
    R(d, cx - 0.55 * s, cy - 0.4 * s, cx + 0.55 * s, cy - 0.25 * s, fill=C, outline=OUT)
    A(d, [cx - 0.2 * s, cy - 0.65 * s, cx + 0.2 * s, cy - 0.35 * s], 180, 360, fill=OUT, w=5)
    R(d, cx - 0.06 * s, cy - 0.25 * s, cx + 0.06 * s, cy + 0.05 * s, fill="#facc15")

def helmet(d, cx, cy, s, C):
    E(d, cx, cy + 0.05 * s, 0.55 * s, 0.5 * s, fill=C, outline=OUT)
    R(d, cx - 0.65 * s, cy + 0.3 * s, cx + 0.65 * s, cy + 0.45 * s, fill=C, outline=OUT)
    L(d, [(cx, cy - 0.45 * s), (cx, cy + 0.3 * s)], fill="#dc2626", w=5)

def safetyglasses(d, cx, cy, s, C):
    E(d, cx - 0.3 * s, cy, 0.28 * s, 0.24 * s, fill=C, outline=OUT)
    E(d, cx + 0.3 * s, cy, 0.28 * s, 0.24 * s, fill=C, outline=OUT)
    L(d, [(cx - 0.05 * s, cy), (cx + 0.05 * s, cy)], fill=C, w=5)
    L(d, [(cx - 0.58 * s, cy - 0.05 * s), (cx - 0.75 * s, cy - 0.2 * s)], fill=OUT, w=4)
    L(d, [(cx + 0.58 * s, cy - 0.05 * s), (cx + 0.75 * s, cy - 0.2 * s)], fill=OUT, w=4)

def mixingbowl(d, cx, cy, s, C):
    P(d, [(cx - 0.55 * s, cy - 0.2 * s), (cx + 0.55 * s, cy - 0.2 * s), (cx + 0.35 * s, cy + 0.45 * s), (cx - 0.35 * s, cy + 0.45 * s)], fill=C, outline=OUT)
    R(d, cx - 0.6 * s, cy - 0.3 * s, cx + 0.6 * s, cy - 0.15 * s, fill=C, outline=OUT)
    E(d, cx, cy - 0.2 * s, 0.45 * s, 0.08 * s, fill="#ffffff", outline=OUT)

def tray(d, cx, cy, s, C):
    R(d, cx - 0.6 * s, cy - 0.25 * s, cx + 0.6 * s, cy + 0.25 * s, fill=C, outline=OUT)
    R(d, cx - 0.75 * s, cy - 0.1 * s, cx - 0.6 * s, cy + 0.1 * s, fill=C, outline=OUT)
    R(d, cx + 0.6 * s, cy - 0.1 * s, cx + 0.75 * s, cy + 0.1 * s, fill=C, outline=OUT)

def apron(d, cx, cy, s, C):
    P(d, [(cx - 0.25 * s, cy - 0.55 * s), (cx + 0.25 * s, cy - 0.55 * s), (cx + 0.3 * s, cy - 0.2 * s), (cx + 0.45 * s, cy + 0.55 * s), (cx - 0.45 * s, cy + 0.55 * s), (cx - 0.3 * s, cy - 0.2 * s)], fill=C, outline=OUT)
    L(d, [(cx - 0.25 * s, cy - 0.55 * s), (cx - 0.45 * s, cy - 0.75 * s)], fill=OUT, w=4)
    L(d, [(cx + 0.25 * s, cy - 0.55 * s), (cx + 0.45 * s, cy - 0.75 * s)], fill=OUT, w=4)
    R(d, cx - 0.2 * s, cy + 0.15 * s, cx + 0.2 * s, cy + 0.4 * s, fill="#ffffff", outline=OUT)

def rollingpin(d, cx, cy, s, C):
    R(d, cx - 0.45 * s, cy - 0.14 * s, cx + 0.45 * s, cy + 0.14 * s, fill=C, outline=OUT)
    R(d, cx - 0.7 * s, cy - 0.07 * s, cx - 0.45 * s, cy + 0.07 * s, fill=DARK, outline=OUT)
    R(d, cx + 0.45 * s, cy - 0.07 * s, cx + 0.7 * s, cy + 0.07 * s, fill=DARK, outline=OUT)

def floursack(d, cx, cy, s, C):
    P(d, [(cx - 0.4 * s, cy - 0.3 * s), (cx + 0.4 * s, cy - 0.3 * s), (cx + 0.5 * s, cy + 0.5 * s), (cx - 0.5 * s, cy + 0.5 * s)], fill=C, outline=OUT)
    P(d, [(cx - 0.25 * s, cy - 0.3 * s), (cx + 0.25 * s, cy - 0.3 * s), (cx + 0.15 * s, cy - 0.55 * s), (cx - 0.15 * s, cy - 0.55 * s)], fill=C, outline=OUT)
    R(d, cx - 0.25 * s, cy - 0.35 * s, cx + 0.25 * s, cy - 0.28 * s, fill=DARK)

def cupcake(d, cx, cy, s, C):
    P(d, [(cx - 0.3 * s, cy - 0.05 * s), (cx + 0.3 * s, cy - 0.05 * s), (cx + 0.2 * s, cy + 0.5 * s), (cx - 0.2 * s, cy + 0.5 * s)], fill=C, outline=OUT)
    E(d, cx - 0.15 * s, cy - 0.2 * s, 0.22 * s, 0.18 * s, fill="#ffffff", outline=OUT)
    E(d, cx + 0.15 * s, cy - 0.2 * s, 0.22 * s, 0.18 * s, fill="#ffffff", outline=OUT)
    E(d, cx, cy - 0.35 * s, 0.2 * s, 0.16 * s, fill="#ffffff", outline=OUT)
    E(d, cx, cy - 0.5 * s, 0.08 * s, 0.08 * s, fill="#dc2626", outline=OUT)

def cookiejar(d, cx, cy, s, C):
    R(d, cx - 0.4 * s, cy - 0.3 * s, cx + 0.4 * s, cy + 0.5 * s, fill=C, outline=OUT)
    R(d, cx - 0.45 * s, cy - 0.45 * s, cx + 0.45 * s, cy - 0.3 * s, fill=C, outline=OUT)
    E(d, cx - 0.15 * s, cy, 0.12 * s, 0.12 * s, fill="#92400e", outline=OUT)
    E(d, cx + 0.18 * s, cy + 0.2 * s, 0.12 * s, 0.12 * s, fill="#92400e", outline=OUT)

def whisk(d, cx, cy, s, C):
    R(d, cx - 0.07 * s, cy - 0.6 * s, cx + 0.07 * s, cy - 0.05 * s, fill=C, outline=OUT)
    A(d, [cx - 0.35 * s, cy - 0.1 * s, cx + 0.35 * s, cy + 0.6 * s], 0, 180, fill=C, w=5)
    A(d, [cx - 0.2 * s, cy - 0.1 * s, cx + 0.2 * s, cy + 0.6 * s], 0, 180, fill=C, w=5)
    L(d, [(cx, cy - 0.05 * s), (cx, cy + 0.6 * s)], fill=C, w=5)

def spatula(d, cx, cy, s, C):
    R(d, cx - 0.22 * s, cy - 0.6 * s, cx + 0.22 * s, cy + 0.05 * s, fill=C, outline=OUT)
    R(d, cx - 0.07 * s, cy + 0.05 * s, cx + 0.07 * s, cy + 0.65 * s, fill=DARK, outline=OUT)

def croissant(d, cx, cy, s, C):
    P(d, [(cx - 0.65 * s, cy + 0.2 * s), (cx - 0.3 * s, cy - 0.35 * s), (cx, cy - 0.15 * s), (cx + 0.3 * s, cy - 0.35 * s), (cx + 0.65 * s, cy + 0.2 * s), (cx + 0.4 * s, cy + 0.4 * s), (cx - 0.4 * s, cy + 0.4 * s)], fill=C, outline=OUT)
    L(d, [(cx - 0.3 * s, cy - 0.1 * s), (cx - 0.2 * s, cy + 0.25 * s)], fill="#78350f", w=3)
    L(d, [(cx + 0.3 * s, cy - 0.1 * s), (cx + 0.2 * s, cy + 0.25 * s)], fill="#78350f", w=3)

DRAW = {
    "kettle": kettle, "plate": plate, "mug": mug, "spoon": spoon, "fork": fork,
    "knife": knife, "pan": pan, "pot": pot, "oven": oven, "fridge": fridge,
    "barn": barn, "fence": fence, "haystack": haystack, "sheep": sheep,
    "donkey": donkey, "turkey": turkey, "tractor": tractor, "wateringcan": wateringcan,
    "wheelbarrow": wheelbarrow, "scarecrow": scarecrow,
    "train": train, "signal": signal, "ticket": ticket, "platform": platform,
    "signboard": signboard, "track": track, "tunnel": tunnel, "whistle": whistle,
    "flag": flag, "trolley": trolley,
    "curtain": curtain, "wardrobe": wardrobe, "bedsheet": bedsheet, "cushion": cushion,
    "teddy": teddy, "plant": plant, "shelf": shelf, "rug": rug,
    "alarmbell": alarmbell, "photoframe": photoframe,
    "cross": cross, "wheelchair": wheelchair, "stretcher": stretcher, "bandage": bandage,
    "coat": coat, "nursecap": nursecap, "crutch": crutch, "thermometer": thermometer,
    "medicinebox": medicinebox, "ambulance": ambulance,
    "dome": dome, "minaret": minaret, "crescent": crescent, "door": door,
    "prayermat": prayermat, "arch": arch, "loudspeaker": loudspeaker,
    "slipperrack": slipperrack, "ablutiontap": ablutiontap, "plantpot": plantpot,
    "zebra": zebra, "hippo": hippo, "rhino": rhino, "gorilla": gorilla,
    "flamingo": flamingo, "snake": snake, "swan": swan, "orangutan": orangutan,
    "panda": panda, "macaw": macaw,
    "football": football, "goalpost": goalpost, "trophy": trophy, "jersey": jersey,
    "cone": cone, "boots": boots, "headband": headband, "scoreboard": scoreboard,
    "ribbon": ribbon, "badmintonracket": badmintonracket,
    "hammer": hammer, "screwdriver": screwdriver, "saw": saw, "wrench": wrench,
    "workbench": workbench, "vice": vice, "drill": drill, "toolbox": toolbox,
    "helmet": helmet, "safetyglasses": safetyglasses,
    "mixingbowl": mixingbowl, "tray": tray, "apron": apron, "rollingpin": rollingpin,
    "floursack": floursack, "cupcake": cupcake, "cookiejar": cookiejar,
    "whisk": whisk, "spatula": spatula, "croissant": croissant,
}

def build_level(level):
    W, H = 1200, 500
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    cw, ch = W // 5, H // 2
    for i, item in enumerate(level["scene"]["items"]):
        col = i % 5; row = i // 5
        cx = col * cw + cw // 2; cy = row * ch + ch // 2
        # cell frame
        d.rectangle([col * cw + 2, row * ch + 2, (col + 1) * cw - 2, (row + 1) * ch - 2],
                    outline="#cbd5e1", width=2)
        fn = DRAW.get(item["draw"])
        if not fn:
            raise SystemExit(f"no draw function for {item['draw']} (level {level['n']})")
        fn(d, cx, cy, 70, COL[item["colour"]])
    path = os.path.join(OUT_DIR, f"level-{level['n']}.png")
    img.save(path)
    return path

def main():
    # memory-test-data.js is a CommonJS module — pull the levels out with node.
    import subprocess
    js = subprocess.run(["node", "-e",
        "const MT=require('./memory-test-data.js');"
        "console.log(JSON.stringify(MT.MT_GAME_LEVELS.map(l=>({n:l.n,scene:l.scene}))))"],
        cwd=ROOT, capture_output=True, text=True)
    if js.returncode != 0:
        raise SystemExit("node load failed: " + js.stderr)
    levels = json.loads(js.stdout)
    os.makedirs(OUT_DIR, exist_ok=True)
    for lv in levels:
        p = build_level(lv)
        print("built", p, os.path.getsize(p), "bytes")

if __name__ == "__main__":
    main()
