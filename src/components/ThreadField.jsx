import { useEffect, useRef } from "react";

/*
  ThreadField: the living background.
  A satin silk fabric drawn in a fragment shader. The cloth sways slowly,
  a soft lamp drifts across it (and follows the pointer) to reveal the weave,
  and a few gold threads run through the plum and rose ones.
  Falls back to the CSS gradient on the canvas when WebGL is unavailable, and
  draws a single still frame when the visitor prefers reduced motion.
*/

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPointer;
uniform float uFocus;
uniform float uIntro;
uniform float uDark;
uniform float uScroll;
uniform vec3  uBg;

const float PI = 3.14159265;
const float DENSITY = 72.0;

float hash11(float n) { return fract(sin(n * 91.3458) * 47453.5453); }
float hash21(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

vec3 warpColor(float id) {
  float h  = hash11(id * 1.73 + 3.1);
  float h2 = hash11(id * 3.11 + 9.7);

  vec3 plum  = vec3(0.30, 0.07, 0.25);
  vec3 berry = vec3(0.56, 0.13, 0.34);
  vec3 rose  = vec3(0.82, 0.29, 0.50);
  vec3 gold  = vec3(0.84, 0.62, 0.26);
  vec3 dk = mix(plum, berry, h2);
  dk = mix(dk, rose, step(0.78, h) * 0.8);
  dk = mix(dk, gold, step(0.93, h));

  vec3 l0 = vec3(0.98, 0.80, 0.88);
  vec3 l1 = vec3(1.00, 0.91, 0.95);
  vec3 lr = vec3(0.96, 0.66, 0.79);
  vec3 lg = vec3(0.94, 0.80, 0.52);
  vec3 lt = mix(l0, l1, h2);
  lt = mix(lt, lr, step(0.78, h) * 0.8);
  lt = mix(lt, lg, step(0.93, h));

  return mix(lt, dk, uDark);
}

vec3 weftColor() {
  return mix(vec3(0.95, 0.76, 0.85), vec3(0.20, 0.05, 0.17), uDark);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 s = frag / uRes.y;              // screen space, y up, height = 1
  float aspect = uRes.x / uRes.y;
  float t = uTime;

  // --- the cloth: slow undulation, a little drift while scrolling ---
  vec2 p = s;
  p.y += uScroll * 0.16;
  vec2 q = p * 1.45;
  float a = sin(q.x * 2.1 + t * 0.34 + sin(q.y * 1.6 - t * 0.26) * 1.4);
  float b = cos(q.y * 2.3 - t * 0.30 + sin(q.x * 1.2 + t * 0.21) * 1.2);
  float amp = 0.040 * mix(1.0, 0.6, uFocus) * uIntro;
  vec2 disp = vec2(a * 1.25, b * 0.5) * amp;

  // the pointer presses a soft ripple into the cloth
  vec2 toP = s - uPointer;
  float dP = length(toP);
  disp += normalize(toP + 1e-4) * sin(dP * 24.0 - t * 1.8) * exp(-dP * 3.6) * 0.007 * uIntro;

  vec2 g = (p + disp) * DENSITY;
  vec2 cell = floor(g);
  vec2 f = fract(g);

  // --- five-harness satin: long glossy warp floats, one weft interlacing in five ---
  float k     = mod(cell.y - 2.0 * cell.x, 5.0);
  float kNext = mod(cell.y + 1.0 - 2.0 * cell.x, 5.0);
  float kPrev = mod(cell.y - 1.0 - 2.0 * cell.x, 5.0);
  float weftTop = 1.0 - step(0.5, k);
  float isWarp = 1.0 - weftTop;
  float dipNext = 1.0 - step(0.5, kNext);
  float dipPrev = 1.0 - step(0.5, kPrev);

  float across = mix(f.y, f.x, isWarp);
  float along  = mix(f.x, f.y, isWarp);
  vec3 strand = warpColor(cell.x) * (0.86 + 0.28 * hash11(cell.x * 1.37));
  vec3 base = mix(mix(strand * mix(0.95, 0.88, uDark), weftColor(), 0.12), strand, isWarp);

  float cs = (across - 0.5) * 2.0;
  float profile = sqrt(max(0.0, 1.0 - cs * cs));

  float ls = (along - 0.5) * 2.0;
  float bulgeWeft = 0.62 + 0.38 * cos(ls * PI * 0.5);
  float taper = dipNext * smoothstep(0.55, 1.0, along) + dipPrev * smoothstep(0.45, 0.0, along);
  float bulgeWarp = 1.0 - 0.25 * taper;
  float bulge = mix(bulgeWeft, bulgeWarp, isWarp);
  float height = profile * bulge;

  float dAcross = -cs / max(profile, 0.25) * 0.5 * bulge;
  float slopeWeft = -sin(ls * PI * 0.5) * 0.3 * profile;
  float slopeWarp = (dipPrev * smoothstep(0.45, 0.0, along) - dipNext * smoothstep(0.55, 1.0, along)) * 0.45;
  float dAlong = mix(slopeWeft, slopeWarp, isWarp);
  vec3 n = (isWarp > 0.5)
    ? normalize(vec3(dAcross, dAlong, 1.0))
    : normalize(vec3(dAlong, dAcross, 1.0));
  vec3 T = (isWarp > 0.5) ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);

  // --- two lamps: the pointer, and one that wanders on its own ---
  vec2 lamp2 = vec2(aspect * (0.5 + 0.38 * sin(t * 0.11)), 0.5 + 0.32 * cos(t * 0.09 + 1.0));
  vec3 V = vec3(0.0, 0.0, 1.0);
  float diffuse = 0.0;
  float sheen = 0.0;
  for (int i = 0; i < 2; i++) {
    vec2 lp = (i == 0) ? uPointer : lamp2;
    float strength = (i == 0) ? 1.0 : 0.6;
    vec3 Ld = vec3(lp - s, 0.30);
    float dist = length(Ld);
    vec3 l = Ld / dist;
    float atten = strength / (1.0 + dist * dist * 6.0);
    diffuse += max(dot(n, l), 0.0) * atten;
    vec3 h = normalize(l + V);
    float th = dot(T, h);
    sheen += pow(max(1.0 - th * th, 0.0), 22.0) * atten;   // anisotropic silk sheen
  }

  float amb = mix(1.0, 0.30, uDark);
  float gain = mix(0.22, 1.6, uDark);
  float shade = mix(0.80 + 0.20 * height, 0.55 + 0.45 * height, uDark);
  vec3 col = base * (amb * shade + diffuse * gain);
  vec3 sheenCol = mix(vec3(1.0, 0.95, 0.9), vec3(1.0, 0.80, 0.55), uDark);
  col += sheenCol * sheen * (0.35 + 0.65 * profile) * mix(0.16, 0.55, uDark) * mix(1.0, 0.5, weftTop);

  // seams between strands, and where a weft crosses over
  float edge = smoothstep(0.0, 0.2, across) * smoothstep(1.0, 0.8, across);
  col *= mix(mix(0.93, 0.62, uDark), 1.0, edge);
  float ends = smoothstep(0.0, 0.2, along) * smoothstep(1.0, 0.8, along);
  col *= mix(1.0, mix(mix(0.95, 0.88, uDark), 1.0, ends), weftTop);
  col *= 0.94 + 0.06 * sin(across * 30.0 + cell.x * 7.0);

  // the cloth is woven in from the top left when the page opens
  float order = (s.x / aspect) * 0.75 + (1.0 - s.y) * 0.25;
  float reveal = smoothstep(0.0, 0.3, uIntro * 1.45 - order);
  col = mix(uBg, col, reveal);

  // quieter once the reader is down in the content
  col = mix(col, uBg, mix(0.55, 0.50, uDark) * uFocus);
  col = mix(mix(uBg, col, 0.5), col, uDark);

  vec3 cap = vec3(0.56);
  col = mix(col, cap * (1.0 - exp(-col / cap)), uDark);

  // soft vignette keeps the edges calm
  vec2 c = (s - vec2(aspect, 1.0) * 0.5) / vec2(aspect, 1.0);
  float vig = smoothstep(0.95, 0.25, length(c));
  col = mix(uBg, col, mix(0.72, 1.0, vig));

  col += (hash21(frag + fract(t)) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOutCubic = (v) => 1 - Math.pow(1 - v, 3);
const smooth = (v) => v * v * (3 - 2 * v);

const BG_DARK = [0.122, 0.039, 0.102];
const BG_LIGHT = [0.988, 0.933, 0.953];

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ThreadField({ dark }) {
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

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return undefined;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return undefined;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
      return undefined;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {};
    ["uRes", "uTime", "uPointer", "uFocus", "uIntro", "uDark", "uScroll", "uBg"].forEach((name) => {
      u[name] = gl.getUniformLocation(program, name);
    });

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 700px)");
    let quality = small.matches ? 0.55 : 0.8;
    const dprCap = 1.5;

    const state = {
      start: performance.now(),
      prev: performance.now(),
      target: { x: 0.62, y: 0.42 },
      pointer: { x: 0.62, y: 0.42 },
      lastInput: -1e9,
      focus: 0,
      dark: darkRef.current ? 1 : 0,
      raf: 0,
      frames: 0,
      slow: 0,
      tuned: 0,
    };

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, dprCap) * quality;
      const w = Math.max(2, Math.round(canvas.clientWidth * scale));
      const h = Math.max(2, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const draw = (now) => {
      const reduced = motion.matches;
      const elapsed = (now - state.start) / 1000;
      const dt = Math.min(0.05, (now - state.prev) / 1000);
      state.prev = now;

      const time = reduced ? 14 : elapsed + 14;
      const intro = reduced ? 1 : easeOutCubic(clamp01(elapsed / 3.0));
      const aspect = canvas.width / canvas.height;

      // when nobody is touching the page, the lamp wanders by itself
      const idle = reduced ? 0 : smooth(clamp01(((now - state.lastInput) / 1000 - 2.5) / 2.0));
      const drift = {
        x: 0.5 + 0.32 * Math.sin(time * 0.17),
        y: 0.45 + 0.24 * Math.cos(time * 0.13 + 1.0),
      };
      const tx = state.target.x + (drift.x - state.target.x) * idle;
      const ty = state.target.y + (drift.y - state.target.y) * idle;
      const follow = reduced ? 1 : 1 - Math.exp(-dt * 3.2);
      state.pointer.x += (tx - state.pointer.x) * follow;
      state.pointer.y += (ty - state.pointer.y) * follow;

      const vh = window.innerHeight;
      const scrollY = window.scrollY || 0;
      const focusTarget = clamp01(scrollY / (vh * 0.8));
      state.focus += (focusTarget - state.focus) * (reduced ? 1 : 1 - Math.exp(-dt * 4));
      const darkTarget = darkRef.current ? 1 : 0;
      state.dark += (darkTarget - state.dark) * (reduced ? 1 : 1 - Math.exp(-dt * 5));

      const bg = BG_LIGHT.map((c, i) => c + (BG_DARK[i] - c) * state.dark);

      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform1f(u.uTime, time);
      gl.uniform2f(u.uPointer, state.pointer.x * aspect, 1 - state.pointer.y);
      gl.uniform1f(u.uFocus, state.focus);
      gl.uniform1f(u.uIntro, intro);
      gl.uniform1f(u.uDark, state.dark);
      gl.uniform1f(u.uScroll, scrollY / vh);
      gl.uniform3f(u.uBg, bg[0], bg[1], bg[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      return { dt, intro };
    };

    const loop = (now) => {
      state.raf = 0;
      if (document.hidden) {
        state.prev = now;
        state.raf = requestAnimationFrame(loop);
        return;
      }
      const { dt, intro } = draw(now);

      // if the device struggles, trade resolution for smoothness
      if (intro >= 1 && state.tuned < 3) {
        state.frames += 1;
        if (dt > 0.026) state.slow += 1;
        if (state.frames >= 90) {
          if (state.slow > 35 && quality > 0.4) {
            quality = Math.max(0.4, quality * 0.78);
            resize();
          }
          state.frames = 0;
          state.slow = 0;
          state.tuned += 1;
        }
      }
      state.raf = requestAnimationFrame(loop);
    };

    const stillFrame = () => {
      if (state.raf) cancelAnimationFrame(state.raf);
      state.raf = requestAnimationFrame((now) => {
        state.raf = 0;
        draw(now);
      });
    };

    const start = () => {
      if (state.raf) cancelAnimationFrame(state.raf);
      state.raf = 0;
      state.start = performance.now();
      if (motion.matches) {
        stillFrame();
      } else {
        state.raf = requestAnimationFrame(loop);
      }
    };

    const onPointer = (event) => {
      state.target.x = event.clientX / window.innerWidth;
      state.target.y = event.clientY / window.innerHeight;
      state.lastInput = performance.now();
    };
    const onResize = () => {
      resize();
      if (motion.matches) stillFrame();
    };
    const onScroll = () => {
      if (motion.matches) stillFrame();
    };
    const onMotionChange = () => start();

    resize();
    start();
    kickRef.current = () => {
      if (motion.matches) stillFrame();
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    motion.addEventListener("change", onMotionChange);

    return () => {
      if (state.raf) cancelAnimationFrame(state.raf);
      kickRef.current = () => {};
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      motion.removeEventListener("change", onMotionChange);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className="thread-field" aria-hidden="true" />;
}
