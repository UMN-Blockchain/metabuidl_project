pragma solidity ^0.8.3;

import "./IPassify.sol";

// Needs to implement all functions of IPassify 
contract Passify is IPassify {
    constructor() IPassify() {}

    uint _price = 0.29 ether; // $100, Sep 18, 2021
    uint _stake = 0.0029 ether; // $1, Sep 18, 2021

    struct Record {
        uint8 min;
        address[] custodians;
    }


    uint _numRecords;
    mapping(uint => Record) private _records; 

    address[] private _custodians;
    mapping(address => string) private _custodianURIs; // the link to custodian information (stored on IPFS)
    
    /**
     * @dev User calls this function when they register a new record. No fees paid.
     */
    function addRecord(uint8 min, address[] memory custodians) external override {
        uint recordId = _numRecords;
        _records[recordId] = Record(min, custodians);
        _numRecords++;
        emit RecordAdded(msg.sender, recordId);
    }

    /**
     * @dev User calls when they unregister their record. No fees paid.
     */
    function removeRecord(uint256 recordId) external override {
        require(_records[recordId].min != 0);
        delete _records[recordId];
        _numRecords--;
    }

    /**
     * @dev User calls this function when they wish to unlock their password 
     * (after verifying their identity).
     *
     * Emits a {Pay} event 
     */
    function pay(uint256 recordId) external payable override {
        uint numCustodians = _records[recordId].custodians.length;
        require(msg.value > (_price * numCustodians));
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
    function stake(string calldata custodianURI) payable external override{
        require(bytes(_custodianURIs[msg.sender]).length != 0  && msg.value > _stake);
        _custodians.push(msg.sender);
        _custodianURIs[msg.sender] = custodianURI;
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

    function getRecord(uint256 recordId) external override view returns(uint8, address[] memory) {
        return (_records[recordId].min, _records[recordId].custodians);
    }
}