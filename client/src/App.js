import React, { useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Passify from "./contracts/Passify.json";
import getWeb3 from "./getWeb3";

import Entry from "./views/Entry";
import Retrieve from "./views/Retrieve";
import CustodianSignUp from "./views/CustodianSignUp";

import Topbar from "./components/Navigation/Topbar";

import UserContext from "./context/UserContext";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);


  const [passifyContract, setPassifyContract] = useState(null);



  useEffect(() => {
    (async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        const account = (await web3.eth.getAccounts())[0];

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();

        const PassifyContract = new web3.eth.Contract(
          Passify.abi,
          Passify.networks[networkId] && Passify.networks[networkId].address,
          { from: account, gasLimit: 1000000 }
        );

        console.log(account, networkId)

        console.log(await PassifyContract.methods.getCustodians().call())

        // Set web3, accounts, and contract to the state
        setWeb3(web3);
        setAccount(account);
        setPassifyContract(PassifyContract);


      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    })();
  }, []);

  const onConnect = async () => {
    setIsConnected(true);
  };

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <UserContext.Provider
      value={{
        account,
        passifyContract,
        web3
      }}
    >
      <div className="App">
        <Router>
          <Topbar onConnect={onConnect} isConnected={isConnected} />
          <Container maxWidth="lg">
            {true ? (
              <Switch>
                <Route exact path="/">
                  <Entry />
                </Route>
                <Route path="/retrieve">
                  <Retrieve />
                </Route>
                <Route path="/custodiansignup">
                  <CustodianSignUp />
                </Route>
              </Switch>
            ) : (
              <Typography>
                You must be connected to explore
              </Typography>
            )}
          </Container>
        </Router>
      </div>
    </UserContext.Provider>
  );
};


export default App;
