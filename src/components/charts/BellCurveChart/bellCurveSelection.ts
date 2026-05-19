export const BELL_CURVE_VIEWBOX = { width: 286, height: 198 } as const;

export const BELL_CURVE_PLOT = {
  xMin: 8,
  xMax: 278,
  rightEdge: 285.255,
  defaultX: 233.27,
} as const;

export type BellCurveSelection = {
  guideLine: SVGPathElement;
  tailMask: SVGMaskElement;
  tailMaskRect: SVGRectElement;
  tailFill: SVGPathElement;
  innerFill: SVGPathElement;
};

export function collectBellCurveSelection(host: HTMLElement): BellCurveSelection | null {
  const guideLine = host.querySelector<SVGPathElement>(
    'path[stroke-dasharray="2.31 1.16"]',
  );
  const tailMask = host.querySelector<SVGMaskElement>('mask[id^="mask0"]');
  const tailMaskRect = tailMask?.querySelector<SVGRectElement>("rect") ?? null;
  const tailFill = host.querySelector<SVGPathElement>(
    'g[mask*="mask0"] > path[fill="#CDDBE1"]',
  );
  const innerFill = host.querySelector<SVGPathElement>(
    'g[mask*="mask1"] > path[fill="#9AAEB5"]',
  );

  if (!guideLine || !tailMask || !tailMaskRect || !tailFill || !innerFill) {
    return null;
  }

  return { guideLine, tailMask, tailMaskRect, tailFill, innerFill };
}

export function getBellCurveSelectionX(hovered: boolean) {
  return hovered ? BELL_CURVE_PLOT.xMin : BELL_CURVE_PLOT.defaultX;
}

export function applyBellCurveSelectionAt(
  selection: BellCurveSelection,
  x: number,
  hovered: boolean,
) {
  const offsetX = x - BELL_CURVE_PLOT.defaultX;
  const maskWidth = Math.max(BELL_CURVE_PLOT.rightEdge - x, 0);

  selection.guideLine.style.transform = `translateX(${offsetX}px)`;
  selection.guideLine.style.opacity = hovered ? "0" : "1";
  selection.tailMask.setAttribute("x", String(x));
  selection.tailMask.setAttribute("width", String(maskWidth));
  selection.tailMaskRect.setAttribute("width", String(Math.max(maskWidth - 1, 0)));
  selection.tailMaskRect.setAttribute(
    "transform",
    `matrix(-1 0 0 1 ${BELL_CURVE_PLOT.rightEdge} 14.8008)`,
  );
  selection.tailFill.setAttribute("opacity", hovered ? "0.65" : "0.5");
  selection.innerFill.setAttribute("opacity", hovered ? "0.75" : "0.6");
}
