pragma solidity ^0.8.3;

/**
 @dev Interface of Passify core smart contract
 */
interface IPassify {

    /**
     * @dev Emitted when `user` makes payment to unlock password stored in `recordId`.
     */
    event Pay(address indexed user, uint256 indexed recordId);

    /**
     * @dev Emitted when `user` disputes that `custodian` has returned correct data for `recordId`.
     */
    event Dispute(address indexed user, uint256 indexed recordId, address indexed custodian);


    /**
     * @dev User calls this function when they register a new record. No fees paid.
     */
    function addRecord(address[] memory custodians) external;

    /**
     * @dev User calls this function when they wish to unlock their password 
     * (after verifying their identity).
     *
     * Emits a {Pay} event 
     */
    function pay(uint256 recordId) external;

    /**
     * CURRENTLY UNIMPLEMENTED
     * @dev User calls this function when they contend that custodians have not sent 
     * the correct information
     * 
     * Emits a {Dispute} event 
     */
    function dispute(uint256 recordId, address custodian) external;

    /**
     * @dev Custodian calls this function to register their service on our platform
     * Requirement:
     * msg.value >= fixed stake amount
     */
    function stake() payable external;
}