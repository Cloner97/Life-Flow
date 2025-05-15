import { useState } from 'react';
import { PiggyBank, Shirt, Utensils, CreditCard, Bus } from 'lucide-react';

export interface BudgetSubcategory {
  id: string;
  name: string;
  percentage: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  percentage: number;
  icon: React.ReactNode;
  color: string;
  subcategories: BudgetSubcategory[];
  type: 'need' | 'want' | 'savings';
}

const COLORS = ['#34d399', '#8b5cf6', '#f97316', '#ec4899', '#06b6d4'];

export function useBudgetCategories() {
  const [categories, setCategories] = useState<BudgetCategory[]>([
    {
      id: '1',
      name: 'پوشاک',
      percentage: 15,
      icon: <Shirt className="h-5 w-5" />,
      color: COLORS[0],
      subcategories: [],
      type: 'need'
    },
    {
      id: '2',
      name: 'خوراک',
      percentage: 30,
      icon: <Utensils className="h-5 w-5" />,
      color: COLORS[1],
      subcategories: [],
      type: 'need'
    },
    {
      id: '3',
      name: 'قسط',
      percentage: 25,
      icon: <CreditCard className="h-5 w-5" />,
      color: COLORS[2],
      subcategories: [],
      type: 'need'
    },
    {
      id: '4',
      name: 'حمل و نقل',
      percentage: 10,
      icon: <Bus className="h-5 w-5" />,
      color: COLORS[3],
      subcategories: [],
      type: 'need'
    },
    {
      id: '5',
      name: 'پس انداز',
      percentage: 20,
      icon: <PiggyBank className="h-5 w-5" />,
      color: COLORS[4],
      subcategories: [],
      type: 'savings'
    }
  ]);

  // Function to create a deep copy of categories without using JSON.stringify/parse
  const deepCopyCategories = (cats: BudgetCategory[]): BudgetCategory[] => {
    return cats.map(cat => ({
      ...cat,
      subcategories: [...cat.subcategories],
      // Don't try to clone the icon React element, just keep the reference
    }));
  };

  const handleCategoryPercentageChange = (categoryId: string, value: number[]) => {
    const newValue = value[0];
    
    // Calculate the difference
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    const diff = newValue - category.percentage;
    
    // If increasing this category, decrease others proportionally
    setCategories(prevCategories => {
      // Create a clean deep copy without using JSON methods
      const newCategories = deepCopyCategories(prevCategories);
      
      if (diff > 0) {
        // Decreasing other categories proportionally
        const otherCategories = newCategories.filter(c => c.id !== categoryId);
        const otherTotalPercentage = otherCategories.reduce((sum, c) => sum + c.percentage, 0);
        
        otherCategories.forEach(c => {
          if (otherTotalPercentage > 0) {
            const decreaseRatio = diff * (c.percentage / otherTotalPercentage);
            c.percentage = Math.max(0, c.percentage - decreaseRatio);
          }
        });
      }
      
      // Update target category
      const targetCategory = newCategories.find(c => c.id === categoryId);
      if (targetCategory) {
        targetCategory.percentage = newValue;
      }
      
      // Normalize to ensure sum is 100
      const totalPercentage = newCategories.reduce((sum, c) => sum + c.percentage, 0);
      if (totalPercentage !== 100) {
        const adjustmentFactor = 100 / totalPercentage;
        newCategories.forEach(c => {
          c.percentage *= adjustmentFactor;
        });
      }
      
      return newCategories;
    });
  };

  const handleSubcategoryPercentageChange = (categoryId: string, subcategoryId: string, value: number[]) => {
    const newValue = value[0];
    
    setCategories(prevCategories => {
      const newCategories = deepCopyCategories(prevCategories);
      const categoryIndex = newCategories.findIndex(c => c.id === categoryId);
      if (categoryIndex === -1) return prevCategories;
      
      const category = newCategories[categoryIndex];
      const subcategory = category.subcategories.find(s => s.id === subcategoryId);
      if (!subcategory) return prevCategories;
      
      const diff = newValue - subcategory.percentage;
      
      if (diff > 0) {
        // Decreasing other subcategories proportionally
        const otherSubcategories = category.subcategories.filter(s => s.id !== subcategoryId);
        const otherTotalPercentage = otherSubcategories.reduce((sum, s) => sum + s.percentage, 0);
        
        otherSubcategories.forEach(s => {
          if (otherTotalPercentage > 0) {
            const decreaseRatio = diff * (s.percentage / otherTotalPercentage);
            s.percentage = Math.max(0, s.percentage - decreaseRatio);
          }
        });
      }
      
      // Update target subcategory
      subcategory.percentage = newValue;
      
      // Normalize to ensure sum is 100
      const totalSubPercentage = category.subcategories.reduce((sum, s) => sum + s.percentage, 0);
      if (totalSubPercentage !== 100) {
        const adjustmentFactor = 100 / totalSubPercentage;
        category.subcategories.forEach(s => {
          s.percentage *= adjustmentFactor;
        });
      }
      
      return newCategories;
    });
  };

  const addSubcategory = (categoryId: string, name: string) => {
    if (!name.trim()) {
      return false;
    }

    setCategories(prevCategories => {
      const newCategories = deepCopyCategories(prevCategories);
      const categoryIndex = newCategories.findIndex(c => c.id === categoryId);
      if (categoryIndex === -1) return prevCategories;
      
      const category = newCategories[categoryIndex];
      
      // Adjust percentages for existing subcategories
      const existingCount = category.subcategories.length;
      if (existingCount > 0) {
        const newPercentage = 100 / (existingCount + 1);
        category.subcategories.forEach(s => {
          s.percentage = newPercentage;
        });
      }
      
      // Add new subcategory
      category.subcategories.push({
        id: `${categoryId}-${Date.now()}`,
        name: name,
        percentage: existingCount > 0 ? 100 / (existingCount + 1) : 100
      });
      
      return newCategories;
    });
    
    return true;
  };

  const removeSubcategory = (categoryId: string, subcategoryId: string) => {
    setCategories(prevCategories => {
      const newCategories = deepCopyCategories(prevCategories);
      const categoryIndex = newCategories.findIndex(c => c.id === categoryId);
      if (categoryIndex === -1) return prevCategories;
      
      const category = newCategories[categoryIndex];
      category.subcategories = category.subcategories.filter(s => s.id !== subcategoryId);
      
      // Redistribute percentages
      const count = category.subcategories.length;
      if (count > 0) {
        category.subcategories.forEach(s => {
          s.percentage = 100 / count;
        });
      }
      
      return newCategories;
    });
  };

  const addCategory = (name: string, type: 'need' | 'want' | 'savings', iconName: string) => {
    setCategories(prevCategories => {
      const newCategories = deepCopyCategories(prevCategories);
      
      // Generate a new icon based on the name
      let icon;
      let color = COLORS[Math.floor(Math.random() * COLORS.length)];
      
      switch(iconName) {
        case 'shirt':
          icon = <Shirt className="h-5 w-5" />;
          break;
        case 'utensils':
          icon = <Utensils className="h-5 w-5" />;
          break;
        case 'credit-card':
          icon = <CreditCard className="h-5 w-5" />;
          break;
        case 'bus':
          icon = <Bus className="h-5 w-5" />;
          break;
        default:
          icon = <PiggyBank className="h-5 w-5" />;
      }
      
      // Adjust percentages for existing categories
      const existingCount = newCategories.length;
      const equalPercentage = 100 / (existingCount + 1);
      
      newCategories.forEach(c => {
        c.percentage = equalPercentage;
      });
      
      // Add new category
      newCategories.push({
        id: `category-${Date.now()}`,
        name,
        percentage: equalPercentage,
        icon,
        color,
        subcategories: [],
        type
      });
      
      return newCategories;
    });
    
    return true;
  };
  
  const removeCategory = (categoryId: string) => {
    setCategories(prevCategories => {
      const newCategories = prevCategories.filter(c => c.id !== categoryId);
      
      // Redistribute percentages
      const count = newCategories.length;
      if (count > 0) {
        const equalPercentage = 100 / count;
        newCategories.forEach(c => {
          c.percentage = equalPercentage;
        });
      }
      
      return newCategories;
    });
  };

  return {
    categories,
    setCategories,
    handleCategoryPercentageChange,
    handleSubcategoryPercentageChange,
    addSubcategory,
    removeSubcategory,
    addCategory,
    removeCategory
  };
}
