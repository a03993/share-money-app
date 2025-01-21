import { Typography } from "@mui/material";

export default function AverageAmount({ amount }) {
  return (
    <Typography variant="h3">
      ${amount.toLocaleString()}
      <Typography
        className="font-weight-extra-bold"
        variant="h5"
        component="span"
      >
        ／人
      </Typography>
    </Typography>
  );
}
