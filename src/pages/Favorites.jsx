import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { services } from '../data/services';
import { useFavorites } from '../hooks/useFavorites';

function ServiceLogo({ logo, emoji }) {
  const [failed, setFailed] = useState(false);
  if (logo && !failed) {
    return <img src={logo} alt="" onError={() => setFailed(true)} className="w-7 h-7 object-contain" />;
  }
  return <span className="text-xl">{emoji}</span>;
}

export default function Favorites() {
  const navigate = useNavigate();
  const { ids, toggle } = useFavorites();

  const saved = services.filter(s => ids.includes(s.id));

  return (
    <div className="pb-20">
      <div className="p-4 pt-6 pb-4">
        <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Сохранённые</p>
        <h1 className="text-2xl font-bold text-white">Избранное</h1>
      </div>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-20 px-8">
          <span style={{ color: '#2a2a2a' }} className="text-6xl mb-6">♡</span>
          <p className="text-white font-semibold text-base mb-2">Пусто</p>
          <p style={{ color: '#555' }} className="text-sm text-center">
            Нажмите ♡ на странице сервиса, чтобы сохранить
          </p>
        </div>
      ) : (
        <div>
          {saved.map(service => (
            <div
              key={service.id}
              style={{ borderBottom: '1px solid #1a1a1a' }}
              className="flex items-center gap-4 px-4 py-4"
            >
              <div
                className="flex-1 flex items-center gap-4 cursor-pointer"
                onClick={() => navigate(`/service/${service.id}`)}
              >
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  <ServiceLogo logo={service.logo} emoji={service.emoji} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{service.name}</p>
                  <p style={{ color: '#555' }} className="text-xs truncate mt-0.5">{service.description}</p>
                </div>
              </div>
              <button
                onClick={() => toggle(service.id)}
                style={{ color: '#F5E642' }}
                className="text-xl shrink-0 px-2"
              >
                ♥
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
