
import { useState } from 'react';
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useForm } from 'react-hook-form';
import { Apple, BarChart, UtensilsCrossed } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const healthNavItems = [
  { name: "خواب", path: "sleep", emoji: "😴" },
  { name: "غذا", path: "food", emoji: "🍎" },
  { name: "مدیتیشن", path: "meditation", emoji: "🧘" },
  { name: "پزشکی", path: "medical", emoji: "🏥" },
];

// Sample data for food entries
const initialFoodEntries = [
  { id: 1, name: 'صبحانه: نان و پنیر', calories: 350, carbs: 40, protein: 15, fat: 10, sugar: 2, date: '۱۴۰۴/۰۲/۱۸' },
  { id: 2, name: 'ناهار: برنج با مرغ', calories: 650, carbs: 60, protein: 30, fat: 20, sugar: 5, date: '۱۴۰۴/۰۲/۱۸' },
  { id: 3, name: 'میان‌وعده: میوه', calories: 120, carbs: 30, protein: 1, fat: 0, sugar: 25, date: '۱۴۰۴/۰۲/۱۷' },
];

// Sample data for the charts
const nutritionData = [
  { name: 'شنبه', کالری: 1800, کربوهیدرات: 180, پروتئین: 75, چربی: 40 },
  { name: 'یکشنبه', کالری: 2100, کربوهیدرات: 210, پروتئین: 90, چربی: 55 },
  { name: 'دوشنبه', کالری: 1650, کربوهیدرات: 150, پروتئین: 85, چربی: 35 },
  { name: 'سه‌شنبه', کالری: 1900, کربوهیدرات: 190, پروتئین: 80, چربی: 45 },
  { name: 'چهارشنبه', کالری: 2000, کربوهیدرات: 200, پروتئین: 90, چربی: 50 },
  { name: 'پنجشنبه', کالری: 1700, کربوهیدرات: 160, پروتئین: 70, چربی: 40 },
  { name: 'جمعه', کالری: 1550, کربوهیدرات: 140, پروتئین: 65, چربی: 35 },
];

// Sample diet recommendations
const dietRecommendations = [
  {
    id: 1,
    title: 'رژیم متعادل',
    description: 'رژیم متعادل برای افرادی مناسب است که می‌خواهند وزن خود را حفظ کنند و سالم بمانند.',
    meals: [
      { time: 'صبحانه', foods: 'نان سبوس‌دار، پنیر کم‌چرب، گردو، چای کم‌رنگ' },
      { time: 'میان‌وعده', foods: 'یک عدد میوه فصل' },
      { time: 'ناهار', foods: 'برنج قهوه‌ای با خورشت سبزیجات، سالاد فصل' },
      { time: 'عصرانه', foods: 'ماست کم‌چرب با میوه' },
      { time: 'شام', foods: 'سینه مرغ گریل شده با سبزیجات بخارپز' },
    ]
  },
  {
    id: 2,
    title: 'رژیم کم کربوهیدرات',
    description: 'این رژیم برای کاهش وزن و کنترل قند خون مناسب است.',
    meals: [
      { time: 'صبحانه', foods: 'تخم مرغ، پنیر، گوجه فرنگی' },
      { time: 'میان‌وعده', foods: 'مغزها (بادام، گردو)' },
      { time: 'ناهار', foods: 'سالاد مرغ با روغن زیتون' },
      { time: 'عصرانه', foods: 'پنیر و خیار' },
      { time: 'شام', foods: 'ماهی گریل شده با سبزیجات' },
    ]
  },
  {
    id: 3,
    title: 'رژیم گیاهخواری',
    description: 'رژیم مبتنی بر گیاهان، مناسب برای سلامت قلب و کاهش خطر بیماری‌های مزمن',
    meals: [
      { time: 'صبحانه', foods: 'اسموتی با میوه‌ها، اسفناج و دانه چیا' },
      { time: 'میان‌وعده', foods: 'هویج و خیار با حمص' },
      { time: 'ناهار', foods: 'سالاد عدس با سبزیجات و نان سبوس‌دار' },
      { time: 'عصرانه', foods: 'میوه و مغزهای خام' },
      { time: 'شام', foods: 'خوراک لوبیا و سبزیجات با برنج قهوه‌ای' },
    ]
  },
];

