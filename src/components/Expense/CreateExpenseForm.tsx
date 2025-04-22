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
import { BASE_URL } from "@/lib/constants";
import { COLOR_CLASS_MAP } from "@/lib/constants";
import {
  NewExpenseItem as NewExpenseItemType,
  User as UserType,
} from "@/lib/type";

import { useState } from "react";
import { useParams } from "react-router-dom";

import { XCircleIcon } from "@heroicons/react/24/outline";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { AddUserButton } from "./AddUserButton";
import { MultiUserSelect } from "./MultiUserSelect";

interface CreateExpenseFormProps {
  users: UserType[];
  newExpenseItem: NewExpenseItemType;
  setNewExpenseItem: (newExpenseItem: NewExpenseItemType) => void;
  onCreated: () => void;
  isSettled: boolean;
  setIsUserDialogOpen: (isOpen: boolean) => void;
  setCreateUserSource: (source: "payer" | "sharedBy" | null) => void;
}

export function CreateExpenseForm({
  users,
  newExpenseItem,
  setNewExpenseItem,
  onCreated,
  isSettled,
  setIsUserDialogOpen,
  setCreateUserSource,
}: CreateExpenseFormProps) {
  const { linkId } = useParams();
  const [payerSelectOpen, setPayerSelectOpen] = useState(false);

  const handleCreate = async () => {
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
    if (newExpenseItem.sharedBy.length === 0) {
      toast.error("Please select at least one person to share with");
      return;
    }

    const payload = {
      item: newExpenseItem.item,
      price: newExpenseItem.price,
      payer: newExpenseItem.payer,
      sharedBy: newExpenseItem.sharedBy,
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

      setNewExpenseItem({
        payer: "",
        item: "",
        price: 0,
        sharedBy: [],
      });
      onCreated();
    } catch (error) {
      console.error("Error creating expense:", error);
      toast.error("Failed to add expense, please try again.");
    }
  };

  return (
    <div className="space-y-3">
      {isSettled && (
        <div className="text-sm text-error-base md:text-start text-center flex items-center gap-1">
          <XCircleIcon className="size-5" />
          Add or delete expenses is not allowed.
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-3">
        <Select
          value={newExpenseItem.payer}
          onValueChange={(value) =>
            setNewExpenseItem({ ...newExpenseItem, payer: value })
          }
          open={payerSelectOpen}
          onOpenChange={setPayerSelectOpen}
          disabled={isSettled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Payer" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user._id} value={user._id}>
                <Avatar size="sm">
                  <AvatarFallback
                    size="sm"
                    className={`bg-${COLOR_CLASS_MAP[user.color]}`}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {user.name}
              </SelectItem>
            ))}
            <hr className="border-gray-base m-1" />
            <AddUserButton
              onClick={() => {
                setCreateUserSource("payer");
                setIsUserDialogOpen(true);
                setPayerSelectOpen(false);
              }}
            />
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
          disabled={isSettled}
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
          disabled={isSettled}
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <MultiUserSelect
            users={users}
            selected={newExpenseItem.sharedBy}
            onChange={(selectedUsers) =>
              setNewExpenseItem({ ...newExpenseItem, sharedBy: selectedUsers })
            }
            disabled={isSettled}
            onAddUser={() => {
              setCreateUserSource("sharedBy");
              setIsUserDialogOpen(true);
            }}
          />
        </div>
        <Button
          size="circle"
          className="group hover:drop-shadow-none hover:bg-black hover:text-white"
          onClick={handleCreate}
          disabled={isSettled}
        >
          <Plus className="size-5 stroke-gray-dark group-hover:stroke-white group-disabled:stroke-gray-light" />
        </Button>
      </div>
    </div>
  );
}
