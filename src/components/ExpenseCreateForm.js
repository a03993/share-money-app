import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useState } from "react";

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
  expenseList,
  setExpenseList,
  setOpenCreateUserModal,
  linkId,
  expenseItem,
}) {
  const [formData, setFormData] = useState({
    item: "",
    amount: 0,
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
        message:
          "Please check out the form. Payer, Item, Price, Share By are required!",
        severity: "error",
      });

      setError({
        item: item === "",
        amount: amount === 0,
        payer: payer === "",
        sharedBy: sharedBy.length === 0,
      });

      return;
    }

    try {
      const response = await fetch(`/api/${linkId}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item,
          amount: parseFloat(amount),
          payer,
          sharedBy,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create expense");
      }

      const updatedExpense = await response.json();
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
        amount: 0,
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
            id="price-input"
            label="Price"
            variant="outlined"
            type="number"
            value={formData.amount === 0 ? "" : formData.amount}
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
