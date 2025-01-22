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

function App() {
  const [page, setPage] = useState("List");

  return (
    <ThemeProvider theme={theme}>
      <Header setPage={setPage} />
      {page === "List" ? (
        <ListPage
          page={page}
          expenseData={expenseData}
          totalAmount={totalAmount}
        />
      ) : (
        <ResultPage
          expenseData={expenseData}
          totalAmount={totalAmount}
          paymentDetails={paymentDetails}
          averageAmountPerPerson={averageAmountPerPerson}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
