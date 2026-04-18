import { useState } from 'react';
import { Camera } from 'lucide-react';

export default function MealLog() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(false);

  const handleUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(true);
    }, 2000);
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card-header">
        <span className="card-title">AI Meal Scanner</span>
      </div>
      
      {!analyzing && !result ? (
        <div className="upload-area" onClick={handleUpload}>
          <Camera className="upload-icon" style={{ animation: 'float 3s ease-in-out infinite' }} />
          <h3>Snap or Upload a Photo</h3>
          <p className="text-muted" style={{ marginTop: '0.5rem' }}>Our AI will automatically detect ingredients and calculate macros.</p>
        </div>
      ) : analyzing ? (
        <div style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Analyzing Image...</div>
          <div className="macro-bar-bg" style={{ width: '50%', margin: '0 auto' }}>
            <div className="macro-bar-fill" style={{ width: '60%', backgroundColor: 'var(--primary)', transition: 'width 2s' }}></div>
          </div>
        </div>
      ) : (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>Grilled Salmon Salad detected!</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>High in protein and healthy fats.</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>420</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>kcal</div>
            </div>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setResult(false)}>
            Log Another Meal
          </button>
        </div>
      )}
    </div>
  );
}
