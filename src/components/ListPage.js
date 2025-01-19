import { Box, Grid } from "@mui/material";
import { expenseData, totalAmount } from "../mock/mockData";

import Input from "./Input";
import SummarySection from "./SummarySection";
import ExpenseList from "./ExpenseList";

export default function ListPage({ page }) {
  return (
    <>
      <Input />
      <Box
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
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <SummarySection
              page={page}
              expenseData={expenseData}
              totalAmount={totalAmount}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ExpenseList expenseData={expenseData} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
