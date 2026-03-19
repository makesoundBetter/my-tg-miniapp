import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─────────────────── SPLIT-FLAP BOARD ─────────────────── */

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-. ';
const NAME_LEN = 12;

const BOARD = [
  { cat: 'AI',     items: ['CHATGPT', 'CLAUDE AI', 'MIDJOURNEY', 'SUNO AI', 'GROK AI', 'RUNWAY AI'] },
  { cat: 'SOCIAL', items: ['YOUTUBE', 'DISCORD', 'TWITCH', 'TIKTOK', 'PATREON'] },
  { cat: 'DESIGN', items: ['FIGMA', 'CANVA', 'ADOBE CC', 'CAPCUT'] },
  { cat: 'DEV',    items: ['JETBRAINS', 'HETZNER', 'OBSIDIAN', 'TRADINGVIEW'] },
  { cat: 'GAMES',  items: ['STEAM', 'FORTNITE', 'PUBG MOBILE', 'EPIC GAMES'] },
];

function FlapDisplay({ text, delay = 0 }) {
  const [chars, setChars] = useState(() => Array(NAME_LEN).fill(' '));

  useEffect(() => {
    const padded = text.toUpperCase().padEnd(NAME_LEN, ' ');
    const timers = [];
    for (let i = 0; i < NAME_LEN; i++) {
      const base = delay + i * 50;
      const steps = 3 + Math.floor(Math.random() * 5);
      for (let s = 0; s < steps; s++) {
        const idx = i;
        timers.push(setTimeout(() => {
          setChars(prev => { const n = [...prev]; n[idx] = CHARS[Math.floor(Math.random() * CHARS.length)]; return n; });
        }, base + s * 55));
      }
      const fi = i;
      timers.push(setTimeout(() => {
        setChars(prev => { const n = [...prev]; n[fi] = padded[fi]; return n; });
      }, base + steps * 55));
    }
    return () => timers.forEach(clearTimeout);
  }, [text, delay]);

  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {chars.map((ch, i) => (
        <span key={i} style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '10px', height: '15px', background: '#060606',
          color: ch === ' ' ? 'transparent' : '#F5E642',
          fontFamily: '"Courier New", monospace', fontSize: '10px', fontWeight: 'bold',
          border: '1px solid #161616', borderRadius: '1px', flexShrink: 0, userSelect: 'none',
        }}>{ch}</span>
      ))}
    </div>
  );
}

function BoardRow({ cat, service, rowIndex }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #101010', gap: '10px' }}>
      <span style={{
        color: '#2e2e2e', fontSize: '8px', fontFamily: 'monospace', letterSpacing: '0.08em',
        width: '36px', textAlign: 'right', paddingRight: '10px', borderRight: '1px solid #1c1c1c',
        flexShrink: 0, fontWeight: 'bold',
      }}>{cat}</span>
      <FlapDisplay text={service} delay={rowIndex * 50} />
    </div>
  );
}

