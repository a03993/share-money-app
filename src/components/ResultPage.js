import { Box, Grid } from "@mui/material";

import AverageAmount from "./AverageAmount";
import MemberAvatars from "./MemberAvatars";
import PaymentTransferList from "./PaymentTransferList";
import SummarySection from "./SummarySection";

import { expenseData, totalAmount, paymentDetails } from "../mock/mockData";
import { resultPageStyle } from "../styles/resultPageStyle";

const averageAmountPerPerson = Math.round(totalAmount / expenseData.length);

export default function ResultPage() {
  return (
    <>
      <Box sx={resultPageStyle.container}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4} sx={resultPageStyle.centerAlign}>
            <AverageAmount amount={averageAmountPerPerson} />
          </Grid>
          <Grid item xs={12} md={4} sx={resultPageStyle.centerAlign}>
            <MemberAvatars members={expenseData} />
          </Grid>
          <Grid item xs={12} md={4} sx={resultPageStyle.centerAlign}>
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
