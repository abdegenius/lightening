const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SupporterContract", function () {
  let supporterContract;
  let deployer;
  let supporter;

  beforeEach(async function () {
    [deployer, supporter] = await ethers.getSigners();

    const SupporterContractFactory = await ethers.getContractFactory("SupporterContract");
    supporterContract = await SupporterContractFactory.deploy();
    await supporterContract.deployed();
  });

  it("Should register supporters correctly", async function () {
    await supporterContract.registerSupporter(supporter.address);
    expect(await supporterContract.isRegisteredSupporter(supporter.address)).to.be.true;
  });

  it("Should record contributions correctly", async function () {
    await supporterContract.registerSupporter(supporter.address);
    await supporterContract.recordContribution(deployer.address);
    const contributions = await supporterContract.supporterContributions(supporter.address);
    expect(contributions).to.include(deployer.address);
  });

  it("Should not allow unregistered supporters to record contributions", async function () {
    await expect(supporterContract.connect(deployer).recordContribution(deployer.address))
      .to.be.revertedWith("Not registered as a supporter");
  });
});
