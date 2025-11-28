// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "forge-std/Test.sol";
import "../src/core/PredictionMarket.sol";

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
            creator
        );
        
        // assigns eth to dummy users
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);

        console.log(user1.balance);
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


    // function testBuyNoShares() public {
    //     uint256 amount = 5;
    //     uint256 cost = amount * SHARE_PRICE;
        
    //     vm.prank(user2);
    //     market.buyNoShares{value: cost}(amount);
        
    //     assertEq(market.userNoShares(user2), amount);
    //     assertEq(market.noShares(), amount);
    //     assertEq(market.totalShares(), amount);
    //     assertTrue(market.hasPosition(user2));
    // }
    
    // function testCannotBuyZeroShares() public {
    //     vm.prank(user1);
    //     vm.expectRevert(AmountMustBeGreaterThan0.selector);
    //     market.buyYesShares{value: 0}(0);
    // }
    
    // function testCannotBuyWithIncorrectPayment() public {
    //     vm.prank(user1);
    //     vm.expectRevert(IncorrectPaymentAmount.selector);
    //     market.buyYesShares{value: 0.005 ether}(1); // Should cost 0.01 ETH
    // }
    
    // function testResolveMarket() public {
    //     // Fast forward past end time
    //     vm.warp(block.timestamp + 31 days);
        
    //     vm.prank(creator);
    //     market.resolveMarket(true);
        
    //     assertTrue(market.outcome());
    //     assertTrue(market.currentStatus() == PredictionMarket.Status.RESOLVED);
    // }
    
    // function testCannotResolveBeforeEndTime() public {
    //     vm.prank(creator);
    //     vm.expectRevert(MarketHasNotEndedYet.selector);
    //     market.resolveMarket(true);
    // }
    
//     function testCannotResolveAlreadyResolved() public {
//         // Fast forward and resolve
//         vm.warp(block.timestamp + 31 days);
//         vm.prank(creator);
//         market.resolveMarket(true);
        
//         // Try to resolve again
//         vm.prank(creator);
//         vm.expectRevert(MarketAlreadyResolved.selector);
//         market.resolveMarket(false);
//     }
    
//     function testClaimWinningsYes() public {
//         uint256 amount = 10;
//         uint256 cost = amount * SHARE_PRICE;
        
//         // User buys YES shares
//         vm.prank(user1);
//         market.buyYesShares{value: cost}(amount);
        
//         // Resolve market with YES outcome
//         vm.warp(block.timestamp + 31 days);
//         vm.prank(creator);
//         market.resolveMarket(true);
        
//         // Fund the contract for payouts
//         vm.deal(address(market), 100 ether);
        
//         uint256 balanceBefore = user1.balance;
        
//         vm.prank(user1);
//         market.claimWinnings();
        
//         uint256 expectedPayout = amount * 1 ether;
//         assertEq(user1.balance, balanceBefore + expectedPayout);
//         assertEq(market.userYesShares(user1), 0); // Shares reset after claiming
//     }
    
//     function testCannotClaimWithoutWinningShares() public {
//         // Resolve market
//         vm.warp(block.timestamp + 31 days);
//         vm.prank(creator);
//         market.resolveMarket(true);
        
//         // User with no shares tries to claim
//         vm.prank(user1);
//         vm.expectRevert(NoWinningShares.selector);
//         market.claimWinnings();
//     }
    
//     function testPauseAndResumeMarket() public {
//         // Pause market
//         vm.prank(creator);
//         market.pauseMarket();
//         assertTrue(market.currentStatus() == PredictionMarket.Status.PAUSED);
        
//         // Resume market
//         vm.prank(creator);
//         market.resumeMarket();
//         assertTrue(market.currentStatus() == PredictionMarket.Status.ACTIVE);
//     }
    
//     function testOnlyCreatorCanManageMarket() public {
//         // Non-creator tries to pause
//         vm.prank(user1);
//         vm.expectRevert("Only creator can perform this action");
//         market.pauseMarket();
        
//         // Non-creator tries to resolve
//         vm.warp(block.timestamp + 31 days);
//         vm.prank(user1);
//         vm.expectRevert("Only creator can perform this action");
//         market.resolveMarket(true);
//     }
// }
}