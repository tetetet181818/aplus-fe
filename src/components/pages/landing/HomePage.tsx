import HeroSection from "@/components/organisms/home/HeroSection";
import FeaturesSection from "@/components/organisms/home/FeaturesSection";
import BuyerSellerSection from "@/components/organisms/home/BuyerSellerSection";
import CallToActionSection from "@/components/organisms/home/CallToActionSection";
import HowItWorksSection from "@/components/organisms/home/HowItWorksSection";
import Navbar from "@/components/molecules/navbar/Navbar";
import Footer from "@/components/molecules/footer/Footer";
export default function HomePage() {
  return (
    <>
      <div className="bg-gradient-to-b from-sky-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <BuyerSellerSection />
        <HowItWorksSection />
        <CallToActionSection />
        <Footer />
      </div>
    </>
  );
}
