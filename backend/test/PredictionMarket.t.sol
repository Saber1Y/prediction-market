// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Test} from "forge-std/Test.sol";
import {PredictionMarket} from "../src/core/PredictionMarket.sol";


import {
    AmountMustBeGreaterThan0,
    IncorrectPaymentAmount
} from "../src/core/PredictionMarket.sol";

contract PredictionMarketTest is Test {
    PredictionMarket public market;
    address public creator = address(0x1);
    address public user1 = address(0x2);
    address public user2 = address(0x3);
    
    uint256 constant SHARE_PRICE = 0.01 ether;
    
    function setUp() public {
        // Deploy a new market for each test
        vm.prank(creator); // Factory would call this
        market = new PredictionMarket(
            1, 
            "Will Bitcoin hit $100k by end of 2024?", 
            "https://example.com/btc.png",
            creator,
            0x694AA1769357215DE4FAC081bf1f309aDC325306,
            100,
            2029
        );
        
        // assigns eth to dummy users
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);

        // console.log(user1.balance);
    }
    
  function testMarketInitialization() public view {
    assertEq(market.marketId(), 1);
    assertEq(market.question(), "Will Bitcoin hit $100k by end of 2024?");
    assertEq(market.imageUrl(), "https://example.com/btc.png");
    assertEq(market.createdAt(), block.timestamp);
    // assertEq(market.currentStatus(), PredictionMarket.Status.ACTIVE);
  }

  // function testOnlyActiveUsersCanBuyShares() public view  {
  //   assertTrue(market.currentStatus() == PredictionMarket.Status.PAUSED);
  // }

  function testBuyYesShares() public  {
    uint256 amountOfBoughtShares = 5;
    uint256 cost = amountOfBoughtShares * SHARE_PRICE;

    vm.prank(user1);

    market.buyYesShares{value: cost}(amountOfBoughtShares);

    assertEq(market.userYesShares(user1), amountOfBoughtShares);
    assertEq(market.hasPosition(user1), true);
    assertEq(market.yesShares(), amountOfBoughtShares);
    assertEq(market.totalShares(), amountOfBoughtShares);
    assertEq(market.getTotalTraders(), 1);
  }

  function testBuyNoShares() public  {
    uint256 amountOfBoughtShares = 5;
    uint256 cost = amountOfBoughtShares * SHARE_PRICE;

    vm.prank(user1);

    market.buyNoShares{value: cost}(amountOfBoughtShares);

    assertEq(market.userNoShares(user1), amountOfBoughtShares);
    assertEq(market.hasPosition(user1), true);
    assertEq(market.noShares(), amountOfBoughtShares);
    assertEq(market.totalShares(), amountOfBoughtShares);
    assertEq(market.getTotalTraders(), 1);
  }

function testMarketCanBePaused() public {
    assertTrue(market.currentStatus() == PredictionMarket.Status.ACTIVE);
    
    vm.prank(creator);
    market.pauseMarket();
    

    assertTrue(market.currentStatus() == PredictionMarket.Status.PAUSED);
}


function testMarketCanBeResumed() public {
    assertTrue(market.currentStatus() == PredictionMarket.Status.ACTIVE);
    

    vm.prank(creator);
    market.pauseMarket();
    assertTrue(market.currentStatus() == PredictionMarket.Status.PAUSED);
    
  
    vm.prank(creator);
    market.resumeMarket();
    assertTrue(market.currentStatus() == PredictionMarket.Status.ACTIVE);
}

function testPaymentWithZeroAmount() public {
    vm.prank(user1);
    vm.expectRevert(AmountMustBeGreaterThan0.selector);
    market.buyYesShares{value: 0 ether}(0);
}

function testPaymentWithIncorrectPayment() public {
    vm.prank(user1);
    vm.expectRevert(IncorrectPaymentAmount.selector);
    market.buyYesShares{value: 0.005 ether}(1); 
}
}