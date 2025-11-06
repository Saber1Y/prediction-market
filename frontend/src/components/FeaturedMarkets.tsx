"use client";

import Link from "next/link";
import { useSpring, animated } from "@react-spring/web";

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
  trending: boolean;
  featured: boolean;
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

export function FeaturedMarkets() {
  // Mock featured markets data - replace with real API data
  const featuredMarkets: Market[] = [
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
      trending: true,
      featured: true,
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
      trending: true,
      featured: true,
      description: "Bitcoin reaching six-figure milestone",
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
      trending: true,
      featured: true,
      description: "Federal Reserve monetary policy prediction",
    },
  ];

  // Animation for staggered card entrance
  const cardAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 120, friction: 20 },
    delay: 300,
  });

  return (
    <div className=" py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured Prediction Markets
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trade on the most popular prediction markets with real-time LMSR
            pricing
          </p>
        </div>

        {/* Featured Markets Grid */}
        <animated.div
          style={cardAnimation}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredMarkets.map((market, index) => (
            <FeaturedMarketCard key={market.id} market={market} index={index} />
          ))}
        </animated.div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="mb-6">
            <p className="text-gray-300 text-lg mb-4">
              Ready to start trading? Explore all {featuredMarkets.length * 10}+
              markets
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/markets">
              <button className="bg-white text-[#adf6b1] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                View All Markets
              </button>
            </Link>

            <Link href="/dashboard">
              <button className="border-2 border-gray-400 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:border-white hover:text-white transition-all duration-200">
                View Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeaturedMarketCardProps {
  market: Market;
  index: number;
}

function FeaturedMarketCard({ market, index }: FeaturedMarketCardProps) {
  const daysRemaining = getDaysRemaining(market.endDate);

  // Staggered animation for each card
  const cardSpring = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 120, friction: 20 },
    delay: 500 + index * 200, // Stagger each card by 200ms
  });

  return (
    <animated.div style={cardSpring}>
      <Link href={`/markets/${market.id}`}>
        <div className="bg-[#A1E5AB]  rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-gray-700 hover:border-gray-600 cursor-pointer transform hover:-translate-y-2">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-200 border border-blue-700">
                {market.category}
              </span>
              {market.trending && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-900 text-orange-200 border border-orange-700">
                  Trending
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
              {market.question}
            </h3>

            <p className="text-sm text-white mb-3">{market.description}</p>

            <div className="flex items-center gap-4 text-sm text-white">
              <span>Vol: {formatVolume(market.volume24h)}</span>
              <span>•</span>
              <span>Liq: {formatVolume(market.liquidity)}</span>
              <span>•</span>
              <span
                className={
                  daysRemaining <= 7 ? "text-red-400" : "text-gray-500"
                }
              >
                {daysRemaining}d left
              </span>
            </div>
          </div>

          {/* Probability Visualization */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-white font-medium">YES</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-400">
                  ${market.yesPrice.toFixed(2)}
                </div>
                <div className="text-xs text-white">
                  {(market.yesPrice * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-white font-medium">NO</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-red-400">
                  ${market.noPrice.toFixed(2)}
                </div>
                <div className="text-xs text-white">
                  {(market.noPrice * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                  style={{ width: `${market.yesPrice * 100}%` }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white drop-shadow-lg">
                  {(market.yesPrice * 100).toFixed(0)}% YES
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Handle YES buy
              }}
            >
              Buy YES
            </button>
            <button
              className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Handle NO buy
              }}
            >
              Buy NO
            </button>
          </div>

          {/* Hover Indicator */}
          <div className="mt-4 text-center">
            <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to view details →
            </span>
          </div>
        </div>
      </Link>
    </animated.div>
  );
}
