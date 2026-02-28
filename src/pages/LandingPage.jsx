import Navbar from "../components/Navbar";
import BackToTop from "../components/BackToTop";
import HeroSection from "../components/HeroSection";
import WhatItDoes from "../components/WhatItDoes";
import FeatureSection from "../components/FeatureSection";
import TemplateCarousel from "../components/TemplateCarousel";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhatItDoes />
      <FeatureSection />
      <TemplateCarousel />
      <CTABanner />
      <Footer />
      <BackToTop />
    </div>
  );
}
