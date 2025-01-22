import { createTheme } from "@mui/material/styles";

import { palette } from "./palette";
import { commonStyles } from "./commonStyle";

const theme = createTheme({
  typography: {
    fontFamily: "Outfit, sans-serif",
  },
  palette: palette,
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: 500,
          color: palette.primary.main,
        },
        secondary: {
          fontWeight: 300,
          color: palette.neutral.main,
        },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          "&.avatar-group-select .MuiAvatar-root": {
            width: 30,
            height: 30,
            fontSize: 15,
            fontWeight: 600,
            borderColor: palette.neutral.lightest,
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
            fontSize: 18,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            ...commonStyles,
            backgroundColor: palette.neutral.lightest,
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
            color: palette.neutral.main,
            "&.Mui-focused": {
              color: palette.primary.main,
            },
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
          "&.font-list-secondary": {
            fontSize: 13,
            color: palette.neutral.main,
          },
          "&.font-empty-list-message": {
            color: palette.neutral.main,
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
          "&.nav-list": {
            fontWeight: 600,
            fontSize: 16,
            color: palette.secondary.main,
            opacity: 0.3,
            "&.Mui-disabled": {
              color: "secondary.main",
              opacity: 1,
            },
          },
          "&.plus-button": {
            width: 50,
            height: 50,
            minWidth: 50,
            borderRadius: "50%",
            padding: 0,
            position: "relative",
            backgroundColor: palette.neutral.light,
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              backgroundColor: palette.neutral.main,
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
              transform: "scale(1.05)",
              "&::before, &::after": {
                backgroundColor: palette.background.default,
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
            color: palette.neutral.light,
          },
        },
      },
    },
  },
});

export default theme;
