import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Header from "./components/Header";
import ListPage from "./components/ListPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ListPage />
    </ThemeProvider>
  );
}

export default App;
