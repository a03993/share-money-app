import { useNavigate } from "react-router-dom";

import { CreateUserDialog } from "@/components/CreateUserDialog";
import { Expense } from "@/components/Expense";
import { Settlement } from "@/components/Settlement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Expense as ExpenseType, Settlement as SettlementType } from "@/type";

import { CurrencyDollarIcon, WalletIcon } from "@heroicons/react/24/solid";

interface SiteNavigatorProps {
  data: {
    expenses: ExpenseType[];
    settlements: SettlementType[];
  };
}

export function SplitTabs({ data }: SiteNavigatorProps) {
  const navigate = useNavigate();

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
      <TabsList className="relative">
        <TabsTrigger
          value="createLink"
          className="text-2xl text-black font-black opacity-100 absolute sm:relative sm:left-0 left-7"
          onClick={() => navigate("/")}
        >
          ShareMoney
        </TabsTrigger>
        {/* Desktop */}
        <TabsTrigger value="expense" className="sm:block hidden">
          EXPENSE
        </TabsTrigger>
        <TabsTrigger value="settlement" className="sm:block hidden">
          SETTLEMENT
        </TabsTrigger>
        {/* Mobile */}
        <TabsTrigger value="expense" className="sm:hidden">
          <CurrencyDollarIcon className="size-5 fill-gray-base bg-transparent" />
        </TabsTrigger>
        <TabsTrigger value="settlement" className="sm:hidden">
          <WalletIcon className="size-5 fill-gray-base bg-transparent" />
        </TabsTrigger>
        {/* Desktop & Mobile */}
        <CreateUserDialog users={data.expenses} />
      </TabsList>
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
