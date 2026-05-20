"use client";

import beforeAmbient from "@/assets/photos/before.png";
import facialAnalysisDesktop from "@/assets/facial-analysis/desktop.png";
import facialAnalysisMobile from "@/assets/facial-analysis/mobile-half-body.png";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { useSectionAnimation } from "@/lib/gsap";
import { AnalysisDashboard } from "./dashboard";
import { analysisSectionContent } from "./analysisContent";
import { createAnalysisAnimation } from "./analysis.animation";
import styles from "./FacialAnalysisSection.module.scss";

export function FacialAnalysisSection() {
  const scopeRef = useSectionAnimation((scope) => createAnalysisAnimation(scope));

  return (
    <section ref={scopeRef} id="analysis" className={styles.root}>
      <div className={styles.ambient} aria-hidden>
        <Image
          className={styles.ambientImage}
          src={beforeAmbient}
          alt=""
          width={820}
          height={1000}
          priority={false}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.frame}>
          <div className={styles.glowUp}>
            <SectionLabel
              className={styles.label}
              badge={analysisSectionContent.badge}
              title={analysisSectionContent.title}
              titleAccent={analysisSectionContent.titleAccent}
              subtitle={analysisSectionContent.subtitle}
              align="center"
            />
          </div>

          <div className={styles.cardContainer}>
            <AnalysisDashboard
              desktopImage={facialAnalysisDesktop}
              mobileImage={facialAnalysisMobile}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
