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
import { headerStyle } from "../styles/headerStyle";

const pages = ["List", "Result"];

export default function Header({ setPage }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [currentPage, setCurrentPage] = useState("List");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleChangePage = (page) => {
    setPage(page);
    setCurrentPage(page);
  };

  return (
    <AppBar position="static" sx={headerStyle.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            className="font-size-logo font-weight-extra-bold"
            sx={headerStyle.logoDesktop}
          >
            ShareMoney
          </Typography>
          <Box sx={headerStyle.mobileMenuContainer}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
            <Menu
              id="navigation-mobile-menu"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  disabled={currentPage === page}
                  onClick={() => {
                    handleCloseNavMenu();
                    handleChangePage(page);
                  }}
                >
                  <Typography
                    className="font-weight-bold"
                    sx={headerStyle.menuItemText}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            className="font-size-logo font-weight-extra-bold"
            sx={headerStyle.logoMobile}
          >
            ShareMoney
          </Typography>
          <Box sx={headerStyle.desktopMenuContainer}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleChangePage(page)}
                disabled={currentPage === page}
                className="nav-list"
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
