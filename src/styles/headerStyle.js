const HEADER_CONFIG = {
  display: {
    desktop: { xs: "none", md: "flex" },
    mobile: { xs: "flex", md: "none" },
  },
  typography: {
    fontWeight: {
      logo: 900,
      nav: 600,
    },
    fontSize: {
      logo: "1.75rem",
      nav: "1.05rem",
    },
  },
};

const logoTypography = {
  fontSize: HEADER_CONFIG.typography.fontSize.logo,
  fontWeight: HEADER_CONFIG.typography.fontWeight.logo,
  color: "primary.main",
  textDecoration: "none",
};

const navTypography = {
  fontSize: HEADER_CONFIG.typography.fontSize.nav,
  fontWeight: HEADER_CONFIG.typography.fontWeight.nav,
  color: "secondary.main",
};

export const headerStyle = {
  appBar: {
    backgroundColor: "background.paper",
    boxShadow: "none",
  },
  logoDesktop: {
    mr: 2,
    display: HEADER_CONFIG.display.desktop,
    ...logoTypography,
  },
  logoMobile: {
    mr: 2,
    display: HEADER_CONFIG.display.mobile,
    flexGrow: 1,
    ...logoTypography,
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
    ...navTypography,
    opacity: 0.3,
    display: "block",
    "&.Mui-disabled": {
      color: "secondary.main",
      opacity: 1,
    },
  },
  menuItemText: {
    ...navTypography,
  },
};
