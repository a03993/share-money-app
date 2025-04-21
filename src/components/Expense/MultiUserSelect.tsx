import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User as UserType } from "@/lib/type";
import { cn } from "@/lib/utils";

import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { AvatarGroup } from "../Settlement/AvatarGroup";
import { AddUserButton } from "./AddUserButton";

interface MultiUserSelectProps {
  users: UserType[];
  selected: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
  onAddUser: () => void;
}

export function MultiUserSelect({
  users,
  selected,
  onChange,
  disabled,
  onAddUser,
}: MultiUserSelectProps) {
  const toggleUser = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((x) => x !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "rounded-full border border-gray-dark bg-gray-lightest p-3 cursor-pointer w-full text-left text-gray-dark flex items-center justify-between",
            disabled && "cursor-default text-gray-light border-gray-light",
          )}
        >
          {selected.length === 0 ? (
            <span className="font-light">Share by</span>
          ) : (
            <AvatarGroup
              users={users.filter((user) => selected.includes(user._id))}
              maxDisplay={8}
              select
            />
          )}
          <ChevronDownIcon
            className={cn(
              "size-5 stroke-gray-dark",
              disabled && "stroke-gray-light",
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 bg-gray-lightest"
        align="start"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command>
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                if (selected.length === users.length) {
                  onChange([]);
                } else {
                  onChange(users.map((u) => u._id));
                }
              }}
              className="flex items-center justify-between font-normal"
            >
              <span>ALL</span>
              <CheckIcon
                className={cn(
                  "size-4",
                  selected.length === users.length
                    ? "text-primary"
                    : "text-transparent",
                )}
              />
            </CommandItem>
            {users.map((user) => (
              <CommandItem
                key={user._id}
                onSelect={() => toggleUser(user._id)}
                className="flex items-center gap-2"
              >
                <Avatar className="size-7">
                  <AvatarFallback
                    className="text-base"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
                {selected.includes(user._id) && (
                  <CheckIcon className="ml-auto size-4 text-primary" />
                )}
              </CommandItem>
            ))}
            <hr className="border-gray-base m-1" />
            <AddUserButton onClick={onAddUser} />
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
