import Grid from "@mui/material/Grid2";

import AverageAmount from "./AverageAmount";
import MemberAvatars from "./MemberAvatars";
import PaymentTransferList from "./PaymentTransferList";
import SummarySection from "./SummarySection";

import { expenseData, totalAmount, paymentDetails } from "../mock/mockData";

const averageAmountPerPerson = Math.round(totalAmount / expenseData.length);

export default function ResultPage() {
  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          maxWidth: {
            xs: "80%",
            sm: "70%",
            lg: "60%",
          },
          mx: "auto",
          mt: 10,
          mb: 10,
          justifyContent: "center",
        }}
      >
        <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
          <AverageAmount amount={averageAmountPerPerson} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MemberAvatars members={expenseData} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
          <SummarySection
            page="result"
            expenseData={expenseData}
            totalAmount={totalAmount}
          />
        </Grid>
      </Grid>

      <PaymentTransferList paymentDetails={paymentDetails} />
    </>
  );
}
