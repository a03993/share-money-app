import { Box, Grid } from "@mui/material";

import AverageAmount from "./AverageAmount";
import MemberAvatars from "./MemberAvatars";
import PaymentTransferList from "./PaymentTransferList";
import SummarySection from "./SummarySection";

import { expenseData, totalAmount, paymentDetails } from "../mock/mockData";

const averageAmountPerPerson = Math.round(totalAmount / expenseData.length);

const centerAlign = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

export default function ResultPage() {
  return (
    <>
      <Box
        sx={{
          maxWidth: {
            xs: "80%",
            sm: "70%",
            lg: "60%",
          },
          mx: "auto",
          mt: 10,
          mb: 10,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4} sx={centerAlign}>
            <AverageAmount amount={averageAmountPerPerson} />
          </Grid>
          <Grid item xs={12} md={4} sx={centerAlign}>
            <MemberAvatars members={expenseData} />
          </Grid>
          <Grid item xs={12} md={4} sx={centerAlign}>
            <SummarySection
              page="result"
              expenseData={expenseData}
              totalAmount={totalAmount}
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <PaymentTransferList paymentDetails={paymentDetails} />
      </Box>
    </>
  );
}
