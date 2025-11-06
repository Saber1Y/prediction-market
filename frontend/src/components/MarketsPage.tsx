"use client";

import { useState } from "react";
import Link from "next/link";

interface Market {
  id: string;
  question: string;
  category: string;
  yesPrice: number;
  noPrice: number;
  volume24h: number;
  totalVolume: number;
  liquidity: number;
  endDate: Date;
  status: "active" | "ended" | "resolved";
  trending: boolean;
  image?: string;
  description: string;
}

// Helper functions
const formatVolume = (volume: number) => {
  if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`;
  if (volume >= 1000) return `$${(volume / 1000).toFixed(0)}K`;
  return `$${volume}`;
};

const getDaysRemaining = (endDate: Date) => {
  const now = new Date();
  const timeDiff = endDate.getTime() - now.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
};

export function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("volume");

  // Mock data - replace with real API data
  const mockMarkets: Market[] = [
    {
      id: "eth-4k-2024",
      question: "Will ETH hit $4,000 by Dec 2024?",
      category: "Crypto",
      yesPrice: 0.72,
      noPrice: 0.28,
      volume24h: 15420,
      totalVolume: 125000,
      liquidity: 45000,
      endDate: new Date("2024-12-31"),
      status: "active",
      trending: true,
      description: "Ethereum price prediction for end of 2024",
    },
    {
      id: "btc-100k-2024",
      question: "Will BTC reach $100K in 2024?",
      category: "Crypto",
      yesPrice: 0.45,
      noPrice: 0.55,
      volume24h: 22100,
      totalVolume: 189000,
      liquidity: 67000,
      endDate: new Date("2024-12-31"),
      status: "active",
      trending: true,
      description: "Bitcoin reaching six-figure milestone",
    },
    {
      id: "sol-vs-eth-2024",
      question: "Will Solana outperform Ethereum in 2024?",
      category: "Crypto",
      yesPrice: 0.33,
      noPrice: 0.67,
      volume24h: 8900,
      totalVolume: 67000,
      liquidity: 28000,
      endDate: new Date("2024-12-31"),
      status: "active",
      trending: false,
      description: "SOL vs ETH performance comparison",
    },
    {
      id: "ai-breakthrough-2024",
      question: "Will there be a major AI breakthrough in 2024?",
      category: "Technology",
      yesPrice: 0.78,
      noPrice: 0.22,
      volume24h: 12300,
      totalVolume: 95000,
      liquidity: 34000,
      endDate: new Date("2024-12-31"),
      status: "active",
      trending: false,
      description: "Major advancement in artificial intelligence",
    },
    {
      id: "tesla-500-2024",
      question: "Will Tesla stock hit $500 by end of 2024?",
      category: "Stocks",
      yesPrice: 0.41,
      noPrice: 0.59,
      volume24h: 7800,
      totalVolume: 45000,
      liquidity: 18000,
      endDate: new Date("2024-12-31"),
      status: "active",
      trending: false,
      description: "Tesla stock price prediction",
    },
    {
      id: "fed-rate-cut-2024",
      question: "Will the Fed cut rates by 1% in 2024?",
      category: "Economics",
      yesPrice: 0.62,
      noPrice: 0.38,
      volume24h: 18700,
      totalVolume: 156000,
      liquidity: 52000,
      endDate: new Date("2024-12-31"),
      status: "active",
      trending: true,
      description: "Federal Reserve monetary policy prediction",
    },
  ];

  const categories = [
    "all",
    "Crypto",
    "Technology",
    "Stocks",
    "Economics",
    "Sports",
    "Politics",
  ];

  const filteredMarkets = mockMarkets
    .filter((market) => {
      const matchesSearch =
        market.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || market.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "volume":
          return b.volume24h - a.volume24h;
        case "liquidity":
          return b.liquidity - a.liquidity;
        case "trending":
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
        case "ending":
          return a.endDate.getTime() - b.endDate.getTime();
        default:
          return 0;
      }
    });

  const trendingMarkets = mockMarkets
    .filter((market) => market.trending)
    .slice(0, 3);

  const endingSoonMarkets = mockMarkets
    .filter((market) => {
      const now = new Date();
      const timeDiff = market.endDate.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff <= 7 && daysDiff > 0;
    })
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Prediction Markets
        </h1>
        <p className="text-white">
          Discover and trade on the most popular prediction markets with
          real-time pricing.
        </p>
      </div>

      {/* Featured Sections */}
      <div className="mb-8 space-y-8">
        {/* Trending Markets */}
        {trendingMarkets.length > 0 && (
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                Trending Markets
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingMarkets.map((market) => (
                <MarketCard key={market.id} market={market} showTrending />
              ))}
            </div>
          </div>
        )}

        {/* Ending Soon */}
        {endingSoonMarkets.length > 0 && (
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Ending Soon
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {endingSoonMarkets.map((market) => (
                <MarketCard key={market.id} market={market} showCountdown />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="volume">Sort by Volume</option>
              <option value="liquidity">Sort by Liquidity</option>
              <option value="trending">Sort by Trending</option>
              <option value="ending">Sort by Ending Soon</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-white">Showing {filteredMarkets.length} markets</p>
      </div>

      {/* Markets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMarkets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>

      {filteredMarkets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No markets found matching your criteria.
          </p>
          <p className="text-gray-400 mt-2">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

interface MarketCardProps {
  market: Market;
  showTrending?: boolean;
  showCountdown?: boolean;
}

function MarketCard({ market, showTrending, showCountdown }: MarketCardProps) {
  const daysRemaining = getDaysRemaining(market.endDate);

  return (
    <Link href={`/markets/${market.id}`}>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-200 cursor-pointer">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {market.category}
              </span>
              {showTrending && market.trending && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Trending
                </span>
              )}
              {showCountdown && daysRemaining <= 7 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {daysRemaining}d left
                </span>
              )}
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {market.question}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-1 mb-3">
            {market.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Vol: {formatVolume(market.volume24h)}</span>
            <span>•</span>
            <span>Liq: {formatVolume(market.liquidity)}</span>
            <span>•</span>
            <span>{daysRemaining}d left</span>
          </div>
        </div>

        {/* Prices */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium">YES</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-green-600">
                ${market.yesPrice.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                {(market.yesPrice * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="font-medium">NO</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-red-600">
                ${market.noPrice.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                {(market.noPrice * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <div className="h-2 bg-gray-200 rounded flex-1 overflow-hidden">
              <div
                className="h-2 bg-green-500 rounded transition-all duration-300"
                style={{ width: `${market.yesPrice * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors text-sm font-medium cursor-pointer"
            onClick={(e) => {
              e.preventDefault(); 
            }}
          >
            Buy YES
          </button>
          <button
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors text-sm font-medium cursor-pointer"
            onClick={(e) => {
              e.preventDefault(); 
            }}
          >
            Buy NO
          </button>
        </div>
      </div>
    </Link>
  );
}
