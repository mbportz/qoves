import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./Badge.module.scss";

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(styles.root, className)} {...props}>
      {children}
    </span>
  );
}
