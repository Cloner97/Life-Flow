
import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BottomNavBar } from './BottomNavBar';

export function Layout() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="min-h-screen pb-16 md:pb-0">
        <div className="container py-6 mx-auto">
          <Outlet />
        </div>
      </main>
      <BottomNavBar />
      <Toaster />
      <Sonner />
    </div>
  );
}
