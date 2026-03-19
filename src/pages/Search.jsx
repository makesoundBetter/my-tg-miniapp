import { useState } from 'react';
import { services, categories } from '../data/services';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';

function getCategoryName(categoryId) {
  return categories.find(c => c.id === categoryId)?.name || '';
}

// Разбивает строку на слова и проверяет начало каждого слова
function startsWithWord(str, q) {
  return str.split(/[\s\-_/]+/).some(word => word.toLowerCase().startsWith(q));
}

function scoreService(service, q) {
  const name = service.name.toLowerCase();
  const cat = getCategoryName(service.category).toLowerCase();

  if (name === q) return 100;
  if (name.startsWith(q)) return 90;
  if (startsWithWord(name, q)) return 80;
  if (name.includes(q)) return 70;
  if (cat.startsWith(q)) return 60;
  if (cat.includes(q)) return 50;
  return 0;
}

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

  const filteredServices = q.length > 0
    ? services
        .map(s => ({ service: s, score: scoreService(s, q) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ service }) => service)
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
            Ищите по названию, категории или описанию
          </p>
        </div>
      )}

      {q && filteredServices.length === 0 && (
        <p style={{ color: '#555' }} className="text-center text-sm pt-16">Ничего не найдено</p>
      )}

      {filteredServices.length > 0 && (
        <div>
          <SectionLabel label={`Найдено — ${filteredServices.length}`} />
          {filteredServices.map(s => <ServiceCard key={s.id} service={s} />)}
        </div>
      )}
    </div>
  );
}
