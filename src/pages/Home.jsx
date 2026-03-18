import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-4 pt-6">
      <h1 className="text-3xl font-bold text-white">
        Добро пожаловать
      </h1>
    </div>
  );
}
