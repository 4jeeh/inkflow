import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  StoredTransaction,
  Transaction,
  WalletAccount,
  SavingGoal,
  MonthlyCashFlow,
  defaultStoredTransactions,
  defaultWallets,
  defaultSavingGoals,
  historicalCashFlowBase,
  getCategoryIcon,
} from "@/data/mockData";
import { toast } from "sonner";

const STORAGE_KEYS = {
  TRANSACTIONS: "inkflow_transactions_v1",
  WALLETS: "inkflow_wallets_v1",
  GOALS: "inkflow_goals_v1",
  MEMO: "inkflow_sticky_memo_v1",
};

const DEFAULT_MEMO =
  "Jaga rasio tabungan di atas 60% bulan ini! Sisa budget kopi & buku sketsa aman terkendali.";

interface NewTransactionInput {
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  walletId: string;
  date: string;
  note?: string;
}

interface NewGoalInput {
  title: string;
  subtitle: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  accent: "tangerine" | "cobalt" | "sage";
  stickyNote: string;
  category: string;
}

export interface ComputedWallet extends WalletAccount {
  balance: number;
  monthlyIn: number;
  monthlyOut: number;
  transactionCount: number;
}

interface FinanceContextType {
  transactions: Transaction[];
  wallets: ComputedWallet[];
  goals: SavingGoal[];
  stickyMemo: string;
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  cashFlowSeries: MonthlyCashFlow[];
  addTransaction: (input: NewTransactionInput) => void;
  deleteTransaction: (id: string) => void;
  transferBetweenWallets: (
    fromWalletId: string,
    toWalletId: string,
    amount: number,
    note?: string
  ) => void;
  contributeToGoal: (goalId: string, amount: number) => void;
  addGoal: (goal: NewGoalInput) => void;
  deleteGoal: (goalId: string) => void;
  updateStickyMemo: (memo: string) => void;
  resetDemoData: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [storedTransactions, setStoredTransactions] = useState<StoredTransaction[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to read transactions from localStorage", e);
    }
    return defaultStoredTransactions;
  });

  const [storedWallets, setStoredWallets] = useState<WalletAccount[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.WALLETS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to read wallets from localStorage", e);
    }
    return defaultWallets;
  });

  const [goals, setGoals] = useState<SavingGoal[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.GOALS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to read goals from localStorage", e);
    }
    return defaultSavingGoals;
  });

  const [stickyMemo, setStickyMemo] = useState<string>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.MEMO);
      if (raw) return raw;
    } catch (e) {
      console.error("Failed to read memo from localStorage", e);
    }
    return DEFAULT_MEMO;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(storedTransactions));
    } catch (e) {
      console.error("Failed to save transactions", e);
    }
  }, [storedTransactions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WALLETS, JSON.stringify(storedWallets));
    } catch (e) {
      console.error("Failed to save wallets", e);
    }
  }, [storedWallets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    } catch (e) {
      console.error("Failed to save goals", e);
    }
  }, [goals]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEMO, stickyMemo);
    } catch (e) {
      console.error("Failed to save memo", e);
    }
  }, [stickyMemo]);

  const transactions: Transaction[] = useMemo(() => {
    return storedTransactions.map((tx) => ({
      ...tx,
      icon: getCategoryIcon(tx.category),
    }));
  }, [storedTransactions]);

  const wallets: ComputedWallet[] = useMemo(() => {
    return storedWallets.map((wallet) => {
      const walletTxs = storedTransactions.filter((t) => t.walletId === wallet.id);
      const monthlyIn = walletTxs
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);
      const monthlyOut = walletTxs
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);
      const balance = Number((wallet.baseBalance + monthlyIn - monthlyOut).toFixed(2));
      return {
        ...wallet,
        balance,
        monthlyIn: Number(monthlyIn.toFixed(2)),
        monthlyOut: Number(monthlyOut.toFixed(2)),
        transactionCount: walletTxs.length,
      };
    });
  }, [storedWallets, storedTransactions]);

  const monthlyIncome = useMemo(() => {
    return Number(
      storedTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0)
        .toFixed(2)
    );
  }, [storedTransactions]);

  const monthlyExpenses = useMemo(() => {
    return Number(
      storedTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0)
        .toFixed(2)
    );
  }, [storedTransactions]);

  const totalBalance = useMemo(() => {
    return Number(wallets.reduce((sum, w) => sum + w.balance, 0).toFixed(2));
  }, [wallets]);

  const savingsRate = useMemo(() => {
    if (monthlyIncome <= 0) return 0;
    const net = monthlyIncome - monthlyExpenses;
    return Number(Math.max(0, (net / monthlyIncome) * 100).toFixed(1));
  }, [monthlyIncome, monthlyExpenses]);

  const cashFlowSeries: MonthlyCashFlow[] = useMemo(() => {
    const janIncome = Math.round(monthlyIncome);
    const janExpenses = Math.round(monthlyExpenses);
    return [
      ...historicalCashFlowBase.map((item) => ({
        ...item,
        net: item.income - item.expenses,
      })),
      {
        month: "Jan (Live)",
        income: janIncome,
        expenses: janExpenses,
        net: janIncome - janExpenses,
      },
    ];
  }, [monthlyIncome, monthlyExpenses]);

  const addTransaction = (input: NewTransactionInput) => {
    const newTx: StoredTransaction = {
      id: `tx-${Date.now()}`,
      description: input.description.trim(),
      amount: Number(Number(input.amount).toFixed(2)),
      type: input.type,
      category: input.category,
      walletId: input.walletId || "wallet-main",
      date: input.date || new Date().toISOString().slice(0, 10),
      note: input.note?.trim() || undefined,
    };

    setStoredTransactions((prev) => [newTx, ...prev]);
    toast.success(
      input.type === "income"
        ? `Pemasukan +$${newTx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })} dicatat ke buku tinta!`
        : `Pengeluaran -$${newTx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })} dicatat ke buku tinta!`
    );
  };

  const deleteTransaction = (id: string) => {
    setStoredTransactions((prev) => prev.filter((t) => t.id !== id));
    toast.info("Catatan transaksi dihapus dari buku jurnal.");
  };

  const transferBetweenWallets = (
    fromWalletId: string,
    toWalletId: string,
    amount: number,
    note?: string
  ) => {
    if (fromWalletId === toWalletId || amount <= 0) return;
    const cleanAmount = Number(Number(amount).toFixed(2));
    setStoredWallets((prev) =>
      prev.map((w) => {
        if (w.id === fromWalletId) {
          return { ...w, baseBalance: Number((w.baseBalance - cleanAmount).toFixed(2)) };
        }
        if (w.id === toWalletId) {
          return { ...w, baseBalance: Number((w.baseBalance + cleanAmount).toFixed(2)) };
        }
        return w;
      })
    );
    const fromName = storedWallets.find((w) => w.id === fromWalletId)?.name || "Wallet";
    const toName = storedWallets.find((w) => w.id === toWalletId)?.name || "Wallet";
    toast.success(
      `Transfer $${cleanAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })} dari ${fromName} ke ${toName} berhasil!${note ? ` (${note})` : ""}`
    );
  };

  const contributeToGoal = (goalId: string, amount: number) => {
    if (amount <= 0) return;
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;
        const nextAmount = Math.min(goal.targetAmount, Number((goal.currentAmount + amount).toFixed(2)));
        return {
          ...goal,
          currentAmount: nextAmount,
          deadline: nextAmount >= goal.targetAmount ? "Completed" : goal.deadline,
        };
      })
    );
    toast.success(`Tabungan +$${amount.toLocaleString()} berhasil ditambahkan ke target!`);
  };

  const addGoal = (goalInput: NewGoalInput) => {
    const newGoal: SavingGoal = {
      ...goalInput,
      id: `goal-${Date.now()}`,
    };
    setGoals((prev) => [newGoal, ...prev]);
    toast.success(`Target tabungan "${newGoal.title}" berhasil dibuat!`);
  };

  const deleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
    toast.info("Target tabungan dihapus.");
  };

  const updateStickyMemo = (memo: string) => {
    setStickyMemo(memo);
    toast.success("Sticky note berhasil diperbarui!");
  };

  const resetDemoData = () => {
    setStoredTransactions(defaultStoredTransactions);
    setStoredWallets(defaultWallets);
    setGoals(defaultSavingGoals);
    setStickyMemo(DEFAULT_MEMO);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEYS.WALLETS);
    localStorage.removeItem(STORAGE_KEYS.GOALS);
    localStorage.removeItem(STORAGE_KEYS.MEMO);
    toast.success("Data jurnal inkflow dikembalikan ke setelan awal.");
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        wallets,
        goals,
        stickyMemo,
        totalBalance,
        monthlyIncome,
        monthlyExpenses,
        savingsRate,
        cashFlowSeries,
        addTransaction,
        deleteTransaction,
        transferBetweenWallets,
        contributeToGoal,
        addGoal,
        deleteGoal,
        updateStickyMemo,
        resetDemoData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return ctx;
}
