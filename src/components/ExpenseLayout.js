import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "./Header";
import PageHome from "./PageHome";
import PageExpenses from "./PageExpenses";
import PageSettlement from "./PageSettlement";
import CreateUserModal from "./CreateUserModal";
import { expenseService } from "../services/expenseService";

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
  const [expenseList, setExpenseList] = useState([]);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  useEffect(() => {
    const fetchExpenseData = async () => {
      if (!linkId) return;

      try {
        const data = await expenseService.getExpenses(linkId);
        setExpenseList((prev) => {
          const newList = prev.filter((item) => item.linkId !== linkId);
          return [...newList, data];
        });
      } catch (error) {
        console.error("Error fetching expense data:", error);
      }
    };

    fetchExpenseData();
  }, [linkId]);

  const currentExpenseItem = useMemo(
    () => expenseList.find((item) => item.linkId === linkId),
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
    if (linkId && currentExpenseItem && !expenseItem.length) {
      setOpenCreateUserModal(true);
    }
  }, [linkId, expenseItem, currentExpenseItem]);

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
        expenseItem={expenseItem}
      />
    );
  };

  return (
    <>
      <Header setOpenCreateUserModal={setOpenCreateUserModal} linkId={linkId} />
      {renderContent()}
      <CreateUserModal
        modalOpen={openCreateUserModal}
        setModalOpen={setOpenCreateUserModal}
        setExpenseList={setExpenseList}
        linkId={linkId}
        expenseItem={expenseItem}
      />
    </>
  );
}
