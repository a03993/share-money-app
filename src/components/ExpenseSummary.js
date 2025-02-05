import { Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function ExpenseSummary({ page, totalAmount, expenseItem }) {
  const isListPage = page === "List";

  return (
    <>
      {isListPage && (
        <Typography variant="h6" sx={{ mb: 6 }}>
          Summary
        </Typography>
      )}
      <Typography variant={isListPage ? "h3" : "h5"} gutterBottom>
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

ExpenseSummary.propTypes = {
  page: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
  expenseItem: PropTypes.array,
};
