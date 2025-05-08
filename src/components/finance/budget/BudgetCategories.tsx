
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from "@/hooks/use-toast";
import { BudgetCategory } from '@/hooks/useBudgetCategories';

interface BudgetCategoriesProps {
  categories: BudgetCategory[];
  income: number;
  onCategoryPercentageChange: (categoryId: string, value: number[]) => void;
  onSubcategoryPercentageChange: (categoryId: string, subcategoryId: string, value: number[]) => void;
  onAddSubcategory: (categoryId: string, name: string) => boolean;
  onRemoveSubcategory: (categoryId: string, subcategoryId: string) => void;
}

export function BudgetCategories({ 
  categories, 
  income, 
  onCategoryPercentageChange, 
  onSubcategoryPercentageChange, 
  onAddSubcategory, 
  onRemoveSubcategory 
}: BudgetCategoriesProps) {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState<string>('');

  const calculateAmount = (total: number, percentage: number) => {
    return Math.round(total * percentage / 100);
  };

  const handleAddSubcategory = (categoryId: string) => {
    if (!newSubcategoryName.trim()) {
      toast({
        title: "خطا",
        description: "نام زیردسته نمی‌تواند خالی باشد.",
        variant: "destructive",
      });
      return;
    }

    const success = onAddSubcategory(categoryId, newSubcategoryName);
    if (success) {
      setNewSubcategoryName('');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">تخصیص بودجه</h3>
      
      {categories.map((category) => (
        <div key={category.id} className="mb-6 p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: category.color + '20' }}>
                {category.icon}
              </div>
              <span className="font-semibold">{category.name}</span>
            </div>
            <div className="text-sm font-medium">
              {category.percentage.toFixed(0)}%
              {income > 0 && (
                <span className="text-gray-500 mr-2">
                  ({calculateAmount(income, category.percentage).toLocaleString()} تومان)
                </span>
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
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
            className="w-full mt-2 text-sm"
          >
            {activeCategory === category.id ? "بستن زیردسته‌ها" : "مدیریت زیردسته‌ها"}
          </Button>
          
          {activeCategory === category.id && (
            <div className="mt-4 border-t pt-4">
              <h4 className="text-sm font-medium mb-3">زیردسته‌های {category.name}</h4>
              
              <div className="space-y-4 mb-4">
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.id} className="flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <span className="text-sm">{subcategory.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm ml-2">{subcategory.percentage.toFixed(0)}%</span>
                        {income > 0 && (
                          <span className="text-xs text-gray-500">
                            ({calculateAmount(calculateAmount(income, category.percentage), subcategory.percentage).toLocaleString()} تومان)
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveSubcategory(category.id, subcategory.id)}
                          className="h-6 w-6 mr-1"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Slider
                      value={[subcategory.percentage]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => onSubcategoryPercentageChange(category.id, subcategory.id, value)}
                      className="mb-2"
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex mt-4">
                <Input
                  value={newSubcategoryName}
                  onChange={(e) => setNewSubcategoryName(e.target.value)}
                  placeholder="نام زیردسته جدید"
                  className="ml-2 text-sm"
                />
                <Button 
                  size="sm" 
                  onClick={() => handleAddSubcategory(category.id)}
                >
                  <Plus className="h-4 w-4 ml-1" />
                  افزودن
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
