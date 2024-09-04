const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProjectContract", function () {
    let projectContract;
    let masterContract;
    let owner, contributor, nonContributor;
    const projectName = "Test Project";
    const goalAmount = ethers.utils.parseEther("10");
    const tokenId = 0;

    beforeEach(async function () {
        [owner, contributor, nonContributor] = await ethers.getSigners();

        // Deploy a mock MasterContract
        const MockMasterContract = await ethers.getContractFactory(
            "MockMasterContract"
        );
        masterContract = await MockMasterContract.deploy();
        await masterContract.deployed();

        // Deploy ProjectContract
        const ProjectContractFactory = await ethers.getContractFactory(
            "ProjectContract"
        );
        projectContract = await ProjectContractFactory.deploy(
            owner.address,
            masterContract.address,
            projectName,
            goalAmount,
            tokenId
        );
        await projectContract.deployed();
    });

    it("Should deploy ProjectContract with correct parameters", async function () {
        expect(await projectContract.owner()).to.equal(owner.address);
        expect(await projectContract.masterContract()).to.equal(
            masterContract.address
        );
        expect(await projectContract.name()).to.equal(projectName);
        expect(await projectContract.goalAmount()).to.equal(goalAmount);
        expect(await projectContract.tokenId()).to.equal(tokenId);
    });

    it("Should accept contributions from MasterContract", async function () {
        const contributionAmount = ethers.utils.parseEther("1");
        await expect(
            masterContract.mockContribute(
                projectContract.address,
                contributor.address,
                { value: contributionAmount }
            )
        )
            .to.emit(projectContract, "Contribution")
            .withArgs(contributor.address, contributionAmount);

        expect(
            await projectContract.contributions(contributor.address)
        ).to.equal(contributionAmount);
        expect(await projectContract.totalContributions()).to.equal(
            contributionAmount
        );
    });

    it("Should not accept contributions directly", async function () {
        const contributionAmount = ethers.utils.parseEther("1");
        await expect(
            projectContract
                .connect(contributor)
                .contribute(contributor.address, { value: contributionAmount })
        ).to.be.revertedWith("Only MasterContract can call this function");
    });

    it("Should not accept zero contributions", async function () {
        await expect(
            masterContract.mockContribute(
                projectContract.address,
                contributor.address,
                { value: 0 }
            )
        ).to.be.revertedWith("Contribution must be greater than 0");
    });

    it("Should accumulate multiple contributions", async function () {
        const contribution1 = ethers.utils.parseEther("1");
        const contribution2 = ethers.utils.parseEther("2");

        await masterContract.mockContribute(
            projectContract.address,
            contributor.address,
            { value: contribution1 }
        );
        await masterContract.mockContribute(
            projectContract.address,
            contributor.address,
            { value: contribution2 }
        );

        expect(
            await projectContract.contributions(contributor.address)
        ).to.equal(contribution1.add(contribution2));
        expect(await projectContract.totalContributions()).to.equal(
            contribution1.add(contribution2)
        );
    });
});
