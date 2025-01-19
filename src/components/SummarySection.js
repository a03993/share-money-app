import { Typography } from "@mui/material";

export default function SummarySection({ page, expenseData, totalAmount }) {
  return (
    <>
      {page === "List" && (
        <Typography className="summary-title" variant="h6">
          Summary
        </Typography>
      )}
      <Typography
        className="summary-amount"
        variant={page === "List" ? "h3" : "h5"}
        gutterBottom
      >
        {expenseData.length}
        <Typography
          className="summary-person-count"
          variant={page === "List" ? "h5" : "h6"}
          component="span"
        >
          人
        </Typography>{" "}
        ${totalAmount.toLocaleString()}
      </Typography>
    </>
  );
}
