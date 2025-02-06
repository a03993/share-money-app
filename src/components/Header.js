import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Menu } from "@mui/material";
import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { headerStyle } from "../styles/headerStyle";

const Logo = ({ onClick, style }) => (
  <Typography
    variant="h5"
    noWrap
    component="a"
    href="/"
    onClick={onClick}
    className="font-size-logo font-weight-extra-bold"
    sx={{ ...style, cursor: "pointer" }}
  >
    ShareMoney
  </Typography>
);

const NavigationMenu = ({
  anchorEl,
  onClose,
  currentPath,
  linkId,
  onNavigate,
  paths,
}) => (
  <Menu
    id="navigation-mobile-menu"
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    open={Boolean(anchorEl)}
    onClose={onClose}
    sx={{ display: { xs: "block", md: "none" } }}
  >
    <MenuItem
      disabled={currentPath === paths.expenses}
      onClick={() => {
        onClose();
        onNavigate(paths.expenses);
      }}
    >
      <Typography className="font-weight-bold" sx={headerStyle.menuItemText}>
        Expenses
      </Typography>
    </MenuItem>
    <MenuItem
      disabled={currentPath === paths.settlement}
      onClick={() => {
        onClose();
        onNavigate(paths.settlement);
      }}
    >
      <Typography className="font-weight-bold" sx={headerStyle.menuItemText}>
        Settlement
      </Typography>
    </MenuItem>
    <MenuItem
      onClick={() => {
        onClose();
        onNavigate(paths.createUser);
      }}
    >
      <Typography className="font-weight-bold" sx={headerStyle.menuItemText}>
        Create User
      </Typography>
    </MenuItem>
  </Menu>
);

export default function Header({ setOpenCreateUserModal, linkId }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();
  const theme = useTheme();

  const commonButtonStyle = useMemo(
    () => ({
      fontWeight: 600,
      fontSize: 16,
      color: theme.palette.secondary.main,
    }),
    [theme.palette.secondary.main]
  );

  const PATHS = useMemo(
    () => ({
      expenses: `/expenses/${linkId}`,
      settlement: `/expenses/${linkId}/settlement`,
      createUser: "create-user",
    }),
    [linkId]
  );

  const handleNavMenu = (event = null) => {
    setAnchorElNav(event?.currentTarget || null);
  };

  const handleNavigation = (path) => {
    if (path === "create-user") {
      setOpenCreateUserModal(true);
      return;
    }
    navigate(path);
  };

  return (
    <AppBar position="static" sx={headerStyle.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo
            onClick={() => handleNavigation("/")}
            style={headerStyle.logoDesktop}
          />
          <Box sx={headerStyle.mobileMenuContainer}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleNavMenu}
              sx={{ visibility: linkId ? "visible" : "hidden" }}
            >
              <MenuIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
            <NavigationMenu
              anchorEl={anchorElNav}
              onClose={() => handleNavMenu()}
              currentPath={currentPath}
              linkId={linkId}
              onNavigate={handleNavigation}
              paths={PATHS}
            />
          </Box>
          <Logo
            onClick={() => handleNavigation("/")}
            style={headerStyle.logoMobile}
          />
          <Box
            sx={{
              ...headerStyle.desktopMenuContainer,
              visibility: linkId ? "visible" : "hidden",
            }}
          >
            <Button
              onClick={() => handleNavigation(PATHS.expenses)}
              disabled={currentPath === PATHS.expenses}
              sx={{
                ...commonButtonStyle,
                opacity: currentPath === PATHS.expenses ? 1 : 0.2,
              }}
            >
              Expenses
            </Button>
            <Button
              onClick={() => handleNavigation(PATHS.settlement)}
              disabled={currentPath === PATHS.settlement}
              sx={{
                ...commonButtonStyle,
                opacity: currentPath === PATHS.settlement ? 1 : 0.2,
              }}
            >
              Settlement
            </Button>
            <Button
              onClick={() => handleNavigation(PATHS.createUser)}
              sx={{
                ...commonButtonStyle,
                opacity: 0.2,
              }}
            >
              Create User
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
