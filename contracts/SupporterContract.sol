// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/access/Ownable.sol";

// /**
//  * @title SupporterContract
//  * @notice This contract manages supporter registration and contribution records.
//  * @author Team Lightning
//  */
// contract SupporterContract is Ownable {
//     mapping(address => bool) public registeredSupporters;
//     mapping(address => address[]) public supporterContributions;

//     event SupporterRegistered(address indexed supporter);
//     event ContributionRecorded(address indexed supporter, address indexed artistContract);

//     /**
//      * @notice Registers a new supporter.
//      * @param supporter The address of the supporter to be registered.
//      */
//     function registerSupporter(address supporter) public onlyOwner {
//         require(!registeredSupporters[supporter], "Supporter already registered");
//         registeredSupporters[supporter] = true;
//         emit SupporterRegistered(supporter);
//     }

//     /**
//      * @notice Records a contribution made by a supporter to an artist.
//      * @param artistContract The address of the artist contract to which contribution is made.
//      */
//     function recordContribution(address artistContract) external onlyRegisteredSupporters {
//         supporterContributions[msg.sender].push(artistContract);
//         emit ContributionRecorded(msg.sender, artistContract);
//     }

//     /**
//      * @notice Checks if the address is a registered supporter.
//      * @param supporter The address to check.
//      * @return bool Returns true if the address is a registered supporter.
//      */
//     function isRegisteredSupporter(address supporter) public view returns (bool) {
//         return registeredSupporters[supporter];
//     }

//     modifier onlyRegisteredSupporters() {
//         require(registeredSupporters[msg.sender], "Not registered as a supporter");
//         _;
//     }
// }
