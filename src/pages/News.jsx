import { useState, useEffect } from 'react';

const CHANNEL = 'allservicesnew';

async function fetchPosts() {
  const url = `https://t.me/s/${CHANNEL}`;
  const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const res = await fetch(proxy);
  const html = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const messages = doc.querySelectorAll('.tgme_widget_message_wrap');

  return Array.from(messages).reverse().map(el => {
    const textEl = el.querySelector('.tgme_widget_message_text');
    const dateEl = el.querySelector('.tgme_widget_message_date time');
    const postEl = el.querySelector('.tgme_widget_message');
    const photoEl = el.querySelector('.tgme_widget_message_photo_wrap');

    const rawText = textEl?.innerText || textEl?.textContent || '';
    const html = textEl?.innerHTML || '';
    const date = dateEl?.getAttribute('datetime') || '';
    const postId = postEl?.dataset?.post || '';
    const photo = photoEl
      ? photoEl.style?.backgroundImage?.replace(/url\(["']?|["']?\)/g, '')
      : null;

    return { id: postId, text: rawText.trim(), html, date, photo };
  }).filter(p => p.text || p.photo);
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
}

function formatTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

export default function News() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPosts()
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', paddingBottom: '80px' }}>
      <div style={{ padding: '24px 16px 16px' }}>
        <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.2em', marginBottom: '4px' }}>ЛЕНТА</p>
        <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>Новости</h1>
      </div>

      {/* Загрузка */}
      {loading && (
        <div style={{ textAlign: 'center', paddingTop: '60px' }}>
          <p style={{ color: '#333', fontSize: '11px', letterSpacing: '0.15em' }}>ЗАГРУЗКА...</p>
        </div>
      )}

      {/* Ошибка */}
      {error && (
        <div style={{ textAlign: 'center', paddingTop: '60px', padding: '60px 32px 0' }}>
          <p style={{ color: '#2a2a2a', fontSize: '40px', marginBottom: '12px' }}>◉</p>
          <p style={{ color: '#fff', fontWeight: '600', marginBottom: '8px' }}>Не удалось загрузить</p>
          <p style={{ color: '#444', fontSize: '13px' }}>Проверьте соединение или зайдите позже</p>
        </div>
      )}

      {/* Посты */}
      {!loading && !error && posts.length === 0 && (
        <div style={{ textAlign: 'center', paddingTop: '60px' }}>
          <p style={{ color: '#2a2a2a', fontSize: '40px', marginBottom: '12px' }}>◉</p>
          <p style={{ color: '#555', fontSize: '13px' }}>Постов пока нет</p>
        </div>
      )}

      {!loading && !error && posts.map(post => (
        <div
          key={post.id}
          style={{ borderBottom: '1px solid #1a1a1a', padding: '16px' }}
        >
          {/* Фото */}
          {post.photo && (
            <div style={{
              width: '100%', height: '180px', marginBottom: '12px',
              background: `url(${post.photo}) center/cover no-repeat`,
              borderRadius: '2px',
            }} />
          )}

          {/* Текст */}
          {post.text && (
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.6 }}>
              {post.text}
            </p>
          )}

          {/* Дата */}
          {post.date && (
            <p style={{ color: '#444', fontSize: '10px', marginTop: '10px', letterSpacing: '0.05em' }}>
              {formatDate(post.date)} · {formatTime(post.date)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
