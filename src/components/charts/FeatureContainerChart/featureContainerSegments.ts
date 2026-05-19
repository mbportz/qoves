import { formatPercentDisplay } from "../HalfBlocksChart/halfBlocksScore";

export const FEATURE_CONTAINER_VIEWBOX = { width: 353, height: 166 } as const;

export const FEATURE_BAR = {
  xMin: 7.25,
  xMax: 345.75,
  y: 137.625,
  height: 3.375,
  leftRadiusX: 8.9375,
  rightInnerX: 344.062,
} as const;

export const FEATURE_DEFAULT_SPLITS = {
  split1: 120.083,
  split2: 232.917,
} as const;

const MIN_SEGMENT_WIDTH = 52;

const SVG_NS = "http://www.w3.org/2000/svg";

export type FeatureSegment = {
  path: SVGPathElement;
  label: SVGTextElement;
};

export type FeatureContainerChartParts = {
  segments: [FeatureSegment, FeatureSegment, FeatureSegment];
  defaultSplits: typeof FEATURE_DEFAULT_SPLITS;
};

function leftSegmentPath(split1: number) {
  const { xMin, y, height, leftRadiusX } = FEATURE_BAR;
  const bottom = y + height;

  return `M${xMin} 139.312C${xMin} 138.381 8.00552 ${y} ${leftRadiusX} ${y}H${split1}V${bottom}H${leftRadiusX}C8.00552 ${bottom} ${xMin} 140.244 ${xMin} 139.312Z`;
}

function middleSegmentPath(split1: number, split2: number) {
  const { y, height } = FEATURE_BAR;
  const bottom = y + height;

  return `M${split1} ${y}H${split2}V${bottom}H${split1}V${y}Z`;
}

function rightSegmentPath(split2: number) {
  const { y, height, rightInnerX, xMax } = FEATURE_BAR;
  const bottom = y + height;

  return `M${split2} ${y}H${rightInnerX}C344.994 ${y} ${xMax} 138.381 ${xMax} 139.312C${xMax} 140.244 344.994 ${bottom} ${rightInnerX} ${bottom}H${split2}V${y}Z`;
}

function hidePaths(paths: SVGElement[]) {
  paths.forEach((path) => {
    path.setAttribute("visibility", "hidden");
  });
}

function createSegmentLabel(
  parent: SVGGElement,
  x: number,
  y: number,
  className: string,
) {
  const text = document.createElementNS(SVG_NS, "text");

  text.classList.add(className);
  text.setAttribute("x", String(x));
  text.setAttribute("y", String(y));
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("dominant-baseline", "alphabetic");
  text.setAttribute("fill", "#FFFFFF");
  text.setAttribute("font-size", "5.5");
  text.setAttribute("font-family", "var(--font-sans, 'PP Neue Montreal', sans-serif)");
  text.setAttribute("font-weight", "400");
  parent.appendChild(text);

  return text;
}

function getSegmentPercents(split1: number, split2: number) {
  const total = FEATURE_BAR.xMax - FEATURE_BAR.xMin;
  const widths = [
    split1 - FEATURE_BAR.xMin,
    split2 - split1,
    FEATURE_BAR.xMax - split2,
  ];

  return widths.map((width) => formatPercentDisplay((width / total) * 100));
}

export function randomFeatureSplits() {
  const { xMin, xMax } = FEATURE_BAR;
  const innerSpan = xMax - xMin - MIN_SEGMENT_WIDTH * 3;
  const firstOffset = MIN_SEGMENT_WIDTH + Math.random() * innerSpan * 0.55;
  const split1 = xMin + firstOffset;
  const secondOffset =
    MIN_SEGMENT_WIDTH + Math.random() * (xMax - split1 - MIN_SEGMENT_WIDTH * 2);
  const split2 = split1 + secondOffset;

  return { split1, split2 };
}

export function applyFeatureSplits(
  parts: FeatureContainerChartParts,
  split1: number,
  split2: number,
) {
  const [left, middle, right] = parts.segments;
  const percents = getSegmentPercents(split1, split2);
  const labelY = FEATURE_BAR.y + FEATURE_BAR.height + 12;

  left.path.setAttribute("d", leftSegmentPath(split1));
  middle.path.setAttribute("d", middleSegmentPath(split1, split2));
  right.path.setAttribute("d", rightSegmentPath(split2));

  left.label.setAttribute("x", String((FEATURE_BAR.xMin + split1) / 2));
  left.label.setAttribute("y", String(labelY));
  left.label.textContent = percents[0];

  middle.label.setAttribute("x", String((split1 + split2) / 2));
  middle.label.setAttribute("y", String(labelY));
  middle.label.textContent = percents[1];

  right.label.setAttribute("x", String((split2 + FEATURE_BAR.xMax) / 2));
  right.label.setAttribute("y", String(labelY));
  right.label.textContent = percents[2];
}

export function resetFeatureSplits(parts: FeatureContainerChartParts) {
  applyFeatureSplits(parts, parts.defaultSplits.split1, parts.defaultSplits.split2);
}

export function collectFeatureContainerChart(
  host: HTMLElement,
): FeatureContainerChartParts | null {
  const contentRoot =
    host.querySelector<SVGGElement>("g[data-figma-bg-blur-radius]") ??
    host.querySelector("svg > g");
  const clipRoot = contentRoot?.querySelector<SVGGElement>(
    'g[clip-path*="clip1"]',
  );

  if (!contentRoot || !clipRoot) {
    return null;
  }

  const leftPath = clipRoot.querySelector<SVGPathElement>('path[fill="#5D767E"]');
  const middlePath = clipRoot.querySelector<SVGPathElement>('path[fill="#9AAEB5"]');
  const rightPath = clipRoot.querySelector<SVGPathElement>('path[fill="#CDDBE1"]');

  if (!leftPath || !middlePath || !rightPath) {
    return null;
  }

  const labelPaths = [...clipRoot.querySelectorAll<SVGPathElement>(
    'path[fill="white"]',
  )]
    .filter((path) => {
      const bbox = path.getBBox();

      return bbox.y >= 145 && bbox.y <= 156;
    })
    .sort((a, b) => a.getBBox().x - b.getBBox().x);

  if (labelPaths.length < 3) {
    return null;
  }

  hidePaths(labelPaths);

  const labelY =
    (labelPaths[0]?.getBBox().y ?? 148) + (labelPaths[0]?.getBBox().height ?? 5);

  const segments: [FeatureSegment, FeatureSegment, FeatureSegment] = [
    {
      path: leftPath,
      label: createSegmentLabel(
        clipRoot,
        (FEATURE_BAR.xMin + FEATURE_DEFAULT_SPLITS.split1) / 2,
        labelY,
        "feature-segment-label",
      ),
    },
    {
      path: middlePath,
      label: createSegmentLabel(
        clipRoot,
        (FEATURE_DEFAULT_SPLITS.split1 + FEATURE_DEFAULT_SPLITS.split2) / 2,
        labelY,
        "feature-segment-label",
      ),
    },
    {
      path: rightPath,
      label: createSegmentLabel(
        clipRoot,
        (FEATURE_DEFAULT_SPLITS.split2 + FEATURE_BAR.xMax) / 2,
        labelY,
        "feature-segment-label",
      ),
    },
  ];

  const parts: FeatureContainerChartParts = {
    segments,
    defaultSplits: FEATURE_DEFAULT_SPLITS,
  };

  resetFeatureSplits(parts);

  return parts;
}
