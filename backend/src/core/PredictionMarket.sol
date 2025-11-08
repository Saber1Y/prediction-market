// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

error AmountMustBeGreaterThan0();
error IncorrectPaymentAmount();
error MarketAlreadyResolved();
error MarketHasNotEndedYet();
error MarketNotActive();
error MarketNotPaused();
error MarketNotReslved();
error NoWinningShares();
error InsufficientContractBalance();


contract PredictionMarket {
    
    enum Status {
        ACTIVE,
        PAUSED,
        RESOLVED
    }

    // Individual variables - this contract IS a market
    uint256 public marketId;
    string public question;
    string public category;
    string public imageUrl;
    address public creator;
    address public factory;
    Status public currentStatus;
    bool public outcome;
    
    // Trading data
    uint256 public totalShares;
    uint256 public yesShares;
    uint256 public noShares;
    
    // Timing
    uint256 public createdAt;
    uint256 public endTime;

    // Trading constants
    uint256 public constant SHARE_PRICE = 0.01 ether; // Fixed price: 0.01 ETH per share
    
    // User position tracking
    mapping(address => uint256) public userYesShares;
    mapping(address => uint256) public userNoShares;
    mapping(address => bool) public hasPosition; // check users who are trading in the market
    address[] public traders; 
    
    // Events
    event SharesPurchased(address indexed buyer, bool isYes, uint256 amount, uint256 cost);
    event MarketResolved(uint256 indexed marketId, bool outcome);
    event WinningsClaimed(address indexed winner, uint256 amount);

    constructor(uint256 _id, string memory _question, string memory _imageUrl, address _creator) {
        marketId = _id;
        question = _question;
        imageUrl = _imageUrl;
        creator = _creator;
        factory = msg.sender; 
        currentStatus = Status.ACTIVE;
        createdAt = block.timestamp;
        endTime = block.timestamp + 30 days; 

        //tradaing shares
        totalShares = 0;
        yesShares = 0;
        noShares = 0;
    }

    // Modifiers
    modifier onlyActive() {
        require(currentStatus == Status.ACTIVE, "Market not active");
        require(block.timestamp < endTime, "Market has ended");
        _;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == creator, "Only creator can perform this action");
        _;
    }

    // Trading Functions
    function buyYesShares(uint256 amount) external payable onlyActive {

        if (amount == 0) {
            revert AmountMustBeGreaterThan0();
        }
        // require(amount > 0, "Amount must be greater than 0");
        
        uint256 cost = amount * SHARE_PRICE; //cost of entering yes or no shares in the market
        // require(msg.value == cost, "Incorrect payment amount");
        if (msg.value != cost) {
            revert IncorrectPaymentAmount();
        }
        
        // Update user position in mapping storage
        userYesShares[msg.sender] += amount; 
        
        // Add to traders list if first time
        if (!hasPosition[msg.sender]) {
            hasPosition[msg.sender] = true;
            traders.push(msg.sender);
        }
        
        // Update market totals
        yesShares += amount;
        totalShares += amount;
        emit SharesPurchased(msg.sender, true, amount, cost);
    }

    
    function buyNoShares(uint256 amount) external payable onlyActive {
        if (amount == 0) {
            revert AmountMustBeGreaterThan0();
        }
        
        uint256 cost = amount * SHARE_PRICE;
          if (msg.value != cost) {
            revert IncorrectPaymentAmount();
        }
        
        // Update user position
        userNoShares[msg.sender] += amount;
        
        // Add to traders list if first time
        if (!hasPosition[msg.sender]) {
            hasPosition[msg.sender] = true;
            traders.push(msg.sender);
        }
        
        // Update market totals
        noShares += amount;
        totalShares += amount;
        
        emit SharesPurchased(msg.sender, false, amount, cost);
    }


    
    // Market Management Functions
    function resolveMarket(bool _outcome) external onlyAdmin {

        if (currentStatus == Status.RESOLVED) {
            revert MarketAlreadyResolved();
        }

        if (block.timestamp < endTime) {
            revert MarketHasNotEndedYet();
        }

        // require(block.timestamp >= endTime, "Market hasn't ended yet");
        
        outcome = _outcome;
        currentStatus = Status.RESOLVED;
        
        emit MarketResolved(marketId, _outcome);
    }
    
    function pauseMarket() external onlyAdmin {
        if (currentStatus != Status.ACTIVE) {
            revert MarketNotActive();
        }
        currentStatus = Status.PAUSED;
    }
    
    function resumeMarket() external onlyAdmin {
        if (currentStatus != Status.PAUSED) {
            revert MarketNotPaused();
        }
        currentStatus = Status.ACTIVE;
    }
    
    // Payout Functions
    function claimWinnings() external {
        // require(currentStatus == Status.RESOLVED, "Market not resolved");
        if (currentStatus != Status.RESOLVED) {
            revert MarketNotReslved();
        }
        
        uint256 winningShares;

        if (outcome) {
            winningShares = userYesShares[msg.sender];
            if (winningShares == 0) {
                revert NoWinningShares(); 
            }
            userYesShares[msg.sender] = 0; // Prevent double claiming
        } else {
            winningShares = userNoShares[msg.sender];
            if (winningShares == 0) {
                revert NoWinningShares(); 
            }
            userNoShares[msg.sender] = 0; // Prevent double claiming
        }
        
        // Simple payout: winning shares get 1 ETH per share
        // (This assumes each share costs 0.01 ETH, winners get 1 ETH per winning share)
        uint256 payout = winningShares * 1 ether;
        

        if (address(this).balance < payout) {
            revert InsufficientContractBalance();
        }
        
        // Transfer payout
        payable(msg.sender).transfer(payout);
        
        emit WinningsClaimed(msg.sender, payout);
    }
    
    // Getter Functions for Frontend
    function getCurrentPrices() external pure returns (uint256 yesPrice, uint256 noPrice) {
        // Fixed pricing: both YES and NO cost the same
        return (SHARE_PRICE, SHARE_PRICE);
    }
    
    function getMarketInfo() external view returns (
        uint256 id,
        string memory q,
        string memory img,
        Status status,
        uint256 yes,
        uint256 no,
        uint256 total,
        uint256 traderCount
    ) {
        return (
            marketId,
            question,
            imageUrl,
            currentStatus,
            yesShares,
            noShares,
            totalShares,
            traders.length
        );
    }
    
    function getUserPosition(address user) external view returns (
        uint256 yesPosition,
        uint256 noPosition,
        uint256 potentialPayout
    ) {
        yesPosition = userYesShares[user];
        noPosition = userNoShares[user];
        
        // Calculate potential payout if market resolves in user's favor
        if (currentStatus == Status.RESOLVED) {
            if (outcome && yesPosition > 0) {
                potentialPayout = yesPosition * 1 ether;
            } else if (!outcome && noPosition > 0) {
                potentialPayout = noPosition * 1 ether;
            }
        } else {
            // Market not resolved yet, show potential max payout
            uint256 maxShares = yesPosition > noPosition ? yesPosition : noPosition;
            potentialPayout = maxShares * 1 ether;
        }
    }
    
    function getTraders() external view returns (address[] memory) {
        return traders;
    }
    
    function getTotalTraders() external view returns (uint256) {
        return traders.length;
    }
    
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}

