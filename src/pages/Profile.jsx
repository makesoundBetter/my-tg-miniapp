import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { services } from '../data/services';

function getUser() {
  try { return window.Telegram?.WebApp?.initDataUnsafe?.user || null; }
  catch { return null; }
}

function getSubscriptions() {
  try { return JSON.parse(localStorage.getItem('subscriptions') || '[]'); }
  catch { return []; }
}

function ServiceLogo({ logo, emoji }) {
  const [failed, setFailed] = useState(false);
  if (logo && !failed) {
    return <img src={logo} alt="" onError={() => setFailed(true)} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />;
  }
  return <span style={{ fontSize: '20px' }}>{emoji}</span>;
}

function SubCard({ svc, sub, active }) {
  const daysLeft = active ? Math.ceil((new Date(sub.endDate) - new Date()) / 86400000) : null;
  return (
    <div style={{
      background: '#0f0f0f', border: `1px solid ${active ? '#2a2000' : '#1a1a1a'}`,
      padding: '14px', marginBottom: '10px', borderRadius: '2px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{ width: '36px', height: '36px', background: '#111', border: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ServiceLogo logo={svc.logo} emoji={svc.emoji} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{svc.name}</p>
          {active && daysLeft !== undefined && (
            <p style={{ color: '#F5E642', fontSize: '11px', marginTop: '2px' }}>Осталось {daysLeft} дн.</p>
          )}
        </div>
        <span style={{
          background: active ? '#0a1a00' : '#1a1a1a',
          color: active ? '#4caf50' : '#444',
          border: `1px solid ${active ? '#1a3000' : '#2a2a2a'}`,
          fontSize: '9px', letterSpacing: '0.1em', padding: '3px 8px', whiteSpace: 'nowrap',
        }}>
          {active ? 'АКТИВНА' : 'ИСТЕКЛА'}
        </span>
      </div>
      <div style={{ display: 'flex', borderTop: '1px solid #1a1a1a', paddingTop: '10px' }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '3px' }}>НАЧАЛО</p>
          <p style={{ color: '#888', fontSize: '13px' }}>{new Date(sub.startDate).toLocaleDateString('ru-RU')}</p>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '3px' }}>ОКОНЧАНИЕ</p>
          <p style={{ color: active ? '#fff' : '#555', fontSize: '13px' }}>{new Date(sub.endDate).toLocaleDateString('ru-RU')}</p>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const user = getUser();
  const subscriptions = getSubscriptions();

  const activeSubs = subscriptions.filter(s => new Date(s.endDate) >= new Date());
  const expiredSubs = subscriptions.filter(s => new Date(s.endDate) < new Date());

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', paddingBottom: '80px' }}>
      <div style={{ padding: '16px 16px 0' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ color: '#F5E642', fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          ← Назад
        </button>

        {/* Аватар и имя */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          {user?.photo_url ? (
            <img src={user.photo_url} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #2A2A2A', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#1A1A1A', border: '2px solid #2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5E642', fontSize: '24px' }}>
              {user?.first_name?.[0] || '?'}
            </div>
          )}
          <div>
            <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px', lineHeight: 1.2 }}>
              {user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : 'Пользователь'}
            </p>
            {user?.username && <p style={{ color: '#555', fontSize: '13px', marginTop: '3px' }}>@{user.username}</p>}
          </div>
        </div>

        <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '16px' }}>ПОДПИСКИ</p>
      </div>

      <div style={{ padding: '0 16px 16px' }}>
        {activeSubs.length === 0 && expiredSubs.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '48px' }}>
            <p style={{ color: '#2a2a2a', fontSize: '48px', marginBottom: '16px' }}>◎</p>
            <p style={{ color: '#fff', fontWeight: '600', marginBottom: '8px' }}>Нет активных подписок</p>
            <p style={{ color: '#444', fontSize: '13px', lineHeight: 1.5 }}>После оформления подписки через оператора она появится здесь</p>
          </div>
        ) : (
          <div>
            {activeSubs.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '10px' }}>АКТИВНЫЕ</p>
                {activeSubs.map((sub, i) => {
                  const svc = services.find(s => s.id === sub.serviceId);
                  return svc ? <SubCard key={i} svc={svc} sub={sub} active /> : null;
                })}
              </div>
            )}
            {expiredSubs.length > 0 && (
              <div>
                <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '10px' }}>ИСТЕКШИЕ</p>
                {expiredSubs.map((sub, i) => {
                  const svc = services.find(s => s.id === sub.serviceId);
                  return svc ? <SubCard key={i} svc={svc} sub={sub} active={false} /> : null;
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
