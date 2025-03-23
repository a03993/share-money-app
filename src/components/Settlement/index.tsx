import { AvatarGroup } from "./AvatarGroup";
import { DoneSettlementCollapsible } from "./DoneSettlementCollapsible";
import { SettlementTable } from "./SettlementTable";
import { SplitAmount } from "./SplitAmount";
import { Summary } from "../Summary";

export function Settlement({}) {
  return (
    <main className="grid md:grid-cols-3 gap-10">
      <section>
        <SplitAmount />
      </section>
      <section className="flex justify-center items-center">
        <AvatarGroup />
      </section>
      <section>
        <Summary className="gap-5" inSettlement />
      </section>
      <section className="flex gap-5 flex-col mt-5 md:flex-row md:gap-15 md:col-span-3 md:mt-10">
        <SettlementTable />
        <DoneSettlementCollapsible />
      </section>
    </main>
  );
}
