import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EnergyTest from "./pages/EnergyTest";
import Masters from "./pages/Masters";
import Training from "./pages/Training";
import Transformation from "./pages/Transformation";
import MasterPublic from "./pages/MasterPublic";
import Login from "./pages/Login";
import MasterDashboard from "./pages/MasterDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/test" element={<EnergyTest />} />
          <Route path="/masters" element={<Masters />} />
          <Route path="/master/:id" element={<MasterPublic />} />
          <Route path="/training" element={<Training />} />
          <Route path="/transformation" element={<Transformation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/master-dashboard" element={<MasterDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
