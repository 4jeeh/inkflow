import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { FinanceProvider } from "@/context/FinanceContext";
import Index from "./pages/Index";
import WalletPage from "./pages/WalletPage";
import SavingsPage from "./pages/SavingsPage";
import InvestmentPage from "./pages/InvestmentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <FinanceProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/savings" element={<SavingsPage />} />
              <Route path="/investment" element={<InvestmentPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </FinanceProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
