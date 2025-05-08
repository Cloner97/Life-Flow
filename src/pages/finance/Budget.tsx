
import { useState } from 'react';
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Plus, X, PiggyBank, ShoppingBag, Wallet } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const financeNavItems = [
  { name: "تراکنش ها", path: "transactions", emoji: "💳" },
  { name: "بودجه بندی", path: "budget", emoji: "📊" },
  { name: "دارایی", path: "assets", emoji: "💰" },
  { name: "گزارشات", path: "reports", emoji: "📈" },
];

const COLORS = ['#34d399', '#8b5cf6', '#f97316'];

interface BudgetCategory {
  id: string;
  name: string;
  percentage: number;
  icon: React.ReactNode;
  color: string;
  subcategories: {
    id: string;
    name: string;
    percentage: number;
  }[];
}

export default function Budget() {
  const { toast } = useToast();
  const [income, setIncome] = useState<number>(0);
  const [newSubcategoryName, setNewSubcategoryName] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
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

  const form = useForm({
    defaultValues: {
      category: "",
    },
  });

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
      targetCategory.percentage = newValue;
      
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
      const subcategory = category.subcategories.find((s: any) => s.id === subcategoryId);
      if (!subcategory) return prevCategories;
      
      const diff = newValue - subcategory.percentage;
      
      if (diff > 0) {
        // Decreasing other subcategories proportionally
        const otherSubcategories = category.subcategories.filter((s: any) => s.id !== subcategoryId);
        const otherTotalPercentage = otherSubcategories.reduce((sum: number, s: any) => sum + s.percentage, 0);
        
        otherSubcategories.forEach((s: any) => {
          if (otherTotalPercentage > 0) {
            const decreaseRatio = diff * (s.percentage / otherTotalPercentage);
            s.percentage = Math.max(0, s.percentage - decreaseRatio);
          }
        });
      }
      
      // Update target subcategory
      subcategory.percentage = newValue;
      
      // Normalize to ensure sum is 100
      const totalSubPercentage = category.subcategories.reduce((sum: number, s: any) => sum + s.percentage, 0);
      if (totalSubPercentage !== 100) {
        const adjustmentFactor = 100 / totalSubPercentage;
        category.subcategories.forEach((s: any) => {
          s.percentage *= adjustmentFactor;
        });
      }
      
      return newCategories;
    });
  };

  const addSubcategory = (categoryId: string) => {
    if (!newSubcategoryName.trim()) {
      toast({
        title: "خطا",
        description: "نام دسته‌بندی نمی‌تواند خالی باشد.",
        variant: "destructive",
      });
      return;
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
        category.subcategories.forEach((s: any) => {
          s.percentage = newPercentage;
        });
      }
      
      // Add new subcategory
      category.subcategories.push({
        id: `${categoryId}-${Date.now()}`,
        name: newSubcategoryName,
        percentage: existingCount > 0 ? 100 / (existingCount + 1) : 100
      });
      
      return newCategories;
    });
    
    setNewSubcategoryName('');
  };

  const removeSubcategory = (categoryId: string, subcategoryId: string) => {
    setCategories(prevCategories => {
      const newCategories = JSON.parse(JSON.stringify(prevCategories));
      const categoryIndex = newCategories.findIndex((c: BudgetCategory) => c.id === categoryId);
      if (categoryIndex === -1) return prevCategories;
      
      const category = newCategories[categoryIndex];
      category.subcategories = category.subcategories.filter((s: any) => s.id !== subcategoryId);
      
      // Redistribute percentages
      const count = category.subcategories.length;
      if (count > 0) {
        category.subcategories.forEach((s: any) => {
          s.percentage = 100 / count;
        });
      }
      
      return newCategories;
    });
  };

  const pieData = categories.map(category => ({
    name: category.name,
    value: category.percentage,
    color: category.color
  }));

  const calculateAmount = (total: number, percentage: number) => {
    return Math.round(total * percentage / 100);
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
                      onValueChange={(value) => handleCategoryPercentageChange(category.id, value)}
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
                                    onClick={() => removeSubcategory(category.id, subcategory.id)}
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
                                onValueChange={(value) => handleSubcategoryPercentageChange(category.id, subcategory.id, value)}
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
                            onClick={() => addSubcategory(category.id)}
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
              
              <div>
                <h3 className="text-lg font-medium mb-4">نمودار تخصیص بودجه</h3>
                <div className="bg-white p-4 rounded-lg border h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {income > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">جدول تخصیص بودجه</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>دسته‌بندی</TableHead>
                          <TableHead>درصد</TableHead>
                          <TableHead>مبلغ (تومان)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categories.map((category) => (
                          <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell>{category.percentage.toFixed(0)}%</TableCell>
                            <TableCell>{calculateAmount(income, category.percentage).toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
