import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { CheckCircleIcon } from "@heroicons/react/24/solid";

export function DoneSettlementCollapsible() {
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
              starred 3 done settlements
            </h4>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="size-4 stroke-gray-base" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-full border border-gray-dark bg-gray-lightest p-3 text-sm text-gray-dark">
          Andrew pay $1,000 to Ben
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-full border border-gray-dark bg-gray-lightest p-3 text-sm text-gray-dark">
            Andrew pay $1,000 to Ben
          </div>
          <div className="rounded-full border border-gray-dark bg-gray-lightest p-3 text-sm text-gray-dark">
            Andrew pay $1,000 to Ben
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
