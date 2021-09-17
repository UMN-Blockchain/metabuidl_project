pragma solidity ^0.8.3;


contract Passify {

    struct Record {
        uint8 min; 
        address[] custodians;
    } 

    mapping(uint256 => Record) _records; 
    uint256 _recordsCount;

    mapping(uint256 => address) _custodians;
    mapping(uint256 => string) _custodianURIs; // the link to custodian information (stored on IPFS)
    uint256 _custodiansCount;

    uint256 _stakeAmount; // How much custodians need to stake
    
    uint256 _feeAmount; // How much to pay per custodian for unlocking password
    
    // called by user to register new record
    function addRecord(address[] memory custodians, uint256[] memory prices) external {
        // create new Record and add to _records 
        // emit an event 
    }

    // called by user to unlock password
    function pay(uint256 recordId) external {
        // make msg.sender transfer agreed payment to each custodian 
        // emit an event
        // delete record  
    }

    // called by user to dispute what the custodians returned
    function dispute(uint256 recordId, uint256 custodianId) external {
        // emit an event
    }

    // called by custodian to register their service
    function stake() payable external {
        // transfer ETH to this contract 
    }


}