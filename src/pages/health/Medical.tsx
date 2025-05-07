
import { useState } from 'react';
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar, FileUp, ExternalLink, User, Users } from 'lucide-react';
import { useForm } from "react-hook-form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const healthNavItems = [
  { name: "خواب", path: "sleep", emoji: "😴" },
  { name: "غذا", path: "food", emoji: "🍎" },
  { name: "مدیتیشن", path: "meditation", emoji: "🧘" },
  { name: "پزشکی", path: "medical", emoji: "🏥" },
];

// Sample medical reports by body system
const medicalReports = [
  {
    id: 1,
    system: "قلب و عروق",
    reports: [
      { date: "1403/01/15", title: "نوار قلب", doctor: "دکتر محمدی", status: "نرمال", notes: "ضربان قلب منظم، فشار خون: 120/80" },
      { date: "1402/08/24", title: "اکوکاردیوگرافی", doctor: "دکتر رضایی", status: "نرمال", notes: "عملکرد قلب نرمال، دریچه‌ها سالم" }
    ]
  },
  {
    id: 2,
    system: "سیستم تنفسی",
    reports: [
      { date: "1402/11/05", title: "اسپیرومتری", doctor: "دکتر کریمی", status: "نیاز به پیگیری", notes: "ظرفیت تنفسی کمی پایین است، نیاز به بررسی بیشتر" }
    ]
  },
  {
    id: 3,
    system: "سیستم گوارش",
    reports: [
      { date: "1402/09/12", title: "آندوسکوپی", doctor: "دکتر احمدی", status: "نرمال", notes: "بدون مشکل خاص" }
    ]
  },
  {
    id: 4,
    system: "سیستم عضلانی-اسکلتی",
    reports: [
      { date: "1402/07/18", title: "رادیوگرافی زانو", doctor: "دکتر جعفری", status: "نیاز به درمان", notes: "ساییدگی مختصر غضروف زانوی راست" },
      { date: "1402/06/30", title: "تراکم استخوان", doctor: "دکتر حسینی", status: "نرمال", notes: "تراکم استخوان در محدوده سنی نرمال" }
    ]
  }
];

// Doctor appointment options
const doctorAppointments = [
  { id: 1, name: "دکتر محمدی", specialty: "متخصص قلب", location: "کلینیک سلامت", website: "https://doctorto.com/dr-mohammadi" },
  { id: 2, name: "دکتر رضایی", specialty: "متخصص داخلی", location: "بیمارستان امید", website: "https://doctorto.com/dr-rezaei" },
  { id: 3, name: "دکتر کریمی", specialty: "متخصص ریه", location: "کلینیک نفس", website: "https://doctorto.com/dr-karimi" },
  { id: 4, name: "دکتر احمدی", specialty: "متخصص گوارش", location: "بیمارستان مهر", website: "https://doctorto.com/dr-ahmadi" },
  { id: 5, name: "دکتر جعفری", specialty: "متخصص ارتوپدی", location: "کلینیک حرکت", website: "https://doctorto.com/dr-jafari" },
];

// Sample uploaded documents
const initialDocuments = [
  { id: 1, title: "نتایج آزمایش خون", date: "1402/12/15", type: "آزمایش", owner: "خودم", fileType: "PDF" },
  { id: 2, title: "سونوگرافی", date: "1402/09/23", type: "تصویربرداری", owner: "خودم", fileType: "JPEG" },
  { id: 3, title: "نتایج آزمایش قند", date: "1402/10/05", type: "آزمایش", owner: "همسر", fileType: "PDF" },
];

