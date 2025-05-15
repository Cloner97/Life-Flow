
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CircleDollarSign, SquareCheck, X, Shirt, Utensils, CreditCard, Bus } from 'lucide-react';

// Define the types for budget items
export type BudgetItemType = 'need' | 'want' | 'savings';

export interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  categoryId: string;
  type: BudgetItemType;
}

interface AddBudgetItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddItem: (item: Omit<BudgetItem, 'id'>) => void;
  categoryOptions: { id: string; name: string }[];
}

const iconOptions = [
  { value: 'shirt', label: 'پوشاک', icon: <Shirt className="h-4 w-4" /> },
  { value: 'utensils', label: 'خوراک', icon: <Utensils className="h-4 w-4" /> },
  { value: 'credit-card', label: 'قسط', icon: <CreditCard className="h-4 w-4" /> },
  { value: 'bus', label: 'حمل و نقل', icon: <Bus className="h-4 w-4" /> }
];

export function AddBudgetItemDialog({ open, onOpenChange, onAddItem, categoryOptions }: AddBudgetItemDialogProps) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [type, setType] = useState<BudgetItemType>('need');
  const [icon, setIcon] = useState('shirt');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'خطا',
        description: 'لطفاً نام بودجه را وارد کنید',
        variant: 'destructive',
      });
      return;
    }
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: 'خطا',
        description: 'لطفاً مقدار معتبری برای بودجه وارد کنید',
        variant: 'destructive',
      });
      return;
    }
    
    if (!categoryId) {
      toast({
        title: 'خطا',
        description: 'لطفاً دسته‌بندی بودجه را انتخاب کنید',
        variant: 'destructive',
      });
      return;
    }

    onAddItem({
      name,
      amount: Number(amount),
      categoryId,
      type,
    });

    // Clear form
    setName('');
    setAmount('');
    setCategoryId('');
    setType('need');
    setIcon('shirt');
    
    // Close dialog
    onOpenChange(false);
    
    toast({
      title: 'موفق',
      description: 'بودجه جدید با موفقیت اضافه شد',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>افزودن بودجه جدید</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">نام</Label>
            <Input
              id="name"
              placeholder="نام بودجه را وارد کنید"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount">مبلغ (تومان)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="مبلغ بودجه را وارد کنید"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-left ltr"
              dir="ltr"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">دسته‌بندی</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="category">
                <SelectValue placeholder="انتخاب دسته‌بندی" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">نوع بودجه</Label>
            <Select value={type} onValueChange={(value) => setType(value as BudgetItemType)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="انتخاب نوع بودجه" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="need">نیاز</SelectItem>
                <SelectItem value="want">خواسته</SelectItem>
                <SelectItem value="savings">پس‌انداز</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="icon">آیکون</Label>
            <Select value={icon} onValueChange={setIcon}>
              <SelectTrigger id="icon">
                <SelectValue placeholder="انتخاب آیکون" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((iconOption) => (
                  <SelectItem key={iconOption.value} value={iconOption.value}>
                    <div className="flex items-center">
                      {iconOption.icon}
                      <span className="ml-2">{iconOption.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              type="button"
            >
              <X className="ml-2 h-4 w-4" />
              انصراف
            </Button>
            <Button
              type="submit"
              className="gap-2"
            >
              <SquareCheck className="ml-2 h-4 w-4" />
              افزودن
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
