import { NavLink } from 'react-router-dom';
import { PieChart, Utensils, Calendar, Gamepad2, Store, Leaf } from 'lucide-react';
import { useRealm } from '../context/RealmContext';
import catpic from '../assets/cat.jpg';

export default function Sidebar() {
  const { userProfile } = useRealm();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: PieChart },
    { path: '/log', label: 'Meal Log', icon: Utensils },
    { path: '/planner', label: 'Planner', icon: Calendar },
    { path: '/realm', label: 'Town', icon: Gamepad2 },
    { path: '/shop', label: 'Shop', icon: Store },
  ];

  return (
    <nav className="sidebar">
      <div className="logo">
        <Leaf className="text-primary" size={28} />
        <span>MealQuest</span>
      </div>

      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <NavLink to="/profile" className="user-profile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(255,255,255,0.05)', transition: 'background-color 0.2s ease', cursor: 'pointer', marginTop: 'auto' }}>
        <img src={catpic} alt="Profile" className="avatar" />
        <div className="user-info">
          <span className="user-name" style={{ fontSize: '1rem', fontWeight: 'bold' }}>{userProfile.name || 'Set Profile'}</span>

        </div>
      </NavLink>
    </nav>
  );
}
