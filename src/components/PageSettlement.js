import Grid from "@mui/material/Grid2";
import { Alert } from "@mui/material";
import PerPersonExpenseAmount from "./PerPersonExpenseAmount";
import MemberAvatars from "./MemberAvatars";
import PaymentStatusTransfer from "./PaymentStatusTransfer";
import ExpenseSummary from "./ExpenseSummary";
import { settlementService } from "../services/settlementService";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

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
      if (!currentExpenseItem || !linkId) return;

      try {
        const data = await settlementService.updateSettlements(
          linkId,
          currentExpenseItem
        );

        setSettlementDetails(data.settlements);
      } catch (error) {
        console.error("Error updating settlements:", error);
      }
    };

    fetchAndUpdateSettlements();
  }, [currentExpenseItem, linkId]);

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
          setSettlementDetails={setSettlementDetails}
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
