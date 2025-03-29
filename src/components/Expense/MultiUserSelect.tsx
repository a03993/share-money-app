import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface User {
  name: string;
  color: string;
}

interface MultiUserSelectProps {
  users: User[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function MultiUserSelect({
  users,
  selected,
  onChange,
}: MultiUserSelectProps) {
  const toggleUser = (name: string) => {
    if (selected.includes(name)) {
      onChange(selected.filter((n) => n !== name));
    } else {
      onChange([...selected, name]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="rounded-full border border-gray-dark bg-gray-lightest p-3 cursor-pointer w-full text-left text-gray-dark flex items-center justify-between">
          {selected.length === 0 ? (
            "Share by"
          ) : (
            <div className="flex items-center bg-transparent space-x-[-3px]">
              {selected.map((name) => {
                const user = users.find((user) => user.name === name);
                return (
                  user && (
                    <Avatar
                      key={user.name}
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
          <ChevronDownIcon className="size-5 stroke-gray-dark bg-transparent" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandGroup>
            {users.map((user) => (
              <CommandItem
                key={user.name}
                onSelect={() => toggleUser(user.name)}
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
                {selected.includes(user.name) && (
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
