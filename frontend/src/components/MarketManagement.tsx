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

export function MarketManagement({ markets }: { markets: Market[] }) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Market Management
      </h3>

      <div className="space-y-4">
        {markets.map((market) => (
          <div
            key={market.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{market.question}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {market.description}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>Volume: ${market.volume.toLocaleString()}</span>
                  <span>YES: ${market.yesPrice.toFixed(2)}</span>
                  <span>Status: {market.status}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Edit
                </button>
                <button className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700">
                  Pause
                </button>
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                  Resolve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
