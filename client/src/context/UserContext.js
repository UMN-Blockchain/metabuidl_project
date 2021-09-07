import React from "react";

const UserContext = React.createContext({
  account: null,
  smartContract1: null,
  smartContract2: null,
  web3: null
});

export default UserContext;