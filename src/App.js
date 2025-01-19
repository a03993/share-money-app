import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import theme from "./styles/theme";
import Header from "./components/Header";
import ListPage from "./components/ListPage";
import ResultPage from "./components/ResultPage";

function App() {
  const [page, setPage] = useState("List");

  return (
    <ThemeProvider theme={theme}>
      <Header setPage={setPage} />
      {page === "List" ? <ListPage /> : <ResultPage />}
    </ThemeProvider>
  );
}

export default App;
