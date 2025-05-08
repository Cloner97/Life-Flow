
import { useState } from 'react';
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BudgetCategories } from '@/components/finance/budget/BudgetCategories';
import { BudgetChart } from '@/components/finance/budget/BudgetChart';
import { useBudgetCategories } from '@/hooks/useBudgetCategories';

const financeNavItems = [
  { name: "تراکنش ها", path: "transactions", emoji: "💳" },
  { name: "بودجه بندی", path: "budget", emoji: "📊" },
  { name: "دارایی", path: "assets", emoji: "💰" },
  { name: "گزارشات", path: "reports", emoji: "📈" },
];

export default function Budget() {
  const [income, setIncome] = useState<number>(0);
  const { categories, setCategories, handleCategoryPercentageChange, handleSubcategoryPercentageChange, addSubcategory, removeSubcategory } = useBudgetCategories();

  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">امور مالی</h1>
      </div>
      
      <SectionNavBar items={financeNavItems} baseRoute="/finance" />
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>بودجه بندی</CardTitle>
            <CardDescription>مدیریت بودجه و تخصیص منابع مالی</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">درآمد ماهیانه (تومان)</label>
              <Input 
                type="number" 
                value={income} 
                onChange={(e) => setIncome(Number(e.target.value))}
                placeholder="مبلغ درآمد ماهیانه خود را وارد کنید" 
                className="max-w-md text-left ltr"
                dir="ltr"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <BudgetCategories 
                categories={categories}
                income={income}
                onCategoryPercentageChange={handleCategoryPercentageChange}
                onSubcategoryPercentageChange={handleSubcategoryPercentageChange}
                onAddSubcategory={addSubcategory}
                onRemoveSubcategory={removeSubcategory}
              />
              
              <BudgetChart 
                categories={categories} 
                income={income} 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
