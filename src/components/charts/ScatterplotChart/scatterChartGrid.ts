export const SCATTER_CHART_VIEWBOX = { width: 286, height: 338 } as const;

const COLUMN_ANCHORS = [
  57.3257, 75.0514, 92.7772, 110.503, 128.229, 145.954, 163.68, 181.406, 199.132,
  216.857,
] as const;

/** Row anchors for the left half (rect `y`). */
const LEFT_ROW_ANCHORS = [
  79.4004, 97.127, 114.852, 132.578, 150.303, 173.121, 190.848, 208.572, 226.299,
  244.023,
] as const;

/** Row anchors for the right half (matrix `y`). */
const RIGHT_ROW_ANCHORS = [
  162.121, 144.395, 126.67, 108.943, 91.2188, 184.938, 202.662, 220.389, 238.113,
  255.84,
] as const;

const COLUMN_MATCH_EPSILON = 2;
const ROW_MATCH_EPSILON = 3;
const LEFT_COLUMN_COUNT = 5;
/** Positive = read from column on the right → bright blob shifts left. Negative = shifts right. */
const BRIGHTNESS_SHIFT_COLUMNS = -1;
const DIM_OPACITY = 0.11;

export type ScatterGridCell = {
  element: SVGGElement | SVGRectElement;
  col: number;
  row: number;
  defaultOpacity: number;
};

export type ScatterOpacityGrid = {
  cells: ScatterGridCell[];
  opacities: Map<string, number>;
};

function parseRectAnchor(rect: SVGRectElement) {
  const transform = rect.getAttribute("transform");

  if (transform?.includes("matrix")) {
    const match = transform.match(/matrix\(1 0 0 -1 ([\d.]+) ([\d.]+)\)/);

    if (match) {
      return {
        anchorX: Number.parseFloat(match[1]),
        anchorY: Number.parseFloat(match[2]),
      };
    }
  }

  return {
    anchorX: Number.parseFloat(rect.getAttribute("x") ?? "0"),
    anchorY: Number.parseFloat(rect.getAttribute("y") ?? "0"),
  };
}

function nearestIndex(value: number, anchors: readonly number[], epsilon: number) {
  const exactIndex = anchors.findIndex(
    (anchor) => Math.abs(anchor - value) < epsilon,
  );

  if (exactIndex >= 0) {
    return exactIndex;
  }

  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  anchors.forEach((anchor, index) => {
    const distance = Math.abs(anchor - value);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
}

function getColumnIndex(anchorX: number) {
  return nearestIndex(anchorX, COLUMN_ANCHORS, COLUMN_MATCH_EPSILON);
}

function getRowIndex(anchorY: number, col: number) {
  const rowAnchors = col < LEFT_COLUMN_COUNT ? LEFT_ROW_ANCHORS : RIGHT_ROW_ANCHORS;

  return nearestIndex(anchorY, rowAnchors, ROW_MATCH_EPSILON);
}

function getRectFromElement(element: SVGGElement | SVGRectElement) {
  return element instanceof SVGRectElement
    ? element
    : element.querySelector<SVGRectElement>("rect");
}

function readDefaultOpacity(element: SVGGElement | SVGRectElement) {
  if (element instanceof SVGGElement) {
    return Number.parseFloat(element.getAttribute("opacity") ?? String(DIM_OPACITY));
  }

  return 1;
}

function gridKey(col: number, row: number) {
  return `${col},${row}`;
}

export function collectScatterGridCells(host: HTMLElement) {
  const cells: ScatterGridCell[] = [];

  host.querySelectorAll<SVGGElement>("g[opacity]").forEach((group) => {
    const rect = getRectFromElement(group);

    if (!rect) {
      return;
    }

    const { anchorX, anchorY } = parseRectAnchor(rect);

    cells.push({
      element: group,
      col: getColumnIndex(anchorX),
      row: getRowIndex(anchorY, getColumnIndex(anchorX)),
      defaultOpacity: readDefaultOpacity(group),
    });
  });

  const brightCell = host.querySelector<SVGRectElement>(
    'rect[transform*="163.68 126.67"]',
  );
  if (brightCell) {
    const { anchorX, anchorY } = parseRectAnchor(brightCell);
    const col = getColumnIndex(anchorX);

    cells.push({
      element: brightCell,
      col,
      row: getRowIndex(anchorY, col),
      defaultOpacity: 1,
    });
  }

  return cells;
}

export function buildScatterOpacityGrid(cells: ScatterGridCell[]): ScatterOpacityGrid {
  const opacities = new Map<string, number>();

  cells.forEach((cell) => {
    const key = gridKey(cell.col, cell.row);
    const existing = opacities.get(key);

    opacities.set(key, existing === undefined ? cell.defaultOpacity : Math.max(existing, cell.defaultOpacity));
  });

  return { cells, opacities };
}

export function getShiftedOpacity(
  grid: ScatterOpacityGrid,
  cell: ScatterGridCell,
  shifted: boolean,
) {
  if (!shifted) {
    return cell.defaultOpacity;
  }

  const sourceCol = cell.col + BRIGHTNESS_SHIFT_COLUMNS;
  const sourceOpacity = grid.opacities.get(gridKey(sourceCol, cell.row));

  if (sourceOpacity === undefined) {
    return cell.defaultOpacity;
  }

  return sourceOpacity;
}
