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
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-gray-900 pt-2">Услуги</h1>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.filter(c => c.id !== 'all').map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
