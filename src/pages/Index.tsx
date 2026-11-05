import { AppShell } from "@/components/dashboard/AppShell";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { CashFlowChart } from "@/components/dashboard/CashFlowChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { TransactionComposer } from "@/components/dashboard/TransactionComposer";
import { useFinance } from "@/context/FinanceContext";
import { AbstractWalletArt, DoodleCircle } from "@/components/doodles/DoodleElements";
import { Link } from "react-router-dom";
import { ArrowRight, PiggyBank, Wallet as WalletIcon } from "lucide-react";

const Index = () => {
  const { wallets, goals, contributeToGoal } = useFinance();

  const focusQuickInput = () => {
    const el = document.getElementById("quick-entry-input");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => el.focus(), 150);
    }
  };

  return (
    <AppShell onQuickAddClick={focusQuickInput}>
      {/* 1. Hero Balance, Inflow/Outflow Split & Sticky Note Memo */}
      <StatsCards />

      {/* 2. Primary Editorial Workspace: High-Contrast Ink Cash Flow Chart (Left) + LocalStorage Transaction Input & Recent Ledger (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        <div className="xl:col-span-7 flex flex-col">
          <CashFlowChart />
        </div>
        <div className="xl:col-span-5 flex flex-col gap-5 justify-between">
          <TransactionComposer />
          <RecentTransactions />
        </div>
      </div>

      {/* 3. Editorial Preview Strip: Abstract Doodle Wallets & Saving Goals */}
      <section
        aria-label="Preview Kantong Wallet dan Target Tabungan"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Abstract Doodle Wallet Spotlight */}
        <div className="lg:col-span-6 ink-card bg-[#FFFDF9] dark:bg-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 pb-4 border-b-2 border-[#1E1E24]/15 dark:border-border">
            <div>
              <div className="flex items-center gap-2">
                <WalletIcon className="w-4 h-4 text-[#1D4ED8]" />
                <h2 className="text-lg font-extrabold text-[#1E1E24] dark:text-foreground">
                  Abstract Doodle Wallets
                </h2>
              </div>
              <p className="text-xs text-[#5C5A66] dark:text-muted-foreground">
                Kartu multi-kantong aktif dengan ilustrasi vektor abstrak
              </p>
            </div>
            <Link
              to="/wallet"
              className="ink-button inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F5] text-[#1E1E24] text-xs font-extrabold"
            >
              <span>Buka Wallet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4">
            {wallets.map((w) => (
              <Link
                key={w.id}
                to="/wallet"
                className="relative overflow-hidden rounded-xl border-2 border-[#1E1E24] p-4 bg-[#FAF8F5] hover:-translate-y-0.5 transition-transform shadow-ink-sm flex flex-col justify-between min-h-[128px]"
              >
                <div className="absolute inset-0 opacity-90">
                  <AbstractWalletArt pattern={w.pattern} />
                </div>
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FFFDF9] text-[#1E1E24] border border-[#1E1E24]">
                    {w.tag}
                  </span>
                </div>
                <div className="relative z-10 mt-4">
                  <p className="text-xs font-bold text-[#1E1E24] truncate">{w.name}</p>
                  <p className="text-lg font-extrabold tabular-nums text-[#1E1E24]">
                    ${w.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Saving Goals Quick Progress */}
        <div className="lg:col-span-6 ink-card bg-[#FFFDF9] dark:bg-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 pb-4 border-b-2 border-[#1E1E24]/15 dark:border-border">
            <div>
              <div className="flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-[#4D7C0F]" />
                <h2 className="text-lg font-extrabold text-[#1E1E24] dark:text-foreground">
                  Saving Goals & Target Impian
                </h2>
              </div>
              <p className="text-xs text-[#5C5A66] dark:text-muted-foreground">
                Klik +$100 untuk top-up cepat ke target tabunganmu
              </p>
            </div>
            <Link
              to="/savings"
              className="ink-button inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F5] text-[#1E1E24] text-xs font-extrabold"
            >
              <span>Semua Target</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 mt-4">
            {goals.slice(0, 2).map((goal) => {
              const pct = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
              const barColor =
                goal.accent === "tangerine"
                  ? "#FB923C"
                  : goal.accent === "cobalt"
                  ? "#3B82F6"
                  : "#84CC16";

              return (
                <div
                  key={goal.id}
                  className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-secondary border-2 border-[#1E1E24] flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-extrabold text-[#1E1E24] dark:text-foreground">
                        {goal.title}
                      </p>
                      <p className="font-hand text-base font-bold text-[#5C5A66] dark:text-muted-foreground">
                        "{goal.stickyNote}"
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <DoodleCircle strokeColor={barColor} className="text-xs font-extrabold">
                        {pct}%
                      </DoodleCircle>
                      {pct < 100 && (
                        <button
                          type="button"
                          onClick={() => contributeToGoal(goal.id, 100)}
                          className="ink-button px-2.5 py-1 rounded-lg bg-[#84CC16] text-[#1E1E24] text-xs font-extrabold"
                        >
                          +$100
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#FFFDF9] border-2 border-[#1E1E24] overflow-hidden">
                    <div
                      className="h-full transition-all duration-300"
                      style={{ width: `${pct}%`, backgroundColor: barColor }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold tabular-nums text-[#1E1E24] dark:text-foreground">
                    <span>Terkumpul: ${goal.currentAmount.toLocaleString("en-US")}</span>
                    <span>Target: ${goal.targetAmount.toLocaleString("en-US")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </AppShell>
  );
};

export default Index;
