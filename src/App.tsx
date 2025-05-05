
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

// Growth Tools sub-pages
import GoalJournal from "./pages/growth/tools/GoalJournal";
import HabitTracker from "./pages/growth/tools/HabitTracker";
import BulletJournal from "./pages/growth/tools/BulletJournal";
import MindMapping from "./pages/growth/tools/MindMapping";
import Microlearning from "./pages/growth/tools/Microlearning";
import DecisionMaking from "./pages/growth/tools/DecisionMaking";
import WeeklyReview from "./pages/growth/tools/WeeklyReview";
import MeditationTool from "./pages/growth/tools/MeditationTool";
import ThirtyDayChallenge from "./pages/growth/tools/ThirtyDayChallenge";
import DailyScore from "./pages/growth/tools/DailyScore";

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
            <Route path="/growth/tools" element={<Tools />} />
            <Route path="/growth/routines" element={<Routines />} />
            <Route path="/growth/tools/goal-journal" element={<GoalJournal />} />
            <Route path="/growth/tools/habit-tracker" element={<HabitTracker />} />
            <Route path="/growth/tools/bullet-journal" element={<BulletJournal />} />
            <Route path="/growth/tools/mind-mapping" element={<MindMapping />} />
            <Route path="/growth/tools/microlearning" element={<Microlearning />} />
            <Route path="/growth/tools/decision-making" element={<DecisionMaking />} />
            <Route path="/growth/tools/weekly-review" element={<WeeklyReview />} />
            <Route path="/growth/tools/meditation" element={<MeditationTool />} />
            <Route path="/growth/tools/thirty-day-challenge" element={<ThirtyDayChallenge />} />
            <Route path="/growth/tools/daily-score" element={<DailyScore />} />
            
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
