//SPDX-License-Identifier: MIT
pragma solidity 0.8.30;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract chainLinkTest {
    AggregatorV3Interface internal priceFeed;

       constructor(address _priceFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }
}