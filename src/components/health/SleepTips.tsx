
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock, Moon } from 'lucide-react';

const sleepTips = [
  {
    title: 'چرخه خواب',
    icon: <Clock className="h-5 w-5" />,
    content:
      'هر چرخه خواب حدود 90 دقیقه طول می‌کشد و شامل مراحل خواب سبک، عمیق و REM است. برنامه‌ریزی خواب برای 7.5 یا 9 ساعت (5 یا 6 چرخه کامل) می‌تواند باعث بیداری راحت‌تر شود.',
  },
  {
    title: 'زمان طلایی خواب',
    icon: <Moon className="h-5 w-5" />,
    content:
      'خوابیدن بین ساعت 10 شب تا 2 صبح برای سلامت بهینه مهم است. در این ساعات، بدن بیشترین ترشح هورمون ملاتونین را دارد که باعث تقویت سیستم ایمنی و ترمیم سلول‌ها می‌شود.',
  },
  {
    title: 'مراحل خواب',
    icon: <Clock className="h-5 w-5" />,
    content:
      'خواب شامل 4 مرحله است: N1 (خواب سبک)، N2 (شروع خواب عمیق)، N3 (خواب عمیق) و REM (خواب همراه با رویا). خواب عمیق برای ترمیم جسمی و خواب REM برای تقویت حافظه و یادگیری ضروری است.',
  },
  {
    title: 'نکات بهبود کیفیت خواب',
    icon: <Moon className="h-5 w-5" />,
    content:
      '• پرهیز از کافئین 6 ساعت قبل از خواب\n• ایجاد محیط تاریک و خنک\n• ثبات در زمان خواب و بیداری\n• قطع استفاده از صفحات نمایش 1 ساعت قبل از خواب\n• ورزش منظم در طول روز (نه نزدیک زمان خواب)',
  },
];

export const SleepTips = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">نکات مهم درباره سیکل خواب</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sleepTips.map((tip, index) => (
          <Card key={index} className="bg-white hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <div className="bg-lifeos-soft-purple p-2 rounded-md mr-2">
                  {tip.icon}
                </div>
                {tip.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-line">{tip.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
