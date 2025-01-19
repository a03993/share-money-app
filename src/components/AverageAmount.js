import { Typography } from "@mui/material";

export default function AverageAmount({ amount }) {
  return (
    <Typography variant="h3">
      ${amount.toLocaleString()}
      <Typography
        className="summary-person-count"
        variant="h5"
        component="span"
      >
        ／人
      </Typography>
    </Typography>
  );
}
