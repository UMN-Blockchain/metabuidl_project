pragma solidity ^0.8.3;

import "./IPassify.sol";

// Needs to implement all functions of IPassify 
contract Passify is IPassify {
    constructor() IPassify() {}

    struct Record {
        uint8 min; 
        address[] custodians;
    } 

    mapping(uint256 => Record) _records; 
    uint256 _recordsCount;

    mapping(uint256 => address) _custodians;
    mapping(uint256 => string) _custodianURIs; // the link to custodian information (stored on IPFS)
    uint256 _custodiansCount;
    /**
     * @dev User calls this function when they register a new record. No fees paid.
     */
    function addRecord(address[] memory custodians) external override{
        return;
    }

    /**
     * @dev User calls this function when they wish to unlock their password 
     * (after verifying their identity).
     *
     * Emits a {Pay} event 
     */
    function pay(uint256 recordId) external override {
        emit Pay(msg.sender, recordId);
    }

    /**
     * CURRENTLY UNIMPLEMENTED
     * @dev User calls this function when they contend that custodians have not sent 
     * the correct information
     * 
     * Emits a {Dispute} event 
     */
    function dispute(uint256 recordId, address custodian) external override{
        emit Dispute(msg.sender, recordId, custodian);
    }

    /**
     * @dev Custodian calls this function to register their service on our platform
     * Requirement:
     * msg.value >= fixed stake amount
     */
    function stake() payable external override{
        return;
    }
}