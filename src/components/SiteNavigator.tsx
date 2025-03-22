import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CreateLink } from "@/components/CreateLink";
import { CreateUserDialog } from "@/components/CreateUserDialog";
import { Expense } from "@/components/Expense";
import { Settlement } from "@/components/Settlement";

export function SiteNavigator() {
  return (
    <Tabs defaultValue="expense">
      <TabsList className="bg-gray-lighter">
        <TabsTrigger
          value="createLink"
          className="text-2xl font-black text-black opacity-100 bg-gray-lighter"
        >
          ShareMoney
        </TabsTrigger>
        <TabsTrigger value="expense">EXPENSE</TabsTrigger>
        <TabsTrigger value="settlement">SETTLEMENT</TabsTrigger>
        <CreateUserDialog />
      </TabsList>
      <TabsContent value="createLink">
        <CreateLink />
      </TabsContent>
      <TabsContent value="expense">
        <Expense />
      </TabsContent>
      <TabsContent value="settlement">
        <Settlement />
      </TabsContent>
    </Tabs>
  );
}
