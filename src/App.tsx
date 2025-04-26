
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Health from "./pages/Health";
import Growth from "./pages/Growth";
import Relationships from "./pages/Relationships";
import NotFound from "./pages/NotFound";

// Finance sub-pages
import Transactions from "./pages/finance/Transactions";
import Budget from "./pages/finance/Budget";
import Assets from "./pages/finance/Assets";
import Reports from "./pages/finance/Reports";

// Growth sub-pages
import Today from "./pages/growth/Today";
import Tools from "./pages/growth/Tools";
import Routines from "./pages/growth/Routines";

// Health sub-pages
import Sleep from "./pages/health/Sleep";
import Food from "./pages/health/Food";
import Meditation from "./pages/health/Meditation";
import Medical from "./pages/health/Medical";

// Relationships sub-pages
import Contacts from "./pages/relationships/Contacts";
import Events from "./pages/relationships/Events";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            
            {/* Finance routes */}
            <Route path="/finance" element={<Finance />} />
            <Route path="/finance/transactions" element={<Transactions />} />
            <Route path="/finance/budget" element={<Budget />} />
            <Route path="/finance/assets" element={<Assets />} />
            <Route path="/finance/reports" element={<Reports />} />
            
            {/* Growth routes */}
            <Route path="/growth" element={<Growth />} />
            <Route path="/growth/today" element={<Today />} />
            <Route path="/growth/tools" element={<Tools />} />
            <Route path="/growth/routines" element={<Routines />} />
            
            {/* Health routes */}
            <Route path="/health" element={<Health />} />
            <Route path="/health/sleep" element={<Sleep />} />
            <Route path="/health/food" element={<Food />} />
            <Route path="/health/meditation" element={<Meditation />} />
            <Route path="/health/medical" element={<Medical />} />
            
            {/* Relationships routes */}
            <Route path="/relationships" element={<Relationships />} />
            <Route path="/relationships/contacts" element={<Contacts />} />
            <Route path="/relationships/events" element={<Events />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
