import { HeroSection } from "@/components/HeroSection";
import { FeaturedMarkets } from "@/components/FeaturedMarkets";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedMarkets />
    </div>
  );
}
