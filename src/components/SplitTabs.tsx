import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CreateUserDialog } from "@/components/CreateUserDialog";
import { Expense } from "@/components/Expense";
import { Settlement } from "@/components/Settlement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CurrencyDollarIcon, WalletIcon } from "@heroicons/react/24/solid";

import { SplitData } from "@/type";
import { toast } from "sonner";
export function SplitTabs() {
  const navigate = useNavigate();
  const { linkId } = useParams();
  const [splitData, setSplitData] = useState<SplitData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!linkId) {
      toast.error("Link ID missing. Returning to home page");
      navigate("/");
      return;
    }
    fetch("/db.json")
      .then((res) => res.json())
      .then((json) => {
        const data = json[linkId];
        if (data) {
          setSplitData(data);
        } else {
          toast.error("No data found for this link ID");
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error("Unable to fetch data. Returning to home page");
        console.error("Unable to fetch data:", error);
        navigate("/");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [linkId]);

  const TabTriggers = () => (
    <>
      <TabsTrigger
        value="back"
        onClick={() => navigate("/")}
        className="text-2xl text-black font-black opacity-100 absolute sm:relative sm:left-0 left-7"
      >
        ShareMoney
      </TabsTrigger>

      {/* Desktop Tabs */}
      <TabsTrigger value="expense" className="sm:block hidden">
        EXPENSE
      </TabsTrigger>
      <TabsTrigger value="settlement" className="sm:block hidden">
        SETTLEMENT
      </TabsTrigger>

      {/* Mobile Tabs */}
      <TabsTrigger value="expense" className="sm:hidden">
        <CurrencyDollarIcon className="size-5 fill-gray-base" />
      </TabsTrigger>
      <TabsTrigger value="settlement" className="sm:hidden">
        <WalletIcon className="size-5 fill-gray-base" />
      </TabsTrigger>

      <CreateUserDialog users={splitData?.expenses ?? []} />
    </>
  );

  const flattenedExpenses =
    splitData?.expenses?.flatMap((user) =>
      user.personalExpenses.map((expense) => ({
        item: expense.item,
        payer: { name: user.name, color: user.color },
        price: expense.price,
        shared: expense.shared,
      }))
    ) ?? [];

  const totalAmount = flattenedExpenses.reduce(
    (acc, expense) => acc + expense.price,
    0
  );

  return (
    <Tabs defaultValue="expense">
      <TabsList className="relative">
        <TabTriggers />
      </TabsList>

      <TabsContent value="expense">
        {!isLoading && splitData && (
          <Expense
            expenses={splitData.expenses}
            flattenedExpenses={flattenedExpenses}
            totalAmount={totalAmount}
          />
        )}
      </TabsContent>

      <TabsContent value="settlement" className="md:mt-20">
        {!isLoading && splitData && (
          <Settlement
            expenses={splitData.expenses}
            totalAmount={totalAmount}
            settlements={splitData.settlements}
          />
        )}
      </TabsContent>
    </Tabs>
  );
}
