import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { statsData } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: "up" | "down";
  trendValue?: string;
  variant?: "default" | "income" | "expense";
  delay?: number;
}

function StatCard({ title, value, icon: Icon, trend, trendValue, variant = "default", delay = 0 }: StatCardProps) {
  return (
    <Card 
      className="shadow-soft border-0 bg-card animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl lg:text-3xl font-bold text-foreground">
              ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            {trend && trendValue && (
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                trend === "up" ? "text-success" : "text-destructive"
              )}>
                {trend === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center",
            variant === "income" && "bg-success/10",
            variant === "expense" && "bg-destructive/10",
            variant === "default" && "bg-primary/10"
          )}>
            <Icon className={cn(
              "w-6 h-6",
              variant === "income" && "text-success",
              variant === "expense" && "text-destructive",
              variant === "default" && "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      <StatCard
        title="Total Balance"
        value={statsData.totalBalance}
        icon={Wallet}
        trend="up"
        trendValue="+12.5% from last month"
        variant="default"
        delay={0}
      />
      <StatCard
        title="Income this Month"
        value={statsData.monthlyIncome}
        icon={TrendingUp}
        trend="up"
        trendValue="+8.2% from last month"
        variant="income"
        delay={100}
      />
      <StatCard
        title="Expenses this Month"
        value={statsData.monthlyExpenses}
        icon={TrendingDown}
        trend="down"
        trendValue="-5.4% from last month"
        variant="expense"
        delay={200}
      />
    </div>
  );
}