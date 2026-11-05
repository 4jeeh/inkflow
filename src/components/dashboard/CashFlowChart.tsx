import { useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { useFinance } from "@/context/FinanceContext";
import { DoodleCircle, SketchedArrow, WavyUnderline } from "@/components/doodles/DoodleElements";

export function CashFlowChart() {
  const { cashFlowSeries, monthlyIncome, monthlyExpenses, transactions } = useFinance();
  const [showNetLine, setShowNetLine] = useState(true);

  const liveSurplus = Math.round(monthlyIncome - monthlyExpenses);
  const avgIncome = Math.round(
    cashFlowSeries.reduce((acc, item) => acc + item.income, 0) / cashFlowSeries.length
  );
  const avgExpense = Math.round(
    cashFlowSeries.reduce((acc, item) => acc + item.expenses, 0) / cashFlowSeries.length
  );

  // Compute top 3 expense categories from live transactions
  const expenseByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const topCategories = Object.entries(expenseByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="ink-card bg-[#FFFDF9] dark:bg-card p-5 flex flex-col gap-3">
      {/* Compact Header Row */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b-2 border-[#1E1E24]/15 dark:border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold bg-[#FB923C] text-[#1E1E24] border border-[#1E1E24] rounded">
              High-Contrast Ink Plot
            </span>
            <span className="font-hand text-lg font-bold text-[#1D4ED8]">
              Jul — Jan (Live)
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1E24] dark:text-foreground mt-0.5">
            Cash Flow — Garis Tinta Arus Kas
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setShowNetLine((prev) => !prev)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-[#1E1E24] transition-all flex-shrink-0 ${
            showNetLine
              ? "bg-[#1E1E24] text-[#FAF8F5] shadow-[2px_2px_0px_0px_#FB923C]"
              : "bg-[#FAF8F5] text-[#1E1E24]"
          }`}
        >
          {showNetLine ? "Garis Surplus Aktif" : "+ Garis Surplus"}
        </button>
      </div>

      {/* Single-Line Hand-Sketched Annotation Strip */}
      <div className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-secondary border-2 border-dashed border-[#1E1E24]/40 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <SketchedArrow direction="down-right" className="w-7 h-4 flex-shrink-0" color="#9A3412" />
          <span className="font-hand text-lg font-bold text-[#1E1E24] dark:text-foreground truncate">
            Anotasi Tinta: Titik Januari bergerak real-time saat kamu simpan transaksi!
          </span>
        </div>
        <DoodleCircle strokeColor="#3B82F6" className="text-xs font-extrabold text-[#1E1E24] dark:text-foreground flex-shrink-0">
          Surplus Jan: +${liveSurplus.toLocaleString("en-US")}
        </DoodleCircle>
      </div>

      {/* High-Contrast Ink Chart Area */}
      <div className="h-[265px] sm:h-[285px] w-full bg-[#FAF8F5]/70 dark:bg-background/40 rounded-xl p-2 border border-[#1E1E24]/20">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={cashFlowSeries}
            margin={{ top: 12, right: 22, left: 6, bottom: 2 }}
          >
            <defs>
              <linearGradient id="inkCobaltFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="inkTangerineFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FB923C" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#FB923C" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#1E1E24"
              strokeOpacity={0.18}
              vertical={true}
            />

            <XAxis
              dataKey="month"
              axisLine={{ stroke: "#1E1E24", strokeWidth: 2 }}
              tickLine={{ stroke: "#1E1E24", strokeWidth: 1.5 }}
              tick={{ fill: "#1E1E24", fontSize: 12, fontWeight: 700 }}
              dy={6}
            />

            <YAxis
              axisLine={{ stroke: "#1E1E24", strokeWidth: 2 }}
              tickLine={{ stroke: "#1E1E24", strokeWidth: 1.5 }}
              tick={{ fill: "#1E1E24", fontSize: 12, fontWeight: 700 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
              domain={[0, "auto"]}
            />

            <ReferenceLine
              y={avgIncome}
              stroke="#3B82F6"
              strokeDasharray="3 3"
              strokeOpacity={0.45}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#FFFDF9] text-[#1E1E24] border-2 border-[#1E1E24] rounded-xl p-3.5 shadow-ink">
                      <div className="flex items-center justify-between gap-4 mb-1.5 border-b border-[#1E1E24]/20 pb-1">
                        <span className="font-extrabold text-sm">{label}</span>
                        <span className="font-hand text-base font-bold text-[#9A3412]">
                          Buku Kas
                        </span>
                      </div>
                      <div className="space-y-1">
                        {payload.map((entry, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between gap-4 text-xs font-bold tabular-nums"
                          >
                            <span className="flex items-center gap-1.5">
                              <span
                                className="w-2.5 h-2.5 rounded-sm border border-[#1E1E24]"
                                style={{ backgroundColor: entry.color }}
                              />
                              {entry.name}:
                            </span>
                            <span>${Number(entry.value).toLocaleString("en-US")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="income"
              fill="url(#inkCobaltFill)"
              stroke="none"
              tooltipType="none"
            />

            <Area
              type="monotone"
              dataKey="expenses"
              fill="url(#inkTangerineFill)"
              stroke="none"
              tooltipType="none"
            />

            {/* Thick High-Contrast Cobalt Ink Line for Income */}
            <Line
              type="monotone"
              dataKey="income"
              name="Pemasukan (Inflow)"
              stroke="#2563EB"
              strokeWidth={4}
              dot={{
                r: 5.5,
                fill: "#FAF8F5",
                stroke: "#1E1E24",
                strokeWidth: 2.5,
              }}
              activeDot={{
                r: 7.5,
                fill: "#3B82F6",
                stroke: "#1E1E24",
                strokeWidth: 2.5,
              }}
            />

            {/* Thick High-Contrast Tangerine Ink Line for Expenses */}
            <Line
              type="monotone"
              dataKey="expenses"
              name="Pengeluaran (Outflow)"
              stroke="#EA580C"
              strokeWidth={3.75}
              dot={{
                r: 5,
                fill: "#FB923C",
                stroke: "#1E1E24",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "#FB923C",
                stroke: "#1E1E24",
                strokeWidth: 2.5,
              }}
            />

            {/* Deep Ink Dashed Line for Net Savings */}
            {showNetLine && (
              <Line
                type="monotone"
                dataKey="net"
                name="Surplus Bersih (Net)"
                stroke="#1E1E24"
                strokeWidth={2.75}
                strokeDasharray="6 4"
                dot={{
                  r: 4,
                  fill: "#84CC16",
                  stroke: "#1E1E24",
                  strokeWidth: 2,
                }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Directly Under Plot */}
      <div className="pt-2 border-t-2 border-[#1E1E24]/15 dark:border-border flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#1E1E24] dark:text-foreground">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1.5 bg-[#2563EB] border border-[#1E1E24] rounded-full inline-block" />
            <span>Inflow (Rata-rata ${avgIncome.toLocaleString("en-US")}/bln)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1.5 bg-[#EA580C] border border-[#1E1E24] rounded-full inline-block" />
            <span>Outflow (Rata-rata ${avgExpense.toLocaleString("en-US")}/bln)</span>
          </div>
          {showNetLine && (
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-1.5 bg-[#84CC16] border border-[#1E1E24] rounded-full inline-block" />
              <span>Net Surplus</span>
            </div>
          )}
        </div>

        <div className="w-28 hidden sm:block">
          <WavyUnderline color="#3B82F6" secondaryColor="#1E1E24" />
        </div>
      </div>

      {/* Top 3 Expense Categories Ink Strip (Fills Bottom of Card with Real Data) */}
      <div className="pt-2 border-t-2 border-dashed border-[#1E1E24]/15 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {topCategories.map(([catName, amt], idx) => {
          const share = monthlyExpenses > 0 ? Math.round((amt / monthlyExpenses) * 100) : 0;
          const colors = ["#FB923C", "#3B82F6", "#84CC16"];
          return (
            <div
              key={catName}
              className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-secondary border border-[#1E1E24] flex flex-col justify-between gap-1.5"
            >
              <div className="flex items-center justify-between text-xs font-bold text-[#1E1E24] dark:text-foreground">
                <span className="truncate">{catName}</span>
                <span className="tabular-nums">{share}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#FFFDF9] border border-[#1E1E24] overflow-hidden">
                <div
                  className="h-full"
                  style={{ width: `${share}%`, backgroundColor: colors[idx % colors.length] }}
                />
              </div>
              <span className="text-xs font-extrabold tabular-nums text-[#5C5A66]">
                ${amt.toLocaleString("en-US", { minimumFractionDigits: 2 })} bulan ini
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
