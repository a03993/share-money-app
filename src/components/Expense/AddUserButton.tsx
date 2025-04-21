import { Button } from "@/components/ui/button";

interface AddUserButtonProps {
  onClick: () => void;
  label?: string;
}

export function AddUserButton({
  onClick,
  label = "Add new payer",
}: AddUserButtonProps) {
  return (
    <Button
      variant="ghost"
      size="lg"
      className="text-gray-dark font-normal rounded-sm w-full"
      onClick={onClick}
    >
      <span>+ {label}</span>
    </Button>
  );
}
