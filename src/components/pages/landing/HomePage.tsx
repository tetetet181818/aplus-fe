import HeroSection from "@/components/organisms/home/HeroSection";

import FeaturesSection from "@/components/organisms/home/FeaturesSection";
import BuyerSellerSection from "@/components/organisms/home/BuyerSellerSection";
import CallToActionSection from "@/components/organisms/home/CallToActionSection";
import HowItWorksSection from "@/components/organisms/home/HowItWorksSection";
import CustomerRating from "@/components/organisms/home/CustomerRating";
import BestSellerSection from "@/components/organisms/home/BestSellerSection";

export default function HomePage() {
  return (
    <>
      <div className="w-screen overflow-x-hidden">
        <HeroSection />
        <FeaturesSection />
        <BuyerSellerSection />
        <HowItWorksSection />
        <BestSellerSection />
        <CustomerRating />
        <CallToActionSection />
      </div>
    </>
  );
}
