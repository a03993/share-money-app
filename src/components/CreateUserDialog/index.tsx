import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CreateUserDialog() {
  return (
    <Dialog>
      <DialogTrigger className="text-base font-semibold text-gray-base opacity-30 hover:opacity-100 cursor-pointer">
        CREATE USER
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Users</DialogTitle>
          <DialogDescription>
            Create and share your private money list with others.
            <strong>no downloads, no sign-ups!</strong>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
