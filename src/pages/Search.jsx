import { useState } from 'react';
import { services } from '../data/services';
import { news } from '../data/news';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';

export default function Search() {
  const [query, setQuery] = useState('');

  const q = query.toLowerCase().trim();

  const filteredServices = q
    ? services.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      )
    : [];

  const filteredNews = q
    ? news.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-gray-900 pt-2">Поиск</h1>

      <SearchBar value={query} onChange={setQuery} placeholder="Поиск услуг и новостей..." />

      {!q && (
        <p className="text-center text-gray-400 pt-10">Введи запрос для поиска</p>
      )}

      {q && filteredServices.length === 0 && filteredNews.length === 0 && (
        <p className="text-center text-gray-400 pt-10">Ничего не найдено</p>
      )}

      {filteredServices.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-700 mb-2">Услуги</h2>
          <div className="space-y-3">
            {filteredServices.map(s => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      )}

      {filteredNews.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-700 mb-2">Новости</h2>
          <div className="space-y-3">
            {filteredNews.map(n => (
              <div key={n.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{n.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{n.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{n.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
