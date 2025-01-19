import theme from "./theme";

const HEADER_CONFIG = {
  display: {
    desktop: { xs: "none", md: "flex" },
    mobile: { xs: "flex", md: "none" },
  },
  typography: {
    fontWeight: {
      logo: 900,
      nav: 700,
    },
  },
};

export const headerStyle = {
  appBar: {
    backgroundColor: "background.paper",
    boxShadow: "none",
  },
  logoDesktop: {
    mr: 2,
    display: HEADER_CONFIG.display.desktop,
    fontWeight: HEADER_CONFIG.typography.fontWeight.logo,
    color: "primary.main",
    textDecoration: "none",
  },
  logoMobile: {
    mr: 2,
    display: HEADER_CONFIG.display.mobile,
    flexGrow: 1,
    fontWeight: HEADER_CONFIG.typography.fontWeight.logo,
    color: "primary.main",
    textDecoration: "none",
  },
  mobileMenuContainer: {
    flexGrow: 1,
    display: HEADER_CONFIG.display.mobile,
  },
  desktopMenuContainer: {
    flexGrow: 1,
    display: HEADER_CONFIG.display.desktop,
  },
  navigationButton: {
    my: 2,
    fontWeight: HEADER_CONFIG.typography.fontWeight.nav,
    color: "secondary.main",
    display: "block",
  },
};
