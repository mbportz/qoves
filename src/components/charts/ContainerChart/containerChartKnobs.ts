export const CONTAINER_CHART_VIEWBOX = { width: 286, height: 157 } as const;

export const CONTAINER_KNOB_BOUNDS = {
  xMin: 14,
  xMax: 248,
} as const;

export type ContainerKnob = {
  group: SVGGElement;
  defaultX: number;
  width: number;
  offsetX: number;
};

export type ContainerRow = {
  knob: ContainerKnob;
  line: SVGPathElement;
  lineStartX: number;
  lineY: number;
  barEndOffset: number;
};

function belongsToKnob(
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
    bbox.x + bbox.width <= pillX + pillWidth + 48 &&
    bbox.y >= pillY - 1 &&
    bbox.y + bbox.height <= pillY + pillHeight + 2
  );
}

function parseMetricLine(path: SVGPathElement) {
  const match = path.getAttribute("d")?.match(/^M([\d.]+) ([\d.]+)H([\d.]+)$/);

  if (!match) {
    return null;
  }

  return {
    startX: Number.parseFloat(match[1]),
    y: Number.parseFloat(match[2]),
    defaultEndX: Number.parseFloat(match[3]),
  };
}

export function collectContainerRows(host: HTMLElement): ContainerRow[] | null {
  const clipRoot = host.querySelector<SVGGElement>("g[clip-path]");

  if (!clipRoot) {
    return null;
  }

  const lines = [...clipRoot.querySelectorAll<SVGPathElement>(
    'path[stroke-width="2.25"]',
  )]
    .map((line) => ({ line, geometry: parseMetricLine(line) }))
    .filter((entry): entry is { line: SVGPathElement; geometry: NonNullable<ReturnType<typeof parseMetricLine>> } => entry.geometry !== null)
    .sort((a, b) => a.geometry.y - b.geometry.y);

  const pills = [...clipRoot.querySelectorAll<SVGRectElement>(
    'rect[fill="white"][rx="2.09357"]',
  )].sort(
    (a, b) =>
      Number.parseFloat(a.getAttribute("y") ?? "0") -
      Number.parseFloat(b.getAttribute("y") ?? "0"),
  );

  if (pills.length !== 3 || lines.length !== 3) {
    return null;
  }

  const rows: ContainerRow[] = [];

  pills.forEach((pill, index) => {
    const defaultX = Number.parseFloat(pill.getAttribute("x") ?? "0");
    const pillY = Number.parseFloat(pill.getAttribute("y") ?? "0");
    const width = Number.parseFloat(pill.getAttribute("width") ?? "0");
    const height = Number.parseFloat(pill.getAttribute("height") ?? "0");
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

    group.classList.add("container-knob");

    const elements = [...clipRoot.querySelectorAll<SVGElement>("rect, path")].filter(
      (element) => belongsToKnob(element, defaultX, pillY, width, height),
    );

    if (elements.length === 0) {
      return;
    }

    clipRoot.appendChild(group);

    elements.forEach((element) => {
      group.appendChild(element);
    });

    const { line, geometry } = lines[index];

    rows.push({
      knob: { group, defaultX, width, offsetX: 0 },
      line,
      lineStartX: geometry.startX,
      lineY: geometry.y,
      barEndOffset: geometry.defaultEndX - defaultX,
    });
  });

  return rows.length === 3 ? rows : null;
}

export function randomKnobX(knob: ContainerKnob) {
  const travel = CONTAINER_KNOB_BOUNDS.xMax - CONTAINER_KNOB_BOUNDS.xMin - knob.width;

  return CONTAINER_KNOB_BOUNDS.xMin + Math.random() * travel;
}

export function setRowKnobX(row: ContainerRow, knobX: number) {
  row.knob.offsetX = knobX - row.knob.defaultX;
  row.knob.group.setAttribute(
    "transform",
    `translate(${row.knob.offsetX} 0)`,
  );
  const endX = knobX + row.barEndOffset;
  row.line.setAttribute("d", `M${row.lineStartX} ${row.lineY}H${endX}`);
}

export function resetRowPositions(rows: ContainerRow[]) {
  rows.forEach((row) => {
    setRowKnobX(row, row.knob.defaultX);
  });
}
