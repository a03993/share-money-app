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

export function CreateExpenseForm() {
  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row gap-3">
        <Select>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Payer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Item" className="flex-2" />
        <Input placeholder="Price" className="flex-2" />
      </div>
      <div className="flex items-center gap-3">
        <Select>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Share by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </SelectContent>
        </Select>
        <Button size="circle">
          <Plus className="size-5 text-gray-base bg-gray-light" />
        </Button>
      </div>
    </div>
  );
}
