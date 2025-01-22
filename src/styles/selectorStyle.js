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
  backgroundColor: theme.palette.neutral.lightest,

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&:hover": {
    backgroundColor: theme.palette.background.default,
  },
  "&.Mui-focused": {
    backgroundColor: theme.palette.background.default,
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
};
