export const HALF_BLOCKS_VIEWBOX = { width: 285, height: 127 } as const;

export const HALF_BLOCKS_BAR = {
  xMin: 7.25,
  xMax: 277.75,
  y: 113,
  height: 6.75,
} as const;

export const HALF_BLOCKS_PILL = {
  defaultX: 120.875,
  y: 91.25,
  width: 32.887,
  height: 8,
} as const;

export const HALF_BLOCKS_INDICATOR_X = 161.5;

const SVG_NS = "http://www.w3.org/2000/svg";

export type HalfBlocksChartLabels = {
  mainScore: SVGTextElement;
  pillScore: SVGTextElement;
  percentile: SVGTextElement;
};

export type HalfBlocksChartParts = {
  pill: {
    group: SVGGElement;
    defaultX: number;
    width: number;
  };
  indicator: SVGPathElement;
  highlight: SVGRectElement;
  labels: HalfBlocksChartLabels;
};

function belongsToPill(
  element: SVGElement,
  pillX: number,
  pillY: number,
  pillWidth: number,
  pillHeight: number,
) {
  if (!(element instanceof SVGGraphicsElement)) {
    return false;
  }

  const bbox = element.getBBox();

  return (
    bbox.x >= pillX - 1 &&
    bbox.x + bbox.width <= pillX + pillWidth + 40 &&
    bbox.y >= pillY - 1 &&
    bbox.y + bbox.height <= pillY + pillHeight + 2
  );
}

export function getPillCenterX(pillX: number, pillWidth: number) {
  return pillX + pillWidth / 2;
}

export function getHighlightWidth(pillX: number, pillWidth: number) {
  return Math.max(getPillCenterX(pillX, pillWidth) - HALF_BLOCKS_BAR.xMin, 0);
}

export function getBarPercent(pillX: number, pillWidth: number) {
  const centerX = getPillCenterX(pillX, pillWidth);
  const span = HALF_BLOCKS_BAR.xMax - HALF_BLOCKS_BAR.xMin;

  return Math.min(100, Math.max(0, ((centerX - HALF_BLOCKS_BAR.xMin) / span) * 100));
}

export function formatPercentDisplay(percent: number) {
  const value = Math.min(100, Math.max(1, Math.round(percent)));

  return `${value}%`;
}

function hidePaths(paths: SVGElement[]) {
  paths.forEach((path) => {
    path.setAttribute("visibility", "hidden");
  });
}

function createLabelText(
  parent: SVGGElement,
  className: string,
  {
    x,
    y,
    anchor,
    size,
    fill,
    opacity,
  }: {
    x: number;
    y: number;
    anchor: "start" | "middle" | "end";
    size: number;
    fill: string;
    opacity?: number;
  },
) {
  const text = document.createElementNS(SVG_NS, "text");

  text.classList.add(className);
  text.setAttribute("x", String(x));
  text.setAttribute("y", String(y));
  text.setAttribute("text-anchor", anchor);
  text.setAttribute("dominant-baseline", "alphabetic");
  text.setAttribute("fill", fill);
  text.setAttribute("font-size", String(size));
  text.setAttribute("font-family", "var(--font-sans, 'PP Neue Montreal', sans-serif)");
  text.setAttribute("font-weight", "400");

  if (opacity !== undefined) {
    text.setAttribute("fill-opacity", String(opacity));
  }

  parent.appendChild(text);

  return text;
}

function findOutlinedLabelPaths(
  root: SVGGElement,
  matches: (bbox: DOMRect) => boolean,
) {
  return [...root.querySelectorAll<SVGPathElement>("path")].filter((path) => {
    if (path.closest(".half-blocks-pill")) {
      return false;
    }

    if (path.closest('g[clip-path*="clip1"]')) {
      return false;
    }

    if (!(path instanceof SVGGraphicsElement)) {
      return false;
    }

    return matches(path.getBBox());
  });
}

function setupLabels(
  contentRoot: SVGGElement,
  pillGroup: SVGGElement,
  pillX: number,
  pillWidth: number,
  pillHeight: number,
) {
  const mainPaths = findOutlinedLabelPaths(
    contentRoot,
    (bbox) => bbox.y >= 24 && bbox.y <= 52 && bbox.x < 70 && bbox.height > 12,
  );
  const percentilePaths = findOutlinedLabelPaths(
    contentRoot,
    (bbox) => bbox.y >= 93 && bbox.y <= 100 && bbox.x >= 235,
  );
  const pillPaths = [...pillGroup.querySelectorAll<SVGPathElement>("path")];

  hidePaths(mainPaths);
  hidePaths(percentilePaths);
  hidePaths(pillPaths);

  const mainBox = mainPaths[0]?.getBBox();
  const percentileBox = percentilePaths[0]?.getBBox();
  const pillCenterX = getPillCenterX(pillX, pillWidth);

  const mainScore = createLabelText(contentRoot, "half-blocks-main-score", {
    x: mainBox?.x ?? 14,
    y: (mainBox?.y ?? 27) + (mainBox?.height ?? 19),
    anchor: "start",
    size: mainBox?.height ?? 19,
    fill: "#FFFFFF",
  });
  const percentile = createLabelText(contentRoot, "half-blocks-percentile", {
    x: (percentileBox?.x ?? 240) + (percentileBox?.width ?? 35),
    y: (percentileBox?.y ?? 94) + (percentileBox?.height ?? 4),
    anchor: "end",
    size: percentileBox?.height ?? 4.5,
    fill: "#FFFFFF",
  });
  const pillScore = createLabelText(pillGroup, "half-blocks-pill-score", {
    x: pillCenterX,
    y: HALF_BLOCKS_PILL.y + pillHeight - 1.5,
    anchor: "middle",
    size: 5.5,
    fill: "#FFFFFF",
  });

  return { mainScore, pillScore, percentile };
}

