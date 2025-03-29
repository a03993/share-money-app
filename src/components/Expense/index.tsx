import { CreateExpenseForm } from "./CreateExpenseForm";
import { ExpenseTable } from "./ExpenseTable";
import { Summary } from "../Summary";

import { User as UserType, Expense as ExpenseType } from "@/type";

interface ExpenseProps {
  expenses: ExpenseType[];
  flattenedExpenses: {
    payer: UserType;
    item: string;
    price: number;
    shared: string[];
  }[];
  totalAmount: number;
}

export function Expense({
  expenses,
  flattenedExpenses,
  totalAmount,
}: ExpenseProps) {
  return (
    <main className="grid md:grid-cols-2 gap-10">
      <section className="md:col-span-2">
        <CreateExpenseForm users={expenses} />
      </section>
      <section>
        <Summary peopleCount={expenses.length} totalAmount={totalAmount} />
      </section>
      <section>
        <ExpenseTable expensesByPerson={flattenedExpenses} />
      </section>
    </main>
  );
}
