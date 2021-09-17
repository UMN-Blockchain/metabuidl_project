import React from 'react';
import "./CustodianSignUp.css";
import Web3 from "web3";
import {storeFileWeb3} from "../libraries/ipfsAuthenticate.js";

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
    //get JSON file

    //update JSON file

    //make JSON file
    var blob = new Blob([JSON.stringify], {type:  "application/json"});
    const jsonFile = [new File([blob], "ipfsAuth.json")];
    let cid = storeFileWeb3(jsonFile);
    cid.then(function(word){
      alert(word);
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

export default CustodianSignUp
