import { LayoutDashboard, Wallet, PiggyBank, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Wallet", url: "/wallet", icon: Wallet },
  { title: "Goals", url: "/savings", icon: PiggyBank },
  { title: "Invest", url: "/investment", icon: TrendingUp },
];

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAF8F5] dark:bg-card border-t-2 border-[#1E1E24] px-2 py-2 safe-area-bottom">
      <ul className="flex items-center justify-around">
        {navItems.map((item) => (
          <li key={item.title}>
            <NavLink
              to={item.url}
              end={item.url === "/"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 border-2",
                  isActive
                    ? "bg-[#FB923C] text-[#1E1E24] border-[#1E1E24] shadow-ink-sm"
                    : "text-[#5C5A66] border-transparent"
                )
              }
            >
              <item.icon className="w-4 h-4" />
              <span>{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
