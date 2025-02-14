import { createTheme } from "@mui/material/styles";

import { palette } from "./palette";
import { commonStyles } from "./commonStyle";

const theme = createTheme({
  typography: {
    fontFamily: "Outfit, sans-serif",
  },
  palette: palette,
  components: {
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
            },
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: 500,
          color: palette.primary.main,
        },
        secondary: {
          fontWeight: 300,
          color: palette.secondary.dark,
        },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          "&.paper-border .MuiAvatar-root": {
            borderColor: palette.grayscale.medium,
          },
          "&.grayscale-lightest-border .MuiAvatar-root": {
            borderColor: palette.grayscale.light,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          "&.small-mui-avatar": {
            width: 30,
            height: 30,
            fontSize: 16,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            ...commonStyles,
            backgroundColor: palette.grayscale.light,
            "&:hover": {
              backgroundColor: palette.grayscale.base,
            },
            "&.Mui-focused": {
              backgroundColor: palette.grayscale.base,
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
            color: palette.secondary.dark,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.text-align-center": {
            textAlign: "center",
          },
          "&.font-size-logo": { fontSize: 28 },
          "&.font-size-list-secondary": {
            fontSize: 12,
          },
          "&.font-color-light-gray": {
            color: palette.secondary.light,
          },
          "&.font-color-dark-gray": {
            color: palette.secondary.dark,
          },
          "&.font-weight-thin": {
            fontWeight: 300,
          },
          "&.font-weight-regular": {
            fontWeight: 400,
          },
          "&.font-weight-bold": {
            fontWeight: 600,
          },
          "&.font-weight-extra-bold": {
            fontWeight: 900,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            transform: "scale(1.05)",
          },
          "&.light-button": {
            backgroundColor: palette.secondary.light,
            color: palette.secondary.dark,
          },
          "&.dark-button": {
            backgroundColor: palette.primary.main,
            color: palette.grayscale.base,
          },
          "&.rectangular-button": {
            borderRadius: 30,
          },
          "&.circle-button": {
            width: 50,
            height: 50,
            minWidth: 50,
            borderRadius: "50%",
          },
          "&.small-circle-button": {
            width: 25,
            height: 25,
            minWidth: 25,
            borderRadius: "50%",
          },
          "&.plus-button": {
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              backgroundColor: palette.secondary.dark,
              borderRadius: 2,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              transition: "inherit",
            },
            "&::before": {
              width: 20,
              height: 3,
            },
            "&::after": {
              height: 20,
              width: 3,
            },
            "&:hover": {
              backgroundColor: palette.primary.main,
              "&::before, &::after": {
                backgroundColor: palette.grayscale.base,
              },
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.expense-list-button": {
            color: palette.secondary.light,
          },
        },
      },
    },
  },
});

export default theme;
