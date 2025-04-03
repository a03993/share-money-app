import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { BASE_URL } from "@/constants";

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
      <DialogHeader>
        <DialogTitle>Check Settlement</DialogTitle>
        <DialogDescription>
          Once a settlement is marked as “done”, no more expenses can be added.
          Click the button below if you’re ready to settle up.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="secondary" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button variant="default" onClick={handleCancel}>
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
