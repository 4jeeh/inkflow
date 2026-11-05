import {
  Utensils,
  Car,
  Briefcase,
  Gamepad2,
  ShoppingBag,
  Lightbulb,
  Coffee,
  Music,
  Plane,
  Home,
  Sparkles,
  Laptop,
  PiggyBank,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

export type TransactionCategory =
  | "Salary"
  | "Freelance"
  | "Food & Coffee"
  | "Transport"
  | "Software & Tools"
  | "Shopping"
  | "Utilities & Rent"
  | "Entertainment"
  | "Investment";

export interface StoredTransaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: TransactionCategory | string;
  walletId: string;
  date: string;
  note?: string;
}

export interface Transaction extends StoredTransaction {
  icon: LucideIcon;
}

export interface WalletAccount {
  id: string;
  name: string;
  subtitle: string;
  cardNumber: string;
  holder: string;
  expiry: string;
  baseBalance: number;
  accent: "cobalt" | "sage" | "tangerine";
  pattern: "cobalt-arch" | "sage-botanical" | "tangerine-bauhaus";
  tag: string;
}

export interface SavingGoal {
  id: string;
  title: string;
  subtitle: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  accent: "tangerine" | "cobalt" | "sage";
  stickyNote: string;
  category: string;
}

export interface MonthlyCashFlow {
  month: string;
  income: number;
  expenses: number;
  net: number;
}

export const CATEGORIES: {
  name: TransactionCategory;
  type: "income" | "expense" | "both";
  color: string;
}[] = [
  { name: "Salary", type: "income", color: "#84CC16" },
  { name: "Freelance", type: "income", color: "#3B82F6" },
  { name: "Food & Coffee", type: "expense", color: "#FB923C" },
  { name: "Software & Tools", type: "expense", color: "#3B82F6" },
  { name: "Transport", type: "expense", color: "#FB923C" },
  { name: "Utilities & Rent", type: "expense", color: "#1E1E24" },
  { name: "Shopping", type: "expense", color: "#FB923C" },
  { name: "Entertainment", type: "expense", color: "#3B82F6" },
  { name: "Investment", type: "both", color: "#84CC16" },
];

export function getCategoryIcon(category: string): LucideIcon {
  switch (category) {
    case "Salary":
      return Briefcase;
    case "Freelance":
      return Sparkles;
    case "Food & Coffee":
    case "Food":
      return Coffee;
    case "Transport":
      return Car;
    case "Software & Tools":
      return Laptop;
    case "Shopping":
      return ShoppingBag;
    case "Utilities & Rent":
    case "Utilities":
      return Home;
    case "Entertainment":
      return Gamepad2;
    case "Investment":
      return TrendingUp;
    default:
      return Utensils;
  }
}

export const defaultWallets: WalletAccount[] = [
  {
    id: "wallet-main",
    name: "Ink Main Checking",
    subtitle: "Primary Editorial Account",
    cardNumber: "4829 •••• •••• 9104",
    holder: "JIDDAN IBNU ALI",
    expiry: "09/28",
    baseBalance: 14200.0,
    accent: "cobalt",
    pattern: "cobalt-arch",
    tag: "Primary Payroll",
  },
  {
    id: "wallet-studio",
    name: "Studio Kroma Vault",
    subtitle: "Freelance & Creative Retainers",
    cardNumber: "5390 •••• •••• 4412",
    holder: "JIDDAN IBNU ALI",
    expiry: "11/29",
    baseBalance: 5150.0,
    accent: "sage",
    pattern: "sage-botanical",
    tag: "Design Studio",
  },
  {
    id: "wallet-pocket",
    name: "Espresso & Daily Pocket",
    subtitle: "Daily Spend & Subscriptions",
    cardNumber: "4118 •••• •••• 3308",
    holder: "JIDDAN IBNU ALI",
    expiry: "04/27",
    baseBalance: 1462.04,
    accent: "tangerine",
    pattern: "tangerine-bauhaus",
    tag: "Daily Allowance",
  },
];

