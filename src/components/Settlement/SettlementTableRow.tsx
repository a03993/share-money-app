import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { BASE_URL } from "@/lib/constants";

import { useState } from "react";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";

import { CheckDialogContent } from "./CheckDialogContent";

interface SettlementTableRowProps {
  id: string;
  from: { name: string; color: string };
  amount: number;
  to: { name: string; color: string };
  onStatusUpdated: () => void;
  onRefetchLinkData: () => void;
  isSettled: boolean;
}

export function SettlementTableRow({
  id,
  from,
  to,
  amount,
  onStatusUpdated,
  onRefetchLinkData,
  isSettled,
}: SettlementTableRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusUpdate = async () => {
    try {
      const res = await fetch(`${BASE_URL}/settlements/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "done" }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error || "Failed to update settlement");
        return;
      }

      toast.success("Settlement marked as done");
      onStatusUpdated();
      onRefetchLinkData();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleClick = () => {
    if (isSettled) {
      setIsOpen(false);
      handleStatusUpdate();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <CheckCircleIcon
              className="size-5 fill-gray-light hover:fill-success-base cursor-pointer"
              onClick={handleClick}
            />
            <CheckDialogContent
              setIsOpen={setIsOpen}
              onStatusUpdate={handleStatusUpdate}
            />
          </Dialog>
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
        <TableCell className="hidden sm:block"></TableCell>
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
      </TableRow>
    </>
  );
}
