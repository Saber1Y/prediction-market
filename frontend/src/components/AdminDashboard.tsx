"use client";

import { useState } from "react";
import { AdminGuard } from "@/components/AdminGuard";
import { CreateMarketForm } from "@/components/CreateMarketForm";
import { MarketManagement } from "@/components/MarketManagement";

export function AdminDashboard() {
  return (
    <AdminGuard>
      <AdminDashboardContent />
    </AdminGuard>
  );
}

interface Market {
  id: string;
  question: string;
  category: string;
  description: string;
  endDate: Date;
  initialLiquidity: number;
  status: "draft" | "active" | "ended" | "resolved";
  createdAt: Date;
  volume: number;
  yesPrice: number;
  noPrice: number;
}

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState<"overview" | "create" | "manage">(
    "overview"
  );

  // Mock admin data - replace with real data
  const adminStats = {
    totalMarkets: 25,
    activeMarkets: 18,
    totalVolume: 2500000,
    totalUsers: 1250,
    pendingResolutions: 3,
  };

  const recentMarkets: Market[] = [
    {
      id: "1",
      question: "Will ETH hit $4,000 by Dec 2024?",
      category: "Crypto",
      description: "Ethereum price prediction for end of 2024",
      endDate: new Date("2024-12-31"),
      initialLiquidity: 10000,
      status: "active",
      createdAt: new Date("2024-11-01"),
      volume: 125000,
      yesPrice: 0.72,
      noPrice: 0.28,
    },
    {
      id: "2",
      question: "Will BTC reach $100K in 2024?",
      category: "Crypto",
      description: "Bitcoin reaching six-figure milestone",
      endDate: new Date("2024-12-31"),
      initialLiquidity: 15000,
      status: "active",
      createdAt: new Date("2024-11-02"),
      volume: 189000,
      yesPrice: 0.45,
      noPrice: 0.55,
    },
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Admin Access
              </span>
            </div>
            <div className="text-sm text-gray-500">Welcome, Administrator</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Total Markets
            </h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {adminStats.totalMarkets}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Active Markets
            </h3>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {adminStats.activeMarkets}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Total Volume
            </h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              {formatCurrency(adminStats.totalVolume)}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Total Users
            </h3>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              {adminStats.totalUsers}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Pending
            </h3>
            <p className="text-2xl font-bold text-orange-600 mt-2">
              {adminStats.pendingResolutions}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: "📊" },
              { id: "create", label: "Create Market", icon: "➕" },
              { id: "manage", label: "Manage Markets", icon: "⚙️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as "overview" | "create" | "manage")
                }
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Recent Markets */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Markets
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Market
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Volume
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        YES Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentMarkets.map((market) => (
                      <tr key={market.id}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {market.question}
                          </div>
                          <div className="text-sm text-gray-500">
                            {market.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {market.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              market.status === "active"
                                ? "bg-green-100 text-green-800"
                                : market.status === "ended"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {market.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(market.volume)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${market.yesPrice.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "create" && (
          <div className="bg-white rounded-lg shadow p-6">
            <CreateMarketForm />
          </div>
        )}

        {activeTab === "manage" && (
          <div className="bg-white rounded-lg shadow p-6">
            <MarketManagement markets={recentMarkets} />
          </div>
        )}
      </div>
    </div>
  );
}
