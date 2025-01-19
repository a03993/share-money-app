import theme from "./theme";

const INPUT_CONFIG = {
  spacing: {
    form: 2,
    button: 2,
  },
  sizes: {
    input: "25ch",
    button: 50,
    cross: {
      length: 20,
      thickness: 3,
    },
  },
  radius: {
    button: "50%",
  },
};

export const formBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "70%",
  maxWidth: "800px",
  marginTop: theme.spacing(3),
  marginLeft: "auto",
  marginRight: "auto",
  gap: theme.spacing(INPUT_CONFIG.spacing.form),
  flexWrap: "wrap",

  "& .MuiTextField-root": {
    width: INPUT_CONFIG.sizes.input,
    flex: "1 1 auto",
  },
};

export const inputWithButtonStyle = {
  display: "flex",
  alignItems: "center",
  flex: "1 1 auto",
};

export const plusButtonStyle = {
  width: INPUT_CONFIG.sizes.button,
  height: INPUT_CONFIG.sizes.button,
  minWidth: INPUT_CONFIG.sizes.button,
  borderRadius: INPUT_CONFIG.radius.button,
  padding: 0,
  position: "relative",
  marginLeft: theme.spacing(INPUT_CONFIG.spacing.button),
  backgroundColor: theme.palette.neutral.light,

  "&::before, &::after": {
    content: '""',
    position: "absolute",
    backgroundColor: theme.palette.neutral.dark,
    borderRadius: 2,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "inherit",
  },

  "&::before": {
    width: INPUT_CONFIG.sizes.cross.length,
    height: INPUT_CONFIG.sizes.cross.thickness,
  },

  "&::after": {
    height: INPUT_CONFIG.sizes.cross.length,
    width: INPUT_CONFIG.sizes.cross.thickness,
  },

  "&:hover": {
    backgroundColor: theme.palette.neutral.dark,
    transform: "scale(1.05)",

    "&::before, &::after": {
      backgroundColor: theme.palette.neutral.light,
    },
  },
};
