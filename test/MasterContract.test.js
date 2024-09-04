const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MasterContract", function () {
  let masterContract;
  let artistContractTemplate;
  let supporterContractTemplate;
  let deployer;
  let artistAddress;
  let supporterAddress;

  beforeEach(async function () {
    [deployer] = await ethers.getSigners();

    const ArtistContractFactory = await ethers.getContractFactory("ArtistContract");
    artistContractTemplate = await ArtistContractFactory.deploy();
    await artistContractTemplate.deployed();

    const SupporterContractFactory = await ethers.getContractFactory("SupporterContract");
    supporterContractTemplate = await SupporterContractFactory.deploy();
    await supporterContractTemplate.deployed();

    const MasterContractFactory = await ethers.getContractFactory("MasterContract");
    masterContract = await MasterContractFactory.deploy(
      artistContractTemplate.address,
      supporterContractTemplate.address
    );
    await masterContract.deployed();
  });

  it("Should deploy MasterContract with correct templates", async function () {
    expect(await masterContract.artistTemplate()).to.equal(artistContractTemplate.address);
    expect(await masterContract.supporterTemplate()).to.equal(supporterContractTemplate.address);
  });

  it("Should initialize SupporterContract", async function () {
    await masterContract.initializeSupporterContract();
    const supporterContractAddress = await masterContract.supporterContractAddress();
    expect(supporterContractAddress).to.not.equal(ethers.constants.AddressZero);
  });

  it("Should register artist correctly", async function () {
    const name = "Artist";
    const goalAmount = ethers.utils.parseEther("10");
    const totalSupply = 1000;

    await masterContract.registerArtist(name, goalAmount, totalSupply);

    const artistContracts = await masterContract.allArtistContracts();
    expect(artistContracts.length).to.equal(1);

    const artistContract = await ethers.getContractAt("ArtistContract", artistContracts[0]);
    expect(await artistContract.artistName()).to.equal(name);
    expect(await artistContract.fundingGoal()).to.equal(goalAmount);
    expect(await artistContract.totalSupply()).to.equal(totalSupply);
  });
});
