import React, { useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { useFinance } from "@/context/FinanceContext";
import {
  AbstractWalletArt,
  DoodleCircle,
  StickyNote,
  WavyUnderline,
} from "@/components/doodles/DoodleElements";
import { ArrowLeftRight, CreditCard, ArrowUpRight, ArrowDownLeft, CheckCircle2 } from "lucide-react";

const WalletPage = () => {
  const { wallets, transactions, transferBetweenWallets, totalBalance } = useFinance();
  const [selectedWalletId, setSelectedWalletId] = useState<string>("all");
  const [fromWallet, setFromWallet] = useState("wallet-main");
  const [toWallet, setToWallet] = useState("wallet-pocket");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferNote, setTransferNote] = useState("");

  const filteredTxs =
    selectedWalletId === "all"
      ? transactions
      : transactions.filter((t) => t.walletId === selectedWalletId);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0 || fromWallet === toWallet) return;
    transferBetweenWallets(fromWallet, toWallet, amt, transferNote);
    setTransferAmount("");
    setTransferNote("");
  };

  return (
    <AppShell>
      {/* Top Summary Banner */}
      <div className="ink-card bg-[#FFFDF9] dark:bg-card p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#5C5A66]">
            Multi-Pocket Architecture
          </span>
          <div className="flex items-center gap-3 mt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1E24] dark:text-foreground tabular-nums">
              Total Gabungan: ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </h2>
            <DoodleCircle strokeColor="#3B82F6" className="text-xs font-extrabold">
              {wallets.length} Kartu Aktif
            </DoodleCircle>
          </div>
          <WavyUnderline className="w-56 mt-1" color="#FB923C" />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedWalletId("all")}
            className={`ink-button px-3.5 py-2 rounded-xl text-xs font-extrabold ${
              selectedWalletId === "all"
                ? "bg-[#1E1E24] text-[#FAF8F5]"
                : "bg-[#FAF8F5] text-[#1E1E24]"
            }`}
          >
            Semua Kartu ({transactions.length})
          </button>
        </div>
      </div>

      {/* 3 Abstract Doodle Wallet Cards */}
      <section aria-label="Daftar Kartu Doodle Abstrak" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wallets.map((wallet) => {
          const isSelected = selectedWalletId === wallet.id;
          const borderAccent =
            wallet.accent === "cobalt"
              ? "ring-4 ring-[#3B82F6]"
              : wallet.accent === "sage"
              ? "ring-4 ring-[#84CC16]"
              : "ring-4 ring-[#FB923C]";

          return (
            <div
              key={wallet.id}
              onClick={() =>
                setSelectedWalletId((prev) => (prev === wallet.id ? "all" : wallet.id))
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedWalletId((prev) => (prev === wallet.id ? "all" : wallet.id));
                }
              }}
              className={`ink-card-interactive cursor-pointer relative overflow-hidden p-6 bg-[#FAF8F5] text-[#1E1E24] flex flex-col justify-between min-h-[225px] ${
                isSelected ? borderAccent : ""
              }`}
            >
              {/* Bespoke Hand-Drawn & Abstract Art SVG Background */}
              <div className="absolute inset-0">
                <AbstractWalletArt pattern={wallet.pattern} />
              </div>

              {/* Card Top Row */}
              <div className="relative z-10 flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-[#FFFDF9] border-2 border-[#1E1E24] shadow-ink-sm">
                    {wallet.tag}
                  </span>
                  <h3 className="text-lg font-extrabold mt-2 text-[#1E1E24]">
                    {wallet.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#5C5A66]">{wallet.subtitle}</p>
                </div>

                {/* Hand-Drawn EMV Chip Icon */}
                <div className="w-11 h-8 rounded-lg bg-[#FEF3C7] border-2 border-[#1E1E24] flex items-center justify-center shadow-ink-sm">
                  <CreditCard className="w-5 h-5 text-[#1E1E24]" />
                </div>
              </div>

              {/* Card Balance & Number */}
              <div className="relative z-10 mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#5C5A66]">
                  Saldo Tersedia
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold tabular-nums text-[#1E1E24] mt-0.5">
                  ${wallet.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>

                <div className="mt-4 pt-3 border-t-2 border-dashed border-[#1E1E24]/30 flex items-center justify-between text-xs font-bold">
                  <span className="tracking-widest">{wallet.cardNumber}</span>
                  <span className="font-hand text-base font-extrabold">{wallet.holder}</span>
                </div>
              </div>

              {/* Monthly In/Out Pill Footer */}
              <div className="relative z-10 mt-3 flex items-center justify-between text-[11px] font-extrabold">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#ECFCCB] border border-[#1E1E24]">
                  <ArrowDownLeft className="w-3 h-3" /> +${wallet.monthlyIn.toLocaleString("en-US")}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FFEDD5] border border-[#1E1E24]">
                  <ArrowUpRight className="w-3 h-3" /> -${wallet.monthlyOut.toLocaleString("en-US")}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom Grid: Inter-Wallet Transfer + Filtered Wallet Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Transfer Antar Kantong Wallet */}
        <div className="lg:col-span-5 space-y-5">
          <div className="ink-card bg-[#FFFDF9] dark:bg-card p-6">
            <div className="flex items-center gap-2.5 pb-4 border-b-2 border-[#1E1E24]/15">
              <div className="w-9 h-9 rounded-xl bg-[#3B82F6] text-[#FAF8F5] border-2 border-[#1E1E24] flex items-center justify-center shadow-ink-sm">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#1E1E24] dark:text-foreground">
                  Transfer Antar-Wallet
                </h3>
                <p className="text-xs text-[#5C5A66]">
                  Pindahkan dana antar kantong kartu secara instan
                </p>
              </div>
            </div>

            <form onSubmit={handleTransfer} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold uppercase mb-1">
                    Dari Kantong
                  </label>
                  <select
                    value={fromWallet}
                    onChange={(e) => setFromWallet(e.target.value)}
                    className="w-full h-10 px-2.5 rounded-xl bg-[#FAF8F5] text-[#1E1E24] border-2 border-[#1E1E24] text-xs font-bold"
                  >
                    {wallets.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase mb-1">
                    Ke Kantong
                  </label>
                  <select
                    value={toWallet}
                    onChange={(e) => setToWallet(e.target.value)}
                    className="w-full h-10 px-2.5 rounded-xl bg-[#FAF8F5] text-[#1E1E24] border-2 border-[#1E1E24] text-xs font-bold"
                  >
                    {wallets.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase mb-1">
                  Nominal Transfer ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  required
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Misal: 250.00"
                  className="w-full h-10 px-3 rounded-xl bg-[#FAF8F5] text-[#1E1E24] border-2 border-[#1E1E24] text-sm font-extrabold tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase mb-1">
                  Catatan Transfer (Opsional)
                </label>
                <input
                  type="text"
                  value={transferNote}
                  onChange={(e) => setTransferNote(e.target.value)}
                  placeholder="Top-up uang saku kopi mingguan..."
                  className="w-full h-10 px-3 rounded-xl bg-[#FEF3C7]/70 text-[#1E1E24] border-2 border-[#1E1E24] font-hand text-base font-bold"
                />
              </div>

              <button
                type="submit"
                className="ink-button w-full py-2.5 rounded-xl bg-[#FB923C] text-[#1E1E24] text-sm font-extrabold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Jalankan Transfer Saldo</span>
              </button>
            </form>
          </div>

          <StickyNote title="Tips Multi-Wallet @4jeeh" variant="cobalt" tilt="left">
            Pisahkan rekening Payroll utama dari kantong harian "Espresso Pocket" agar pengeluaran mikro tidak menggerus alokasi investasi!
          </StickyNote>
        </div>

        {/* Filtered Transactions for Selected Wallet */}
        <div className="lg:col-span-7 ink-card bg-[#FFFDF9] dark:bg-card p-6">
          <div className="flex items-center justify-between pb-4 border-b-2 border-[#1E1E24]/15">
            <div>
              <h3 className="text-lg font-extrabold text-[#1E1E24] dark:text-foreground">
                Mutasi Kartu:{" "}
                {selectedWalletId === "all"
                  ? "Semua Wallet"
                  : wallets.find((w) => w.id === selectedWalletId)?.name}
              </h3>
              <p className="text-xs text-[#5C5A66]">
                Klik salah satu kartu doodle di atas untuk memfilter mutasi per kantong
              </p>
            </div>
            <span className="font-hand text-lg font-bold text-[#EA580C]">
              {filteredTxs.length} transaksi
            </span>
          </div>

          <ul className="mt-4 divide-y-2 divide-dashed divide-[#1E1E24]/15">
            {filteredTxs.map((tx) => {
              const Icon = tx.icon;
              return (
                <li key={tx.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl border-2 border-[#1E1E24] flex items-center justify-center ${
                        tx.type === "income" ? "bg-[#ECFCCB]" : "bg-[#FFEDD5]"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#1E1E24]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-[#1E1E24] dark:text-foreground truncate">
                        {tx.description}
                      </p>
                      <p className="text-xs text-[#5C5A66]">
                        {tx.category} • {tx.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-extrabold tabular-nums ${
                      tx.type === "income" ? "text-[#4D7C0F]" : "text-[#1E1E24] dark:text-foreground"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}$
                    {tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </AppShell>
  );
};

export default WalletPage;
