import { useState, useEffect } from 'react';

const CHANNEL = 'allservicesnew';

async function fetchPosts() {
  const url = `https://t.me/s/${CHANNEL}`;
  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://corsproxy.io/?${encodeURIComponent(url)}`,
  ];

  let html = '';
  for (const proxy of proxies) {
    try {
      const res = await fetch(proxy, { cache: 'no-store' });
      if (res.ok) { html = await res.text(); break; }
    } catch {}
  }

  if (!html) throw new Error('no response');

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const messages = doc.querySelectorAll('.tgme_widget_message_wrap');

  return Array.from(messages).reverse().map(el => {
    const textEl = el.querySelector('.tgme_widget_message_text');
    const dateEl = el.querySelector('.tgme_widget_message_date time');
    const postEl = el.querySelector('.tgme_widget_message');
    const photoEl = el.querySelector('.tgme_widget_message_photo_wrap');

    const text = textEl ? textEl.textContent.trim() : '';
    const date = dateEl?.getAttribute('datetime') || '';
    const postId = postEl?.dataset?.post || '';
    const photo = photoEl?.style?.backgroundImage
      ?.replace(/^url\(["']?/, '')
      ?.replace(/["']?\)$/, '') || null;

    return { id: postId, text, date, photo };
  }).filter(p => p.text || p.photo);
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' });
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

      {loading && (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
          <p style={{ color: '#333', fontSize: '11px', letterSpacing: '0.15em' }}>ЗАГРУЗКА...</p>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '80px 32px 0' }}>
          <p style={{ color: '#2a2a2a', fontSize: '40px', marginBottom: '12px' }}>◉</p>
          <p style={{ color: '#fff', fontWeight: '600', marginBottom: '8px' }}>Не удалось загрузить</p>
          <p style={{ color: '#444', fontSize: '13px' }}>Проверьте соединение или зайдите позже</p>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
          <p style={{ color: '#2a2a2a', fontSize: '40px', marginBottom: '12px' }}>◉</p>
          <p style={{ color: '#555', fontSize: '13px' }}>Постов пока нет</p>
        </div>
      )}

      {!loading && !error && (
        <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {posts.map(post => (
            <div
              key={post.id}
              style={{
                background: '#141414',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #1f1f1f',
              }}
            >
              {/* Фото */}
              {post.photo && (
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: `url(${post.photo}) center/cover no-repeat`,
                }} />
              )}

              <div style={{ padding: '16px' }}>
                {/* Дата */}
                {post.date && (
                  <p style={{
                    color: '#F5E642',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    marginBottom: '8px',
                    fontWeight: '600',
                  }}>
                    {formatDate(post.date)} · {formatTime(post.date)}
                  </p>
                )}

                {/* Текст */}
                {post.text && (
                  <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                    {post.text}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
