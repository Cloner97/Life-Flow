
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export function Layout() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container py-6 mx-auto">
          <Outlet />
        </div>
      </main>
      <Toaster />
      <Sonner />
    </div>
  );
}
