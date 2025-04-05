import { BASE_URL } from "@/lib/constants";
import { Settlement as SettlementType, User as UserType } from "@/lib/type";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "sonner";

import { Summary } from "../Summary";
import { AvatarGroup } from "./AvatarGroup";
import { DoneSettlementCollapsible } from "./DoneSettlementCollapsible";
import { SettlementTable } from "./SettlementTable";
import { SplitAmount } from "./SplitAmount";

interface SettlementProps {
  users: UserType[];
  totalAmount: number;
  isSettled: boolean;
  onRefetchLinkData: () => void;
}

export function Settlement({
  users,
  totalAmount,
  isSettled,
  onRefetchLinkData,
}: SettlementProps) {
  const { linkId } = useParams();
  const [settlements, setSettlements] = useState<SettlementType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettlements = async () => {
    try {
      const res = await fetch(`${BASE_URL}/settlements/${linkId}`);
      if (!res.ok) throw new Error("Failed to fetch settlements");
      const data = await res.json();
      setSettlements(data);
    } catch (err) {
      toast.error("Unable to fetch settlements");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (linkId) fetchSettlements();
  }, [linkId]);

  const pendingSettlements = settlements.filter((s) => s.status === "pending");
  const doneSettlements = settlements.filter((s) => s.status === "done");

  if (isLoading) return null;

  return (
    <main className="grid md:grid-cols-3 gap-10">
      <section>
        <SplitAmount peopleCount={users.length} totalAmount={totalAmount} />
      </section>
      <section className="flex justify-center items-center">
        <AvatarGroup users={users} />
      </section>
      <section>
        <Summary
          className="gap-5"
          peopleCount={users.length}
          totalAmount={totalAmount}
          inSettlement
        />
      </section>
      <section className="flex gap-5 flex-col mt-5 md:flex-row md:gap-15 md:col-span-3 md:mt-10">
        <SettlementTable
          users={users}
          settlements={settlements}
          pendingSettlements={pendingSettlements}
          onStatusUpdated={fetchSettlements}
          onRefetchLinkData={onRefetchLinkData}
          isSettled={isSettled}
        />
        {settlements.length > 0 && (
          <DoneSettlementCollapsible
            users={users}
            settlements={doneSettlements}
          />
        )}
      </section>
    </main>
  );
}
