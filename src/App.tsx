
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PatientView from "./pages/PatientView";
import ClinicalDocumentation from "./pages/ClinicalDocumentation";
import Analytics from "./pages/Analytics";
import Prescriptions from "./pages/Prescriptions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/patients/:patientId" element={<PatientView />} />
            <Route path="/clinical/:patientId" element={<ClinicalDocumentation />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/prescriptions/:patientId" element={<Prescriptions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
