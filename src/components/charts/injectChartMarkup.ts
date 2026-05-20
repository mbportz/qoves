/** Inject build-time SVG into the desktop chart host (percent sizing inside aspect-ratio box). */
export function injectChartMarkup(host: HTMLElement, markup: string) {
  host.innerHTML = markup;

  const svg = host.querySelector("svg");

  if (!svg) {
    return;
  }

  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  if (!svg.getAttribute("preserveAspectRatio")) {
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  }

  // Percent sizing inside aspect-ratio wrapper — viewBox keeps proportions on mobile.
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.style.display = "block";
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.maxWidth = "100%";
}
