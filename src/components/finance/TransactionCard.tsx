
import { cn } from '@/lib/utils';

interface TransactionCardProps {
  title: string;
  amount: number;
  date: string;
  isIncome?: boolean;
  category?: string;
}

export function TransactionCard({ title, amount, date, isIncome = false, category }: TransactionCardProps) {
  return (
    <div className="ios-card p-3 flex justify-between items-center">
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
  );
}
