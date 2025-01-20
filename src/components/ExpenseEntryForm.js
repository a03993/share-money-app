import { Box, TextField, Button } from "@mui/material";
import ShareBySelector from "./ShareBySelector";

import {
  formBoxStyle,
  inputWithButtonStyle,
  plusButtonStyle,
} from "../styles/expenseEntryFormStyle";

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
        <Button type="submit" sx={plusButtonStyle}></Button>
      </Box>
    </Box>
  );
}
