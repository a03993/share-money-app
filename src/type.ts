export interface User {
  name: string;
  color: string;
}

export interface ExpenseItem {
  item: string;
  price: number;
  shared: string[];
}

export interface Expense {
  name: string;
  color: string;
  personalExpenses: ExpenseItem[];
}

export interface Settlement {
  payer: User;
  amount: number;
  payee: User;
  status: string;
}

export interface SplitData {
  id: number;
  createdAt: string;
  expiresAt: string;
  expenses: Expense[];
  settlements: Settlement[];
}
