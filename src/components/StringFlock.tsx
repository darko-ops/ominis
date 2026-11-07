"use client";

/**
 * A string murmuration: a twisted ribbon of agent actions flowing left to right,
 * curling into irregular twirls that drift, swell and dissolve. Same palette and
 * stroke treatment as the hero flock (Flock.tsx). Decorative; static frame under
 * reduced motion; loop pauses off screen.
 */
import { useEffect, useRef } from "react";

const OLIVE_FAR = "rgba(92,102,52,0.3)";
const OLIVE_NEAR = "rgba(92,102,52,0.72)";

type Bird = { s: number; phi: number; r: number; v: number };
type Strand = { n: number; prev: Float32Array; fresh: boolean; birds: Bird[] };
type Opts = { twirls?: number; twist?: number; flowSpeed?: number; density?: number };

function makeStrand(n: number, seed: number): Strand {
  let s = 1 + seed;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  return {
    n,
    prev: new Float32Array(n * 2),
    fresh: true,
    birds: Array.from({ length: n }, () => ({ s: rnd(), phi: rnd() * Math.PI * 2, r: Math.sqrt(rnd()), v: 0.85 + rnd() * 0.3 })),
  };
}

function center(s: number, t: number, w: number, h: number, twirls: number, out: { x: number; y: number; e: number }) {
  let x = s;
  let y = h * 0.62 + 26 * Math.sin(s * 0.0055 - t * 0.45) + 14 * Math.sin(s * 0.013 + t * 0.32);
  let env = 0;
  const span = w + 700;
  for (let k = 0; k < twirls; k++) {
    // Each twirl has its own irregular speed, size, strength and direction, so there's no repeating rhythm.
    const g = k * 2.399 + 0.7;
    const drift = t * (0.013 + 0.007 * Math.sin(g * 3.1)) + 0.04 * Math.sin(t * 0.07 + g) + k / twirls + 0.17 * Math.sin(g * 5.3);
    const xc = (((drift % 1) + 1) % 1) * span - 350;
    const wd = 95 + 45 * Math.sin(t * 0.13 + g * 1.7) + 20 * Math.sin(t * 0.31 + g);
    // Strength swells and fades out, so a twirl sometimes dissolves into a gentle bend.
    const str = Math.max(0, 0.35 + 0.65 * Math.sin(t * 0.09 + g * 2.3) * Math.sin(t * 0.053 + g));
    const dir = Math.sin(t * 0.041 + g * 1.9) > -0.2 ? 1 : -1;
    const u = s - xc;
    if (str > 0 && u > -wd && u < wd) {
      const th = (Math.PI * (u + wd)) / wd,
        a = wd / Math.PI,
        e = Math.sin(th / 2) ** 2 * str;
      const b = (1.15 + 0.8 * str) * a * e;
      x += b * Math.sin(th);
      y -= dir * b * (1 - Math.cos(th));
      env = Math.max(env, e);
    }
  }
  out.x = x;
  out.y = y;
  out.e = env;
}

function draw(cv: HTMLCanvasElement, S: Strand, t: number, o: Required<Opts>) {
  const dpr = window.devicePixelRatio || 1;
  const w = cv.clientWidth,
    h = cv.clientHeight;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
  }
  const ctx = cv.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const range = w + 300;
  const A = { x: 0, y: 0, e: 0 },
    B = { x: 0, y: 0, e: 0 };
  const near = new Path2D(),
    far = new Path2D();
  for (let i = 0; i < S.n; i++) {
    const bd = S.birds[i];
    const s = ((((bd.s * range + t * 70 * o.flowSpeed * bd.v) % range) + range) % range) - 150;
    center(s, t, w, h, o.twirls, A);
    center(s + 2, t, w, h, o.twirls, B);
    let tx = B.x - A.x,
      ty = B.y - A.y;
    const tl = Math.hypot(tx, ty) || 1;
    tx /= tl;
    ty /= tl;
    const R = 26 * (1 + 0.55 * Math.sin(s * 0.009 - t * 0.7)) * (1 + 0.9 * A.e);
    const ang = bd.phi + s * 0.028 * o.twist + t * 1.1 * o.twist;
    const d = R * bd.r * Math.cos(ang),
      z = Math.sin(ang);
    const px = A.x - ty * d,
      py = A.y + tx * d;
    const qx = S.prev[i * 2],
      qy = S.prev[i * 2 + 1];
    S.prev[i * 2] = px;
    S.prev[i * 2 + 1] = py;
    if (S.fresh) continue;
    const dx = px - qx,
      dy = py - qy;
    const L = Math.hypot(dx, dy) || 1;
    if (L > 40) continue; // skip the wrap-around jump
    const m = Math.min(L * 4, 7) / L;
    const path = z < 0 ? near : far;
    path.moveTo(px - dx * m, py - dy * m);
    path.lineTo(px, py);
  }
  S.fresh = false;
  ctx.lineCap = "round";
  ctx.strokeStyle = OLIVE_FAR;
  ctx.lineWidth = 1;
  ctx.stroke(far);
  ctx.strokeStyle = OLIVE_NEAR;
  ctx.lineWidth = 1.4;
  ctx.stroke(near);
}

export function StringFlock({ className = "", twirls = 2, twist = 1, flowSpeed = 1, density = 1600 }: Opts & { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const o = { twirls: Math.max(0, Math.min(4, Math.round(twirls))), twist, flowSpeed, density };
    const n = cv.clientWidth < 640 ? Math.round(density * 0.6) : density;
    const strand = makeStrand(n, 7);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Two frames so motion trails exist; redrawn on resize since the canvas is sized in draw().
      const still = () => {
        strand.fresh = true;
        draw(cv, strand, 7.98, o);
        draw(cv, strand, 8.0, o);
      };
      still();
      window.addEventListener("resize", still);
      return () => window.removeEventListener("resize", still);
    }
    draw(cv, strand, 0, o);
    draw(cv, strand, 0.016, o);
    let raf = 0,
      visible = true;
    const t0 = performance.now();
    const loop = (now: number) => {
      if (visible) draw(cv, strand, (now - t0) / 1000, o);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) strand.fresh = true;
    });
    io.observe(cv);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [twirls, twist, flowSpeed, density]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
