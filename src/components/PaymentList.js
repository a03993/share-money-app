import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Paper,
  Avatar,
} from "@mui/material";

import { paymentListStyle } from "../styles/paymentListStyle";

const PaymentList = ({ items, paymentDetails, checked, handleToggle }) => (
  <Paper sx={{ width: 450, height: 250, overflow: "auto", marginTop: 2 }}>
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
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 18,
                    fontWeight: 400,
                  }}
                >
                  <Avatar
                    sx={{
                      ...paymentListStyle.avatarStyle,
                      backgroundColor: paymentDetail.payer.avatarColor,
                    }}
                  >
                    {paymentDetail.payer.name[0]}
                  </Avatar>
                  <ListItemText
                    secondary={paymentDetail.payer.name}
                    className="expense-amount"
                  />
                  {"pay"}
                  <Avatar
                    sx={{
                      ...paymentListStyle.avatarStyle,
                      backgroundColor: paymentDetail.payee.avatarColor,
                      marginLeft: 1,
                    }}
                  >
                    {paymentDetail.payee.name[0]}
                  </Avatar>
                  <ListItemText
                    secondary={paymentDetail.payee.name}
                    className="expense-amount"
                  />
                  {`$${paymentDetail.amount}`}
                </span>
              }
            />
          </ListItemButton>
        );
      })}
    </List>
  </Paper>
);

export default PaymentList;
