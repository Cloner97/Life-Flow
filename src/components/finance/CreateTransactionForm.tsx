
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

type TransactionFormData = {
  date: Date;
  category: string;
  type: "income" | "expense";
  amount: number;
  description: string;
};

interface CreateTransactionFormProps {
  onSubmit: (data: TransactionFormData) => void;
  onCancel: () => void;
}

const transactionCategories = [
  "درآمد",
  "مواد غذایی",
  "قبوض",
  "تفریح و سرگرمی",
  "مسکن",
  "حمل و نقل",
  "سلامت",
  "آموزش",
  "سایر"
];

export function CreateTransactionForm({ onSubmit, onCancel }: CreateTransactionFormProps) {
  const [date, setDate] = useState<Date>();
  const form = useForm<TransactionFormData>();

  const handleSubmit = (data: TransactionFormData) => {
    onSubmit({
      ...data,
      date: date || new Date(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>تاریخ</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-right font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {date ? format(date, "yyyy/MM/dd") : <span>انتخاب تاریخ</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>دسته‌بندی</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب دسته‌بندی" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transactionCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع تراکنش</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب نوع تراکنش" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="income">درآمد</SelectItem>
                  <SelectItem value="expense">هزینه</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>مبلغ (تومان)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="مبلغ را وارد کنید" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>توضیحات</FormLabel>
              <FormControl>
                <Textarea placeholder="توضیحات تراکنش را وارد کنید" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            انصراف
          </Button>
          <Button type="submit">
            ثبت تراکنش
          </Button>
        </div>
      </form>
    </Form>
  );
}
