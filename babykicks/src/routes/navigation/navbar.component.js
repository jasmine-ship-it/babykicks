import React, { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { Link } from "react-router-dom";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import HomeIcon from "@mui/icons-material/Home";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { currentUser } = useContext(UserContext);
  const { handleSignInClick, handleSignOutClick } = useGoogleAuth();

  const navbarItems = [
    {
      to: "",
      label: "Home",
      icon: <HomeIcon />,
      renderDivider: false,
      handleClick: null,
    },
    {
      to: null,
      label: currentUser ? "Sign Out" : "Sign In",
      icon: currentUser ? <LogoutIcon /> : <LoginIcon />,
      renderDivider: false,
      handleClick: currentUser ? handleSignOutClick : handleSignInClick,
    },
    {
      to: "count",
      label: "Count",
      icon: <PregnantWomanIcon />,
      renderDivider: false,
      handleClick: null,
    },
    {
      to: "history",
      label: "History",
      icon: <AccessTimeOutlinedIcon />,
      renderDivider: true,
      handleClick: null,
    },
    {
      to: "profile",
      label: "Profile",
      icon: <AccountCircleOutlinedIcon />,
      renderDivider: false,
      handleClick: null,
    },
    {
      to: "settings",
      label: "Settings",
      icon: <SettingsOutlinedIcon />,
      renderDivider: false,
      handleClick: null,
    },
  ];

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <List>
        {navbarItems.map((navbarItem) => {
          return (
            <>
              <ListItem key={navbarItem.label} disablePadding>
                <ListItemButton
                  onClick={navbarItem.handleClick}
                  component={Link}
                  to={navbarItem.to}
                >
                  <ListItemIcon>{navbarItem.icon}</ListItemIcon>
                  <ListItemText primary={navbarItem.label} />
                </ListItemButton>
              </ListItem>
              {navbarItem.renderDivider && <Divider />}
            </>
          );
        })}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Baby kicks
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
