import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CreateUserDialog } from "@/components/CreateUserDialog";
import { Expense } from "@/components/Expense";
import { Settlement } from "@/components/Settlement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CurrencyDollarIcon, WalletIcon } from "@heroicons/react/24/solid";

import { SplitData } from "@/type";
import { BASE_URL } from "@/constants";
import { toast } from "sonner";
import { useOnceEffect } from "@/hooks/useOnceEffect";

export function SplitTabs() {
  const navigate = useNavigate();
  const { linkId } = useParams();
  const [splitData, setSplitData] = useState<SplitData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  const fetchSplitData = async () => {
    if (!linkId) return;

    try {
      const res = await fetch(`${BASE_URL}/links/${linkId}`);
      if (!res.ok) throw new Error("Invalid link ID");

      const data = await res.json();

      setSplitData(data);

      if (data.expenses.length === 0) {
        toast.info("No users found. Please create at least one user.");
        setIsUserDialogOpen(true);
      }
    } catch (err) {
      toast.error("Unable to fetch link");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  useOnceEffect(() => {
    if (!linkId) {
      toast.error("Link ID missing. Returning to home page");
      navigate("/");
      return;
    }

    fetchSplitData();
  });

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

      <CreateUserDialog
        users={splitData?.expenses ?? []}
        isOpen={isUserDialogOpen}
        setIsOpen={setIsUserDialogOpen}
        onUserCreated={fetchSplitData}
      />
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
