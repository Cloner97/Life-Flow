import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TransactionCard } from '@/components/finance/TransactionCard';
import { CreateTransactionForm } from '@/components/finance/CreateTransactionForm';
import { calculateIncomeSplits } from '@/utils/financeSplitting';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BackButton } from '@/components/ui/BackButton';

// Initial transactions data
const initialTransactions = [
  {
    id: 1,
    title: "حقوق ماهانه",
    amount: 5200000,
    date: "۱۴۰۴/۰۱/۳۱",
    isIncome: true,
    category: "درآمد"
  },
  {
    id: 2,
    title: "خرید مواد غذایی",
    amount: 450000,
    date: "۱۴۰۴/۰۲/۰۲",
    isIncome: false,
    category: "مواد غذایی"
  },
  {
    id: 3,
    title: "قبض برق",
    amount: 185000,
    date: "۱۴۰۴/۰۲/۰۵",
    isIncome: false,
    category: "قبوض"
  },
  {
    id: 4,
    title: "خرید کتاب",
    amount: 120000,
    date: "۱۴۰۴/۰۲/۰۸",
    isIncome: false,
    category: "تفریح و سرگرمی"
  },
  {
    id: 5,
    title: "درآمد فریلنسری",
    amount: 1500000,
    date: "۱۴۰۴/۰۲/۱۰",
    isIncome: true,
    category: "درآمد"
  },
  {
    id: 6,
    title: "اجاره خانه",
    amount: 2800000,
    date: "۱۴۰۴/۰۲/۱۲",
    isIncome: false,
    category: "مسکن"
  }
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  // Use state for transactions
  const [transactions, setTransactions] = useState(initialTransactions);
  
  const [budgetAllocations, setBudgetAllocations] = useState({
    savings: 0,
    wants: 0,
    needs: 0
  });
  
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  
  const filteredTransactions = activeTab === 'all' 
    ? transactions 
    : activeTab === 'income' 
      ? transactions.filter(t => t.isIncome) 
      : transactions.filter(t => !t.isIncome);
  
  const totalIncome = transactions
    .filter(t => t.isIncome)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => !t.isIncome)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpenses;
  
  const handleNewTransaction = (data: any) => {
    // Format the date as Persian date string (simple placeholder conversion)
    const formattedDate = data.date ? 
      `${data.date.getFullYear()}/${String(data.date.getMonth() + 1).padStart(2, '0')}/${String(data.date.getDate()).padStart(2, '0')}` : 
      "تاریخ نامشخص";
      
    // Create the new transaction object
    const newTransaction = {
      id: transactions.length + 1,
      title: data.description,
      amount: Number(data.amount),
      date: formattedDate,
      isIncome: data.type === "income",
      category: data.category
    };
    
    // Add the new transaction to our transactions array
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    
    // Handle budget allocation if it's income
    if (data.type === "income") {
      const splits = calculateIncomeSplits(Number(data.amount));
      setBudgetAllocations(prev => ({
        savings: prev.savings + splits.savings,
        wants: prev.wants + splits.wants,
        needs: prev.needs + splits.needs
      }));
      
      toast({
        title: "تخصیص بودجه انجام شد",
        description: `پس‌انداز: ${splits.savings.toLocaleString()} تومان\nخواسته‌ها: ${splits.wants.toLocaleString()} تومان\nنیازها: ${splits.needs.toLocaleString()} تومان`,
      });
    }
    
    // Show a confirmation toast for the new transaction
    toast({
      title: "تراکنش جدید ثبت شد",
      description: `${data.description} با مبلغ ${Number(data.amount).toLocaleString()} تومان`
    });
    
    // Close the dialog
    setShowTransactionDialog(false);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">امور مالی</h1>
        <Button 
          className="bg-lifeos-primary hover:bg-lifeos-secondary"
          onClick={() => setShowTransactionDialog(true)}
        >
          تراکنش جدید
        </Button>
      </div>
      
      <Dialog open={showTransactionDialog} onOpenChange={setShowTransactionDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تراکنش جدید</DialogTitle>
          </DialogHeader>
          <CreateTransactionForm
            onSubmit={handleNewTransaction}
            onCancel={() => setShowTransactionDialog(false)}
          />
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">بودجه پس‌انداز</CardTitle>
            <CardDescription>۲۰٪ درآمد</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {budgetAllocations.savings.toLocaleString()} تومان
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">بودجه خواسته‌ها</CardTitle>
            <CardDescription>۳۰٪ درآمد</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">
              {budgetAllocations.wants.toLocaleString()} تومان
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">بودجه نیازها</CardTitle>
            <CardDescription>۵۰٪ درآمد</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {budgetAllocations.needs.toLocaleString()} تومان
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">موجودی</CardTitle>
            <CardDescription>مانده حساب</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">{balance.toLocaleString()} تومان</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">درآمد</CardTitle>
            <CardDescription>کل درآمد ماه جاری</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{totalIncome.toLocaleString()} تومان</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">هزینه‌ها</CardTitle>
            <CardDescription>کل هزینه‌های ماه جاری</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{totalExpenses.toLocaleString()} تومان</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>تراکنش‌ها</CardTitle>
          <CardDescription>سوابق مالی اخیر</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="income">درآمد</TabsTrigger>
              <TabsTrigger value="expense">هزینه</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-4">
              <div className="space-y-3">
                {filteredTransactions.map(transaction => (
                  <TransactionCard
                    key={transaction.id}
                    title={transaction.title}
                    amount={transaction.amount}
                    date={transaction.date}
                    isIncome={transaction.isIncome}
                    category={transaction.category}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
