import { useState } from 'react';
import { services, categories } from '../data/services';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';

function SectionLabel({ label }) {
  return (
    <p style={{ color: '#444', letterSpacing: '0.15em', borderBottom: '1px solid #1a1a1a' }}
      className="text-xs uppercase px-4 py-2">
      {label}
    </p>
  );
}

export default function Search() {
  const [query, setQuery] = useState('');
  const q = query.toLowerCase().trim();

  const filteredServices = q
    ? services.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (categories.find(c => c.id === s.category)?.name || '').toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="pb-20">
      <div className="p-4 pt-6 pb-4">
        <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Поиск</p>
        <h1 className="text-2xl font-bold text-white mb-4">Найти</h1>
        <SearchBar value={query} onChange={setQuery} placeholder="Сервис, категория..." />
      </div>

      {!q && (
        <div className="flex flex-col items-center pt-16 px-8">
          <p style={{ color: '#2a2a2a', fontSize: '40px', marginBottom: '12px' }}>⌕</p>
          <p style={{ color: '#555', fontSize: '13px', textAlign: 'center' }}>
            Ищите по сервисам и категориям
          </p>
        </div>
      )}

      {q && filteredServices.length === 0 && (
        <p style={{ color: '#555' }} className="text-center text-sm pt-16">Ничего не найдено</p>
      )}

      {filteredServices.length > 0 && (
        <div>
          <SectionLabel label={`Сервисы — ${filteredServices.length}`} />
          {filteredServices.map(s => <ServiceCard key={s.id} service={s} />)}
        </div>
      )}
    </div>
  );
}
