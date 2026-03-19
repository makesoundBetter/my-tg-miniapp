import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function OrderConfirm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

  // state: { title, subtitle, fields: [{label, value}], telegramMsg }
  if (!state) {
    navigate(-1);
    return null;
  }

  const { title, subtitle, fields = [], telegramMsg } = state;

  const handleConfirm = () => {
    const commentPart = comment.trim() ? `\n\nКомментарий: ${comment.trim()}` : '';
    const text = encodeURIComponent(telegramMsg + commentPart);
    window.open(`https://t.me/Torontocake?text=${text}`, '_blank');
  };

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
            Подтверждение запроса
          </p>
          <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 'bold', lineHeight: 1.2 }}>{title}</h1>
          {subtitle && <p style={{ color: '#555', fontSize: '13px', marginTop: '6px' }}>{subtitle}</p>}
        </div>

        {/* Детали запроса */}
        {fields.length > 0 && (
          <div style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: '2px', marginBottom: '20px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid #1a1a1a', background: '#0f0f0f' }}>
              <p style={{ color: '#444', fontSize: '10px', letterSpacing: '0.15em' }}>ВАШ ЗАПРОС</p>
            </div>
            {fields.map((f, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  padding: '12px 14px',
                  borderBottom: i < fields.length - 1 ? '1px solid #111' : 'none',
                  gap: '12px',
                }}
              >
                <p style={{ color: '#555', fontSize: '12px', flexShrink: 0 }}>{f.label}</p>
                <p style={{ color: '#fff', fontSize: '13px', fontWeight: '500', textAlign: 'right' }}>{f.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Поле комментария */}
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
              outline: 'none', resize: 'none', borderRadius: '2px',
              lineHeight: '1.5',
            }}
          />
        </div>

        <p style={{ color: '#333', fontSize: '11px', marginBottom: '0' }}>
          После отправки вы перейдёте в Telegram — оператор ответит в ближайшее время
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
          Отправить запрос →
        </button>
      </div>
    </div>
  );
}
