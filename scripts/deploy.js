require("hardhat");

async function main() {
    const Master = await ethers.deployContract("MasterContract");

    await Master.waitForDeployment();

    console.log("Master Contract Deployed at " + Master.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
