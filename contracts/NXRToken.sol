// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Capped} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @notice Transparent capped NXR token proposal. Deployment is intentionally not included.
contract NXRToken is ERC20Capped, Ownable {
    uint256 public constant MAX_SUPPLY = 5_000_000_000 ether;

    constructor(address initialOwner)
        ERC20("NEXORA", "NXR")
        ERC20Capped(MAX_SUPPLY)
        Ownable(initialOwner)
    {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
