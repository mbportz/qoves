export const BELL_CURVE_VIEWBOX = { width: 286, height: 198 } as const;

export const BELL_CURVE_PLOT = {
  leftX: 14.3606,
  rightX: 269.413,
  plotTop: 7,
  plotBottom: 141,
} as const;

/** Baseline Y used by the original fill wedges in `assets/charts/bell-curve.svg`. */
const BELL_BASELINE_Y = 140.136;

/**
 * Top edge of the distribution, extracted from the white outline path
 * (`bell-curve.svg` line 114) — left half through peak through right half.
 */
const BELL_CURVE_TOP_EDGE =
  "M14.3606 132.189V132.478C59.077 132.478 84.9602 108.137 104.693 83.8537C109.625 77.7849 114.176 71.7147 118.538 66.0325C122.902 60.3471 127.076 55.0498 131.263 50.5118C139.644 41.4291 148.025 35.4431 157.999 35.4431C167.98 35.4431 177.221 41.4373 186.168 50.5186C195.11 59.596 203.709 71.7042 212.417 83.8399C221.116 95.9648 229.924 108.116 239.268 117.234C248.611 126.35 258.533 132.478 269.467 132.478";

const SVG_NS = "http://www.w3.org/2000/svg";
const REGION_CLIP_ID = "bell-curve-region-clip";
const REVEAL_CLIP_ID = "bell-curve-reveal-clip";

const REVEAL_WIDTH = BELL_CURVE_PLOT.rightX - BELL_CURVE_PLOT.leftX;

export type BellCurveSelection = {
  revealRect: SVGRectElement;
  fill: SVGPathElement;
};

function buildRegionUnderCurve() {
  return `${BELL_CURVE_TOP_EDGE}L${BELL_CURVE_PLOT.rightX} ${BELL_BASELINE_Y}L${BELL_CURVE_PLOT.leftX} ${BELL_BASELINE_Y}Z`;
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function getDefs(svg: SVGSVGElement): SVGDefsElement {
  const existing = svg.querySelector("defs");

  if (existing) {
    return existing;
  }

  const defs = document.createElementNS(SVG_NS, "defs");

  svg.appendChild(defs);

  return defs;
}

function ensureRegionClip(defs: SVGDefsElement) {
  let clip = defs.querySelector<SVGClipPathElement>(`#${REGION_CLIP_ID}`);

  if (!clip) {
    clip = document.createElementNS(SVG_NS, "clipPath");
    clip.id = REGION_CLIP_ID;
    clip.setAttribute("clipPathUnits", "userSpaceOnUse");

    const shape = document.createElementNS(SVG_NS, "path");

    shape.setAttribute("d", buildRegionUnderCurve());
    clip.appendChild(shape);
    defs.appendChild(clip);
  }

  return clip;
}

function ensureRevealClip(defs: SVGDefsElement) {
  let clip = defs.querySelector<SVGClipPathElement>(`#${REVEAL_CLIP_ID}`);

  if (!clip) {
    clip = document.createElementNS(SVG_NS, "clipPath");
    clip.id = REVEAL_CLIP_ID;
    clip.setAttribute("clipPathUnits", "userSpaceOnUse");

    const rect = document.createElementNS(SVG_NS, "rect");

    rect.setAttribute("fill", "white");
    rect.setAttribute("y", String(BELL_CURVE_PLOT.plotTop));
    rect.setAttribute(
      "height",
      String(BELL_CURVE_PLOT.plotBottom - BELL_CURVE_PLOT.plotTop),
    );
    clip.appendChild(rect);
    defs.appendChild(clip);
  }

  return clip.querySelector<SVGRectElement>("rect");
}

function wrapRevealLayer(fillGroup: SVGGElement, revealClipId: string) {
  let revealLayer = fillGroup.querySelector<SVGGElement>(".bell-curve-reveal");

  if (!revealLayer) {
    revealLayer = document.createElementNS(SVG_NS, "g");
    revealLayer.classList.add("bell-curve-reveal");
    revealLayer.setAttribute("clip-path", `url(#${revealClipId})`);

    while (fillGroup.firstChild) {
      revealLayer.appendChild(fillGroup.firstChild);
    }

    fillGroup.appendChild(revealLayer);
  }

  return revealLayer;
}

function removeLegacyFills(fillGroup: SVGGElement) {
  fillGroup.querySelector('g[mask*="mask1"]')?.remove();
  fillGroup.querySelector<SVGMaskElement>("mask[id^='mask1']")?.remove();
  fillGroup
    .querySelector<SVGPathElement>('path[fill="#9AAEB5"][d*="269.413"]')
    ?.remove();
}

function prepareFillLayer(host: HTMLElement) {
  const svg = host.querySelector("svg");

  if (!svg) {
    return null;
  }

  const fillGroup = host.querySelector<SVGGElement>('g[mask*="mask0"]');

  if (!fillGroup) {
    return null;
  }

  fillGroup.removeAttribute("mask");
  removeLegacyFills(fillGroup);

  const defs = getDefs(svg);

  ensureRegionClip(defs);
  const revealRect = ensureRevealClip(defs);

  if (!revealRect) {
    return null;
  }

  fillGroup.setAttribute("clip-path", `url(#${REGION_CLIP_ID})`);
  wrapRevealLayer(fillGroup, REVEAL_CLIP_ID);

  return revealRect;
}

export function collectBellCurveSelection(host: HTMLElement): BellCurveSelection | null {
  const revealRect = prepareFillLayer(host);
  const fill = host.querySelector<SVGPathElement>('path[fill="#CDDBE1"]');

  if (!revealRect || !fill) {
    return null;
  }

  return {
    revealRect,
    fill,
  };
}

export function setupBellCurveFills(selection: BellCurveSelection) {
  selection.fill.setAttribute("d", buildRegionUnderCurve());
}

/** `reveal` 0 = hidden, 1 = fully shown (wipes right → left). */
export function applyBellCurveReveal(selection: BellCurveSelection, reveal: number) {
  const amount = Math.min(1, Math.max(0, reveal));
  const width = REVEAL_WIDTH * amount;
  const x = BELL_CURVE_PLOT.rightX - width;

  selection.revealRect.setAttribute("x", String(x));
  selection.revealRect.setAttribute("width", String(width));
  selection.fill.setAttribute("opacity", String(lerp(0, 0.5, amount)));
}

export function resetBellCurveReveal(selection: BellCurveSelection) {
  applyBellCurveReveal(selection, 0);
}
