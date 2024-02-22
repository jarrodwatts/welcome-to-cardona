import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Teammanager", function () {
  // Define a fixture to reuse the same setup in every test
  async function deployFixture() {
    const [owner, otherAccount, anotherAccount] = await ethers.getSigners();

    const teamManagerFactory = await ethers.getContractFactory("TeamManager");
    const teamManager = await teamManagerFactory.deploy();

    return { teamManager, owner, otherAccount, anotherAccount };
  }

  describe("Team management", function () {
    // TODO: testing
  });
});
