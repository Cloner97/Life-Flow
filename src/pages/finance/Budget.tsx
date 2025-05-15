
import { useState } from 'react';
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BudgetCategories } from '@/components/finance/budget/BudgetCategories';
import { BudgetChart } from '@/components/finance/budget/BudgetChart';
import { useBudgetCategories } from '@/hooks/useBudgetCategories';
import { AddBudgetItemDialog, BudgetItem } from '@/components/finance/budget/AddBudgetItemDialog';
import { CircleDollarSign, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const financeNavItems = [
  { name: "تراکنش ها", path: "transactions", emoji: "💳" },
  { name: "بودجه بندی", path: "budget", emoji: "📊" },
  { name: "دارایی", path: "assets", emoji: "💰" },
  { name: "گزارشات", path: "reports", emoji: "📈" },
];

export default function Budget() {
  const { toast } = useToast();
  const [income, setIncome] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { 
    categories, 
    handleCategoryPercentageChange,
    removeCategory,
    addCategory
  } = useBudgetCategories();

  const handleAddBudgetItem = (item: Omit<BudgetItem, 'id'>) => {
    // Update income when a new budget item is added
    setIncome(prevIncome => prevIncome + item.amount);
    
    // Check if the selected category exists or needs to be created
    const categoryExists = categories.some(category => category.id === item.categoryId);
    
    if (!categoryExists) {
      // If the category doesn't exist, let's create it
      toast({
        title: 'خطا',
        description: 'دسته‌بندی انتخاب شده یافت نشد',
        variant: 'destructive',
      });
    }
    
    toast({
      title: 'موفق',
      description: `بودجه ${item.name} با موفقیت اضافه شد`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">امور مالی</h1>
      </div>
      
      <SectionNavBar items={financeNavItems} baseRoute="/finance" />
      
      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>بودجه بندی</CardTitle>
              <CardDescription>مدیریت بودجه و تخصیص منابع مالی</CardDescription>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="ml-2 h-4 w-4" /> افزودن بودجه
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">درآمد ماهیانه (تومان)</label>
              <div className="flex gap-2 max-w-md">
                <Input 
                  type="number" 
                  value={income} 
                  onChange={(e) => setIncome(Number(e.target.value))}
                  placeholder="مبلغ درآمد ماهیانه خود را وارد کنید" 
                  className="text-left ltr"
                  dir="ltr"
                />
                <Button variant="outline">
                  <CircleDollarSign className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <BudgetCategories 
                categories={categories}
                income={income}
                onCategoryPercentageChange={handleCategoryPercentageChange}
                onRemoveCategory={removeCategory}
              />
              
              <BudgetChart 
                categories={categories} 
                income={income} 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <AddBudgetItemDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddItem={handleAddBudgetItem}
        categoryOptions={categories.map(category => ({ id: category.id, name: category.name }))}
      />
    </div>
  );
}