export function applyHalfBlocksLabels(
  labels: HalfBlocksChartLabels,
  pillX: number,
  pillWidth: number,
) {
  const label = formatPercentDisplay(getBarPercent(pillX, pillWidth));

  labels.mainScore.textContent = label;
  labels.pillScore.textContent = label;
  labels.percentile.textContent = label;
}

export function randomPillX(pillWidth: number) {
  const travel = HALF_BLOCKS_BAR.xMax - HALF_BLOCKS_BAR.xMin - pillWidth;

  return HALF_BLOCKS_BAR.xMin + Math.random() * travel;
}

export function collectHalfBlocksChart(host: HTMLElement): HalfBlocksChartParts | null {
  const contentRoot =
    host.querySelector<SVGGElement>("g[data-figma-bg-blur-radius]") ??
    host.querySelector("svg > g");

  if (!contentRoot) {
    return null;
  }

  const pillRect = contentRoot.querySelector<SVGRectElement>(
    `rect[x="${HALF_BLOCKS_PILL.defaultX}"]`,
  );
  const indicator = [...contentRoot.querySelectorAll<SVGPathElement>(
    'path[fill="#CDDBE1"]',
  )].find((path) => !path.closest('g[clip-path*="clip1"]'));
  const barGroup = contentRoot.querySelector<SVGGElement>(
    'g[clip-path*="clip1"]',
  );

  if (!pillRect || !indicator || !barGroup) {
    return null;
  }

  const pillX = HALF_BLOCKS_PILL.defaultX;
  const pillY = HALF_BLOCKS_PILL.y;
  const pillWidth = HALF_BLOCKS_PILL.width;
  const pillHeight = HALF_BLOCKS_PILL.height;
  const pillGroup = document.createElementNS(SVG_NS, "g");

  pillGroup.classList.add("half-blocks-pill");

  const pillElements = [...contentRoot.querySelectorAll<SVGElement>("rect, path")].filter(
    (element) => belongsToPill(element, pillX, pillY, pillWidth, pillHeight),
  );

  if (pillElements.length === 0) {
    return null;
  }

  contentRoot.appendChild(pillGroup);

  pillElements.forEach((element) => {
    pillGroup.appendChild(element);
  });

  const labels = setupLabels(contentRoot, pillGroup, pillX, pillWidth, pillHeight);

  const highlight = document.createElementNS(SVG_NS, "rect");

  highlight.classList.add("half-blocks-highlight");
  highlight.setAttribute("x", String(HALF_BLOCKS_BAR.xMin));
  highlight.setAttribute("y", String(HALF_BLOCKS_BAR.y));
  highlight.setAttribute("height", String(HALF_BLOCKS_BAR.height));
  highlight.setAttribute("fill", "#9AAEB5");
  highlight.setAttribute("opacity", "0.4");
  barGroup.insertBefore(highlight, barGroup.firstChild);

  return {
    pill: {
      group: pillGroup,
      defaultX: pillX,
      width: pillWidth,
    },
    indicator,
    highlight,
    labels,
  };
}

export function applyHalfBlocksPositions(
  parts: HalfBlocksChartParts,
  pillX: number,
) {
  const pillOffsetX = pillX - parts.pill.defaultX;
  const centerX = getPillCenterX(pillX, parts.pill.width);
  const indicatorOffsetX = centerX - HALF_BLOCKS_INDICATOR_X;
  const highlightWidth = getHighlightWidth(pillX, parts.pill.width);

  parts.pill.group.setAttribute("transform", `translate(${pillOffsetX} 0)`);
  parts.indicator.setAttribute("transform", `translate(${indicatorOffsetX} 0)`);
  parts.highlight.setAttribute("width", String(highlightWidth));
  applyHalfBlocksLabels(parts.labels, pillX, parts.pill.width);
}

export function resetHalfBlocksPositions(parts: HalfBlocksChartParts) {
  applyHalfBlocksPositions(parts, parts.pill.defaultX);
}
