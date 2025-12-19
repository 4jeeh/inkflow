import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { transactions } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

export function RecentTransactions() {
  return (
    <Card className="shadow-soft border-0 bg-card animate-fade-in" style={{ animationDelay: "400ms" }}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activity</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[400px] overflow-y-auto">
          <ul className="divide-y divide-border">
            {transactions.slice(0, 8).map((transaction, index) => {
              const Icon = transaction.icon;
              return (
                <li 
                  key={transaction.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-accent/50 transition-colors duration-200"
                  style={{ animationDelay: `${500 + index * 50}ms` }}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                    transaction.type === "income" ? "bg-success/10" : "bg-muted"
                  )}>
                    <Icon className={cn(
                      "w-5 h-5",
                      transaction.type === "income" ? "text-success" : "text-muted-foreground"
                    )} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.category} • {format(parseISO(transaction.date), "MMM d, yyyy")}
                    </p>
                  </div>
                  
                  <div className={cn(
                    "text-sm font-semibold tabular-nums",
                    transaction.type === "income" ? "text-success" : "text-foreground"
                  )}>
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}