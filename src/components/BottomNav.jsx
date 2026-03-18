import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/', icon: '🏠', label: 'Главная' },
  { to: '/catalog', icon: '📦', label: 'Услуги' },
  { to: '/search', icon: '🔍', label: 'Поиск' },
  { to: '/news', icon: '📰', label: 'Новости' },
  { to: '/games', icon: '🎮', label: 'Релизы' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2 text-xs transition-colors ${
                isActive ? 'text-blue-500' : 'text-gray-500'
              }`
            }
          >
            <span className="text-xl mb-0.5">{tab.icon}</span>
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
