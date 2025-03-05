import theme from "./theme";

export const formControlStyle = {
  width: "100%",
};

export const avatarGroup = {
  display: "flex",
  alignItems: "center",
  height: 20,
};

export const selectStyle = {
  borderRadius: 10,
  backgroundColor: theme.palette.grayscale.light,

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&:hover": {
    backgroundColor: theme.palette.grayscale.base,
  },
  "&.Mui-focused": {
    backgroundColor: theme.palette.grayscale.base,
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
};
