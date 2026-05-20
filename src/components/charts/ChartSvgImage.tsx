"use client";

import type { CSSProperties } from "react";

type ChartSvgImageProps = {
  dataUri: string;
  width: number;
  height: number;
  className?: string;
};

export function ChartSvgImage({
  dataUri,
  width,
  height,
  className,
}: ChartSvgImageProps) {
  const style: CSSProperties = {
    display: "block",
    width: "100%",
    height: "auto",
    maxWidth: "100%",
  };

  return (
    <img
      src={dataUri}
      alt=""
      className={className}
      width={width}
      height={height}
      decoding="async"
      draggable={false}
      style={style}
    />
  );
}
