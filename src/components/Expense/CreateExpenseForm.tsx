import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { MultiUserSelect } from "./MultiUserSelect";

import { User as UserType } from "@/type";
import { toast } from "sonner";

interface NewExpenseItem {
  payer: string;
  item: string;
  price: number;
  shared: string[];
}

const DEFAULT_EXPENSE_ITEM: NewExpenseItem = {
  payer: "",
  item: "",
  price: 0,
  shared: [],
};

export function CreateExpenseForm({ users }: { users: UserType[] }) {
  const [newExpenseItem, setNewExpenseItem] = useState(DEFAULT_EXPENSE_ITEM);
  const [selectedShared, setSelectedShared] = useState<string[]>([]);

  const createExpenseItem = () => {
    if (!newExpenseItem.payer) {
      toast.error("Please select a payer before continuing");
      return;
    }
    if (!newExpenseItem.item) {
      toast.error("Please enter an item to proceed");
      return;
    }
    if (newExpenseItem.price <= 0) {
      toast.error("Please enter a price greater than zero");
      return;
    }
    if (selectedShared.length === 0) {
      toast.error("Please select at least one person to share with");
      return;
    }

    const updatedExpenseItem = {
      ...newExpenseItem,
      shared: selectedShared,
    };
    // TODO: add new expense item to database
    console.log("Expense added successfully:", updatedExpenseItem);
    toast.success("Expense added successfully");
    setNewExpenseItem({
      payer: "",
      item: "",
      price: 0,
      shared: [],
    });
    setSelectedShared([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row gap-3">
        <Select
          value={newExpenseItem.payer}
          onValueChange={(value) =>
            setNewExpenseItem((prevData) => ({
              ...prevData,
              payer: value,
            }))
          }
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Payer" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.name} value={user.name}>
                <Avatar className="size-7">
                  <AvatarFallback
                    className="text-base"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Item"
          className="flex-2"
          value={newExpenseItem.item}
          onChange={(e) =>
            setNewExpenseItem({
              ...newExpenseItem,
              item: e.target.value,
            })
          }
        />
        <Input
          type="number"
          placeholder="Price"
          className="flex-2"
          min="0"
          value={newExpenseItem.price || ""}
          onChange={(e) =>
            setNewExpenseItem({
              ...newExpenseItem,
              price: Number(e.target.value),
            })
          }
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <MultiUserSelect
            users={users}
            selected={selectedShared}
            onChange={setSelectedShared}
          />
        </div>
        <Button
          size="circle"
          className="group hover:drop-shadow-none hover:bg-black hover:text-white"
          onClick={createExpenseItem}
        >
          <Plus className="size-5 stroke-gray-dark bg-transparent group-hover:stroke-white" />
        </Button>
      </div>
    </div>
  );
}
