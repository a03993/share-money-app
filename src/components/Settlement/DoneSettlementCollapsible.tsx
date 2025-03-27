import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { Settlement as SettlementType } from "@/type";

export function DoneSettlementCollapsible({
  settlements,
}: {
  settlements: SettlementType[];
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-base text-xl">Done Settlement List</h1>
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
            {settlements[0].payer.name} pay ${settlements[0].amount} to{" "}
            {settlements[0].payee.name}
          </div>
        )}
        <CollapsibleContent className="space-y-2">
          {settlements.slice(1).map((settlement, index) => (
            <div
              key={index}
              className="rounded-full border border-gray-dark bg-gray-lightest p-3 text-sm text-gray-dark"
            >
              {settlement.payer.name} pay ${settlement.amount} to{" "}
              {settlement.payee.name}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
