//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./ProjectContract.sol";

contract MasterContract is ERC721 {
    struct Artist {
        string name;
        address[] projects;
    }

    struct Project {
        string name;
        uint256 goalAmount;
        address projectContract;
        uint256 tokenId;
    }

    struct User {
        bool isRegistered;
        uint256[] contributedProjects;
    }

    mapping(address => Artist) public artists;
    mapping(address => User) public users;
    mapping(uint256 => Project) public projects;
    uint256 private _nextTokenId;

    event ArtistRegistered(address indexed artist);
    event UserRegistered(address indexed user);
    event ProjectCreated(address indexed artist, address projectContract, uint256 tokenId);
    event UserContributed(address indexed user, uint256 indexed tokenId);

    constructor() ERC721("Project NFT", "PNFT") {}

    function registerArtist(string memory _name) external {
        require(!isArtist(msg.sender), "Already registered as artist");
        artists[msg.sender].name = _name;
        emit ArtistRegistered(msg.sender);
    }

    function registerUser() external {
        require(!users[msg.sender].isRegistered, "Already registered");
        users[msg.sender].isRegistered = true;
        emit UserRegistered(msg.sender);
    }

    function createProject(string memory _name, uint256 _goalAmount) external {
        require(isArtist(msg.sender), "Not registered as artist");
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        
        ProjectContract newProject = new ProjectContract( _name, _goalAmount);
        
        Project memory projectInfo = Project(_name, _goalAmount, address(newProject), tokenId);
        projects[tokenId] = projectInfo;
        artists[msg.sender].projects.push(address(newProject));
        
        emit ProjectCreated(msg.sender, address(newProject), tokenId);
    }

    function contributeToProject(uint256 _tokenId) external payable {
        require(users[msg.sender].isRegistered, "User not registered");
        require(projects[_tokenId].projectContract != address(0), "Project does not exist");

        ProjectContract(projects[_tokenId].projectContract).contribute{value: msg.value}();
        users[msg.sender].contributedProjects.push(_tokenId);
        emit UserContributed(msg.sender, _tokenId);
    }

    function getUserContributions(address _user) external view returns (uint256[] memory) {
        return users[_user].contributedProjects;
    }

    function isArtist(address _address) public view returns (bool) {
        return bytes(artists[_address].name).length > 0;
    }

    function getArtistProjects(address _artist) external view returns (address[] memory) {
        return artists[_artist].projects;
    }
}

// import "@openzeppelin/contracts/proxy/Clones.sol";
// import "./ArtistContract.sol";
// import "./SupporterContract.sol";

// /**
//  * @title MasterContract
//  * @notice This contract manages the creation and registration of artist contracts.
//  * @author Team Lightning
//  */
// contract MasterContract {
//     address public artistTemplate;
//     address public supporterTemplate;
//     address[] public allArtistContracts;
//     address public supporterContractAddress;

//     event ArtistRegistered(address indexed artist, address artistContract);

//     constructor(address _artistTemplate, address _supporterTemplate) {
//         artistTemplate = _artistTemplate;
//         supporterTemplate = _supporterTemplate;
//     }

//     /**
//      * @notice Registers a new artist by creating a clone of the ArtistContract.
//      * @param _name The name of the artist.
//      * @param _goalAmount The funding goal for the artist.
//      * @param _totalSupply The total supply of tokens to be distributed.
//      */
//     function registerArtist(
//         string memory _name,
//         uint256 _goalAmount,
//         uint256 _totalSupply
//     ) public {
//         address clone = Clones.clone(artistTemplate);
//         ArtistContract(clone).initialize(msg.sender, _name, _goalAmount, _totalSupply, supporterContractAddress);
//         allArtistContracts.push(clone);
//         emit ArtistRegistered(msg.sender, clone);
//     }

//     /**
//      * @notice Initializes the SupporterContract and sets its address.
//      */
//     function initializeSupporterContract() public {
//         require(supporterContractAddress == address(0), "SupporterContract already initialized");
//         address clone = Clones.clone(supporterTemplate);
//         supporterContractAddress = clone;//???
//     }
// }


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