export default function Food() {
  const [foodEntries, setFoodEntries] = useState(initialFoodEntries);
  const [selectedDiet, setSelectedDiet] = useState(dietRecommendations[0]);
  
  const form = useForm({
    defaultValues: {
      foodName: '',
      mealType: 'breakfast',
      calories: '',
      carbs: '',
      protein: '',
      fat: '',
      sugar: '',
    },
  });

  const addFoodEntry = (data: any) => {
    const newEntry = {
      id: foodEntries.length + 1,
      name: `${getMealTypeText(data.mealType)}: ${data.foodName}`,
      calories: parseInt(data.calories) || 0,
      carbs: parseInt(data.carbs) || 0,
      protein: parseInt(data.protein) || 0,
      fat: parseInt(data.fat) || 0,
      sugar: parseInt(data.sugar) || 0,
      date: new Date().toLocaleDateString('fa-IR'),
    };
    
    setFoodEntries([...foodEntries, newEntry]);
    form.reset();
  };
  
  const getMealTypeText = (mealType: string) => {
    switch(mealType) {
      case 'breakfast': return 'صبحانه';
      case 'lunch': return 'ناهار';
      case 'dinner': return 'شام';
      case 'snack': return 'میان وعده';
      default: return 'وعده';
    }
  };

  const chartConfig = {
    کالری: { label: 'کالری', color: '#8B5CF6' },
    کربوهیدرات: { label: 'کربوهیدرات', color: '#F97316' },
    پروتئین: { label: 'پروتئین', color: '#0EA5E9' },
    چربی: { label: 'چربی', color: '#EA384C' },
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">سلامتی</h1>
      </div>
      
      <SectionNavBar items={healthNavItems} baseRoute="/health" />
      
      <div className="grid gap-6">
        {/* Food Logging Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="text-lifeos-primary" />
              ثبت غذای مصرف شده
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(addFoodEntry)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    name="foodName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نام غذا</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: برنج با مرغ" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="mealType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع وعده</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="نوع وعده را انتخاب کنید" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="breakfast">صبحانه</SelectItem>
                            <SelectItem value="lunch">ناهار</SelectItem>
                            <SelectItem value="dinner">شام</SelectItem>
                            <SelectItem value="snack">میان وعده</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                  <FormField
                    name="calories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>کالری (kcal)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="مثال: 350" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="carbs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>کربوهیدرات (g)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="مثال: 40" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="protein"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>پروتئین (g)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="مثال: 25" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="fat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>چربی (g)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="مثال: 10" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="sugar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>قند (g)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="مثال: 5" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="w-full">ثبت غذا</Button>
              </form>
            </Form>
            
            {foodEntries.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium text-lg mb-3">غذاهای ثبت شده اخیر</h3>
                <div className="space-y-3">
                  {foodEntries.map((entry) => (
                    <div key={entry.id} className="p-3 border rounded-md bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{entry.name}</div>
                          <div className="text-sm text-gray-500">{entry.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{entry.calories} کالری</div>
                          <div className="text-xs text-gray-500">
                            کربوهیدرات: {entry.carbs}g | پروتئین: {entry.protein}g | چربی: {entry.fat}g
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Nutrition Report Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="text-lifeos-primary" />
              گزارش تغذیه هفتگی
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={nutritionData}
                    margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="کالری" fill="#8B5CF6" />
                    <Bar dataKey="کربوهیدرات" fill="#F97316" />
                    <Bar dataKey="پروتئین" fill="#0EA5E9" />
                    <Bar dataKey="چربی" fill="#EA384C" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-lg mb-3">خلاصه هفته</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-violet-100 p-4 rounded-lg text-center">
                  <div className="text-sm text-violet-700">میانگین کالری روزانه</div>
                  <div className="font-bold text-xl text-violet-800">1,814</div>
                </div>
                <div className="bg-orange-100 p-4 rounded-lg text-center">
                  <div className="text-sm text-orange-700">میانگین کربوهیدرات</div>
                  <div className="font-bold text-xl text-orange-800">175g</div>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <div className="text-sm text-blue-700">میانگین پروتئین</div>
                  <div className="font-bold text-xl text-blue-800">79g</div>
                </div>
                <div className="bg-red-100 p-4 rounded-lg text-center">
                  <div className="text-sm text-red-700">میانگین چربی</div>
                  <div className="font-bold text-xl text-red-800">43g</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Diet Recommendations Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="text-lifeos-primary" />
              پیشنهاد رژیم غذایی
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex overflow-x-auto gap-4 pb-2">
              {dietRecommendations.map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => setSelectedDiet(diet)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-colors ${
                    selectedDiet.id === diet.id
                      ? 'bg-lifeos-primary text-white border-lifeos-primary'
                      : 'hover:bg-gray-100 border-gray-200'
                  }`}
                >
                  {diet.title}
                </button>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-lg">{selectedDiet.title}</h3>
                <p className="text-gray-600 mt-1">{selectedDiet.description}</p>
              </div>
              
              <div className="space-y-4">
                {selectedDiet.meals.map((meal, index) => (
                  <div key={index} className="border-r-2 border-lifeos-primary pr-4">
                    <h4 className="font-medium text-lifeos-primary">{meal.time}</h4>
                    <p className="text-gray-700">{meal.foods}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button variant="outline">دریافت برنامه کامل</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Custom tooltip component for the chart
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="bg-white p-3 border rounded-md shadow-md">
      <p className="font-medium">{payload[0].payload.name}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.name}: {entry.value}</span>
          <span className="text-gray-500 text-xs">
            {entry.name === 'کالری' ? 'kcal' : 'g'}
          </span>
        </div>
      ))}
    </div>
  );
}
