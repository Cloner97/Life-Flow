
import { useState } from 'react';
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Plus, Trash2, Coins, Wallet, WalletCards } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AddAssetForm } from '@/components/finance/AddAssetForm';

// Navigation items
const financeNavItems = [
  { name: "تراکنش ها", path: "transactions", emoji: "💳" },
  { name: "بودجه بندی", path: "budget", emoji: "📊" },
  { name: "دارایی", path: "assets", emoji: "💰" },
  { name: "گزارشات", path: "reports", emoji: "📈" },
];

// Asset categories
export const assetCategories = [
  { value: "cash", label: "نقد (پول، بانک)" },
  { value: "gold", label: "طلا و جواهرات" },
  { value: "vehicle", label: "خودرو" },
  { value: "property", label: "ملک و مستغلات" },
  { value: "currency", label: "ارز" },
  { value: "cryptocurrency", label: "ارز دیجیتال" },
  { value: "stock", label: "سهام" },
  { value: "other", label: "سایر" },
];

// Storage locations
export const storageLocations = [
  { value: "bank", label: "بانک" },
  { value: "home", label: "منزل" },
  { value: "safe", label: "صندوق امانات" },
  { value: "exchange", label: "صرافی" },
  { value: "broker", label: "کارگزاری" },
  { value: "wallet", label: "کیف پول دیجیتال" },
  { value: "other", label: "سایر" },
];

// Define interface for asset type
export interface Asset {
  id: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export default function Assets() {
  const { toast } = useToast();
  const [isAddAssetDialogOpen, setIsAddAssetDialogOpen] = useState(false);
  
  // State for assets list
  const [assets, setAssets] = useState<Asset[]>([]);
  
  // State for USD exchange rate
  const [usdRate, setUsdRate] = useState<number>(50000);
  
  // Function to add new asset
  const handleAddAsset = (newAsset: Omit<Asset, 'id'>) => {
    const asset: Asset = {
      id: crypto.randomUUID(),
      ...newAsset
    };
    
    setAssets([...assets, asset]);
    
    toast({
      title: "موفق",
      description: "دارایی با موفقیت اضافه شد",
    });
    
    setIsAddAssetDialogOpen(false);
  };
  
  // Function to delete asset
  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
    toast({
      title: "موفق",
      description: "دارایی با موفقیت حذف شد",
    });
  };
  
  // Calculate total value in Toman
  const calculateTotalValueInToman = (): number => {
    return assets.reduce((total, asset) => {
      return total + (asset.quantity * asset.unitPrice);
    }, 0);
  };
  
  // Calculate total value in USD
  const calculateTotalValueInUSD = (): number => {
    const totalToman = calculateTotalValueInToman();
    return usdRate > 0 ? totalToman / usdRate : 0;
  };
  
  // Calculate percentage of total for each asset
  const calculatePercentage = (asset: Asset): number => {
    const totalValue = calculateTotalValueInToman();
    if (totalValue === 0) return 0;
    
    const assetValue = asset.quantity * asset.unitPrice;
    return (assetValue / totalValue) * 100;
  };
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fa-IR').format(amount);
  };

  // Get category label by value
  const getCategoryLabel = (value: string): string => {
    const category = assetCategories.find(cat => cat.value === value);
    return category ? category.label : value;
  };
  
  // Get location label by value
  const getLocationLabel = (value: string): string => {
    const location = storageLocations.find(loc => loc.value === value);
    return location ? location.label : value;
  };
  
  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">امور مالی</h1>
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => setIsAddAssetDialogOpen(true)}
        >
          <Plus className="ml-2 h-4 w-4" />
          افزودن دارایی
        </Button>
      </div>
      
      <SectionNavBar items={financeNavItems} baseRoute="/finance" />
      
      <div className="grid gap-6">
        {/* Total Assets Summary */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">خلاصه دارایی‌ها</CardTitle>
            <CardDescription>ارزش کل دارایی‌های شما</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-4 rtl:space-x-reverse">
                <div className="bg-green-100 p-3 rounded-full">
                  <WalletCards className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-green-600 font-medium">ارزش کل به تومان</span>
                  <span className="text-2xl font-bold">{formatCurrency(calculateTotalValueInToman())} تومان</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg flex items-center space-x-4 rtl:space-x-reverse">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Wallet className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-blue-600 font-medium">ارزش کل به دلار</span>
                  <span className="text-2xl font-bold">${formatCurrency(calculateTotalValueInUSD())}</span>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg flex items-center space-x-4 rtl:space-x-reverse">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Coins className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-purple-600 font-medium">قیمت دلار</span>
                  <div className="flex items-center">
                    <Input 
                      type="number" 
                      value={usdRate} 
                      onChange={(e) => setUsdRate(Number(e.target.value))}
                      className="w-full text-lg font-bold"
                    />
                    <span className="mr-2">تومان</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assets List */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">لیست دارایی‌ها</CardTitle>
            <CardDescription>مدیریت دارایی‌های خود</CardDescription>
          </CardHeader>
          <CardContent>
            {assets.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                هنوز دارایی ثبت نشده است
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>نام دارایی</TableHead>
                      <TableHead>دسته‌بندی</TableHead>
                      <TableHead>محل نگهداری</TableHead>
                      <TableHead>مقدار</TableHead>
                      <TableHead>واحد</TableHead>
                      <TableHead>قیمت واحد (تومان)</TableHead>
                      <TableHead>ارزش کل (تومان)</TableHead>
                      <TableHead>ارزش کل (دلار)</TableHead>
                      <TableHead>درصد از کل</TableHead>
                      <TableHead>عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets.map((asset) => {
                      const totalValueInToman = asset.quantity * asset.unitPrice;
                      const totalValueInUsd = usdRate > 0 ? totalValueInToman / usdRate : 0;
                      const percentage = calculatePercentage(asset);
                      
                      return (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell>{getCategoryLabel(asset.category)}</TableCell>
                          <TableCell>{getLocationLabel(asset.location)}</TableCell>
                          <TableCell>{asset.quantity}</TableCell>
                          <TableCell>{asset.unit}</TableCell>
                          <TableCell>{formatCurrency(asset.unitPrice)}</TableCell>
                          <TableCell>{formatCurrency(totalValueInToman)}</TableCell>
                          <TableCell>${formatCurrency(totalValueInUsd)}</TableCell>
                          <TableCell>{percentage.toFixed(2)}%</TableCell>
                          <TableCell>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDeleteAsset(asset.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Asset Add Dialog */}
      <Dialog open={isAddAssetDialogOpen} onOpenChange={setIsAddAssetDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>افزودن دارایی جدید</DialogTitle>
          </DialogHeader>
          <AddAssetForm onSubmit={handleAddAsset} onCancel={() => setIsAddAssetDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
