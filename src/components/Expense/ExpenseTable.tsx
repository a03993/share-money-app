import { NoDataMessage } from "@/components/NoDataMessage";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { BASE_URL } from "@/lib/constants";
import { ExpenseItem as ExpenseItemType } from "@/lib/type";

import { useState } from "react";

import { TrashIcon } from "@heroicons/react/24/solid";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

function ExpenseTableRow({
  _id,
  item,
  payer,
  price,
  sharedBy,
  onDeleted,
  isSettled,
}: ExpenseItemType & { onDeleted: () => void; isSettled: boolean }) {
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
              <ChevronUp className="size-6 stroke-gray-light stroke-2 hover:stroke-gray-base" />
            ) : (
              <ChevronDown className="size-6 stroke-gray-light stroke-2 hover:stroke-gray-base" />
            )}
          </Button>
          {!isSettled && (
            <Button
              variant="ghost"
              size="md"
              onClick={handleDelete}
              disabled={isSettled}
            >
              <TrashIcon className="size-5 fill-gray-light hover:fill-gray-base " />
            </Button>
          )}
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
