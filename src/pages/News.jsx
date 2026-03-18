import { news } from '../data/news';

export default function News() {
  return (
    <div>
      <div className="p-4 pt-6 pb-4">
        <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Лента</p>
        <h1 className="text-2xl font-bold text-white">Новости</h1>
      </div>

      <div className="space-y-px">
        {news.map((item) => (
          <div key={item.id} style={{ background: '#1A1A1A', borderBottom: '1px solid #2A2A2A' }}
            className="p-4">
            <div className="flex items-start gap-4">
              <div style={{ background: '#2A2A2A' }}
                className="w-10 h-10 flex items-center justify-center text-xl shrink-0">
                {item.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {item.isNew && (
                    <span style={{ background: '#F5E642', color: '#0D0D0D' }}
                      className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5">
                      NEW
                    </span>
                  )}
                  <span style={{ color: '#888' }} className="text-xs">{item.date}</span>
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                <p style={{ color: '#888' }} className="text-xs leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
