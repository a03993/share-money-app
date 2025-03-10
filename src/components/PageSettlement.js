import Grid from "@mui/material/Grid2";
import { Alert, Box, CircularProgress } from "@mui/material";
import PerPersonExpenseAmount from "./PerPersonExpenseAmount";
import MemberAvatars from "./MemberAvatars";
import PaymentStatusTransfer from "./PaymentStatusTransfer";
import ExpenseSummary from "./ExpenseSummary";
import { settlementService } from "../services/settlementService";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

import {
  calculateTotalExpensePerPerson,
  calculateAmountPaidByEachPerson,
  calculatePayments,
} from "../utils/settlementCalculations";

export default function PageSettlement({
  expenseList,
  totalAmount,
  expenseItem,
  linkId,
  currentExpenseItem,
}) {
  const [settlementDetails, setSettlementDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchAndUpdateSettlements = async () => {
      if (!linkId) return;

      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const existingData = await settlementService.getSettlements(linkId);

        if (existingData.settlements?.length > 0) {
          setSettlementDetails(existingData.settlements);
          return;
        }

        if (currentExpenseItem && expenseList.length > 0) {
          const actualExpense =
            calculateTotalExpensePerPerson(currentExpenseItem);
          const paidAmount =
            calculateAmountPaidByEachPerson(currentExpenseItem);
          const newSettlementDetails = calculatePayments(
            actualExpense,
            paidAmount,
            expenseList
          );

          const data = await settlementService.updateSettlements(
            linkId,
            newSettlementDetails
          );
          setSettlementDetails(data.settlements);
        }
      } catch (error) {
        console.error("Error handling settlements:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndUpdateSettlements();
  }, [linkId, currentExpenseItem, expenseList]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Box sx={{ mt: 2, color: theme.palette.text.secondary }}>
          Calculating who should pay...
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          maxWidth: "650px",
          mx: "auto",
          mt: 10,
          mb: { xs: 4, sm: 10 },
          justifyContent: "center",
        }}
      >
        <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
          <PerPersonExpenseAmount
            totalAmount={totalAmount}
            expenseList={expenseList}
            linkId={linkId}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MemberAvatars members={expenseItem} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
          <ExpenseSummary
            page="result"
            totalAmount={totalAmount}
            expenseItem={expenseItem}
          />
        </Grid>
      </Grid>
      {settlementDetails.length > 0 ? (
        <PaymentStatusTransfer
          settlementDetails={settlementDetails}
          linkId={linkId}
        />
      ) : (
        <Alert
          severity="none"
          sx={{
            backgroundColor: theme.palette.grayscale.medium,
            color: theme.palette.secondary.dark,
            mt: 3,
            width: { xs: "70%", sm: "50%" },
            mx: "auto",
          }}
        >
          <strong>NO SETTLEMENT FOUND!</strong>
          <br />
          Please add some expenses items in the Expenses page first.
        </Alert>
      )}
    </>
  );
}
