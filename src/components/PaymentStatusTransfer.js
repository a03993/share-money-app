import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { settlementService } from "../services/settlementService";
import PaymentCheckList from "./PaymentCheckList";

export default function PaymentStatusTransfer({ settlementDetails, linkId }) {
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const handleToggle = (index) => async () => {
    try {
      const status = left.includes(index) ? "completed" : "pending";

      const settlement = settlementDetails[index];
      if (!settlement || !settlement._id) {
        console.error("failed to find settlement");
        return;
      }

      const settlementId = settlement._id.$oid || settlement._id;

      await settlementService.updateSettlementStatus(
        linkId,
        settlementId,
        status
      );

      if (left.includes(index)) {
        setRight([...right, index]);
        setLeft(left.filter((i) => i !== index));
      } else {
        setLeft([...left, index]);
        setRight(right.filter((i) => i !== index));
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
      sx={{ justifyContent: "center", alignItems: "center" }}
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
          emptyMessage="✓ All payments are settled! No one need to pay."
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
          emptyMessage="← Move completed payments from the left."
        />
      </Grid>
    </Grid>
  );
}
