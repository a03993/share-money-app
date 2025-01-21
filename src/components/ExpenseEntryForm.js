import { Box, TextField, Button } from "@mui/material";
import ShareBySelector from "./ShareBySelector";

import theme from "../styles/theme";

const formBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "70%",
  maxWidth: "800px",
  marginTop: theme.spacing(8),
  marginLeft: "auto",
  marginRight: "auto",
  gap: theme.spacing(2),
  flexWrap: "wrap",

  "& .MuiTextField-root": {
    width: "25ch",
    flex: "1 1 auto",
  },
};

const inputWithButtonStyle = {
  display: "flex",
  alignItems: "center",
  flex: "1 1 auto",
};

export default function ExpenseEntryForm({ expenseData }) {
  return (
    <Box component="form" sx={formBoxStyle} noValidate autoComplete="off">
      <TextField id="item-input" label="Item" variant="outlined" type="text" />
      <TextField
        id="price-input"
        label="Price"
        variant="outlined"
        type="number"
      />
      <Box sx={inputWithButtonStyle}>
        <ShareBySelector expenseData={expenseData} />
        <Button type="submit" className="plus-button"></Button>
      </Box>
    </Box>
  );
}
