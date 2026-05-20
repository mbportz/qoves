import { prefersReducedMotion } from "./reducedMotion";

/** Same as `$breakpoint-xxs` / `down(xxs)` */
export const BREAKPOINT_XXS_PX = 375;

/** Same as `$breakpoint-sm` / `down(sm)` */
export const BREAKPOINT_SM_PX = 768;

export const mediaNarrow = `(max-width: ${BREAKPOINT_XXS_PX}px)`;
export const mediaMobileOnly = `(min-width: ${BREAKPOINT_XXS_PX + 1}px) and (max-width: ${BREAKPOINT_SM_PX}px)`;
export const mediaMobile = `(max-width: ${BREAKPOINT_SM_PX}px)`;
export const mediaDesktop = `(min-width: ${BREAKPOINT_SM_PX + 1}px)`;

export function isNarrowViewport() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(mediaNarrow).matches;
}

export function isMobileViewport() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(mediaMobile).matches;
}

export function isTabletViewport() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(max-width: 1023px)").matches;
}

export function shouldSimplifyMotion() {
  return prefersReducedMotion() || isMobileViewport();
}
