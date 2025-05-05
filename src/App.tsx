
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import CallUpload from "./pages/CallUpload";
import MeetingSummaries from "./pages/MeetingSummaries";
import LeadScoring from "./pages/LeadScoring";
import EmailGenerator from "./pages/EmailGenerator";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

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
            <Route path="/calls" element={<CallUpload />} />
            <Route path="/summaries" element={<MeetingSummaries />} />
            <Route path="/leads" element={<LeadScoring />} />
            <Route path="/emails" element={<EmailGenerator />} />
            <Route path="/analytics" element={<SentimentAnalysis />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
