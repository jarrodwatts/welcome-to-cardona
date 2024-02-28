// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC20Base.sol";
import "./TeamManager.sol";

contract CardonaPoints is ERC20Base {

    TeamManager public teamManager;

	constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        TeamManager _teamManager
    )
        ERC20Base(
            _defaultAdmin,
            _name,
            _symbol
        )
    {
        // Provide teammanager address to the contract
        teamManager = _teamManager;
    }


    function mintTo(address _to, uint256 _amount) public virtual override {
        // Check if _to is part of a team
        string memory teamName = teamManager.getUserTeam(_to);   

        // If user is not part of a team, revert
        require(bytes(teamName).length > 0, "User not part of a team");

        _mint(_to, _amount);
    }

}
