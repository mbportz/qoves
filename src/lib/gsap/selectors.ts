export const sectionSelectors = {
  label: "[data-section-label]",
  badge: "[data-section-badge]",
  title: "[data-section-title]",
  subtitle: "[data-section-subtitle]",
  content: "[data-section-content]",
  item: "[data-section-item]",
} as const;

export const heroSelectors = {
  compare: "[data-hero-compare]",
  compareCard: "[data-hero-compare-card]",
  compareLinks: "[data-hero-compare-links]",
  step: "[data-hero-step]",
} as const;

export const analysisSelectors = {
  dashboard: "[data-analysis-dashboard]",
  layer: "[data-analysis-layer]",
  portrait: "[data-analysis-portrait]",
} as const;

export const storySelectors = {
  track: "[data-story-track]",
  media: "[data-story-media]",
  mediaPinZone: "[data-story-media-pin-zone]",
  content: "[data-story-content]",
  video: "[data-story-video]",
  filter: "[data-story-filter]",
  copy: "[data-story-copy]",
  mobileAction: "[data-story-mobile-action]",
  card: "[data-story-card]",
  cardsRow: "[data-story-cards-row]",
  vanityBlock: "[data-story-stage-vanity]",
  mediaPinEnd: "[data-story-media-pin-end]",
  vanityCardsStage: "[data-story-vanity-cards-stage]",
  vanityHeroPin: "[data-story-vanity-hero-pin]",
  vanityHero: "[data-story-vanity-hero]",
  vanityCard: "[data-story-vanity-card]",
} as const;

export const accordionSelectors = {
  panel: "[data-accordion-panel]",
  icon: "[data-accordion-icon]",
} as const;
