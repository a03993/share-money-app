import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Avatar,
  Box,
  Typography,
  Checkbox,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

const UserAvatar = ({ user, mr }) => (
  <>
    <Avatar
      className="small-mui-avatar"
      sx={{
        backgroundColor: user.avatarColor,
        mr: 0.5,
        ml: mr || 0,
      }}
    >
      {user.name[0]?.toUpperCase()}
    </Avatar>
    <Typography
      className="font-size-list-secondary font-weight-thin font-color-dark-gray"
      sx={{ mr: 1 }}
    >
      {user.name}
    </Typography>
  </>
);

const PaymentItem = ({ value, checked, paymentDetail, handleToggle }) => {
  const labelId = `transfer-list-item-${value}-label`;

  return (
    <ListItemButton key={value} role="listitem" onClick={handleToggle(value)}>
      <Checkbox
        checked={checked.includes(value)}
        tabIndex={-1}
        disableRipple
        inputProps={{
          "aria-labelledby": labelId,
        }}
        sx={{
          padding: 0,
          mr: 1,
          "& .MuiSvgIcon-root": {
            fontSize: 20,
          },
        }}
      />
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
            <UserAvatar user={paymentDetail.payer} />
            {"pay"}
            <UserAvatar user={paymentDetail.payee} mr={1} />
            {`$${paymentDetail.amount.toLocaleString()}`}
          </Box>
        }
      />
    </ListItemButton>
  );
};

export default function PaymentCheckList({
  items,
  paymentDetails,
  checked,
  handleToggle,
  emptyMessage,
}) {
  const theme = useTheme();

  const paperStyles = {
    minWidth: 350,
    height: 300,
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
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
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
              paymentDetail={paymentDetails[value]}
              handleToggle={handleToggle}
            />
          ))}
        </List>
      )}
    </Paper>
  );
}
