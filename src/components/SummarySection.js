import { Typography } from "@mui/material";

export default function SummarySection({ page, totalAmount, expenseItem }) {
  return (
    <>
      {page === "List" && (
        <Typography variant="h6" sx={{ mb: 6 }}>
          Summary
        </Typography>
      )}
      <Typography variant={page === "List" ? "h3" : "h5"} gutterBottom>
        {expenseItem?.length || 0}
        <Typography
          className="font-weight-extra-bold"
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
