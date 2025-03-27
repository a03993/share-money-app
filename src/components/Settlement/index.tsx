import { AvatarGroup } from "./AvatarGroup";
import { DoneSettlementCollapsible } from "./DoneSettlementCollapsible";
import { SettlementTable } from "./SettlementTable";
import { SplitAmount } from "./SplitAmount";
import { Summary } from "../Summary";

import { Expense as ExpenseType, Settlement as SettlementType } from "@/type";

interface SettlementProps {
  expenses: ExpenseType[];
  totalAmount: number;
  settlements: SettlementType[];
}

export function Settlement({
  expenses,
  totalAmount,
  settlements,
}: SettlementProps) {
  const pendingSettlements = settlements.filter(
    (settlement) => settlement.status === "pending"
  );
  const doneSettlements = settlements.filter(
    (settlement) => settlement.status === "done"
  );

  return (
    <main className="grid md:grid-cols-3 gap-10">
      <section>
        <SplitAmount peopleCount={expenses.length} totalAmount={totalAmount} />
      </section>
      <section className="flex justify-center items-center">
        <AvatarGroup />
      </section>
      <section>
        <Summary
          className="gap-5"
          peopleCount={expenses.length}
          totalAmount={totalAmount}
          inSettlement
        />
      </section>
      <section className="flex gap-5 flex-col mt-5 md:flex-row md:gap-15 md:col-span-3 md:mt-10">
        <SettlementTable settlements={pendingSettlements} />
        <DoneSettlementCollapsible settlements={doneSettlements} />
      </section>
    </main>
  );
}
