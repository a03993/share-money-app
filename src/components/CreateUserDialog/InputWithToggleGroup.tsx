import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const TOGGLE_ITEMS = [
  { value: "beige", className: "bg-avatar-beige" },
  { value: "gold", className: "bg-avatar-gold" },
  { value: "yellow", className: "bg-avatar-yellow" },
  { value: "peach", className: "bg-avatar-peach" },
  { value: "gray", className: "bg-avatar-gray" },
];

interface InputWithToggleGroupProps {
  userInputs: any[];
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
    <div className="flex w-full max-w-sm items-center gap-3">
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
          Remove
        </Button>
      )}
    </div>
  );
}
