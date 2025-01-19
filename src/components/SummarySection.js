import { Typography } from "@mui/material";

export default function SummarySection({ expenseData, totalAmount }) {
  return (
    <>
      <Typography className="summary-title" variant="h6">
        Summary
      </Typography>
      <Typography className="summary-amount" variant="h3" gutterBottom>
        {expenseData.length}
        <Typography
          className="summary-person-count"
          variant="h5"
          component="span"
        >
          人
        </Typography>{" "}
        ${totalAmount.toLocaleString()}
      </Typography>
    </>
  );
}
