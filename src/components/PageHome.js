import { Box, Typography, Button } from "@mui/material";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { expenseMockData } from "../mock/mockData";

export default function PageHome() {
  const navigate = useNavigate();

  const handleCreateLink = () => {
    const newLinkId = nanoid();
    const newExpenseData = {
      linkId: newLinkId,
      expenses: [],
    };
    try {
      // TODO: call API
      expenseMockData.push(newExpenseData);
      navigate(`/${newLinkId}/expenses`);
    } catch (error) {
      console.error("Failed to create expense:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
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
      <Typography
        variant="h6"
        className="font-weight-regular"
        sx={{ width: "80%" }}
      >
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
