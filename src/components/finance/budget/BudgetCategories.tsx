
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { BudgetCategory } from '@/hooks/useBudgetCategories';
import { Badge } from '@/components/ui/badge';

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
    <div>
      <h3 className="text-lg font-medium mb-4">دسته‌بندی هزینه‌ها</h3>
      
      {categories.map((category) => (
        <div key={category.id} className="mb-6 p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: category.color + '20' }}>
                {category.icon}
              </div>
              <span className="font-semibold">{category.name}</span>
              <Badge variant={
                category.type === 'need' ? 'default' : 
                category.type === 'want' ? 'secondary' : 'outline'
              } className="mr-2">
                {category.type === 'need' ? 'نیاز' : 
                 category.type === 'want' ? 'خواسته' : 'پس‌انداز'}
              </Badge>
            </div>
            <div className="text-sm font-medium flex items-center">
              {category.percentage.toFixed(0)}%
              {income > 0 && (
                <span className="text-gray-500 mr-2">
                  ({calculateAmount(income, category.percentage).toLocaleString()} تومان)
                </span>
              )}
              {onRemoveCategory && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveCategory(category.id)}
                  className="h-6 w-6 mr-1"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
          
          <Slider
            value={[category.percentage]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => onCategoryPercentageChange(category.id, value)}
            className="my-4"
          />
        </div>
      ))}
    </div>
  );
}
