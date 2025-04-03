import { useState } from "react";
import { useParams } from "react-router-dom";

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

import { User as UserType } from "@/lib/type";
import { BASE_URL, COLOR_CLASS_MAP } from "@/lib/constants";

import { toast } from "sonner";

export function CreateUserDialog({
  users,
  isOpen,
  setIsOpen,
  onUserCreated,
}: {
  users: UserType[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onUserCreated: () => void;
}) {
  const { linkId } = useParams();
  const [userInputs, setUserInputs] = useState([
    { color: "#e7d3a7", name: "" },
  ]);

  const addUserInput = () => {
    if (userInputs.length >= 5) {
      toast.error("Only 5 users are allowed at a time");
      return;
    }
    setUserInputs([...userInputs, { color: "#e7d3a7", name: "" }]);
  };

  const handleCreate = async () => {
    const hasEmptyName = userInputs.some((input) => input.name.trim() === "");
    if (hasEmptyName) {
      toast.error("Please enter a valid user name");
      return;
    }

    try {
      for (const input of userInputs) {
        const res = await fetch(`${BASE_URL}/users/${linkId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: input.name,
            color: input.color,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to create user");
        }
      }

      toast.success("Users created successfully");

      onUserCreated();

      setUserInputs([{ color: "#e7d3a7", name: "" }]);
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to create users");
    }
  };

  const handleCancel = () => {
    if (users.length <= 0) {
      toast.error("Please create at least one user before closing");
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
        <UserCircleIcon className="size-5 fill-gray-base" />
      </DialogTrigger>
      <DialogContent
        className="gap-5 bg-white"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
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
                className="relative ml-[-6px] border-2 border-white size-12"
              >
                <AvatarFallback
                  className={`bg-${COLOR_CLASS_MAP[input.color]} text-2xl`}
                >
                  {input.name.length > 0 ? (
                    input.name.charAt(0).toUpperCase()
                  ) : (
                    <UserIcon
                      className={`size-6 fill-white bg-${
                        COLOR_CLASS_MAP[input.color]
                      }`}
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
