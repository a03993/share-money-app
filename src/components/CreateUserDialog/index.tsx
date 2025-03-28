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

export function CreateUserDialog() {
  const [userInputs, setUserInputs] = useState([{ color: "yellow", name: "" }]);

  const addUserInput = () => {
    if (userInputs.length < 5) {
      setUserInputs([...userInputs, { color: "yellow", name: "" }]);
    }
    // Todo: toast message
  };

  return (
    <Dialog>
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
          <Button variant="secondary">Create</Button>
          <Button variant="default">Cancel</Button>
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
