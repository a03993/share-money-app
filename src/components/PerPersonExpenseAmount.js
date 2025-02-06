import { Typography } from "@mui/material";
import { useMemo } from "react";

const calculateExpensePerPerson = (totalAmount, expenseList, linkId) => {
  const currentExpense = expenseList.find(
    (expense) => expense.linkId === linkId
  );
  return currentExpense
    ? parseFloat((totalAmount / currentExpense.expenses.length).toFixed(0))
    : 0;
};

const formatAmount = (amount) => {
  return isNaN(amount) ? 0 : amount.toLocaleString();
};

export default function PerPersonExpenseAmount({
  totalAmount,
  expenseList,
  linkId,
}) {
  const amount = useMemo(
    () => calculateExpensePerPerson(totalAmount, expenseList, linkId),
    [totalAmount, expenseList, linkId]
  );

  return (
    <Typography variant="h3">
      ${formatAmount(amount)}
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
