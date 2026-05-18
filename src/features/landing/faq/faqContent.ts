export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  entries: FaqEntry[];
};

export const faqSectionContent = {
  badge: "your questions",
  title: "Frequently asked",
  titleAccent: "questions",
  subtitle:
    "If you have any further questions, please use the chat box in the bottom right or contact us by email at hello@qoves.com",
} as const;

export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    title: "General Questions",
    entries: [
      {
        id: "what-is-qoves",
        question: "What is Qoves?",
        answer:
          "Qoves is the world's best platform to improve your looks and achieve a real facial transformation without surgery. We provide you, from the comfort of your home, with a personalized facial analysis and transformation plan based on over 2,000 academic studies.",
      },
      {
        id: "who-is-this-for",
        question: "Who is this for?",
        answer:
          "Qoves is for anyone who wants a clear, research-backed understanding of their facial aesthetics and a practical plan to improve appearance without surgery—whether you are starting your journey or refining an existing routine.",
      },
      {
        id: "what-will-i-receive",
        question: "What exactly will I receive?",
        answer:
          "You receive a personalized facial analysis, visual breakdowns of key features, prioritized recommendations, and a step-by-step transformation protocol tailored to your goals, timeline, and starting point.",
      },
      {
        id: "how-does-it-work",
        question: "How does it work?",
        answer:
          "Upload your photos, answer a short questionnaire, and our system analyzes your facial structure against research-backed metrics. You then get a detailed report and protocol you can follow from home.",
      },
      {
        id: "how-long-results",
        question: "How long will it take for me to receive my results?",
        answer:
          "Most members receive their initial analysis within minutes of completing upload. Complex cases or peak demand may take up to 24–48 hours; we notify you as soon as your report is ready.",
      },
      {
        id: "one-time-or-service",
        question: "Is this a one-time report or a continuous service?",
        answer:
          "Your membership includes ongoing access: initial analysis, protocol updates as you progress, and the ability to track changes over time—not a single static PDF.",
      },
      {
        id: "how-often-photos",
        question: "How often do I need to submit photos?",
        answer:
          "We recommend check-in photos every 4–6 weeks so we can measure progress and adjust your protocol. You can upload sooner if you want feedback after a major change.",
      },
      {
        id: "different-from-apps",
        question: "What makes Qoves different from beauty apps or filters?",
        answer:
          "Qoves is built on peer-reviewed research and precise facial measurement—not AR filters or generic tips. Recommendations are explainable, prioritized, and tied to what actually moves your results.",
      },
      {
        id: "results-without-surgery",
        question: "Can I really get results without surgery?",
        answer:
          "Yes. Many changes come from posture, grooming, skincare, body composition, and habit-based interventions that compound over time. We focus on realistic, non-surgical levers with the strongest evidence behind them.",
      },
    ],
  },
  {
    id: "about-analysis",
    title: "About the Analysis",
    entries: [
      {
        id: "analysis-accuracy",
        question: "How accurate is the facial analysis?",
        answer:
          "We map 100+ facial markers and compare them to large normative datasets and published research. The analysis is designed for consistency and clarity, not subjective scoring.",
      },
      {
        id: "analysis-photos",
        question: "What kind of photos do I need to upload?",
        answer:
          "Front-facing and profile images in even lighting, hair pulled back, neutral expression, and no filters. Our onboarding guide shows exact angles so you get the most reliable read.",
      },
      {
        id: "analysis-update",
        question: "Can my analysis change over time?",
        answer:
          "Yes. As you follow your protocol and submit new photos, we update your metrics and recommendations so your plan stays aligned with your current progress.",
      },
    ],
  },
  {
    id: "about-protocol",
    title: "About the Protocol",
    entries: [
      {
        id: "protocol-custom",
        question: "Is the protocol customized to me?",
        answer:
          "Every protocol is generated from your analysis, goals, and constraints—skin type, budget, time available, and whether you prefer minimal or comprehensive routines.",
      },
      {
        id: "protocol-evidence",
        question: "Are recommendations evidence-based?",
        answer:
          "Yes. Interventions are ranked by research quality, expected impact, and practicality. We cite the reasoning behind major recommendations in plain language.",
      },
      {
        id: "protocol-adjust",
        question: "Can I adjust or pause my protocol?",
        answer:
          "You can flag preferences, allergies, or limits in your profile, and your plan adapts. You may also pause and resume when life gets busy without losing your history.",
      },
    ],
  },
  {
    id: "experience-use",
    title: "Experience & Use",
    entries: [
      {
        id: "experience-devices",
        question: "Which devices can I use Qoves on?",
        answer:
          "Qoves works in modern browsers on desktop, tablet, and mobile. For photo upload, use the device with the best camera you have available.",
      },
      {
        id: "experience-dashboard",
        question: "Is there a dashboard to track progress?",
        answer:
          "Your member area shows your latest analysis, protocol steps, photo timeline, and notes so you can see what is working over weeks and months.",
      },
      {
        id: "experience-support-chat",
        question: "Can I ask questions about my plan?",
        answer:
          "Yes. Use the in-app chat or email our team—we can clarify steps, product choices, or how to interpret a specific metric in your report.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & Subscription",
    entries: [
      {
        id: "pricing-plans",
        question: "What plans are available?",
        answer:
          "We offer flexible membership tiers with monthly and annual billing. Visit our pricing page for current plans, features included, and any promotional offers.",
      },
      {
        id: "pricing-cancel",
        question: "Can I cancel anytime?",
        answer:
          "Yes. You can cancel renewal from your account settings. You retain access through the end of your current billing period.",
      },
      {
        id: "pricing-refund",
        question: "Do you offer refunds?",
        answer:
          "Refund eligibility depends on your plan and region. Contact support within the stated guarantee window if you believe Qoves is not right for you.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Data",
    entries: [
      {
        id: "privacy-storage",
        question: "How are my photos stored?",
        answer:
          "Uploads are encrypted in transit and at rest. Access is limited to automated processing and authorized staff only when needed for support.",
      },
      {
        id: "privacy-share",
        question: "Do you sell or share my data?",
        answer:
          "We do not sell your personal data. We only share what is necessary to operate the service (e.g. secure hosting) under strict agreements.",
      },
      {
        id: "privacy-delete",
        question: "Can I delete my account and photos?",
        answer:
          "Yes. You can request full deletion of your account and associated media from settings or by emailing support; deletion is completed within our published timeframe.",
      },
    ],
  },
  {
    id: "mindset",
    title: "Mindset & Philosophy",
    entries: [
      {
        id: "mindset-looksmaxing",
        question: "Is Qoves about “looksmaxing”?",
        answer:
          "We focus on informed self-improvement and health-aligned aesthetics—not extreme or unsafe practices. The goal is a sustainable, confident version of you.",
      },
      {
        id: "mindset-unrealistic",
        question: "Will you promise unrealistic transformations?",
        answer:
          "No. We emphasize honest timelines, measurable levers, and what is achievable without surgery. Your report distinguishes high-impact vs low-impact changes.",
      },
      {
        id: "mindset-wellbeing",
        question: "How does Qoves think about mental wellbeing?",
        answer:
          "Appearance is one input to confidence, not the whole picture. We encourage balanced goals and direct members to professional help if distress arises.",
      },
    ],
  },
  {
    id: "practical",
    title: "Practical Concerns",
    entries: [
      {
        id: "practical-age",
        question: "Is there a minimum age to use Qoves?",
        answer:
          "Members must meet the minimum age in their country of residence. Users under 18 require parental consent where required by law.",
      },
      {
        id: "practical-medical",
        question: "Is Qoves medical advice?",
        answer:
          "Qoves provides educational aesthetics guidance, not diagnosis or treatment. Consult a licensed professional for medical, dental, or dermatological concerns.",
      },
      {
        id: "practical-international",
        question: "Is Qoves available internationally?",
        answer:
          "Yes in most countries. Some features or products in your protocol may vary by region based on availability and local regulations.",
      },
    ],
  },
  {
    id: "support",
    title: "About Support",
    entries: [
      {
        id: "support-contact",
        question: "How do I contact support?",
        answer:
          "Use the chat widget in the bottom right of the app or email hello@qoves.com. We aim to respond within one business day.",
      },
      {
        id: "support-technical",
        question: "What if I have a technical issue uploading photos?",
        answer:
          "Try a different browser, disable extensions, and ensure files are under the size limit. If the issue persists, support can reset your upload session.",
      },
      {
        id: "support-billing",
        question: "Who do I contact for billing questions?",
        answer:
          "Email hello@qoves.com with the address on your account. Include your receipt or last four digits of your payment method for faster lookup.",
      },
    ],
  },
];
