import { useParams, useNavigate } from 'react-router-dom';
import { services } from '../data/services';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === Number(id));

  if (!service) {
    return (
      <div className="p-4 text-center text-gray-500 pt-20">
        Услуга не найдена
      </div>
    );
  }

  const handleOrder = () => {
    const text = encodeURIComponent(`Хочу узнать цену и заказать: ${service.name}`);
    window.open(`https://t.me/YOUR_USERNAME?text=${text}`, '_blank');
  };

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 flex items-center gap-1 pt-2"
      >
        ‹ Назад
      </button>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
        <div className="text-6xl mb-4">{service.emoji}</div>
        <h1 className="text-2xl font-bold text-gray-900">{service.name}</h1>
        <div className="text-lg text-blue-500 font-medium mt-2">Цена по запросу</div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-2">Описание</h2>
        <p className="text-gray-600">{service.description}</p>
      </div>

      <button
        onClick={handleOrder}
        className="w-full bg-blue-500 text-white rounded-2xl py-4 font-semibold text-lg active:scale-95 transition-transform"
      >
        Написать для заказа
      </button>
    </div>
  );
}
