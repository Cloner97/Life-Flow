
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/sonner";

// ساختار یک پروژه جدید
export interface Project {
  id: number;
  title: string;
  description: string;
  progress: number;
  deadline: string;
  status: "in-progress" | "completed";
}

interface CreateProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: Omit<Project, "id">) => void;
}

export function CreateProjectDialog({ isOpen, onClose, onCreateProject }: CreateProjectDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [deadline, setDeadline] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      toast.error("لطفاً عنوان پروژه را وارد کنید");
      return;
    }
    
    if (!deadline) {
      toast.error("لطفاً تاریخ موعد تحویل را وارد کنید");
      return;
    }
    
    const newProject: Omit<Project, "id"> = {
      title,
      description,
      progress,
      deadline,
      status: "in-progress"
    };
    
    onCreateProject(newProject);
    resetForm();
    onClose();
    toast.success("پروژه جدید با موفقیت ایجاد شد");
  };
  
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setProgress(0);
    setDeadline("");
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>ایجاد پروژه جدید</DialogTitle>
          <DialogDescription>
            اطلاعات پروژه جدید خود را وارد کنید.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان پروژه</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان پروژه را وارد کنید"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">توضیحات</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="توضیحات پروژه را وارد کنید"
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="progress">میزان پیشرفت</Label>
              <span className="text-sm text-gray-500">{progress}%</span>
            </div>
            <Slider
              id="progress"
              value={[progress]}
              onValueChange={(value) => setProgress(value[0])}
              max={100}
              step={5}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline">موعد تحویل</Label>
            <Input 
              id="deadline" 
              value={deadline} 
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="مثال: ۱۴۰۴/۰۶/۳۱"
              className="w-full"
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              انصراف
            </Button>
            <Button type="submit" className="bg-lifeos-primary hover:bg-lifeos-secondary">
              ایجاد پروژه
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
