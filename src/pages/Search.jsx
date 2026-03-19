import { useState } from 'react';
import { services } from '../data/services';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';

export default function Search() {
  const [query, setQuery] = useState('');
  const q = query.toLowerCase().trim();

  const results = q
    ? services
        .filter(s => {
          const name = s.name.toLowerCase();
          if (q.length <= 3) {
            // Короткий запрос — только начало названия или начало слова
            return name.startsWith(q) ||
              name.split(/[\s.]+/).some(w => w.startsWith(q));
          }
          // Длинный запрос — везде в названии
          return name.includes(q);
        })
        .sort((a, b) => {
          const an = a.name.toLowerCase();
          const bn = b.name.toLowerCase();
          if (an.startsWith(q) && !bn.startsWith(q)) return -1;
          if (!an.startsWith(q) && bn.startsWith(q)) return 1;
          return 0;
        })
    : [];

  return (
    <div className="pb-20">
      <div className="p-4 pt-6 pb-4">
        <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Поиск</p>
        <h1 className="text-2xl font-bold text-white mb-4">Найти</h1>
        <SearchBar value={query} onChange={setQuery} placeholder="Название сервиса..." />
      </div>

      {!q && (
        <div className="flex flex-col items-center pt-16 px-8">
          <p style={{ color: '#2a2a2a', fontSize: '40px', marginBottom: '12px' }}>⌕</p>
          <p style={{ color: '#555', fontSize: '13px', textAlign: 'center' }}>
            Введите название сервиса
          </p>
        </div>
      )}

      {q && results.length === 0 && (
        <p style={{ color: '#555' }} className="text-center text-sm pt-16">Ничего не найдено</p>
      )}

      {results.length > 0 && (
        <div>
          <p style={{ color: '#444', letterSpacing: '0.15em', borderBottom: '1px solid #1a1a1a' }}
            className="text-xs uppercase px-4 py-2">
            Найдено — {results.length}
          </p>
          {results.map(s => <ServiceCard key={s.id} service={s} />)}
        </div>
      )}
    </div>
  );
}
