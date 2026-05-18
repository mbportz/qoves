import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./HoverCard.module.scss";

type HoverCardProps = HTMLAttributes<HTMLDivElement> & {
  step?: ReactNode;
  title: ReactNode;
  isActive?: boolean;
};

export function HoverCard({
  step,
  title,
  isActive = false,
  className,
  children,
  ...props
}: HoverCardProps) {
  return (
    <div
      className={cn(styles.root, isActive && styles.isActive, className)}
      tabIndex={0}
      {...props}
    >
      {step ? <span className={styles.step}>{step}</span> : null}
      <div className={styles.content}>
        <h3 className={cn("heading-8-book", styles.title)}>{title}</h3>
        {children}
      </div>
    </div>
  );
}