function DeparturesBoard() {
  const [services, setServices] = useState(BOARD.map(r => r.items[0]));
  const [keys, setKeys] = useState(BOARD.map(() => 0));
  const idxRef = useRef(BOARD.map(() => 0));

  useEffect(() => {
    const id = setInterval(() => {
      const row = Math.floor(Math.random() * BOARD.length);
      const next = (idxRef.current[row] + 1) % BOARD[row].items.length;
      idxRef.current[row] = next;
      setServices(prev => { const a = [...prev]; a[row] = BOARD[row].items[next]; return a; });
      setKeys(prev => { const a = [...prev]; a[row] = prev[row] + 1; return a; });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ marginBottom: '14px' }}>
        <p style={{ color: '#2e2e2e', fontSize: '9px', letterSpacing: '0.25em', fontFamily: 'monospace', marginBottom: '5px' }}>
          Toronto Services
        </p>
        <h1 style={{ color: '#F5E642', fontSize: '17px', fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: '0.12em' }}>
          DEPARTURES
        </h1>
      </div>
      <div style={{
        background: '#040404', border: '1px solid #181818', borderRadius: '3px',
        padding: '8px 14px', boxShadow: 'inset 0 0 60px rgba(0,0,0,0.6), 0 6px 24px rgba(0,0,0,0.9)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 0 7px', borderBottom: '1px solid #181818', marginBottom: '1px' }}>
          <span style={{ color: '#1e1e1e', fontSize: '8px', fontFamily: 'monospace', letterSpacing: '0.15em' }}>CAT</span>
          <span style={{ color: '#1e1e1e', fontSize: '8px', fontFamily: 'monospace', letterSpacing: '0.15em' }}>SERVICE</span>
        </div>
        {BOARD.map((row, i) => (
          <BoardRow key={`${i}-${keys[i]}`} cat={row.cat} service={services[i]} rowIndex={i} />
        ))}
      </div>
      <p style={{ color: '#222', fontSize: '9px', fontFamily: 'monospace', textAlign: 'center', marginTop: '10px', letterSpacing: '0.2em' }}>
        AVAILABLE 24/7
      </p>
    </div>
  );
}

/* ─────────────────── STAIRCASE ─────────────────── */

function CyberGrid() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.parentElement.offsetWidth;
    const cssH = canvas.parentElement.offsetHeight;

    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const W = cssW;
    const H = cssH;

    // Базовые размеры ближней ступени (снизу-слева)
    const sw0  = Math.min(W, H) * 0.27;  // ширина проступи
    const rh0  = sw0 * 0.28;             // высота подступёнка (≈1/4 от sw0)
    const depX0 = sw0 * 0.16;            // глубина → вправо
    const depY0 = -rh0 * 0.55;           // глубина → вверх

    // Предвычисляем позиции ступеней с перспективным сокращением
    const numSteps = 18;
    const stepsData = [];
    let cx = W * 0.03, cy = H * 0.90;
    for (let i = 0; i < numSteps; i++) {
      const t = i / (numSteps - 1);
      // Перспективный масштаб: ближние=1, дальние=0.15
      const scale = Math.pow(1 - t * 0.85, 1.1);
      const sw   = sw0  * scale;
      const rh   = rh0  * scale;
      const depX = depX0 * scale;
      const depY = depY0 * scale;
      stepsData.push({ x: cx, y: cy, sw, rh, depX, depY, scale });
      cx += sw;
      cy -= rh;
    }

    function drawStep({ x, y, sw, rh, depX, depY, scale }) {
      const alpha = 0.18 + scale * 0.78;

      // ── Проступь (параллелограмм — доминирующая поверхность) ──
      ctx.beginPath();
      ctx.moveTo(x,             y);
      ctx.lineTo(x + sw,        y);
      ctx.lineTo(x + sw + depX, y + depY);
      ctx.lineTo(x      + depX, y + depY);
      ctx.closePath();
      ctx.fillStyle = `rgba(245,230,66,${alpha * 0.09})`;
      ctx.fill();

      // Передний край проступи — самая яркая линия
      ctx.beginPath();
      ctx.moveTo(x,      y);
      ctx.lineTo(x + sw, y);
      ctx.strokeStyle = `rgba(245,230,66,${alpha})`;
      ctx.lineWidth = 1.0 + scale * 2.0;
      ctx.stroke();

      // Боковые и задний края проступи
      ctx.beginPath();
      ctx.moveTo(x,             y);
      ctx.lineTo(x + depX,      y + depY);
      ctx.moveTo(x + sw,        y);
      ctx.lineTo(x + sw + depX, y + depY);
      ctx.moveTo(x + depX,      y + depY);
      ctx.lineTo(x + sw + depX, y + depY);
      ctx.strokeStyle = `rgba(245,230,66,${alpha * 0.42})`;
      ctx.lineWidth = 0.6 + scale * 0.4;
      ctx.stroke();

      // ── Подступёнок (тонкая вертикальная грань снизу) ──
      ctx.beginPath();
      ctx.moveTo(x,      y);
      ctx.lineTo(x + sw, y);
      ctx.lineTo(x + sw, y + rh);
      ctx.lineTo(x,      y + rh);
      ctx.closePath();
      ctx.fillStyle = `rgba(245,230,66,${alpha * 0.07})`;
      ctx.fill();

      // Нижний и боковые края подступёнка
      ctx.beginPath();
      ctx.moveTo(x,      y + rh);
      ctx.lineTo(x + sw, y + rh);
      ctx.strokeStyle = `rgba(245,230,66,${alpha * 0.28})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x,      y); ctx.lineTo(x,      y + rh);
      ctx.moveTo(x + sw, y); ctx.lineTo(x + sw, y + rh);
      ctx.strokeStyle = `rgba(245,230,66,${alpha * 0.15})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#020202';
      ctx.fillRect(0, 0, W, H);

      // Рисуем от дальних (верх-право) к ближним (низ-лево)
      for (let i = stepsData.length - 1; i >= 0; i--) {
        const s = stepsData[i];
        if (s.x > W + s.sw * 2) continue;
        if (s.x + s.sw < -s.sw) continue;
        if (s.y + s.rh < -s.rh * 2) continue;
        if (s.y + s.depY > H + s.rh) continue;
        drawStep(s);
      }

      // Туман верх-право (лестница уходит вдаль)
      const fogTR = ctx.createLinearGradient(W * 0.4, 0, W, 0);
      fogTR.addColorStop(0, 'rgba(2,2,2,0)');
      fogTR.addColorStop(1, 'rgba(2,2,2,0.92)');
      ctx.fillStyle = fogTR;
      ctx.fillRect(0, 0, W, H);

      const fogTop = ctx.createLinearGradient(0, 0, 0, H * 0.15);
      fogTop.addColorStop(0, 'rgba(2,2,2,0.92)');
      fogTop.addColorStop(1, 'rgba(2,2,2,0)');
      ctx.fillStyle = fogTop;
      ctx.fillRect(0, 0, W, H * 0.15);

      // Туман низ-лево
      const fogBL = ctx.createLinearGradient(0, H * 0.80, 0, H);
      fogBL.addColorStop(0, 'rgba(2,2,2,0)');
      fogBL.addColorStop(1, 'rgba(2,2,2,0.92)');
      ctx.fillStyle = fogBL;
      ctx.fillRect(0, H * 0.80, W, H * 0.20);

      // Слабое жёлтое свечение
      const glow = ctx.createRadialGradient(W * 0.42, H * 0.52, 0, W * 0.42, H * 0.52, W * 0.55);
      glow.addColorStop(0, 'rgba(245,230,66,0.05)');
      glow.addColorStop(1, 'rgba(245,230,66,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}

/* ─────────────────── TERMINAL ─────────────────── */

const LINES = [
  { text: '> Инициализация системы...', delay: 0 },
  { text: '> Загрузка сервисов...', delay: 900 },
  { text: '> ИИ сервисы............. [OK]', delay: 1900, ok: true },
  { text: '> Онлайн платформы....... [OK]', delay: 2700, ok: true },
  { text: '> Игры и дизайн.......... [OK]', delay: 3500, ok: true },
  { text: '> Путешествия............ [OK]', delay: 4200, ok: true },
  { text: '> Соединение установлено.', delay: 5100 },
  { text: '> Добро пожаловать._', delay: 6000, final: true },
];

function Terminal() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);

  // Show lines one by one
  useEffect(() => {
    if (lineIndex >= LINES.length) return;
    const line = LINES[lineIndex];
    const t = setTimeout(() => {
      setVisibleLines(prev => [...prev, line]);
      setLineIndex(i => i + 1);
    }, lineIndex === 0 ? line.delay : LINES[lineIndex].delay - LINES[lineIndex - 1].delay);
    return () => clearTimeout(t);
  }, [lineIndex]);

  // Blinking cursor on last line
  const [cursor, setCursor] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  // After all lines done, restart after pause
  useEffect(() => {
    if (lineIndex < LINES.length) return;
    const t = setTimeout(() => {
      setVisibleLines([]);
      setLineIndex(0);
    }, 3500);
    return () => clearTimeout(t);
  }, [lineIndex]);

  return (
    <div style={{
      background: '#030303',
      border: '1px solid #181818',
      borderRadius: '3px',
      padding: '14px 16px',
      fontFamily: '"Courier New", Courier, monospace',
      fontSize: '12px',
      lineHeight: '1.8',
      minHeight: '180px',
    }}>
      {/* Title bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid #141414' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2a2a2a', display: 'inline-block' }} />
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2a2a2a', display: 'inline-block' }} />
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2a2a2a', display: 'inline-block' }} />
        <span style={{ color: '#2a2a2a', fontSize: '9px', letterSpacing: '0.15em', marginLeft: '6px' }}>TORONTO SERVICES — bash</span>
      </div>

      {/* Lines */}
      {visibleLines.map((line, i) => {
        const isLast = i === visibleLines.length - 1;
        const isOk = line.ok;
        const isFinal = line.final;

        // Split [OK] for coloring
        let content;
        if (isOk) {
          const idx = line.text.lastIndexOf('[OK]');
          const before = line.text.slice(0, idx);
          content = (
            <span>
              <span style={{ color: '#555' }}>{before}</span>
              <span style={{ color: '#F5E642', textShadow: '0 0 8px rgba(245,230,66,0.6)' }}>[OK]</span>
            </span>
          );
        } else if (isFinal) {
          const text = line.text.replace('_', '');
          content = (
            <span style={{ color: '#F5E642', textShadow: '0 0 10px rgba(245,230,66,0.5)' }}>
              {text}
              {isLast && <span style={{ opacity: cursor ? 1 : 0 }}>_</span>}
            </span>
          );
        } else {
          content = (
            <span style={{ color: isLast && !isFinal ? '#888' : '#444' }}>
              {line.text}
            </span>
          );
        }

        return (
          <div key={i} style={{ display: 'flex' }}>
            {content}
            {isLast && !isFinal && !isOk && (
              <span style={{ color: '#666', opacity: cursor ? 1 : 0 }}>▌</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────── PARTICLES ─────────────────── */

function Particles() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.parentElement.offsetWidth;
    const cssH = 200;

    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const W = cssW, H = cssH;
    const COUNT = 38;
    const MAX_DIST = 90;

    // Init particles
    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 1.5 + Math.random() * 1.5,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, W, H);

      const pts = particlesRef.current;

      // Move
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }

      // Lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(245,230,66,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245,230,66,0.75)';
        ctx.shadowColor = '#F5E642';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleTouch = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    const tx = touch.clientX - rect.left;
    const ty = touch.clientY - rect.top;
    for (const p of particlesRef.current) {
      const dx = p.x - tx, dy = p.y - ty;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        const force = (80 - dist) / 80;
        p.vx += (dx / dist) * force * 3;
        p.vy += (dy / dist) * force * 3;
        // clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 4) { p.vx = (p.vx / speed) * 4; p.vy = (p.vy / speed) * 4; }
      }
    }
  };

  return (
    <div style={{ position: 'relative', borderRadius: '3px', border: '1px solid #181818', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', cursor: 'crosshair' }}
        onMouseMove={handleTouch}
        onTouchMove={handleTouch}
      />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
      }}>
        <p style={{
          color: 'rgba(245,230,66,0.12)', fontSize: '11px', fontFamily: 'monospace',
          letterSpacing: '0.3em', textTransform: 'uppercase',
        }}>touch to scatter</p>
      </div>
    </div>
  );
}

/* ─────────────────── COUNTERS ─────────────────── */

const STATS = [
  { label: 'Сервисов', target: 56 },
  { label: 'Категорий', target: 6 },
  { label: 'Клиентов', target: 200 },
  { label: 'Стран', target: 30 },
];

function useCounter(target, duration = 1800, startDelay = 0) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [started, target, duration]);

  return value;
}

function StatItem({ label, target, index }) {
  const value = useCounter(target, 1600, index * 180);
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <p style={{
        color: '#F5E642',
        fontSize: target >= 100 ? '32px' : '34px',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        lineHeight: 1,
        textShadow: '0 0 20px rgba(245,230,66,0.35)',
        letterSpacing: '-0.02em',
      }}>
        {value}
        <span style={{ fontSize: '16px', opacity: 0.5 }}>+</span>
      </p>
      <p style={{ color: '#333', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '0.1em', marginTop: '6px' }}>
        {label.toUpperCase()}
      </p>
    </div>
  );
}

function Counters() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        background: '#040404',
        border: '1px solid #181818',
        borderRadius: '3px',
        padding: '24px 12px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {visible && STATS.map((s, i) => (
        <StatItem key={s.label} label={s.label} target={s.target} index={i} />
      ))}
      {!visible && STATS.map(s => (
        <div key={s.label} style={{ flex: 1, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontSize: '32px', fontWeight: 'bold', fontFamily: 'monospace', lineHeight: 1 }}>0<span style={{ fontSize: '16px', opacity: 0.5 }}>+</span></p>
          <p style={{ color: '#333', fontSize: '9px', fontFamily: 'monospace', marginTop: '6px' }}>{s.label.toUpperCase()}</p>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────── HOME PAGE ─────────────────── */

function ProfileButton() {
  const navigate = useNavigate();
  const user = (() => { try { return window.Telegram?.WebApp?.initDataUnsafe?.user || null; } catch { return null; } })();

  return (
    <button
      onClick={() => navigate('/profile')}
      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
    >
      {user?.photo_url ? (
        <img
          src={user.photo_url}
          alt=""
          style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #2A2A2A', objectFit: 'cover' }}
        />
      ) : (
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: '#1A1A1A', border: '1px solid #2A2A2A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#F5E642', fontSize: '14px',
        }}>
          {user?.first_name?.[0] || '◉'}
        </div>
      )}
      <span style={{ color: '#666', fontSize: '11px', letterSpacing: '0.05em' }}>Мой профиль</span>
    </button>
  );
}

export default function Home() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      {/* Фон на весь экран */}
      <CyberGrid />

      {/* Контент поверх */}
      <div style={{ position: 'relative', zIndex: 1, padding: '16px 16px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ProfileButton />
        </div>

        {/* Логотип по центру */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}>
          <p style={{
            color: '#F5E642',
            fontSize: '22px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            letterSpacing: '0.2em',
            textShadow: '0 0 18px rgba(245,230,66,0.8), 0 0 40px rgba(245,230,66,0.3)',
            margin: 0,
          }}>
            ALL SERVICES
          </p>
        </div>
      </div>
    </div>
  );
}
