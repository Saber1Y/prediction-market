// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;
import {PredictionMarket} from "./PredictionMarket.sol";

error NotAdmin();
error MarketNotFound();
error OnlyOwnerCanPerformThisAction();

contract PredictionMarketFactory {
    address[] public markets;
    uint256 public marketCount;
    
    event MarketCreated(uint256 indexed marketId, address indexed marketAddress);

    function createMarket(string memory question, string memory imageUrl, uint256 resolutionTime, uint256 targetPrice) external {
        
        address sepoliaEthUsd = 0x694AA1769357215DE4FAC081bf1f309aDC325306;

        PredictionMarket newMarket = new PredictionMarket(
            marketCount,
            question, 
            imageUrl,
            msg.sender,
            sepoliaEthUsd,
            targetPrice,
            resolutionTime
        );
        
        markets.push(address(newMarket));
        emit MarketCreated(marketCount, address(newMarket));
        marketCount++;
    }
    
    function getAllMarkets() external view returns (address[] memory) {
        return markets;
    }
}