import { useNavigate } from 'react-router-dom';
import { categories } from '../data/services';

const quickLinks = [
  { to: '/catalog', icon: '◈', label: 'Услуги' },
  { to: '/search', icon: '⌕', label: 'Поиск' },
  { to: '/news', icon: '◉', label: 'Новости' },
  { to: '/games', icon: '◎', label: 'Релизы' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-8">
      <div className="pt-6">
        <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-2">Добро пожаловать</p>
        <h1 className="text-3xl font-bold text-white leading-tight">
          Найди нужный<br />
          <span style={{ color: '#F5E642' }}>сервис</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {quickLinks.map((link) => (
          <button
            key={link.to}
            onClick={() => navigate(link.to)}
            style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}
            className="p-4 flex flex-col items-start gap-3 active:scale-95 transition-transform"
          >
            <span style={{ color: '#F5E642' }} className="text-2xl">{link.icon}</span>
            <span className="text-sm font-medium text-white">{link.label}</span>
          </button>
        ))}
      </div>

      <div>
        <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-3">Категории</p>
        <div className="space-y-px">
          {categories.filter(c => c.id !== 'all').map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/catalog?category=${cat.id}`)}
              style={{ background: '#1A1A1A', borderBottom: '1px solid #2A2A2A' }}
              className="w-full p-4 flex items-center justify-between active:scale-95 transition-transform"
            >
              <span className="text-sm font-medium text-white">{cat.name}</span>
              <span style={{ color: '#F5E642' }}>→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
