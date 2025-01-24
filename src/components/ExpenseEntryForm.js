import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useState } from "react";

import PayerSelector from "./PayerSelector";
import ShareBySelector from "./ShareBySelector";

import theme from "../styles/theme";

const formBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "70%",
  maxWidth: "800px",
  marginTop: theme.spacing(8),
  marginLeft: "auto",
  marginRight: "auto",
  gap: theme.spacing(2),
  flexWrap: "wrap",

  "& .MuiTextField-root": {
    width: "25ch",
    flex: "1 1 auto",
  },
};

export default function ExpenseEntryForm({ expenseData, setExpenseData }) {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState("");
  const [sharedBy, setSharedBy] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("error");
  const [error, setError] = useState({
    item: false,
    amount: false,
    payer: false,
    sharedBy: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (item === "" || amount === 0 || payer === "" || sharedBy.length === 0) {
      setSeverity("error");
      setSnackbarMessage(
        "Please check out the from. Payer, Item, Price, ShaeBy are required!"
      );
      setSnackbarOpen(true);
      setError({
        item: item === "",
        amount: amount === 0,
        payer: payer === "",
        sharedBy: sharedBy.length === 0,
      });

      return;
    } else {
      setSeverity("success");
      setSnackbarMessage("Expenses created successfully!");
      setSnackbarOpen(true);
      setError({
        item: false,
        amount: false,
        payer: false,
        sharedBy: false,
      });
    }

    const newExpense = { item, amount: parseFloat(amount), sharedBy };

    const updatedExpenseData = expenseData.map((expense) => {
      if (expense.name === payer) {
        return {
          ...expense,
          expenses: [...expense.expenses, newExpense],
        };
      }
      return expense;
    });

    setExpenseData(updatedExpenseData);
    setItem("");
    setAmount(0);
    setPayer("");
    setSharedBy([]);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box
        component="form"
        sx={formBoxStyle}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <PayerSelector
              expenseData={expenseData}
              payer={payer}
              setPayer={setPayer}
              error={!payer && error.payer}
            />
          </Grid>
          <TextField
            id="item-input"
            label="Item"
            variant="outlined"
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
            error={!item && error.item}
          />
          <TextField
            id="price-input"
            label="Price"
            variant="outlined"
            type="number"
            value={amount === 0 ? "" : amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            error={!amount && error.amount}
          />
          <Grid size={10}>
            <ShareBySelector
              expenseData={expenseData}
              sharedBy={sharedBy}
              setSharedBy={setSharedBy}
              error={sharedBy.length === 0 && error.sharedBy}
            />
          </Grid>
          <Grid size={2}>
            {" "}
            <Button
              type="submit"
              className="regular-button circle-button plus-button"
            ></Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
