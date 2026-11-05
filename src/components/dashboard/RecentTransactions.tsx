import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Trash2, Search } from "lucide-react";

export function RecentTransactions() {
  const { transactions, wallets, deleteTransaction } = useFinance();
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter((tx) => {
    const matchesType = filterType === "all" || tx.type === filterType;
    const matchesSearch =
      !searchQuery.trim() ||
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tx.note && tx.note.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const getWalletName = (walletId: string) => {
    const found = wallets.find((w) => w.id === walletId);
    return found ? found.name.split(" ")[0] : "Main";
  };

  return (
    <div className="ink-card bg-[#FFFDF9] dark:bg-card p-6 flex flex-col justify-between">
      <div>
        {/* Header & Filter Controls */}
        <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b-2 border-[#1E1E24]/15 dark:border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold bg-[#ECFCCB] text-[#1E1E24] border border-[#1E1E24] rounded">
                Buku Jurnal Harian
              </span>
              <span className="font-hand text-lg font-bold text-[#9A3412]">
                {filteredTransactions.length} catatan
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-[#1E1E24] dark:text-foreground mt-1">
              Recent Transactions
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5A66] dark:text-muted-foreground">
              Riwayat arus kas terbaru lengkap dengan anotasi & kantong sumber
            </p>
          </div>

          {/* Filter Pills */}
          <div className="inline-flex rounded-xl p-1 bg-[#FAF8F5] dark:bg-secondary border-2 border-[#1E1E24]">
            {(["all", "income", "expense"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilterType(tab)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-extrabold capitalize transition-all",
                  filterType === tab
                    ? "bg-[#1E1E24] text-[#FAF8F5]"
                    : "text-[#5C5A66] hover:text-[#1E1E24]"
                )}
              >
                {tab === "all" ? "Semua" : tab === "income" ? "Inflow" : "Outflow"}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-[#5C5A66] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari transaksi, kategori, atau catatan tinta..."
            aria-label="Cari transaksi"
            className="w-full h-9 pl-9 pr-3 rounded-xl bg-[#FAF8F5] dark:bg-secondary border-2 border-[#1E1E24] text-xs font-semibold text-[#1E1E24] dark:text-foreground placeholder:text-[#8C8996] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          />
        </div>

        {/* Ledger Rows */}
        <div className="mt-2.5 max-h-[240px] overflow-y-auto pr-1">
          {filteredTransactions.length === 0 ? (
            <div className="py-10 text-center border-2 border-dashed border-[#1E1E24]/30 rounded-xl my-2">
              <p className="font-hand text-2xl font-bold text-[#1E1E24] dark:text-foreground">
                Belum ada catatan transaksi yang cocok.
              </p>
              <p className="text-xs text-[#5C5A66] mt-1">
                Tambahkan transaksi baru lewat form Input Transaksi di atas!
              </p>
            </div>
          ) : (
            <ul className="divide-y-2 divide-dashed divide-[#1E1E24]/15 dark:divide-border">
              {filteredTransactions.map((transaction) => {
                const Icon = transaction.icon;
                let formattedDate = transaction.date;
                try {
                  formattedDate = format(parseISO(transaction.date), "MMM d, yyyy");
                } catch {
                  formattedDate = transaction.date;
                }

                return (
                  <li
                    key={transaction.id}
                    className="group flex items-start justify-between gap-3 py-3 px-2 rounded-lg hover:bg-[#FAF8F5] dark:hover:bg-secondary/60 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl border-2 border-[#1E1E24] flex items-center justify-center flex-shrink-0 shadow-ink-sm mt-0.5",
                          transaction.type === "income"
                            ? "bg-[#ECFCCB] text-[#1E1E24]"
                            : "bg-[#FFEDD5] text-[#1E1E24]"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-extrabold text-[#1E1E24] dark:text-foreground truncate">
                          {transaction.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-[11px] font-semibold text-[#5C5A66] dark:text-muted-foreground">
                          <span className="px-1.5 py-0.2 rounded bg-[#FAF8F5] dark:bg-background border border-[#1E1E24]/40 text-[#1E1E24] dark:text-foreground">
                            {transaction.category}
                          </span>
                          <span>•</span>
                          <span>{getWalletName(transaction.walletId)}</span>
                          <span>•</span>
                          <span>{formattedDate}</span>
                        </div>
                        {transaction.note && (
                          <p className="font-hand text-base font-bold text-[#1D4ED8] dark:text-[#60A5FA] mt-0.5 leading-tight">
                            Catatan: "{transaction.note}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div
                        className={cn(
                          "text-sm font-extrabold tabular-nums px-2 py-0.5 rounded-md border",
                          transaction.type === "income"
                            ? "bg-[#ECFCCB] text-[#365314] border-[#1E1E24]"
                            : "bg-[#FAF8F5] text-[#1E1E24] border-[#1E1E24]/40"
                        )}
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteTransaction(transaction.id)}
                        title="Hapus transaksi"
                        aria-label={`Hapus transaksi ${transaction.description}`}
                        className="opacity-70 group-hover:opacity-100 p-1.5 rounded-lg text-[#5C5A66] hover:text-[#EA580C] hover:bg-[#FFEDD5] border border-transparent hover:border-[#1E1E24] transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-4 pt-3 border-t-2 border-[#1E1E24]/15 dark:border-border flex items-center justify-between text-xs font-semibold text-[#5C5A66] dark:text-muted-foreground">
        <span>Data tersimpan permanen di browser (LocalStorage)</span>
        <span className="font-hand text-base font-bold text-[#1E1E24] dark:text-foreground">
          inkflow ledger • @4jeeh
        </span>
      </div>
    </div>
  );
}
