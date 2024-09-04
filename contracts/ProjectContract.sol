//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ProjectContract is ERC20{
    string public projectName;
    uint256 public fundingGoal;
    uint256 public totalFunded;
    bool public isTokenDistributed;
    address public owner;
    uint256 public totalSupplyC;
    mapping(address => uint256) public contributions;
    address[] public supporters;

    event Funded(address indexed supporter, uint256 amount);
    event GoalReached(address indexed artist);
    event TokensDistributed(address indexed supporter, uint256 amount);

    constructor(
        string memory _name,
        uint256 _goalAmount
    ) ERC20(_name, "ART") {
        projectName = _name;
        fundingGoal = _goalAmount;
        totalFunded = 0;
        isTokenDistributed = false;
    }

    function contribute() public payable {
        require(msg.value > 0, "Contribution must be greater than zero");
        require(!isTokenDistributed, "Funding period has ended");

        if (contributions[msg.sender] == 0) {
            supporters.push(msg.sender);
        }
        contributions[msg.sender] += msg.value;
        totalFunded += msg.value;
        emit Funded(msg.sender, msg.value);

        if (totalFunded >= fundingGoal) {
            isTokenDistributed = true;
            emit GoalReached(owner);
        }
    }

    function collectDistribution() public {
        require(isTokenDistributed, "Tokens are not ready for distribution");
        require(contributions[msg.sender] > 0, "No contribution found");

        if(totalSupplyC == 0){
            totalSupplyC = totalSupply();
        }
        uint256 supporterContribution = contributions[msg.sender];
        uint256 tokensToDistribute = (supporterContribution * totalSupplyC) / totalFunded;
        
        require(tokensToDistribute > 0, "No tokens to distribute");
        
        contributions[msg.sender] = 0; // Prevent multiple collections
        _mint(msg.sender, tokensToDistribute);
        emit TokensDistributed(msg.sender, tokensToDistribute);
    }

    function withdrawFunds() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        require(isTokenDistributed, "Funding goal not reached");
        payable(owner).transfer(address(this).balance);
    }

}

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// interface ISupporterContract {
//     function recordContribution(address artistContract) external;
// }

// contract ArtistContract is Ownable {
//     string public artistName;
//     uint256 public fundingGoal;
//     uint256 public totalSupply;
//     uint256 public totalFunded;
//     ERC20 public token;
//     address public supporterContractAddress;

//     mapping(address => uint256) public contributions;
//     address[] public supporters;

//     event Funded(address indexed supporter, uint256 amount);
//     event GoalReached(address indexed artist);
//     event TokensDistributed(address indexed supporter, uint256 amount);

//     constructor(
//         string memory _name,
//         uint256 _goalAmount,
//         uint256 _totalSupply,
//         address _supporterContractAddress
//     ) {
//         artistName = _name;
//         fundingGoal = _goalAmount;
//         totalSupply = _totalSupply;
//         totalFunded = 0;
//         token = new ERC20(string(abi.encodePacked(_name, " Token")), "ART");
//         ERC20(address(token)).mint(address(this), _totalSupply);
//         supporterContractAddress = _supporterContractAddress;
//     }

//     function contribute() public payable {
//         require(msg.value > 0, "Contribution must be greater than zero");

//         if (contributions[msg.sender] == 0) {
//             supporters.push(msg.sender);
//         }
//         contributions[msg.sender] += msg.value;
//         totalFunded += msg.value;
//         emit Funded(msg.sender, msg.value);

//         ISupporterContract(supporterContractAddress).recordContribution(address(this));

//         if (totalFunded >= fundingGoal) {
//             emit GoalReached(owner());
//         }
//     }

//     function distributeTokens() public onlyOwner {
//         require(totalFunded >= fundingGoal, "Funding goal not reached");
        
//         for (uint256 i = 0; i < supporters.length; i++) {
//             address supporter = supporters[i];
//             uint256 supporterContribution = contributions[supporter];
//             uint256 tokensToDistribute = (supporterContribution * totalSupply) / totalFunded;
//             token.transfer(supporter, tokensToDistribute);
//             emit TokensDistributed(supporter, tokensToDistribute);
//         }
//     }

//     function withdrawFunds() public onlyOwner {
//         require(verificationPassed(), "Verification not passed");
//         require(totalFunded >= fundingGoal, "Funding goal not reached");
//         payable(owner()).transfer(address(this).balance);
//     }

//     function verificationPassed() internal view returns (bool) {
//         return supporters.length >= 10;
//     }
// }