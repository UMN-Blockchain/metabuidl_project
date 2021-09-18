import React, { useState, useEffect, useContext } from "react";
import { createShares, recoverKey } from "../libraries/secret_sharing";
import { encodeStr, decode } from "../libraries/bigint_utils";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Checkbox from "@material-ui/core/Checkbox";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

function Entry() {
  const handleRegister = async () => {
    const selectedAuths = auths.filter((auth) => auth.selected);
    const authCount = selectedAuths.length;
    // TODO
    let shares = createShares(encodeStr(privateKey), authCount, authCount - 1);
    // Call a smart contract function
    let addRecordCall = await passifyContract.methods.addRecord(
      selectAuth.map((auth) => auth.address)
    );

    // console.log(addRecordCall.events.)
  };

  const { passifyContract } = useContext();
  const [auths, setAuths] = useState([]);
  const [selectedAuths, setSelectedAuths] = useState([]);
  const [privateKey, setPrivateKey] = useState("");

  const dummyAuthenticators = [
    { name: "Auth 1", address: "1", verifiationMethod: "SMS", selected: false },
    {
      name: "Auth 2",
      address: "2",
      verifiationMethod: "Email",
      selected: false,
    },
    { name: "Auth 3", address: "3", verifiationMethod: "ID", selected: false },
    { name: "Auth 4", address: "4", verifiationMethod: "SMS", selected: false },
    {
      name: "Auth 5",
      address: "5",
      verifiationMethod: "Email",
      selected: false,
    },
  ];

  // Updates state when user clicks on checkbox in table
  const selectAuth = (e, selectedAuth) => {
    let updatedList = auths.map((auth) => {
      if (auth.address === selectedAuth.address) {
        return { ...auth, selected: !auth.selected };
      }
      return auth;
    });
    setAuths(updatedList);
    console.log(auths);
  };

  const handlePrivateKeyInput = (e) => {
    setPrivateKey(e.target.value);
  };

  const useStyles = makeStyles({
    table: {
      minWidth: 0,
    },
    tableRow: {
      hover: {
        "&$hover:hover": {
          backgroundColor: "#49bb7b",
        },
      },
      cursor: "grab",
    },
    authBorder: {
      border: "1px solid black",
      maxWidth: "15%",
      padding: "10px",
      margin: "10px",
    },
    selectedAuth: {
      display: "flex",
    },
  });

  const classes = useStyles();

  useEffect(() => {
    setAuths(dummyAuthenticators);
  }, []);

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h3">Secure private key</Typography>
      </Grid>
      <Grid item xs={12}>
        <form noValidate autoComplete="off">
          <TextField
            required
            id="outlined-basic"
            label="Enter private key"
            variant="outlined"
            onChange={handlePrivateKeyInput}
          />
          <br />
          <br />
          <br />
          <Typography variant="h6">Choose authentication providers:</Typography>
          <br />
          <br />
          <div className={classes.selectedAuth}>
            {auths.map((auth) =>
              auth.selected ? (
                <p key={auth.address} className={classes.authBorder}>
                  {auth.name} {auth.verifiationMethod}
                </p>
              ) : (
                <p key={auth.address}></p>
              )
            )}
          </div>
          <br />
          <br />
          <br />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <b>Auth</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Verifiation method</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {auths.map((auth) => (
                  <TableRow
                    key={auth.address}
                    hover
                    className={classes.tableRow}
                  >
                    <TableCell className="selectCheckbox" padding="checkbox">
                      <Checkbox
                        onClick={(event) => selectAuth(event, auth)}
                        className="selectCheckbox"
                        checked={auth.selected}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {auth.name}
                    </TableCell>
                    <TableCell align="left">{auth.verifiationMethod}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
          <Button variant="contained" onClick={handleRegister}>
            Register
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default Entry;
