import { Box, Grid } from "@mui/material";
import AverageAmount from "./AverageAmount";
import MemberAvatars from "./MemberAvatars";
import SummarySection from "./SummarySection";
import { expenseData, totalAmount } from "../mock/mockData";

const averageAmountPerPerson = Math.round(totalAmount / expenseData.length);

export default function ResultPage() {
  return (
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
      <Grid container spacing={2} alignItems="center">
        <Grid
          item
          xs={12}
          md={4}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <AverageAmount amount={averageAmountPerPerson} />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MemberAvatars members={expenseData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummarySection
            page="result"
            expenseData={expenseData}
            totalAmount={totalAmount}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
