import { useState, useEffect, useMemo } from "react";
import { expenseMockData } from "../mock/mockData";
import { useParams, useLocation } from "react-router-dom";
import Header from "./Header";
import PageHome from "./PageHome";
import PageExpenses from "./PageExpenses";
import PageSettlement from "./PageSettlement";
import CreateUserModal from "./CreateUserModal";

const calculateTotalAmount = (data, linkId) => {
  const currentExpenseItem = data.find((entry) => entry.linkId === linkId);
  const expenseItem = currentExpenseItem?.expenses || [];

  return expenseItem.reduce((sum, { personalExpenses }) => {
    const personTotal = personalExpenses.reduce(
      (expenseSum, { amount }) => expenseSum + amount,
      0
    );
    return sum + personTotal;
  }, 0);
};

export default function ExpenseLayout() {
  const { linkId } = useParams();
  const location = useLocation();
  const [expenseList, setExpenseList] = useState(expenseMockData);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  const currentExpenseItem = useMemo(
    () => expenseList.find((data) => data.linkId === linkId),
    [expenseList, linkId]
  );

  const expenseItem = useMemo(
    () => currentExpenseItem?.expenses || [],
    [currentExpenseItem]
  );

  const totalAmount = useMemo(
    () => calculateTotalAmount(expenseList, linkId),
    [expenseList, linkId]
  );

  useEffect(() => {
    if (linkId && expenseItem.length === 0) {
      setOpenCreateUserModal(true);
    }
  }, [linkId, expenseItem.length]);

  const renderContent = () => {
    if (!linkId) {
      return <PageHome />;
    }

    if (location.pathname.includes("/settlement")) {
      return (
        <PageSettlement
          expenseList={expenseList}
          totalAmount={totalAmount}
          expenseItem={expenseItem}
          linkId={linkId}
          currentExpenseItem={currentExpenseItem}
        />
      );
    }

    return (
      <PageExpenses
        expenseList={expenseList}
        setExpenseList={setExpenseList}
        totalAmount={totalAmount}
        setOpenCreateUserModal={setOpenCreateUserModal}
        linkId={linkId}
        currentExpenseItem={currentExpenseItem}
        expenseItem={expenseItem}
      />
    );
  };

  return (
    <>
      <Header
        currentPath={location.pathname}
        setOpenCreateUserModal={setOpenCreateUserModal}
        linkId={linkId}
      />
      {renderContent()}
      <CreateUserModal
        open={openCreateUserModal}
        setOpen={setOpenCreateUserModal}
        setExpenseList={setExpenseList}
        expenseItem={expenseItem}
      />
    </>
  );
}
