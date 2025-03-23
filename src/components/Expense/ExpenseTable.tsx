import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

function ExpenseTableRow({
  item,
  payer,
  amount,
  shared,
}: {
  item: string;
  payer: { name: string; color: string };
  amount: number;
  shared: string[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback className={`bg-avatar-${payer.color}`}>
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

export function ExpenseTable() {
  // Example data
  const expenses = [
    {
      item: "expense item",
      payer: { name: "Andrew", color: "beige" },
      amount: 1050,
      shared: ["payer name", "payer name"],
    },
    {
      item: "expense item",
      payer: { name: "Ben", color: "gold" },
      amount: 550,
      shared: ["payer name", "payer name", "payer name"],
    },
    {
      item: "expense item",
      payer: { name: "Cathy", color: "yellow" },
      amount: 10,
      shared: ["payer name", "payer name"],
    },
    {
      item: "expense item",
      payer: { name: "Diana", color: "peach" },
      amount: 300,
      shared: ["payer name", "payer name", "payer name"],
    },
    {
      item: "expense item",
      payer: { name: "Ethan", color: "gray" },
      amount: 2300,
      shared: ["payer name", "payer name"],
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-base text-xl">Expense List</h1>
      <Table>
        <TableBody>
          {expenses.map((expense, index) => (
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
