export interface Expense {
  name: string;
  color: string;
  personalExpenses: {
    item: string;
    amount: number;
    sharedBy: string[];
  }[];
}

export interface ExpenseItem {
  item: string;
  payer: { name: string; color: string };
  amount: number;
  shared: string[];
}

export interface Settlement {
  payer: {
    name: string;
    color: string;
  };
  amount: number;
  payee: {
    name: string;
    color: string;
  };
  status: string;
}
