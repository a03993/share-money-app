import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NoDataMessage } from "@/components/NoDataMessage";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

import { ExpenseItem as ExpenseItemType } from "@/type";
import { BASE_URL } from "@/constants";
import { toast } from "sonner";

function ExpenseTableRow({
  _id,
  item,
  payer,
  price,
  sharedBy,
  onDeleted,
}: ExpenseItemType & { onDeleted: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/expenses/${_id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error || "Failed to delete expense");
        return;
      }

      toast.success("Expense deleted successfully");
      onDeleted();
    } catch (err) {
      toast.error("Something went wrong while deleting expense");
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback style={{ backgroundColor: payer.color }}>
                {payer.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p>{item}</p>
              <p className="text-xs font-light text-gray-dark">{payer.name}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className="hidden sm:block"></TableCell>
        <TableCell></TableCell>
        <TableCell className="hidden sm:block"></TableCell>
        <TableCell></TableCell>
        <TableCell className="text-right">${price.toLocaleString()}</TableCell>
        <TableCell>
          <Button
            variant="ghost"
            size="md"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUpIcon className="size-5 fill-gray-light hover:fill-gray-base" />
            ) : (
              <ChevronDownIcon className="size-5 fill-gray-light hover:fill-gray-base" />
            )}
          </Button>
          <Button variant="ghost" size="md" onClick={handleDelete}>
            <TrashIcon className="size-5 fill-gray-light hover:fill-gray-base" />
          </Button>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell
            colSpan={7}
            className="px-4 bg-gray-lighter text-sm font-light text-gray-dark"
          >
            Shared by:
            <br />
            {sharedBy.map((user) => user.name).join(", ")}
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export function ExpenseTable({
  expensesByPerson,
  onDeleted,
}: {
  expensesByPerson: ExpenseItemType[];
  onDeleted: () => void;
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
