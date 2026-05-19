import { prefersReducedMotion } from "./reducedMotion";

/** Same as `$breakpoint-sm` / `down(sm)` */
export const BREAKPOINT_SM_PX = 768;

export const mediaMobile = `(max-width: ${BREAKPOINT_SM_PX}px)`;
export const mediaDesktop = `(min-width: ${BREAKPOINT_SM_PX + 1}px)`;

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
