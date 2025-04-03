import { useState } from "react";
import { useParams } from "react-router-dom";

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

import { User as UserType } from "@/lib/type";
import { BASE_URL } from "@/lib/constants";
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

export function CreateExpenseForm({
  users,
  onCreated,
}: {
  users: UserType[];
  onCreated: () => void;
}) {
  const { linkId } = useParams();
  const [newExpenseItem, setNewExpenseItem] = useState(DEFAULT_EXPENSE_ITEM);
  const [selectedShared, setSelectedShared] = useState<string[]>([]);

  const createExpenseItem = async () => {
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

    const payload = {
      item: newExpenseItem.item,
      price: newExpenseItem.price,
      payer: newExpenseItem.payer,
      sharedBy: selectedShared,
    };

    try {
      if (!linkId) {
        toast.error("Link ID not found in URL");
        return;
      }

      const res = await fetch(`${BASE_URL}/expenses/${linkId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error || "Failed to add expense");
        return;
      }

      toast.success("Expense added successfully");

      setNewExpenseItem(DEFAULT_EXPENSE_ITEM);
      setSelectedShared([]);
      onCreated();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row gap-3">
        <Select
          value={newExpenseItem.payer}
          onValueChange={(value) =>
            setNewExpenseItem((prev) => ({ ...prev, payer: value }))
          }
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Payer" />
          </SelectTrigger>
          <SelectContent className="bg-gray-lightest">
            {users.map((user) => (
              <SelectItem key={user._id} value={user._id}>
                <Avatar className="size-7">
                  <AvatarFallback
                    className="text-base"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.name.charAt(0).toUpperCase()}
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
            setNewExpenseItem({ ...newExpenseItem, item: e.target.value })
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
          <Plus className="size-5 stroke-gray-dark group-hover:stroke-white" />
        </Button>
      </div>
    </div>
  );
}
