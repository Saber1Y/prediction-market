"use client";
import { useSpring, animated } from "@react-spring/web";

interface stateProps {
  value: string;
  label: string;
}

function StatAnimated({ value, label }: { value: string; label: string }) {
  const spring = useSpring({
    from: { val: 0 },
    to: { val: parseFloat(value) },
    config: { tension: 120, friction: 14 },
    delay: 500, // Start animation after component mounts
  });

  return (
    <div className="text-center">
      <animated.div className="text-3xl font-bold text-[#adf6b1]">
        {spring.val.to((val) =>
          value.includes("k") || value.includes("m")
            ? `${val.toFixed(1)}${value.replace(/[0-9.]/g, "")}`
            : Math.floor(val).toString()
        )}
      </animated.div>
      <div className="text-blue-200 mt-1">{label}</div>
    </div>
  );
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

  // This code is not correct as-is because `value` is not defined in this scope.
  // If you want to animate each stat's value, you need to use `useSpring` inside the map or create a separate component for each stat.
  // Example (inside the map):
  // {stats.map((stat, index) => {
  //   const spring = useSpring({
  //     from: { val: 0 },
  //     to: { val: parseFloat(stat.value) }, // Make sure value is a number
  //     config: { tension: 120, friction: 14 },
  //   });
  //   return (
  //     <animated.span style={spring}>{stat.value}</animated.span>
  //   );
  // })}

  return (
    <div className=" text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Predict the Future,
            <span className="block text-[#adf6b1] bg-clip-text ">
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
          {/* Animated Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <StatAnimated key={index} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
