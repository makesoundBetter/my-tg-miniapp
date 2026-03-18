import { useNavigate } from 'react-router-dom';
import { categories } from '../data/services';

const quickLinks = [
  { to: '/catalog', icon: '📦', label: 'Все услуги' },
  { to: '/search', icon: '🔍', label: 'Поиск' },
  { to: '/news', icon: '📰', label: 'Новости' },
  { to: '/games', icon: '🎮', label: 'Релизы игр' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6">
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Привет! 👋</h1>
        <p className="text-gray-500 mt-1">Выбери нужный сервис или услугу</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {quickLinks.map((link) => (
          <button
            key={link.to}
            onClick={() => navigate(link.to)}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-transform"
          >
            <span className="text-3xl">{link.icon}</span>
            <span className="text-sm font-medium text-gray-700">{link.label}</span>
          </button>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Категории</h2>
        <div className="space-y-2">
          {categories.filter(c => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/catalog?category=${cat.id}`)}
              className="w-full bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center justify-between active:scale-95 transition-transform"
            >
              <span className="font-medium text-gray-800">{cat.name}</span>
              <span className="text-gray-400">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
