"use client";

import Image, { type StaticImageData } from "next/image";
import collapseIcon from "@/assets/icons/collapse.svg";
import closeIcon from "@/assets/icons/close.svg";
import plusIcon from "@/assets/icons/plus.svg";
import uncollapseIcon from "@/assets/icons/uncollapse.svg";
import styles from "./Accordion.module.scss";

const ICONS = {
  plus: plusIcon,
  close: closeIcon,
  collapse: collapseIcon,
  uncollapse: uncollapseIcon,
} as const satisfies Record<string, StaticImageData>;

type AccordionIconVariant = keyof typeof ICONS;

type AccordionIconProps = {
  variant: AccordionIconVariant;
};

export function AccordionIcon({ variant }: AccordionIconProps) {
  return (
    <span className={styles.icon} data-accordion-icon aria-hidden>
      <Image src={ICONS[variant]} alt="" width={16} height={16} />
    </span>
  );
}
