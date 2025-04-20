
import { cn } from '@/lib/utils';
import { calculateIncomeSplits } from '@/utils/financeSplitting';

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
    <div className="ios-card p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
            isIncome ? "bg-lifeos-soft-green" : "bg-lifeos-soft-pink"
          )}>
            <span className={cn(
              "text-lg font-bold",
              isIncome ? "text-green-600" : "text-red-600"
            )}>
              {isIncome ? '+' : '-'}
            </span>
          </div>
          <div className="mr-3">
            <h4 className="font-medium text-gray-900">{title}</h4>
            <div className="flex text-xs text-gray-500 mt-0.5">
              <span>{date}</span>
              {category && (
                <>
                  <span className="mx-1">•</span>
                  <span>{category}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={cn(
          "font-bold",
          isIncome ? "text-green-600" : "text-red-600"
        )}>
          {isIncome ? '+' : '-'}{amount.toLocaleString()} تومان
        </div>
      </div>
      
      {/* Budget allocation details for income transactions */}
      {isIncome && budgetSplits && (
        <div className="mt-3 grid grid-cols-3 gap-2 border-t pt-3 text-sm">
          <div className="text-center">
            <div className="text-blue-600 font-medium">پس‌انداز (۲۰٪)</div>
            <div className="text-gray-600">{budgetSplits.savings.toLocaleString()} تومان</div>
          </div>
          <div className="text-center">
            <div className="text-purple-600 font-medium">خواسته‌ها (۳۰٪)</div>
            <div className="text-gray-600">{budgetSplits.wants.toLocaleString()} تومان</div>
          </div>
          <div className="text-center">
            <div className="text-green-600 font-medium">نیازها (۵۰٪)</div>
            <div className="text-gray-600">{budgetSplits.needs.toLocaleString()} تومان</div>
          </div>
        </div>
      )}
    </div>
  );
}

