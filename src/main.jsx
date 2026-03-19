import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Блокировка зума (pinch-to-zoom) на iOS
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 1) e.preventDefault();
}, { passive: false });

document.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false });
document.addEventListener('gesturechange', (e) => e.preventDefault(), { passive: false });

// Telegram WebApp инициализация
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  tg.requestFullscreen?.();
  tg.disableVerticalSwipes?.();
  tg.setHeaderColor?.('#0D0D0D');
  tg.setBackgroundColor?.('#0D0D0D');
  tg.setBottomBarColor?.('#0D0D0D');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
