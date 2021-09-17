pragma solidity ^0.8.3;


contract Passify {

    // store custodian prices for each recprd 
    struct Record {
        uint8 min; 
        address[] custodians;
        uint256[] prices;
    } 

    mapping(uint256 => Record) _records; 
    uint256 _recordsCount;
    address[] _custodians;
    uint256 _stakeAmount;
    
    // todo: define an event that gets called when user pays 

    function pay(uint256 recordId) external {
        // make msg.sender transfer agreed payment to each custodian 
        // delete record after event is emitted 
    }

    function stake() external {
        // transfer PassifyERC20 to this contract 
    }

    function addRecord(address[] memory custodians, uint256[] memory prices) external {
        // create new Record and add to _records 
    }

}