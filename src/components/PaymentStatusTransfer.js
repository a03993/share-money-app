import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import PaymentCheckList from "./PaymentCheckList";

export default function PaymentStatusTransfer({ settlementDetails }) {
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const handleToggle = (item) => () => {
    if (left.includes(item)) {
      setRight([...right, item]);
      setLeft(left.filter((i) => i !== item));
    } else {
      setLeft([...left, item]);
      setRight(right.filter((i) => i !== item));
    }
  };

  useEffect(() => {
    setLeft(settlementDetails.map((_, index) => index));
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
