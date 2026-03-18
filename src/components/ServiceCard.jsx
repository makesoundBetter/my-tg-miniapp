import { useNavigate } from 'react-router-dom';

export default function ServiceCard({ service }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/service/${service.id}`)}
      style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}
      className="flex items-center gap-4 p-4 cursor-pointer active:scale-95 transition-transform"
    >
      <div style={{ background: '#2A2A2A' }}
        className="w-11 h-11 flex items-center justify-center text-xl shrink-0">
        {service.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white text-sm truncate">{service.name}</h3>
        <p style={{ color: '#888' }} className="text-xs truncate mt-0.5">{service.description}</p>
      </div>
      <span style={{ color: '#F5E642' }} className="text-lg shrink-0">→</span>
    </div>
  );
}
