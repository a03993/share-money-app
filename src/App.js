import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import {
  expenseData,
  totalAmount,
  paymentDetails,
  averageAmountPerPerson,
} from "./mock/mockData";
import theme from "./styles/theme";
import Header from "./components/Header";
import ListPage from "./components/ListPage";
import ResultPage from "./components/ResultPage";
import CreateUserModal from "./components/CreateUserModal";

function App() {
  const [page, setPage] = useState("List");
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

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
          totalAmount={totalAmount}
        />
      )}
      {page === "Result" && (
        <ResultPage
          expenseData={expenseData}
          totalAmount={totalAmount}
          paymentDetails={paymentDetails}
          averageAmountPerPerson={averageAmountPerPerson}
        />
      )}
      <CreateUserModal
        open={openCreateUserModal}
        setOpen={setOpenCreateUserModal}
      />
    </ThemeProvider>
  );
}

export default App;
