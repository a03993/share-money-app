import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

interface ExpenseItem {
  item: string;
  payer: { name: string; color: string };
  amount: number;
  shared: string[];
}

interface ExpenseTableProps {
  expensesByPerson: ExpenseItem[];
}

function ExpenseTableRow({ item, payer, amount, shared }: ExpenseItem) {
  const [isExpanded, setIsExpanded] = useState(false);

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
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell className="text-right">${amount.toLocaleString()}</TableCell>
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
          <Button variant="ghost" size="md">
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
            {shared.join(", ")}
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

// 主體 component
export function ExpenseTable({ expensesByPerson }: ExpenseTableProps) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-base text-xl">Expense List</h1>
      <Table>
        <TableBody>
          {expensesByPerson.map((expense, index) => (
            <ExpenseTableRow
              key={index}
              item={expense.item}
              payer={expense.payer}
              amount={expense.amount}
              shared={expense.shared}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
