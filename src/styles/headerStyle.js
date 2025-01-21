import theme from "./theme";

const display = {
  mobile: { xs: "flex", md: "none" },
  desktop: { xs: "none", md: "flex" },
};

const commonLogoStyle = {
  mr: 2,
  color: theme.palette.primary.main,
  textDecoration: "none",
};

export const headerStyle = {
  appBar: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "none",
    transition: "all 0.3s ease-in-out",
  },
  logoDesktop: {
    ...commonLogoStyle,
    display: display.desktop,
  },
  logoMobile: {
    ...commonLogoStyle,
    display: display.mobile,
    flexGrow: 1,
  },
  mobileMenuContainer: {
    flexGrow: 1,
    display: display.mobile,
  },
  desktopMenuContainer: {
    flexGrow: 1,
    display: display.desktop,
  },
  menuItemText: {
    color: theme.palette.secondary.main,
  },
};
