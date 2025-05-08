
import { useState } from 'react';
import { PiggyBank, ShoppingBag, Wallet } from 'lucide-react';

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
}

const COLORS = ['#34d399', '#8b5cf6', '#f97316'];

export function useBudgetCategories() {
  const [categories, setCategories] = useState<BudgetCategory[]>([
    {
      id: '1',
      name: 'نیازها',
      percentage: 50,
      icon: <ShoppingBag className="h-5 w-5" />,
      color: COLORS[0],
      subcategories: [
        { id: '1-1', name: 'مسکن', percentage: 60 },
        { id: '1-2', name: 'پوشاک', percentage: 20 },
        { id: '1-3', name: 'خوراک', percentage: 20 },
      ]
    },
    {
      id: '2',
      name: 'خواسته‌ها',
      percentage: 30,
      icon: <Wallet className="h-5 w-5" />,
      color: COLORS[1],
      subcategories: [
        { id: '2-1', name: 'تفریح', percentage: 50 },
        { id: '2-2', name: 'هدیه', percentage: 30 },
        { id: '2-3', name: 'سرگرمی', percentage: 20 },
      ]
    },
    {
      id: '3',
      name: 'پس‌انداز',
      percentage: 20,
      icon: <PiggyBank className="h-5 w-5" />,
      color: COLORS[2],
      subcategories: [
        { id: '3-1', name: 'طلا', percentage: 40 },
        { id: '3-2', name: 'دلار', percentage: 40 },
        { id: '3-3', name: 'اوراق', percentage: 20 },
      ]
    }
  ]);

  const handleCategoryPercentageChange = (categoryId: string, value: number[]) => {
    const newValue = value[0];
    
    // Calculate the difference
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    const diff = newValue - category.percentage;
    
    // If increasing this category, decrease others proportionally
    setCategories(prevCategories => {
      // Deep copy categories
      const newCategories = JSON.parse(JSON.stringify(prevCategories));
      
      if (diff > 0) {
        // Decreasing other categories proportionally
        const otherCategories = newCategories.filter((c: BudgetCategory) => c.id !== categoryId);
        const otherTotalPercentage = otherCategories.reduce((sum: number, c: BudgetCategory) => sum + c.percentage, 0);
        
        otherCategories.forEach((c: BudgetCategory) => {
          if (otherTotalPercentage > 0) {
            const decreaseRatio = diff * (c.percentage / otherTotalPercentage);
            c.percentage = Math.max(0, c.percentage - decreaseRatio);
          }
        });
      }
      
      // Update target category
      const targetCategory = newCategories.find((c: BudgetCategory) => c.id === categoryId);
      if (targetCategory) {
        targetCategory.percentage = newValue;
      }
      
      // Normalize to ensure sum is 100
      const totalPercentage = newCategories.reduce((sum: number, c: BudgetCategory) => sum + c.percentage, 0);
      if (totalPercentage !== 100) {
        const adjustmentFactor = 100 / totalPercentage;
        newCategories.forEach((c: BudgetCategory) => {
          c.percentage *= adjustmentFactor;
        });
      }
      
      return newCategories;
    });
  };

  const handleSubcategoryPercentageChange = (categoryId: string, subcategoryId: string, value: number[]) => {
    const newValue = value[0];
    
    setCategories(prevCategories => {
      const newCategories = JSON.parse(JSON.stringify(prevCategories));
      const categoryIndex = newCategories.findIndex((c: BudgetCategory) => c.id === categoryId);
      if (categoryIndex === -1) return prevCategories;
      
      const category = newCategories[categoryIndex];
      const subcategory = category.subcategories.find((s: BudgetSubcategory) => s.id === subcategoryId);
      if (!subcategory) return prevCategories;
      
      const diff = newValue - subcategory.percentage;
      
      if (diff > 0) {
        // Decreasing other subcategories proportionally
        const otherSubcategories = category.subcategories.filter((s: BudgetSubcategory) => s.id !== subcategoryId);
        const otherTotalPercentage = otherSubcategories.reduce((sum: number, s: BudgetSubcategory) => sum + s.percentage, 0);
        
        otherSubcategories.forEach((s: BudgetSubcategory) => {
          if (otherTotalPercentage > 0) {
            const decreaseRatio = diff * (s.percentage / otherTotalPercentage);
            s.percentage = Math.max(0, s.percentage - decreaseRatio);
          }
        });
      }
      
      // Update target subcategory
      subcategory.percentage = newValue;
      
      // Normalize to ensure sum is 100
      const totalSubPercentage = category.subcategories.reduce((sum: number, s: BudgetSubcategory) => sum + s.percentage, 0);
      if (totalSubPercentage !== 100) {
        const adjustmentFactor = 100 / totalSubPercentage;
        category.subcategories.forEach((s: BudgetSubcategory) => {
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
      const newCategories = JSON.parse(JSON.stringify(prevCategories));
      const categoryIndex = newCategories.findIndex((c: BudgetCategory) => c.id === categoryId);
      if (categoryIndex === -1) return prevCategories;
      
      const category = newCategories[categoryIndex];
      
      // Adjust percentages for existing subcategories
      const existingCount = category.subcategories.length;
      if (existingCount > 0) {
        const newPercentage = 100 / (existingCount + 1);
        category.subcategories.forEach((s: BudgetSubcategory) => {
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
      const newCategories = JSON.parse(JSON.stringify(prevCategories));
      const categoryIndex = newCategories.findIndex((c: BudgetCategory) => c.id === categoryId);
      if (categoryIndex === -1) return prevCategories;
      
      const category = newCategories[categoryIndex];
      category.subcategories = category.subcategories.filter((s: BudgetSubcategory) => s.id !== subcategoryId);
      
      // Redistribute percentages
      const count = category.subcategories.length;
      if (count > 0) {
        category.subcategories.forEach((s: BudgetSubcategory) => {
          s.percentage = 100 / count;
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
    removeSubcategory
  };
}
