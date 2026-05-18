"use client";

import beforePhoto from "@/assets/Before.png";
import afterPhoto from "@/assets/After.png";
import { BeforeAfterCard } from "@/components/ui/BeforeAfterCard/BeforeAfterCard";
import { HoverCard } from "@/components/ui/HoverCard/HoverCard";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { useSectionAnimation } from "@/lib/gsap";
import { HeroMotionFrame } from "./HeroMotionFrame";
import { createHeroTimeline } from "./hero.animation";
import { heroSteps } from "./heroSteps";
import styles from "./HeroSection.module.scss";

export function HeroSection() {
  const scopeRef = useSectionAnimation(createHeroTimeline);

  return (
    <section ref={scopeRef} id="hero" className={styles.root}>
      <div className={styles.content}>
        <div className={styles.glowUp}>
          <SectionLabel
            className={styles.glowUpLabel}
            badge="Personalized analysis"
            align="center"
            title="Get your personalised"
            titleAccent="Qoves plan"
            subtitle="Understand your facial features and start your glow-up today with a proven action plan, no plastic surgery needed."
          />
        </div>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.content}>
          <div className={styles.cardInner}>
            <HeroMotionFrame
              before={
                <BeforeAfterCard
                  label="Before"
                  image={{
                    src: beforePhoto,
                    alt: "Face before Qoves analysis",
                    priority: true,
                    sizes: "(max-width: 768px) 100vw, 439px",
                  }}
                />
              }
              after={
                <BeforeAfterCard
                  label="After"
                  image={{
                    src: afterPhoto,
                    alt: "Face after Qoves glow-up plan",
                    priority: true,
                    sizes: "(max-width: 768px) 100vw, 439px",
                  }}
                />
              }
            />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.stepsFrame} data-section-content>
          <div className={styles.steps}>
            {heroSteps.map((item) => (
              <div key={item.id} className={styles.stepCell}>
                <HoverCard
                  step={item.step}
                  title={item.title}
                  data-hero-step
                  data-section-item
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
