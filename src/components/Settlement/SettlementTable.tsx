import { NoDataMessage } from "@/components/NoDataMessage";
import { Table, TableBody } from "@/components/ui/table";
import { Settlement as SettlementType, User as UserType } from "@/lib/type";

import { SettlementTableRow } from "./SettlementTableRow";

interface SettlementTableProps {
  users: UserType[];
  settlements: SettlementType[];
  pendingSettlements: SettlementType[];
  onStatusUpdated: () => void;
  onRefetchLinkData: () => void;
  isSettled: boolean;
}

export function SettlementTable({
  users,
  settlements,
  pendingSettlements,
  onStatusUpdated,
  onRefetchLinkData,
  isSettled,
}: SettlementTableProps) {
  if (settlements.length === 0) {
    return (
      <NoDataMessage
        title="NO SETTLEMENT FOUND!"
        description="Please add some expenses items in the Expenses page first."
        className="w-full"
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-base text-xl">Settlement List</h1>
      {pendingSettlements.length > 0 ? (
        <Table>
          <TableBody>
            {pendingSettlements.map((settlement, index) => {
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
                  onRefetchLinkData={onRefetchLinkData}
                  isSettled={isSettled}
                />
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <NoDataMessage
          title="ALL SETTLEMENTS DONE!"
          description="No more pending payments. Thanks for using ShareMoney. You're all settled!"
          className="bg-success-light text-success-dark max-w-sm"
        />
      )}
    </div>
  );
}
