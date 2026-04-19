import { useState } from 'react';
import { useRealm } from '../context/RealmContext';
import { Droplets, Beef, Sparkles, CheckSquare, Square, Utensils, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const {
    goals,
    waterLogged,
    proteinLogged,
    caloriesLogged,
    waterPercent,
    proteinPercent,
    caloriesPercent,
    mealsLogged,
    drinkWater,
    logProtein,
    logMeal,
    logCalories
  } = useRealm();

  const navigate = useNavigate();
  const [calorieInput, setCalorieInput] = useState('');
  const [proteinInput, setProteinInput] = useState('');

  const handleLogCalories = () => {
    const amount = parseInt(calorieInput, 10);
    if (!isNaN(amount) && amount > 0) {
      logCalories(amount);
      setCalorieInput('');
    }
  };

  const handleLogProtein = () => {
    const amount = parseInt(proteinInput, 10);
    if (!isNaN(amount) && amount > 0) {
      logProtein(amount);
      setProteinInput('');
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div style={{ gridColumn: 'span 2', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Daily Quests</h2>
        <p className="text-muted">Complete your daily quests to save your town.</p>
      </div>

      {/* Quest 1: Water */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Droplets size={24} className="text-secondary" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Hydration Quest</h3>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>Put out the fire</p>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
            <span>Progress</span>
            <span className="text-secondary">{waterLogged} / {goals.water} oz</span>
          </div>
          <div className="macro-bar-bg" style={{ height: '12px' }}>
            <div className="macro-bar-fill" style={{ width: `${waterPercent}%`, backgroundColor: 'var(--secondary)', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>

        <button
          className="btn"
          onClick={drinkWater}
          disabled={waterPercent === 100}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            backgroundColor: waterPercent === 100 ? 'rgba(255,255,255,0.05)' : 'rgba(99, 102, 241, 0.15)',
            color: waterPercent === 100 ? 'var(--text-muted)' : 'var(--secondary)',
            border: waterPercent === 100 ? 'none' : '1px solid rgba(99, 102, 241, 0.4)',
            justifyContent: 'center',
            cursor: waterPercent === 100 ? 'default' : 'pointer'
          }}
        >
          {waterPercent === 100 ? 'Quest Complete: Fog Cleared!' : 'Log Water (+8oz)'}
        </button>
      </div>

      {/* Quest 2: Protein */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Beef size={24} className="text-primary" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Protein Power</h3>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>Defeat the monster threat</p>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
            <span>Progress</span>
            <span className="text-primary">{proteinLogged} / {goals.protein} g</span>
          </div>
          <div className="macro-bar-bg" style={{ height: '12px' }}>
            <div className="macro-bar-fill" style={{ width: `${proteinPercent}%`, backgroundColor: 'var(--primary)', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="number"
            value={proteinInput}
            onChange={(e) => setProteinInput(e.target.value)}
            placeholder="e.g. 30"
            disabled={proteinPercent >= 100}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-md)',
              color: 'white',
              fontSize: '1.1rem'
            }}
          />
          <button
            className="btn"
            onClick={handleLogProtein}
            disabled={proteinPercent >= 100 || !proteinInput}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              backgroundColor: proteinPercent >= 100 ? 'rgba(255,255,255,0.05)' : 'rgba(16, 185, 129, 0.15)',
              color: proteinPercent >= 100 ? 'var(--text-muted)' : 'var(--primary)',
              border: proteinPercent >= 100 ? 'none' : '1px solid rgba(16, 185, 129, 0.4)',
              justifyContent: 'center',
              cursor: proteinPercent >= 100 || !proteinInput ? 'default' : 'pointer',
              opacity: !proteinInput && proteinPercent < 100 ? 0.5 : 1
            }}
          >
            {proteinPercent >= 100 ? 'Threat Neutralized!' : 'Log'}
          </button>
        </div>
      </div>

      {/* Quest 3: Calories */}
      <div className="card" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)', marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(249, 115, 22, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={24} className="text-accent" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Calorie Tracker</h3>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>You got this</p>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
            <span>Progress</span>
            <span className="text-accent">{caloriesLogged} / {goals.calories} kcal</span>
          </div>
          <div className="macro-bar-bg" style={{ height: '12px' }}>
            <div className="macro-bar-fill" style={{ width: `${caloriesPercent}%`, backgroundColor: 'var(--accent)', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="number"
            value={calorieInput}
            onChange={(e) => setCalorieInput(e.target.value)}
            placeholder="e.g. 450"
            disabled={caloriesPercent >= 100}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-md)',
              color: 'white',
              fontSize: '1.1rem'
            }}
          />
          <button
            className="btn"
            onClick={handleLogCalories}
            disabled={caloriesPercent >= 100 || !calorieInput}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              backgroundColor: caloriesPercent >= 100 ? 'rgba(255,255,255,0.05)' : 'rgba(249, 115, 22, 0.15)',
              color: caloriesPercent >= 100 ? 'var(--text-muted)' : 'var(--accent)',
              border: caloriesPercent >= 100 ? 'none' : '1px solid rgba(249, 115, 22, 0.4)',
              justifyContent: 'center',
              cursor: caloriesPercent >= 100 || !calorieInput ? 'default' : 'pointer',
              opacity: !calorieInput && caloriesPercent < 100 ? 0.5 : 1
            }}
          >
            {caloriesPercent >= 100 ? 'Target Reached!' : 'Log'}
          </button>
        </div>
      </div>

      {/* Daily Meals Checklist */}
      <div className="card" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)', marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '0.5rem' }}>
          <Utensils className="text-accent" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Daily Meals Log</h3>
        </div>

        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Log your meals below to progress the time of day in the town!</p>

        {/* Breakfast */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: mealsLogged.breakfast ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', transition: 'all 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem', filter: mealsLogged.breakfast ? 'none' : 'grayscale(100%) opacity(50%)' }}>🍳</span>
            <span style={{ fontWeight: 600, color: mealsLogged.breakfast ? 'var(--primary)' : 'var(--text-main)' }}>Breakfast</span>
          </div>
          <button className="btn" onClick={() => logMeal('breakfast')} disabled={mealsLogged.breakfast} style={{ backgroundColor: mealsLogged.breakfast ? 'transparent' : 'var(--accent)', color: mealsLogged.breakfast ? 'var(--primary)' : 'white' }}>
            {mealsLogged.breakfast ? <><CheckSquare size={18} /> Logged</> : <><Square size={18} /> Log</>}
          </button>
        </div>

        {/* Lunch */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: mealsLogged.lunch ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', transition: 'all 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem', filter: mealsLogged.lunch ? 'none' : 'grayscale(100%) opacity(50%)' }}>🥗</span>
            <span style={{ fontWeight: 600, color: mealsLogged.lunch ? 'var(--primary)' : 'var(--text-main)' }}>Lunch</span>
          </div>
          <button className="btn" onClick={() => logMeal('lunch')} disabled={mealsLogged.lunch || !mealsLogged.breakfast} style={{ backgroundColor: mealsLogged.lunch ? 'transparent' : (!mealsLogged.breakfast ? 'rgba(255,255,255,0.05)' : 'var(--accent)'), color: mealsLogged.lunch ? 'var(--primary)' : (!mealsLogged.breakfast ? 'var(--text-muted)' : 'white') }}>
            {mealsLogged.lunch ? <><CheckSquare size={18} /> Logged</> : <><Square size={18} /> Log</>}
          </button>
        </div>

        {/* Dinner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: mealsLogged.dinner ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', transition: 'all 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem', filter: mealsLogged.dinner ? 'none' : 'grayscale(100%) opacity(50%)' }}>🐟</span>
            <span style={{ fontWeight: 600, color: mealsLogged.dinner ? 'var(--primary)' : 'var(--text-main)' }}>Dinner</span>
          </div>
          <button className="btn" onClick={() => logMeal('dinner')} disabled={mealsLogged.dinner || !mealsLogged.lunch} style={{ backgroundColor: mealsLogged.dinner ? 'transparent' : (!mealsLogged.lunch ? 'rgba(255,255,255,0.05)' : 'var(--accent)'), color: mealsLogged.dinner ? 'var(--primary)' : (!mealsLogged.lunch ? 'var(--text-muted)' : 'white') }}>
            {mealsLogged.dinner ? <><CheckSquare size={18} /> Logged</> : <><Square size={18} /> Log</>}
          </button>
        </div>
      </div>

      {/* Realm Portal */}
      <div className="card" style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', backgroundColor: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} /> View town
          </h3>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Check your town map to see the real-time effects of your logged quests and meals.</p>
        </div>
        <button className="btn" style={{ backgroundColor: 'var(--accent)', color: 'white' }} onClick={() => navigate('/realm')}>
          Enter town
        </button>
      </div>

      {/* Basic Metrics below */}
      <div className="card" style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
        <div className="card-header">
          <span className="card-title">Daily Summary</span>
        </div>
        <div className="grid grid-cols-3" style={{ gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Calories</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{caloriesLogged} / {goals.calories}</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Steps</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>8,240</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Sleep</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>7h 15m</div>
          </div>
        </div>
      </div>
    </div>
  );
}
