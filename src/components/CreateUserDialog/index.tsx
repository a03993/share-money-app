import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputWithToggleGroup } from "./InputWithToggleGroup";

export function CreateUserDialog() {
  const [selectedColor, setSelectedColor] = useState("yellow");

  return (
    <Dialog>
      <DialogTrigger className="text-base font-semibold text-gray-base opacity-30 hover:opacity-100 cursor-pointer">
        CREATE USER
      </DialogTrigger>
      <DialogContent className="gap-5">
        <DialogHeader>
          <DialogTitle>Create Users</DialogTitle>
          <DialogDescription>
            Create and share your private money list with others.
            <strong>no downloads, no sign-ups!</strong>
          </DialogDescription>
        </DialogHeader>
        <InputWithToggleGroup
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <Button variant="ghost" className="hover:bg-gray-light/50">
          + ADD ANOTHER USER
        </Button>
        <DialogFooter>
          <Button variant="secondary">Create</Button>
          <Button variant="default">Cancel</Button>
          <Avatar>
            <AvatarFallback
              className={`bg-avatar-${selectedColor}`}
            ></AvatarFallback>
          </Avatar>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
