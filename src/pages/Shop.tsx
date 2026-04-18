
export default function Shop() {
  return (
    <div className="grid grid-cols-3">
      <div className="card">
        <div className="card-header">
          <span className="card-title">Cyber Theme</span>
          <span className="nutricoins" style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}>500 NC</span>
        </div>
        <div style={{ height: '100px', background: 'linear-gradient(45deg, #ff007f, #7928ca)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}></div>
        <button className="btn" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', justifyContent: 'center' }}>Unlock Theme</button>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Pro Recipe Pack</span>
          <span className="nutricoins" style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}>1,200 NC</span>
        </div>
        <div style={{ height: '100px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px dashed var(--primary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1rem' }}>🥗</div>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Buy Now</button>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Dragon Avatar</span>
          <span className="nutricoins" style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}>3,000 NC</span>
        </div>
        <div style={{ height: '100px', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', marginBottom: '1rem' }}>🐉</div>
        <button className="btn" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', justifyContent: 'center', opacity: 0.5 }}>Not Enough Coins</button>
      </div>
    </div>
  );
}
