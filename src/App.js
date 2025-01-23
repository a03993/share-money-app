import { ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { expenseMockData } from "./mock/mockData";
import theme from "./styles/theme";
import Header from "./components/Header";
import ListPage from "./components/ListPage";
import ResultPage from "./components/ResultPage";
import CreateUserModal from "./components/CreateUserModal";

const calculateTotalAmount = (data) => {
  return data.reduce((sum, { expenses }) => {
    const personTotal = expenses.reduce(
      (expenseSum, { amount }) => expenseSum + amount,
      0
    );
    return sum + personTotal;
  }, 0);
};

function App() {
  const [page, setPage] = useState("List");
  const [expenseData, setExpenseData] = useState(expenseMockData);
  const [totalAmount, setTotalAmount] = useState(0);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  useEffect(() => {
    setTotalAmount(calculateTotalAmount(expenseData));
  }, [expenseData]);

  return (
    <ThemeProvider theme={theme}>
      <Header
        setPage={setPage}
        setOpenCreateUserModal={setOpenCreateUserModal}
      />
      {page === "List" && (
        <ListPage
          page={page}
          expenseData={expenseData}
          setExpenseData={setExpenseData}
          totalAmount={totalAmount}
        />
      )}
      {page === "Result" && (
        <ResultPage expenseData={expenseData} totalAmount={totalAmount} />
      )}
      <CreateUserModal
        open={openCreateUserModal}
        setOpen={setOpenCreateUserModal}
        setExpenseData={setExpenseData}
      />
    </ThemeProvider>
  );
}

export default App;
