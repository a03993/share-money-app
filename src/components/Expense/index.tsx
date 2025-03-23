import { ExpenseTable } from "./ExpenseTable";
import { Summary } from "../Summary";

export function Expense() {
  return (
    <main className="grid md:grid-cols-2 gap-10">
      <section className="border border-gray-dark md:col-span-2">
        Expense Create Form
      </section>
      <section>
        <Summary />
      </section>
      <section>
        <ExpenseTable />
      </section>
    </main>
  );
}
