import { useNavigate } from 'react-router-dom';

export default function ServiceCard({ service }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/service/${service.id}`)}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer active:scale-95 transition-transform"
    >
      <div className="text-3xl w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl shrink-0">
        {service.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{service.name}</h3>
        <p className="text-sm text-gray-500 truncate">{service.description}</p>
      </div>
      <span className="text-gray-400 shrink-0">›</span>
    </div>
  );
}
