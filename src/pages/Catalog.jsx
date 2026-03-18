import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { services, categories } from '../data/services';
import ServiceCard from '../components/ServiceCard';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ai';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filtered = services.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-0">
      <div className="p-4 pt-6">
        <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Каталог</p>
        <h1 className="text-2xl font-bold text-white">Услуги</h1>
      </div>

      <div className="flex gap-0 overflow-x-auto border-b" style={{ borderColor: '#2A2A2A' }}>
        {categories.filter(c => c.id !== 'all').map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              borderBottom: activeCategory === cat.id ? '2px solid #F5E642' : '2px solid transparent',
              color: activeCategory === cat.id ? '#F5E642' : '#888',
            }}
            className="shrink-0 px-4 py-3 text-xs font-medium tracking-wider uppercase transition-colors whitespace-nowrap"
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
    </div>
  );
}
