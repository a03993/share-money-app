import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  TextField,
  Avatar,
  AvatarGroup,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { expenseService } from "../services/expenseService";

export default function CreateUserModal({
  modalOpen,
  setModalOpen,
  setExpenseList,
  linkId,
  expenseItem,
}) {
  const [userList, setUserList] = useState([
    {
      name: "",
      avatar: 2,
      hasError: false,
    },
  ]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const theme = useTheme();

  const avatarList = [
    theme.palette.avatar.mauve,
    theme.palette.avatar.khaki,
    theme.palette.avatar.cream,
    theme.palette.avatar.peach,
    theme.palette.avatar.sage,
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "80%",
      sm: 400,
    },
    backgroundColor: theme.palette.background.paper,
    p: 4,
  };

  const addUserField = () => {
    setUserList([...userList, { name: "", avatar: 2, hasError: false }]);
  };

  const removeUserField = (index) => {
    const newUserList = userList.filter((_, i) => i !== index);
    setUserList(newUserList);
  };

  const handleUserChange = (index, field, value) => {
    const newUserList = [...userList];
    newUserList[index] = {
      ...newUserList[index],
      [field]: value,
      hasError: false,
    };
    setUserList(newUserList);
  };

  const handleCreate = async () => {
    const hasEmptyNames = userList.some((user) => !user.name);
    if (hasEmptyNames) {
      setUserList(
        userList.map((user) => ({
          ...user,
          hasError: !user.name,
        }))
      );
      setAlert({
        open: true,
        message: "User names cannot be empty!",
        severity: "error",
      });
      return;
    }

    const newUsers = userList.map((user) => ({
      name: user.name,
      color: avatarList[user.avatar],
      personalExpenses: [],
    }));

    try {
      await expenseService.createUsers(linkId, newUsers);
      const refreshData = await expenseService.getExpenses(linkId);

      setExpenseList((prevExpenseList) => {
        const newList = prevExpenseList.filter(
          (item) => item.linkId !== linkId
        );
        return [...newList, refreshData];
      });

      setAlert({
        open: true,
        message: "Users created successfully!",
        severity: "success",
      });
      setModalOpen(false);
      setUserList([{ name: "", avatar: 2, hasError: false }]);
    } catch (error) {
      setAlert({
        open: true,
        message: "Failed to create users. Please try again.",
        severity: "error",
      });
    }
  };

  const handleClose = () => {
    if (!expenseItem.length) {
      setAlert({
        open: true,
        message: "You have to create The FIRST User before closing.",
        severity: "error",
      });
      return;
    }
    setModalOpen(false);
  };

  return (
    <>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ open: false, message: "", severity: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Modal
        aria-labelledby="create-user-modal-title"
        aria-describedby="create-user-modal-description"
        open={modalOpen}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Typography
              id="create-user-modal-title"
              variant="h5"
              className="font-weight-extra-bold"
            >
              Create Users
            </Typography>
            <Typography
              id="create-user-modal-description"
              variant="body1"
              sx={{ mt: 2 }}
            >
              Create and share your private money list with others. no
              downloads, no signups!
            </Typography>

            {userList.map((user, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3,
                  mb: 3,
                }}
              >
                <TextField
                  label={
                    userList.length === 1 ? "Name" : `User ${index + 1} Name`
                  }
                  variant="outlined"
                  value={user.name}
                  onChange={(e) =>
                    handleUserChange(index, "name", e.target.value)
                  }
                  sx={{ mr: 1 }}
                  required
                  error={!user.name && user.hasError}
                />
                <Stack direction="row" spacing={0.5}>
                  {avatarList.map((color, avatarIndex) => (
                    <Box
                      key={avatarIndex}
                      onClick={() =>
                        handleUserChange(index, "avatar", avatarIndex)
                      }
                      sx={{
                        cursor: "pointer",
                        padding: "2px",
                        borderRadius: "50%",
                        border:
                          user.avatar === avatarIndex
                            ? "1px solid " + theme.palette.primary.main
                            : "1px solid transparent",
                      }}
                    >
                      <Avatar
                        sx={{ backgroundColor: color }}
                        className="small-mui-avatar"
                      >
                        {" "}
                      </Avatar>
                    </Box>
                  ))}
                </Stack>
                {userList.length > 1 && (
                  <Button
                    onClick={() => removeUserField(index)}
                    className="small-circle-button"
                    sx={{ ml: 1 }}
                  >
                    X
                  </Button>
                )}
              </Box>
            ))}

            <Button
              onClick={addUserField}
              sx={{ mb: 4, border: "none" }}
              variant="outlined"
              className="rectangular-button"
              fullWidth
            >
              + Add Another User
            </Button>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AvatarGroup max={4} className="paper-border">
                {userList.map((user) => (
                  <Avatar
                    key={user.name}
                    sx={{ backgroundColor: avatarList[user.avatar] }}
                  >
                    {user.name[0]?.toUpperCase()}
                  </Avatar>
                ))}
              </AvatarGroup>
              <Button
                variant="contained"
                className="rectangular-button light-button"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="rectangular-button dark-button"
                onClick={handleCreate}
              >
                {userList.length === 1 ? "Create" : "Create All"}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
