/** Figma exports embed backdrop-filter in foreignObject — often fails to paint on mobile Chrome. */
export function sanitizeChartSvg(svg: string) {
  const withoutForeign = svg.replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "");

  return ensureSvgRootAttributes(withoutForeign);
}

function parseViewBoxSize(viewBox: string) {
  const parts = viewBox.trim().split(/[\s,]+/).map(Number);

  if (parts.length !== 4 || parts.some((value) => Number.isNaN(value))) {
    return null;
  }

  return { width: parts[2], height: parts[3] };
}

function readSvgAttribute(attrs: string, name: string) {
  const match = attrs.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"));

  return match?.[1];
}

/** Mobile browsers may collapse SVGs missing width, height, or viewBox. */
export function ensureSvgRootAttributes(svg: string) {
  return svg.replace(/<svg\b([^>]*)>/i, (_, rawAttrs: string) => {
    const viewBox = readSvgAttribute(rawAttrs, "viewBox");
    const parsed = viewBox ? parseViewBoxSize(viewBox) : null;

    let width = readSvgAttribute(rawAttrs, "width");
    let height = readSvgAttribute(rawAttrs, "height");

    if (parsed) {
      width = width ?? String(parsed.width);
      height = height ?? String(parsed.height);
    }

    const resolvedViewBox =
      viewBox ?? (width && height ? `0 0 ${width} ${height}` : "0 0 100 100");

    if (!width || !height) {
      const fallback = parseViewBoxSize(resolvedViewBox);
      width = width ?? String(fallback?.width ?? 100);
      height = height ?? String(fallback?.height ?? 100);
    }

    const passthrough = rawAttrs
      .replace(/\s*(xmlns|viewBox|width|height|preserveAspectRatio)=["'][^"']*["']/gi, "")
      .trim();

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${resolvedViewBox}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"${passthrough ? ` ${passthrough}` : ""}>`;
  });
}
