"use client";

import beforeAmbient from "@/assets/Before.png";
import facialAnalysisImage from "@/assets/Facial_analysis.png";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { useSectionAnimation } from "@/lib/gsap";
import { AnalysisDashboard } from "./AnalysisDashboard";
import { analysisSectionContent } from "./analysisContent";
import { createAnalysisAnimation } from "./analysis.animation";
import styles from "./FacialAnalysisSection.module.scss";

export function FacialAnalysisSection() {
  const scopeRef = useSectionAnimation(createAnalysisAnimation);

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
            <AnalysisDashboard image={facialAnalysisImage} />
          </div>
        </div>
      </div>
    </section>
  );
}
