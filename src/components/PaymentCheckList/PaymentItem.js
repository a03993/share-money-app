import { ListItemButton, ListItemText, Checkbox, Box } from "@mui/material";
import UserAvatar from "./UserAvatar";

export default function PaymentItem({
  value,
  checked,
  paymentDetail,
  handleToggle,
}) {
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
}
