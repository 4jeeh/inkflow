import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Wallet, Check, Pencil } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import {
  WavyUnderline,
  DoodleCircle,
  SketchedArrow,
  StickyNote,
} from "@/components/doodles/DoodleElements";
import { Link } from "react-router-dom";

export function StatsCards() {
  const {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    savingsRate,
    wallets,
    stickyMemo,
    updateStickyMemo,
  } = useFinance();

  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [draftMemo, setDraftMemo] = useState(stickyMemo);

  const netSurplus = Number((monthlyIncome - monthlyExpenses).toFixed(2));

  const handleSaveMemo = () => {
    if (draftMemo.trim()) {
      updateStickyMemo(draftMemo.trim());
    }
    setIsEditingMemo(false);
  };

  return (
    <section aria-label="Ringkasan Saldo Utama" className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* 1. Primary Hero Balance Card with Wavy Underline, Doodle Highlight Circle & Sketched Arrow */}
      <div className="lg:col-span-5 ink-card p-6 bg-[#FFFDF9] dark:bg-card relative overflow-hidden flex flex-col justify-between">
        {/* Subtle Abstract Corner Shape */}
        <div
          className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-[#3B82F6]/15 border-2 border-[#1E1E24]/20 pointer-events-none"
          aria-hidden="true"
        />

        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="inline-block">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#5C5A66] dark:text-muted-foreground">
                Total Saldo Bersih (All Wallets)
              </span>
              {/* Garis Bawah Bergelombang di Judul Saldo */}
              <WavyUnderline className="w-48 mt-0.5" color="#FB923C" secondaryColor="#1E1E24" />
            </div>

            {/* Lingkaran Tak Beraturan di Highlight */}
            <DoodleCircle strokeColor="#84CC16" className="text-xs font-extrabold text-[#1E1E24] dark:text-foreground">
              +{savingsRate}% Saved
            </DoodleCircle>
          </div>

          {/* Main Balance Figure */}
          <div className="mt-3 flex items-baseline gap-3 flex-wrap">
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums text-[#1E1E24] dark:text-foreground">
              ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Handwritten Callout with Sketched Arrow */}
          <div className="mt-2 flex items-center gap-2">
            <SketchedArrow direction="right" className="w-10 h-6" color="#3B82F6" />
            <span className="font-hand text-xl font-bold text-[#1D4ED8] dark:text-[#60A5FA]">
              Surplus bulan ini +${netSurplus.toLocaleString("en-US", { minimumFractionDigits: 2 })}!
            </span>
          </div>
        </div>

        {/* Mini Wallet Strip inside Hero Balance Card */}
        <div className="mt-5 pt-4 border-t-2 border-dashed border-[#1E1E24]/25 dark:border-border flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            {wallets.map((w) => (
              <span
                key={w.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-secondary border border-[#1E1E24] font-semibold text-[#1E1E24] dark:text-foreground tabular-nums"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      w.accent === "cobalt"
                        ? "#3B82F6"
                        : w.accent === "sage"
                        ? "#84CC16"
                        : "#FB923C",
                  }}
                />
                {w.name.split(" ")[0]}: ${w.balance.toLocaleString("en-US", { maximumFractionDigits: 0 })}
              </span>
            ))}
          </div>
          <Link
            to="/wallet"
            className="inline-flex items-center gap-1 font-bold text-[#1E1E24] dark:text-foreground underline decoration-wavy decoration-[#FB923C] hover:text-[#EA580C] flex-shrink-0"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Kelola</span>
          </Link>
        </div>
      </div>

      {/* 2. Editorial Cash Inflow vs Outflow Split Ledger */}
      <div className="lg:col-span-4 ink-card bg-[#FFFDF9] dark:bg-card p-5 flex flex-col justify-between divide-y-2 divide-[#1E1E24]/15 dark:divide-border">
        {/* Monthly Inflow */}
        <div className="pb-4 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#84CC16] border border-[#1E1E24]" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#5C5A66] dark:text-muted-foreground">
                Pemasukan Bulan Ini (Inflow)
              </span>
            </div>
            <p className="mt-1.5 text-2xl sm:text-3xl font-extrabold tabular-nums text-[#1E1E24] dark:text-foreground">
              +${monthlyIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="mt-0.5 text-xs font-medium text-[#4D7C0F] dark:text-[#84CC16] flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Gaji + Retainer Studio Kroma (+8.2% vs Des)</span>
            </p>
          </div>
          <span className="font-hand text-lg font-bold px-2.5 py-0.5 rounded-md bg-[#ECFCCB] text-[#1E1E24] border border-[#1E1E24]">
            Inflow
          </span>
        </div>

        {/* Monthly Outflow */}
        <div className="pt-4 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#FB923C] border border-[#1E1E24]" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#5C5A66] dark:text-muted-foreground">
                Pengeluaran Bulan Ini (Outflow)
              </span>
            </div>
            <p className="mt-1.5 text-2xl sm:text-3xl font-extrabold tabular-nums text-[#1E1E24] dark:text-foreground">
              -${monthlyExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-[#9A3412] dark:text-[#FB923C] flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>Terkendali 33.8% dari total pemasukan</span>
            </p>
          </div>
          <span className="font-hand text-lg font-bold px-2.5 py-0.5 rounded-md bg-[#FFEDD5] text-[#1E1E24] border border-[#1E1E24]">
            Outflow
          </span>
        </div>
      </div>

      {/* 3. Sticky Note Catatan (Hand-Drawn Annotation Note) */}
      <div className="lg:col-span-3 flex flex-col justify-center">
        <StickyNote
          title="Sticky Memo Keuangan"
          variant="yellow"
          tilt="right"
          className="flex flex-col justify-between gap-2"
          footer="Tersimpan di LocalStorage"
          onEdit={() => {
            setDraftMemo(stickyMemo);
            setIsEditingMemo((prev) => !prev);
          }}
        >
          {isEditingMemo ? (
            <div className="space-y-2 mt-1">
              <textarea
                value={draftMemo}
                onChange={(e) => setDraftMemo(e.target.value)}
                rows={3}
                aria-label="Edit catatan tempel"
                className="w-full p-2 text-base font-hand bg-[#FFFDF9] text-[#1E1E24] border-2 border-[#1E1E24] rounded-md focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSaveMemo}
                className="ink-button inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#84CC16] text-[#1E1E24] text-xs font-sans font-bold"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Simpan Catatan</span>
              </button>
            </div>
          ) : (
            <p className="leading-snug">"{stickyMemo}"</p>
          )}
        </StickyNote>
      </div>
    </section>
  );
}
