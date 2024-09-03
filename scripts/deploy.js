require("hardhat");

async function main() {
  const Test = await ethers.deployContract("Test");

  await Test.waitForDeployment();

  console.log("Test Contract Deployed at " + Test.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
