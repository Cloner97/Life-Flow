
import { useState } from 'react';
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreateTransactionForm } from '@/components/finance/CreateTransactionForm';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const financeNavItems = [
  { name: "تراکنش ها", path: "transactions", emoji: "💳" },
  { name: "بودجه بندی", path: "budget", emoji: "📊" },
  { name: "دارایی", path: "assets", emoji: "💰" },
  { name: "گزارشات", path: "reports", emoji: "📈" },
];

export default function Transactions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (data: any) => {
    console.log('New transaction:', data);
    toast({
      title: "تراکنش با موفقیت ثبت شد",
      description: "تراکنش جدید به لیست تراکنش‌های شما اضافه شد.",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">امور مالی</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          تراکنش جدید
        </Button>
      </div>
      
      <SectionNavBar items={financeNavItems} baseRoute="/finance" />
      
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">تراکنش ها</h2>
          <p>لیست تراکنش های شما اینجا نمایش داده می‌شود.</p>
          
          <div className="mt-4 text-center py-10 text-gray-500">
            در حال بارگذاری تراکنش ها...
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>ثبت تراکنش جدید</DialogTitle>
          </DialogHeader>
          <CreateTransactionForm 
            onSubmit={handleSubmit}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
