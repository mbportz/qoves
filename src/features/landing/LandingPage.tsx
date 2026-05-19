import { SectionSpacer } from "@/components/layout";
import { Footer } from "@/components/layout/Footer";
import { FacialAnalysisSection } from "./analysis/FacialAnalysisSection";
import { FaqSection } from "./faq/FaqSection";
import { HeroSection } from "./hero/HeroSection";
import styles from "./LandingPage.module.scss";
import { VideoStorytellingSection } from "./philosophy/VideoStorytellingSection";

export function LandingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroBlock}>
        <HeroSection />
      </div>
      <SectionSpacer />
      <FacialAnalysisSection />
      <SectionSpacer />
      <FaqSection />
      <SectionSpacer />
      <VideoStorytellingSection />
      <Footer />
    </div>
  );
}
