const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ArtistContract", function () {
  let artistContract;
  let supporterContract;
  let masterContract;
  let deployer;
  let supporter;

  beforeEach(async function () {
    [deployer, supporter] = await ethers.getSigners();

    const SupporterContractFactory = await ethers.getContractFactory("SupporterContract");
    supporterContract = await SupporterContractFactory.deploy();
    await supporterContract.deployed();

    const ArtistContractFactory = await ethers.getContractFactory("ArtistContract");
    artistContract = await ArtistContractFactory.deploy(
      "Artist",
      ethers.utils.parseEther("10"),
      1000,
      supporterContract.address
    );
    await artistContract.deployed();

    const MasterContractFactory = await ethers.getContractFactory("MasterContract");
    masterContract = await MasterContractFactory.deploy(
      artistContract.address,
      supporterContract.address
    );
    await masterContract.deployed();

    // Initialize the artist contract
    await artistContract.initialize(deployer.address, "Artist", ethers.utils.parseEther("10"), 1000, supporterContract.address);
  });

  it("Should deploy ArtistContract with correct parameters", async function () {
    expect(await artistContract.artistName()).to.equal("Artist");
    expect(await artistContract.fundingGoal()).to.equal(ethers.utils.parseEther("10"));
    expect(await artistContract.totalSupply()).to.equal(1000);
  });

  it("Should accept contributions from supporters", async function () {
    await supporterContract.registerSupporter(supporter.address);
    await artistContract.connect(supporter).contribute({ value: ethers.utils.parseEther("1") });
    expect(await artistContract.contributions(supporter.address)).to.equal(ethers.utils.parseEther("1"));
  });

  it("Should distribute tokens correctly", async function () {
    await supporterContract.registerSupporter(supporter.address);
    await artistContract.connect(supporter).contribute({ value: ethers.utils.parseEther("1") });
    await artistContract.distributeTokens();
    const supporterTokenBalance = await artistContract.token.balanceOf(supporter.address);
    expect(supporterTokenBalance).to.be.gt(0);
  });

  it("Should withdraw funds if goal is reached and verification passes", async function () {
    await supporterContract.registerSupporter(supporter.address);
    await artistContract.connect(supporter).contribute({ value: ethers.utils.parseEther("10") });
    await artistContract.distributeTokens();
    await artistContract.withdrawFunds();
    expect(await ethers.provider.getBalance(artistContract.address)).to.equal(0);
  });
});
