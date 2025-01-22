import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

import AverageAmount from "./AverageAmount";
import MemberAvatars from "./MemberAvatars";
import PaymentTransferList from "./PaymentTransferList";
import SummarySection from "./SummarySection";

export default function ResultPage({
  expenseData,
  totalAmount,
  paymentDetails,
  averageAmountPerPerson,
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
      {expenseData.length !== 0 ? (
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
            className="font-weight-thin font-empty-list-message text-align-center"
          >
            Please go back to list page
            <br /> and add something to this list
          </Typography>
        </Grid>
      )}
    </>
  );
}
