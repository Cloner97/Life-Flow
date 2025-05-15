

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { BudgetCategory } from '@/hooks/useBudgetCategories';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface BudgetCategoriesProps {
  categories: BudgetCategory[];
  income: number;
  onCategoryPercentageChange: (categoryId: string, value: number[]) => void;
  onRemoveCategory?: (categoryId: string) => void;
}

export function BudgetCategories({ 
  categories, 
  income, 
  onCategoryPercentageChange,
  onRemoveCategory
}: BudgetCategoriesProps) {
  const calculateAmount = (total: number, percentage: number) => {
    return Math.round(total * percentage / 100);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">دسته‌بندی هزینه‌ها</h3>
      
      <div className="grid gap-4">
        {categories.map((category) => (
          <div key={category.id} className="p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: category.color + '20' }}>
                  {category.icon}
                </div>
                <span className="font-semibold">{category.name}</span>
                <Badge variant={
                  category.type === 'need' ? 'default' : 
                  category.type === 'want' ? 'secondary' : 'outline'
                } className="mr-1">
                  {category.type === 'need' ? 'نیاز' : 
                   category.type === 'want' ? 'خواسته' : 'پس‌انداز'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium flex items-center">
                  <span className="text-lg font-bold text-primary">
                    {category.percentage.toFixed(0)}%
                  </span>
                  {income > 0 && (
                    <span className="text-gray-500 mr-2">
                      ({calculateAmount(income, category.percentage).toLocaleString()} تومان)
                    </span>
                  )}
                </div>
                {onRemoveCategory && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveCategory(category.id)}
                    className="h-6 w-6"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
            
            <Progress value={category.percentage} className="h-2 mb-2" />
            
            <Slider
              value={[category.percentage]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => onCategoryPercentageChange(category.id, value)}
              className="my-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

