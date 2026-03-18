import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ServiceLogo({ logo, emoji }) {
  const [failed, setFailed] = useState(false);

  if (logo && !failed) {
    return (
      <img
        src={logo}
        alt=""
        onError={() => setFailed(true)}
        className="w-7 h-7 object-contain"
      />
    );
  }
  return <span className="text-xl">{emoji}</span>;
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
      <svg width="38" height="38" viewBox="0 0 38 38" className="shrink-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="arrowGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#FFFDE0" />
            <stop offset="40%" stopColor="#F5E642" />
            <stop offset="100%" stopColor="#A89000" />
          </radialGradient>
          <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#F5E642" floodOpacity="0.5" />
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.4" />
          </filter>
          <linearGradient id="gloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.45" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M6 19 L24 19 M18 11 L28 19 L18 27"
          stroke="url(#arrowGlow)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#shadow)"
        />
        <path
          d="M6 17 L24 17 M18 9 L28 17"
          stroke="url(#gloss)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
