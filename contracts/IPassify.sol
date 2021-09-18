pragma solidity ^0.8.3;

/**
 @dev Interface of Passify core smart contract
 */
interface IPassify {

    /**
     * @dev Emitted when `user` establishes new record.
     */
    event RecordAdded(address indexed user, uint256 indexed recordId);

    /**
     * @dev Emitted when `user` makes payment to unlock password stored in `recordId`.
     */
    event Pay(address indexed user, uint256 indexed recordId);

    /**
     * @dev Emitted when `user` disputes that `custodian` has returned correct data for `recordId`.
     */
    event Dispute(address indexed user, uint256 indexed recordId, address indexed custodian);


    /**
     * @dev User calls when they register a new record. No fees paid.
     */
    function addRecord(uint8 min, address[] memory custodians) external;

    /**
     * @dev User calls when they unregister their record. No fees paid.
     */
    function removeRecord(uint256 recordId) external;

    /**
     * @dev User calls when they wish to unlock their password.
     * (after verifying their identity).
     *
     * Emits a {Pay} event
     */
    function pay(uint256 recordId) external payable;

    /**
     * CURRENTLY UNIMPLEMENTED
     * @dev User calls when they contend that custodians have not sent
     * the correct information
     *
     * Emits a {Dispute} event
     */
    function dispute(uint256 recordId, address custodian) external;

    /**
     * @dev Custodian calls to register their service on our platform
     * Requirement:
     * msg.value >= fixed stake amount
     */
    function stake(string calldata custodianURI) payable external;

    /**
     * @dev Returns all registered custodians. 
    */ 
    function getCustodians() external returns(address[] memory) ;

    /**
     * @dev Returns the URI that holds custodian information. 
    */
    function getCustodianURI(address custodian) external returns(string memory);

    /**
     * @dev Returns all registered custodians. 
    */ 
    function getRecord(uint256 recordId) external returns(uint8, address[] memory) ;
}
