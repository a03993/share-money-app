import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ExpenseSummary({ totalAmount, expenseItem }) {
  const location = useLocation();
  const isExpensesPage = location.pathname.includes("expenses");

  return (
    <>
      {isExpensesPage && (
        <Typography variant="h6" sx={{ mb: 3 }}>
          Summary
        </Typography>
      )}
      <Typography variant={isExpensesPage ? "h3" : "h5"} gutterBottom>
        {expenseItem?.length || 0}
        <Typography
          className="font-weight-extra-bold"
          variant={isExpensesPage ? "h5" : "h6"}
          component="span"
        >
          人
        </Typography>{" "}
        ${totalAmount.toLocaleString()}
      </Typography>
    </>
  );
}
