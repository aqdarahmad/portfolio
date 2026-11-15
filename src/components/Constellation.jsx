import { useEffect, useRef } from "react";

/*
  Constellation: the living background.
  Points drift slowly and join their neighbours with hairlines, a few of them
  are gold sparkle stars that twinkle, soft pools of colour wander behind them,
  and small pulses of light travel along the links. The pointer is a node of its
  own: points near it lean towards it and link to it. When nobody is touching
  the page, a light wanders by itself.
  Draws one still frame when the visitor prefers reduced motion, and removes
  points on slower devices.
*/

const PALETTE = {
  light: {
    line: [168, 25, 90],
    node: [224, 64, 127],
    spark: [201, 150, 43],
    face: [224, 64, 127],
    link: [201, 150, 43],
    blobs: [
      [255, 211, 228, 0.9],
      [242, 213, 138, 0.32],
      [224, 64, 127, 0.14],
    ],
    lineAlpha: 0.55,
    nodeAlpha: 0.8,
    faceAlpha: 0.07,
  },
  dark: {
    line: [255, 143, 186],
    node: [255, 232, 241],
    spark: [242, 213, 138],
    face: [255, 143, 186],
    link: [242, 213, 138],
    blobs: [
      [168, 25, 90, 0.38],
      [242, 213, 138, 0.1],
      [112, 40, 140, 0.3],
    ],
    lineAlpha: 0.5,
    nodeAlpha: 0.85,
    faceAlpha: 0.06,
  },
};

const TAU = Math.PI * 2;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOutCubic = (v) => 1 - Math.pow(1 - v, 3);
const smooth = (v) => v * v * (3 - 2 * v);
const mod = (v, m) => ((v % m) + m) % m;
const mixRgb = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const rgba = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

function mixPalette(t) {
  const L = PALETTE.light;
  const D = PALETTE.dark;
  return {
    line: mixRgb(L.line, D.line, t),
    node: mixRgb(L.node, D.node, t),
    spark: mixRgb(L.spark, D.spark, t),
    face: mixRgb(L.face, D.face, t),
    link: mixRgb(L.link, D.link, t),
    blobs: L.blobs.map((b, i) => [...mixRgb(b, D.blobs[i], t), b[3] + (D.blobs[i][3] - b[3]) * t]),
    lineAlpha: L.lineAlpha + (D.lineAlpha - L.lineAlpha) * t,
    nodeAlpha: L.nodeAlpha + (D.nodeAlpha - L.nodeAlpha) * t,
    faceAlpha: L.faceAlpha + (D.faceAlpha - L.faceAlpha) * t,
  };
}

function makeNode(w, h) {
  const angle = Math.random() * TAU;
  const speed = 4 + Math.random() * 9;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    z: 0.4 + Math.random() * 0.6,
    r: 1 + Math.random() * 1.3,
    phase: Math.random() * TAU,
    spark: Math.random() < 0.13,
    twinkle: 0.8 + Math.random() * 1.2,
  };
}

function targetCount(w, small) {
  const area = w * (small ? 800 : 900);
  return Math.round(Math.min(small ? 56 : 120, Math.max(26, area / 17000)));
}

