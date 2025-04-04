import { NoDataMessage } from "@/components/NoDataMessage";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Settlement as SettlementType, User as UserType } from "@/lib/type";

import { useState } from "react";

import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { CheckDialogContent } from "./CheckDialogContent";

function SettlementTableRow({
  id,
  from,
  to,
  amount,
  onStatusUpdated,
}: {
  id: string;
  from: { name: string; color: string };
  amount: number;
  to: { name: string; color: string };
  onStatusUpdated: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <Button variant="ghost" size="md">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <CheckCircleIcon className="size-5 fill-gray-light hover:fill-lime-500" />
              </DialogTrigger>
              <CheckDialogContent
                setIsOpen={setIsOpen}
                settlementId={id}
                onSuccess={onStatusUpdated}
              />
            </Dialog>
          </Button>
        </TableCell>
        <TableCell>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarFallback style={{ backgroundColor: from.color }}>
                {from.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-xs font-light text-gray-dark">{from.name}</p>
          </div>
        </TableCell>
        <TableCell>pay</TableCell>
        <TableCell className="hidden sm:block"></TableCell>
        <TableCell>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarFallback style={{ backgroundColor: to.color }}>
                {to.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-xs font-light text-gray-dark">{to.name}</p>
          </div>
        </TableCell>
        <TableCell className="hidden sm:block"></TableCell>
        <TableCell className="text-left">${amount.toLocaleString()}</TableCell>
        <TableCell className="hidden sm:block"></TableCell>
      </TableRow>
    </>
  );
}

export function SettlementTable({
  users,
  settlements,
  onStatusUpdated,
}: {
  users: UserType[];
  settlements: SettlementType[];
  onStatusUpdated: () => void;
}) {
  console.log("settlements", settlements);

  if (settlements.length === 0) {
    return (
      <NoDataMessage
        title="NO SETTLEMENT FOUND!"
        description="Please add some expenses items in the Expenses page first."
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-base text-xl">Settlement List</h1>
      <Table>
        <TableBody>
          {settlements.map((settlement, index) => {
            const fromUser = users.find((u) => u._id === settlement.from);
            const toUser = users.find((u) => u._id === settlement.to);

            if (!fromUser || !toUser) return null;

            return (
              <SettlementTableRow
                key={index}
                id={settlement._id}
                from={fromUser}
                to={toUser}
                amount={settlement.amount}
                onStatusUpdated={onStatusUpdated}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
