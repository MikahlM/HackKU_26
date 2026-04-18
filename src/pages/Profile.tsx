import React, { useState } from 'react';
import { useRealm } from '../context/RealmContext';
import { User, Activity, Dumbbell } from 'lucide-react';
import catpic from '../assets/cat.jpg';

export default function Profile() {
  const { userProfile, updateUserProfile } = useRealm();
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: userProfile.name,
    age: userProfile.age,
    height_ft: userProfile.height_ft,
    height_in: userProfile.height_in,
    weight: userProfile.weight,
    goal: userProfile.goal
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'goal' ? value : (value === '' ? '' : Number(value))
    }));
  };

  const handleSave = () => {
    updateUserProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Profile Section */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
        <img 
          src={catpic} 
          alt="Profile Avatar" 
          style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--accent)' }} 
        />
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>
            {formData.name || 'Your Name'}
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} /> Level 0 Adventurer
          </p>
        </div>
      </div>

      {/* Stats Form */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="card-header" style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User className="text-secondary" />
            Personal Details
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)', fontSize: '1.1rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Years"
              style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)', fontSize: '1.1rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Weight (lbs)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="lbs"
              style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)', fontSize: '1.1rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Height (ft)</label>
              <input
                type="number"
                name="height_ft"
                value={formData.height_ft}
                onChange={handleChange}
                placeholder="ft"
                style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)', fontSize: '1.1rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Height (in)</label>
              <input
                type="number"
                name="height_in"
                value={formData.height_in}
                onChange={handleChange}
                placeholder="in"
                style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)', fontSize: '1.1rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Current Goal</label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)', fontSize: '1.1rem', appearance: 'none', outline: 'none', cursor: 'pointer' }}
            >
              <option value="maintain" style={{ color: 'black' }}>Maintain Weight</option>
              <option value="cut" style={{ color: 'black' }}>Cut (Lose Fat)</option>
              <option value="bulk" style={{ color: 'black' }}>Bulk (Gain Muscle)</option>
            </select>
          </div>

        </div>

        <button
          className="btn"
          onClick={handleSave}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            backgroundColor: isSaved ? 'rgba(16, 185, 129, 0.2)' : 'var(--primary)',
            color: isSaved ? 'var(--primary)' : 'white',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            marginTop: 'auto'
          }}
        >
          <Dumbbell size={20} style={{ marginRight: '0.5rem' }} />
          {isSaved ? 'Profile Saved Successfully!' : 'Save Profile'}
        </button>

      </div>
    </div>
  );
}
