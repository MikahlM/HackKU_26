import { ShieldAlert } from 'lucide-react';
import { useRealm } from '../context/RealmContext';

// Import all map states
import townMapOg from '../assets/town_drawing_og.png';
import townMapBreakfast from '../assets/town_drawing_breakfast.png';
import townMapLunch from '../assets/town_drawing_lunch.png';
import townMapDinner from '../assets/town_drawing_dinner.png';
import townMapComplete from '../assets/town_drawing.png';

export default function Realm() {
  const { waterPercent, proteinPercent, caloriesPercent, isMonsterDefeated, mealsLogged } = useRealm();

  const fogOpacity = Math.max(0, 1 - (waterPercent / 100));
  const fogBlur = Math.max(0, (100 - waterPercent) / 40);

  // Determine current map based on logged meals and calories
  let currentMap = townMapOg;
  if (caloriesPercent >= 100) {
    currentMap = townMapComplete;
  } else if (mealsLogged.dinner) {
    currentMap = townMapDinner;
  } else if (mealsLogged.lunch) {
    currentMap = townMapLunch;
  } else if (mealsLogged.breakfast) {
    currentMap = townMapBreakfast;
  }

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative', minHeight: 'calc(100vh - 120px)' }}>
      {/* MAP BACKGROUND */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${currentMap})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out',
        zIndex: 1
      }}></div>

      {/* FOG OVERLAY */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(255, 50, 0, 0.65)',
        backdropFilter: `blur(${fogBlur}px)`,
        opacity: fogOpacity,
        transition: 'all 1s ease-in-out',
        zIndex: 5,
        pointerEvents: 'none'
      }}></div>

      {/* FIRE THREAT ON MAP */}
      {waterPercent < 100 ? (
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '20%',
          zIndex: 15,
          animation: 'float 2.5s ease-in-out infinite',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -10, background: 'radial-gradient(circle, rgba(249, 115, 22, 0.6) 0%, transparent 70%)', filter: 'blur(10px)', opacity: 0.8 + ((100 - waterPercent) / 100) }}></div>
            <span style={{ fontSize: '5rem', filter: 'drop-shadow(0 0 15px rgba(249, 115, 22, 0.9))', position: 'relative', zIndex: 2 }}>🔥</span>
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', marginTop: '1rem', border: '1px solid rgba(249, 115, 22, 0.5)', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fdba74', backdropFilter: 'blur(4px)' }}>
            <ShieldAlert size={16} />
            Fire Threat
          </div>
          <div style={{ width: '120px', height: '6px', backgroundColor: 'rgba(255,255,255,0.2)', marginTop: '8px', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${100 - waterPercent}%`, height: '100%', backgroundColor: '#f97316', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>
      ) : (
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '20%',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'fadeIn 1s ease forwards'
        }}>
          <span style={{ fontSize: '4rem', opacity: 0.4, filter: 'grayscale(100%)' }}>💧</span>
          <div style={{ background: 'rgba(56, 189, 248, 0.2)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', marginTop: '1rem', color: 'var(--secondary)', border: '1px solid rgba(56, 189, 248, 0.4)', backdropFilter: 'blur(4px)' }}>
            Fire Extinguished
          </div>
        </div>
      )}

      {/* MONSTER THREAT ON MAP */}
      {!isMonsterDefeated ? (
        <div style={{
          position: 'absolute',
          top: '25%',
          right: '20%',
          zIndex: 15,
          animation: 'float 2s ease-in-out infinite',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -10, background: 'radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, transparent 70%)', filter: 'blur(10px)', opacity: 0.8 + (proteinPercent / 100) }}></div>
            <span style={{ fontSize: '5rem', filter: 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.9))', position: 'relative', zIndex: 2 }}>🐉</span>
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', marginTop: '1rem', border: '1px solid rgba(239, 68, 68, 0.5)', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fca5a5', backdropFilter: 'blur(4px)' }}>
            <ShieldAlert size={16} />
            Town Threat
          </div>
          <div style={{ width: '120px', height: '6px', backgroundColor: 'rgba(255,255,255,0.2)', marginTop: '8px', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${100 - proteinPercent}%`, height: '100%', backgroundColor: '#ef4444', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>
      ) : (
        <div style={{
          position: 'absolute',
          top: '25%',
          right: '20%',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'fadeIn 1s ease forwards'
        }}>
          <span style={{ fontSize: '4rem', opacity: 0.4, filter: 'grayscale(100%)' }}>☠️</span>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', marginTop: '1rem', color: 'var(--primary)', border: '1px solid rgba(16, 185, 129, 0.4)', backdropFilter: 'blur(4px)' }}>
            Town Secured
          </div>
        </div>
      )}

      {/* PLAYER AVATAR ON MAP */}
      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '20%', // Since sidebar is gone, center it more
        zIndex: 15,
        animation: 'float 3s ease-in-out infinite',
      }}>
        <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--secondary)', borderRadius: '50%', border: '3px solid white', boxShadow: '0 0 20px var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
          🧙‍♂️
        </div>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', color: 'white', marginTop: '0.5rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
          You
        </div>
      </div>
    </div>
  );
}
