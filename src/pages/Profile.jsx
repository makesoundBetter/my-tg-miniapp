import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { services } from '../data/services';

function getUser() {
  try {
    return window.Telegram?.WebApp?.initDataUnsafe?.user || null;
  } catch {
    return null;
  }
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem('service_history') || '[]');
  } catch {
    return [];
  }
}

function getMovingHistory() {
  try {
    return JSON.parse(localStorage.getItem('moving_history') || '[]');
  } catch {
    return [];
  }
}

function getSubscriptions() {
  try {
    return JSON.parse(localStorage.getItem('subscriptions') || '[]');
  } catch {
    return [];
  }
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function ServiceLogo({ logo, emoji }) {
  const [failed, setFailed] = useState(false);
  if (logo && !failed) {
    return <img src={logo} alt="" onError={() => setFailed(true)} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />;
  }
  return <span style={{ fontSize: '20px' }}>{emoji}</span>;
}

export default function Profile() {
  const navigate = useNavigate();
  const user = getUser();
  const history = getHistory();
  const subscriptions = getSubscriptions();
  const movingHistory = getMovingHistory();
  const [tab, setTab] = useState('subscriptions');

  const historyServices = history.map(h => ({
    ...h,
    service: services.find(s => s.id === h.id),
  })).filter(h => h.service);

  const activeSubs = subscriptions.filter(s => new Date(s.endDate) >= new Date());
  const expiredSubs = subscriptions.filter(s => new Date(s.endDate) < new Date());

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', paddingBottom: '80px' }}>
      {/* Шапка */}
      <div style={{ padding: '16px 16px 0' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ color: '#F5E642', fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          ← Назад
        </button>

        {/* Аватар + имя */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          {user?.photo_url ? (
            <img
              src={user.photo_url}
              alt=""
              style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #2A2A2A', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: '#1A1A1A', border: '2px solid #2A2A2A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#F5E642', fontSize: '24px',
            }}>
              {user?.first_name?.[0] || '?'}
            </div>
          )}
          <div>
            <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px', lineHeight: 1.2 }}>
              {user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : 'Пользователь'}
            </p>
            {user?.username && (
              <p style={{ color: '#555', fontSize: '13px', marginTop: '3px' }}>@{user.username}</p>
            )}
          </div>
        </div>

        {/* Табы */}
        <div style={{ display: 'flex', borderBottom: '1px solid #1a1a1a', marginBottom: '0' }}>
          {[
            { id: 'subscriptions', label: 'Подписки' },
            { id: 'history', label: 'Запросы' },
            { id: 'moving', label: 'Перестановки' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1, padding: '10px',
                color: tab === t.id ? '#F5E642' : '#444',
                fontSize: '13px', fontWeight: tab === t.id ? 'bold' : 'normal',
                borderBottom: tab === t.id ? '2px solid #F5E642' : '2px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Контент */}
      <div style={{ padding: '16px' }}>

        {/* ── Подписки ── */}
        {tab === 'subscriptions' && (
          <div>
            {activeSubs.length === 0 && expiredSubs.length === 0 ? (
              <div style={{ textAlign: 'center', paddingTop: '48px' }}>
                <p style={{ color: '#2a2a2a', fontSize: '48px', marginBottom: '16px' }}>◎</p>
                <p style={{ color: '#fff', fontWeight: '600', marginBottom: '8px' }}>Нет активных подписок</p>
                <p style={{ color: '#444', fontSize: '13px', lineHeight: 1.5 }}>
                  После оформления подписки через оператора она появится здесь с датами
                </p>
                <button
                  onClick={() => navigate('/catalog')}
                  style={{
                    marginTop: '24px', background: '#F5E642', color: '#000',
                    padding: '12px 24px', fontWeight: 'bold', fontSize: '12px',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}
                >
                  Перейти в каталог →
                </button>
              </div>
            ) : (
              <div>
                {activeSubs.length > 0 && (
                  <div style={{ marginBottom: '24px' }}>
                    <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '10px' }}>АКТИВНЫЕ</p>
                    {activeSubs.map((sub, i) => {
                      const svc = services.find(s => s.id === sub.serviceId);
                      if (!svc) return null;
                      const daysLeft = Math.ceil((new Date(sub.endDate) - new Date()) / 86400000);
                      return (
                        <SubCard key={i} svc={svc} sub={sub} daysLeft={daysLeft} active />
                      );
                    })}
                  </div>
                )}
                {expiredSubs.length > 0 && (
                  <div>
                    <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '10px' }}>ИСТЕКШИЕ</p>
                    {expiredSubs.map((sub, i) => {
                      const svc = services.find(s => s.id === sub.serviceId);
                      if (!svc) return null;
                      return <SubCard key={i} svc={svc} sub={sub} active={false} />;
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── История запросов ── */}
        {tab === 'history' && (
          <div>
            {historyServices.length === 0 ? (
              <div style={{ textAlign: 'center', paddingTop: '48px' }}>
                <p style={{ color: '#2a2a2a', fontSize: '48px', marginBottom: '16px' }}>◈</p>
                <p style={{ color: '#fff', fontWeight: '600', marginBottom: '8px' }}>История пуста</p>
                <p style={{ color: '#444', fontSize: '13px' }}>
                  Здесь будут сервисы, по которым вы отправляли запрос
                </p>
              </div>
            ) : (
              <div>
                {historyServices.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(`/service/${h.service.id}`)}
                    style={{ width: '100%', borderBottom: '1px solid #1a1a1a', padding: '12px 0', display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left' }}
                  >
                    <div style={{ width: '40px', height: '40px', background: '#111', border: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ServiceLogo logo={h.service.logo} emoji={h.service.emoji} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{h.service.name}</p>
                      <p style={{ color: '#444', fontSize: '11px', marginTop: '2px' }}>Запрос от {formatDate(h.date)}</p>
                    </div>
                    <span style={{ color: '#F5E642', fontSize: '16px' }}>›</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {/* ── Перестановки ── */}
        {tab === 'moving' && (
          <div>
            {movingHistory.length === 0 ? (
              <div style={{ textAlign: 'center', paddingTop: '48px' }}>
                <p style={{ color: '#2a2a2a', fontSize: '48px', marginBottom: '16px' }}>⇄</p>
                <p style={{ color: '#fff', fontWeight: '600', marginBottom: '8px' }}>Нет операций</p>
                <p style={{ color: '#444', fontSize: '13px' }}>
                  История перестановок появится после отправки первого запроса
                </p>
              </div>
            ) : (
              <div>
                {movingHistory.map((op) => (
                  <div
                    key={op.id}
                    style={{
                      background: '#0a0a0a',
                      border: '1px solid #1e1e1e',
                      marginBottom: '12px',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Шапка карточки */}
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 14px', borderBottom: '1px solid #1a1a1a',
                      background: '#0f0f0f',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src={`https://flagcdn.com/w40/${op.sourceCode}.png`} alt="" style={{ width: '20px', height: '14px', objectFit: 'cover', borderRadius: '1px' }} />
                        <span style={{ color: '#888', fontSize: '11px' }}>→</span>
                        <img src={`https://flagcdn.com/w40/${op.destCode}.png`} alt="" style={{ width: '20px', height: '14px', objectFit: 'cover', borderRadius: '1px' }} />
                        <span style={{ color: '#555', fontSize: '11px', marginLeft: '4px' }}>{op.sourceCountry} → {op.destCountry}</span>
                      </div>
                      <span style={{
                        fontSize: '9px', letterSpacing: '0.1em', padding: '2px 8px',
                        background: op.status === 'completed' ? '#0a1a00' : '#1a1500',
                        color: op.status === 'completed' ? '#4caf50' : '#F5E642',
                        border: `1px solid ${op.status === 'completed' ? '#1a3a00' : '#2a2000'}`,
                      }}>
                        {op.status === 'completed' ? 'ВЫПОЛНЕНО' : 'В ОБРАБОТКЕ'}
                      </span>
                    </div>

                    {/* Данные операции */}
                    <div style={{ padding: '12px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '3px' }}>СУММА ПЕРЕВОДА</p>
                        <p style={{ color: '#F5E642', fontWeight: 'bold', fontSize: '15px' }}>{op.amount} {op.currency}</p>
                      </div>
                      <div>
                        <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '3px' }}>ВАЛЮТА ОТДАЧИ</p>
                        <p style={{ color: '#fff', fontSize: '14px' }}>{op.sourceCurrency}</p>
                      </div>
                      <div>
                        <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '3px' }}>СПОСОБ ПЕРЕДАЧИ</p>
                        <p style={{ color: '#888', fontSize: '13px' }}>{op.transferMethod}</p>
                      </div>
                      <div>
                        <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '3px' }}>ДАТА ЗАПРОСА</p>
                        <p style={{ color: '#888', fontSize: '13px' }}>{formatDate(op.date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

function SubCard({ svc, sub, daysLeft, active }) {
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
          background: active ? '#1a1500' : '#111',
          color: active ? '#F5E642' : '#444',
          fontSize: '9px', letterSpacing: '0.1em', padding: '3px 8px',
          border: `1px solid ${active ? '#3a3000' : '#222'}`,
        }}>
          {active ? 'АКТИВНА' : 'ИСТЕКЛА'}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '0', borderTop: '1px solid #1a1a1a', paddingTop: '10px' }}>
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
