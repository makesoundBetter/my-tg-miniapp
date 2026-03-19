import { useState, useEffect } from 'react';

const ADMIN_PIN = '1234'; // поменяй на свой PIN

function getOps() {
  try { return JSON.parse(localStorage.getItem('moving_history') || '[]'); }
  catch { return []; }
}

function saveOps(ops) {
  localStorage.setItem('moving_history', JSON.stringify(ops));
}

function FlagImg({ code }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt=""
      style={{ width: '22px', height: '15px', objectFit: 'cover', borderRadius: '1px', flexShrink: 0 }}
    />
  );
}

export default function Admin() {
  const [pin, setPin] = useState('');
  const [auth, setAuth] = useState(() => sessionStorage.getItem('admin_auth') === '1');
  const [ops, setOps] = useState(getOps);
  const [error, setError] = useState('');

  // Синхронизируем при фокусе окна (если другой клиент обновил)
  useEffect(() => {
    const sync = () => setOps(getOps());
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

  const toggleComplete = (id) => {
    const updated = ops.map(op =>
      op.id === id
        ? { ...op, status: op.status === 'completed' ? 'pending' : 'completed',
            completedAt: op.status === 'completed' ? null : new Date().toISOString() }
        : op
    );
    setOps(updated);
    saveOps(updated);
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

  // ── Список операций ──
  const pending = ops.filter(o => o.status !== 'completed');
  const completed = ops.filter(o => o.status === 'completed');

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', padding: '20px 16px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <p style={{ color: '#F5E642', fontSize: '9px', letterSpacing: '0.3em', marginBottom: '4px' }}>ADMIN PANEL</p>
          <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>Перестановки</h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: '#555', fontSize: '11px' }}>В обработке: <span style={{ color: '#F5E642' }}>{pending.length}</span></p>
          <p style={{ color: '#555', fontSize: '11px' }}>Выполнено: <span style={{ color: '#4caf50' }}>{completed.length}</span></p>
        </div>
      </div>

      {ops.length === 0 && (
        <div style={{ textAlign: 'center', paddingTop: '60px' }}>
          <p style={{ color: '#333', fontSize: '40px', marginBottom: '12px' }}>⇄</p>
          <p style={{ color: '#555' }}>Операций пока нет</p>
        </div>
      )}

      {/* В обработке */}
      {pending.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '10px' }}>В ОБРАБОТКЕ</p>
          {pending.map(op => <OpCard key={op.id} op={op} onToggle={toggleComplete} />)}
        </div>
      )}

      {/* Выполнено */}
      {completed.length > 0 && (
        <div>
          <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '10px' }}>ВЫПОЛНЕНО</p>
          {completed.map(op => <OpCard key={op.id} op={op} onToggle={toggleComplete} />)}
        </div>
      )}
    </div>
  );
}

function OpCard({ op, onToggle }) {
  const done = op.status === 'completed';

  return (
    <div style={{
      background: '#0a0a0a',
      border: `1px solid ${done ? '#1a3000' : '#1e1e1e'}`,
      marginBottom: '12px', borderRadius: '2px', overflow: 'hidden',
    }}>
      {/* Шапка */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', background: '#0f0f0f', borderBottom: '1px solid #1a1a1a',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FlagImg code={op.sourceCode} />
          <span style={{ color: '#555', fontSize: '10px' }}>→</span>
          <FlagImg code={op.destCode} />
          <span style={{ color: '#888', fontSize: '12px', marginLeft: '4px' }}>
            {op.sourceCountry} → {op.destCountry}
          </span>
        </div>
        <span style={{ color: '#444', fontSize: '10px' }}>
          {new Date(op.date).toLocaleDateString('ru-RU')}
        </span>
      </div>

      {/* Данные */}
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
          {op.completedAt && (
            <div>
              <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '2px' }}>ВЫПОЛНЕНО</p>
              <p style={{ color: '#4caf50', fontSize: '13px' }}>{new Date(op.completedAt).toLocaleDateString('ru-RU')}</p>
            </div>
          )}
        </div>

        {/* Галочка подтверждения */}
        <button
          onClick={() => onToggle(op.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
            background: done ? '#0a1a00' : '#111',
            border: `1px solid ${done ? '#2a4a00' : '#2A2A2A'}`,
            padding: '12px 14px', borderRadius: '2px', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div style={{
            width: '20px', height: '20px', borderRadius: '3px',
            background: done ? '#4caf50' : '#1a1a1a',
            border: `2px solid ${done ? '#4caf50' : '#333'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'all 0.2s',
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
