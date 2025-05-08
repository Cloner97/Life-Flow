
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BudgetCategory } from '@/hooks/useBudgetCategories';

interface BudgetChartProps {
  categories: BudgetCategory[];
  income: number;
}

export function BudgetChart({ categories, income }: BudgetChartProps) {
  const pieData = categories.map(category => ({
    name: category.name,
    value: category.percentage,
    color: category.color
  }));

  const calculateAmount = (total: number, percentage: number) => {
    return Math.round(total * percentage / 100);
  };

  return (
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
              <TableRow>
                <TableCell className="font-medium">مجموع</TableCell>
                <TableCell>100%</TableCell>
                <TableCell>{income.toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
