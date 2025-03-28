import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { Settlement as SettlementType } from "@/type";

function SettlementTableRow({
  payer,
  amount,
  payee,
}: {
  payer: { name: string; color: string };
  amount: number;
  payee: { name: string; color: string };
}) {
  return (
    <>
      <TableRow>
        <TableCell>
          <Button variant="ghost" size="md">
            <CheckCircleIcon className="size-5 fill-gray-light hover:fill-lime-500" />
          </Button>
        </TableCell>
        <TableCell>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarFallback style={{ backgroundColor: payer.color }}>
                {payer.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-xs font-light text-gray-dark">{payer.name}</p>
          </div>
        </TableCell>
        <TableCell>pay</TableCell>
        <TableCell className="hidden sm:block"></TableCell>
        <TableCell>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarFallback style={{ backgroundColor: payee.color }}>
                {payee.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-xs font-light text-gray-dark">{payee.name}</p>
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
  settlements,
}: {
  settlements: SettlementType[];
}) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-base text-xl">Settlement List</h1>
      <Table>
        <TableBody>
          {settlements.map((settlement, index) => (
            <SettlementTableRow
              key={index}
              payer={settlement.payer}
              amount={settlement.amount}
              payee={settlement.payee}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
