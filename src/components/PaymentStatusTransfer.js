import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import PaymentCheckList from "./PaymentCheckList";

export default function PaymentStatusTransfer({ paymentDetails }) {
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
    setLeft(paymentDetails.map((_, index) => index));
  }, [paymentDetails]);

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
          paymentDetails={paymentDetails}
          checked={right}
          handleToggle={handleToggle}
          emptyMessage="No payments needed at the moment."
        />
      </Grid>
      <Grid>
        <Typography variant="h6" align="left">
          Done Payment List
        </Typography>
        <PaymentCheckList
          items={right}
          paymentDetails={paymentDetails}
          checked={right}
          handleToggle={handleToggle}
          emptyMessage="No completed payments yet."
        />
      </Grid>
    </Grid>
  );
}
