
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientView from "./pages/PatientView";
import Appointments from "./pages/Appointments";
import Clinical from "./pages/Clinical";
import ClinicalDocumentation from "./pages/ClinicalDocumentation";
import LabTest from "./pages/LabTest";
import Prescriptions from "./pages/Prescriptions";
import Vitals from "./pages/Vitals";
import Documents from "./pages/Documents";
import Analytics from "./pages/Analytics";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
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
            <Route path="/" element={<Index />}>
              <Route index element={<Dashboard />} />
              <Route path="patients" element={<Patients />} />
              <Route path="patients/:patientId" element={<PatientView />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="clinical" element={<Clinical />} />
              <Route path="clinical/:patientId" element={<ClinicalDocumentation />} />
              <Route path="lab-test" element={<LabTest />} />
              <Route path="prescriptions" element={<Prescriptions />} />
              <Route path="prescriptions/:patientId" element={<Prescriptions />} />
              <Route path="vitals" element={<Vitals />} />
              <Route path="documents" element={<Documents />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="messages" element={<Messages />} />
              <Route path="settings" element={<Settings />} />
              <Route path="help" element={<Help />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
