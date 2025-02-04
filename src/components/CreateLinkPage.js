import { Box, Typography, Button } from "@mui/material";

export default function CreatLinkPage({ setPage }) {
  const handleCreateLink = () => {
    setPage("List");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        mt: 10,
      }}
    >
      <Typography
        variant="h1"
        className="font-color-light-gray"
        sx={{ fontSize: 135, fontFamily: "Bungee" }}
      >
        $
      </Typography>
      <Typography variant="h6" className="font-weight-regular">
        Share expenses online, <strong>no downloads needed!</strong> <br />
        Easily settle who owes what with ShareMoney.
      </Typography>
      <Button
        variant="contained"
        className="rectangular-button light-button"
        onClick={handleCreateLink}
      >
        Create Link
      </Button>
    </Box>
  );
}
