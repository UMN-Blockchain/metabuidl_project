pragma solidity ^0.8.3;

import "./IPassify.sol";

// Needs to implement all functions of IPassify 
contract Passify is IPassify {
    constructor() IPassify() {}
}