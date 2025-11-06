import { useState } from "react";

export function CreateMarketForm() {
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    category: "Crypto",
    endDate: "",
    initialLiquidity: 1000,
  });

  const categories = [
    "Crypto",
    "Technology",
    "Economics",
    "Sports",
    "Politics",
    "Entertainment",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement market creation logic
    console.log("Creating market:", formData);
    alert("Market creation would be implemented here!");
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Create New Market
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Market Question
          </label>
          <input
            type="text"
            required
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            placeholder="e.g., Will ETH hit $4,000 by Dec 2024?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Provide clear criteria for market resolution..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="datetime-local"
              required
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Liquidity ($)
          </label>
          <input
            type="number"
            required
            min="100"
            step="100"
            value={formData.initialLiquidity}
            onChange={(e) =>
              setFormData({
                ...formData,
                initialLiquidity: parseInt(e.target.value),
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Higher liquidity provides better price stability for traders
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Market
          </button>

          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            onClick={() =>
              setFormData({
                question: "",
                description: "",
                category: "Crypto",
                endDate: "",
                initialLiquidity: 1000,
              })
            }
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}
