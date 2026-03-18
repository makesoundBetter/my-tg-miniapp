import { useState } from 'react';
import { services } from '../data/services';
import { news } from '../data/news';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';

export default function Search() {
  const [query, setQuery] = useState('');
  const q = query.toLowerCase().trim();

  const filteredServices = q ? services.filter(s =>
    s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
  ) : [];

  const filteredNews = q ? news.filter(n =>
    n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)
  ) : [];

  return (
    <div>
      <div className="p-4 pt-6 pb-4">
        <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Поиск</p>
        <h1 className="text-2xl font-bold text-white mb-4">Найти</h1>
        <SearchBar value={query} onChange={setQuery} placeholder="Введи название сервиса..." />
      </div>

      {!q && (
        <p style={{ color: '#888' }} className="text-center text-sm pt-16">Начни вводить запрос</p>
      )}

      {q && filteredServices.length === 0 && filteredNews.length === 0 && (
        <p style={{ color: '#888' }} className="text-center text-sm pt-16">Ничего не найдено</p>
      )}

      {filteredServices.length > 0 && (
        <div>
          <p style={{ color: '#888', letterSpacing: '0.15em', borderBottom: '1px solid #2A2A2A' }}
            className="text-xs uppercase px-4 py-2">
            Услуги
          </p>
          <div className="space-y-px">
            {filteredServices.map(s => <ServiceCard key={s.id} service={s} />)}
          </div>
        </div>
      )}

      {filteredNews.length > 0 && (
        <div className="mt-4">
          <p style={{ color: '#888', letterSpacing: '0.15em', borderBottom: '1px solid #2A2A2A' }}
            className="text-xs uppercase px-4 py-2">
            Новости
          </p>
          <div className="space-y-px">
            {filteredNews.map(n => (
              <div key={n.id} style={{ background: '#1A1A1A', borderBottom: '1px solid #2A2A2A' }}
                className="p-4 flex gap-4">
                <div style={{ background: '#2A2A2A' }}
                  className="w-10 h-10 flex items-center justify-center text-xl shrink-0">
                  {n.emoji}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{n.title}</h3>
                  <p style={{ color: '#888' }} className="text-xs mt-1">{n.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
