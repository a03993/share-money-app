import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Paper,
  Avatar,
  Box,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

export default function PaymentList({
  items,
  paymentDetails,
  checked,
  handleToggle,
  emptyMessage,
}) {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        width: 450,
        height: 350,
        overflow: "auto",
        marginTop: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {items.length === 0 ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color={theme.palette.neutral.main}>
            {emptyMessage}
          </Typography>
        </Box>
      ) : (
        <List dense component="div" role="list">
          {items.map((value) => {
            const labelId = `transfer-list-item-${value}-label`;
            const paymentDetail = paymentDetails[value];

            return (
              <ListItemButton
                key={value}
                role="listitem"
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.includes(value)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 18,
                        fontWeight: 400,
                      }}
                    >
                      <Avatar
                        className="small-mui-avatar"
                        sx={{
                          backgroundColor: paymentDetail.payer.avatarColor,
                          mr: 0.5,
                        }}
                      >
                        {paymentDetail.payer.name[0]?.toUpperCase()}
                      </Avatar>
                      <Typography
                        className="font-size-list-secondary font-weight-thin font-color-dark-gray"
                        sx={{ mr: 1 }}
                      >
                        {paymentDetail.payer.name}
                      </Typography>
                      {"pay"}
                      <Avatar
                        className="small-mui-avatar"
                        sx={{
                          backgroundColor: paymentDetail.payee.avatarColor,
                          mr: 0.5,
                          ml: 1,
                        }}
                      >
                        {paymentDetail.payee.name[0]?.toUpperCase()}
                      </Avatar>
                      <Typography
                        className="font-size-list-secondary font-weight-thin font-color-dark-gray"
                        sx={{ mr: 1 }}
                      >
                        {paymentDetail.payee.name}
                      </Typography>
                      {`$${paymentDetail.amount.toLocaleString()}`}
                    </Box>
                  }
                />
              </ListItemButton>
            );
          })}
        </List>
      )}
    </Paper>
  );
}
