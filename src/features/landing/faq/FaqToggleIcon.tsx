import { cn } from "@/lib/utils/cn";
import styles from "./FaqToggleIcon.module.scss";

type FaqToggleIconProps = {
  variant: "category" | "entry";
  className?: string;
};

export function FaqToggleIcon({ variant, className }: FaqToggleIconProps) {
  return (
    <span
      className={cn(styles.root, className)}
      data-faq-icon={variant}
      aria-hidden
    >
      <svg
        className={styles.svg}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          className={styles.barH}
          d="M3.33331 7.99967H12.6666"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={styles.barV}
          d="M7.99998 3.33301V12.6663"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
