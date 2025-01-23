import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import PaymentList from "./PaymentList";

const getDifference = (source, target) =>
  source.filter((item) => !target.includes(item));
const getIntersection = (source, target) =>
  source.filter((item) => target.includes(item));

export default function PaymentTransferList({ paymentDetails }) {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const leftChecked = getIntersection(checked, left);
  const rightChecked = getIntersection(checked, right);

  const handleToggle = (item) => () => {
    setChecked((prevChecked) =>
      prevChecked.includes(item)
        ? prevChecked.filter((i) => i !== item)
        : [...prevChecked, item]
    );
  };

  const moveCheckedItems = (from, to, checkedItems, setFrom, setTo) => {
    setTo(to.concat(checkedItems));
    setFrom(getDifference(from, checkedItems));
    setChecked(getDifference(checked, checkedItems));
  };

  const handleCheckedRight = () =>
    moveCheckedItems(left, right, leftChecked, setLeft, setRight);
  const handleCheckedLeft = () =>
    moveCheckedItems(right, left, rightChecked, setRight, setLeft);

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
        <PaymentList
          items={left}
          paymentDetails={paymentDetails}
          checked={checked}
          handleToggle={handleToggle}
        />
        <Grid container direction="column" sx={{ alignItems: "center" }}>
          <Button
            sx={{ m: 3 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
        </Grid>
      </Grid>
      <Grid>
        <Typography variant="h6" align="left">
          Done Payment List
        </Typography>
        <PaymentList
          items={right}
          paymentDetails={paymentDetails}
          checked={checked}
          handleToggle={handleToggle}
        />
        <Grid container direction="column" sx={{ alignItems: "center" }}>
          <Button
            sx={{ m: 3 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
