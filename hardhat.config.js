require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.24",
    networks: {
        "lisk-sepolia": {
            chainId: 4202,
            url: "https://rpc.sepolia-api.lisk.com", // Insert Infura url
            accounts: [`0x${process.env.WALLET_KEY}`],
        },
    },
    etherscan: {
        apiKey: {
            "lisk-sepolia": "empty",
        },
        customChains: [
            {
                network: "lisk-sepolia",
                chainId: 4202,
                urls: {
                    apiURL: "https://sepolia-blockscout.lisk.com/api",
                    browserURL: "https://sepolia-blockscout.lisk.com",
                },
            },
        ],
    },
};
