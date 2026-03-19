import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/', icon: '⌂', label: 'Главная' },
  { to: '/catalog', icon: '◈', label: 'Услуги' },
  { to: '/search', icon: '⌕', label: 'Поиск' },
  { to: '/news', icon: '◉', label: 'Новости' },
  { to: '/favorites', icon: '♡', label: 'Избранное' },
];

export default function BottomNav() {
  return (
    <nav style={{ background: '#0D0D0D', borderTop: '1px solid #2A2A2A' }}
      className="fixed bottom-0 left-0 right-0 z-50">
      <div className="flex">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className={({ isActive }) =>
              `relative flex-1 flex flex-col items-center py-3 text-xs transition-all ${
                isActive
                  ? 'text-yellow-300'
                  : 'text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="text-lg mb-0.5">{tab.icon}</span>
                <span className={`text-[10px] font-medium tracking-wider uppercase ${isActive ? 'text-yellow-300' : 'text-gray-600'}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 w-6 h-0.5 bg-yellow-300 rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
