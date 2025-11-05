"use client";

import { useState } from "react";
import { useWalletConnection } from "@/hooks/useWalletConnection";

interface Position {
  id: string;
  marketId: string;
  question: string;
  position: "YES" | "NO";
  shares: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  pnl: number;
  pnlPercentage: number;
  status: "open" | "closed" | "settled";
}

interface Transaction {
  id: string;
  type: "buy" | "sell";
  market: string;
  position: "YES" | "NO";
  shares: number;
  price: number;
  total: number;
  timestamp: Date;
  txHash: string;
}

export function UserDashboard() {
  const { walletAddress, isAuthenticated } = useWalletConnection();
  const [activeTab, setActiveTab] = useState<
    "overview" | "positions" | "history"
  >("overview");

  // Mock data - replace with real data from your backend/contracts
  const mockPositions: Position[] = [
    {
      id: "1",
      marketId: "eth-4k",
      question: "Will ETH hit $4,000 by Dec 2024?",
      position: "YES",
      shares: 100,
      avgPrice: 0.68,
      currentPrice: 0.72,
      value: 72,
      pnl: 4,
      pnlPercentage: 5.88,
      status: "open",
    },
    {
      id: "2",
      marketId: "btc-100k",
      question: "Will BTC reach $100K in 2024?",
      position: "NO",
      shares: 50,
      avgPrice: 0.55,
      currentPrice: 0.48,
      value: 24,
      pnl: 3.5,
      pnlPercentage: 12.73,
      status: "open",
    },
  ];

  const mockTransactions: Transaction[] = [
    {
      id: "1",
      type: "buy",
      market: "Will ETH hit $4,000 by Dec 2024?",
      position: "YES",
      shares: 100,
      price: 0.68,
      total: 68,
      timestamp: new Date("2024-11-01"),
      txHash: "0x1234...5678",
    },
    {
      id: "2",
      type: "buy",
      market: "Will BTC reach $100K in 2024?",
      position: "NO",
      shares: 50,
      price: 0.55,
      total: 27.5,
      timestamp: new Date("2024-11-02"),
      txHash: "0x9876...5432",
    },
  ];

  const totalValue = mockPositions.reduce((sum, pos) => sum + pos.value, 0);
  const totalPnL = mockPositions.reduce((sum, pos) => sum + pos.pnl, 0);
  const totalPnLPercentage =
    totalValue > 0 ? (totalPnL / (totalValue - totalPnL)) * 100 : 0;

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to view your dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's your trading overview.
        </p>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Total Value
          </h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            ${totalValue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Total P&L
          </h3>
          <p
            className={`text-2xl font-bold mt-2 ${
              totalPnL >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            P&L %
          </h3>
          <p
            className={`text-2xl font-bold mt-2 ${
              totalPnLPercentage >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {totalPnLPercentage >= 0 ? "+" : ""}
            {totalPnLPercentage.toFixed(2)}%
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Active Positions
          </h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {mockPositions.length}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "overview", label: "Overview" },
            { id: "positions", label: "Positions" },
            { id: "history", label: "History" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Recent Positions */}
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Positions
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {mockPositions.slice(0, 3).map((position) => (
                  <div
                    key={position.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {position.question}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            position.position === "YES"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {position.position}
                        </span>
                        <span className="text-sm text-gray-500">
                          {position.shares} shares
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        ${position.value.toFixed(2)}
                      </div>
                      <div
                        className={`text-sm ${
                          position.pnl >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {position.pnl >= 0 ? "+" : ""}${position.pnl.toFixed(2)}{" "}
                        ({position.pnlPercentage.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Activity
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {mockTransactions.slice(0, 3).map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          tx.type === "buy" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        <span
                          className={`text-xs font-medium ${
                            tx.type === "buy"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {tx.type === "buy" ? "B" : "S"}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {tx.type.toUpperCase()} {tx.position}
                        </p>
                        <p className="text-sm text-gray-500">{tx.market}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${tx.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {tx.shares} shares @ ${tx.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "positions" && (
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">All Positions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shares
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    P&L
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPositions.map((position) => (
                  <tr key={position.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {position.question}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          position.position === "YES"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {position.position}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {position.shares}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${position.avgPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${position.currentPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${position.value.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-medium ${
                          position.pnl >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {position.pnl >= 0 ? "+" : ""}${position.pnl.toFixed(2)}
                      </div>
                      <div
                        className={`text-xs ${
                          position.pnl >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {position.pnlPercentage.toFixed(2)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Transaction History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shares
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tx Hash
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {tx.timestamp.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tx.type === "buy"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tx.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {tx.market}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tx.position === "YES"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tx.position}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {tx.shares}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${tx.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${tx.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <a
                        href={`https://etherscan.io/tx/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {tx.txHash}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
