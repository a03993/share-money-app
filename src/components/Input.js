import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { formBoxStyle, plusButtonStyle } from "../styles/inputStyle";

const labels = ["Item", "Price"];

export default function Input() {
  return (
    <Box component="form" sx={formBoxStyle} noValidate autoComplete="off">
      {labels.map((label) => (
        <TextField
          key={label}
          id={`${label.toLowerCase()}-input`}
          label={label}
          variant="outlined"
        />
      ))}
      <Button type="submit" sx={plusButtonStyle}></Button>
    </Box>
  );
}
