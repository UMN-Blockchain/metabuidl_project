import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";

import TopbarLink from "./TopbarLink";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "32px",
  },
  title: {
    flexGrow: 0,
    textAlign: "left",
    marginRight: "20px",
  },
  spacer: {
    flexGrow: 1,
  },
  spinner: {
    marginRight: "8px",
  },
}));

export default function Topbar({ onConnect, isConnected }) {
  const classes = useStyles();

  const [isConnecting, setIsConnecting] = useState(false);



  const handleConnect = () => {
    setIsConnecting(true);
    onConnect();
  };

  const ConnectBtn = isConnecting ? (
    <Button
      color="inherit"
      onClick={handleConnect}
      variant="contained"
      disabled
    >
      <CircularProgress size={24} className={classes.spinner} />
      Connecting
    </Button>
  ) : (
    <Button color="primary" onClick={handleConnect} variant="contained">
      Connect
    </Button>
  );

  return (
    <>
      <AppBar position="static" color="transparent" className={classes.root}>
        <Container>
          <Toolbar>
            <TopbarLink to="/" exact>
              Entry
            </TopbarLink>
            <TopbarLink to="/retrieve">Retrieve</TopbarLink>
            <TopbarLink to="/custodiansignup">Sign Up</TopbarLink>
            <div className={classes.spacer}></div>
            {isConnected ? (
              <Button>Connected</Button>
            ) : (
              ConnectBtn
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}