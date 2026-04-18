import React, { useState } from 'react';
import { useRealm } from '../context/RealmContext';
import { Target, Droplets, Beef, Flame } from 'lucide-react';

export default function Planner() {
  const { goals, updateGoals } = useRealm();
  const [isSaved, setIsSaved] = useState(false);

  const [formGoals, setFormGoals] = useState({
    water: goals.water,
    protein: goals.protein,
    calories: goals.calories,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormGoals({
      ...formGoals,
      [e.target.name]: Number(e.target.value) || 0
    });
  };

  const handleSave = () => {
    updateGoals(formGoals);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card-header" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target className="text-accent" />
          Custom Macro Goals
        </h2>
      </div>

      <p className="text-muted" style={{ marginBottom: '2rem' }}>
        Configure your daily targets here. Your progress on the Dashboard and your success in the Digital Realm are directly tied to these values.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Water Goal Input */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--secondary)' }}>
            <Droplets size={18} /> Daily Water Goal (oz)
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              name="water"
              value={formGoals.water}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-main)',
                fontSize: '1.1rem'
              }}
            />
          </div>
        </div>

        {/* Protein Goal Input */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary)' }}>
            <Beef size={18} /> Daily Protein Goal (g)
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              name="protein"
              value={formGoals.protein}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-main)',
                fontSize: '1.1rem'
              }}
            />
          </div>
        </div>

        {/* Calories Goal Input */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--accent)' }}>
            <Flame size={18} /> Daily Calories Target (kcal)
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              name="calories"
              value={formGoals.calories}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-main)',
                fontSize: '1.1rem'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <button
          className="btn"
          onClick={handleSave}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            backgroundColor: isSaved ? 'rgba(16, 185, 129, 0.2)' : 'var(--accent)',
            color: isSaved ? 'var(--primary)' : 'white',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          {isSaved ? 'Goals Saved Successfully!' : 'Save Custom Goals'}
        </button>
      </div>
    </div>
  );
}
