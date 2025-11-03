import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Markets Section - Coming Soon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Featured Prediction Markets
          </h2>
          <p className="text-lg text-white">
            Trade on the most popular prediction markets with real-time pricing.
          </p>
        </div>

        {/* Placeholder for market cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Market Card Placeholder */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Will ETH hit $4,000 by Dec 2024?
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Ends: Dec 31, 2024</span>
                <span>•</span>
                <span>Volume: $125K</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">YES</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">$0.68</div>
                  <div className="text-xs text-gray-500">68%</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-medium">NO</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-red-600">$0.32</div>
                  <div className="text-xs text-gray-500">32%</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors">
                Buy YES
              </button>
              <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors">
                Buy NO
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            View All Markets
          </button>
        </div>
      </div>
    </div>
  );
}
