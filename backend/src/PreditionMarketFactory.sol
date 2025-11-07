//SPDX-License-Identifier: MIT;

pragma solidity ^0.8.20;

contract PredictionMarketFactory {
    struct Market {
        uint256 id;
        string question;
        string category;
        bool outcome;
        string imageUrl;
        address creator;
        address liquidity;
        status activeStatus;
        uint256 totalShares;
        uint256 yeshare;
        uint256 noShare
    }
}