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
    const fetchSettlementDetails = async () => {
      try {
        const data = await settlementService.getSettlements(linkId);
        setSettlementDetails(data.settlements);
      } catch (error) {
        console.error("Error fetching settlements:", error);
      }
    };

    if (linkId) {
      fetchSettlementDetails();
    }
  }, [linkId]);

  useEffect(() => {
    const fetchAndUpdateSettlements = async () => {
      if (!currentExpenseItem || expenseList.length === 0 || !linkId) return;

      try {
        const actualExpense =
          calculateTotalExpensePerPerson(currentExpenseItem);
        const paidAmount = calculateAmountPaidByEachPerson(currentExpenseItem);
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
      } catch (error) {
        console.error("Error updating settlements:", error);
      }
    };

    fetchAndUpdateSettlements();
  }, [currentExpenseItem, expenseList, linkId]);

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          maxWidth: "700px",
          mx: "auto",
          mt: 8,
          mb: { xs: 4, sm: 8 },
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
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.neutral.main,
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
