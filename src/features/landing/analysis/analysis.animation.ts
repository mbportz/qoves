import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  addSectionHeaderReveal,
  addSectionItemsReveal,
  bindCardHoverLift,
  createMotionTimeline,
  getScrollTriggerConfig,
  killScopeScrollTriggers,
  mediaDesktop,
  mediaMobile,
  motion,
  sectionSelectors,
} from "@/lib/gsap";

function clearAnalysisMotionStyles(scope: HTMLElement) {
  const q = gsap.utils.selector(scope);
  const items = q(sectionSelectors.item);
  const layers = q("[data-analysis-layer]");

  if (items.length) {
    gsap.set(items, { clearProps: "transform,opacity" });
  }

  // Layout uses CSS transform on this layer — only clear GSAP opacity.
  if (layers.length) {
    gsap.set(layers, { clearProps: "opacity" });
  }

}

function setupAnalysisMotion(scope: HTMLElement, desktop: boolean) {
  const q = gsap.utils.selector(scope);

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

  addSectionItemsReveal(tl, q, {
    preset: desktop ? "fadeUpXl" : "fadeUpMd",
    stagger: "tight",
    overlap: "base",
  });

  const layers = q("[data-analysis-layer]");

  if (desktop && layers.length) {
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

  const cleanupHover = desktop ? bindCardHoverLift(layers) : () => undefined;

  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    tl.kill();
    killScopeScrollTriggers(scope);
    cleanupHover();
    clearAnalysisMotionStyles(scope);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };
}

export function createAnalysisAnimation(scope: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(mediaMobile, () => setupAnalysisMotion(scope, false));
  mm.add(mediaDesktop, () => setupAnalysisMotion(scope, true));

  return () => {
    mm.revert();
    clearAnalysisMotionStyles(scope);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };
}
