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

interface User {
  name: string;
  color: string;
}

export function CreateExpenseForm({ users }: { users: User[] }) {
  console.log("member:", users);
  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row gap-3">
        <Select>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Payer" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user, index) => (
              <SelectItem key={index} value={user.name}>
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
        <Input type="text" placeholder="Item" className="flex-2" />
        <Input type="number" placeholder="Price" className="flex-2" min="0" />
      </div>
      <div className="flex items-center gap-3">
        <Select>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Share by" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user, index) => (
              <SelectItem key={index} value={user.name}>
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
        <Button
          size="circle"
          className="group hover:drop-shadow-none hover:bg-black hover:text-white"
        >
          <Plus className="size-5 stroke-gray-dark bg-transparent group-hover:stroke-white" />
        </Button>
      </div>
    </div>
  );
}
