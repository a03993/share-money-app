import { NoDataMessage } from "@/components/NoDataMessage";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Settlement as SettlementType, User as UserType } from "@/lib/type";

import * as React from "react";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ChevronsUpDown } from "lucide-react";

export function DoneSettlementCollapsible({
  users,
  settlements,
}: {
  users: UserType[];
  settlements: SettlementType[];
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const getUserName = (userId: string) => {
    return users.find((user) => user._id === userId)?.name || "Unknown";
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-base text-xl">Done Settlement List</h1>
      {settlements.length === 0 ? (
        <NoDataMessage
          title="NO DONE SETTLEMENTS FOUND!"
          description="Please check the settlement in settlement list first."
        />
      ) : (
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-[300px] space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="size-4 fill-lime-500" />
              <h4 className="text-sm font-semibold text-gray-dark">
                {settlements.length === 0
                  ? "Done settlements is empty"
                  : settlements.length > 1
                    ? `starred ${settlements.length} done settlements`
                    : `only ${settlements.length} done settlements`}
              </h4>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {settlements.length > 1 && (
                  <>
                    <ChevronsUpDown className="size-4 stroke-gray-base" />
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          {settlements.length > 0 && (
            <div
              key={0}
              className="rounded-full border border-gray-dark bg-gray-lightest p-3 text-sm text-gray-dark"
            >
              {getUserName(settlements[0].from)} pay ${settlements[0].amount} to{" "}
              {getUserName(settlements[0].to)}
            </div>
          )}
          <CollapsibleContent className="space-y-2">
            {settlements.slice(1).map((settlement, index) => (
              <div
                key={index}
                className="rounded-full border border-gray-dark bg-gray-lightest p-3 text-sm text-gray-dark"
              >
                {getUserName(settlement.from)} pay ${settlement.amount} to{" "}
                {getUserName(settlement.to)}
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
