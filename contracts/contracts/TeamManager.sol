// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TeamManager {
    // Define a structure for a Team
    struct Team {
        string name;
        address admin; // Address of the team's admin/creator
        address[] members;
    }

    // Array to keep track of all team names
    string[] private teamNames;

    // Mapping from team names to Team structs
    mapping(string => Team) private teams;

    // Mapping to keep track of which team an address has joined
    mapping(address => string) private memberOfTeam;

    /**
     * @dev Create a new team. The creator becomes the team admin.
     * This function now calls joinTeam to add the creator as a member.
     * @param _teamName Name of the team to be created.
     */
    function createTeam(string memory _teamName) public {
        require(bytes(_teamName).length > 0, "Team name cannot be empty");
        require(teams[_teamName].members.length == 0, "Team already exists");
        require(
            bytes(memberOfTeam[msg.sender]).length == 0,
            "Creator is already part of a team"
        );

        teams[_teamName] = Team({
            name: _teamName,
            admin: msg.sender,
            members: new address[](0) // Initialize with an empty array
        });
        teamNames.push(_teamName); // Add the team name to the list of team names

        // Call joinTeam to add the creator as the first member.
        joinTeam(_teamName);
    }

    /**
     * @dev Join an existing team. Assumes the team already exists.
     * Restricts users to be part of only one team at a time.
     * @param _teamName Name of the team to join.
     */
    function joinTeam(string memory _teamName) public {
        require(bytes(_teamName).length > 0, "Team name cannot be empty");
        require(teams[_teamName].admin != address(0), "Team does not exist");
        require(
            bytes(memberOfTeam[msg.sender]).length == 0,
            "User is already part of a team."
        );

        // Add the sender to the team's members
        teams[_teamName].members.push(msg.sender);
        memberOfTeam[msg.sender] = _teamName; // Update mapping to reflect the team the user has joined
    }

    function leaveTeam() public {
        require(
            bytes(memberOfTeam[msg.sender]).length > 0,
            "User is not part of a team."
        );

        string memory teamName = memberOfTeam[msg.sender];
        address[] storage members = teams[teamName].members;

        // Find the index of the user in the team's members
        uint256 index;
        for (uint256 i = 0; i < members.length; i++) {
            if (members[i] == msg.sender) {
                index = i;
                break;
            }
        }

        // Remove the user from the team's members
        members[index] = members[members.length - 1];
        members.pop();

        // Update the mapping to reflect that the user has left the team
        memberOfTeam[msg.sender] = "";

        // Burn the NFT that was minted when the user joined the team
        nftContract.burn(msg.sender, 0, 1);
    }

    /**
     * @dev Get the team name that a user is part of.
     * @param _user Address of the user.
     */
    function getUserTeam(address _user) public view returns (string memory) {
        return memberOfTeam[_user];
    }

    /**
     * @dev Check if an address is the admin of a team.
     * @param _teamName Name of the team.
     * @param _user Address of the user to check.
     */
    function isAdmin(
        string memory _teamName,
        address _user
    ) public view returns (bool) {
        return teams[_teamName].admin == _user;
    }

    /**
     * @dev Get all team names. Note: This does not return all team details due to limitations in Solidity.
     */
    function getAllTeamNames() public view returns (string[] memory) {
        return teamNames;
    }
}
