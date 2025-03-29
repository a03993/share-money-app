export interface Expense {
  name: string;
  color: string;
  personalExpenses: {
    item: string;
    price: number;
    sharedBy: string[];
  }[];
}

export interface ExpenseItem {
  item: string;
  payer: { name: string; color: string };
  price: number;
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
