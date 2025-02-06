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

export default function CreateUserModal({
  open,
  setOpen,
  setExpenseList,
  expenseItem,
}) {
  const [userList, setUserList] = useState([{ name: "", avatar: 2 }]);
  const [nameErrors, setNameErrors] = useState([false]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("error");

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
    setUserList([...userList, { name: "", avatar: 2 }]);
    setNameErrors([...nameErrors, false]);
  };

  const removeUserField = (index) => {
    const newUserList = userList.filter((_, i) => i !== index);
    const newNameErrors = nameErrors.filter((_, i) => i !== index);
    setUserList(newUserList);
    setNameErrors(newNameErrors);
  };

  const handleNameChange = (index, value) => {
    const newUserList = [...userList];
    newUserList[index].name = value;
    setUserList(newUserList);
  };

  const handleAvatarChange = (index, avatarIndex) => {
    const newUserList = [...userList];
    newUserList[index].avatar = avatarIndex;
    setUserList(newUserList);
  };

  const handleCreate = () => {
    const hasEmptyNames = userList.some((user) => !user.name);
    if (hasEmptyNames) {
      const newNameErrors = userList.map((user) => !user.name);
      setNameErrors(newNameErrors);
      setSeverity("error");
      setSnackbarOpen(true);
      setSnackbarMessage("User names cannot be empty!");
      return;
    }

    const newUsers = userList.map((user) => ({
      name: user.name,
      color: avatarList[user.avatar],
      personalExpenses: [],
    }));

    setExpenseList((prevExpenseList) =>
      prevExpenseList.map((item) => ({
        ...item,
        expenses: [...item.expenses, ...newUsers],
      }))
    );

    setSeverity("success");
    setSnackbarOpen(true);
    setSnackbarMessage("Users created successfully!");
    setOpen(false);
    setUserList([{ name: "", avatar: 2 }]);
    setNameErrors([false]);
  };

  const handleClose = () => {
    if (expenseItem.length === 0) {
      setSnackbarOpen(true);
      setSnackbarMessage("You have to create The FIRST User before closing.");
      return;
    }
    setOpen(false);
    setSnackbarOpen(false);
    setNameErrors([false]);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Modal
        aria-labelledby="create-user-modal-title"
        aria-describedby="create-user-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
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
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  sx={{ mr: 1 }}
                  required
                  error={!user.name && nameErrors[index]}
                />
                <Stack direction="row" spacing={0.5}>
                  {avatarList.map((color, avatarIndex) => (
                    <Box
                      key={avatarIndex}
                      onClick={() => handleAvatarChange(index, avatarIndex)}
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
