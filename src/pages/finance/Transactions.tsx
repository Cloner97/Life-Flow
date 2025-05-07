
import { useState } from 'react';
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreateTransactionForm } from '@/components/finance/CreateTransactionForm';
import { Plus, ReceiptText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TransactionCard } from '@/components/finance/TransactionCard';

const financeNavItems = [
  { name: "تراکنش ها", path: "transactions", emoji: "💳" },
  { name: "بودجه بندی", path: "budget", emoji: "📊" },
  { name: "دارایی", path: "assets", emoji: "💰" },
  { name: "گزارشات", path: "reports", emoji: "📈" },
];

export type Transaction = {
  id: string;
  date: Date;
  category: string;
  type: "income" | "expense";
  amount: number;
  description: string;
};

// Sample transactions for demonstration
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date('2023-05-01'),
    category: 'درآمد',
    type: 'income',
    amount: 5500000,
    description: 'حقوق ماهانه',
  },
  {
    id: '2',
    date: new Date('2023-05-03'),
    category: 'مواد غذایی',
    type: 'expense',
    amount: 850000,
    description: 'خرید هفتگی',
  },
  {
    id: '3',
    date: new Date('2023-05-05'),
    category: 'قبوض',
    type: 'expense',
    amount: 420000,
    description: 'قبض برق',
  }
];

export default function Transactions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const { toast } = useToast();

  const handleSubmit = (data: any) => {
    // Create a new transaction with a unique ID
    const newTransaction: Transaction = {
      ...data,
      id: Date.now().toString(),
    };
    
    // Add the transaction to the state
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
    
    console.log('New transaction:', newTransaction);
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
        <Button onClick={() => setIsDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="ml-2 h-4 w-4" />
          تراکنش جدید
        </Button>
      </div>
      
      <SectionNavBar items={financeNavItems} baseRoute="/finance" />
      
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <ReceiptText className="mr-2 h-5 w-5 text-gray-600" />
              تراکنش‌های اخیر
            </h2>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                فیلتر
              </Button>
              <Button variant="outline" size="sm">
                مرتب‌سازی
              </Button>
            </div>
          </div>
          
          {transactions.length === 0 ? (
            <div className="mt-8 text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <ReceiptText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">هیچ تراکنشی ثبت نشده است</h3>
              <p className="text-gray-500 mb-4">برای شروع یک تراکنش جدید ثبت کنید.</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="ml-2 h-4 w-4" />
                افزودن تراکنش
              </Button>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  title={transaction.description}
                  amount={transaction.amount}
                  date={transaction.date.toLocaleDateString('fa-IR')}
                  isIncome={transaction.type === "income"}
                  category={transaction.category}
                />
              ))}
            </div>
          )}
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

