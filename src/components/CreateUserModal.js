import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  TextField,
  Avatar,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function CreateUserPage({
  open,
  setOpen,
  expenseData,
  setExpenseData,
}) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(2);
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

  const handleCreate = () => {
    if (!name) {
      setNameError(true);
      setSeverity("error");
      setSnackbarOpen(true);
      setSnackbarMessage("User name cannot be empty!");
      return;
    }

    const newUser = {
      name,
      color: avatarList[selectedAvatar],
      expenses: [],
    };

    setExpenseData((prevData) => {
      const updatedData = [...prevData, newUser];
      return updatedData;
    });

    setSeverity("success");
    setSnackbarOpen(true);
    setSnackbarMessage("User created successfully!");
    setOpen(false);
    setName("");
    setNameError(false);
  };

  const handleClose = () => {
    if (expenseData.length === 0) {
      setSnackbarOpen(true);
      setSnackbarMessage("You have to create The FIRST User before closing.");
      return;
    }
    setOpen(false);
    setSnackbarOpen(false);
    setNameError(false);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
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
              Create a User
            </Typography>
            <Typography
              id="create-user-modal-description"
              variant="body1"
              sx={{ mt: 2 }}
            >
              Create and share your private money list with others. no
              downloads, no signups!
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 10,
                mb: 10,
              }}
            >
              <TextField
                id="create-user-name-input"
                label="Name"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
                sx={{ mr: 1 }}
                required
                error={!name && nameError}
              />
              <Stack direction="row" spacing={0.5}>
                {avatarList.map((color, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedAvatar(index)}
                    sx={{
                      cursor: "pointer",
                      padding: "2px",
                      borderRadius: "50%",
                      border:
                        selectedAvatar === index
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
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Avatar sx={{ backgroundColor: avatarList[selectedAvatar] }}>
                {name[0]?.toUpperCase()}
              </Avatar>
              <Button
                variant="contained"
                className="rectangular-button regular-button"
                onClick={handleCreate}
              >
                Create
              </Button>
              <Button
                variant="contained"
                className="rectangular-button cancel-button"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
