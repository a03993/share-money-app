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
              paymentDetail={paymentDetails[value]}
              handleToggle={handleToggle}
            />
          ))}
        </List>
      )}
    </Paper>
  );
}
