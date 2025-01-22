import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import ExpenseEntryForm from "./ExpenseEntryForm";
import SummarySection from "./SummarySection";
import ExpenseList from "./ExpenseList";
import { palette } from "../styles/palette";

export default function ListPage({ page, expenseData, totalAmount }) {
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
      <ExpenseEntryForm expenseData={expenseData} />
      {expenseData.length !== 0 ? (
        <Grid container spacing={2} sx={{ ...commonGridSx, mt: 10 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <SummarySection
              page={page}
              expenseData={expenseData}
              totalAmount={totalAmount}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <ExpenseList expenseData={expenseData} />
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
            className="font-weight-thin font-empty-list-message"
          >
            Please add something to this list
          </Typography>
        </Grid>
      )}
    </>
  );
}
