
import { cn } from '@/lib/utils';
import { calculateIncomeSplits } from '@/utils/financeSplitting';
import { Card, CardContent } from '@/components/ui/card';
import { ReceiptText, ArrowUp, ArrowDown } from 'lucide-react';

interface TransactionCardProps {
  title: string;
  amount: number;
  date: string;
  isIncome?: boolean;
  category?: string;
}

export function TransactionCard({ title, amount, date, isIncome = false, category }: TransactionCardProps) {
  // Calculate budget splits for income transactions
  const budgetSplits = isIncome ? calculateIncomeSplits(amount) : null;

  return (
    <Card className="overflow-hidden border border-gray-100">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
              isIncome ? "bg-lifeos-soft-green" : "bg-lifeos-soft-pink"
            )}>
              {isIncome ? (
                <ArrowUp className="h-5 w-5 text-green-600" />
              ) : (
                <ArrowDown className="h-5 w-5 text-red-600" />
              )}
            </div>
            <div className="mr-4">
              <h4 className="font-medium text-gray-900 text-base">{title}</h4>
              <div className="flex text-xs text-gray-500 mt-1">
                <span>{date}</span>
                {category && (
                  <>
                    <span className="mx-1">•</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">{category}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={cn(
            "font-bold text-lg",
            isIncome ? "text-green-600" : "text-red-600"
          )}>
            {isIncome ? '+' : '-'}{amount.toLocaleString()} تومان
          </div>
        </div>
        
        {/* Budget allocation details for income transactions */}
        {isIncome && budgetSplits && (
          <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-3 text-sm">
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <div className="text-blue-600 font-medium mb-1">پس‌انداز (۲۰٪)</div>
              <div className="text-gray-600">{budgetSplits.savings.toLocaleString()} تومان</div>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded-lg">
              <div className="text-purple-600 font-medium mb-1">خواسته‌ها (۳۰٪)</div>
              <div className="text-gray-600">{budgetSplits.wants.toLocaleString()} تومان</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-green-600 font-medium mb-1">نیازها (۵۰٪)</div>
              <div className="text-gray-600">{budgetSplits.needs.toLocaleString()} تومان</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

