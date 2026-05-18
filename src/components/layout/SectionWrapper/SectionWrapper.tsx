"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Container } from "@/components/ui/Container/Container";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { cn } from "@/lib/utils/cn";
import styles from "./SectionWrapper.module.scss";

type SectionWrapperProps = ComponentPropsWithoutRef<"section"> & {
  id: string;
  badge?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "start" | "center";
  children: ReactNode;
};

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  function SectionWrapper(
    {
      id,
      badge,
      title,
      subtitle,
      align = "start",
      className,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(styles.root, className)}
        data-section={id}
        {...props}
      >
        <Container>
          <SectionLabel
            badge={badge}
            title={title}
            subtitle={subtitle}
            align={align}
          />
          <div className={styles.content} data-section-content>
            {children}
          </div>
        </Container>
      </section>
    );
  },
);
