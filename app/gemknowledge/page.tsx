import BannerSection from "@/components/gemKnowledge/bannerSection";
import DonaiDifference from "@/components/gemKnowledge/WhyChoose";
import GemstoneShowcase from "@/components/gemKnowledge/contentSection";
import AboutUsSection from "@/components/gemKnowledge/Aboutus";
export default function Page() {
  return (
    <div>
      <BannerSection />
      <AboutUsSection/>
      <DonaiDifference/>
      <GemstoneShowcase/>
      
    </div>
  );
}