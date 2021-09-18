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

    address[] _custodians;
    mapping(address => string) _custodianURIs; // the link to custodian information (stored on IPFS)
    
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

    /**
     * @dev Returns all registered custodians. 
    */ 
    function getCustodians() external override view returns(address[] memory) {
        return _custodians;
    }

    /**
     * @dev Returns the URI that holds custodian information. 
    */
    function getCustodianURI(address custodian) external override view returns(string memory) {
        return _custodianURIs[custodian]; 
    }
}