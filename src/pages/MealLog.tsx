import React, { useState } from 'react';
import { useRealm, type Recipe } from '../context/RealmContext';
import { BookOpen, PlusCircle, Bookmark, Check } from 'lucide-react';

const PRE_MADE_RECIPES: Omit<Recipe, 'id'>[] = [
  { name: 'Avocado Toast & Eggs', calories: 450, protein: 22, icon: '🥑' },
  { name: 'Grilled Chicken Bowl', calories: 520, protein: 45, icon: '🥗' },
  { name: 'Salmon & Asparagus', calories: 480, protein: 38, icon: '🐟' },
  { name: 'Protein Oatmeal', calories: 350, protein: 28, icon: '🥣' },
  { name: 'Steak & Sweet Potato', calories: 650, protein: 55, icon: '🥩' },
  { name: 'Greek Yogurt Parfait', calories: 280, protein: 20, icon: '🍯' },
];

export default function MealLog() {
  const { customRecipes, addCustomRecipe, logCalories, logProtein } = useRealm();
  const [activeTab, setActiveTab] = useState<'premade' | 'myrecipes' | 'create'>('premade');
  
  // Form State
  const [formName, setFormName] = useState('');
  const [formCalories, setFormCalories] = useState('');
  const [formProtein, setFormProtein] = useState('');
  const [formIcon, setFormIcon] = useState('🍲');

  const [loggedRecipeName, setLoggedRecipeName] = useState<string | null>(null);

  const handleLog = (recipeName: string, calories: number, protein: number) => {
    logCalories(calories);
    logProtein(protein);
    setLoggedRecipeName(recipeName);
    setTimeout(() => setLoggedRecipeName(null), 2000);
  };

  const handleCreateRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formCalories || !formProtein) return;

    addCustomRecipe({
      name: formName,
      calories: parseInt(formCalories, 10),
      protein: parseInt(formProtein, 10),
      icon: formIcon
    });

    setFormName('');
    setFormCalories('');
    setFormProtein('');
    setActiveTab('myrecipes');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        <button 
          onClick={() => setActiveTab('premade')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'none', border: 'none', color: activeTab === 'premade' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: activeTab === 'premade' ? '2px solid var(--primary)' : '2px solid transparent', fontWeight: activeTab === 'premade' ? 600 : 400, cursor: 'pointer', transition: 'all 0.3s ease' }}
        >
          <BookOpen size={18} /> Built-in Recipes
        </button>
        <button 
          onClick={() => setActiveTab('myrecipes')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'none', border: 'none', color: activeTab === 'myrecipes' ? 'var(--secondary)' : 'var(--text-muted)', borderBottom: activeTab === 'myrecipes' ? '2px solid var(--secondary)' : '2px solid transparent', fontWeight: activeTab === 'myrecipes' ? 600 : 400, cursor: 'pointer', transition: 'all 0.3s ease' }}
        >
          <Bookmark size={18} /> My Recipes
        </button>
        <button 
          onClick={() => setActiveTab('create')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'none', border: 'none', color: activeTab === 'create' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: activeTab === 'create' ? '2px solid var(--accent)' : '2px solid transparent', fontWeight: activeTab === 'create' ? 600 : 400, cursor: 'pointer', transition: 'all 0.3s ease' }}
        >
          <PlusCircle size={18} /> Create Recipe
        </button>
      </div>

      {/* Premade Recipes Tab */}
      {activeTab === 'premade' && (
        <div className="grid grid-cols-2">
          {PRE_MADE_RECIPES.map((recipe, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)' }}>
                  {recipe.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{recipe.name}</h3>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    <span style={{ color: 'var(--accent)' }}>{recipe.calories} kcal</span>
                    <span style={{ color: 'var(--primary)' }}>{recipe.protein}g protein</span>
                  </div>
                </div>
              </div>
              <button 
                className="btn" 
                onClick={() => handleLog(recipe.name, recipe.calories, recipe.protein)}
                style={{ 
                  width: '100%', 
                  justifyContent: 'center', 
                  backgroundColor: loggedRecipeName === recipe.name ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)',
                  color: loggedRecipeName === recipe.name ? 'var(--primary)' : 'white'
                }}
              >
                {loggedRecipeName === recipe.name ? <><Check size={18} /> Logged!</> : 'Log It!'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* My Recipes Tab */}
      {activeTab === 'myrecipes' && (
        <div className="grid grid-cols-2">
          {customRecipes.length === 0 ? (
            <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              <Bookmark size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.2 }} />
              <h3>No Custom Recipes Yet</h3>
              <p>Create your own recipes in the "Create Recipe" tab!</p>
            </div>
          ) : (
            customRecipes.map((recipe) => (
              <div key={recipe.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '2rem', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(56, 189, 248, 0.1)', borderRadius: 'var(--radius-md)' }}>
                    {recipe.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{recipe.name}</h3>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      <span style={{ color: 'var(--accent)' }}>{recipe.calories} kcal</span>
                      <span style={{ color: 'var(--primary)' }}>{recipe.protein}g protein</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="btn" 
                  onClick={() => handleLog(recipe.name, recipe.calories, recipe.protein)}
                  style={{ 
                    width: '100%', 
                    justifyContent: 'center', 
                    backgroundColor: loggedRecipeName === recipe.name ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.15)',
                    color: loggedRecipeName === recipe.name ? 'var(--primary)' : 'var(--secondary)'
                  }}
                >
                  {loggedRecipeName === recipe.name ? <><Check size={18} /> Logged!</> : 'Log It!'}
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Create Recipe Tab */}
      {activeTab === 'create' && (
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto', width: '100%', border: '1px solid rgba(245, 158, 11, 0.3)', backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlusCircle /> Design a Recipe
          </h2>
          <form onSubmit={handleCreateRecipe} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>Recipe Name</label>
              <input 
                type="text" 
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Grandma's Lasagna"
                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)', color: 'white' }}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--accent)' }}>Calories (kcal)</label>
                <input 
                  type="number" 
                  value={formCalories}
                  onChange={(e) => setFormCalories(e.target.value)}
                  placeholder="0"
                  style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)', color: 'white' }}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--primary)' }}>Protein (g)</label>
                <input 
                  type="number" 
                  value={formProtein}
                  onChange={(e) => setFormProtein(e.target.value)}
                  placeholder="0"
                  style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)', color: 'white' }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>Icon Emoji</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['🍲', '🥩', '🥗', '🍝', '🍕', '🌮', '🍣', '🍰'].map(emoji => (
                  <button 
                    key={emoji}
                    type="button"
                    onClick={() => setFormIcon(emoji)}
                    style={{ 
                      fontSize: '1.5rem', 
                      padding: '0.5rem', 
                      background: formIcon === emoji ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                      border: formIcon === emoji ? '1px solid var(--accent)' : '1px solid transparent',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer'
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn" style={{ width: '100%', padding: '1rem', justifyContent: 'center', backgroundColor: 'var(--accent)', color: 'white', fontSize: '1.1rem', marginTop: '1rem' }}>
              Save Recipe
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
