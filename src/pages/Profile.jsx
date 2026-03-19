import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { services } from '../data/services';

function getUser() {
  try { return window.Telegram?.WebApp?.initDataUnsafe?.user || null; }
  catch { return null; }
}

function getOrders() {
  try { return JSON.parse(localStorage.getItem('orders') || '[]'); }
  catch { return []; }
}

function getSubscriptions() {
  try { return JSON.parse(localStorage.getItem('subscriptions') || '[]'); }
  catch { return []; }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

const STATUS = {
  pending:   { label: 'В обработке', color: '#F5E642', bg: '#1a1500', border: '#2a2000' },
  paid:      { label: 'Оплачен',     color: '#4fc3f7', bg: '#001a2a', border: '#002a40' },
  completed: { label: 'Завершён',    color: '#4caf50', bg: '#0a1a00', border: '#1a3000' },
};

function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.pending;
  return (
    <span style={{
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontSize: '9px', letterSpacing: '0.1em', padding: '3px 8px', whiteSpace: 'nowrap',
    }}>
      {s.label.toUpperCase()}
    </span>
  );
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
  const [screen, setScreen] = useState('main');
  const user = getUser();
  const orders = getOrders();
  const subscriptions = getSubscriptions();
  const activeSubs = subscriptions.filter(s => new Date(s.endDate) >= new Date());
  const expiredSubs = subscriptions.filter(s => new Date(s.endDate) < new Date());

  // ── Экран заказов ──
  if (screen === 'orders') {
    return (
      <div style={{ minHeight: '100vh', background: '#0D0D0D', paddingBottom: '80px' }}>
        <div style={{ padding: '16px' }}>
          <button
            onClick={() => setScreen('main')}
            style={{ color: '#F5E642', fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ← Назад
          </button>
          <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '16px' }}>ЗАКАЗЫ</p>
        </div>
        <div style={{ padding: '0 16px 16px' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '48px' }}>
              <p style={{ color: '#2a2a2a', fontSize: '48px', marginBottom: '16px' }}>◈</p>
              <p style={{ color: '#fff', fontWeight: '600', marginBottom: '8px' }}>Заказов пока нет</p>
              <p style={{ color: '#444', fontSize: '13px' }}>Выберите услугу в каталоге и оформите заказ</p>
              <button
                onClick={() => navigate('/catalog')}
                style={{ marginTop: '24px', background: '#F5E642', color: '#000', padding: '12px 24px', fontWeight: 'bold', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                В каталог →
              </button>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: '2px', marginBottom: '12px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#0f0f0f', borderBottom: '1px solid #1a1a1a' }}>
                  <div>
                    <p style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{order.title}</p>
                    <p style={{ color: '#444', fontSize: '10px', marginTop: '2px' }}>
                      {formatDate(order.date)} в {formatTime(order.date)} · #{String(order.id).slice(-6)}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                {order.fields?.length > 0 && (
                  <div style={{ padding: '10px 14px', borderBottom: order.comment ? '1px solid #111' : 'none' }}>
                    {order.fields.map((f, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < order.fields.length - 1 ? '6px' : '0', gap: '12px' }}>
                        <p style={{ color: '#444', fontSize: '11px' }}>{f.label}</p>
                        <p style={{ color: '#888', fontSize: '11px', textAlign: 'right' }}>{f.value}</p>
                      </div>
                    ))}
                  </div>
                )}
                {order.comment && (
                  <div style={{ padding: '10px 14px', borderTop: '1px solid #111' }}>
                    <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '4px' }}>КОММЕНТАРИЙ</p>
                    <p style={{ color: '#666', fontSize: '12px', lineHeight: 1.5 }}>{order.comment}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // ── Экран подписок ──
  if (screen === 'subs') {
    return (
      <div style={{ minHeight: '100vh', background: '#0D0D0D', paddingBottom: '80px' }}>
        <div style={{ padding: '16px' }}>
          <button
            onClick={() => setScreen('main')}
            style={{ color: '#F5E642', fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ← Назад
          </button>
          <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '16px' }}>АКТИВНЫЕ ПОДПИСКИ</p>
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

  // ── Главный экран ──
  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', paddingBottom: '80px' }}>
      <div style={{ padding: '16px' }}>
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

        {/* Две кнопки-квадрата */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            onClick={() => setScreen('orders')}
            style={{
              background: '#1A1A1A', border: '1px solid #2A2A2A',
              boxShadow: '0 4px 0 #000',
              padding: '20px 16px', textAlign: 'left',
              borderRadius: '2px',
            }}
          >
            <p style={{ color: '#F5E642', fontWeight: 'bold', fontSize: '22px', lineHeight: 1, marginBottom: '8px' }}>
              {orders.length}
            </p>
            <p style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Заказы</p>
            <p style={{ color: '#444', fontSize: '10px', marginTop: '2px' }}>История заказов</p>
          </button>

          <button
            onClick={() => setScreen('subs')}
            style={{
              background: '#1A1A1A', border: '1px solid #2A2A2A',
              boxShadow: '0 4px 0 #000',
              padding: '20px 16px', textAlign: 'left',
              borderRadius: '2px',
            }}
          >
            <p style={{ color: '#4caf50', fontWeight: 'bold', fontSize: '22px', lineHeight: 1, marginBottom: '8px' }}>
              {activeSubs.length}
            </p>
            <p style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Подписки</p>
            <p style={{ color: '#444', fontSize: '10px', marginTop: '2px' }}>Активные подписки</p>
          </button>
        </div>
      </div>
    </div>
  );
}
