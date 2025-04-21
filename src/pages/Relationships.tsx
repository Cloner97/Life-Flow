import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateContactDialog } from '@/components/relationships/CreateContactDialog';
import { CreateEventDialog } from '@/components/relationships/CreateEventDialog';
import { BackButton } from '@/components/ui/BackButton';

// Sample data
const contacts = [
  {
    id: 1,
    name: "علی محمدی",
    relationship: "دوست",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "ali@example.com",
    birthdate: "۱۳۷۵/۰۴/۱۲",
    notes: "دوست دانشگاه، علاقه‌مند به موسیقی و فیلم",
    category: "friends"
  },
  {
    id: 2,
    name: "مریم احمدی",
    relationship: "همکار",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "maryam@example.com",
    birthdate: "۱۳۷۰/۰۷/۲۴",
    notes: "همکار در پروژه‌ی X، متخصص بازاریابی",
    category: "work"
  },
  {
    id: 3,
    name: "رضا کریمی",
    relationship: "خانواده",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "reza@example.com",
    birthdate: "۱۳۶۵/۰۱/۰۵",
    notes: "پسر عمو، پزشک",
    category: "family"
  },
  {
    id: 4,
    name: "سارا حسینی",
    relationship: "دوست",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "sara@example.com",
    birthdate: "۱۳۷۸/۱۰/۱۸",
    notes: "دوست دوران مدرسه، معلم زبان انگلیسی",
    category: "friends"
  }
];

const events = [
  {
    id: 1,
    title: "تولد علی",
    date: "۱۴۰۴/۰۴/۱۲",
    contact: "علی محمدی",
    description: "جشن تولد در رستوران X",
    type: "birthday"
  },
  {
    id: 2,
    title: "ناهار کاری",
    date: "۱۴۰۴/۰۲/۲۰",
    contact: "مریم احمدی",
    description: "ناهار کاری برای بحث در مورد پروژه‌ی جدید",
    type: "meeting"
  },
  {
    id: 3,
    title: "دیدار خانوادگی",
    date: "۱۴۰۴/۰۳/۱۵",
    contact: "رضا کریمی",
    description: "دورهمی خانوادگی در خانه‌ی رضا",
    type: "gathering"
  }
];

export default function Relationships() {
  const [activeTab, setActiveTab] = useState("contacts");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  
  const filteredContacts = selectedCategory === 'all' 
    ? contacts 
    : contacts.filter(contact => contact.category === selectedCategory);
  
  const selectedContactData = contacts.find(contact => contact.id === selectedContact);
  
  const relationshipColors: Record<string, string> = {
    "دوست": "bg-blue-100 text-blue-800",
    "همکار": "bg-green-100 text-green-800",
    "خانواده": "bg-purple-100 text-purple-800"
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">روابط</h1>
        {activeTab === 'contacts' ? <CreateContactDialog /> : <CreateEventDialog />}
      </div>
      
      <Tabs defaultValue="contacts" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="contacts">مخاطبین</TabsTrigger>
          <TabsTrigger value="events">رویدادها</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contacts" className="mt-6">
          <div className="mb-4">
            <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
              <TabsList className="inline-flex">
                <TabsTrigger value="all">همه</TabsTrigger>
                <TabsTrigger value="friends">دوستان</TabsTrigger>
                <TabsTrigger value="family">خانواده</TabsTrigger>
                <TabsTrigger value="work">کار</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredContacts.map(contact => (
              <Card key={contact.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedContact(contact.id)}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <Badge 
                      className={relationshipColors[contact.relationship] || "bg-gray-100 text-gray-800"}
                    >
                      {contact.relationship}
                    </Badge>
                  </div>
                  <CardDescription>{contact.phone}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <div>
                      <span className="text-gray-500">ایمیل: </span>
                      <span>{contact.email}</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-gray-500">تاریخ تولد: </span>
                      <span>{contact.birthdate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedContactData && (
            <Card className="mt-8">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-xl">{selectedContactData.name}</CardTitle>
                  <Badge 
                    className={relationshipColors[selectedContactData.relationship] || "bg-gray-100 text-gray-800"}
                  >
                    {selectedContactData.relationship}
                  </Badge>
                </div>
                <CardDescription>{selectedContactData.phone}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-700 font-medium">ایمیل: </span>
                      <span>{selectedContactData.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-700 font-medium">تاریخ تولد: </span>
                      <span>{selectedContactData.birthdate}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-700 font-medium mb-1">یادداشت‌ها:</h3>
                    <p className="text-gray-600">{selectedContactData.notes}</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="text-gray-700 font-medium mb-2">رویدادهای مرتبط:</h3>
                  <div className="space-y-2">
                    {events
                      .filter(event => event.contact === selectedContactData.name)
                      .map(event => (
                        <div key={event.id} className="flex justify-between p-2 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-gray-600">{event.date}</div>
                          </div>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedContact(null)}>
                    بستن
                  </Button>
                  <Button className="bg-lifeos-primary hover:bg-lifeos-secondary">
                    ویرایش مخاطب
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="events" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map(event => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <CardDescription>{event.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-700">مخاطب: </span>
                      <span className="font-medium">{event.contact}</span>
                    </div>
                    <div>
                      <span className="text-gray-700">توضیحات: </span>
                      <span>{event.description}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button size="sm" className="bg-lifeos-primary hover:bg-lifeos-secondary">
                      جزئیات بیشتر
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
