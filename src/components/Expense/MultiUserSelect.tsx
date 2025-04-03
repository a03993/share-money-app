import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { User as UserType } from "@/type";

interface MultiUserSelectProps {
  users: UserType[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function MultiUserSelect({
  users,
  selected,
  onChange,
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
        <div className="rounded-full border border-gray-dark bg-gray-lightest p-3 cursor-pointer w-full text-left text-gray-dark flex items-center justify-between">
          {selected.length === 0 ? (
            "Share by"
          ) : (
            <div className="flex items-center space-x-[-3px]">
              {selected.map((id) => {
                const user = users.find((user) => user._id === id);
                return (
                  user && (
                    <Avatar
                      key={user._id}
                      className="size-7 outline outline-2 outline-gray-lightest"
                    >
                      <AvatarFallback
                        className="text-base"
                        style={{ backgroundColor: user.color }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )
                );
              })}
            </div>
          )}
          <ChevronDownIcon className="size-5 stroke-gray-dark" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 bg-gray-lightest"
        align="start"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command>
          <CommandGroup>
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
                  <CheckIcon className="ml-auto h-4 w-4 text-primary" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
