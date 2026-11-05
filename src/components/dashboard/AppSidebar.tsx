import {
  LayoutDashboard,
  Wallet,
  PiggyBank,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Feather,
  ExternalLink,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InkflowMark, WavyUnderline } from "@/components/doodles/DoodleElements";
import { useFinance } from "@/context/FinanceContext";

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const { wallets, goals, transactions } = useFinance();

  const navItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      badge: `${transactions.length}`,
    },
    {
      title: "Wallet",
      url: "/wallet",
      icon: Wallet,
      badge: `${wallets.length} cards`,
    },
    {
      title: "Saving Goals",
      url: "/savings",
      icon: PiggyBank,
      badge: `${goals.length}`,
    },
    {
      title: "Investment",
      url: "/investment",
      icon: TrendingUp,
      badge: "Active",
    },
  ];

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col h-screen sticky top-0 bg-[#F3EFE6] dark:bg-sidebar border-r-2 border-[#1E1E24] dark:border-border transition-all duration-300 ease-in-out z-30 select-none",
        collapsed ? "w-20" : "w-68"
      )}
      style={{ width: collapsed ? "5rem" : "17rem" }}
    >
      {/* Brand Header */}
      <div
        className={cn(
          "flex items-center h-20 px-5 border-b-2 border-[#1E1E24] dark:border-border bg-[#FAF8F5] dark:bg-card",
          collapsed ? "justify-center px-2" : "justify-start gap-3.5"
        )}
      >
        <InkflowMark className="w-10 h-10" />
        {!collapsed && (
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#1E1E24] dark:text-foreground">
                inkflow
              </span>
              <span className="px-1.5 py-0.5 text-[11px] font-bold tracking-normal bg-[#FB923C] text-[#1E1E24] border border-[#1E1E24] rounded">
                v2.4
              </span>
            </div>
            <span className="font-hand text-base text-[#5C5A66] dark:text-muted-foreground -mt-1">
              hand-drawn finance ledger
            </span>
          </div>
        )}
      </div>

      {/* Navigation Group */}
      <nav className="flex-1 py-6 px-3.5 space-y-6 overflow-y-auto">
        <div>
          {!collapsed && (
            <div className="px-3 mb-2.5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C5A66] dark:text-muted-foreground">
                Menu Buku Kas
              </span>
              <Feather className="w-3.5 h-3.5 text-[#FB923C]" />
            </div>
          )}
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  end={item.url === "/"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 border-2",
                      collapsed && "justify-center px-2.5",
                      isActive
                        ? "bg-[#1E1E24] text-[#FAF8F5] border-[#1E1E24] shadow-[2.5px_2.5px_0px_0px_#FB923C]"
                        : "bg-transparent text-[#1E1E24] dark:text-foreground border-transparent hover:bg-[#FAF8F5] dark:hover:bg-accent hover:border-[#1E1E24]"
                    )
                  }
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {!collapsed && <span className="truncate">{item.title}</span>}
                  </div>
                  {!collapsed && item.badge && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#1E1E24] border border-[#1E1E24] tabular-nums">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Mini Editorial Doodle Callout inside Sidebar */}
        {!collapsed && (
          <div className="mx-1 p-3.5 rounded-xl bg-[#FEF3C7] border-2 border-[#1E1E24] shadow-[2.5px_2.5px_0px_0px_#1E1E24] relative">
            <div className="flex items-center justify-between mb-1">
              <span className="font-sketch text-[11px] font-bold uppercase tracking-wider text-[#1E1E24]">
                Prinsip Inkflow
              </span>
              <span className="w-2 h-2 rounded-full bg-[#84CC16] border border-[#1E1E24]" />
            </div>
            <p className="font-hand text-lg leading-tight text-[#1E1E24] font-semibold">
              "Setiap rupiah & dolar punya cerita di atas kertas."
            </p>
            <WavyUnderline className="mt-1 h-2.5" color="#FB923C" />
          </div>
        )}
      </nav>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3.5 top-24 w-7 h-7 rounded-full bg-[#FAF8F5] text-[#1E1E24] border-2 border-[#1E1E24] shadow-ink-sm hover:bg-[#FB923C] hover:text-[#1E1E24]"
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </Button>

      {/* Profile Footer: Jiddan Ibnu Ali (@4jeeh) */}
      <div
        className={cn(
          "p-4 border-t-2 border-[#1E1E24] dark:border-border bg-[#FAF8F5] dark:bg-card",
          collapsed && "flex justify-center p-3"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}
        >
          <div className="relative w-10 h-10 rounded-xl bg-[#FB923C] border-2 border-[#1E1E24] shadow-ink-sm flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-extrabold text-[#1E1E24] tracking-tight">
              JI
            </span>
            <span
              className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#84CC16] border-2 border-[#1E1E24]"
              title="Active Ledger"
            />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1E1E24] dark:text-foreground truncate">
                Jiddan Ibnu Ali
              </p>
              <a
                href="https://github.com/4jeeh"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#1D4ED8] hover:underline truncate"
              >
                <span>@4jeeh</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
