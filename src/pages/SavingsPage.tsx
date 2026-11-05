import React, { useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { useFinance } from "@/context/FinanceContext";
import {
  DoodleCircle,
  StickyNote,
  WavyUnderline,
} from "@/components/doodles/DoodleElements";
import { PiggyBank, Plus, Sparkles, Trash2 } from "lucide-react";

const SavingsPage = () => {
  const { goals, contributeToGoal, addGoal, deleteGoal } = useFinance();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [deadline, setDeadline] = useState("Dec 2025");
  const [accent, setAccent] = useState<"tangerine" | "cobalt" | "sage">("tangerine");
  const [stickyNote, setStickyNote] = useState("");

  const totalSaved = goals.reduce((acc, g) => acc + g.currentAmount, 0);
  const totalTarget = goals.reduce((acc, g) => acc + g.targetAmount, 0);
  const overallProgress = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(targetAmount);
    const initial = parseFloat(currentAmount || "0");
    if (!title.trim() || isNaN(target) || target <= 0) return;

    addGoal({
      title: title.trim(),
      subtitle: subtitle.trim() || "Personal Saving Milestone",
      targetAmount: target,
      currentAmount: Math.min(target, Math.max(0, initial)),
      deadline: deadline.trim() || "2025",
      accent,
      stickyNote: stickyNote.trim() || "Sedikit demi sedikit menjadi bukit!",
      category: "Custom Goal",
    });

    setTitle("");
    setSubtitle("");
    setTargetAmount("");
    setCurrentAmount("");
    setStickyNote("");
  };

  return (
    <AppShell>
      {/* Header Banner */}
      <div className="ink-card bg-[#FFFDF9] dark:bg-card p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#5C5A66]">
            Target Tabungan & Impian Jiddan (@4jeeh)
          </span>
          <div className="flex items-center gap-3 mt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1E24] dark:text-foreground tabular-nums">
              Terkumpul: ${totalSaved.toLocaleString("en-US")} / ${totalTarget.toLocaleString("en-US")}
            </h2>
            <DoodleCircle strokeColor="#84CC16" className="text-xs font-extrabold">
              {overallProgress}% Tercapai
            </DoodleCircle>
          </div>
          <WavyUnderline className="w-64 mt-1" color="#84CC16" />
        </div>

        <div className="font-hand text-xl font-bold text-[#1E1E24] dark:text-foreground bg-[#FEF3C7] px-4 py-2 rounded-xl border-2 border-[#1E1E24] shadow-ink-sm">
          "Menabung bukan menahan diri, tapi membeli kebebasan masa depan."
        </div>
      </div>

      {/* Goals Grid + Create New Goal Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const pct = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
            const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);
            const barColor =
              goal.accent === "tangerine"
                ? "#FB923C"
                : goal.accent === "cobalt"
                ? "#3B82F6"
                : "#84CC16";

            return (
              <div
                key={goal.id}
                className="ink-card bg-[#FFFDF9] dark:bg-card p-5 flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase bg-[#FAF8F5] text-[#1E1E24] border border-[#1E1E24]">
                      {goal.category} • {goal.deadline}
                    </span>
                    <div className="flex items-center gap-1">
                      <DoodleCircle strokeColor={barColor} className="text-xs font-extrabold">
                        {pct}%
                      </DoodleCircle>
                      <button
                        type="button"
                        onClick={() => deleteGoal(goal.id)}
                        title="Hapus target"
                        className="p-1 text-[#5C5A66] hover:text-[#EA580C]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#1E1E24] dark:text-foreground mt-3">
                    {goal.title}
                  </h3>
                  <p className="text-xs text-[#5C5A66] dark:text-muted-foreground">
                    {goal.subtitle}
                  </p>

                  {/* Numbers */}
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold tabular-nums text-[#1E1E24] dark:text-foreground">
                      ${goal.currentAmount.toLocaleString("en-US")}
                    </span>
                    <span className="text-xs font-bold text-[#5C5A66] tabular-nums">
                      dari target ${goal.targetAmount.toLocaleString("en-US")}
                    </span>
                  </div>

                  {/* Hand-Drawn Style Ink Progress Bar */}
                  <div className="mt-2 w-full h-4 rounded-xl bg-[#FAF8F5] border-2 border-[#1E1E24] overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-lg transition-all duration-300"
                      style={{ width: `${pct}%`, backgroundColor: barColor }}
                    />
                  </div>

                  {/* Sticky Note inside Goal Card */}
                  <div className="mt-4 p-3 rounded-lg bg-[#FEF3C7] border-2 border-[#1E1E24] -rotate-[0.6deg]">
                    <p className="font-hand text-lg font-bold text-[#1E1E24] leading-tight">
                      Memo: "{goal.stickyNote}"
                    </p>
                  </div>
                </div>

                {/* Quick Top-Up Buttons */}
                <div className="mt-4 pt-3 border-t-2 border-dashed border-[#1E1E24]/20 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#5C5A66]">
                    {remaining === 0
                      ? "Target Lunas 100%!"
                      : `Kurang $${remaining.toLocaleString("en-US")}`}
                  </span>
                  {remaining > 0 && (
                    <div className="flex items-center gap-1.5">
                      {[100, 250].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => contributeToGoal(goal.id, amt)}
                          className="ink-button px-2.5 py-1 rounded-lg bg-[#FAF8F5] hover:bg-[#84CC16] text-[#1E1E24] text-xs font-extrabold"
                        >
                          +${amt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Create New Saving Goal Form */}
        <div className="lg:col-span-4 space-y-5">
          <div className="ink-card bg-[#FFFDF9] dark:bg-card p-6">
            <div className="flex items-center gap-2.5 pb-4 border-b-2 border-[#1E1E24]/15">
              <div className="w-9 h-9 rounded-xl bg-[#84CC16] border-2 border-[#1E1E24] flex items-center justify-center shadow-ink-sm">
                <PiggyBank className="w-4 h-4 text-[#1E1E24]" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#1E1E24] dark:text-foreground">
                  Buat Target Tabungan
                </h3>
                <p className="text-xs text-[#5C5A66]">
                  Tulis impian baru & tempelkan sticky note motivasi
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateGoal} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-extrabold uppercase mb-1">
                  Nama Target Impian
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Misal: Leica Q3 / Kursus Seni..."
                  className="w-full h-10 px-3 rounded-xl bg-[#FAF8F5] text-[#1E1E24] border-2 border-[#1E1E24] text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold uppercase mb-1">
                    Target ($)
                  </label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder="2500"
                    className="w-full h-10 px-3 rounded-xl bg-[#FAF8F5] text-[#1E1E24] border-2 border-[#1E1E24] text-sm font-extrabold tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase mb-1">
                    Saldo Awal ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                    placeholder="500"
                    className="w-full h-10 px-3 rounded-xl bg-[#FAF8F5] text-[#1E1E24] border-2 border-[#1E1E24] text-sm font-extrabold tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold uppercase mb-1">
                    Target Waktu
                  </label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="Agu 2025"
                    className="w-full h-10 px-3 rounded-xl bg-[#FAF8F5] text-[#1E1E24] border-2 border-[#1E1E24] text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase mb-1">
                    Warna Aksen
                  </label>
                  <select
                    value={accent}
                    onChange={(e) => setAccent(e.target.value as "tangerine" | "cobalt" | "sage")}
                    className="w-full h-10 px-2.5 rounded-xl bg-[#FAF8F5] text-[#1E1E24] border-2 border-[#1E1E24] text-xs font-bold"
                  >
                    <option value="tangerine">Tangerine (#FB923C)</option>
                    <option value="cobalt">Cobalt (#3B82F6)</option>
                    <option value="sage">Sage (#84CC16)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase mb-1">
                  Catatan Tempel (Sticky Note)
                </label>
                <input
                  type="text"
                  value={stickyNote}
                  onChange={(e) => setStickyNote(e.target.value)}
                  placeholder="Motivasi singkat..."
                  className="w-full h-10 px-3 rounded-xl bg-[#FEF3C7] text-[#1E1E24] border-2 border-[#1E1E24] font-hand text-base font-bold"
                />
              </div>

              <button
                type="submit"
                className="ink-button w-full py-2.5 rounded-xl bg-[#1E1E24] text-[#FAF8F5] hover:bg-[#FB923C] hover:text-[#1E1E24] text-sm font-extrabold flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Simpan Target Baru</span>
              </button>
            </form>
          </div>

          <StickyNote title="Kiat Tabungan Kreatif" variant="sage" tilt="right">
            Setiap kali invoice freelance cair, langsung sisihkan 30% ke Saving Goals sebelum masuk ke kantong belanja harian!
          </StickyNote>
        </div>
      </div>
    </AppShell>
  );
};

export default SavingsPage;
