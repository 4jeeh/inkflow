import { Moon, Sun, PlusCircle, RotateCcw, Sparkles } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useFinance } from "@/context/FinanceContext";
import { useLocation, useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  onQuickAddClick?: () => void;
}

const ROUTE_META: Record<string, { title: string; subtitle: string; tag: string }> = {
  "/": {
    title: "Editorial Cash Ledger",
    subtitle: "Ringkasan arus kas, coretan anotasi, dan transaksi harian Jiddan Ibnu Ali (@4jeeh).",
    tag: "EDISI JANUARI",
  },
  "/wallet": {
    title: "Abstract Doodle Wallets",
    subtitle: "Kartu multi-kantong dengan ilustrasi abstrak, transfer instan, & rincian saldo.",
    tag: "KANTONG AKTIF",
  },
  "/savings": {
    title: "Saving Goals & Sticky Targets",
    subtitle: "Target tabungan kreatif lengkap dengan progres garis tinta & catatan tempel.",
    tag: "TARGET IMPIAN",
  },
  "/investment": {
    title: "Portfolio & Asset Sketch",
    subtitle: "Alokasi instrumen jangka panjang, imbal hasil, dan disiplin investasi bulanan.",
    tag: "ASET & ETF",
  },
};

export function DashboardHeader({ onQuickAddClick }: DashboardHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { resetDemoData } = useFinance();
  const location = useLocation();
  const navigate = useNavigate();

  const currentMeta = ROUTE_META[location.pathname] || ROUTE_META["/"];

  const handleQuickAdd = () => {
    if (onQuickAddClick) {
      onQuickAddClick();
      return;
    }
    if (location.pathname !== "/") {
      navigate("/#quick-entry");
    } else {
      const el = document.getElementById("quick-entry-input");
      if (el) el.focus();
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 py-4 px-4 lg:px-8 border-b-2 border-[#1E1E24] dark:border-border bg-[#FAF8F5]/95 dark:bg-card/95 backdrop-blur-sm sticky top-0 z-20">
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 text-xs font-bold bg-[#DBEAFE] text-[#1E1E24] border border-[#1E1E24] rounded-md">
            {currentMeta.tag}
          </span>
          <span className="font-hand text-lg font-bold text-[#9A3412] dark:text-[#FB923C] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Jurnal @4jeeh
          </span>
        </div>
        <h1 className="text-xl lg:text-2xl font-extrabold tracking-tight text-[#1E1E24] dark:text-foreground mt-0.5">
          {currentMeta.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5A66] dark:text-muted-foreground hidden sm:block">
          {currentMeta.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={handleQuickAdd}
          className="ink-button inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FB923C] text-[#1E1E24] text-xs sm:text-sm font-bold"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Catat Transaksi</span>
        </button>

        <button
          type="button"
          onClick={resetDemoData}
          title="Reset ke Data Awal"
          className="ink-button inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-[#FFFDF9] dark:bg-secondary text-[#1E1E24] dark:text-foreground text-xs font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Reset Demo</span>
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === "light" ? "Mode Buku Sketsa Gelap" : "Mode Kertas Cream Hangat"}
          className="ink-button p-2 rounded-xl bg-[#FFFDF9] dark:bg-secondary text-[#1E1E24] dark:text-foreground"
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4 text-[#FB923C]" />
          )}
        </button>
      </div>
    </header>
  );
}
