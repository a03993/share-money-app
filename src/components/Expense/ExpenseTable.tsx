import { NoDataMessage } from "@/components/NoDataMessage";
import { Table, TableBody } from "@/components/ui/table";
import { ExpenseItem as ExpenseItemType } from "@/lib/type";

import { ExpenseTableRow } from "./ExpenseTableRow";

export function ExpenseTable({
  expensesByPerson,
  onDeleted,
  isSettled,
}: {
  expensesByPerson: ExpenseItemType[];
  onDeleted: () => void;
  isSettled: boolean;
}) {
  const groupedExpenses = [...expensesByPerson].sort((a, b) => {
    if (a.payer._id < b.payer._id) return -1;
    if (a.payer._id > b.payer._id) return 1;
    return 0;
  });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-base text-xl">Expense List</h1>
      {expensesByPerson.length > 0 ? (
        <Table>
          <TableBody>
            {groupedExpenses.map((expense, index) => (
              <ExpenseTableRow
                key={index}
                _id={expense._id}
                item={expense.item}
                payer={expense.payer}
                price={expense.price}
                sharedBy={expense.sharedBy}
                onDeleted={onDeleted}
                isSettled={isSettled}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoDataMessage
          title="NO EXPENSES FOUND!"
          description="Please add some expenses using the form above."
        />
      )}
    </div>
  );
}
