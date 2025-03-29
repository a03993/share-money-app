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

import { UserIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import { Expense } from "@/type";

export function CreateUserDialog({ users }: { users: Expense[] }) {
  const [userInputs, setUserInputs] = useState([
    { color: "#e7d3a7", name: "" },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const addUserInput = () => {
    if (userInputs.length >= 5) {
      console.error("You can only add up to 5 users");
      // TODO: toast message
      return;
    }
    setUserInputs([...userInputs, { color: "#e7d3a7", name: "" }]);
  };

  const handleCreate = () => {
    const hasEmptyName = userInputs.some((input) => input.name.trim() === "");
    if (hasEmptyName) {
      console.error("Name cannot be empty");
      // TODO: toast message
      return;
    }

    // TODO: create user to the database
    // TODO: toast message
    console.log("Create user:", userInputs);
    setUserInputs([{ color: "#e7d3a7", name: "" }]);
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (users.length <= 0) {
      console.error("You must create at least one user");
      // TODO: toast message
      return;
    }

    setUserInputs([{ color: "#e7d3a7", name: "" }]);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Desktop */}
      <DialogTrigger className="text-gray-base font-semibold opacity-30 hover:opacity-100 cursor-pointer sm:block hidden">
        CREATE USER
      </DialogTrigger>
      {/* Mobile */}
      <DialogTrigger className="opacity-30 hover:opacity-100 cursor-pointer sm:hidden">
        <UserCircleIcon className="size-5 fill-gray-base bg-transparent" />
      </DialogTrigger>
      <DialogContent className="gap-5">
        <DialogHeader>
          <DialogTitle>Create Users</DialogTitle>
          <DialogDescription>
            Create and share your private money list with others.
            <strong>no downloads, no sign-ups!</strong>
          </DialogDescription>
        </DialogHeader>
        {userInputs.map((input, index) => (
          <InputWithToggleGroup
            key={index}
            userInputs={userInputs}
            selectedColor={input.color}
            setSelectedColor={(color) => {
              const newInputs = [...userInputs];
              newInputs[index].color = color;
              setUserInputs(newInputs);
            }}
            userName={input.name}
            setUserName={(name) => {
              const newInputs = [...userInputs];
              newInputs[index].name = name;
              setUserInputs(newInputs);
            }}
            removeUser={() => {
              const newInputs = [...userInputs];
              newInputs.splice(index, 1);
              setUserInputs(newInputs);
            }}
          />
        ))}
        <Button
          variant="ghost"
          className="hover:bg-gray-light/50"
          onClick={addUserInput}
        >
          + ADD ANOTHER USER
        </Button>
        <DialogFooter>
          <Button variant="secondary" onClick={handleCreate}>
            Create
          </Button>
          <Button variant="default" onClick={handleCancel}>
            Cancel
          </Button>
          <div className="flex">
            {userInputs.map((input, index) => (
              <Avatar
                key={index}
                className="relative ml-[-6px] border-2 border-white"
              >
                <AvatarFallback className={`bg-avatar-${input.color}`}>
                  {input.name.length > 0 ? (
                    input.name.charAt(0).toUpperCase()
                  ) : (
                    <UserIcon
                      className={`size-5 fill-white bg-avatar-${input.color}`}
                    />
                  )}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
