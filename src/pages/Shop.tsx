
export default function Shop() {
  return (
    <div className="grid grid-cols-3">
      <div className="card">
        <div className="card-header">
          <span className="card-title">Sick tree</span>
          <span className="coins" style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}>100 C</span>
        </div>
        <div style={{ height: '100px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px dashed var(--primary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1rem' }}>🌲</div>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Buy</button>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Cool House</span>
          <span className="coins" style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}>200 C</span>
        </div>
        <div style={{ height: '100px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px dashed var(--primary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1rem' }}>🏠</div>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Buy</button>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">another house</span>
          <span className="coins" style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}>300 C</span>
        </div>
        <div style={{ height: '100px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px dashed var(--primary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Buy</button>
      </div>
    </div>
  );
}
