import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import ExpenseEntryForm from "./ExpenseEntryForm";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";

export default function ListPage({
  page,
  expenseList,
  setExpenseList,
  totalAmount,
  setOpenCreateUserModal,
  linkId,
  currentExpenseItem,
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
      <ExpenseEntryForm
        expenseList={expenseList}
        setExpenseList={setExpenseList}
        setOpenCreateUserModal={setOpenCreateUserModal}
        linkId={linkId}
        expenseItem={expenseItem}
      />
      {expenseList.length !== 0 ? (
        <Grid container spacing={2} sx={{ ...commonGridSx, mt: 10 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <ExpenseSummary
              page={page}
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
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            ...commonGridSx,
            mt: 20,
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            className="font-weight-thin font-color-dark-gray"
          >
            Please add something to this list
          </Typography>
        </Grid>
      )}
    </>
  );
}
