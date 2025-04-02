import { CreateExpenseForm } from "./CreateExpenseForm";
import { ExpenseTable } from "./ExpenseTable";
import { Summary } from "../Summary";

import { cn } from "@/lib/utils";

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
    <main
      className={cn(
        "grid md:grid-cols-3 gap-10",
        flattenedExpenses.length > 0 ? "" : "gap-x-20"
      )}
    >
      <section className="md:col-span-3">
        <CreateExpenseForm users={expenses} />
      </section>
      <section>
        <Summary peopleCount={expenses.length} totalAmount={totalAmount} />
      </section>
      <section className={flattenedExpenses.length > 0 ? "" : "md:col-span-2"}>
        <ExpenseTable expensesByPerson={flattenedExpenses} />
      </section>
    </main>
  );
}
