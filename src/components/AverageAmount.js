import { Typography } from "@mui/material";
import { useMemo } from "react";

const calculateAverageAmountPerPerson = (totalAmount, expenseList, linkId) => {
  const currentExpense = expenseList.find(
    (expense) => expense.linkId === linkId
  );
  return currentExpense
    ? parseFloat((totalAmount / currentExpense.expenses.length).toFixed(0))
    : 0;
};

export default function AverageAmount({ totalAmount, expenseList, linkId }) {
  const amount = useMemo(
    () => calculateAverageAmountPerPerson(totalAmount, expenseList, linkId),
    [totalAmount, expenseList, linkId]
  );

  return (
    <Typography variant="h3">
      ${amount.toLocaleString()}
      <Typography
        className="font-weight-extra-bold"
        variant="h5"
        component="span"
      >
        ／人
      </Typography>
    </Typography>
  );
}
