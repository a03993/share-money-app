import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { settlementService } from "../services/settlementService";
import PaymentCheckList from "./PaymentCheckList";

export default function PaymentStatusTransfer({
  settlementDetails,
  setSettlementDetails,
  linkId,
}) {
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const handleToggle = (index) => async () => {
    try {
      const settlement = settlementDetails[index];
      const settlementId = settlement._id.$oid || settlement._id;

      const updatedSettlements = await settlementService.updateSettlementStatus(
        linkId,
        settlementId
      );
      setSettlementDetails(updatedSettlements.settlements);

      if (settlement.status === "completed") {
        setLeft([...left, index]);
        setRight(right.filter((i) => i !== index));
      } else {
        setRight([...right, index]);
        setLeft(left.filter((i) => i !== index));
      }
    } catch (error) {
      console.error("failed to update settlement status:", error);
      alert("failed to update settlement status, please try again later");
    }
  };

  useEffect(() => {
    const pendingIndices = [];
    const completedIndices = [];

    settlementDetails.forEach((settlement, index) => {
      if (settlement.status === "completed") {
        completedIndices.push(index);
      } else {
        pendingIndices.push(index);
      }
    });

    setLeft(pendingIndices);
    setRight(completedIndices);
  }, [settlementDetails]);

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "center", alignItems: "center", padding: 2 }}
    >
      <Grid>
        <Typography variant="h6" align="left">
          Payment List
        </Typography>
        <PaymentCheckList
          items={left}
          settlementDetails={settlementDetails}
          checked={right}
          handleToggle={handleToggle}
          emptyMessage="No payments needed at the moment. Enjoy your time!"
        />
      </Grid>
      <Grid>
        <Typography variant="h6" align="left">
          Done Payment List
        </Typography>
        <PaymentCheckList
          items={right}
          settlementDetails={settlementDetails}
          checked={right}
          handleToggle={handleToggle}
          emptyMessage="No payment records yet. Time to make some transactions!"
        />
      </Grid>
    </Grid>
  );
}
