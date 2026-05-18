import gsap from "gsap";
import {
  addSectionHeaderReveal,
  addSectionItemsReveal,
  bindCardHoverLift,
  bindParallaxLayers,
  createMotionTimeline,
  getScrollTriggerConfig,
  isMobileViewport,
  killScopeScrollTriggers,
  motion,
} from "@/lib/gsap";

export function createAnalysisAnimation(scope: HTMLElement) {
  const q = gsap.utils.selector(scope);
  const mobile = isMobileViewport();

  const tl = createMotionTimeline({
    scrollTrigger: getScrollTriggerConfig(scope, "reveal"),
  });

  addSectionHeaderReveal(tl, q, {
    badgePreset: "fadeUpSm",
    titlePreset: "fadeUpLg",
    subtitlePreset: "fadeUpMd",
    titleOverlap: "tight",
    subtitleOverlap: "loose",
  });

  const layers = q("[data-analysis-layer]");

  addSectionItemsReveal(tl, q, {
    preset: mobile ? "fadeUpMd" : "fadeUpXl",
    stagger: "tight",
    overlap: "base",
  });

  if (!mobile && layers.length) {
    tl.from(
      layers,
      {
        scale: 0.96,
        transformOrigin: "center center",
        duration: motion.duration.base,
        ease: motion.ease.smooth,
      },
      "<",
    );
  }

  const cleanupHover = bindCardHoverLift(layers);
  const cleanupParallax = bindParallaxLayers(
    scope,
    layers,
    mobile ? [0.2] : [0.35],
  );

  return () => {
    tl.kill();
    killScopeScrollTriggers(scope);
    cleanupHover();
    cleanupParallax();
  };
}
