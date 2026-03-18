import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { services, categories } from '../data/services';
import ServiceCard from '../components/ServiceCard';

const mainTabs = [
  { id: 'online', label: 'Онлайн сервисы' },
  { id: 'moving', label: 'Перестановки' },
  { id: 'legal', label: 'Юр. услуги' },
];

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [mainTab, setMainTab] = useState('online');
  const initialCategory = searchParams.get('category') || 'ai';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filtered = services.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-0">
      <div className="p-4 pt-6 pb-4">
        <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Каталог</p>
        <h1 className="text-2xl font-bold text-white">Услуги</h1>
      </div>

      {/* Главные вкладки */}
      <div className="flex border-b" style={{ borderColor: '#2A2A2A' }}>
        {mainTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMainTab(tab.id)}
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
        <>
          <div className="flex gap-0 overflow-x-auto border-b" style={{ borderColor: '#2A2A2A' }}>
            {categories.filter(c => c.id !== 'all').map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  borderBottom: activeCategory === cat.id ? '2px solid #F5E642' : '2px solid transparent',
                  color: activeCategory === cat.id ? '#fff' : '#666',
                  background: '#0D0D0D',
                }}
                className="shrink-0 px-4 py-3 text-xs font-medium transition-colors whitespace-nowrap"
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="space-y-px mt-px">
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </>
      )}

      {/* Перестановки */}
      {mainTab === 'moving' && (
        <div className="flex flex-col items-center justify-center pt-24 px-8">
          <span style={{ color: '#F5E642' }} className="text-5xl mb-6">📦</span>
          <p className="text-white font-semibold text-lg mb-2">Перестановки</p>
          <p style={{ color: '#888' }} className="text-sm text-center">Раздел скоро появится. Следи за обновлениями.</p>
        </div>
      )}

      {/* Юр. услуги */}
      {mainTab === 'legal' && (
        <div className="flex flex-col items-center justify-center pt-24 px-8">
          <span style={{ color: '#F5E642' }} className="text-5xl mb-6">⚖️</span>
          <p className="text-white font-semibold text-lg mb-2">Юридические услуги</p>
          <p style={{ color: '#888' }} className="text-sm text-center">Раздел скоро появится. Следи за обновлениями.</p>
        </div>
      )}
    </div>
  );
}
