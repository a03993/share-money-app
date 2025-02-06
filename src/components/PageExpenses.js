import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import ExpenseCreateForm from "./ExpenseCreateForm";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";

export default function PageExpenses({
  expenseList,
  setExpenseList,
  totalAmount,
  setOpenCreateUserModal,
  linkId,
  expenseItem,
}) {
  const commonGridSx = {
    maxWidth: {
      xs: "80%",
      sm: "70%",
      lg: "60%",
    },
    mx: "auto",
  };

  return (
    <>
      <ExpenseCreateForm
        expenseList={expenseList}
        setExpenseList={setExpenseList}
        setOpenCreateUserModal={setOpenCreateUserModal}
        linkId={linkId}
        expenseItem={expenseItem}
      />
      {expenseItem.length !== 0 ? (
        <Grid
          container
          spacing={2}
          sx={{
            ...commonGridSx,
            mt: {
              xs: 4,
              sm: 8,
            },
          }}
        >
          <Grid size={{ xs: 12, md: 5 }}>
            <ExpenseSummary
              totalAmount={totalAmount}
              expenseItem={expenseItem}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <ExpenseList
              expenseList={expenseList}
              setExpenseList={setExpenseList}
              linkId={linkId}
            />
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}
