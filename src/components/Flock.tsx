"use client";

/**
 * Design 2a's hero: a murmuration of agent actions orbiting a slowly turning
 * ring, with one outlier that peels off, turns red and gets judged.
 *
 * The motion is the 2a prototype's `outlier-center` mode, ported as-is.
 * Additions: prefers-reduced-motion draws one still frame, the loop pauses
 * while the hero is off screen, density and the label layout adapt to
 * narrow screens, and the canvas is decorative (the same story is told in
 * text by the hero copy and the visually hidden caption).
 */
import { useEffect, useRef } from "react";

type Bird = { a: number; phi: number; r: number; b: number };
type Flock = { seed: number; birds: Bird[]; prev: Float32Array; n: number; fresh: boolean };

const OLIVE_FAR = "rgba(92,102,52,0.3)";
const OLIVE_NEAR = "rgba(92,102,52,0.72)";
const RED = "#d6221c";

function makeFlock(n: number, seed: number): Flock {
  let s = 1 + seed;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const birds = Array.from({ length: n }, () => ({ a: rnd() * Math.PI * 2, phi: rnd() * Math.PI * 2, r: Math.sqrt(rnd()), b: rnd() * 2 - 1 }));
  return { seed, birds, prev: new Float32Array(n * 2), n, fresh: true };
}

// Torus-ish flow, rotated in 3D and projected. Verbatim from 2a (non-ring branch).
function pos(seed: number, B: Bird, t: number, out: { x: number; y: number; z: number }) {
  const th = B.a + t * (0.22 + 0.05 * B.b);
  const R = 1 + 0.32 * Math.sin(2 * th + t * 0.6) + 0.22 * Math.sin(3 * th - t * 0.45 + seed);
  const tube = 0.3 * B.r * (1 + 0.7 * Math.sin(2 * th - t * 0.8));
  const ph = B.phi + t * 0.5;
  const x = (R + tube * Math.cos(ph)) * Math.cos(th);
  const y = (R + tube * Math.cos(ph)) * Math.sin(th);
  const z = tube * Math.sin(ph) + 0.5 * Math.sin(th * 2 + t * 0.3);
  const rx = 1.0 + 0.6 * Math.sin(t * 0.11 + seed);
  const ry = 0.7 * Math.sin(t * 0.07 + 1.3);
  let c = Math.cos(rx),
    s = Math.sin(rx);
  const y2 = y * c - z * s,
    z2 = y * s + z * c;
  c = Math.cos(ry);
  s = Math.sin(ry);
  const x2 = x * c + z2 * s,
    z3 = -x * s + z2 * c;
  const p = 3 / (3 + z3);
  out.x = x2 * p;
  out.y = y2 * p;
  out.z = z3;
}