export default function Medical() {
  const [activeTab, setActiveTab] = useState("reports");
  const [documents, setDocuments] = useState(initialDocuments);
  const [familyMember, setFamilyMember] = useState("خودم");

  const form = useForm({
    defaultValues: {
      title: "",
      type: "",
      owner: "خودم",
    }
  });

  const handleDocumentUpload = (data) => {
    const newDocument = {
      id: documents.length + 1,
      title: data.title,
      date: new Date().toLocaleDateString("fa-IR"),
      type: data.type,
      owner: data.owner,
      fileType: "PDF"
    };
    
    setDocuments([...documents, newDocument]);
    form.reset();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">سلامتی</h1>
      </div>
      
      <SectionNavBar items={healthNavItems} baseRoute="/health" />
      
      <Card>
        <CardHeader>
          <CardTitle>مدیریت سلامت</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="reports">گزارشات پزشکی</TabsTrigger>
              <TabsTrigger value="appointments">نوبت دهی</TabsTrigger>
              <TabsTrigger value="documents">مدارک پزشکی</TabsTrigger>
            </TabsList>
            
            {/* Medical Reports Section */}
            <TabsContent value="reports" className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {medicalReports.map((system) => (
                  <AccordionItem key={system.id} value={`item-${system.id}`}>
                    <AccordionTrigger className="text-lg font-medium">
                      {system.system}
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>تاریخ</TableHead>
                            <TableHead>عنوان</TableHead>
                            <TableHead>پزشک</TableHead>
                            <TableHead>وضعیت</TableHead>
                            <TableHead>توضیحات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {system.reports.map((report, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{report.date}</TableCell>
                              <TableCell>{report.title}</TableCell>
                              <TableCell>{report.doctor}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  report.status === "نرمال" 
                                    ? "bg-green-100 text-green-800" 
                                    : report.status === "نیاز به پیگیری"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {report.status}
                                </span>
                              </TableCell>
                              <TableCell>{report.notes}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            {/* Doctor Appointments Section */}
            <TabsContent value="appointments" className="space-y-4">
              <p className="text-gray-600 mb-4">برای گرفتن نوبت با یکی از پزشکان زیر، روی دکمه نوبت‌دهی کلیک کنید:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctorAppointments.map((doctor) => (
                  <Card key={doctor.id} className="overflow-hidden">
                    <CardHeader className="bg-lifeos-soft-blue py-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{doctor.name}</span>
                        <span className="text-sm font-normal">{doctor.specialty}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center text-sm mb-2">
                        <Calendar className="w-4 h-4 mr-2 ml-2" />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button asChild variant="outline" className="mr-2">
                          <a href={doctor.website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <ExternalLink className="w-4 h-4 ml-2" />
                            مشاهده پروفایل
                          </a>
                        </Button>
                        <Button asChild>
                          <a href={doctor.website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <Calendar className="w-4 h-4 ml-2" />
                            نوبت‌دهی
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Medical Documents Section */}
            <TabsContent value="documents" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">مدارک پزشکی</h3>
                  <p className="text-sm text-gray-500">مدارک پزشکی خود و خانواده را اینجا آپلود و مدیریت کنید.</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <FileUp className="w-4 h-4 ml-2" />
                      آپلود مدرک جدید
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>آپلود مدرک پزشکی جدید</DialogTitle>
                      <DialogDescription>
                        مشخصات مدرک پزشکی جدید را وارد کنید.
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleDocumentUpload)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>عنوان مدرک</FormLabel>
                              <FormControl>
                                <Input placeholder="مثال: آزمایش خون" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>نوع مدرک</FormLabel>
                              <FormControl>
                                <Input placeholder="مثال: آزمایش، تصویربرداری، نسخه" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="owner"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>متعلق به</FormLabel>
                              <FormControl>
                                <select
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  {...field}
                                >
                                  <option value="خودم">خودم</option>
                                  <option value="همسر">همسر</option>
                                  <option value="فرزند">فرزند</option>
                                  <option value="پدر/مادر">پدر/مادر</option>
                                </select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormItem>
                          <FormLabel>انتخاب فایل</FormLabel>
                          <FormControl>
                            <Input type="file" />
                          </FormControl>
                        </FormItem>
                        <DialogFooter>
                          <Button type="submit">ذخیره</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="flex space-x-2 rtl:space-x-reverse mb-4">
                <Button 
                  variant={familyMember === "خودم" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFamilyMember("خودم")}
                  className="flex items-center"
                >
                  <User className="w-4 h-4 ml-2" />
                  خودم
                </Button>
                <Button 
                  variant={familyMember === "همسر" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFamilyMember("همسر")}
                  className="flex items-center"
                >
                  <Users className="w-4 h-4 ml-2" />
                  همسر
                </Button>
                <Button 
                  variant={familyMember === "فرزند" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFamilyMember("فرزند")}
                  className="flex items-center"
                >
                  <Users className="w-4 h-4 ml-2" />
                  فرزند
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setFamilyMember(null)}
                  className="flex items-center"
                >
                  همه
                </Button>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>عنوان</TableHead>
                      <TableHead>تاریخ</TableHead>
                      <TableHead>نوع</TableHead>
                      <TableHead>متعلق به</TableHead>
                      <TableHead>فرمت</TableHead>
                      <TableHead className="text-left">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents
                      .filter(doc => !familyMember || doc.owner === familyMember)
                      .map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.title}</TableCell>
                          <TableCell>{doc.date}</TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{doc.owner}</TableCell>
                          <TableCell>{doc.fileType}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="mr-2">دانلود</Button>
                            <Button variant="outline" size="sm">مشاهده</Button>
                          </TableCell>
                        </TableRow>
                    ))}
                    {documents.filter(doc => !familyMember || doc.owner === familyMember).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          مدرکی برای نمایش وجود ندارد
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
