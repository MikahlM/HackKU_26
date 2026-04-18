export default function Community() {
  return (
    <div className="grid grid-cols-2">
      <div className="card" style={{ gridColumn: 'span 2' }}>
        <div className="card-header">
          <span className="card-title">Weekly Wellness Leaderboard</span>
          <span className="text-primary" style={{ fontSize: '0.8rem' }}>Ends in 2 days</span>
        </div>
        
        <div className="list-item" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
          <div className="item-icon" style={{ backgroundColor: 'transparent', fontSize: '1.5rem' }}>🥇</div>
          <div className="item-content">
            <div className="item-title">Sarah Jenkins</div>
            <div className="item-desc">Hit all macro goals 5 days in a row</div>
          </div>
          <div className="item-action" style={{ color: 'var(--gold)' }}>2,450 XP</div>
        </div>

        <div className="list-item">
          <div className="item-icon" style={{ backgroundColor: 'transparent', fontSize: '1.5rem' }}>🥈</div>
          <div className="item-content">
            <div className="item-title">Mike Chen</div>
            <div className="item-desc">Logged 15 meals this week</div>
          </div>
          <div className="item-action">1,820 XP</div>
        </div>

        <div className="list-item" style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
          <div className="item-icon" style={{ backgroundColor: 'transparent', fontSize: '1.5rem' }}>4</div>
          <div className="item-content">
            <div className="item-title">Alex Smith (You)</div>
            <div className="item-desc">Perfect hydration streak</div>
          </div>
          <div className="item-action" style={{ color: 'var(--primary)' }}>1,450 XP</div>
        </div>
      </div>
    </div>
  );
}
