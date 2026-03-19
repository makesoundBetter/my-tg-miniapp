import { useState, useEffect } from 'react';

const ADMIN_PIN = '1234';

function getOrders() {
  try { return JSON.parse(localStorage.getItem('orders') || '[]'); }
  catch { return []; }
}

function getMoving() {
  try { return JSON.parse(localStorage.getItem('moving_history') || '[]'); }
  catch { return []; }
}

function saveOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function saveMoving(ops) {
  localStorage.setItem('moving_history', JSON.stringify(ops));
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

// Карточка обычного заказа
function OrderCard({ order, onStatus }) {
  return (
    <div style={{
      background: '#0a0a0a', border: '1px solid #1e1e1e',
      marginBottom: '12px', borderRadius: '2px', overflow: 'hidden',
    }}>
      {/* Шапка */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        padding: '10px 14px', background: '#0f0f0f', borderBottom: '1px solid #1a1a1a', gap: '8px',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: '#fff', fontWeight: '600', fontSize: '14px', marginBottom: '2px' }}>{order.title}</p>
          <p style={{ color: '#444', fontSize: '10px' }}>
            {formatDate(order.date)} в {formatTime(order.date)} · #{String(order.id).slice(-6)}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Пользователь */}
      <div style={{ padding: '8px 14px', borderBottom: '1px solid #111', background: '#080808' }}>
        <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '2px' }}>ПОЛЬЗОВАТЕЛЬ</p>
        <p style={{ color: '#888', fontSize: '12px' }}>
          {order.userName || 'Гость'}
          {order.userUsername && <span style={{ color: '#555' }}> · @{order.userUsername}</span>}
          {order.userId && <span style={{ color: '#333' }}> · ID {order.userId}</span>}
        </p>
      </div>

      {/* Поля заказа */}
      {order.fields?.length > 0 && (
        <div style={{ padding: '10px 14px', borderBottom: '1px solid #111' }}>
          {order.fields.map((f, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: i < order.fields.length - 1 ? '5px' : '0', gap: '12px',
            }}>
              <p style={{ color: '#444', fontSize: '11px' }}>{f.label}</p>
              <p style={{ color: '#888', fontSize: '11px', textAlign: 'right' }}>{f.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Комментарий */}
      {order.comment && (
        <div style={{ padding: '8px 14px', borderBottom: '1px solid #111' }}>
          <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '3px' }}>КОММЕНТАРИЙ</p>
          <p style={{ color: '#666', fontSize: '12px', lineHeight: 1.5 }}>{order.comment}</p>
        </div>
      )}

      {/* Кнопки статуса */}
      <div style={{ padding: '10px 14px', display: 'flex', gap: '8px' }}>
        {order.status === 'pending' && (
          <button
            onClick={() => onStatus(order.id, 'paid')}
            style={{
              flex: 1, background: '#001a2a', border: '1px solid #002a40',
              color: '#4fc3f7', padding: '10px', fontSize: '11px',
              letterSpacing: '0.08em', fontWeight: '600', borderRadius: '2px',
            }}
          >
            Отметить оплаченным
          </button>
        )}
        {order.status === 'paid' && (
          <button
            onClick={() => onStatus(order.id, 'completed')}
            style={{
              flex: 1, background: '#0a1a00', border: '1px solid #1a3000',
              color: '#4caf50', padding: '10px', fontSize: '11px',
              letterSpacing: '0.08em', fontWeight: '600', borderRadius: '2px',
            }}
          >
            Отметить завершённым
          </button>
        )}
        {order.status === 'completed' && (
          <p style={{ color: '#333', fontSize: '11px', padding: '10px 0' }}>Заказ завершён</p>
        )}
      </div>
    </div>
  );
}

