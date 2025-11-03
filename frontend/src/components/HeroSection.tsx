"use client";

interface stateProps {
  value: string;
  label: string;
}

export function HeroSection() {
  const stats: stateProps[] = [
    {
      value: "2.5m+",
      label: "Total Volume",
    },
    {
      value: "150",
      label: "Active Market",
    },
    {
      value: "10k+",
      label: "Traders",
    },
  ];

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
            Predict the Future,
            <span className="block  bg-clip-text text-[#adf6b1]">
              Earn Rewards
            </span>
          </h1>

          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Join the world&apos;s most advanced decentralized prediction market.
            Trade on real-world outcomes with LMSR-powered pricing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-[#adf6b1] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Start Trading
            </button>

            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#adf6b1] transition-colors duration-200">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              return (
                <div key={index} className="flex flex-col">
                  <span className="text-2xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm text-blue-100">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
