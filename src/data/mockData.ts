import { Utensils, Car, Briefcase, Gamepad2, ShoppingBag, Lightbulb, Coffee, Music, Plane, Home } from "lucide-react";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  date: string;
}

export const transactions: Transaction[] = [
  {
    id: "1",
    description: "Monthly Salary",
    amount: 5200.00,
    type: "income",
    category: "Salary",
    icon: Briefcase,
    date: "2024-01-15",
  },
  {
    id: "2",
    description: "Grocery Shopping",
    amount: 156.32,
    type: "expense",
    category: "Food",
    icon: Utensils,
    date: "2024-01-14",
  },
  {
    id: "3",
    description: "Uber Ride",
    amount: 24.50,
    type: "expense",
    category: "Transport",
    icon: Car,
    date: "2024-01-14",
  },
  {
    id: "4",
    description: "Netflix Subscription",
    amount: 15.99,
    type: "expense",
    category: "Entertainment",
    icon: Gamepad2,
    date: "2024-01-13",
  },
  {
    id: "5",
    description: "Freelance Project",
    amount: 850.00,
    type: "income",
    category: "Salary",
    icon: Briefcase,
    date: "2024-01-12",
  },
  {
    id: "6",
    description: "Amazon Purchase",
    amount: 89.99,
    type: "expense",
    category: "Shopping",
    icon: ShoppingBag,
    date: "2024-01-11",
  },
  {
    id: "7",
    description: "Electric Bill",
    amount: 124.00,
    type: "expense",
    category: "Utilities",
    icon: Lightbulb,
    date: "2024-01-10",
  },
  {
    id: "8",
    description: "Starbucks Coffee",
    amount: 6.45,
    type: "expense",
    category: "Food",
    icon: Coffee,
    date: "2024-01-10",
  },
  {
    id: "9",
    description: "Spotify Premium",
    amount: 9.99,
    type: "expense",
    category: "Entertainment",
    icon: Music,
    date: "2024-01-09",
  },
  {
    id: "10",
    description: "Gas Station",
    amount: 52.00,
    type: "expense",
    category: "Transport",
    icon: Car,
    date: "2024-01-08",
  },
  {
    id: "11",
    description: "Flight Booking",
    amount: 320.00,
    type: "expense",
    category: "Transport",
    icon: Plane,
    date: "2024-01-07",
  },
  {
    id: "12",
    description: "Rent Payment",
    amount: 1500.00,
    type: "expense",
    category: "Utilities",
    icon: Home,
    date: "2024-01-05",
  },
];

export const cashFlowData = [
  { month: "Jul", income: 4800, expenses: 3200 },
  { month: "Aug", income: 5100, expenses: 3400 },
  { month: "Sep", income: 4900, expenses: 3100 },
  { month: "Oct", income: 5400, expenses: 3600 },
  { month: "Nov", income: 5200, expenses: 3300 },
  { month: "Dec", income: 6100, expenses: 4200 },
  { month: "Jan", income: 6050, expenses: 2299 },
];

export const statsData = {
  totalBalance: 24562.80,
  monthlyIncome: 6050.00,
  monthlyExpenses: 2299.24,
};