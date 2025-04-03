import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { CreateExpenseForm } from "./CreateExpenseForm";
import { ExpenseTable } from "./ExpenseTable";
import { Summary } from "../Summary";

import { ExpenseFromAPI as ExpenseType, User as UserType } from "@/type";
import { BASE_URL } from "@/constants";

export function Expense({
  users,
  totalAmount,
  setTotalAmount,
}: {
  users: UserType[];
  totalAmount: number;
  setTotalAmount: (total: number) => void;
}) {
  const { linkId } = useParams();
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${BASE_URL}/expenses/${linkId}`);
      if (!res.ok) throw new Error("Failed to fetch expenses");

      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      toast.error("Unable to load expenses.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (linkId) fetchExpenses();
  }, [linkId]);

  useEffect(() => {
    const totalAmount = expenses.reduce(
      (acc, expense) => acc + expense.price,
      0
    );
    setTotalAmount(totalAmount);
  }, [expenses, setTotalAmount]);

  return (
    <main className="grid grid-cols-2 md:grid-cols-3 gap-10 gap-x-20">
      {!isLoading && (
        <>
          <section className="col-span-2 md:col-span-3">
            <CreateExpenseForm users={users} onCreated={fetchExpenses} />
          </section>
          <section className="col-span-2 md:col-span-1">
            <Summary peopleCount={users.length} totalAmount={totalAmount} />
          </section>
          <section className="col-span-2 md:col-span-2">
            <ExpenseTable
              expensesByPerson={expenses}
              onDeleted={fetchExpenses}
            />
          </section>
        </>
      )}
    </main>
  );
}
