import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./Card.module.scss";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  padding?: "sm" | "md";
};

export function Card({
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div className={cn(styles.root, styles[padding], className)} {...props}>
      {children}
    </div>
  );
}
