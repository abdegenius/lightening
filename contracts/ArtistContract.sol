// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ArtistContract
 * @notice This contract manages artist-specific functionality, including contributions and token distribution.
 * @author Team Lightning
 */
interface ISupporterContract {
    function recordContribution(address artistContract) external;
}

contract ArtistContract is Ownable {
    string public artistName;
    uint256 public fundingGoal;
    uint256 public totalSupply;
    uint256 public totalFunded;
    ERC20 public token;
    address public supporterContractAddress;

    mapping(address => uint256) public contributions;
    address[] public supporters;

    event Funded(address indexed supporter, uint256 amount);
    event GoalReached(address indexed artist);
    event TokensDistributed(address indexed supporter, uint256 amount);

    /**
     * @notice Initializes the ArtistContract.
     * @param _name The name of the artist.
     * @param _goalAmount The funding goal for the artist.
     * @param _totalSupply The total supply of tokens to be distributed.
     * @param _supporterContractAddress The address of the SupporterContract.
     */
    function initialize(
        address _owner,
        string memory _name,
        uint256 _goalAmount,
        uint256 _totalSupply,
        address _supporterContractAddress
    ) external {
        require(owner() == address(0), "Already initialized");
        transferOwnership(_owner);
        artistName = _name;
        fundingGoal = _goalAmount;
        totalSupply = _totalSupply;
        totalFunded = 0;
        token = new ERC20(string(abi.encodePacked(_name, " Token")), "ART");
        token._mint(address(this), _totalSupply);
        supporterContractAddress = _supporterContractAddress;
    }

    /**
     * @notice Allows supporters to contribute funds to the artist.
     */
    function contribute() public payable {
        require(msg.value > 0, "Contribution must be greater than zero");

        if (contributions[msg.sender] == 0) {
            supporters.push(msg.sender);
        }
        contributions[msg.sender] += msg.value;
        totalFunded += msg.value;
        emit Funded(msg.sender, msg.value);

        ISupporterContract(supporterContractAddress).recordContribution(address(this));

        if (totalFunded >= fundingGoal) {
            emit GoalReached(owner());
        }
    }

    /**
     * @notice Distributes tokens to supporters based on their contributions.
     */
    function distributeTokens() public onlyOwner {
        require(totalFunded >= fundingGoal, "Funding goal not reached");
        
        for (uint256 i = 0; i < supporters.length; i++) {
            address supporter = supporters[i];
            uint256 supporterContribution = contributions[supporter];
            uint256 tokensToDistribute = (supporterContribution * totalSupply) / totalFunded;
            token.transfer(supporter, tokensToDistribute);
            emit TokensDistributed(supporter, tokensToDistribute);
        }
    }

    /**
     * @notice Allows the artist to withdraw funds once the goal is reached and verification is passed.
     */
    function withdrawFunds() public onlyOwner {
        require(verificationPassed(), "Verification not passed");
        require(totalFunded >= fundingGoal, "Funding goal not reached");
        payable(owner()).transfer(address(this).balance);
    }

    /**
     * @notice Implements a verification mechanism before funds can be withdrawn.
     * @return bool Returns true if verification conditions are met.
     */
    function verificationPassed() internal view returns (bool) {
        // Implement your verification logic here.
        // For example, require a minimum number of supporters or an external approval.
        return supporters.length >= 10;  // Example condition: at least 10 supporters
    }
}



// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract ArtistContract is ERC20, Ownable {
//     uint256 public goalAmount;
//     uint256 public totalRaised;
//     bool public goalReached;
//     bool public initialized = false;

//     event FundsDeposited(address indexed buyer, uint256 amount);
//     event GoalReached();

//     function initialize(
//         address _owner,
//         string memory _name,
//         uint256 _goalAmount,
//         uint256 _totalSupply
//     ) public {
//         require(!initialized, "Already initialized");
//         _transferOwnership(_owner);
//         goalAmount = _goalAmount;
//         _mint(_owner, _totalSupply);
//         initialized = true;
//     }

//     function buyTokens() public payable {
//         require(!goalReached, "Goal already reached");
//         uint256 amount = msg.value;
//         require(amount > 0, "Cannot buy with 0 Ether");

//         uint256 tokensToBuy = (amount * totalSupply()) / goalAmount;
//         _transfer(owner(), msg.sender, tokensToBuy);

//         totalRaised += amount;
//         emit FundsDeposited(msg.sender, amount);

//         if (totalRaised >= goalAmount) {
//             goalReached = true;
//             emit GoalReached();
//         }
//     }

//     function withdrawFunds() public onlyOwner {
//         require(goalReached, "Goal not reached yet");
//         payable(owner()).transfer(address(this).balance);
//     }
// }