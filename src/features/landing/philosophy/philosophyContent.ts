import type { StaticImageData } from "next/image";
import culturalBeautyStandardsImage from "@/assets/Cultural_Beauty_Standards.svg";
import geneticFactorsImage from "@/assets/Genetic_Factors.svg";
import lifestyleFactorsImage from "@/assets/Lifestyle_Factors.svg";

export type PhilosophyCard = {
  id: string;
  title: string;
  subtitle: string;
  image?: {
    src: StaticImageData;
    alt: string;
  };
};

export const philosophySectionContent = {
  badge: "YOUR QUESTIONS",
  badgeMobile: "BACKED BY 2000+ RESEARCH PAPERS",
  title: "Will analyzing my face Make me insecure?",
  description:
    "Most insecurity comes from uncertainty—not knowing if your concerns are real or imagined. When you're guessing about your appearance, your mind often makes things seem worse than they are.",
  descriptionMobile:
    "Get your personalized facial analysis and transformation plan based on 2000+ academic studies.",
  mobileActionLabel: "Start your glow-up",
} as const;

export const philosophyCards: PhilosophyCard[] = [
  {
    id: "lifestyle",
    title: "Lifestyle factors",
    subtitle: "Considers diet, climate, stress, sleep, and habits.",
    image: {
      src: lifestyleFactorsImage,
      alt: "Lifestyle factors illustration",
    },
  },
  {
    id: "cultural",
    title: "Cultural beauty standards",
    subtitle: "Adapts to regional and societal ideals.",
    image: {
      src: culturalBeautyStandardsImage,
      alt: "Cultural beauty standards illustration",
    },
  },
  {
    id: "genetic",
    title: "Genetic factors",
    subtitle:
      "Takes into account genetic factors and how they might impact your facial aesthetics.",
    image: {
      src: geneticFactorsImage,
      alt: "Genetic factors illustration",
    },
  },
] as const;

export const philosophyVanityContent = {
  title: "Is it vain to care",
  titleAccent: "about your appearance?",
  description:
    "Many feel guilty about wanting to improve their looks, fearing it means they're shallow or insecure. But here's what research tells us : caring about appearance is natural. Like health, finances, and education, it's just another form of self-improvement.",
  considerCard: {
    title: "Consider this...",
    items: [
      "First impressions matter",
      "It has a considerable impact on interpersonal interactions",
      "Small improvements can drastically impact quality of life",
    ],
  },
  intelligentCard: {
    title: "The key is approaching it intelligently",
    items: [
      "Not chasing unrealistic standards",
      "Not trying to look like someone else",
      "Not seeking perfection",
      "Aiming only for a better version of yourself",
    ],
  },
} as const;
