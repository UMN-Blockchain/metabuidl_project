import React, { useState, useContext } from 'react';
import "./CustodianSignUp.css";
import { Typography, Grid, TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';

import { storeFileWeb3 } from "../libraries/ipfsAuthenticate.js";

import UserContext from "../context/UserContext";


function CustodianSignUp() {

  const { account, passifyContract, web3 } = useContext(UserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [uri, setURI] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const obj = {
      "name": name,
      "description": description,
      "uri": uri

    }

    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

    const files = [
      new File([blob], 'custodianinfo.json')
    ]


    let cid = storeFileWeb3(files);

    console.log(cid);

    await passifyContract.methods.stake().send({ from: account });

    await passifyContract.methods.setCustodianURI(cid).send();



  }


  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h3">Custodian Sign Up</Typography>
      </Grid>
      <Grid item xs={12}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <br />

          <TextField required id="outlined-basic" label="Enter name" variant="outlined" onChange={(e) => setName(e.target.value)} />
          <br />
          <br />
          <TextField required id="outlined-basic" label="Enter service description" variant="outlined" onChange={(e) => setDescription(e.target.value)} />
          <br />
          <br />
          <TextField required id="outlined-basic" label="Enter website URI" variant="outlined" onChange={(e) => setURI(e.target.value)} />
          <br />
          <br />
          <Button type="submit" variant="contained">Sign Up</Button>
        </form>
        <br />
        <br />
        <br />
        <br />
      </Grid>

    </Grid >
  )
}

export default CustodianSignUp
