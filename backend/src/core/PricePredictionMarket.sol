// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

error AmountMustBeGreaterThan0();
error IncorrectPaymentAmount();
error MarketAlreadyResolved();
error ResolutionTimeNotReached();
error MarketNotActive();
error MarketNotPaused();
error MarketNotResolved();
error NoWinningShares();
error InsufficientContractBalance();
error PriceDataTooOld();
error InvalidPriceData();

contract PricePredictionMarket {
    
    enum Status {
        ACTIVE,
        PAUSED,
        RESOLVED
    }

    // Market identity
    uint256 public marketId;
    string public question;
    string public imageUrl;
    address public creator;
    address public factory;
    Status public currentStatus;
    bool public outcome;
    
    // Price oracle data
    AggregatorV3Interface internal priceFeed;
    uint256 public targetPrice;      // Target price (scaled to feed decimals)
    uint256 public resolutionTime;   // When market can be resolved
    string public priceSymbol;       // e.g., "BTC/USD"
    
    // Trading data
    uint256 public totalShares;
    uint256 public yesShares;
    uint256 public noShares;
    
    // Timing
    uint256 public createdAt;

    // Trading constants
    uint256 public constant SHARE_PRICE = 0.01 ether;
    uint256 public constant MAX_PRICE_AGE = 3600; // 1 hour in seconds
    
    // User position tracking
    mapping(address => uint256) public userYesShares;
    mapping(address => uint256) public userNoShares;
    mapping(address => bool) public hasPosition;
    address[] public traders;
    
    // Events
    event SharesPurchased(address indexed buyer, bool isYes, uint256 amount, uint256 cost);
    event MarketResolved(uint256 indexed marketId, bool outcome, int256 finalPrice);
    event WinningsClaimed(address indexed winner, uint256 amount);
    event AutoResolutionAttempted(uint256 indexed marketId, int256 price, uint256 timestamp);

    constructor(
        uint256 _id,
        string memory _question,
        string memory _imageUrl,
        address _creator,
        address _priceFeed,
        uint256 _targetPrice,
        uint256 _resolutionTime,
        string memory _priceSymbol
    ) {
        marketId = _id;
        question = _question;
        imageUrl = _imageUrl;
        creator = _creator;
        factory = msg.sender;
        currentStatus = Status.ACTIVE;
        createdAt = block.timestamp;
        
        // Oracle setup
        priceFeed = AggregatorV3Interface(_priceFeed);
        targetPrice = _targetPrice;
        resolutionTime = _resolutionTime;
        priceSymbol = _priceSymbol;

        // Trading shares
        totalShares = 0;
        yesShares = 0;
        noShares = 0;
    }

    // Modifiers
    modifier onlyActive() {
        require(currentStatus == Status.ACTIVE, "Market not active");
        require(block.timestamp < resolutionTime, "Market resolution time reached");
        _;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == creator, "Only creator can perform this action");
        _;
    }

    // Trading Functions (same as before)
    function buyYesShares(uint256 amount) external payable onlyActive {
        if (amount == 0) {
            revert AmountMustBeGreaterThan0();
        }
        
        uint256 cost = amount * SHARE_PRICE;
        if (msg.value != cost) {
            revert IncorrectPaymentAmount();
        }
        
        userYesShares[msg.sender] += amount;
        
        if (!hasPosition[msg.sender]) {
            hasPosition[msg.sender] = true;
            traders.push(msg.sender);
        }
        
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
        
        userNoShares[msg.sender] += amount;
        
        if (!hasPosition[msg.sender]) {
            hasPosition[msg.sender] = true;
            traders.push(msg.sender);
        }
        
        noShares += amount;
        totalShares += amount;
        
        emit SharesPurchased(msg.sender, false, amount, cost);
    }

    // ORACLE RESOLUTION FUNCTIONS - The new stuff!
    function autoResolveMarket() external {
        if (currentStatus == Status.RESOLVED) {
            revert MarketAlreadyResolved();
        }
        
        if (block.timestamp < resolutionTime) {
            revert ResolutionTimeNotReached();
        }

        // Get latest price data from Chainlink
        (
            uint80 roundId,
            int256 price,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();

        // Validate price data
        if (price <= 0) {
            revert InvalidPriceData();
        }
        
        if (block.timestamp - updatedAt > MAX_PRICE_AGE) {
            revert PriceDataTooOld();
        }

        // Determine outcome: Is current price >= target price?
        bool marketOutcome = uint256(price) >= targetPrice;
        
        // Resolve the market
        outcome = marketOutcome;
        currentStatus = Status.RESOLVED;
        
        emit MarketResolved(marketId, marketOutcome, price);
        emit AutoResolutionAttempted(marketId, price, updatedAt);
    }

    // Manual resolution fallback (if oracle fails)
    function manualResolveMarket(bool _outcome) external onlyAdmin {
        if (currentStatus == Status.RESOLVED) {
            revert MarketAlreadyResolved();
        }
        
        if (block.timestamp < resolutionTime) {
            revert ResolutionTimeNotReached();
        }
        
        outcome = _outcome;
        currentStatus = Status.RESOLVED;
        
        emit MarketResolved(marketId, _outcome, 0); // 0 indicates manual resolution
    }

    // Market Management Functions
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
    
    // Payout Functions (same as before)
    function claimWinnings() external {
        if (currentStatus != Status.RESOLVED) {
            revert MarketNotResolved();
        }
        
        uint256 winningShares;

        if (outcome) {
            winningShares = userYesShares[msg.sender];
            if (winningShares == 0) {
                revert NoWinningShares(); 
            }
            userYesShares[msg.sender] = 0;
        } else {
            winningShares = userNoShares[msg.sender];
            if (winningShares == 0) {
                revert NoWinningShares(); 
            }
            userNoShares[msg.sender] = 0;
        }
        
        uint256 payout = winningShares * 1 ether;
        
        if (address(this).balance < payout) {
            revert InsufficientContractBalance();
        }
        
        payable(msg.sender).transfer(payout);
        
        emit WinningsClaimed(msg.sender, payout);
    }
    
    // Oracle-specific getter functions
    function getCurrentPrice() external view returns (int256 price, uint256 updatedAt) {
        (, int256 currentPrice,, uint256 timestamp,) = priceFeed.latestRoundData();
        return (currentPrice, timestamp);
    }
    
    function getMarketDetails() external view returns (
        string memory symbol,
        uint256 target,
        uint256 resolutionTimestamp,
        bool canResolve
    ) {
        return (
            priceSymbol,
            targetPrice,
            resolutionTime,
            block.timestamp >= resolutionTime
        );
    }
    
    // Standard getter functions
    function getCurrentPrices() external pure returns (uint256 yesPrice, uint256 noPrice) {
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
        
        if (currentStatus == Status.RESOLVED) {
            if (outcome && yesPosition > 0) {
                potentialPayout = yesPosition * 1 ether;
            } else if (!outcome && noPosition > 0) {
                potentialPayout = noPosition * 1 ether;
            }
        } else {
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
