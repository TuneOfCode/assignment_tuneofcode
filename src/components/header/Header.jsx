import SchoolIcon from "@mui/icons-material/School";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { common_css } from "../../constants/common.constant";
import "./header.css";
const settings = ["Profile", "Logout"];

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: common_css.bg_main }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 800,
                letterSpacing: ".2rem",
                textDecoration: "none",
                alignItems: "center",
                fontSize: "50px",
                color: "#FFA500	",
              }}
            >
              <SchoolIcon
                sx={{
                  display: { xs: "flex", md: "flex" },
                  mr: 1,
                  fontSize: "50px",
                  color: "#333",
                }}
              />
              SAF
            </Typography>
            <Typography
              sx={{ paddingBottom: "10px", fontSize: "15px", fontWeight: 600 }}
              color="gray"
            >
              Student Administration Framework
            </Typography>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 800,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              alignItems: "center",
              fontSize: "40px",
              color: "#FFA500	",
            }}
          >
            <SchoolIcon
              sx={{
                display: { xs: "flex", md: "flex" },
                mr: 1,
                fontSize: "40px",
                color: "#333",
              }}
            />
            SAF
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ padding: "5px 10px" }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://www.w3schools.com/howto/img_avatar.png"
                />
                <Typography
                  variant="h6"
                  color="inherit"
                  sx={{
                    fontWeight: 600,
                    marginLeft: "5px",
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  Admin
                </Typography>
              </IconButton>
            </Tooltip>
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
