import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CreateUserDialog } from "@/components/CreateUserDialog";
import { Expense } from "@/components/Expense";
import { Settlement } from "@/components/Settlement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CurrencyDollarIcon, WalletIcon } from "@heroicons/react/24/solid";

import {
  SplitData,
  User as UserType,
  ExpenseFromAPI as ExpenseType,
} from "@/type";
import { BASE_URL } from "@/constants";
import { toast } from "sonner";
import { useOnceEffect } from "@/hooks/useOnceEffect";

export function SplitTabs() {
  const navigate = useNavigate();
  const { linkId } = useParams();
  const [splitData, setSplitData] = useState<SplitData | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  const fetchSplitData = async () => {
    if (!linkId) return;

    try {
      const [linkRes, expenseRes, userRes] = await Promise.all([
        fetch(`${BASE_URL}/links/${linkId}`),
        fetch(`${BASE_URL}/expenses/${linkId}`),
        fetch(`${BASE_URL}/users/${linkId}`),
      ]);

      if (!linkRes.ok || !expenseRes.ok || !userRes.ok)
        throw new Error("Invalid link ID or fetch failed");

      const linkData = await linkRes.json();
      const expenses = await expenseRes.json();
      const usersData = await userRes.json();

      // Step 1: clone users + personalExpenses initialize
      const usersWithExpenses = usersData.map((user: UserType) => ({
        ...user,
        personalExpenses: [],
      }));

      // Step 2:  expenses push into user's personalExpenses
      expenses.forEach((expense: ExpenseType) => {
        const payerId = expense.payer._id;
        const user = usersWithExpenses.find((u: UserType) => u._id === payerId);
        if (user) {
          user.personalExpenses.push({
            item: expense.item,
            price: expense.price,
            payer: expense.payer,
            sharedBy: expense.sharedBy,
            createdAt: expense.createdAt,
          });
        }
      });

      setSplitData({
        ...linkData,
        expenses: usersWithExpenses,
        settlements: [],
      });

      setUsers(usersData);

      if (usersData.length === 0) {
        toast.info("No users found. Please create at least one user.");
        setIsUserDialogOpen(true);
      }
    } catch (err) {
      toast.error("Unable to fetch data");
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
        users={users}
        isOpen={isUserDialogOpen}
        setIsOpen={setIsUserDialogOpen}
        onUserCreated={fetchSplitData}
      />
    </>
  );

  return (
    <Tabs defaultValue="expense">
      <TabsList className="relative">
        <TabTriggers />
      </TabsList>

      <TabsContent value="expense">
        {!isLoading && splitData && (
          <Expense
            users={users}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
          />
        )}
      </TabsContent>

      <TabsContent value="settlement" className="md:mt-20">
        {!isLoading && splitData && (
          <Settlement users={users} totalAmount={totalAmount} />
        )}
      </TabsContent>
    </Tabs>
  );
}
