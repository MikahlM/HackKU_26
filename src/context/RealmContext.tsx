import { createContext, useContext, useState, type ReactNode } from 'react';

interface Goals {
  water: number;
  protein: number;
  calories: number;
}

interface Meals {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

interface RealmContextType {
  // Goals
  goals: Goals;
  updateGoals: (newGoals: Goals) => void;

  // Logged Values
  waterLogged: number;
  proteinLogged: number;
  caloriesLogged: number;
  mealsLogged: Meals;

  // Derived Percentages (0 to 100)
  waterPercent: number;
  proteinPercent: number;

  // State
  isMonsterDefeated: boolean;

  // Actions
  drinkWater: () => void;
  eatProtein: () => void;
  logMeal: (meal: keyof Meals) => void;
}

const RealmContext = createContext<RealmContextType | undefined>(undefined);

export function RealmProvider({ children }: { children: ReactNode }) {
  // Goals
  const [goals, setGoals] = useState<Goals>({
    water: 72, // oz
    protein: 100, // g
    calories: 2400 // kcal
  });

  // Logged amounts
  const [waterLogged, setWaterLogged] = useState(0);
  const [proteinLogged, setProteinLogged] = useState(0);
  const [caloriesLogged, setCaloriesLogged] = useState(0); // Set to 0 to start
  const [mealsLogged, setMealsLogged] = useState<Meals>({
    breakfast: false,
    lunch: false,
    dinner: false
  });

  // Derived state
  const waterPercent = Math.min(Math.round((waterLogged / goals.water) * 100), 100);
  const proteinPercent = Math.min(Math.round((proteinLogged / goals.protein) * 100), 100);
  const isMonsterDefeated = proteinPercent >= 100;

  const updateGoals = (newGoals: Goals) => {
    setGoals(newGoals);
  };

  const drinkWater = () => {
    setWaterLogged(prev => Math.min(prev + 8, goals.water));
  };

  const eatProtein = () => {
    setProteinLogged(prev => Math.min(prev + 30, goals.protein));
  };

  const logMeal = (meal: keyof Meals) => {
    setMealsLogged(prev => ({ ...prev, [meal]: true }));
    // Add some demonstration calories when a meal is logged
    setCaloriesLogged(prev => Math.min(prev + 600, goals.calories));
  };

  return (
    <RealmContext.Provider value={{
      goals,
      updateGoals,
      waterLogged,
      proteinLogged,
      caloriesLogged,
      mealsLogged,
      waterPercent,
      proteinPercent,
      isMonsterDefeated,
      drinkWater,
      eatProtein,
      logMeal
    }}>
      {children}
    </RealmContext.Provider>
  );
}

export function useRealm() {
  const context = useContext(RealmContext);
  if (context === undefined) {
    throw new Error('useRealm must be used within a RealmProvider');
  }
  return context;
}
