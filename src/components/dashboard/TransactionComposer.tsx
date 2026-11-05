import React, { useState } from "react";
import { Feather, Plus, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { CATEGORIES } from "@/data/mockData";

export function TransactionComposer() {
  const { addTransaction, wallets } = useFinance();

  const [type, setType] = useState<"expense" | "income">("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food & Coffee");
  const [walletId, setWalletId] = useState("wallet-pocket");
  const [note, setNote] = useState("");

  const handleTypeSwitch = (nextType: "expense" | "income") => {
    setType(nextType);
    if (nextType === "income") {
      setCategory("Freelance");
      setWalletId("wallet-studio");
    } else {
      setCategory("Food & Coffee");
      setWalletId("wallet-pocket");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!description.trim() || isNaN(numericAmount) || numericAmount <= 0) {
      return;
    }

    addTransaction({
      description: description.trim(),
      amount: numericAmount,
      type,
      category,
      walletId,
      date: new Date().toISOString().slice(0, 10),
      note: note.trim() || undefined,
    });

    setDescription("");
    setAmount("");
    setNote("");
  };

  const quickPresets =
    type === "expense"
      ? [
          { label: "+ Kopi ($8.5)", desc: "Artisan Kopi & Croissant", amt: "8.50", cat: "Food & Coffee" },
          { label: "+ Sketchbook ($34)", desc: "Sketchbook & Tinta Nitram", amt: "34.00", cat: "Shopping" },
        ]
      : [
          { label: "+ UI Sprint (+$650)", desc: "UI/UX Design Sprint Client", amt: "650.00", cat: "Freelance" },
          { label: "+ Bonus (+$300)", desc: "Frontend Optimization Bonus", amt: "300.00", cat: "Freelance" },
        ];

  return (
    <section
      id="quick-entry"
      aria-label="Form Input Transaksi Baru"
      className="ink-card bg-[#FFFDF9] dark:bg-card p-4 relative overflow-hidden"
    >
      {/* Header + Type Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b-2 border-[#1E1E24]/15 dark:border-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#FB923C] border-2 border-[#1E1E24] flex items-center justify-center">
            <Feather className="w-3.5 h-3.5 text-[#1E1E24]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-extrabold text-[#1E1E24] dark:text-foreground">
                Input Transaksi (LocalStorage)
              </h2>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {quickPresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setDescription(preset.desc);
                setAmount(preset.amt);
                setCategory(preset.cat);
              }}
              className="hidden sm:inline-block text-xs font-bold px-2 py-0.5 rounded-md bg-[#FAF8F5] hover:bg-[#FEF3C7] text-[#1E1E24] border border-[#1E1E24] transition-colors"
            >
              {preset.label}
            </button>
          ))}

          <div className="inline-flex rounded-lg p-0.5 bg-[#FAF8F5] dark:bg-secondary border-2 border-[#1E1E24]">
            <button
              type="button"
              onClick={() => handleTypeSwitch("expense")}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-extrabold transition-all ${
                type === "expense"
                  ? "bg-[#FB923C] text-[#1E1E24] border border-[#1E1E24]"
                  : "text-[#5C5A66] hover:text-[#1E1E24]"
              }`}
            >
              <ArrowUpRight className="w-3 h-3" />
              <span>Out</span>
            </button>
            <button
              type="button"
              onClick={() => handleTypeSwitch("income")}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-extrabold transition-all ${
                type === "income"
                  ? "bg-[#84CC16] text-[#1E1E24] border border-[#1E1E24]"
                  : "text-[#5C5A66] hover:text-[#1E1E24]"
              }`}
            >
              <ArrowDownLeft className="w-3 h-3" />
              <span>In</span>
            </button>
          </div>
        </div>
      </div>

      {/* Form Inputs */}
      <form onSubmit={handleSubmit} className="mt-2.5 space-y-2.5">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-7">
            <input
              id="quick-entry-input"
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={type === "expense" ? "Deskripsi pengeluaran..." : "Deskripsi pemasukan..."}
              aria-label="Deskripsi Transaksi"
              className="w-full h-9 px-3 rounded-lg bg-[#FAF8F5] dark:bg-secondary border-2 border-[#1E1E24] text-xs font-semibold text-[#1E1E24] dark:text-foreground placeholder:text-[#5C5A66] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>
          <div className="col-span-5">
            <input
              id="tx-amount"
              type="number"
              step="0.01"
              min="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Nominal ($)"
              aria-label="Nominal Transaksi"
              className="w-full h-9 px-3 rounded-lg bg-[#FAF8F5] dark:bg-secondary border-2 border-[#1E1E24] text-xs font-extrabold tabular-nums text-[#1E1E24] dark:text-foreground placeholder:text-[#5C5A66] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-4">
            <select
              id="tx-category"
              aria-label="Kategori Transaksi"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-9 px-2 rounded-lg bg-[#FAF8F5] dark:bg-secondary border-2 border-[#1E1E24] text-xs font-bold text-[#1E1E24] dark:text-foreground focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-4">
            <select
              id="tx-wallet"
              aria-label="Sumber Wallet"
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
              className="w-full h-9 px-2 rounded-lg bg-[#FAF8F5] dark:bg-secondary border-2 border-[#1E1E24] text-xs font-bold text-[#1E1E24] dark:text-foreground focus:outline-none"
            >
              {wallets.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name.split(" ")[0]} Wallet
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-4">
            <button
              type="submit"
              className="ink-button w-full h-9 px-3 rounded-lg bg-[#1E1E24] text-[#FAF8F5] hover:bg-[#3B82F6] text-xs font-extrabold inline-flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simpan Kas</span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
