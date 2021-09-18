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

/*
class CustodianSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', email:'', url:''};

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeURL = this.handleChangeURL.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }
  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }
  handleChangeURL(event) {
    this.setState({url: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    //make JSON file
    var blob = new Blob([JSON.stringify], {type:  "application/json"});
    const jsonFile = [new File([blob], "ipfsAuth.json")];
    let cid = storeFileWeb3(jsonFile);
    cid.then(function(cidString){
      ////
    });
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>This is the custodian sign up page</h1>
          <h2>Name</h2>
          <input type = "name" value={this.state.name} onChange={this.handleChangeName}/>
          <h2>E-mail</h2>
          <input type = "email" value={this.state.email} onChange={this.handleChangeEmail}/>
          <h2>URL</h2>
          <input type = "url" value={this.state.url} onChange={this.handleChangeURL}/>
          <div>
            <input type = "submit"/>
          </div>
        </form>
      </div>
    )
  }
}
*/


//export default CustodianSignUp
