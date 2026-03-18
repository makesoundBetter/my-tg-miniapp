import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { services } from '../data/services';

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
  const service = services.find(s => s.id === Number(id));

  if (!service) {
    return (
      <div className="p-4 text-center pt-20" style={{ color: '#888' }}>
        Услуга не найдена
      </div>
    );
  }

  const handleOrder = () => {
    const text = encodeURIComponent(`Хочу узнать цену и заказать: ${service.name}`);
    window.open(`https://t.me/Torontocake?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen" style={{ background: '#0D0D0D' }}>
      <div className="p-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          style={{ color: '#F5E642' }}
          className="flex items-center gap-2 text-sm mb-8"
        >
          ← Назад
        </button>

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
