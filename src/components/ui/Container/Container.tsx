import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils/cn";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

export function Container({
  as,
  className,
  children,
  ...props
}: ContainerProps) {
  const Component = as ?? "div";

  return (
    <Component className={cn("container", className)} {...props}>
      {children}
    </Component>
  );
}
