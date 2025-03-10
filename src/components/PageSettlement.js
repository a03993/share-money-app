import Grid from "@mui/material/Grid2";
import { Alert } from "@mui/material";
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
  const theme = useTheme();

  useEffect(() => {
    const fetchAndUpdateSettlements = async () => {
      if (!linkId) return;

      try {
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
      }
    };

    fetchAndUpdateSettlements();
  }, [linkId, currentExpenseItem, expenseList]);

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
