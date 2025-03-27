import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CreateLink } from "@/components/CreateLink";
import { CreateUserDialog } from "@/components/CreateUserDialog";
import { Expense } from "@/components/Expense";
import { Settlement } from "@/components/Settlement";

import { Expense as ExpenseType, Settlement as SettlementType } from "@/type";

interface SiteNavigatorProps {
  data: {
    expenses: ExpenseType[];
    settlements: SettlementType[];
  };
}

export function SiteNavigator({ data }: SiteNavigatorProps) {
  const flattenedExpenses = data.expenses.flatMap((user) =>
    user.personalExpenses.map((expense) => ({
      item: expense.item,
      payer: { name: user.name, color: user.color },
      amount: expense.amount,
      shared: expense.sharedBy,
    }))
  );

  const totalAmount = flattenedExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
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
      <TabsContent value="createLink" className="mt-25">
        <CreateLink />
      </TabsContent>
      <TabsContent value="expense">
        <Expense
          expenses={data.expenses}
          flattenedExpenses={flattenedExpenses}
          totalAmount={totalAmount}
        />
      </TabsContent>
      <TabsContent value="settlement" className="md:mt-20">
        <Settlement
          expenses={data.expenses}
          totalAmount={totalAmount}
          settlements={data.settlements}
        />
      </TabsContent>
    </Tabs>
  );
}
