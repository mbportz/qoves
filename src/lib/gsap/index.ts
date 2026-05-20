export { motion } from "./motion";
export type {
  MotionDuration,
  MotionEase,
  MotionOverlap,
  MotionStagger,
} from "./motion";
export { prefersReducedMotion } from "./reducedMotion";
export {
  BREAKPOINT_SM_PX,
  BREAKPOINT_XXS_PX,
  mediaDesktop,
  mediaMobile,
  mediaMobileOnly,
  mediaNarrow,
  isMobileViewport,
  isNarrowViewport,
  isTabletViewport,
  shouldSimplifyMotion,
} from "./responsive";
export { registerGsapPlugins } from "./register";
export { getRevealVars, reveal, type RevealPreset } from "./reveal";
export { getScrollTriggerConfig, killScopeScrollTriggers } from "./scroll";
export {
  addSectionHeaderReveal,
  addSectionItemsReveal,
  bindCardHoverLift,
} from "./sectionReveal";
export {
  accordionSelectors,
  analysisSelectors,
  heroSelectors,
  sectionSelectors,
  storySelectors,
} from "./selectors";
export {
  bindChartBarHover,
  bindGlowHover,
  bindParallaxLayers,
  closeAccordionPanel,
  openAccordionPanel,
} from "./interactions";
export { createMotionTimeline, overlapPosition } from "./timeline";
export type { SectionAnimationFactory, SectionAnimationResult } from "./types";
export { useSectionAnimation } from "./useSectionAnimation";
export { useMobileViewport } from "./useMobileViewport";
