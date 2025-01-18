import { Box, Grid } from "@mui/material";

import Input from "./Input";
import SummarySection from "./SummarySection";
import ExpenseList from "./ExpenseList";

const expenseData = [
  {
    name: "Barney",
    color: "#E7D3A7",
    item: "早餐",
    amount: 300,
  },
  {
    name: "Tina",
    color: "#F0B694",
    item: "午餐",
    amount: 1120,
  },
  {
    name: "Joe",
    color: "#C2C2BB",
    item: "下午茶",
    amount: 355,
  },
  {
    name: "Winnie",
    color: "#BFAD76",
    item: "晚餐",
    amount: 530,
  },
];

const totalAmount = expenseData.reduce(
  (sum, expense) => sum + expense.amount,
  0
);

export default function ListPage() {
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
