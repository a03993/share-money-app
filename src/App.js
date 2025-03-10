import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./styles/theme";
import ExpenseLayout from "./components/ExpenseLayout";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<ExpenseLayout />} />
          <Route path="/:linkId/expenses" element={<ExpenseLayout />} />
          <Route
            path="/:linkId/settlement"
            element={<ExpenseLayout />}
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
