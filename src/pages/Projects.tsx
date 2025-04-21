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
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CreateProjectDialog, Project } from '@/components/projects/CreateProjectDialog';
import { toast } from "@/components/ui/sonner";
import { BackButton } from '@/components/ui/BackButton';

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
  },
  {
    id: 3,
    title: "تناسب اندام",
    description: "کاهش وزن و بهبود سلامت عمومی بدن",
    progress: 25,
    deadline: "۱۴۰۴/۰۶/۳۱",
    status: "in-progress"
  },
  {
    id: 4,
    title: "نوشتن کتاب",
    description: "نوشتن کتاب در مورد توسعه نرم‌افزار",
    progress: 10,
    deadline: "۱۴۰۴/۰۹/۳۰",
    status: "in-progress"
  },
  {
    id: 5,
    title: "بازسازی اتاق",
    description: "تغییر دکوراسیون و بازسازی اتاق کار",
    progress: 100,
    deadline: "۱۴۰۳/۱۲/۱۵",
    status: "completed"
  },
  {
    id: 6,
    title: "یادگیری آشپزی",
    description: "آموزش پخت غذاهای سنتی ایرانی",
    progress: 100,
    deadline: "۱۴۰۳/۱۱/۲۰",
    status: "completed"
  }
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"in-progress" | "completed">("in-progress");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const filteredProjects = projects.filter(project => project.status === activeTab);
  const selectedProjectData = projects.find(project => project.id === selectedProject);
  
  const handleCreateProject = (newProject: Omit<Project, "id">) => {
    const maxId = Math.max(...projects.map(project => project.id), 0);
    const projectWithId = { ...newProject, id: maxId + 1 };
    
    setProjects([...projects, projectWithId]);
  };
  
  const handleDeleteProject = () => {
    if (!selectedProject) return;
    
    const updatedProjects = projects.filter(project => project.id !== selectedProject);
    setProjects(updatedProjects);
    setSelectedProject(null);
    toast.success("پروژه با موفقیت حذف شد");
  };
  
  const handleUpdateProjectStatus = () => {
    if (!selectedProject) return;
    
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject) {
        const newStatus: "in-progress" | "completed" = project.status === "in-progress" ? "completed" : "in-progress";
        const newProgress = newStatus === "completed" ? 100 : project.progress;
        return { ...project, status: newStatus, progress: newProgress };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setSelectedProject(null);
    toast.success("وضعیت پروژه با موفقیت ��ه‌روزرسانی شد");
  };
  
  const handleTabChange = (value: string) => {
    if (value === "in-progress" || value === "completed") {
      setActiveTab(value);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">پروژه‌ها</h1>
        <Button 
          className="bg-lifeos-primary hover:bg-lifeos-secondary"
          onClick={() => setIsDialogOpen(true)}
        >
          پروژه جدید
        </Button>
      </div>
      
      <Tabs defaultValue="in-progress" onValueChange={handleTabChange}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="in-progress">در حال انجام</TabsTrigger>
          <TabsTrigger value="completed">تکمیل شده</TabsTrigger>
        </TabsList>
        
        <TabsContent value="in-progress">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filteredProjects.map(project => (
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
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filteredProjects.map(project => (
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
        </TabsContent>
      </Tabs>
      
      {selectedProjectData && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{selectedProjectData.title}</CardTitle>
                <CardDescription className="mt-1">{selectedProjectData.description}</CardDescription>
              </div>
              <Badge className={selectedProjectData.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                {selectedProjectData.status === 'completed' ? 'تکمیل شده' : 'در حال انجام'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-gray-700">میزان پیشرفت</span>
                  <span className="font-medium">{selectedProjectData.progress}%</span>
                </div>
                <ProgressBar value={selectedProjectData.progress} size="lg" color="bg-lifeos-primary" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="border rounded-lg p-3">
                  <h3 className="text-sm text-gray-700">موعد تحویل</h3>
                  <p className="font-semibold mt-1">{selectedProjectData.deadline}</p>
                </div>
                <div className="border rounded-lg p-3">
                  <h3 className="text-sm text-gray-700">وضعیت</h3>
                  <p className="font-semibold mt-1">
                    {selectedProjectData.status === 'completed' ? 'تکمیل شده' : 'در حال انجام'}
                  </p>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedProject(null)}>
                  بستن
                </Button>
                <Button 
                  variant="outline" 
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-700"
                  onClick={handleDeleteProject}
                >
                  حذف پروژه
                </Button>
                <Button 
                  className={selectedProjectData.status === 'completed' 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-green-500 hover:bg-green-600'}
                  onClick={handleUpdateProjectStatus}
                >
                  {selectedProjectData.status === 'completed' 
                    ? 'برگرداندن به در حال انجام' 
                    : 'تکمیل پروژه'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <CreateProjectDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
}
