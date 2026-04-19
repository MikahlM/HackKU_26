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

export interface Recipe {
  id: string;
  name: string;
  calories: number;
  protein: number;
  icon: string;
}

export interface UserProfile {
  name: string;
  age: number | '';
  height_ft: number | ''; // feet
  height_in: number | ''; // inches
  weight: number | ''; // lbs
  goal: 'cut' | 'bulk' | 'maintain';
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

  // Custom Recipes
  customRecipes: Recipe[];
  addCustomRecipe: (recipe: Omit<Recipe, 'id'>) => void;

  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Economy
  coins: number;
  addCoins: (amount: number) => void;

  // Derived Percentages (0 to 100)
  waterPercent: number;
  proteinPercent: number;
  caloriesPercent: number;

  // State
  isMonsterDefeated: boolean;

  // Actions
  drinkWater: () => void;
  eatProtein: () => void;
  logProtein: (amount: number) => void;
  logMeal: (meal: keyof Meals) => void;
  logCalories: (amount: number) => void;
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

  // Custom recipes state
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>([]);

  // User profile state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'AwesomeDude',
    age: '',
    height_ft: '',
    height_in: '',
    weight: '',
    goal: 'maintain'
  });

  // Economy state
  const [coins, setCoins] = useState(0);

  // Derived state
  const waterPercent = Math.min(Math.round((waterLogged / goals.water) * 100), 100);
  const proteinPercent = Math.min(Math.round((proteinLogged / goals.protein) * 100), 100);
  const caloriesPercent = Math.min(Math.round((caloriesLogged / goals.calories) * 100), 100);
  const isMonsterDefeated = proteinPercent >= 100;

  const updateGoals = (newGoals: Goals) => {
    setGoals(newGoals);
  };

  const drinkWater = () => {
    setWaterLogged(prev => {
      const next = Math.min(prev + 8, goals.water);
      if (prev < goals.water && next >= goals.water) {
        setCoins(c => c + 50);
      }
      return next;
    });
  };

  const eatProtein = () => {
    setProteinLogged(prev => {
      const next = Math.min(prev + 30, goals.protein);
      if (prev < goals.protein && next >= goals.protein) {
        setCoins(c => c + 50);
      }
      return next;
    });
  };

  const logProtein = (amount: number) => {
    setProteinLogged(prev => {
      const next = Math.min(prev + amount, goals.protein);
      if (prev < goals.protein && next >= goals.protein) {
        setCoins(c => c + 50);
      }
      return next;
    });
  };

  const logMeal = (meal: keyof Meals) => {
    setMealsLogged(prev => {
      if (!prev[meal]) {
        setCoins(c => c + 50);
      }
      return { ...prev, [meal]: true };
    });
  };

  const logCalories = (amount: number) => {
    setCaloriesLogged(prev => {
      const next = Math.min(prev + amount, goals.calories);
      if (prev < goals.calories && next >= goals.calories) {
        setCoins(c => c + 50);
      }
      return next;
    });
  };

  const addCustomRecipe = (recipe: Omit<Recipe, 'id'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString()
    };
    setCustomRecipes(prev => [...prev, newRecipe]);
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  };

  return (
    <RealmContext.Provider value={{
      goals,
      updateGoals,
      waterLogged,
      proteinLogged,
      caloriesLogged,
      mealsLogged,
      customRecipes,
      addCustomRecipe,
      userProfile,
      updateUserProfile,
      coins,
      addCoins: (amount) => setCoins(prev => prev + amount),
      waterPercent,
      proteinPercent,
      caloriesPercent,
      isMonsterDefeated,
      drinkWater,
      eatProtein,
      logProtein,
      logMeal,
      logCalories
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
