import React, { useState } from "react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

interface AppShellProps {
  children: React.ReactNode;
  onQuickAddClick?: () => void;
}

export function AppShell({ children, onQuickAddClick }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground w-full">
      {/* Desktop Sidebar */}
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onQuickAddClick={onQuickAddClick} />

        <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6 lg:space-y-7">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
