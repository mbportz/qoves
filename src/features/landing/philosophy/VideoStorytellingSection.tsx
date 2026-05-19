"use client";

import { Badge } from "@/components/ui/Badge/Badge";
import { GlassActionButton } from "@/components/ui/GlassActionButton/GlassActionButton";
import { GlassInfoCard } from "@/components/ui/GlassInfoCard/GlassInfoCard";
import { useSectionAnimation } from "@/lib/gsap";
import { philosophyCards, philosophySectionContent } from "./philosophyContent";
import { philosophyVideoSrc } from "./philosophyVideo";
import { createVideoStorytellingAnimation } from "./videoStorytelling.animation";
import { PhilosophyVanityStage } from "./PhilosophyVanityStage";
import { usePhilosophyVideo } from "./usePhilosophyVideo";
import styles from "./VideoStorytellingSection.module.scss";

export function VideoStorytellingSection() {
  const scopeRef = useSectionAnimation(createVideoStorytellingAnimation, {
    revertOnUpdate: false,
  });
  const setVideoRef = usePhilosophyVideo();

  return (
    <section
      ref={scopeRef}
      id="philosophy"
      className={styles.root}
      data-philosophy-section
      aria-labelledby="philosophy-title"
    >
      <div className={styles.track} data-story-track>
        <div className={styles.mediaPinZone} data-story-media-pin-zone>
          <div className={styles.media} data-story-media>
            <div className={styles.video} data-story-video>
              <video
                ref={setVideoRef}
                className={styles.videoEl}
                src={philosophyVideoSrc}
                muted
                autoPlay
                playsInline
                loop
                preload="auto"
                aria-hidden
              />
            </div>

            <div className={styles.filterBottom} data-story-filter aria-hidden />
            <div className={styles.filterTop} data-story-filter aria-hidden />
          </div>
        </div>

        <div className={styles.content} data-story-content data-story-stage-questions>
          <div className={styles.contentBlurGradient} data-story-content-blur aria-hidden />
          <div className={styles.contentTint} data-story-content-tint aria-hidden />
          <div className={styles.questionsStage}>
            <div className={styles.wrapper}>
              <div className={styles.glowUp}>
                <div className={styles.frame}>
                  <Badge className={styles.badge}>
                    <span className={styles.badgeLabelDesktop}>
                      {philosophySectionContent.badge}
                    </span>
                    <span className={styles.badgeLabelMobile}>
                      {philosophySectionContent.badgeMobile}
                    </span>
                  </Badge>

                  <div className={styles.copy} data-story-copy>
                    <h2 id="philosophy-title" className={`heading-5 ${styles.title}`}>
                      {philosophySectionContent.title}
                    </h2>
                    <p className={`body-2 ${styles.description}`}>
                      <span className={styles.descriptionDesktop}>
                        {philosophySectionContent.description}
                      </span>
                      <span className={styles.descriptionMobile}>
                        {philosophySectionContent.descriptionMobile}
                      </span>
                    </p>
                  </div>
                </div>

                <GlassActionButton
                  className={styles.mobileAction}
                  label={philosophySectionContent.mobileActionLabel}
                />

                <div className={styles.cardsRow} data-story-cards-row>
                  <div className={styles.cardsRowTrack}>
                    {philosophyCards.map((card) => (
                      <div key={card.id} className={styles.cardSlot} data-story-card>
                        <GlassInfoCard
                          className={styles.card}
                          tone="onVideo"
                          title={card.title}
                          subtitle={card.subtitle}
                          image={
                            card.image
                              ? {
                                  src: card.image.src,
                                  alt: card.image.alt,
                                  width: 120,
                                  height: 81,
                                }
                              : undefined
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PhilosophyVanityStage />
        </div>
      </div>
    </section>
  );
}