// Карточка перестановки
function MovingCard({ op, onToggle }) {
  const done = op.status === 'completed';
  return (
    <div style={{
      background: '#0a0a0a', border: `1px solid ${done ? '#1a3000' : '#1e1e1e'}`,
      marginBottom: '12px', borderRadius: '2px', overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', background: '#0f0f0f', borderBottom: '1px solid #1a1a1a',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img src={`https://flagcdn.com/w40/${op.sourceCode}.png`} alt="" style={{ width: '20px', height: '14px', objectFit: 'cover', borderRadius: '1px' }} />
          <span style={{ color: '#555', fontSize: '10px' }}>→</span>
          <img src={`https://flagcdn.com/w40/${op.destCode}.png`} alt="" style={{ width: '20px', height: '14px', objectFit: 'cover', borderRadius: '1px' }} />
          <span style={{ color: '#888', fontSize: '12px', marginLeft: '4px' }}>
            {op.sourceCountry} → {op.destCountry}
          </span>
        </div>
        <span style={{ color: '#444', fontSize: '10px' }}>{formatDate(op.date)}</span>
      </div>

      {/* Пользователь */}
      {(op.userName || op.userUsername) && (
        <div style={{ padding: '8px 14px', borderBottom: '1px solid #111', background: '#080808' }}>
          <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '2px' }}>ПОЛЬЗОВАТЕЛЬ</p>
          <p style={{ color: '#888', fontSize: '12px' }}>
            {op.userName || ''}
            {op.userUsername && <span style={{ color: '#555' }}> · @{op.userUsername}</span>}
          </p>
        </div>
      )}

      <div style={{ padding: '12px 14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
          <div>
            <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '2px' }}>СУММА</p>
            <p style={{ color: '#F5E642', fontWeight: 'bold', fontSize: '15px' }}>{op.amount} {op.currency}</p>
          </div>
          <div>
            <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '2px' }}>ОТДАЁТ</p>
            <p style={{ color: '#fff', fontSize: '14px' }}>{op.sourceCurrency}</p>
          </div>
          <div>
            <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '2px' }}>СПОСОБ</p>
            <p style={{ color: '#888', fontSize: '13px' }}>{op.transferMethod}</p>
          </div>
        </div>

        <button
          onClick={() => onToggle(op.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
            background: done ? '#0a1a00' : '#111',
            border: `1px solid ${done ? '#2a4a00' : '#2A2A2A'}`,
            padding: '12px 14px', borderRadius: '2px',
          }}
        >
          <div style={{
            width: '20px', height: '20px', borderRadius: '3px',
            background: done ? '#4caf50' : '#1a1a1a',
            border: `2px solid ${done ? '#4caf50' : '#333'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {done && <span style={{ color: '#000', fontSize: '13px', fontWeight: 'bold', lineHeight: 1 }}>✓</span>}
          </div>
          <span style={{ color: done ? '#4caf50' : '#666', fontSize: '13px', fontWeight: done ? '600' : 'normal' }}>
            {done ? 'Средства переданы' : 'Отметить как выполненное'}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function Admin() {
  const [pin, setPin] = useState('');
  const [auth, setAuth] = useState(() => sessionStorage.getItem('admin_auth') === '1');
  const [orders, setOrders] = useState(getOrders);
  const [moving, setMoving] = useState(getMoving);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('orders');

  useEffect(() => {
    const sync = () => {
      setOrders(getOrders());
      setMoving(getMoving());
    };
    window.addEventListener('focus', sync);
    return () => window.removeEventListener('focus', sync);
  }, []);

  const handleLogin = () => {
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('admin_auth', '1');
      setAuth(true);
      setError('');
    } else {
      setError('Неверный PIN');
      setPin('');
    }
  };

  const handleOrderStatus = (id, newStatus) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
    setOrders(updated);
    saveOrders(updated);
  };

  const handleMovingToggle = (id) => {
    const updated = moving.map(op =>
      op.id === id
        ? { ...op, status: op.status === 'completed' ? 'pending' : 'completed',
            completedAt: op.status === 'completed' ? null : new Date().toISOString() }
        : op
    );
    setMoving(updated);
    saveMoving(updated);
  };

  // ── PIN экран ──
  if (!auth) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0D0D0D',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '32px',
      }}>
        <p style={{ color: '#F5E642', fontSize: '10px', letterSpacing: '0.3em', marginBottom: '8px' }}>ADMIN</p>
        <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 'bold', marginBottom: '32px' }}>Панель управления</h1>
        <div style={{ width: '100%', maxWidth: '280px' }}>
          <input
            type="password"
            placeholder="Введите PIN"
            value={pin}
            onChange={e => setPin(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              background: '#111', border: '1px solid #2A2A2A', color: '#fff',
              width: '100%', padding: '14px', fontSize: '18px',
              textAlign: 'center', letterSpacing: '0.3em', outline: 'none',
              marginBottom: '12px', borderRadius: '2px',
            }}
          />
          {error && <p style={{ color: '#ff4444', fontSize: '12px', textAlign: 'center', marginBottom: '12px' }}>{error}</p>}
          <button
            onClick={handleLogin}
            style={{
              background: '#F5E642', color: '#000', width: '100%',
              padding: '14px', fontWeight: 'bold', fontSize: '13px',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const paidOrders = orders.filter(o => o.status === 'paid');
  const completedOrders = orders.filter(o => o.status === 'completed');
  const pendingMoving = moving.filter(o => o.status !== 'completed');
  const completedMoving = moving.filter(o => o.status === 'completed');

  const TABS = [
    { id: 'orders', label: 'Заказы', count: orders.length },
    { id: 'moving', label: 'Перестановки', count: moving.length },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', paddingBottom: '40px' }}>
      {/* Шапка */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <p style={{ color: '#F5E642', fontSize: '9px', letterSpacing: '0.3em', marginBottom: '4px' }}>ADMIN PANEL</p>
            <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>Управление</h1>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); setAuth(false); }}
            style={{ color: '#333', fontSize: '11px', border: '1px solid #1e1e1e', padding: '6px 12px' }}
          >
            Выйти
          </button>
        </div>

        {/* Статистика */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '10px', borderRadius: '2px', textAlign: 'center' }}>
            <p style={{ color: '#F5E642', fontWeight: 'bold', fontSize: '20px' }}>{pendingOrders.length}</p>
            <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.08em' }}>НОВЫХ</p>
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '10px', borderRadius: '2px', textAlign: 'center' }}>
            <p style={{ color: '#4fc3f7', fontWeight: 'bold', fontSize: '20px' }}>{paidOrders.length}</p>
            <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.08em' }}>ОПЛАЧЕНО</p>
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '10px', borderRadius: '2px', textAlign: 'center' }}>
            <p style={{ color: '#4caf50', fontWeight: 'bold', fontSize: '20px' }}>{completedOrders.length}</p>
            <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.08em' }}>ГОТОВО</p>
          </div>
        </div>

        {/* Табы */}
        <div style={{ display: 'flex', borderBottom: '1px solid #1a1a1a' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1, padding: '10px 4px',
                color: tab === t.id ? '#F5E642' : '#444',
                fontSize: '12px', fontWeight: tab === t.id ? 'bold' : 'normal',
                borderBottom: tab === t.id ? '2px solid #F5E642' : '2px solid transparent',
              }}
            >
              {t.label}
              {t.count > 0 && (
                <span style={{
                  marginLeft: '4px', background: tab === t.id ? '#F5E642' : '#222',
                  color: tab === t.id ? '#000' : '#555',
                  fontSize: '9px', padding: '1px 5px', borderRadius: '10px',
                }}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px' }}>

        {/* ── Заказы ── */}
        {tab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', paddingTop: '60px' }}>
                <p style={{ color: '#333', fontSize: '40px', marginBottom: '12px' }}>◈</p>
                <p style={{ color: '#555' }}>Заказов пока нет</p>
              </div>
            ) : (
              <div>
                {pendingOrders.length > 0 && (
                  <div style={{ marginBottom: '24px' }}>
                    <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '10px' }}>В ОБРАБОТКЕ</p>
                    {pendingOrders.map(o => <OrderCard key={o.id} order={o} onStatus={handleOrderStatus} />)}
                  </div>
                )}
                {paidOrders.length > 0 && (
                  <div style={{ marginBottom: '24px' }}>
                    <p style={{ color: '#4fc3f7', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '10px' }}>ОЖИДАЕТ ЗАВЕРШЕНИЯ</p>
                    {paidOrders.map(o => <OrderCard key={o.id} order={o} onStatus={handleOrderStatus} />)}
                  </div>
                )}
                {completedOrders.length > 0 && (
                  <div>
                    <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '10px' }}>ЗАВЕРШЁННЫЕ</p>
                    {completedOrders.map(o => <OrderCard key={o.id} order={o} onStatus={handleOrderStatus} />)}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Перестановки ── */}
        {tab === 'moving' && (
          <div>
            {moving.length === 0 ? (
              <div style={{ textAlign: 'center', paddingTop: '60px' }}>
                <p style={{ color: '#333', fontSize: '40px', marginBottom: '12px' }}>⇄</p>
                <p style={{ color: '#555' }}>Перестановок пока нет</p>
              </div>
            ) : (
              <div>
                {pendingMoving.length > 0 && (
                  <div style={{ marginBottom: '24px' }}>
                    <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '10px' }}>В ОБРАБОТКЕ</p>
                    {pendingMoving.map(op => <MovingCard key={op.id} op={op} onToggle={handleMovingToggle} />)}
                  </div>
                )}
                {completedMoving.length > 0 && (
                  <div>
                    <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '10px' }}>ВЫПОЛНЕНО</p>
                    {completedMoving.map(op => <MovingCard key={op.id} op={op} onToggle={handleMovingToggle} />)}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
