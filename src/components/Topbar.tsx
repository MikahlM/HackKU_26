import { Coins, Plus } from 'lucide-react';

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <header className="topbar">
      <h1>{title}</h1>
      <div className="topbar-actions">
        <div className="nutricoins">
          <Coins className="text-gold" size={20} />
          <span>1,250 NC</span>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          <span>Snap Meal</span>
        </button>
      </div>
    </header>
  );
}
