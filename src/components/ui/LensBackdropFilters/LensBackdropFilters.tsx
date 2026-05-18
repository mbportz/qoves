import styles from "./LensBackdropFilters.module.scss";

const lensBulgeMap = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">
    <radialGradient id="lens" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgb(128,128,128)" />
      <stop offset="78%" stop-color="rgb(128,128,128)" />
      <stop offset="100%" stop-color="rgb(104,104,104)" />
    </radialGradient>
    <rect width="256" height="256" fill="url(#lens)" />
  </svg>`,
);

export function LensBackdropFilters() {
  return (
    <svg className={styles.root} aria-hidden focusable="false">
      <defs>
        <filter
          id="scrolling-card-lens"
          colorInterpolationFilters="sRGB"
          x="-12%"
          y="-12%"
          width="124%"
          height="124%"
        >
          <feImage
            href={`data:image/svg+xml,${lensBulgeMap}`}
            result="lensBulgeMap"
            preserveAspectRatio="none"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="lensBulgeMap"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
