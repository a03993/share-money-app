import { ThemeProvider } from "@mui/material/styles";
import { useState, useEffect, useMemo } from "react";
import { expenseMockData } from "./mock/mockData";
import theme from "./styles/theme";
import Header from "./components/Header";
import CreateLinkPage from "./components/CreateLinkPage";
import ListPage from "./components/ListPage";
import ResultPage from "./components/ResultPage";
import CreateUserModal from "./components/CreateUserModal";

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

function App() {
  const [page, setPage] = useState("Create Link");
  const [expenseList, setExpenseList] = useState(expenseMockData);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  // TODO: 改成從DB取得
  const linkId = "1234567890";

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
    [calculateTotalAmount, expenseList, linkId]
  );

  useEffect(() => {
    if (expenseList.length === 0) {
      setOpenCreateUserModal(true);
    }
  }, [expenseList]);

  return (
    <ThemeProvider theme={theme}>
      <Header
        setPage={setPage}
        setOpenCreateUserModal={setOpenCreateUserModal}
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
    </ThemeProvider>
  );
}

export default App;
