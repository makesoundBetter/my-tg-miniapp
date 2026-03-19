import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { services } from '../data/services';
import { useFavorites } from '../hooks/useFavorites';

function ServiceLogo({ logo, emoji }) {
  const [failed, setFailed] = useState(false);
  if (logo && !failed) {
    return <img src={logo} alt="" onError={() => setFailed(true)} className="w-10 h-10 object-contain" />;
  }
  return <span className="text-4xl">{emoji}</span>;
}

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggle, isFavorite } = useFavorites();
  const service = services.find(s => s.id === Number(id));

  if (!service) {
    return (
      <div className="p-4 text-center pt-20" style={{ color: '#888' }}>
        Услуга не найдена
      </div>
    );
  }

  const handleOrder = () => {
    // Сохраняем в историю запросов
    try {
      const history = JSON.parse(localStorage.getItem('service_history') || '[]');
      if (!history.find(h => h.id === service.id)) {
        history.unshift({ id: service.id, date: new Date().toISOString() });
        localStorage.setItem('service_history', JSON.stringify(history));
      }
    } catch {}
    navigate('/order-confirm', {
      state: {
        title: service.name,
        subtitle: service.description,
        fields: [
          { label: 'Услуга', value: service.name },
          { label: 'Стоимость', value: 'По запросу' },
        ],
        telegramMsg: `Хочу узнать цену и заказать: ${service.name}`,
      },
    });
  };

  return (
    <div className="min-h-screen" style={{ background: '#0D0D0D' }}>
      <div className="p-4 pt-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            style={{ color: '#F5E642' }}
            className="flex items-center gap-2 text-sm"
          >
            ← Назад
          </button>
          <button
            onClick={() => toggle(service.id)}
            style={{ color: isFavorite(service.id) ? '#F5E642' : '#333', fontSize: '22px', lineHeight: 1 }}
            className="transition-all active:scale-90"
          >
            {isFavorite(service.id) ? '♥' : '♡'}
          </button>
        </div>

        <div className="mb-8">
          <div className="w-20 h-20 flex items-center justify-center mb-6">
            <ServiceLogo logo={service.logo} emoji={service.emoji} />
          </div>
          <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-2">Сервис</p>
          <h1 className="text-3xl font-bold text-white">{service.name}</h1>
        </div>

        <div style={{ borderTop: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A' }}
          className="py-6 mb-8">
          <p style={{ color: '#888' }} className="text-sm leading-relaxed">{service.description}</p>
        </div>

        <div className="mb-4">
          <p style={{ color: '#888' }} className="text-xs mb-1">Стоимость</p>
          <p style={{ color: '#F5E642' }} className="text-lg font-semibold">По запросу</p>
        </div>
      </div>

      <div className="fixed bottom-[70px] left-0 right-0 p-4">
        <button
          onClick={handleOrder}
          style={{ background: '#F5E642', color: '#0D0D0D' }}
          className="w-full py-4 font-bold text-sm tracking-widest uppercase active:scale-95 transition-transform"
        >
          Написать для заказа →
        </button>
      </div>
    </div>
  );
}
