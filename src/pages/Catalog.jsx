import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { services, categories } from '../data/services';

function BigButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: '#1A1A1A',
        border: '1px solid #2A2A2A',
        boxShadow: '0 4px 0 #000, 0 6px 16px rgba(0,0,0,0.5)',
      }}
      className="w-full p-5 flex items-center justify-between active:translate-y-1 active:shadow-none transition-all"
    >
      <span className="text-white font-semibold text-base">{label}</span>
      <span style={{ color: '#F5E642' }} className="text-xl font-bold">›</span>
    </button>
  );
}

function BackButton({ onClick, title }) {
  return (
    <div className="p-4 pt-5 flex items-center gap-3">
      <button
        onClick={onClick}
        style={{ color: '#F5E642', border: '1px solid #2A2A2A', background: '#1A1A1A' }}
        className="w-8 h-8 flex items-center justify-center text-lg font-bold shrink-0"
      >
        ‹
      </button>
      <h2 className="text-white font-bold text-lg">{title}</h2>
    </div>
  );
}

function ServiceIcon({ service }) {
  const [failed, setFailed] = useState(false);
  if (service.logo && !failed) {
    return <img src={service.logo} alt="" onError={() => setFailed(true)} className="w-10 h-10 object-contain" />;
  }
  return <span className="text-3xl">{service.emoji}</span>;
}

export default function Catalog() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filtered = selectedCategory ? services.filter(s => s.category === selectedCategory) : [];
  const selectedCat = categories.find(c => c.id === selectedCategory);

  // Экран 1: список категорий
  if (screen === 'categories') {
    return (
      <div>
        <div className="p-4 pt-6 pb-4">
          <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Каталог</p>
          <h1 className="text-2xl font-bold text-white">Услуги</h1>
        </div>
        <div className="px-4 space-y-3">
          {categories.filter(c => c.id !== 'all').map(cat => (
            <BigButton
              key={cat.id}
              label={cat.name}
              onClick={() => { setSelectedCategory(cat.id); setScreen('services'); }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Экран 2: список услуг
  return (
    <div>
      <BackButton onClick={() => setScreen('categories')} title={selectedCat?.name} />
      <div className="px-4 space-y-3 pb-4">
        {filtered.map(service => (
          <button
            key={service.id}
            onClick={() => navigate(`/service/${service.id}`)}
            style={{
              background: '#1A1A1A',
              border: '1px solid #2A2A2A',
              boxShadow: '0 4px 0 #000, 0 6px 16px rgba(0,0,0,0.5)',
            }}
            className="w-full p-4 flex items-center gap-4 active:translate-y-1 active:shadow-none transition-all text-left"
          >
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
              <ServiceIcon service={service} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{service.name}</p>
              <p style={{ color: '#888' }} className="text-xs truncate mt-0.5">{service.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