export default function Constellation({ dark }) {
  const canvasRef = useRef(null);
  const darkRef = useRef(dark);
  const kickRef = useRef(() => {});

  useEffect(() => {
    darkRef.current = dark;
    kickRef.current();
  }, [dark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 700px)");
    const s = {
      w: 0,
      h: 0,
      nodes: [],
      pulses: [],
      start: performance.now(),
      prev: performance.now(),
      target: { x: 0.68, y: 0.4 },
      pointer: { x: 0.68, y: 0.4 },
      lastInput: -1e9,
      focus: 0,
      dark: darkRef.current ? 1 : 0,
      raf: 0,
      frames: 0,
      slow: 0,
      tuned: 0,
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);

      const want = targetCount(w, small.matches);
      if (s.nodes.length === 0 || Math.abs(want - s.nodes.length) > want * 0.35) {
        s.nodes = Array.from({ length: want }, () => makeNode(w, h));
        s.tuned = 0;
      } else if (s.w) {
        s.nodes.forEach((n) => {
          n.x *= w / s.w;
          n.y *= h / s.h;
        });
      }
      s.w = w;
      s.h = h;
    };

    const draw = (now) => {
      const reduced = motion.matches;
      const elapsed = (now - s.start) / 1000;
      const dt = reduced ? 0 : Math.min(0.05, (now - s.prev) / 1000);
      s.prev = now;
      const t = reduced ? 8 : elapsed + 8;
      const intro = reduced ? 1 : easeOutCubic(clamp01(elapsed / 2.6));
      const { w, h, nodes } = s;
      const n = nodes.length;
      if (!w || !n) return { dt, intro };

      // pointer, or a light that wanders by itself when nobody is touching the page
      const idle = reduced ? 0 : smooth(clamp01(((now - s.lastInput) / 1000 - 2.5) / 2.0));
      const driftX = 0.5 + 0.34 * Math.sin(t * 0.16);
      const driftY = 0.45 + 0.26 * Math.cos(t * 0.12 + 1.0);
      const tx = s.target.x + (driftX - s.target.x) * idle;
      const ty = s.target.y + (driftY - s.target.y) * idle;
      const follow = reduced ? 1 : 1 - Math.exp(-dt * 3.2);
      s.pointer.x += (tx - s.pointer.x) * follow;
      s.pointer.y += (ty - s.pointer.y) * follow;
      const px = s.pointer.x * w;
      const py = s.pointer.y * h;

      const scrollY = window.scrollY || 0;
      const focusTarget = clamp01(scrollY / (window.innerHeight * 0.8));
      s.focus += (focusTarget - s.focus) * (reduced ? 1 : 1 - Math.exp(-dt * 4));
      s.dark += ((darkRef.current ? 1 : 0) - s.dark) * (reduced ? 1 : 1 - Math.exp(-dt * 5));
      const P = mixPalette(s.dark);
      const calm = 1 - 0.35 * s.focus;

      ctx.clearRect(0, 0, w, h);

      // soft pools of colour that wander behind everything
      const reach = Math.max(w, h) * 0.62;
      P.blobs.forEach((b, i) => {
        const bx = w * (0.5 + 0.42 * Math.sin(t * (0.07 + i * 0.023) + i * 2.1));
        const by = h * (0.5 + 0.36 * Math.cos(t * (0.05 + i * 0.031) + i * 1.3));
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, reach);
        const a = b[3] * intro * (1 - 0.3 * s.focus);
        g.addColorStop(0, rgba(b, a));
        g.addColorStop(1, rgba(b, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });

      // move the points, then place them (with a little parallax while scrolling)
      const margin = 60;
      const pos = new Array(n);
      const vis = new Array(n);
      for (let i = 0; i < n; i += 1) {
        const nd = nodes[i];
        nd.x += (nd.vx + Math.sin(t * 0.23 + nd.phase) * 5) * dt * nd.z;
        nd.y += (nd.vy + Math.cos(t * 0.19 + nd.phase * 1.3) * 5) * dt * nd.z;
        nd.x = mod(nd.x + margin, w + margin * 2) - margin;
        nd.y = mod(nd.y + margin, h + margin * 2) - margin;

        let sx = nd.x;
        let sy = mod(nd.y - scrollY * 0.14 * nd.z + margin, h + margin * 2) - margin;
        const dx = px - sx;
        const dy = py - sy;
        const d = Math.hypot(dx, dy);
        if (d < 230) {
          const f = (1 - d / 230) * 0.12;
          sx += dx * f;
          sy += dy * f;
        }
        pos[i] = [sx, sy];
        vis[i] = smooth(clamp01(intro * 1.7 - (i / n) * 0.7));
      }

      // links and the faces between three close points
      const reachLink = Math.min(190, Math.max(110, w * 0.13));
      const edges = [];
      const near = Array.from({ length: n }, () => []);
      const faceReach = reachLink * 0.8;
      ctx.lineWidth = 1;
      for (let i = 0; i < n; i += 1) {
        for (let j = i + 1; j < n; j += 1) {
          const dx = pos[j][0] - pos[i][0];
          const dy = pos[j][1] - pos[i][1];
          const d = Math.hypot(dx, dy);
          if (d >= reachLink) continue;
          const k = 1 - d / reachLink;
          const alpha = k * k * P.lineAlpha * ((nodes[i].z + nodes[j].z) / 2) * Math.min(vis[i], vis[j]) * calm;
          if (alpha < 0.01) continue;
          ctx.strokeStyle = rgba(P.line, alpha);
          ctx.beginPath();
          ctx.moveTo(pos[i][0], pos[i][1]);
          ctx.lineTo(pos[j][0], pos[j][1]);
          ctx.stroke();
          edges.push([i, j]);
          if (d < faceReach) near[i].push(j);
        }
      }

      let faces = 0;
      for (let i = 0; i < n && faces < 70; i += 1) {
        const list = near[i];
        for (let a = 0; a < list.length && faces < 70; a += 1) {
          for (let b = a + 1; b < list.length && faces < 70; b += 1) {
            const j = list[a];
            const k = list[b];
            const d = Math.hypot(pos[j][0] - pos[k][0], pos[j][1] - pos[k][1]);
            if (d >= faceReach) continue;
            const shimmer = 0.6 + 0.4 * Math.sin(t * 0.6 + i * 1.7);
            const alpha = P.faceAlpha * shimmer * Math.min(vis[i], vis[j], vis[k]) * calm;
            ctx.fillStyle = rgba(P.face, alpha);
            ctx.beginPath();
            ctx.moveTo(pos[i][0], pos[i][1]);
            ctx.lineTo(pos[j][0], pos[j][1]);
            ctx.lineTo(pos[k][0], pos[k][1]);
            ctx.closePath();
            ctx.fill();
            faces += 1;
          }
        }
      }

      // the pointer is a node too
      const linkReach = 200;
      for (let i = 0; i < n; i += 1) {
        const d = Math.hypot(pos[i][0] - px, pos[i][1] - py);
        if (d >= linkReach) continue;
        const k = 1 - d / linkReach;
        ctx.strokeStyle = rgba(P.link, k * 0.6 * vis[i]);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(pos[i][0], pos[i][1]);
        ctx.stroke();
      }
      const halo = ctx.createRadialGradient(px, py, 0, px, py, 90);
      halo.addColorStop(0, rgba(P.link, 0.22 * intro));
      halo.addColorStop(1, rgba(P.link, 0));
      ctx.fillStyle = halo;
      ctx.fillRect(px - 90, py - 90, 180, 180);
      ctx.fillStyle = rgba(P.link, 0.9 * intro);
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, TAU);
      ctx.fill();

      // points and sparkle stars
      for (let i = 0; i < n; i += 1) {
        const nd = nodes[i];
        const [x, y] = pos[i];
        if (x < -20 || x > w + 20 || y < -20 || y > h + 20) continue;
        if (nd.spark) {
          const pulse = 0.65 + 0.35 * Math.sin(t * nd.twinkle + nd.phase);
          const size = (4.5 + 3.5 * pulse) * nd.z * vis[i];
          const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 3.2);
          glow.addColorStop(0, rgba(P.spark, 0.32 * pulse * vis[i]));
          glow.addColorStop(1, rgba(P.spark, 0));
          ctx.fillStyle = glow;
          ctx.fillRect(x - size * 3.2, y - size * 3.2, size * 6.4, size * 6.4);
          ctx.fillStyle = rgba(P.spark, (0.65 + 0.3 * pulse) * vis[i]);
          const c = size * 0.2;
          ctx.beginPath();
          ctx.moveTo(x, y - size);
          ctx.lineTo(x + c, y - c);
          ctx.lineTo(x + size, y);
          ctx.lineTo(x + c, y + c);
          ctx.lineTo(x, y + size);
          ctx.lineTo(x - c, y + c);
          ctx.lineTo(x - size, y);
          ctx.lineTo(x - c, y - c);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillStyle = rgba(P.node, P.nodeAlpha * nd.z * vis[i] * calm);
          ctx.beginPath();
          ctx.arc(x, y, nd.r * nd.z + 0.4, 0, TAU);
          ctx.fill();
        }
      }

      // small pulses of light run along the links
      if (!reduced) {
        if (edges.length && s.pulses.length < 7 && Math.random() < dt * 1.6) {
          const [a, b] = edges[Math.floor(Math.random() * edges.length)];
          s.pulses.push({ a, b, t: 0, speed: 0.5 + Math.random() * 0.45 });
        }
        s.pulses = s.pulses.filter((p) => {
          p.t += dt * p.speed;
          if (p.t >= 1 || !pos[p.a] || !pos[p.b]) return false;
          const A = pos[p.a];
          const B = pos[p.b];
          if (Math.hypot(A[0] - B[0], A[1] - B[1]) > reachLink * 1.15) return false;
          const at = (u) => [A[0] + (B[0] - A[0]) * u, A[1] + (B[1] - A[1]) * u];
          const head = at(p.t);
          const tail = at(Math.max(0, p.t - 0.18));
          const fade = Math.sin(p.t * Math.PI) * calm;
          ctx.strokeStyle = rgba(P.link, 0.75 * fade);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(tail[0], tail[1]);
          ctx.lineTo(head[0], head[1]);
          ctx.stroke();
          ctx.lineWidth = 1;
          ctx.fillStyle = rgba(P.link, 0.95 * fade);
          ctx.beginPath();
          ctx.arc(head[0], head[1], 1.8, 0, TAU);
          ctx.fill();
          return true;
        });
      }

      return { dt, intro };
    };

    const loop = (now) => {
      s.raf = 0;
      if (document.hidden) {
        s.prev = now;
        s.raf = requestAnimationFrame(loop);
        return;
      }
      const { dt, intro } = draw(now);

      // if the device struggles, draw fewer points
      if (intro >= 1 && s.tuned < 3) {
        s.frames += 1;
        if (dt > 0.03) s.slow += 1;
        if (s.frames >= 90) {
          if (s.slow > 35 && s.nodes.length > 28) {
            s.nodes.length = Math.max(24, Math.floor(s.nodes.length * 0.75));
          }
          s.frames = 0;
          s.slow = 0;
          s.tuned += 1;
        }
      }
      s.raf = requestAnimationFrame(loop);
    };

    const still = () => {
      if (s.raf) cancelAnimationFrame(s.raf);
      s.raf = requestAnimationFrame((now) => {
        s.raf = 0;
        draw(now);
      });
    };

    const start = () => {
      if (s.raf) cancelAnimationFrame(s.raf);
      s.raf = 0;
      s.start = performance.now();
      if (motion.matches) still();
      else s.raf = requestAnimationFrame(loop);
    };

    const onPointer = (event) => {
      s.target.x = event.clientX / window.innerWidth;
      s.target.y = event.clientY / window.innerHeight;
      s.lastInput = performance.now();
    };
    const onResize = () => {
      resize();
      if (motion.matches) still();
    };
    const onScroll = () => {
      if (motion.matches) still();
    };

    resize();
    start();
    kickRef.current = () => {
      if (motion.matches) still();
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    motion.addEventListener("change", start);

    return () => {
      if (s.raf) cancelAnimationFrame(s.raf);
      kickRef.current = () => {};
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      motion.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation" aria-hidden="true" />;
}
