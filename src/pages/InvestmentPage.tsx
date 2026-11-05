import { AppShell } from "@/components/dashboard/AppShell";
import {
  DoodleCircle,
  StickyNote,
  WavyUnderline,
} from "@/components/doodles/DoodleElements";
import { TrendingUp, ShieldCheck, Globe, Sparkles } from "lucide-react";

const PORTFOLIO_HOLDINGS = [
  {
    id: "inv-1",
    name: "Vanguard FTSE All-World ETF (VWRA)",
    category: "Global Equity Index",
    allocated: 18400,
    returnPct: 14.8,
    share: 52,
    accent: "#3B82F6",
    note: "Inti portofolio jangka panjang — auto-DCA setiap tanggal 5.",
  },
  {
    id: "inv-2",
    name: "Obligasi Negara Ritel (SBN / SR020)",
    category: "Sovereign Fixed Income",
    allocated: 9500,
    returnPct: 6.4,
    share: 27,
    accent: "#84CC16",
    note: "Kupon bulanan cair langsung ke Ink Main Checking.",
  },
  {
    id: "inv-3",
    name: "Digital Gold & Commodity Vault",
    category: "Inflation Hedge",
    allocated: 4600,
    returnPct: 19.2,
    share: 13,
    accent: "#FB923C",
    note: "Pelindung nilai aset terhadap fluktuasi mata uang.",
  },
  {
    id: "inv-4",
    name: "Money Market Liquid Fund",
    category: "High-Yield Cash Buffer",
    allocated: 2850,
    returnPct: 4.9,
    share: 8,
    accent: "#1E1E24",
    note: "Likuiditas instan T+1 untuk peluang mendadak.",
  },
];

const InvestmentPage = () => {
  const totalPortfolio = PORTFOLIO_HOLDINGS.reduce((sum, h) => sum + h.allocated, 0);

  return (
    <AppShell>
      {/* Top Portfolio Overview */}
      <div className="ink-card bg-[#FFFDF9] dark:bg-card p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#5C5A66]">
            Long-Term Wealth & Ink Allocation
          </span>
          <div className="flex items-center gap-3 mt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1E24] dark:text-foreground tabular-nums">
              Nilai Portofolio: ${totalPortfolio.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </h2>
            <DoodleCircle strokeColor="#84CC16" className="text-xs font-extrabold">
              +12.4% YoY
            </DoodleCircle>
          </div>
          <WavyUnderline className="w-60 mt-1" color="#3B82F6" />
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-[#ECFCCB] border-2 border-[#1E1E24] text-xs font-extrabold text-[#1E1E24]">
            DCA Bulanan: $600.00 / bln
          </div>
        </div>
      </div>

      {/* Allocation Bar Strip */}
      <div className="ink-card bg-[#FFFDF9] dark:bg-card p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-extrabold text-[#1E1E24] dark:text-foreground">
            Komposisi Alokasi Aset (100% Terukur)
          </h3>
          <span className="font-hand text-lg font-bold text-[#3B82F6]">
            4 Instrumen Utama
          </span>
        </div>

        <div className="w-full h-7 rounded-xl border-2 border-[#1E1E24] overflow-hidden flex p-0.5 bg-[#FAF8F5] gap-1">
          {PORTFOLIO_HOLDINGS.map((h) => (
            <div
              key={h.id}
              style={{ width: `${h.share}%`, backgroundColor: h.accent }}
              className="h-full first:rounded-l-lg last:rounded-r-lg transition-all"
              title={`${h.name}: ${h.share}%`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {PORTFOLIO_HOLDINGS.map((h) => (
            <div
              key={h.id}
              className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-secondary border border-[#1E1E24] flex items-center gap-2.5"
            >
              <span
                className="w-3.5 h-3.5 rounded-sm border border-[#1E1E24] flex-shrink-0"
                style={{ backgroundColor: h.accent }}
              />
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-[#1E1E24] dark:text-foreground truncate">
                  {h.category}
                </p>
                <p className="text-xs font-bold text-[#5C5A66] tabular-nums">
                  {h.share}% • ${h.allocated.toLocaleString("en-US")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Holdings + Sticky Note */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 ink-card bg-[#FFFDF9] dark:bg-card p-6">
          <h3 className="text-lg font-extrabold text-[#1E1E24] dark:text-foreground pb-3 border-b-2 border-[#1E1E24]/15">
            Daftar Instrumen & Anotasi Strategi
          </h3>
          <div className="divide-y-2 divide-dashed divide-[#1E1E24]/15 mt-2">
            {PORTFOLIO_HOLDINGS.map((item) => (
              <div key={item.id} className="py-4 flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full border border-[#1E1E24]"
                      style={{ backgroundColor: item.accent }}
                    />
                    <h4 className="text-base font-extrabold text-[#1E1E24] dark:text-foreground">
                      {item.name}
                    </h4>
                  </div>
                  <p className="text-xs font-semibold text-[#5C5A66]">{item.category}</p>
                  <p className="font-hand text-lg font-bold text-[#1D4ED8] dark:text-[#60A5FA]">
                    ✎ "{item.note}"
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-extrabold tabular-nums text-[#1E1E24] dark:text-foreground">
                    ${item.allocated.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#ECFCCB] text-[#1E1E24] border border-[#1E1E24] text-xs font-extrabold tabular-nums">
                    +{item.returnPct}% Return
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-5">
          <StickyNote title="Manifesto Investasi @4jeeh" variant="tangerine" tilt="left">
            "Beli indeks global secara konsisten setiap bulan, abaikan kebisingan pasar harian, dan fokus tingkatkan karya di studio."
          </StickyNote>

          <div className="ink-card bg-[#FAF8F5] dark:bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-[#1E1E24] dark:text-foreground">
              <ShieldCheck className="w-4 h-4 text-[#84CC16]" />
              <span>Aturan Rebalancing</span>
            </div>
            <p className="text-xs text-[#5C5A66] leading-relaxed">
              Evaluasi porsi ekuitas vs obligasi setiap 6 bulan sekali (Juni & Desember) untuk menjaga profil risiko tetap presisi.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default InvestmentPage;
