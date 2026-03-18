import { games } from '../data/games';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getDaysLeft(dateStr) {
  const today = new Date();
  const release = new Date(dateStr);
  const diff = Math.ceil((release - today) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'Вышла';
  if (diff === 0) return 'Сегодня';
  return `${diff} дн.`;
}

export default function GameReleases() {
  const sorted = [...games].sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

  return (
    <div>
      <div className="p-4 pt-6 pb-4">
        <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Календарь</p>
        <h1 className="text-2xl font-bold text-white">Релизы игр</h1>
      </div>

      <div className="space-y-px">
        {sorted.map((game) => (
          <div key={game.id} style={{ background: '#1A1A1A', borderBottom: '1px solid #2A2A2A' }}
            className="p-4 flex items-center gap-4">
            <div style={{ background: '#2A2A2A' }}
              className="w-11 h-11 flex items-center justify-center text-xl shrink-0">
              {game.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-white text-sm truncate">{game.name}</h3>
                {!game.isConfirmed && (
                  <span style={{ border: '1px solid #F5E642', color: '#F5E642' }}
                    className="text-[9px] px-1.5 py-0.5 shrink-0 uppercase tracking-wider">
                    Слух
                  </span>
                )}
              </div>
              <p style={{ color: '#888' }} className="text-xs">{game.platform}</p>
            </div>
            <div className="text-right shrink-0">
              <div style={{ color: '#F5E642' }} className="text-sm font-bold">{getDaysLeft(game.releaseDate)}</div>
              <div style={{ color: '#888' }} className="text-xs">{formatDate(game.releaseDate)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
