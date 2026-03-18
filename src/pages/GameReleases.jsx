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
  if (diff === 0) return 'Сегодня!';
  return `через ${diff} дн.`;
}

export default function GameReleases() {
  const sorted = [...games].sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-gray-900 pt-2">Релизы игр</h1>

      <div className="space-y-3">
        {sorted.map((game) => (
          <div key={game.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="text-3xl w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl">
                {game.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{game.name}</h3>
                  {!game.isConfirmed && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                      Слух
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{game.platform}</p>
                <p className="text-sm text-gray-400">{game.genre}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-blue-500 text-sm">{getDaysLeft(game.releaseDate)}</div>
                <div className="text-xs text-gray-400">{formatDate(game.releaseDate)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
