import { Box, TextField, Button } from "@mui/material";
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

  const handleSubmit = (event) => {
    event.preventDefault();
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
          />
        </Grid>
        <TextField
          id="item-input"
          label="Item"
          variant="outlined"
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <TextField
          id="price-input"
          label="Price"
          variant="outlined"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Grid size={10}>
          <ShareBySelector
            expenseData={expenseData}
            sharedBy={sharedBy}
            setSharedBy={setSharedBy}
          />
        </Grid>
        <Grid size={2}>
          {" "}
          <Button
            type="submit"
            className="button regular-button circle-button plus-button"
          ></Button>
        </Grid>
      </Grid>
    </Box>
  );
}
