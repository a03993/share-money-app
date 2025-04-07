import { BASE_URL } from "@/lib/constants";
import {
  ExpenseItemFromAPI as ExpenseType,
  User as UserType,
} from "@/lib/type";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "sonner";

import { Summary } from "../Summary";
import { CreateExpenseForm } from "./CreateExpenseForm";
import { ExpenseTable } from "./ExpenseTable";

interface ExpenseProps {
  users: UserType[];
  totalAmount: number;
  setTotalAmount: (total: number) => void;
  isSettled: boolean;
}

export function Expense({
  users,
  totalAmount,
  setTotalAmount,
  isSettled,
}: ExpenseProps) {
  const { linkId } = useParams();
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${BASE_URL}/expenses/${linkId}`);
      if (!res.ok) throw new Error("Failed to fetch expenses");

      const data = await res.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      toast.error("Can not find expenses, please try again.");
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
      0,
    );
    setTotalAmount(totalAmount);
  }, [expenses, setTotalAmount]);

  if (isLoading) return null;

  return (
    <main className="grid grid-cols-2 md:grid-cols-3 gap-10 gap-x-20">
      <>
        <section className="col-span-2 md:col-span-3">
          <CreateExpenseForm
            users={users}
            onCreated={fetchExpenses}
            isSettled={isSettled}
          />
        </section>
        <section className="col-span-2 md:col-span-1">
          <Summary peopleCount={users.length} totalAmount={totalAmount} />
        </section>
        <section className="col-span-2 md:col-span-2">
          <ExpenseTable
            expensesByPerson={expenses}
            onDeleted={fetchExpenses}
            isSettled={isSettled}
          />
        </section>
      </>
    </main>
  );
}
