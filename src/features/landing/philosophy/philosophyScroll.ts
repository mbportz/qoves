import { storySelectors } from "@/lib/gsap";

export function getPhilosophyContent(scope: HTMLElement) {
  return scope.querySelector<HTMLElement>(storySelectors.content);
}

export function getPhilosophyMedia(scope: HTMLElement) {
  return scope.querySelector<HTMLElement>(storySelectors.media);
}

export function getPhilosophyScrollLength(scope: HTMLElement) {
  const track = scope.querySelector<HTMLElement>(storySelectors.track);
  const media = getPhilosophyMedia(scope);

  if (!track || !media) {
    return window.innerHeight;
  }

  const mediaHeight = media.offsetHeight;
  const trackHeight = track.offsetHeight;

  return Math.max(trackHeight - mediaHeight, window.innerHeight * 0.85);
}
