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
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { headerStyle } from "../styles/headerStyle";

const pages = ["Expenses", "Settlement", "Create User"];

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

const NavigationMenu = ({ anchorEl, onClose, page, onPageChange }) => (
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
    {pages.map((pageName) => (
      <MenuItem
        key={pageName}
        disabled={page === pageName}
        onClick={() => {
          onClose();
          onPageChange(pageName);
        }}
      >
        <Typography className="font-weight-bold" sx={headerStyle.menuItemText}>
          {pageName}
        </Typography>
      </MenuItem>
    ))}
  </Menu>
);

export default function Header({
  page,
  setPage,
  setOpenCreateUserModal,
  linkId,
}) {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const theme = useTheme();

  const handleNavMenu = (event = null) => {
    setAnchorElNav(event?.currentTarget || null);
  };

  const handleChangePage = (pageName) => {
    if (pageName === "Create User") {
      setOpenCreateUserModal(true);
      return;
    }
    setPage(pageName);
  };

  return (
    <AppBar position="static" sx={headerStyle.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo
            onClick={() => handleChangePage("Home")}
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
              page={page}
              onPageChange={handleChangePage}
            />
          </Box>
          <Logo
            onClick={() => handleChangePage("Home")}
            style={headerStyle.logoMobile}
          />
          <Box
            sx={{
              ...headerStyle.desktopMenuContainer,
              visibility: linkId ? "visible" : "hidden",
            }}
          >
            {pages.map((pageName) => (
              <Button
                key={pageName}
                onClick={() => handleChangePage(pageName)}
                disabled={page === pageName}
                sx={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: theme.palette.secondary.main,
                  opacity: page === pageName ? 1 : 0.2,
                }}
              >
                {pageName}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
