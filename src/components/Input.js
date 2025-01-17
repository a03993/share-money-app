import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const labels = ["Item", "Price"];

export const colors = {
  neutralLightest: "#F9F9F9",
  neutralLight: "#E5E5E5",
  neutralDark: "#606060",
};

export const sizes = {
  button: {
    size: "50px",
    borderRadius: "50%",
    crossSize: "20px",
    crossThickness: "3px",
  },
  form: {
    margin: "2rem",
    inputWidth: "25ch",
    spacing: 2,
  },
};

const formBoxStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginTop: sizes.form.margin,
  "& > :not(style):not(:last-child)": {
    m: sizes.form.spacing,
    width: sizes.form.inputWidth,
  },
};

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "2rem",
    backgroundColor: colors.neutralLightest,
  },
  "& fieldset": {
    borderColor: colors.neutralDark,
    borderWidth: "1px",
  },
};

const crossCommonStyles = {
  content: '""',
  position: "absolute",
  backgroundColor: colors.neutralDark,
  borderRadius: "2px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const submitButtonStyles = {
  backgroundColor: colors.neutralLight,
  "&:hover": {
    backgroundColor: colors.neutralDark,
    "&::before, &::after": {
      backgroundColor: colors.neutralLight,
    },
  },
  position: "relative",
  width: sizes.button.size,
  height: sizes.button.size,
  minWidth: sizes.button.size,
  borderRadius: sizes.button.borderRadius,
  padding: 0,
  "&::before": {
    ...crossCommonStyles,
    width: sizes.button.crossSize,
    height: sizes.button.crossThickness,
  },
  "&::after": {
    ...crossCommonStyles,
    width: sizes.button.crossThickness,
    height: sizes.button.crossSize,
  },
  marginLeft: "2rem",
};

export default function Input() {
  return (
    <Box component="form" sx={formBoxStyles} noValidate autoComplete="off">
      {labels.map((label) => (
        <TextField
          key={label}
          id={`${label.toLowerCase()}-input`}
          label={label}
          variant="outlined"
          sx={textFieldStyles}
        />
      ))}
      <Button type="submit" sx={submitButtonStyles}></Button>
    </Box>
  );
}
