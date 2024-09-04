const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MasterContract", function () {
    let masterContract;
    let deployer, artist, user;

    beforeEach(async function () {
        [deployer, artist, user] = await ethers.getSigners();

        const MasterContractFactory = await ethers.getContractFactory(
            "MasterContract"
        );
        masterContract = await MasterContractFactory.deploy();
        await masterContract.deployed();
    });

    it("Should deploy MasterContract", async function () {
        expect(masterContract.address).to.not.equal(
            ethers.constants.AddressZero
        );
    });

    it("Should register an artist", async function () {
        await masterContract.connect(artist).registerArtist("Test Artist");
        expect(await masterContract.isArtist(artist.address)).to.be.true;
    });

    it("Should register a user", async function () {
        await masterContract.connect(user).registerUser();
        const userData = await masterContract.users(user.address);
        expect(userData.isRegistered).to.be.true;
    });

    it("Should create a project", async function () {
        await masterContract.connect(artist).registerArtist("Test Artist");
        const projectName = "Test Project";
        const goalAmount = ethers.utils.parseEther("10");

        await expect(
            masterContract
                .connect(artist)
                .createProject(projectName, goalAmount)
        )
            .to.emit(masterContract, "ProjectCreated")
            .withArgs(artist.address, ethers.utils.isAddress, 0); // The second argument checks if it's a valid address

        const artistProjects = await masterContract.getArtistProjects(
            artist.address
        );
        expect(artistProjects.length).to.equal(1);

        const project = await masterContract.projects(0);
        expect(project.name).to.equal(projectName);
        expect(project.goalAmount).to.equal(goalAmount);
    });

    it("Should allow user to contribute to a project", async function () {
        await masterContract.connect(artist).registerArtist("Test Artist");
        await masterContract.connect(user).registerUser();

        await masterContract
            .connect(artist)
            .createProject("Test Project", ethers.utils.parseEther("10"));

        const contributionAmount = ethers.utils.parseEther("1");
        await expect(
            masterContract
                .connect(user)
                .contributeToProject(0, { value: contributionAmount })
        )
            .to.emit(masterContract, "UserContributed")
            .withArgs(user.address, 0);

        const userContributions = await masterContract.getUserContributions(
            user.address
        );
        expect(userContributions.length).to.equal(1);
        expect(userContributions[0]).to.equal(0); // First project has tokenId 0
    });

    it("Should not allow unregistered user to contribute", async function () {
        await masterContract.connect(artist).registerArtist("Test Artist");
        await masterContract
            .connect(artist)
            .createProject("Test Project", ethers.utils.parseEther("10"));

        const contributionAmount = ethers.utils.parseEther("1");
        await expect(
            masterContract
                .connect(user)
                .contributeToProject(0, { value: contributionAmount })
        ).to.be.revertedWith("User not registered");
    });
});
