"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { AccordionIcon } from "./AccordionIcon";
import styles from "./Accordion.module.scss";

type AccordionEntryProps = {
  question: ReactNode;
  answer?: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
};

export function AccordionEntry({
  question,
  answer,
  isOpen = true,
  onToggle,
  className,
}: AccordionEntryProps) {
  if (onToggle && !isOpen) {
    return (
      <button
        type="button"
        className={cn(styles.nestedRow, className)}
        onClick={onToggle}
        aria-expanded={false}
      >
        <p className={cn("body-2-medium", styles.nestedTitle)}>{question}</p>
        <AccordionIcon variant="plus" />
      </button>
    );
  }

  if (onToggle) {
    return (
      <button
        type="button"
        className={cn(styles.entry, styles.entryInteractive, className)}
        onClick={onToggle}
        aria-expanded
      >
        <div className={styles.entryBody}>
          <p className={cn("body-2-medium", styles.entryQuestion)}>{question}</p>
          {answer ? (
            <p className={cn("body-3-regular", styles.entryAnswer)}>{answer}</p>
          ) : null}
        </div>
        <AccordionIcon variant="uncollapse" />
      </button>
    );
  }

  return (
    <article className={cn(styles.entry, className)}>
      <div className={styles.entryBody}>
        <p className={cn("body-2-medium", styles.entryQuestion)}>{question}</p>
        {answer ? (
          <p className={cn("body-3-regular", styles.entryAnswer)}>{answer}</p>
        ) : null}
      </div>
      <AccordionIcon variant="uncollapse" />
    </article>
  );
}
