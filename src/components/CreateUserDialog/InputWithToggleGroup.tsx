import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { UserInput as UserInputType } from "@/lib/type";

import { XMarkIcon } from "@heroicons/react/24/solid";

const TOGGLE_ITEMS = [
  { value: "#a7958b", className: "bg-avatar-beige" },
  { value: "#bfad76", className: "bg-avatar-gold" },
  { value: "#e7d3a7", className: "bg-avatar-yellow" },
  { value: "#f0b694", className: "bg-avatar-peach" },
  { value: "#c2c2bb", className: "bg-avatar-gray" },
];

interface InputWithToggleGroupProps {
  userInputs: UserInputType[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  removeUser: () => void;
}

export function InputWithToggleGroup({
  userInputs,
  selectedColor,
  setSelectedColor,
  userName,
  setUserName,
  removeUser,
}: InputWithToggleGroupProps) {
  return (
    <div className="flex items-center gap-3">
      <Input
        type="text"
        placeholder="Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <ToggleGroup type="single">
        {TOGGLE_ITEMS.map((item) => (
          <ToggleGroupItem
            key={item.value}
            value={item.value}
            variant={selectedColor === item.value ? "outline" : "default"}
            className={item.className}
            onClick={() => setSelectedColor(item.value)}
          ></ToggleGroupItem>
        ))}
      </ToggleGroup>
      {userInputs.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          className="font-normal"
          onClick={removeUser}
        >
          <span className="hidden md:inline">Remove</span>
          <span className="inline md:hidden">
            <XMarkIcon className="size-4" />
          </span>
        </Button>
      )}
    </div>
  );
}
