import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export function CheckDialogContent({
  setIsOpen,
  onStatusUpdate,
}: {
  setIsOpen: (isOpen: boolean) => void;
  onStatusUpdate: () => void;
}) {
  const handleConfirm = () => {
    onStatusUpdate();
    setIsOpen(false);
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
          <ExclamationTriangleIcon className="size-9 fill-success-base stroke-white" />
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
