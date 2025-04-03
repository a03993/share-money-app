export interface User {
  _id: string;
  name: string;
  color: string;
}

export interface ExpenseItem {
  _id: string;
  item: string;
  payer: {
    _id: string;
    name: string;
    color: string;
  };
  price: number;
  sharedBy: {
    _id: string;
    name: string;
    color?: string;
  }[];
}

export interface Expense {
  _id: string;
  name: string;
  color: string;
  personalExpenses: ExpenseItem[];
}

export interface ExpenseFromAPI {
  _id: string;
  item: string;
  price: number;
  payer: User;
  sharedBy: User[];
  createdAt?: string;
}

export interface Settlement {
  _id: string;
  from: string;
  amount: number;
  to: string;
  status: string;
}

export interface SplitData {
  id: number;
  createdAt: string;
  expiresAt: string;
  expenses: Expense[];
  settlements: Settlement[];
}
