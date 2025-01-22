import Grid from "@mui/material/Grid2";
import { expenseData, totalAmount } from "../mock/mockData";

import ExpenseEntryForm from "./ExpenseEntryForm";
import SummarySection from "./SummarySection";
import ExpenseList from "./ExpenseList";

export default function ListPage({ page }) {
  return (
    <>
      <ExpenseEntryForm expenseData={expenseData} />

      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: {
            xs: "80%",
            sm: "70%",
            lg: "60%",
          },
          mx: "auto",
          mt: 10,
        }}
      >
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
    </>
  );
}
