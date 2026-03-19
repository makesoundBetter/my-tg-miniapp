import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function getUser() {
  try { return window.Telegram?.WebApp?.initDataUnsafe?.user || null; }
  catch { return null; }
}

function saveOrder(order) {
  try {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  } catch {}
}

export default function OrderConfirm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState(null);

  if (!state) { navigate(-1); return null; }

  const { serviceId, title, subtitle, fields = [], telegramMsg } = state;
  const user = getUser();

  const handleConfirm = () => {
    const id = Date.now();
    const order = {
      id,
      date: new Date().toISOString(),
      serviceId: serviceId || null,
      title,
      subtitle: subtitle || '',
      fields,
      comment: comment.trim(),
      status: 'pending',
      telegramMsg,
      userName: user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : 'Гость',
      userUsername: user?.username || null,
      userId: user?.id || null,
    };
    saveOrder(order);
    setOrderId(id);
    setDone(true);
  };

  // ── Экран благодарности ──
  if (done) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0D0D0D',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '32px 24px', textAlign: 'center',
      }}>
        {/* Иконка */}
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: '#1a1500', border: '2px solid #F5E642',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '32px', marginBottom: '24px',
        }}>
          ✓
        </div>

        <p style={{ color: '#F5E642', fontSize: '10px', letterSpacing: '0.25em', marginBottom: '8px' }}>
          ЗАКАЗ ПРИНЯТ
        </p>
        <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 'bold', marginBottom: '12px', lineHeight: 1.3 }}>
          Спасибо за обращение!
        </h1>
        <p style={{ color: '#555', fontSize: '13px', lineHeight: 1.6, marginBottom: '32px' }}>
          Ваш заказ <span style={{ color: '#888' }}>#{String(orderId).slice(-6)}</span> принят и находится в обработке.
          Оператор свяжется с вами в ближайшее время.
        </p>

        {/* Статус */}
        <div style={{
          background: '#0a0a0a', border: '1px solid #1e1e1e',
          borderRadius: '2px', padding: '14px 20px',
          marginBottom: '32px', width: '100%', maxWidth: '320px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ color: '#555', fontSize: '12px' }}>{title}</p>
            <span style={{
              background: '#1a1500', color: '#F5E642',
              fontSize: '9px', letterSpacing: '0.1em',
              padding: '3px 8px', border: '1px solid #2a2000',
            }}>
              В ОБРАБОТКЕ
            </span>
          </div>
        </div>

        {/* Кнопки */}
        <button
          onClick={() => window.open('https://t.me/Torontocake', '_blank')}
          style={{
            background: '#F5E642', color: '#000',
            width: '100%', maxWidth: '320px', padding: '14px',
            fontWeight: 'bold', fontSize: '13px',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          Написать оператору →
        </button>

        <button
          onClick={() => navigate('/profile')}
          style={{
            background: 'transparent', color: '#555',
            width: '100%', maxWidth: '320px', padding: '12px',
            fontSize: '13px', border: '1px solid #1e1e1e',
          }}
        >
          Посмотреть мои заказы
        </button>
      </div>
    );
  }

  // ── Экран подтверждения ──
  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', paddingBottom: '100px' }}>
      <div className="p-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          style={{ color: '#F5E642', fontSize: '13px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          ← Назад
        </button>

        {/* Заголовок */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>
            Подтверждение заказа
          </p>
          <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 'bold', lineHeight: 1.2 }}>{title}</h1>
          {subtitle && <p style={{ color: '#555', fontSize: '13px', marginTop: '6px' }}>{subtitle}</p>}
        </div>

        {/* Детали */}
        {fields.length > 0 && (
          <div style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: '2px', marginBottom: '20px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid #1a1a1a', background: '#0f0f0f' }}>
              <p style={{ color: '#444', fontSize: '10px', letterSpacing: '0.15em' }}>ВАШ ЗАКАЗ</p>
            </div>
            {fields.map((f, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                padding: '12px 14px',
                borderBottom: i < fields.length - 1 ? '1px solid #111' : 'none',
                gap: '12px',
              }}>
                <p style={{ color: '#555', fontSize: '12px', flexShrink: 0 }}>{f.label}</p>
                <p style={{ color: '#fff', fontSize: '13px', fontWeight: '500', textAlign: 'right' }}>{f.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Комментарий */}
        <div style={{ marginBottom: '8px' }}>
          <label style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Комментарий <span style={{ color: '#333' }}>(необязательно)</span>
          </label>
          <textarea
            placeholder="Уточните детали, задайте вопрос или оставьте пожелания..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={4}
            style={{
              background: '#111', border: '1px solid #2A2A2A', color: '#fff',
              width: '100%', padding: '12px 14px', fontSize: '14px',
              outline: 'none', resize: 'none', borderRadius: '2px', lineHeight: '1.5',
            }}
          />
        </div>

        <p style={{ color: '#333', fontSize: '11px' }}>
          После подтверждения заказ отправится оператору и появится в вашем профиле
        </p>
      </div>

      {/* Кнопка */}
      <div className="fixed bottom-[70px] left-0 right-0 p-4" style={{ background: '#0D0D0D', borderTop: '1px solid #1a1a1a' }}>
        <button
          onClick={handleConfirm}
          style={{
            background: '#F5E642', color: '#000',
            width: '100%', padding: '16px',
            fontWeight: 'bold', fontSize: '13px',
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}
        >
          Подтвердить заказ →
        </button>
      </div>
    </div>
  );
}
