import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./Button.module.scss";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(styles.root, styles[variant], styles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
