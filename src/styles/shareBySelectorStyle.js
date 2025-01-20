import theme from "./theme";

export const formControlStyle = {
  m: 1,
  width: "100%",
  minWidth: 110,
};

export const avatarGroup = {
  display: "flex",
  alignItems: "center",
  height: 20,
};

export const selectStyle = {
  borderRadius: 10,
  backgroundColor: theme.palette.background.paper,

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

export const avatarStyle = (color) => ({
  backgroundColor: color,
  width: 30,
  height: 30,
  fontSize: 15,
  borderColor: theme.palette.neutral.lightest,
});

export const listItemtextStyle = () => ({
  marginLeft: 1,
  "& .MuiTypography-root": {
    color: theme.palette.neutral.main,
  },
});
