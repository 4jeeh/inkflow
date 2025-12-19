import { LayoutDashboard, Wallet, PiggyBank, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Home", url: "/", icon: LayoutDashboard },
  { title: "Wallet", url: "/wallet", icon: Wallet },
  { title: "Savings", url: "/savings", icon: PiggyBank },
  { title: "Invest", url: "/investment", icon: TrendingUp },
];

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-2 py-2 safe-area-bottom">
      <ul className="flex items-center justify-around">
        {navItems.map((item) => (
          <li key={item.title}>
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}