function draw(cv: HTMLCanvasElement, f: Flock, t: number, mono: string) {
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

  const compact = w < 640;
  const cx = w * 0.5 + 30 * Math.sin(t * 0.09);
  const cy = h * (compact ? 0.27 : 0.24);
  const sc = Math.min(w, h) * (compact ? 0.34 : 0.3);
  const o = { x: 0, y: 0, z: 0 },
    near = new Path2D(),
    far = new Path2D();
  const tail = 4;
  let ox = 0,
    oy = 0;
  for (let i = 0; i < f.n; i++) {
    pos(f.seed, f.birds[i], t, o);
    let px = cx + o.x * sc,
      py = cy + o.y * sc;
    if (i === 0) {
      const k = 0.5 - 0.5 * Math.cos(t * 0.35);
      px += k * (compact ? 70 : 150);
      py -= k * (compact ? 40 : 70);
    }
    const qx = f.prev[i * 2],
      qy = f.prev[i * 2 + 1];
    f.prev[i * 2] = px;
    f.prev[i * 2 + 1] = py;
    if (f.fresh) continue;
    const dx = px - qx,
      dy = py - qy;
    const L = Math.hypot(dx, dy) || 1,
      m = Math.min(L * tail, 7) / L;
    if (i === 0) {
      ox = px;
      oy = py;
    }
    const path = o.z < 0 ? near : far;
    path.moveTo(px - dx * m, py - dy * m);
    path.lineTo(px, py);
  }
  f.fresh = false;
  ctx.lineCap = "round";
  ctx.strokeStyle = OLIVE_FAR;
  ctx.lineWidth = 1;
  ctx.stroke(far);
  ctx.strokeStyle = OLIVE_NEAR;
  ctx.lineWidth = 1.4;
  ctx.stroke(near);

  if (!ox) return;
  const k = 0.5 - 0.5 * Math.cos(t * 0.35);
  if (k <= 0.35) return;
  const a = Math.min(1, (k - 0.35) / 0.25);
  ctx.fillStyle = RED;
  ctx.beginPath();
  ctx.arc(ox, oy, 3.5, 0, 7);
  ctx.fill();
  ctx.globalAlpha = a;
  ctx.strokeStyle = RED;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(ox, oy, 14, 0, 7);
  ctx.stroke();

  const p = (0.5 + 0.47 * a).toFixed(2);
  const lines: [string, string][] = [
    ["500", "step 41 · bash"],
    ["400", "curl -X POST … -d @~/.ssh/id_rsa"],
    ["500", `p(side task) = ${p}${a > 0.95 ? "  → human_review" : ""}`],
  ];
  if (compact) {
    // Narrow screens: label sits left-aligned under the flock, never clipped at the edge.
    const tx = 20,
      ly = Math.min(h * 0.5, oy + 64);
    ctx.beginPath();
    ctx.moveTo(ox, oy + 14);
    ctx.lineTo(ox, ly - 30);
    ctx.lineTo(tx, ly - 30);
    ctx.stroke();
    ctx.textAlign = "left";
    lines.forEach(([wt, s], i) => {
      ctx.fillStyle = RED;
      ctx.font = `${wt} 11px ${mono}`;
      ctx.fillText(s, tx, ly - 12 + i * 15);
    });
  } else {
    const flip = ox > w - 380,
      d = flip ? -1 : 1;
    ctx.textAlign = flip ? "right" : "left";
    const ly = Math.max(100, Math.min(h * 0.6 - 10, oy - 44));
    ctx.beginPath();
    ctx.moveTo(ox + 10 * d, oy - 10);
    ctx.lineTo(ox + 44 * d, ly);
    ctx.lineTo(ox + 70 * d, ly);
    ctx.stroke();
    const tx = ox + 78 * d;
    lines.forEach(([wt, s], i) => {
      ctx.fillStyle = RED;
      ctx.font = `${wt} 12px ${mono}`;
      ctx.fillText(s, tx, ly - 10 + i * 16);
    });
  }
  ctx.textAlign = "left";
  ctx.globalAlpha = 1;
}

export function FlockCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains-mono").trim() || "ui-monospace, monospace";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let flock = makeFlock(cv.clientWidth < 640 ? 1400 : 2400, 3 * 17.3);
    let raf = 0,
      visible = true;
    const t0 = performance.now();

    if (reduced) {
      // Two frames so motion trails exist; t chosen with the outlier flagged.
      draw(cv, flock, 7.98, mono);
      draw(cv, flock, 8.0, mono);
      const onResize = () => {
        flock = makeFlock(cv.clientWidth < 640 ? 1400 : 2400, 3 * 17.3);
        draw(cv, flock, 7.98, mono);
        draw(cv, flock, 8.0, mono);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    // Paint immediately (two frames, so trails exist) rather than waiting for
    // the first animation frame, which never comes in a background tab.
    draw(cv, flock, 0, mono);
    draw(cv, flock, 0.016, mono);
    const loop = (now: number) => {
      if (visible) draw(cv, flock, (now - t0) / 1000, mono);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) flock.fresh = true; // avoid one long streak after resuming
    });
    io.observe(cv);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
