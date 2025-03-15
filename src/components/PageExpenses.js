import Grid from "@mui/material/Grid2";
import ExpenseCreateForm from "./ExpenseCreateForm";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";

export default function PageExpenses({
  expenseList,
  setExpenseList,
  totalAmount,
  setTotalAmount,
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
        setExpenseList={setExpenseList}
        setOpenCreateUserModal={setOpenCreateUserModal}
        linkId={linkId}
        expenseItem={expenseItem}
        setTotalAmount={setTotalAmount}
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
              setTotalAmount={setTotalAmount}
            />
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}
