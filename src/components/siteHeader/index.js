import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withRouter } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { UserContext } from "../../contexts/userContext";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));

const SiteHeader = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [authAnchorEl, setAuthAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const authOpen = Boolean(authAnchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const context = useContext(UserContext);
  console.log(context.user);

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Playlist", path: "/movies/playlist" },
    { label: "Search", path: "/search" },
  ];

  const authMenuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favorites", path: "/movies/auth/favorites" },
    { label: "Playlist", path: "/movies/playlist" },
    { label: "Search", path: "/search" },
  ];

  const handleMenuSelect = (pageURL) => {
    history.push(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAuthMenu = (event) => {
    console.log("authmenu"); 
    setAuthAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <IconButton onClick={() => history.push("/")}>
            <img src="/icon.png" alt="film icon"></img>
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            WatchList
          </Typography>
          <Typography variant="h6" className={classes.title}>
            All you ever wanted to know about Movies {context.user?.username}!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {context.authenticated? authMenuOptions.map((opt)  => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                )): 
                menuOptions.map((opt)  => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))
                }
              </Menu>
            </>
          ) : (
            <>
              {context.authenticated? authMenuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              )):
              menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))
              }
            </>
          )}
          {context.authenticated ? (
            <>
            <IconButton
                aria-label="authmenu"
                aria-controls="authmenu-appbar"
                aria-haspopup="true"
                onClick={handleAuthMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="authmenu-appbar"
                anchorEl={authAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={authOpen}
                onClose={() => setAuthAnchorEl(null)}
              >
            <MenuItem>
            {context.user?.username}
            </MenuItem>    
            <MenuItem
              key="Logout"
              onClick={() => {
                context.logout();
                history.push("/");
              }}
            >
              Logout{" "}
            </MenuItem>
            </Menu>
            </>
          ) : (
            <MenuItem
              key="Login"
              onClick={() => history.push("/authenticate")}
            >
              Login to TMDB{" "}
            </MenuItem>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default withRouter(SiteHeader);
