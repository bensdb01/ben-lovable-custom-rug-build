
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RugBuilder from "./components/RugBuilder";
import { RugDataProvider } from "./components/RugDataProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen bg-background">
        <RugDataProvider>
          <RugBuilder />
        </RugDataProvider>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
