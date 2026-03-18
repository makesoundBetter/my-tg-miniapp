import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ServiceLogo({ logo, emoji }) {
  const [failed, setFailed] = useState(false);
  if (logo && !failed) {
    return <img src={logo} alt="" onError={() => setFailed(true)} className="w-7 h-7 object-contain" />;
  }
  return <span className="text-xl">{emoji}</span>;
}

function NeonArrow() {
  // Внешняя форма стрелки
  const outer = "M3 13.5 Q3 9 8 9 L26 9 L26 3 L42 15 L26 27 L26 21 L8 21 Q3 21 3 16.5 Z";
  // Средняя форма
  const mid = "M5 14 Q5 11 9 11 L27 11 L27 5.5 L39.5 15 L27 24.5 L27 19 L9 19 Q5 19 5 16 Z";
  // Внутренняя форма для нeon-контура
  const inner = "M7 14.5 Q7 12.5 10 12.5 L27.5 12.5 L27.5 8.5 L37 15 L27.5 21.5 L27.5 17.5 L10 17.5 Q7 17.5 7 15.5 Z";

  return (
    <svg width="48" height="32" viewBox="0 0 46 30" className="shrink-0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Внешнее свечение */}
        <filter id="outerGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Центральное свечение */}
        <filter id="coreGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Градиент тёмного ободка */}
        <linearGradient id="rimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5a4d00" />
          <stop offset="50%" stopColor="#2a2300" />
          <stop offset="100%" stopColor="#1a1500" />
        </linearGradient>
        {/* Градиент основной заливки */}
        <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8d200" />
          <stop offset="50%" stopColor="#c9a800" />
          <stop offset="100%" stopColor="#8a7000" />
        </linearGradient>
      </defs>

      {/* 1. Тёмный внешний ободок — создаёт объём */}
      <path d={outer} fill="url(#rimGrad)" />

      {/* 2. Основная жёлтая заливка */}
      <path d={mid} fill="url(#fillGrad)" />

      {/* 3. Жёлтое свечение — широкий glow */}
      <path d={inner} fill="none"
        stroke="#F5E642" strokeWidth="3.5"
        strokeLinejoin="round" strokeLinecap="round"
        filter="url(#outerGlow)" opacity="0.9"
      />

      {/* 4. Яркое ядро — белый нeon */}
      <path d={inner} fill="none"
        stroke="#fffbe0" strokeWidth="1.2"
        strokeLinejoin="round" strokeLinecap="round"
        filter="url(#coreGlow)" opacity="1"
      />

      {/* 5. Чистая белая линия по центру */}
      <path d={inner} fill="none"
        stroke="white" strokeWidth="0.5"
        strokeLinejoin="round" strokeLinecap="round"
        opacity="0.9"
      />

      {/* 6. Блик сверху */}
      <path
        d="M5 13 Q5 9 9 9 L27 9 L27 5.5 L36 13 L27 13 L9 13 Q5 13 5 13 Z"
        fill="white" opacity="0.15"
      />
    </svg>
  );
}

export default function ServiceCard({ service }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/service/${service.id}`)}
      style={{ background: '#1A1A1A', borderBottom: '1px solid #2A2A2A' }}
      className="flex items-center gap-4 p-4 cursor-pointer active:scale-95 transition-transform"
    >
      <div className="w-11 h-11 flex items-center justify-center shrink-0">
        <ServiceLogo logo={service.logo} emoji={service.emoji} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white text-sm truncate">{service.name}</h3>
        <p style={{ color: '#888' }} className="text-xs truncate mt-0.5">{service.description}</p>
      </div>
      <NeonArrow />
    </div>
  );
}
