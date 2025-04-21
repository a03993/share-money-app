import { CreateUserDialog } from "@/components/CreateUserDialog";
import { Expense } from "@/components/Expense";
import { Settlement } from "@/components/Settlement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOnceEffect } from "@/hooks/useOnceEffect";
import { BASE_URL } from "@/lib/constants";
import {
  NewExpenseItem as NewExpenseItemType,
  User as UserType,
} from "@/lib/type";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CurrencyDollarIcon, WalletIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";

const DEFAULT_EXPENSE_ITEM: NewExpenseItemType = {
  payer: "",
  item: "",
  price: 0,
  sharedBy: [],
};

export function LinkPage() {
  const navigate = useNavigate();
  const { linkId } = useParams();
  const [isSettled, setIsSettled] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [newExpenseItem, setNewExpenseItem] = useState(DEFAULT_EXPENSE_ITEM);
  const [createUserSource, setCreateUserSource] = useState<
    "payer" | "sharedBy" | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  const refetchLinkData = async () => {
    if (!linkId) return;

    try {
      const [linkRes, userRes] = await Promise.all([
        fetch(`${BASE_URL}/links/${linkId}`),
        fetch(`${BASE_URL}/users/${linkId}`),
      ]);

      if (!linkRes.ok || !userRes.ok)
        throw new Error("Invalid link ID or fetch failed");

      const linkData = await linkRes.json();
      const usersData = await userRes.json();

      setUsers(usersData);
      setIsSettled(linkData.isSettled);

      if (usersData.length === 0) {
        setIsUserDialogOpen(true);
      }
    } catch (error) {
      console.error("Error fetching link data:", error);
      toast.error("Unable to fetch data. Returning to home page.");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  useOnceEffect(() => {
    if (!linkId) {
      toast.error("Link ID missing. Returning to home page.");
      navigate("/");
      return;
    }

    refetchLinkData();
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
      <TabsTrigger value="expense" isDesktop>
        EXPENSE
      </TabsTrigger>
      <TabsTrigger value="settlement" isDesktop>
        SETTLEMENT
      </TabsTrigger>

      {/* Mobile Tabs */}
      <TabsTrigger value="expense" isMobile>
        <CurrencyDollarIcon className="size-5 fill-gray-base" />
      </TabsTrigger>
      <TabsTrigger value="settlement" isMobile>
        <WalletIcon className="size-5 fill-gray-base" />
      </TabsTrigger>

      {!isSettled && (
        <CreateUserDialog
          users={users}
          isOpen={isUserDialogOpen}
          setIsOpen={setIsUserDialogOpen}
          onRefetchLinkData={refetchLinkData}
          source={createUserSource}
          addPayer={(id) =>
            setNewExpenseItem((prev) => ({ ...prev, payer: id }))
          }
          addSharedBy={(ids) =>
            setNewExpenseItem((prev) => ({
              ...prev,
              sharedBy: Array.from(new Set([...prev.sharedBy, ...ids])),
            }))
          }
        />
      )}
    </>
  );

  return (
    <Tabs defaultValue="expense">
      <TabsList className="fixed top-0 left-0 right-0 z-50">
        <TabTriggers />
      </TabsList>

      <TabsContent value="expense">
        {!isLoading && linkId && (
          <Expense
            users={users}
            newExpenseItem={newExpenseItem}
            setNewExpenseItem={setNewExpenseItem}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
            isSettled={isSettled}
            setIsUserDialogOpen={setIsUserDialogOpen}
            setCreateUserSource={setCreateUserSource}
          />
        )}
      </TabsContent>

      <TabsContent value="settlement">
        {!isLoading && linkId && (
          <Settlement
            users={users}
            totalAmount={totalAmount}
            isSettled={isSettled}
            onRefetchLinkData={refetchLinkData}
          />
        )}
      </TabsContent>
    </Tabs>
  );
}
