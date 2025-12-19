import { Moon, Sun, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function DashboardHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between h-16 px-4 lg:px-8 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground hidden sm:block">
          Welcome back, John! Here's your financial overview.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-xl hover:bg-accent"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-xl hover:bg-accent"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>
      </div>
    </header>
  );
}