import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BASE_URL } from "@/lib/constants";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

export function CheckDialogContent({
  setIsOpen,
  settlementId,
  onSuccess,
}: {
  setIsOpen: (isOpen: boolean) => void;
  settlementId: string;
  onSuccess: () => void;
}) {
  const handleConfirm = async () => {
    try {
      const res = await fetch(`${BASE_URL}/settlements/${settlementId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "done" }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error || "Failed to update settlement");
        return;
      }

      toast.success("Settlement marked as done");
      setIsOpen(false);
      onSuccess();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <DialogContent
      onInteractOutside={(e) => e.preventDefault()}
      onEscapeKeyDown={(e) => e.preventDefault()}
    >
      <DialogHeader className="gap-5">
        <DialogTitle className="flex items-center gap-2">
          <ExclamationTriangleIcon className="size-9 fill-toast-green-base stroke-white" />
          Check Settlement
        </DialogTitle>
        <DialogDescription className="flex flex-col gap-3">
          <p>
            Marking this settlement as done will permanently lock expense
            editing for this group. You won’t be able to add or delete any
            expenses.
          </p>
          <p className="font-bold">
            Proceed only if everyone has finished spending.
          </p>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-8">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="default" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
