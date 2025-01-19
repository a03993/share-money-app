import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  formBoxStyle,
  inputWithButtonStyle,
  plusButtonStyle,
} from "../styles/inputStyle";

export default function Input() {
  return (
    <Box component="form" sx={formBoxStyle} noValidate autoComplete="off">
      <TextField id="item-input" label="Item" variant="outlined" type="text" />
      <Box sx={inputWithButtonStyle}>
        <TextField
          id="price-input"
          label="Price"
          variant="outlined"
          type="number"
        />
        <Button type="submit" sx={plusButtonStyle}></Button>
      </Box>
    </Box>
  );
}
