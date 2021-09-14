pragma solidity ^0.8.3;


contract Passify {

    // store custodian prices for each recprd 
    struct Record {
        uint8 min; 
        address[] custodians;
    } // round up to 8 bytes 

    mapping(uint256 => Record) _records; 

    // function pay(address[] memory custodians) {

    // }

}