pragma solidity ^0.8.3; 

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol"; 

contract PassifyERC20 is ERC20, Ownable {
    constructor() ERC20("PassifyERC20", "PERC20") {}
}