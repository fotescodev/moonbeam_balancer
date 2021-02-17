pragma solidity ^0.5.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract DAI is ERC20 {

    string  public name = "DAI";     
    string  public symbol = "DAI";   
    uint8   public decimals = 18;

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}