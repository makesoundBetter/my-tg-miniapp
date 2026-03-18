export const categories = [
  { id: 'all', name: 'Все' },
  { id: 'ai', name: 'ИИ сервисы' },
  { id: 'social', name: 'Соцсети' },
  { id: 'design', name: 'Дизайн' },
  { id: 'dev', name: 'Разработка' },
  { id: 'travel', name: 'Путешествия' },
  { id: 'games', name: 'Игры' },
];

const logo = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const services = [
  // ИИ сервисы
  { id: 1, category: 'ai', name: 'ChatGPT', description: 'Доступ к GPT-4o и другим моделям OpenAI', logo: logo('openai.com'), emoji: '🤖' },
  { id: 2, category: 'ai', name: 'Suno AI', description: 'Генерация музыки с помощью ИИ', logo: logo('suno.ai'), emoji: '🎵' },
  { id: 3, category: 'ai', name: 'Midjourney', description: 'Генерация изображений по текстовым запросам', logo: logo('midjourney.com'), emoji: '🎨' },
  { id: 4, category: 'ai', name: 'Gamma AI', description: 'Создание презентаций с помощью ИИ', logo: logo('gamma.app'), emoji: '📊' },
  { id: 5, category: 'ai', name: 'DeepSeek', description: 'Мощная языковая модель для задач анализа', logo: logo('deepseek.com'), emoji: '🔬' },
  { id: 6, category: 'ai', name: 'Cursor AI', description: 'ИИ-редактор кода с автодополнением', logo: logo('cursor.sh'), emoji: '💻' },
  { id: 7, category: 'ai', name: 'Krea AI', description: 'Генерация и редактирование изображений в реальном времени', logo: logo('krea.ai'), emoji: '🖼️' },
  { id: 8, category: 'ai', name: 'Open API', description: 'Доступ к API OpenAI для разработчиков', logo: logo('openai.com'), emoji: '⚙️' },
  { id: 9, category: 'ai', name: 'Kling AI', description: 'Генерация видео с помощью ИИ', logo: logo('klingai.com'), emoji: '🎬' },
  { id: 10, category: 'ai', name: 'Claude', description: 'ИИ-ассистент от Anthropic', logo: logo('anthropic.com'), emoji: '✨' },
  { id: 11, category: 'ai', name: 'Freepik', description: 'ИИ-генерация изображений и графики', logo: logo('freepik.com'), emoji: '🖌️' },
  { id: 12, category: 'ai', name: 'Runway AI', description: 'Генерация и редактирование видео с ИИ', logo: logo('runwayml.com'), emoji: '🎞️' },
  { id: 13, category: 'ai', name: 'ElevenLabs', description: 'Синтез голоса и клонирование с помощью ИИ', logo: logo('elevenlabs.io'), emoji: '🎙️' },
  { id: 14, category: 'ai', name: 'Higgsfield AI', description: 'Создание видео и аватаров с ИИ', logo: logo('higgsfield.ai'), emoji: '🤳' },
  { id: 15, category: 'ai', name: 'Candy AI', description: 'ИИ-компаньон и генерация персонажей', logo: logo('candy.ai'), emoji: '🍬' },
  { id: 16, category: 'ai', name: 'Lensa AI', description: 'ИИ-редактор фото и аватаров', logo: logo('lensa.ai'), emoji: '📸' },
  { id: 17, category: 'ai', name: 'Google Gemini', description: 'Мультимодальный ИИ от Google', logo: logo('google.com'), emoji: '💎' },
  { id: 18, category: 'ai', name: 'Perplexity AI', description: 'ИИ-поисковик с актуальными данными', logo: logo('perplexity.ai'), emoji: '🔍' },
  { id: 19, category: 'ai', name: 'NanoBanana', description: 'ИИ-инструменты для контента', logo: null, emoji: '🍌' },
  { id: 20, category: 'ai', name: 'Grok AI', description: 'ИИ-ассистент от xAI (Илон Маск)', logo: logo('x.ai'), emoji: '🚀' },

  // Социальные сети / контент
  { id: 21, category: 'social', name: 'TikTok', description: 'Монетизация и продвижение в TikTok', logo: logo('tiktok.com'), emoji: '📱' },
  { id: 22, category: 'social', name: 'Patreon', description: 'Подписки и поддержка авторов', logo: logo('patreon.com'), emoji: '🎭' },
  { id: 23, category: 'social', name: 'OnlyFans', description: 'Платформа для эксклюзивного контента', logo: logo('onlyfans.com'), emoji: '⭐' },
  { id: 24, category: 'social', name: 'Faceit', description: 'Игровая платформа и турниры', logo: logo('faceit.com'), emoji: '🏆' },
  { id: 25, category: 'social', name: 'YouTube Premium', description: 'YouTube без рекламы + YouTube Music', logo: logo('youtube.com'), emoji: '▶️' },
  { id: 26, category: 'social', name: 'Twitch', description: 'Подписки и поддержка стримеров', logo: logo('twitch.tv'), emoji: '💜' },
  { id: 27, category: 'social', name: 'Keta', description: 'Платформа для авторов контента', logo: null, emoji: '🎪' },
  { id: 28, category: 'social', name: 'Discord', description: 'Нитро и буст серверов Discord', logo: logo('discord.com'), emoji: '🎮' },
  { id: 29, category: 'social', name: 'Pixiv / Fanbox', description: 'Поддержка художников и авторов', logo: logo('pixiv.net'), emoji: '🖼️' },
  { id: 30, category: 'social', name: 'Ko-fi', description: 'Поддержка авторов и донаты', logo: logo('ko-fi.com'), emoji: '☕' },
  { id: 31, category: 'social', name: 'Boosty', description: 'Российская платформа для авторов', logo: logo('boosty.to'), emoji: '🚀' },
  { id: 32, category: 'social', name: 'Makeship', description: 'Создание и продажа мерча', logo: logo('makeship.com'), emoji: '👕' },
  { id: 33, category: 'social', name: 'Gumroad', description: 'Продажа цифровых товаров и курсов', logo: logo('gumroad.com'), emoji: '💾' },

  // Дизайн / Графика
  { id: 34, category: 'design', name: 'Canva', description: 'Онлайн-редактор для дизайна и графики', logo: logo('canva.com'), emoji: '🎨' },
  { id: 35, category: 'design', name: 'Figma', description: 'Профессиональный инструмент UI/UX дизайна', logo: logo('figma.com'), emoji: '✏️' },
  { id: 36, category: 'design', name: 'CapCut', description: 'Видеоредактор для контента и Reels', logo: logo('capcut.com'), emoji: '🎬' },
  { id: 37, category: 'design', name: 'Adobe', description: 'Photoshop, Illustrator, Premiere и другие', logo: logo('adobe.com'), emoji: '🔴' },
  { id: 38, category: 'design', name: 'Fotor', description: 'Онлайн-редактор фото и дизайна', logo: logo('fotor.com'), emoji: '📷' },

  // Разработка / Профессиональный софт
  { id: 39, category: 'dev', name: 'Hetzner', description: 'Облачные серверы и хостинг', logo: logo('hetzner.com'), emoji: '🖥️' },
  { id: 40, category: 'dev', name: 'Javarush', description: 'Обучение Java-разработке онлайн', logo: logo('javarush.com'), emoji: '☕' },
  { id: 41, category: 'dev', name: 'TradingView', description: 'Профессиональные графики и аналитика рынков', logo: logo('tradingview.com'), emoji: '📈' },
  { id: 42, category: 'dev', name: 'iMazing', description: 'Управление iPhone и iPad с компьютера', logo: logo('imazing.com'), emoji: '📱' },
  { id: 43, category: 'dev', name: 'JetBrains', description: 'IDE для разработчиков (IntelliJ, PyCharm и др.)', logo: logo('jetbrains.com'), emoji: '💡' },
  { id: 44, category: 'dev', name: 'Obsidian', description: 'База знаний и заметки с плагинами', logo: logo('obsidian.md'), emoji: '📝' },
  { id: 45, category: 'dev', name: 'Xsolla', description: 'Платёжная платформа для игр', logo: logo('xsolla.com'), emoji: '💳' },
  { id: 46, category: 'dev', name: 'Exaroton', description: 'Хостинг для серверов Minecraft', logo: logo('exaroton.com'), emoji: '⛏️' },

  // Путешествия / eSIM
  { id: 47, category: 'travel', name: 'Airalo', description: 'eSIM для путешествий по всему миру', logo: logo('airalo.com'), emoji: '🌍' },
  { id: 48, category: 'travel', name: 'Airbnb', description: 'Аренда жилья по всему миру', logo: logo('airbnb.com'), emoji: '🏠' },
  { id: 49, category: 'travel', name: 'Booking', description: 'Бронирование отелей и апартаментов', logo: logo('booking.com'), emoji: '🏨' },
  { id: 50, category: 'travel', name: 'Agoda', description: 'Бронирование отелей в Азии и мире', logo: logo('agoda.com'), emoji: '✈️' },
  { id: 51, category: 'travel', name: 'Авиабилеты', description: 'Поиск и бронирование авиабилетов', logo: logo('aviasales.ru'), emoji: '🎫' },

  // Игры / Пополнение кошельков
  { id: 52, category: 'games', name: 'Steam', description: 'Пополнение кошелька Steam', logo: logo('steampowered.com'), emoji: '🎮' },
  { id: 53, category: 'games', name: 'Fortnite', description: 'В-Баксы для Fortnite', logo: logo('fortnite.com'), emoji: '🔫' },
  { id: 54, category: 'games', name: 'PUBG', description: 'UC и Royal Pass для PUBG Mobile', logo: logo('pubg.com'), emoji: '🪖' },
  { id: 55, category: 'games', name: 'Mobile Legends', description: 'Алмазы для Mobile Legends', logo: logo('mobilelegends.com'), emoji: '💎' },
  { id: 56, category: 'games', name: 'Epic Games', description: 'Пополнение кошелька Epic Games', logo: logo('epicgames.com'), emoji: '🕹️' },
];
