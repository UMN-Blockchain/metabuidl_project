import React from "react";

const UserContext = React.createContext({
  account: null,
  passifyContract: null,
  web3: null
});

export default UserContext;