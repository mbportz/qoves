"use client";

import type { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import chevronIcon from "@/assets/Chevron.svg";
import { cn } from "@/lib/utils/cn";
import styles from "./GlassActionButton.module.scss";

type GlassActionButtonProps = {
  label: string;
  iconButtonLabel?: string;
  className?: string;
  animated?: boolean;
  onAction?: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick">;

export function GlassActionButton({
  label,
  iconButtonLabel,
  className,
  animated = true,
  onAction,
  type = "button",
  ...props
}: GlassActionButtonProps) {
  const ariaLabel = iconButtonLabel ? `${label}. ${iconButtonLabel}` : label;

  return (
    <button
      type={type}
      className={cn(styles.root, className)}
      data-animated={animated ? "" : undefined}
      aria-label={ariaLabel}
      onClick={onAction}
      {...props}
    >
      <span className={cn("body-2-medium", styles.label)}>{label}</span>
      <span className={styles.iconButton} aria-hidden>
        <Image src={chevronIcon} alt="" width={20} height={20} />
      </span>
    </button>
  );
}
