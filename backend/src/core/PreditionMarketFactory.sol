// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;



// pragma solidity ^0.8.20;

// contract PredictionMarketFactory {
//     struct Market {
//         uint256 id;
//         string question;
//         string category;
//         bool outcome;
//         string imageUrl;
//         address creator;
//         address liquidity;
//         status activeStatus;
//         uint256 totalShares;
//         uint256 yeshare;
//         uint256 noShare
//     }

//     mapping(address => bool) public admins;
//     address[] public markets;

//     mapping(uint256 => address) public marketById;
//     uint256 public marketCount;

//     modifier onlyAdmin() {
//         require(admins[msg.sender], "Only admin can perform this action");
//         _;
//     }

//     function createMarket(uint256 id, string memory question, string memory imageUrl) public payable onlyAdmin {
//         PredictionMarket newMarket = new PredictionMarket(id, question, imageUrl, msg.sender);
//         markets.push(address(newMarket));
//         marketById[id] = address(newMarket);
//         marketCount++;
//         emit MarketCreated(id, address(newMarket), question, msg.sender);
//     }
// }