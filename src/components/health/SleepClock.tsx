
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Bed, Clock, Sun, AlarmClock } from 'lucide-react';

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

  // Convert 24h format to 12h for display
  const formatTimeFor12h = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return 'فردا';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="ios-card bg-zinc-900 text-white p-6 overflow-visible relative">
        {/* Bedtime display */}
        <div className="absolute top-6 left-6 text-center">
          <div className="flex items-center justify-center mb-2 text-teal-400">
            <Bed className="mr-1" size={20} />
            <span className="font-semibold">زمان خواب</span>
          </div>
          <div className="text-4xl font-bold">{formatTimeFor12h(bedtime)}</div>
          <div className="text-gray-400 text-sm">{getTomorrowDate()}</div>
        </div>
        
        {/* Wake time display */}
        <div className="absolute top-6 right-6 text-center">
          <div className="flex items-center justify-center mb-2 text-teal-400">
            <AlarmClock className="mr-1" size={20} />
            <span className="font-semibold">زمان بیداری</span>
          </div>
          <div className="text-4xl font-bold">{formatTimeFor12h(wakeTime)}</div>
          <div className="text-gray-400 text-sm">{getTomorrowDate()}</div>
        </div>
        
        {/* Clock visualization */}
        <div className="flex justify-center pt-28 pb-10">
          <div className="relative w-64 h-64">
            {/* Main clock face */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-zinc-800 rounded-full border-4 border-zinc-700"></div>
            
            {/* Clock markings */}
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-3 bg-gray-500"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-30.5px)`,
                  transformOrigin: 'bottom center',
                  left: 'calc(50% - 0.5px)',
                  top: '0px'
                }}
              ></div>
            ))}
            
            {/* Clock labels */}
            <div className="absolute top-4 left-0 right-0 text-center text-gray-300 text-sm font-semibold">12AM</div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-300 text-sm font-semibold">6AM</div>
            <div className="absolute bottom-4 left-0 right-0 text-center text-gray-300 text-sm font-semibold">
              <span className="inline-block mr-1"><Sun size={14} className="text-yellow-400" /></span>
              12PM
            </div>
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-300 text-sm font-semibold">6PM</div>
            
            {/* Indicators for 2, 4, 8, 10 */}
            <div className="absolute top-[15%] right-[15%] text-gray-400">2</div>
            <div className="absolute top-[30%] right-[7%] text-gray-400">4</div>
            <div className="absolute bottom-[30%] right-[7%] text-gray-400">8</div>
            <div className="absolute bottom-[15%] right-[15%] text-gray-400">10</div>
            <div className="absolute top-[15%] left-[15%] text-gray-400">10</div>
            <div className="absolute top-[30%] left-[7%] text-gray-400">8</div>
            <div className="absolute bottom-[30%] left-[7%] text-gray-400">4</div>
            <div className="absolute bottom-[15%] left-[15%] text-gray-400">2</div>
            
            {/* Sleep arc indicator */}
            <div 
              className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden"
              style={{
                clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 50%)'
              }}
            >
              <div className="w-full h-full bg-black opacity-70"></div>
            </div>
            
            {/* Bedtime indicator */}
            <div className="absolute top-[12%] left-[50%] transform -translate-x-1/2">
              <div className="text-teal-400">✨</div>
            </div>
            
            {/* Wake time indicator */}
            <div className="absolute bottom-[25%] right-[20%] transform rotate-90">
              <div className="text-teal-400"><AlarmClock size={16} /></div>
            </div>
          </div>
        </div>
        
        {/* Sleep duration */}
        <div className="text-center">
          <div className="text-4xl font-bold">{Math.floor(sleepDuration)} ساعت</div>
          <div className={`text-sm ${isSleepOptimal ? 'text-green-400' : 'text-yellow-400'}`}>
            {isSleepOptimal 
              ? 'این برنامه با هدف خواب شما مطابقت دارد.' 
              : 'برای سلامتی بهتر، ۷ تا ۹ ساعت خواب توصیه می‌شود.'}
          </div>
        </div>
        
        {/* Time selectors (simplified for visual mockup) */}
        <div className="flex justify-between mt-6">
          <div className="bg-zinc-800 rounded-lg px-4 py-2">
            <label className="block text-gray-400 text-xs mb-1">زمان خواب</label>
            <input
              type="time"
              value={bedtime}
              onChange={(e) => setBedtime(e.target.value)}
              className="bg-transparent text-white"
            />
          </div>
          <div className="bg-zinc-800 rounded-lg px-4 py-2">
            <label className="block text-gray-400 text-xs mb-1">زمان بیداری</label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="bg-transparent text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
