import React, { useState, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, TextField } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import UserContext from "../context/UserContext";

function Retrieve() {
  const fakeData = [
    { name: "Auth 1", address: "1", verifiationMethod: "SMS", uri: "Auth1personalwebsite.com", selected: false },
    { name: "Auth 2", address: "2", verifiationMethod: "Email", uri: "Auth2personalwebsite.com", selected: false },

  ];

  const { account, passifyContract, web3 } = useContext(UserContext);

  const [retrievalID, setRetrievalID] = useState(null);
  const [custodianURIs, setCustodianURIs] = useState([]);

  const handleRetrieval = async () => {


    //send retrievalID to smart contract
    let min, custodianAddresses = await passifyContract.methods.getRecords(retrievalID).send();



    for (let custodianAddress of custodianAddresses) {
      let custodianURI = await passifyContract.methods.getCustodianURI(custodianAddress).call();
      setCustodianURIs([...custodianURIs, custodianURI]);
    }
  }

  console.log(passifyContract)


  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h3">Retrieve private key</Typography>
      </Grid>
      <Grid item xs={12}>
        <form noValidate autoComplete="off" onSubmit={handleRetrieval}>
          <br />

          <TextField required id="outlined-basic" label="Enter retrieval ID" variant="outlined" onChange={(e) => setRetrievalID(e.target.value)} />
          <br />
          <br />
          <Button type="submit" variant="contained">Retrieve</Button>
        </form>
        <br />
        <br />
        <br />
        <br />
      </Grid>



      <Grid item xs={12}>
        <Typography variant="h5">Your custodians:</Typography>
      </Grid>
      <div>
        {custodianURIs.map((custodianURI) => (
          <p>{custodianURI}</p>
        ))}
      </div>


      <Grid item xs={12}>
        <div>
          {fakeData.map((fake) => (
            <center><p>{fake.name} {fake.verifiationMethod} {fake.uri}</p></center>
          ))}
        </div>
      </Grid>
    </Grid >
  )
}


export default Retrieve
