import { news } from '../data/news';

export default function News() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-gray-900 pt-2">Новости и новинки</h1>

      <div className="space-y-3">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{item.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  {item.isNew && (
                    <span className="shrink-0 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                      Новое
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-xs text-gray-400 mt-2">{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
