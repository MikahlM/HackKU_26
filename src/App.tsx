import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import MealLog from './pages/MealLog';
import Planner from './pages/Planner';
import Community from './pages/Community';
import Realm from './pages/Realm';
import Shop from './pages/Shop';
import { RealmProvider } from './context/RealmContext';

function MainLayout() {
  const location = useLocation();
  
  // Map routes to titles for Topbar
  const titles: Record<string, string> = {
    '/': 'Dashboard & Quests',
    '/log': 'Meal Log',
    '/planner': 'Meal Planner',
    '/community': 'Community Feed',
    '/realm': 'Digital Realm Map',
    '/shop': 'NutriShop',
  };
  
  const currentTitle = titles[location.pathname] || 'NutriSnap';

  return (
    <>
      <Sidebar />
      <main className="main-content">
        <Topbar title={currentTitle} />
        <div id="page-content" className="content-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/log" element={<MealLog />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/community" element={<Community />} />
            <Route path="/realm" element={<Realm />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default function App() {
  return (
    <RealmProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </RealmProvider>
  );
}
