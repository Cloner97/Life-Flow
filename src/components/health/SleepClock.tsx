
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Bed, Clock, Sun, AlarmClock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface SleepClockProps {
  initialBedtime?: string;
  initialWakeTime?: string;
}

export const SleepClock: React.FC<SleepClockProps> = ({
  initialBedtime = '00:00',
  initialWakeTime = '07:00',
}) => {
  const [bedtime, setBedtime] = useState(initialBedtime);
  const [wakeTime, setWakeTime] = useState(initialWakeTime);
  
  // Calculate sleep duration
  const calculateSleepDuration = () => {
    const [bedHours, bedMinutes] = bedtime.split(':').map(Number);
    const [wakeHours, wakeMinutes] = wakeTime.split(':').map(Number);
    
    let hoursDiff = wakeHours - bedHours;
    if (hoursDiff < 0) hoursDiff += 24; // Handle overnight sleep
    
    let minutesDiff = wakeMinutes - bedMinutes;
    if (minutesDiff < 0) {
      minutesDiff += 60;
      hoursDiff -= 1;
    }
    
    return hoursDiff + (minutesDiff / 60);
  };
  
  const sleepDuration = calculateSleepDuration();
  const formattedDuration = `${Math.floor(sleepDuration)} ساعت و ${Math.round((sleepDuration % 1) * 60)} دقیقه`;
  
  // Check if sleep duration is optimal
  const isSleepOptimal = sleepDuration >= 7 && sleepDuration <= 9;
  
  // Quality assessment based on duration
  const getSleepQualityColor = () => {
    if (sleepDuration >= 7 && sleepDuration <= 9) return 'bg-green-500';
    if (sleepDuration >= 6 && sleepDuration < 7) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getSleepQualityText = () => {
    if (sleepDuration >= 7 && sleepDuration <= 9) return 'عالی';
    if (sleepDuration >= 6 && sleepDuration < 7) return 'متوسط';
    return 'ناکافی';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="bg-white shadow-md p-6 overflow-visible relative">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">برنامه خواب من</h3>
          <p className="text-gray-600">تنظیم برنامه خواب برای سلامتی بهتر</p>
        </div>
        
        {/* New Sleep Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Bedtime Input */}
          <div className="bg-lifeos-soft-purple bg-opacity-20 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="bg-lifeos-soft-purple p-2 rounded-full mr-2">
                <Bed className="h-5 w-5 text-purple-700" />
              </div>
              <h4 className="font-semibold text-gray-800">زمان خواب</h4>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bedtime" className="text-gray-600 mb-1 block">ساعت خواب</Label>
                <Input
                  id="bedtime"
                  type="time"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  className="border-2 border-lifeos-soft-purple border-opacity-30 focus:border-purple-500"
                />
              </div>
              <p className="text-sm text-gray-500">زمان توصیه شده برای خواب: ۱۰ الی ۱۱ شب</p>
            </div>
          </div>
          
          {/* Wake time Input */}
          <div className="bg-lifeos-soft-blue bg-opacity-20 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="bg-lifeos-soft-blue p-2 rounded-full mr-2">
                <AlarmClock className="h-5 w-5 text-blue-700" />
              </div>
              <h4 className="font-semibold text-gray-800">زمان بیداری</h4>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="waketime" className="text-gray-600 mb-1 block">ساعت بیداری</Label>
                <Input
                  id="waketime"
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="border-2 border-lifeos-soft-blue border-opacity-30 focus:border-blue-500"
                />
              </div>
              <p className="text-sm text-gray-500">زمان توصیه شده برای بیداری: ۶ الی ۷ صبح</p>
            </div>
          </div>
        </div>
        
        {/* Sleep Duration Summary */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">مدت زمان خواب</h4>
            <span className="text-2xl font-bold">{formattedDuration}</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span>کیفیت خواب:</span>
              <span className={`px-3 py-1 rounded-full text-white ${getSleepQualityColor()}`}>
                {getSleepQualityText()}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`${getSleepQualityColor()} h-2.5 rounded-full`}
                style={{ width: `${Math.min(100, (sleepDuration / 10) * 100)}%` }}
              ></div>
            </div>
            
            <p className={`text-sm ${isSleepOptimal ? 'text-green-600' : 'text-yellow-600'}`}>
              {isSleepOptimal 
                ? 'این برنامه با هدف خواب شما مطابقت دارد.' 
                : 'برای سلامتی بهتر، ۷ تا ۹ ساعت خواب توصیه می‌شود.'}
            </p>
          </div>
        </div>
        
        {/* Sleep Cycle Visualization */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-800 mb-4">چرخه های خواب شما</h4>
          <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
            <span>خواب سبک</span>
            <span>خواب عمیق</span>
            <span>خواب REM</span>
          </div>
          
          <div className="space-y-2">
            {[...Array(Math.floor(sleepDuration / 1.5))].map((_, i) => (
              <div key={i} className="flex h-6 w-full overflow-hidden rounded-full">
                <div className="bg-blue-200 w-1/3"></div>
                <div className="bg-blue-400 w-1/3"></div>
                <div className="bg-blue-600 w-1/3"></div>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 mt-4">
            هر چرخه خواب حدود ۹۰ دقیقه طول می‌کشد. شما تقریباً {Math.floor(sleepDuration / 1.5)} چرخه خواب خواهید داشت.
          </p>
        </div>
      </Card>
    </div>
  );
};
