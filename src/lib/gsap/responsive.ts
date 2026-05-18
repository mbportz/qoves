import { prefersReducedMotion } from "./reducedMotion";

const MOBILE_MAX_WIDTH = 767.98;
const TABLET_MAX_WIDTH = 1023.98;

export function isMobileViewport() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;
}

export function isTabletViewport() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(`(max-width: ${TABLET_MAX_WIDTH}px)`).matches;
}

export function shouldSimplifyMotion() {
  return prefersReducedMotion() || isMobileViewport();
}
