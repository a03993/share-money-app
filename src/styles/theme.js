import { createTheme } from "@mui/material/styles";

const palette = {
  primary: {
    main: "#0E0E0E",
  },
  secondary: {
    main: "#828282",
  },
  neutral: {
    lightest: "#F9F9F9",
    light: "#E5E5E5",
    main: "#606060",
    dark: "#0E0E0E",
  },
  background: {
    default: "#FFFFFF",
    paper: "#F4F4F4",
  },
};

const theme = createTheme({
  typography: {
    fontFamily: "Outfit, sans-serif",
    logo: {
      fontWeight: 900,
    },
  },
  palette: palette,
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "2rem",
            backgroundColor: palette.background.paper,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: palette.background.default,
            },
            "&.Mui-focused": {
              backgroundColor: palette.background.default,
              "& fieldset": {
                borderColor: palette.primary.main,
                borderWidth: "2px",
              },
            },
          },
          "& fieldset": {
            borderColor: palette.primary.main,
            borderWidth: "1px",
          },
          "& label": {
            color: "#606060",
            "&.Mui-focused": {
              color: palette.primary.main,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          transition: "all 0.3s ease-in-out",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          maxWidth: "30rem",
          margin: "auto",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          "&.expense-amount": {
            textAlign: "right",
            marginRight: 16,
            flex: "0 0 auto",
          },
        },
        primary: {
          fontWeight: 500,
          color: palette.primary.main,
        },
        secondary: {
          fontWeight: 300,
          color: palette.neutral.dark,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.expense-list-title": {
            marginBottom: "1rem",
          },
          "&.summary-title": {
            marginBottom: "3rem",
            fontFamily: "Outfit",
          },
          "&.summary-amount": {
            fontWeight: 400,
            textAlign: "center",
            fontFamily: "Outfit",
          },
          "&.summary-person-count": {
            fontWeight: 900,
            fontFamily: "Outfit",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.expense-delete-button": {
            color: palette.neutral.light,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          transition: "all 0.3s ease-in-out",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          "@media (min-width: 600px)": {
            padding: "0.5rem 0",
          },
        },
      },
    },
  },
});

export default theme;
