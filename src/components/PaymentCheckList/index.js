import React from "react";
import { List, Paper, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import PaymentItem from "./PaymentItem";

export default function PaymentCheckList({
  items,
  settlementDetails,
  checked,
  handleToggle,
  emptyMessage,
}) {
  const theme = useTheme();

  const paperStyles = {
    width: {
      xs: "100%",
      sm: 400,
    },
    height: { xs: 300, sm: 350 },
    overflow: "auto",
    marginTop: 2,
    backgroundColor: theme.palette.grayscale.medium,
  };

  return (
    <Paper sx={paperStyles}>
      {items.length === 0 ? (
        <Typography
          variant="body1"
          color={theme.palette.secondary.dark}
          sx={{
            display: "flex",
            height: "100%",
            width: "80%",
            margin: "0 auto",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {emptyMessage}
        </Typography>
      ) : (
        <List dense component="div" role="list">
          {items.map((value) => (
            <PaymentItem
              key={value}
              value={value}
              checked={checked}
              paymentDetail={settlementDetails[value]}
              handleToggle={handleToggle}
            />
          ))}
        </List>
      )}
    </Paper>
  );
}
