
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  title: z.string().min(2, "عنوان باید حداقل ۲ کاراکتر باشد"),
  date: z.string(),
  contact: z.string(),
  description: z.string(),
  type: z.string()
})

export function CreateEventDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: "",
      contact: "",
      description: "",
      type: "meeting"
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here we would add the event to the database
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lifeos-primary hover:bg-lifeos-secondary">
          رویداد جدید
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>افزودن رویداد جدید</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاریخ</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مخاطب مرتبط</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-4">
              <Button type="submit">ذخیره</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
