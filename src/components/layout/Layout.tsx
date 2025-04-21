
import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export function Layout() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="min-h-screen">
        <div className="container py-6 mx-auto">
          <Outlet />
        </div>
      </main>
      <Toaster />
      <Sonner />
    </div>
  );
}
