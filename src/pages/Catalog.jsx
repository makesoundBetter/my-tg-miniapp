import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { services, categories } from '../data/services';

const mainTabs = [
  { id: 'online', label: 'Онлайн сервисы' },
  { id: 'moving', label: 'Перестановки' },
  { id: 'legal', label: 'Юр. услуги' },
];

// Экран выбора категории
function CategoryScreen({ onSelect }) {
  const cats = categories.filter(c => c.id !== 'all');
  return (
    <div className="p-4 space-y-3">
      {cats.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          style={{
            background: '#1A1A1A',
            border: '1px solid #2A2A2A',
            boxShadow: '0 4px 0 #000, 0 6px 16px rgba(0,0,0,0.5)',
          }}
          className="w-full p-5 flex items-center justify-center active:translate-y-1 active:shadow-none transition-all"
        >
          <span className="text-white font-semibold text-base">{cat.name}</span>
        </button>
      ))}
    </div>
  );
}

// Экран списка услуг
function ServicesScreen({ categoryId, onBack }) {
  const navigate = useNavigate();
  const filtered = services.filter(s => s.category === categoryId);
  const cat = categories.find(c => c.id === categoryId);

  return (
    <div>
      <div className="p-4 pt-5 flex items-center gap-3">
        <button
          onClick={onBack}
          style={{ color: '#F5E642', border: '1px solid #2A2A2A', background: '#1A1A1A' }}
          className="w-8 h-8 flex items-center justify-center text-lg font-bold shrink-0"
        >
          ‹
        </button>
        <h2 className="text-white font-bold text-lg">{cat?.name}</h2>
      </div>

      <div className="px-4 space-y-3 pb-4">
        {filtered.map((service) => (
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

function ServiceIcon({ service }) {
  const [failed, setFailed] = useState(false);
  if (service.logo && !failed) {
    return <img src={service.logo} alt="" onError={() => setFailed(true)} className="w-10 h-10 object-contain" />;
  }
  return <span className="text-3xl">{service.emoji}</span>;
}

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [mainTab, setMainTab] = useState('online');
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      <div className="p-4 pt-6 pb-4">
        <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Каталог</p>
        <h1 className="text-2xl font-bold text-white">Услуги</h1>
      </div>

      {/* Главные вкладки */}
      <div className="flex border-b" style={{ borderColor: '#2A2A2A' }}>
        {mainTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setMainTab(tab.id); setSelectedCategory(null); }}
            style={{
              borderBottom: mainTab === tab.id ? '2px solid #F5E642' : '2px solid transparent',
              color: mainTab === tab.id ? '#F5E642' : '#888',
              background: '#0D0D0D',
            }}
            className="flex-1 py-3 text-xs font-medium tracking-wider uppercase transition-colors whitespace-nowrap px-2"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Онлайн сервисы */}
      {mainTab === 'online' && (
        selectedCategory
          ? <ServicesScreen categoryId={selectedCategory} onBack={() => setSelectedCategory(null)} />
          : <CategoryScreen onSelect={setSelectedCategory} />
      )}

      {/* Перестановки */}
      {mainTab === 'moving' && (
        <div className="flex flex-col items-center justify-center pt-24 px-8">
          <span style={{ color: '#F5E642' }} className="text-5xl mb-6">📦</span>
          <p className="text-white font-semibold text-lg mb-2">Перестановки</p>
          <p style={{ color: '#888' }} className="text-sm text-center">Раздел скоро появится.</p>
        </div>
      )}

      {/* Юр. услуги */}
      {mainTab === 'legal' && (
        <div className="flex flex-col items-center justify-center pt-24 px-8">
          <span style={{ color: '#F5E642' }} className="text-5xl mb-6">⚖️</span>
          <p className="text-white font-semibold text-lg mb-2">Юридические услуги</p>
          <p style={{ color: '#888' }} className="text-sm text-center">Раздел скоро появится.</p>
        </div>
      )}
    </div>
  );
}
