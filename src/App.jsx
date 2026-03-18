import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ServiceDetail from './pages/ServiceDetail';
import Search from './pages/Search';
import News from './pages/News';
import GameReleases from './pages/GameReleases';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/news" element={<News />} />
          <Route path="/games" element={<GameReleases />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
