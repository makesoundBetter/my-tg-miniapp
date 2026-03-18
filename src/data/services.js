export const categories = [
  { id: 'all', name: 'Все' },
  { id: 'ai', name: 'ИИ сервисы' },
  { id: 'social', name: 'Соцсети' },
  { id: 'design', name: 'Дизайн' },
  { id: 'dev', name: 'Разработка' },
  { id: 'travel', name: 'Путешествия' },
  { id: 'games', name: 'Игры' },
];

export const services = [
  // ИИ сервисы
  { id: 1, category: 'ai', name: 'ChatGPT', description: 'Доступ к GPT-4o и другим моделям OpenAI', emoji: '🤖' },
  { id: 2, category: 'ai', name: 'Suno AI', description: 'Генерация музыки с помощью ИИ', emoji: '🎵' },
  { id: 3, category: 'ai', name: 'Midjourney', description: 'Генерация изображений по текстовым запросам', emoji: '🎨' },
  { id: 4, category: 'ai', name: 'Gamma AI', description: 'Создание презентаций с помощью ИИ', emoji: '📊' },
  { id: 5, category: 'ai', name: 'DeepSeek', description: 'Мощная языковая модель для задач анализа', emoji: '🔬' },
  { id: 6, category: 'ai', name: 'Cursor AI', description: 'ИИ-редактор кода с автодополнением', emoji: '💻' },
  { id: 7, category: 'ai', name: 'Krea AI', description: 'Генерация и редактирование изображений в реальном времени', emoji: '🖼️' },
  { id: 8, category: 'ai', name: 'Open API', description: 'Доступ к API OpenAI для разработчиков', emoji: '⚙️' },
  { id: 9, category: 'ai', name: 'Kling AI', description: 'Генерация видео с помощью ИИ', emoji: '🎬' },
  { id: 10, category: 'ai', name: 'Claude', description: 'ИИ-ассистент от Anthropic', emoji: '✨' },
  { id: 11, category: 'ai', name: 'Freepik', description: 'ИИ-генерация изображений и графики', emoji: '🖌️' },
  { id: 12, category: 'ai', name: 'Runway AI', description: 'Генерация и редактирование видео с ИИ', emoji: '🎞️' },
  { id: 13, category: 'ai', name: 'ElevenLabs', description: 'Синтез голоса и клонирование с помощью ИИ', emoji: '🎙️' },
  { id: 14, category: 'ai', name: 'Higgsfield AI', description: 'Создание видео и аватаров с ИИ', emoji: '🤳' },
  { id: 15, category: 'ai', name: 'Candy AI', description: 'ИИ-компаньон и генерация персонажей', emoji: '🍬' },
  { id: 16, category: 'ai', name: 'Lensa AI', description: 'ИИ-редактор фото и аватаров', emoji: '📸' },
  { id: 17, category: 'ai', name: 'Google Gemini', description: 'Мультимодальный ИИ от Google', emoji: '💎' },
  { id: 18, category: 'ai', name: 'Perplexity AI', description: 'ИИ-поисковик с актуальными данными', emoji: '🔍' },
  { id: 19, category: 'ai', name: 'NanoBanana', description: 'ИИ-инструменты для контента', emoji: '🍌' },
  { id: 20, category: 'ai', name: 'Grok AI', description: 'ИИ-ассистент от xAI (Илон Маск)', emoji: '🚀' },

  // Социальные сети / контент
  { id: 21, category: 'social', name: 'TikTok', description: 'Монетизация и продвижение в TikTok', emoji: '📱' },
  { id: 22, category: 'social', name: 'Patreon', description: 'Подписки и поддержка авторов', emoji: '🎭' },
  { id: 23, category: 'social', name: 'OnlyFans', description: 'Платформа для эксклюзивного контента', emoji: '⭐' },
  { id: 24, category: 'social', name: 'Faceit', description: 'Игровая платформа и турниры', emoji: '🏆' },
  { id: 25, category: 'social', name: 'YouTube Premium', description: 'YouTube без рекламы + YouTube Music', emoji: '▶️' },
  { id: 26, category: 'social', name: 'Twitch', description: 'Подписки и поддержка стримеров', emoji: '💜' },
  { id: 27, category: 'social', name: 'Keta', description: 'Платформа для авторов контента', emoji: '🎪' },
  { id: 28, category: 'social', name: 'Discord', description: 'Нитро и буст серверов Discord', emoji: '🎮' },
  { id: 29, category: 'social', name: 'Pixiv / Fanbox', description: 'Поддержка художников и авторов', emoji: '🖼️' },
  { id: 30, category: 'social', name: 'Ko-fi', description: 'Поддержка авторов и донаты', emoji: '☕' },
  { id: 31, category: 'social', name: 'Boosty', description: 'Российская платформа для авторов', emoji: '🚀' },
  { id: 32, category: 'social', name: 'Makeship', description: 'Создание и продажа мерча', emoji: '👕' },
  { id: 33, category: 'social', name: 'Gumroad', description: 'Продажа цифровых товаров и курсов', emoji: '💾' },

  // Дизайн / Графика
  { id: 34, category: 'design', name: 'Canva', description: 'Онлайн-редактор для дизайна и графики', emoji: '🎨' },
  { id: 35, category: 'design', name: 'Figma', description: 'Профессиональный инструмент UI/UX дизайна', emoji: '✏️' },
  { id: 36, category: 'design', name: 'CapCut', description: 'Видеоредактор для контента и Reels', emoji: '🎬' },
  { id: 37, category: 'design', name: 'Adobe', description: 'Photoshop, Illustrator, Premiere и другие', emoji: '🔴' },
  { id: 38, category: 'design', name: 'Fotor', description: 'Онлайн-редактор фото и дизайна', emoji: '📷' },

  // Разработка / Профессиональный софт
  { id: 39, category: 'dev', name: 'Hetzner', description: 'Облачные серверы и хостинг', emoji: '🖥️' },
  { id: 40, category: 'dev', name: 'Javarush', description: 'Обучение Java-разработке онлайн', emoji: '☕' },
  { id: 41, category: 'dev', name: 'TradingView', description: 'Профессиональные графики и аналитика рынков', emoji: '📈' },
  { id: 42, category: 'dev', name: 'iMazing', description: 'Управление iPhone и iPad с компьютера', emoji: '📱' },
  { id: 43, category: 'dev', name: 'JetBrains', description: 'IDE для разработчиков (IntelliJ, PyCharm и др.)', emoji: '💡' },
  { id: 44, category: 'dev', name: 'Obsidian', description: 'База знаний и заметки с плагинами', emoji: '📝' },
  { id: 45, category: 'dev', name: 'Xsolla', description: 'Платёжная платформа для игр', emoji: '💳' },
  { id: 46, category: 'dev', name: 'Exaroton', description: 'Хостинг для серверов Minecraft', emoji: '⛏️' },

  // Путешествия / eSIM
  { id: 47, category: 'travel', name: 'Airalo', description: 'eSIM для путешествий по всему миру', emoji: '🌍' },
  { id: 48, category: 'travel', name: 'Airbnb', description: 'Аренда жилья по всему миру', emoji: '🏠' },
  { id: 49, category: 'travel', name: 'Booking', description: 'Бронирование отелей и апартаментов', emoji: '🏨' },
  { id: 50, category: 'travel', name: 'Agoda', description: 'Бронирование отелей в Азии и мире', emoji: '✈️' },
  { id: 51, category: 'travel', name: 'Авиабилеты', description: 'Поиск и бронирование авиабилетов', emoji: '🎫' },

  // Игры / Пополнение кошельков
  { id: 52, category: 'games', name: 'Steam', description: 'Пополнение кошелька Steam', emoji: '🎮' },
  { id: 53, category: 'games', name: 'Fortnite', description: 'В-Баксы для Fortnite', emoji: '🔫' },
  { id: 54, category: 'games', name: 'PUBG', description: 'UC и Royal Pass для PUBG Mobile', emoji: '🪖' },
  { id: 55, category: 'games', name: 'Mobile Legends', description: 'Алмазы для Mobile Legends', emoji: '💎' },
  { id: 56, category: 'games', name: 'Epic Games', description: 'Пополнение кошелька Epic Games', emoji: '🕹️' },
];