export const defaultStoredTransactions: StoredTransaction[] = [
  {
    id: "tx-1",
    description: "Lead Frontend Architecture Salary",
    amount: 5200.0,
    type: "income",
    category: "Salary",
    walletId: "wallet-main",
    date: "2025-01-15",
    note: "Gaji bulanan utama — alokasi 35% ke tabungan!",
  },
  {
    id: "tx-2",
    description: "Design System Audit — Studio Retainer",
    amount: 1450.0,
    type: "income",
    category: "Freelance",
    walletId: "wallet-studio",
    date: "2025-01-14",
    note: "Proyek UI/UX sprint bersama klien kreatif",
  },
  {
    id: "tx-3",
    description: "Studio Apartment & Fiber Internet",
    amount: 1250.0,
    type: "expense",
    category: "Utilities & Rent",
    walletId: "wallet-main",
    date: "2025-01-12",
    note: "Sewa studio bulanan + listrik & Wi-Fi",
  },
  {
    id: "tx-4",
    description: "Figma Pro, Raycast & Vercel Team",
    amount: 64.0,
    type: "expense",
    category: "Software & Tools",
    walletId: "wallet-studio",
    date: "2025-01-11",
    note: "Langganan kakas kerja wajib",
  },
  {
    id: "tx-5",
    description: "Artisan Pour-Over Beans & Groceries",
    amount: 148.5,
    type: "expense",
    category: "Food & Coffee",
    walletId: "wallet-pocket",
    date: "2025-01-10",
    note: "Stok biji kopi Arabika Gayo & belanja dapur",
  },
  {
    id: "tx-6",
    description: "Mechanical Keycaps & Sketchbooks",
    amount: 112.0,
    type: "expense",
    category: "Shopping",
    walletId: "wallet-pocket",
    date: "2025-01-09",
    note: "Buku sketsa dotted A4 + tinta fountain pen",
  },
  {
    id: "tx-7",
    description: "MRT Pass & Ride Hailing",
    amount: 46.2,
    type: "expense",
    category: "Transport",
    walletId: "wallet-pocket",
    date: "2025-01-08",
  },
  {
    id: "tx-8",
    description: "Spotify Duo & MUBI Cinema",
    amount: 24.99,
    type: "expense",
    category: "Entertainment",
    walletId: "wallet-pocket",
    date: "2025-01-06",
  },
  {
    id: "tx-9",
    description: "Global Index ETF Auto-Invest",
    amount: 600.0,
    type: "expense",
    category: "Investment",
    walletId: "wallet-main",
    date: "2025-01-05",
    note: "DCA rutin awal bulan",
  },
];

export const defaultSavingGoals: SavingGoal[] = [
  {
    id: "goal-1",
    title: "MacBook Pro M4 Max Studio Rig",
    subtitle: "64GB Unified Memory + Pro Display Calibration",
    targetAmount: 4200,
    currentAmount: 3550,
    deadline: "Mar 2025",
    accent: "tangerine",
    stickyNote: "Tinggal $650 lagi! 1 sprint freelance langsung lunas.",
    category: "Creative Gear",
  },
  {
    id: "goal-2",
    title: "Tokyo & Kyoto Sketchbook Trip",
    subtitle: "12-Day Autumn Design & Architecture Residency",
    targetAmount: 5500,
    currentAmount: 3850,
    deadline: "Oct 2025",
    accent: "cobalt",
    stickyNote: "Tiket pesawat + JR Pass + toko alat tulis Itoya Ginza!",
    category: "Travel & Inspiration",
  },
  {
    id: "goal-3",
    title: "6-Month Emergency Ink Buffer",
    subtitle: "Liquid High-Yield Cash Reserve",
    targetAmount: 12000,
    currentAmount: 9800,
    deadline: "Jun 2025",
    accent: "sage",
    stickyNote: "Dana darurat tenang pikiran — jangan disentuh untuk impulsif.",
    category: "Safety Net",
  },
  {
    id: "goal-4",
    title: "Herman Miller Aeron & Oak Desk",
    subtitle: "Ergonomic Home Studio Upgrade",
    targetAmount: 1800,
    currentAmount: 1800,
    deadline: "Completed",
    accent: "sage",
    stickyNote: "100% Tercapai! Siap checkout minggu ini.",
    category: "Studio Setup",
  },
];

export const historicalCashFlowBase: Omit<MonthlyCashFlow, "net">[] = [
  { month: "Jul", income: 4950, expenses: 3120 },
  { month: "Aug", income: 5400, expenses: 3280 },
  { month: "Sep", income: 5180, expenses: 2890 },
  { month: "Oct", income: 6100, expenses: 3450 },
  { month: "Nov", income: 5750, expenses: 3190 },
  { month: "Dec", income: 6420, expenses: 3840 },
];

export const transactions: Transaction[] = defaultStoredTransactions.map((tx) => ({
  ...tx,
  icon: getCategoryIcon(tx.category),
}));

export const cashFlowData: MonthlyCashFlow[] = [
  ...historicalCashFlowBase.map((m) => ({ ...m, net: m.income - m.expenses })),
  { month: "Jan", income: 6650, expenses: 2245.69, net: 4404.31 },
];

export const statsData = {
  totalBalance: 25216.35,
  monthlyIncome: 6650.0,
  monthlyExpenses: 2245.69,
};
