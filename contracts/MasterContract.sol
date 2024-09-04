

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./ArtistContract.sol";
import "./SupporterContract.sol";

/**
 * @title MasterContract
 * @notice This contract manages the creation and registration of artist contracts.
 * @author Team Lightning
 */
contract MasterContract {
    address public artistTemplate;
    address public supporterTemplate;
    address[] public allArtistContracts;
    address public supporterContractAddress;

    event ArtistRegistered(address indexed artist, address artistContract);

    constructor(address _artistTemplate, address _supporterTemplate) {
        artistTemplate = _artistTemplate;
        supporterTemplate = _supporterTemplate;
    }

    /**
     * @notice Registers a new artist by creating a clone of the ArtistContract.
     * @param _name The name of the artist.
     * @param _goalAmount The funding goal for the artist.
     * @param _totalSupply The total supply of tokens to be distributed.
     */
    function registerArtist(
        string memory _name,
        uint256 _goalAmount,
        uint256 _totalSupply
    ) public {
        address clone = Clones.clone(artistTemplate);
        ArtistContract(clone).initialize(msg.sender, _name, _goalAmount, _totalSupply, supporterContractAddress);
        allArtistContracts.push(clone);
        emit ArtistRegistered(msg.sender, clone);
    }

    /**
     * @notice Initializes the SupporterContract and sets its address.
     */
    function initializeSupporterContract() public {
        require(supporterContractAddress == address(0), "SupporterContract already initialized");
        address clone = Clones.clone(supporterTemplate);
        supporterContractAddress = clone;
    }
}


// import "@openzeppelin/contracts/proxy/Clones.sol";
// import "./ArtistContract.sol";
 
// contract MasterContract {
//     address public artistTemplate;
//     address[] public allArtistContracts;

//     event ArtistRegistered(address indexed artist, address artistContract);

//     constructor(address _artistTemplate) {
//         artistTemplate = _artistTemplate;
//     }

//     function registerArtist(
//         string memory _name,
//         uint256 _goalAmount,
//         uint256 _totalSupply
//     ) public {
//         address clone = Clones.clone(artistTemplate);
//         ArtistContract(clone).initialize(msg.sender, _name, _goalAmount, _totalSupply);
//         allArtistContracts.push(clone);
//         emit ArtistRegistered(msg.sender, clone);
//     }
// }