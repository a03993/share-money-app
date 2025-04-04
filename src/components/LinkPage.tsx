import { CreateUserDialog } from "@/components/CreateUserDialog";
import { Expense } from "@/components/Expense";
import { Settlement } from "@/components/Settlement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOnceEffect } from "@/hooks/useOnceEffect";
import { BASE_URL } from "@/lib/constants";
import { User as UserType } from "@/lib/type";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CurrencyDollarIcon, WalletIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";

export function LinkPage() {
  const navigate = useNavigate();
  const { linkId } = useParams();
  const [isSettled, setIsSettled] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  const fetchInitialData = async () => {
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
        toast.info("Let's create the first user and start sharing money.");
        setIsUserDialogOpen(true);
      }
    } catch (err) {
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

    fetchInitialData();
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

      {!isSettled && (
        <CreateUserDialog
          users={users}
          isOpen={isUserDialogOpen}
          setIsOpen={setIsUserDialogOpen}
          onUserCreated={fetchInitialData}
        />
      )}
    </>
  );

  return (
    <Tabs defaultValue="expense">
      <TabsList className="relative">
        <TabTriggers />
      </TabsList>

      <TabsContent value="expense">
        {!isLoading && linkId && (
          <Expense
            users={users}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
            isSettled={isSettled}
          />
        )}
      </TabsContent>

      <TabsContent value="settlement" className="md:mt-20">
        {!isLoading && linkId && (
          <Settlement users={users} totalAmount={totalAmount} />
        )}
      </TabsContent>
    </Tabs>
  );
}
