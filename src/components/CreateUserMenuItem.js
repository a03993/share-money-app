import { MenuItem } from "@mui/material";

export default function CreateUserMenuItem({ setOpenCreateUserModal, theme }) {
  return (
    <MenuItem
      onClick={(e) => {
        e.preventDefault();
        setOpenCreateUserModal(true);
      }}
      sx={{
        borderTop: 1,
        borderColor: "divider",
        justifyContent: "center",
        color: theme.palette.primary.main,
      }}
    >
      + Create New User
    </MenuItem>
  );
}
