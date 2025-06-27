import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeCustomizer from "./pages/ThemeCustomizer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<ThemeProvider>
  <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Routes>


            <Route path="/" element={<ThemeCustomizer />} />
            {/* catch-all */}
            <Route path="*" element={<NotFound />} />


          </Routes>
      </BrowserRouter>
      </TooltipProvider>
  </QueryClientProvider>
</ThemeProvider>
);

export default App;