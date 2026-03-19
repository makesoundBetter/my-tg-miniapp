import { useState, useEffect } from 'react';

const ADMIN_PIN = '1234';

function getOrders() {
  try { return JSON.parse(localStorage.getItem('orders') || '[]'); }
  catch { return []; }
}

function saveOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders));
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

function saveSubscription(order, startDate, endDate) {
  try {
    const subs = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    subs.unshift({
      serviceId: order.serviceId || null,
      title: order.title,
      startDate,
      endDate,
      orderId: order.id,
    });
    localStorage.setItem('subscriptions', JSON.stringify(subs));
  } catch {}
}

function OrderCard({ order, onStatus }) {
  const [showDateForm, setShowDateForm] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState('');

  const handleComplete = () => {
    if (!startDate || !endDate) return;
    saveSubscription(order, startDate, endDate);
    onStatus(order.id, 'completed');
    setShowDateForm(false);
  };

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
      <div style={{ padding: '10px 14px' }}>
        {order.status === 'pending' && (
          <button
            onClick={() => onStatus(order.id, 'paid')}
            style={{
              width: '100%', background: '#001a2a', border: '1px solid #002a40',
              color: '#4fc3f7', padding: '10px', fontSize: '11px',
              letterSpacing: '0.08em', fontWeight: '600', borderRadius: '2px',
            }}
          >
            Отметить оплаченным
          </button>
        )}

        {order.status === 'paid' && !showDateForm && (
          <button
            onClick={() => setShowDateForm(true)}
            style={{
              width: '100%', background: '#0a1a00', border: '1px solid #1a3000',
              color: '#4caf50', padding: '10px', fontSize: '11px',
              letterSpacing: '0.08em', fontWeight: '600', borderRadius: '2px',
            }}
          >
            Завершить и выставить подписку →
          </button>
        )}

        {order.status === 'paid' && showDateForm && (
          <div style={{ background: '#0a0a0a', border: '1px solid #1a3000', borderRadius: '2px', padding: '14px' }}>
            <p style={{ color: '#4caf50', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '12px' }}>ДИАПАЗОН ПОДПИСКИ</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
              <div>
                <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '5px' }}>НАЧАЛО</p>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  style={{
                    background: '#111', border: '1px solid #2A2A2A', color: '#fff',
                    width: '100%', padding: '8px 10px', fontSize: '13px',
                    borderRadius: '2px', outline: 'none',
                  }}
                />
              </div>
              <div>
                <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '5px' }}>ОКОНЧАНИЕ</p>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  min={startDate}
                  style={{
                    background: '#111', border: '1px solid #2A2A2A', color: '#fff',
                    width: '100%', padding: '8px 10px', fontSize: '13px',
                    borderRadius: '2px', outline: 'none',
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowDateForm(false)}
                style={{
                  flex: 1, background: '#111', border: '1px solid #2A2A2A',
                  color: '#555', padding: '10px', fontSize: '11px', borderRadius: '2px',
                }}
              >
                Отмена
              </button>
              <button
                onClick={handleComplete}
                disabled={!endDate}
                style={{
                  flex: 2,
                  background: endDate ? '#0a1a00' : '#111',
                  border: `1px solid ${endDate ? '#1a3000' : '#2A2A2A'}`,
                  color: endDate ? '#4caf50' : '#444',
                  padding: '10px', fontSize: '11px',
                  letterSpacing: '0.08em', fontWeight: '600', borderRadius: '2px',
                }}
              >
                Подтвердить завершение
              </button>
            </div>
          </div>
        )}

        {order.status === 'completed' && (
          <p style={{ color: '#333', fontSize: '11px', padding: '6px 0' }}>Заказ завершён · подписка активирована</p>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [pin, setPin] = useState('');
  const [auth, setAuth] = useState(() => sessionStorage.getItem('admin_auth') === '1');
  const [orders, setOrders] = useState(getOrders);
  const [error, setError] = useState('');

  useEffect(() => {
    const sync = () => setOrders(getOrders());
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

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', padding: '20px 16px 40px' }}>
      {/* Шапка */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <p style={{ color: '#F5E642', fontSize: '9px', letterSpacing: '0.3em', marginBottom: '4px' }}>ADMIN PANEL</p>
          <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>Заказы</h1>
        </div>
        <button
          onClick={() => { sessionStorage.removeItem('admin_auth'); setAuth(false); }}
          style={{ color: '#333', fontSize: '11px', border: '1px solid #1e1e1e', padding: '6px 12px' }}
        >
          Выйти
        </button>
      </div>

      {/* Статистика */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '20px' }}>
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

      {orders.length === 0 && (
        <div style={{ textAlign: 'center', paddingTop: '60px' }}>
          <p style={{ color: '#333', fontSize: '40px', marginBottom: '12px' }}>◈</p>
          <p style={{ color: '#555' }}>Заказов пока нет</p>
        </div>
      )}

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
  );
}
