import { useState, useEffect, useMemo } from "react";
import { expenseMockData } from "../mock/mockData";
import { useParams } from "react-router-dom";
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
  const [page, setPage] = useState(linkId ? "Expenses" : "Home");
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
  }, [expenseList, linkId]);

  return (
    <>
      <Header
        page={page}
        setPage={setPage}
        setOpenCreateUserModal={setOpenCreateUserModal}
        linkId={linkId}
      />
      {page === "Home" && <PageHome setPage={setPage} />}
      {page === "Expenses" && (
        <PageExpenses
          page={page}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          totalAmount={totalAmount}
          setOpenCreateUserModal={setOpenCreateUserModal}
          linkId={linkId}
          currentExpenseItem={currentExpenseItem}
          expenseItem={expenseItem}
        />
      )}
      {page === "Settlement" && (
        <PageSettlement
          expenseList={expenseList}
          totalAmount={totalAmount}
          expenseItem={expenseItem}
          linkId={linkId}
          currentExpenseItem={currentExpenseItem}
        />
      )}
      <CreateUserModal
        open={openCreateUserModal}
        setOpen={setOpenCreateUserModal}
        setExpenseList={setExpenseList}
        expenseItem={expenseItem}
      />
    </>
  );
}
