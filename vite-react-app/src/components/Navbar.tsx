import { AppBar, Toolbar, styled } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Mail from "@mui/icons-material/Mail";
import { Typography, Badge } from "@mui/material";
import { Stack, Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import {Search, SearchIconWrapper ,StyledInputBase, } from "../shared/styled/Styled";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { SearchContext } from "./context/SearchContext";

const StyledToolbar = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginLeft: "15px",
}));

const Navbar = ({ isAuthenticated, setIsAuthenticated }: any) => {
  const naviagte = useNavigate();
  const settings = ["Profile", "Login", "Logout"];

  const { search, setSearch } = useContext(SearchContext);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  
  function handleUserMenuClick(setting: string): void {
    if (setting == "Logout") {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } else {
      naviagte(`/${setting}`);
    }
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <HomeIcon />
            <Typography variant="h5"> LOGO </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Search>
          </Stack>
          <Stack direction="row">
            <Icons>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon sx={{ color: "white" }} />
              </Badge>
              <Badge badgeContent={4} color="error">
                <Mail sx={{ color: "white" }} />
              </Badge>
            </Icons>
            <UserBox onClick={handleOpenUserMenu}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </UserBox>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) =>
                setting === "Login" && isAuthenticated ? null : setting ===
                    "Logout" && !isAuthenticated ? null : (
                  <MenuItem
                    key={setting}
                    onClick={() => handleUserMenuClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Stack>
        </StyledToolbar>
      </AppBar>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;