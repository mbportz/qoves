import { Navbar, SectionSpacer } from "@/components/layout";
import { FacialAnalysisSection } from "./analysis/FacialAnalysisSection";
import { FaqSection } from "./faq/FaqSection";
import { HeroSection } from "./hero/HeroSection";
import { VideoStorytellingSection } from "./philosophy/VideoStorytellingSection";
import { Footer } from "@/components/layout/Footer";

export function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SectionSpacer />
      <FacialAnalysisSection />
      <SectionSpacer />
      <FaqSection />
      <SectionSpacer />
      <VideoStorytellingSection />
      <Footer />
    </>
  );
}
