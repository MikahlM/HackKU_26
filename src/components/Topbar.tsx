import { Bitcoin } from 'lucide-react';

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <header className="topbar">
      <h1>{title}</h1>
      <div className="topbar-actions">
        <div className="coins">
          <Bitcoin className="text-gold" size={20} />
          <span>0 C</span>
        </div>
      </div>
    </header>
  );
}
