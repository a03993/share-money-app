import { MenuItem } from "@mui/material";
import PropTypes from "prop-types";

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

CreateUserMenuItem.propTypes = {
  setOpenCreateUserModal: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};
