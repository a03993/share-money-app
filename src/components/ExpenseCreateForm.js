import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { expenseService } from "../services/expenseService";
import ExpensePayerSelector from "./ExpensePayerSelector";
import ExpenseShareSelector from "./ExpenseShareSelector";
import theme from "../styles/theme";

const formBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "70%",
  mt: {
    xs: theme.spacing(4),
    sm: theme.spacing(8),
  },
  ml: "auto",
  mr: "auto",
  flexWrap: "wrap",

  "& .MuiTextField-root": {
    flex: "1 1 auto",
  },
};

export default function ExpenseCreateForm({
  setExpenseList,
  setOpenCreateUserModal,
  linkId,
  expenseItem,
  setTotalAmount,
}) {
  const [formData, setFormData] = useState({
    item: "",
    amount: "",
    payer: "",
    sharedBy: [],
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const [error, setError] = useState({
    item: false,
    amount: false,
    payer: false,
    sharedBy: false,
  });

  const handleChange = (field) => (event) => {
    const value = event?.target?.value ?? event;

    if (field === "amount") {
      const numValue = parseInt(value);
      if (isNaN(numValue) || numValue < 0 || numValue > 999999999) {
        setError((prev) => ({ ...prev, amount: true }));
        return;
      }
      setError((prev) => ({ ...prev, amount: false }));
      setFormData((prev) => ({ ...prev, amount: numValue }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { item, amount, payer, sharedBy } = formData;

    if (item === "" || amount === 0 || payer === "" || sharedBy.length === 0) {
      setNotification({
        open: true,
        message: "Please check out the form. All fields are required!",
        severity: "error",
      });
      return;
    }

    try {
      const response = await expenseService.createExpense(linkId, {
        item,
        amount: parseInt(amount),
        payer,
        sharedBy,
      });

      const { updatedExpense, totalAmount } = response;

      setTotalAmount(totalAmount);

      setExpenseList((prev) =>
        prev.map((exp) => (exp.linkId === linkId ? updatedExpense : exp))
      );

      setNotification({
        open: true,
        message: "Expenses created successfully!",
        severity: "success",
      });
      setError({
        item: false,
        amount: false,
        payer: false,
        sharedBy: false,
      });
      setFormData({
        item: "",
        amount: "",
        payer: "",
        sharedBy: [],
      });
    } catch (error) {
      setNotification({
        open: true,
        message: "Failed to create expense. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
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
            <ExpensePayerSelector
              payer={formData.payer}
              setPayer={handleChange("payer")}
              error={!formData.payer && error.payer}
              setOpenCreateUserModal={setOpenCreateUserModal}
              expenseItem={expenseItem}
            />
          </Grid>
          <TextField
            id="item-input"
            label="Item"
            variant="outlined"
            type="text"
            value={formData.item}
            onChange={handleChange("item")}
            required
            error={!formData.item && error.item}
          />
          <TextField
            id="amount-input"
            label="Amount"
            variant="outlined"
            type="number"
            value={formData.amount}
            onChange={handleChange("amount")}
            required
            error={!formData.amount && error.amount}
          />
          <Grid size={10}>
            <ExpenseShareSelector
              sharedBy={formData.sharedBy}
              setSharedBy={handleChange("sharedBy")}
              error={formData.sharedBy.length === 0 && error.sharedBy}
              setOpenCreateUserModal={setOpenCreateUserModal}
              expenseItem={expenseItem}
            />
          </Grid>
          <Grid size={2}>
            {" "}
            <Button
              type="submit"
              className="light-button circle-button plus-button"
            ></Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
