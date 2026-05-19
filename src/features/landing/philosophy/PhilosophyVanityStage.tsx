import { GlassScrollingCard } from "@/components/ui/GlassScrollingCard/GlassScrollingCard";
import { LensBackdropFilters } from "@/components/ui/LensBackdropFilters/LensBackdropFilters";
import { philosophyVanityContent } from "./philosophyContent";
import styles from "./VideoStorytellingSection.module.scss";

export function PhilosophyVanityStage() {
  const { considerCard, intelligentCard } = philosophyVanityContent;

  return (
    <div className={styles.vanityBlock} data-story-stage-vanity>
      <LensBackdropFilters />
      <div className={styles.vanityWrapper}>
        <div className={styles.vanityGlow}>
          <div className={styles.vanityHeroSticky} data-story-vanity-hero-pin>
            <div className={styles.vanityHero} data-story-vanity-hero>
              <h2 className={`heading-3 ${styles.vanityTitle}`}>
                <span className={styles.vanityTitleLine}>{philosophyVanityContent.title}</span>
                <span className={styles.vanityTitleAccent}>
                  {philosophyVanityContent.titleAccent}
                </span>
              </h2>
              <p className={`body-3 ${styles.vanityDescription}`}>
                {philosophyVanityContent.description}
              </p>
            </div>
          </div>

          <div className={styles.vanityCardsStage} data-story-vanity-cards-stage>
            <div className={styles.vanityCardsStageTrack}>
              <div className={styles.vanityCardLeft} data-story-vanity-card>
                <GlassScrollingCard
                  tone="onVideo"
                  title={considerCard.title}
                  items={considerCard.items}
                />
              </div>

              <div className={styles.vanityCardRight} data-story-vanity-card>
                <GlassScrollingCard
                  tone="onVideo"
                  title={intelligentCard.title}
                  items={intelligentCard.items}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.vanityPinEnd} data-story-media-pin-end aria-hidden />
    </div>
  );
}
