export interface User {
  _id: string;
  name: string;
  color: string;
}

export interface UserInput {
  color: string;
  name: string;
  [key: string]: string;
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

export interface NewExpenseItem {
  payer: string;
  item: string;
  price: number;
  sharedBy: string[];
}

export interface ExpenseItemFromAPI {
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
