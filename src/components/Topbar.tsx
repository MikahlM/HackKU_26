import { Bitcoin } from 'lucide-react';
import { useRealm } from '../context/RealmContext';

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  const { coins } = useRealm();

  return (
    <header className="topbar">
      <h1>{title}</h1>
      <div className="topbar-actions">
        <div className="coins">
          <Bitcoin className="text-gold" size={20} />
          <span>{coins.toLocaleString()} C</span>
        </div>
      </div>
    </header>
  );
}
