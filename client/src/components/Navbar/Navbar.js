import React, { useEffect, useState } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import useStyles from "./styles.js";
import memories from "../../images/memories.png";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history("/");

    setUser(null);
  };

  // useEffect(() => {
  //   const token = user?.token;

  //   setUser(JSON.parse(localStorage.getItem("profile")));
  // }, [location]);

  // console.log(user);
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodeedToken = decode(token);

      if (decodeedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          variant="h2"
          className={classes.heading}
          align="center"
        >
          Memories
        </Typography>
        <img
          src={memories}
          className={classes.image}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result?.name}
              src={user?.result?.imageUrl}
            >
              {user?.result?.name?.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result?.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
