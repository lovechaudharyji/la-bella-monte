"use client";

import FooterSection from "../../components/sections/FooterSection";
import MenHeroSection from "../../components/sections/MenHeroSection";
import FeaturesGridSection from "../../components/sections/FeaturesGridSection";
// import MenStatsSection from "../../components/sections/MenStatsSection";
import MenFeaturedSection from "../../components/sections/MenFeaturedSection";
import MenCollectionSection from "../../components/sections/MenCollectionSection";

export default function MenPage() {
  return (
    <div className="relative min-h-screen bg-white text-black">
      <MenHeroSection />
     
      {/* <MenStatsSection /> */}
      <MenFeaturedSection />
      <MenCollectionSection />
       <FeaturesGridSection />
     
      <FooterSection />
    </div>
  );
}
