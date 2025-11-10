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

    function createMarket(string memory question, string memory imageUrl) external {
        PredictionMarket newMarket = new PredictionMarket(
            marketCount,
            question, 
            imageUrl,
            msg.sender
        );
        
        markets.push(address(newMarket));
        emit MarketCreated(marketCount, address(newMarket));
        marketCount++;
    }
    
    function getAllMarkets() external view returns (address[] memory) {
        return markets;
    }
}