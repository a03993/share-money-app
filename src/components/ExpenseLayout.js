import { useState, useEffect, useMemo } from "react";
import { expenseMockData } from "../mock/mockData";
import { useParams } from "react-router-dom";
import Header from "./Header";
import CreateLinkPage from "./CreateLinkPage";
import ListPage from "./ListPage";
import ResultPage from "./ResultPage";
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
  const [page, setPage] = useState(linkId ? "List" : "Create Link");
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
    if (expenseList.length === 0) {
      setOpenCreateUserModal(true);
    }
  }, [expenseList]);

  return (
    <>
      <Header
        page={page}
        setPage={setPage}
        setOpenCreateUserModal={setOpenCreateUserModal}
        linkId={linkId}
      />
      {page === "Create Link" && <CreateLinkPage setPage={setPage} />}
      {page === "List" && (
        <ListPage
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
      {page === "Result" && (
        <ResultPage
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
        expenseList={expenseList}
        setExpenseList={setExpenseList}
      />
    </>
  );
}
