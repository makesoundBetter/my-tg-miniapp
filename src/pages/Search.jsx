import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { services, categories } from '../data/services';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';

const LEGAL = [
  { name: 'Консультация по финансовым вопросам', section: 'Юридические услуги', msg: 'Хочу получить консультацию по финансовым вопросам' },
  { name: 'Корпоративное сопровождение',          section: 'Корпоративные услуги', msg: 'Интересует корпоративное сопровождение' },
  { name: 'Открытие компаний',                    section: 'Корпоративные услуги', msg: 'Хочу узнать про открытие компании' },
  { name: 'Бизнес под ключ',                      section: 'Корпоративные услуги', msg: 'Интересует услуга «Бизнес под ключ»' },
  { name: 'Бухгалтерские услуги',                 section: 'Юридические услуги', msg: 'Интересуют бухгалтерские услуги' },
];

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
  const navigate = useNavigate();
  const q = query.toLowerCase().trim();

  const filteredServices = q
    ? services.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (categories.find(c => c.id === s.category)?.name || '').toLowerCase().includes(q)
      )
    : [];

  const filteredLegal = q
    ? LEGAL.filter(l =>
        l.name.toLowerCase().includes(q) || l.section.toLowerCase().includes(q)
      )
    : [];

  const hasResults = filteredServices.length > 0 || filteredLegal.length > 0;

  return (
    <div className="pb-20">
      <div className="p-4 pt-6 pb-4">
        <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Поиск</p>
        <h1 className="text-2xl font-bold text-white mb-4">Найти</h1>
        <SearchBar value={query} onChange={setQuery} placeholder="Сервис, страна, услуга..." />
      </div>

      {!q && (
        <div className="flex flex-col items-center pt-16 px-8">
          <p style={{ color: '#2a2a2a', fontSize: '40px', marginBottom: '12px' }}>⌕</p>
          <p style={{ color: '#555', fontSize: '13px', textAlign: 'center' }}>
            Ищите по сервисам и юридическим услугам
          </p>
        </div>
      )}

      {q && !hasResults && (
        <p style={{ color: '#555' }} className="text-center text-sm pt-16">Ничего не найдено</p>
      )}

      {/* Сервисы */}
      {filteredServices.length > 0 && (
        <div>
          <SectionLabel label={`Сервисы — ${filteredServices.length}`} />
          {filteredServices.map(s => <ServiceCard key={s.id} service={s} />)}
        </div>
      )}

      {/* Юр. услуги */}
      {filteredLegal.length > 0 && (
        <div className="mt-2">
          <SectionLabel label="Юридические услуги" />
          {filteredLegal.map(item => (
            <button
              key={item.name}
              onClick={() => navigate('/order-confirm', {
                state: {
                  title: item.name,
                  subtitle: item.section,
                  fields: [{ label: 'Раздел', value: item.section }],
                  telegramMsg: item.msg,
                },
              })}
              style={{ borderBottom: '1px solid #1a1a1a', width: '100%' }}
              className="flex items-center gap-4 px-4 py-3 active:bg-white/5 text-left"
            >
              <div style={{
                width: '40px', height: '40px', background: '#111',
                border: '1px solid #1e1e1e', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span style={{ fontSize: '18px' }}>⚖️</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{item.name}</p>
                <p style={{ color: '#444', fontSize: '11px' }}>{item.section}</p>
              </div>
              <span style={{ color: '#F5E642' }}>›</span>
            </button>
          ))}
        </div>
      )}


    </div>
  );
}
