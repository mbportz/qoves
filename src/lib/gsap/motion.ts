export const motion = {
  duration: {
    fast: 0.4,
    base: 0.8,
    slow: 1.2,
  },
  ease: {
    smooth: "power3.out",
    soft: "power2.out",
    linear: "none",
  },
  stagger: {
    tight: 0.08,
    base: 0.12,
    relaxed: 0.16,
  },
  offset: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  overlap: {
    tight: 0.2,
    base: 0.3,
    loose: 0.5,
    relaxed: 0.75,
  },
  scroll: {
    reveal: {
      start: "top 80%",
      once: true,
    },
    revealLate: {
      start: "top 85%",
      once: true,
    },
    pin: {
      start: "top top",
      end: "+=120%",
      scrub: true,
      anticipatePin: 1,
    },
    revealMobile: {
      start: "top 85%",
      once: true,
    },
  },
  hover: {
    lift: -4,
  },
} as const;

export type MotionDuration = keyof typeof motion.duration;
export type MotionEase = keyof typeof motion.ease;
export type MotionStagger = keyof typeof motion.stagger;
export type MotionOverlap = keyof typeof motion.overlap;
