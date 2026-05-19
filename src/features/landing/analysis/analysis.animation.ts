import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  addSectionHeaderReveal,
  addSectionItemsReveal,
  analysisSelectors,
  bindCardHoverLift,
  createMotionTimeline,
  getScrollTriggerConfig,
  killScopeScrollTriggers,
  mediaDesktop,
  mediaMobile,
  motion,
  sectionSelectors,
  shouldSimplifyMotion,
} from "@/lib/gsap";

/** Desktop portrait zoom while scrolling through the analysis section (Figma). */
const PORTRAIT_ZOOM_SCALE = 1.08;

function clearAnalysisMotionStyles(scope: HTMLElement) {
  const q = gsap.utils.selector(scope);
  const items = q(sectionSelectors.item);
  const layers = q(analysisSelectors.layer);
  const portrait = q(analysisSelectors.portrait);

  if (items.length) {
    gsap.set(items, { clearProps: "transform,opacity" });
  }

  // Layout uses CSS transform on this layer — only clear GSAP opacity.
  if (layers.length) {
    gsap.set(layers, { clearProps: "opacity" });
  }

  if (portrait.length) {
    gsap.set(portrait, { clearProps: "transform" });
  }
}

function bindAnalysisPortraitZoom(scope: HTMLElement, portrait: Element) {
  if (shouldSimplifyMotion()) {
    return () => undefined;
  }

  gsap.set(portrait, { transformOrigin: "center bottom" });

  const trigger = ScrollTrigger.create({
    trigger: scope,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    animation: gsap.fromTo(
      portrait,
      { scale: 1 },
      { scale: PORTRAIT_ZOOM_SCALE, ease: motion.ease.linear },
    ),
  });

  return () => {
    trigger.kill();
  };
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

  const layers = q(analysisSelectors.layer);
  const portrait = q(analysisSelectors.portrait)[0];

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
  const cleanupPortraitZoom =
    desktop && portrait ? bindAnalysisPortraitZoom(scope, portrait) : () => undefined;

  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    tl.kill();
    killScopeScrollTriggers(scope);
    cleanupHover();
    cleanupPortraitZoom();
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
