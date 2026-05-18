import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, shouldSimplifyMotion, storySelectors } from "@/lib/gsap";

function playStoryVideo(scope: HTMLElement) {
  const video = scope.querySelector<HTMLVideoElement>("[data-story-video] video");
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;

  if (video.paused) {
    void video.play().catch(() => {});
  }
}

function scheduleScrollRefresh() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

const vanityHeroEnterOffset = 100;
const vanityHeroEnterEase = "back.out(1.15)";

function bindStoryVideoParallax(
  media: Element,
  pinEnd: Element,
  video: HTMLVideoElement,
  triggers: ScrollTrigger[],
) {
  gsap.set(video, { transformOrigin: "center center" });

  triggers.push(
    ScrollTrigger.create({
      trigger: media,
      start: "top top",
      endTrigger: pinEnd,
      end: "bottom top",
      scrub: true,
      animation: gsap.fromTo(
        video,
        { scale: 1.06 },
        { scale: 1, ease: motion.ease.linear },
      ),
    }),
  );
}

function revealOnEnter(
  elements: gsap.TweenTarget,
  trigger: Element,
  triggers: ScrollTrigger[],
  start = "top 85%",
  useAutoAlpha = false,
) {
  triggers.push(
    ScrollTrigger.create({
      trigger,
      start,
      once: true,
      onEnter: () => {
        gsap.to(elements, {
          ...(useAutoAlpha ? { autoAlpha: 1 } : { opacity: 1 }),
          y: 0,
          ease: motion.ease.soft,
          duration: motion.duration.fast,
          stagger: motion.stagger.base,
          overwrite: "auto",
        });
      },
    }),
  );
}

const vanityHeroRevealStart = "30% 80%";

function bindVanityHeroReveal(
  vanityBlock: Element,
  vanityHero: HTMLElement,
  triggers: ScrollTrigger[],
) {
  let hasPlayedEnter = false;

  triggers.push(
    ScrollTrigger.create({
      trigger: vanityBlock,
      start: vanityHeroRevealStart,
      onEnter: () => {
        gsap.killTweensOf(vanityHero);

        if (hasPlayedEnter) {
          gsap.set(vanityHero, { autoAlpha: 1, y: 0 });
          return;
        }

        hasPlayedEnter = true;
        gsap.to(vanityHero, {
          autoAlpha: 1,
          y: 0,
          duration: motion.duration.base,
          ease: vanityHeroEnterEase,
          overwrite: "auto",
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf(vanityHero);
        gsap.to(vanityHero, {
          autoAlpha: 0,
          y: -vanityHeroEnterOffset,
          duration: motion.duration.base,
          ease: motion.ease.soft,
          overwrite: "auto",
        });
      },
      onEnterBack: () => {
        gsap.killTweensOf(vanityHero);
        gsap.set(vanityHero, { autoAlpha: 1, y: 0 });
      },
    }),
  );
}

const vanityExitFadeStart = "40% top";
const vanityExitFadeEnd = "bottom bottom";

function bindVanityExitFade(
  vanityBlock: Element,
  targets: Element[],
  triggers: ScrollTrigger[],
) {
  if (!targets.length) return;

  const fadeTween = gsap.fromTo(
    targets,
    { autoAlpha: 1 },
    {
      autoAlpha: 0,
      ease: "none",
      scrollTrigger: {
        trigger: vanityBlock,
        start: vanityExitFadeStart,
        end: vanityExitFadeEnd,
        scrub: 1.25,
        invalidateOnRefresh: true,
      },
    },
  );

  if (fadeTween.scrollTrigger) {
    triggers.push(fadeTween.scrollTrigger);
  }
}

export function createVideoStorytellingAnimation(scope: HTMLElement) {
  const q = gsap.utils.selector(scope);
  const copy = q(storySelectors.copy)[0];
  const cards = q(storySelectors.card);
  const cardsRow = q(storySelectors.cardsRow)[0];
  const vanityBlock = q(storySelectors.vanityBlock)[0];
  const vanityHero = q(storySelectors.vanityHero)[0];
  const vanityHeroPin = q(storySelectors.vanityHeroPin)[0];
  const vanityCards = q(storySelectors.vanityCard);
  const vanityCardsStage = q(storySelectors.vanityCardsStage)[0];
  const storyVideo = scope.querySelector<HTMLVideoElement>("[data-story-video] video");

  gsap.set([copy, cards], { opacity: 0, y: 32 });
  gsap.set(vanityCards, { autoAlpha: 0, y: 32 });
  if (vanityHero) {
    gsap.set(vanityHero, { autoAlpha: 0, y: -vanityHeroEnterOffset });
  }

  const scrollTriggers: ScrollTrigger[] = [];

  const playTrigger = ScrollTrigger.create({
    trigger: scope,
    start: "top 85%",
    onEnter: () => playStoryVideo(scope),
    onEnterBack: () => playStoryVideo(scope),
  });
  scrollTriggers.push(playTrigger);

  if (copy) {
    revealOnEnter(copy, scope, scrollTriggers, "top 80%");
  }

  if (cards.length && cardsRow) {
    revealOnEnter(cards, cardsRow, scrollTriggers);
  }

  if (vanityHero && vanityBlock) {
    bindVanityHeroReveal(vanityBlock, vanityHero, scrollTriggers);
  }

  if (vanityCards.length && vanityCardsStage) {
    revealOnEnter(vanityCards, vanityCardsStage, scrollTriggers, "top 85%", true);
  } else if (vanityCards.length && vanityBlock) {
    revealOnEnter(vanityCards, vanityBlock, scrollTriggers, "top 70%", true);
  }

  if (vanityBlock) {
    const vanityFadeTargets = [vanityHeroPin, ...vanityCards].filter(
      (el): el is HTMLElement => Boolean(el),
    );

    if (!shouldSimplifyMotion()) {
      bindVanityExitFade(vanityBlock, vanityFadeTargets, scrollTriggers);
    }
  }

  const mediaPinEnd = q(storySelectors.mediaPinEnd)[0];

  const mediaPinZone = q(storySelectors.mediaPinZone)[0];

  if (
    !shouldSimplifyMotion() &&
    vanityBlock &&
    storyVideo &&
    window.matchMedia("(min-width: 768px)").matches
  ) {
    const pinEnd = mediaPinEnd ?? vanityBlock;
    const parallaxTrigger = mediaPinZone ?? q(storySelectors.media)[0];

    if (parallaxTrigger) {
      bindStoryVideoParallax(parallaxTrigger, pinEnd, storyVideo, scrollTriggers);
    }
  }

  let resizeTimer = 0;
  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(scheduleScrollRefresh, 150);
  };

  window.addEventListener("resize", onResize);
  scheduleScrollRefresh();
  const refreshTimer = window.setTimeout(scheduleScrollRefresh, 500);

  const onVideoReady = () => scheduleScrollRefresh();
  storyVideo?.addEventListener("loadedmetadata", onVideoReady);

  return () => {
    window.clearTimeout(resizeTimer);
    window.clearTimeout(refreshTimer);
    window.removeEventListener("resize", onResize);
    storyVideo?.removeEventListener("loadedmetadata", onVideoReady);
    scrollTriggers.forEach((trigger) => trigger.kill());
  };
}
