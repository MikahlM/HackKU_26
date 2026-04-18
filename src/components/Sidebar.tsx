import { NavLink } from 'react-router-dom';
import { PieChart, Utensils, Calendar, Users, Gamepad2, Store, Leaf } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: PieChart },
    { path: '/log', label: 'Meal Log', icon: Utensils },
    { path: '/planner', label: 'Planner', icon: Calendar },
    { path: '/community', label: 'Community', icon: Users },
    { path: '/realm', label: 'Realm', icon: Gamepad2 },
    { path: '/shop', label: 'NutriShop', icon: Store },
  ];

  return (
    <nav className="sidebar">
      <div className="logo">
        <Leaf className="text-primary" size={28} />
        <span>NutriSnap</span>
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

      <div className="user-profile">
        <img src="https://i.pravatar.cc/150?img=68" alt="Profile" className="avatar" />
        <div className="user-info">
          <span className="user-name">AwesomeDude</span>
          <span className="user-level">Lvl 0 (0 XP)</span>
        </div>
      </div>
    </nav>
  );
}
