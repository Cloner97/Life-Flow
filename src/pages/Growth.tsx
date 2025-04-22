import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from "@/components/ui/badge";
import { BackButton } from '@/components/ui/BackButton';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { CreateProjectDialog, Project } from '@/components/projects/CreateProjectDialog';

// Sample projects data
const projectsData: Project[] = [
  {
    id: 1,
    title: "طراحی وب‌سایت شخصی",
    description: "ساخت وب‌سایت نمونه کار با استفاده از React و Tailwind CSS",
    progress: 75,
    deadline: "۱۴۰۴/۰۲/۱۵",
    status: "in-progress"
  },
  {
    id: 2,
    title: "یادگیری زبان انگلیسی",
    description: "رسیدن به سطح B2 تا پایان سال",
    progress: 40,
    deadline: "۱۴۰۴/۱۲/۲۹",
    status: "in-progress"
  }
];

const goals = [
  {
    id: 1,
    title: "یادگیری زبان انگلیسی",
    description: "رسیدن به سطح B2 تا پایان سال",
    progress: 40,
    deadline: "۱۴۰۴/۱۲/۲۹",
    category: "آموزش",
    type: "learning"
  },
  {
    id: 2,
    title: "نوشتن کتاب",
    description: "نوشتن کتاب در مورد توسعه نرم‌افزار",
    progress: 10,
    deadline: "۱۴۰۴/۰۹/۳۰",
    category: "خلاقیت",
    type: "goal"
  },
  {
    id: 3,
    title: "خواندن ۲۰ کتاب",
    description: "مطالعه ۲۰ کتاب در حوزه‌های مختلف تا پایان سال",
    progress: 25,
    deadline: "۱۴۰۴/۱۲/۲۹",
    category: "آموزش",
    type: "learning"
  }
];

const habits = [
  {
    id: 1,
    title: "مطالعه روزانه",
    description: "خواندن حداقل ۳۰ دقیقه در روز",
    days: [true, true, false, true, true, false, true],
    category: "یادگیری"
  },
  {
    id: 2,
    title: "مدیتیشن صبحگاهی",
    description: "۱۰ دقیقه مدیتیشن بعد از بیدار شدن",
    days: [true, true, true, true, false, true, false],
    category: "سلامت روان"
  },
  {
    id: 3,
    title: "نوشتن روزانه",
    description: "نوشتن حداقل ۱۵ دقیقه در روز",
    days: [false, true, true, false, true, true, false],
    category: "خلاقیت"
  }
];

export default function Growth() {
  const [activeTab, setActiveTab] = useState("goals");
  const [selectedHabit, setSelectedHabit] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  
  const filteredGoals = activeTab === 'goals' 
    ? goals 
    : activeTab === 'learning' 
      ? goals.filter(g => g.type === 'learning')
      : [];

  const handleCreateProject = (newProject: Omit<Project, "id">) => {
    const maxId = Math.max(...projects.map(project => project.id), 0);
    const projectWithId = { ...newProject, id: maxId + 1 };
    setProjects([...projects, projectWithId]);
  };

  const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">رشد فردی</h1>
        <Button 
          className="bg-lifeos-primary hover:bg-lifeos-secondary"
          onClick={() => {
            if (activeTab === 'projects') {
              setIsProjectDialogOpen(true);
            }
          }}
        >
          {activeTab === 'habits' ? 'عادت جدید' : activeTab === 'projects' ? 'پروژه جدید' : 'هدف جدید'}
        </Button>
      </div>
      
      <Tabs defaultValue="goals" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="goals">اهداف</TabsTrigger>
          <TabsTrigger value="learning">یادگیری</TabsTrigger>
          <TabsTrigger value="habits">عادت‌ها</TabsTrigger>
          <TabsTrigger value="projects">پروژه‌ها</TabsTrigger>
        </TabsList>
        
        <TabsContent value="goals" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGoals.map(goal => (
              <Card key={goal.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <Badge variant="outline">{goal.category}</Badge>
                  </div>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>پیشرفت</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <ProgressBar value={goal.progress} color="bg-lifeos-primary" />
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">موعد: </span>
                      <span className="font-medium">{goal.deadline}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="learning" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGoals.map(goal => (
              <Card key={goal.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <Badge variant="outline">{goal.category}</Badge>
                  </div>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>پیشرفت</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <ProgressBar value={goal.progress} color="bg-blue-500" />
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">موعد: </span>
                      <span className="font-medium">{goal.deadline}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="habits" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habits.map(habit => (
              <Card key={habit.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedHabit(habit.id)}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{habit.title}</CardTitle>
                    <Badge variant="outline">{habit.category}</Badge>
                  </div>
                  <CardDescription>{habit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mt-2">
                    {weekDays.map((day, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xs text-gray-500 mb-1">{day}</div>
                        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${habit.days[i] ? 'bg-lifeos-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                          {habit.days[i] ? '✓' : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-sm text-center text-gray-600">
                    {habit.days.filter(Boolean).length} روز از ۷ روز
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedHabit && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>ثبت عملکرد روزانه</CardTitle>
                <CardDescription>وضعیت امروز را مشخص کنید</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                  <Button variant="outline" className="border-2 border-red-500 hover:bg-red-100">
                    انجام نشد
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    انجام شد
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="projects" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <div key={project.id} onClick={() => setSelectedProject(project.id)}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  progress={project.progress}
                  deadline={project.deadline}
                />
              </div>
            ))}
          </div>

          {selectedProject && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>جزئیات پروژه</CardTitle>
                <CardDescription>مدیریت و بروزرسانی پروژه</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.find(p => p.id === selectedProject) && (
                    <>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">
                          {projects.find(p => p.id === selectedProject)?.title}
                        </h3>
                        <Badge variant="outline">
                          {projects.find(p => p.id === selectedProject)?.status === 'completed' 
                            ? 'تکمیل شده' 
                            : 'در حال انجام'}
                        </Badge>
                      </div>
                      <p className="text-gray-600">
                        {projects.find(p => p.id === selectedProject)?.description}
                      </p>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>پیشرفت</span>
                          <span className="font-medium">
                            {projects.find(p => p.id === selectedProject)?.progress}%
                          </span>
                        </div>
                        <ProgressBar 
                          value={projects.find(p => p.id === selectedProject)?.progress || 0}
                          color="bg-lifeos-primary"
                        />
                      </div>
                      <div className="pt-4 flex justify-end space-x-2 rtl:space-x-reverse">
                        <Button variant="outline" onClick={() => setSelectedProject(null)}>
                          بستن
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <CreateProjectDialog
        isOpen={isProjectDialogOpen}
        onClose={() => setIsProjectDialogOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
}
