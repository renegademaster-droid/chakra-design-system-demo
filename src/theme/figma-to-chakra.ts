/**
 * Maps Figma variable definitions (from Figma MCP get_variable_defs) into
 * Chakra UI theme overrides. Use Chakra components; styles come from Figma tokens.
 *
 * Figma variable defs format: { "variable/name/path": value }
 * - Color values: "#RRGGBB" or "#RRGGBBAA"
 * - Spacing/size values: number (px)
 * - Naming conventions: color/*, spacing/*, radius/*, shadow/*, font/*
 */

export type FigmaVariableDefs = Record<string, string | number>;

function isColorValue(v: string | number): v is string {
  return typeof v === "string" && /^#([0-9A-Fa-f]{3}){1,2}$|^#([0-9A-Fa-f]{4}){1,2}$/.test(v);
}

function toNumber(v: string | number): number | null {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  }
  return null;
}

function parseFigmaKey(key: string): { category: string; path: string[] } {
  const normalized = key.replace(/\s+/g, "").toLowerCase();
  const path = normalized.split(/[/._-]/).filter(Boolean);
  const category = path[0] ?? "other";
  return { category, path };
}

/** Figma color group names → theme.colors[group][shade] (e.g. gray/50, teal/600, primary/500) */
const COLOR_GROUPS = new Set([
  "gray", "red", "pink", "purple", "cyan", "blue", "teal", "green", "yellow", "orange",
  "primary", "secondary", "brand", "accent", "success", "error", "warning",
]);

/** Parse Figma Effect(string) into CSS box-shadow or blur. */
function parseEffectToCss(effectStr: string): string | null {
  if (typeof effectStr !== "string" || !effectStr.includes("Effect(")) return null;

  const parts: string[] = [];
  const effectBlocks = effectStr.split(/\);\s*Effect\(/).map((s) => s.replace(/^Effect\(|\)$/g, "").trim());

  for (const block of effectBlocks) {
    const typeMatch = block.match(/type:\s*(\w+)/);
    const colorMatch = block.match(/color:\s*([#\w/]+)/);
    const offsetMatch = block.match(/offset:\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
    const radiusMatch = block.match(/radius:\s*(\d+)/);
    const spreadMatch = block.match(/spread:\s*(\d+)/);

    const type = typeMatch?.[1];
    const color = colorMatch?.[1].startsWith("#") ? colorMatch[1] : "rgba(0,0,0,0.1)";
    const ox = offsetMatch ? parseInt(offsetMatch[1], 10) : 0;
    const oy = offsetMatch ? parseInt(offsetMatch[2], 10) : 0;
    const radius = radiusMatch ? parseInt(radiusMatch[1], 10) : 0;
    const spread = spreadMatch ? parseInt(spreadMatch[1], 10) : 0;

    if (type === "DROP_SHADOW") {
      parts.push(`${ox}px ${oy}px ${radius}px ${spread}px ${color}`);
    } else if (type === "INNER_SHADOW") {
      parts.push(`inset ${ox}px ${oy}px ${radius}px ${spread}px ${color}`);
    }
  }

  if (parts.length === 0) return null;
  return parts.join(", ");
}

/** Parse Figma Blur effect (FOREGROUND_BLUR) to CSS blur value. */
function parseBlurToCss(effectStr: string): string | null {
  if (typeof effectStr !== "string" || !effectStr.includes("radius:")) return null;
  const m = effectStr.match(/radius:\s*(\d+)/);
  return m ? `${m[1]}px` : null;
}

/**
 * Build Chakra theme overrides from Figma variable definitions.
 * Pass the result of get_variable_defs (Figma MCP) as defs.
 */
export function figmaVariablesToChakraTheme(defs: FigmaVariableDefs): Record<string, unknown> {
  const colorGroups: Record<string, Record<string, string>> = {};
  const space: Record<string, number | string> = {};
  const radii: Record<string, number | string> = {};
  const shadows: Record<string, string> = {};
  const blurs: Record<string, string> = {};
  const fontSizes: Record<string, string | number> = {};
  const fontWeights: Record<string, number | string> = {};
  const fonts: Record<string, string> = {};
  const breakpoints: Record<string, number | string> = {};

  for (const [key, value] of Object.entries(defs)) {
    const { category, path } = parseFigmaKey(key);

    if (isColorValue(value)) {
      if (COLOR_GROUPS.has(category) && path[1]) {
        if (!colorGroups[category]) colorGroups[category] = {};
        colorGroups[category][path[1]] = value;
      } else if (category === "color" || category === "colors" || category === "colour") {
        const group = path[1] ?? "primary";
        if (!colorGroups[group]) colorGroups[group] = {};
        colorGroups[group][path[2] ?? "500"] = value;
      } else if (
        category === "primary" ||
        category === "secondary" ||
        category === "brand" ||
        category === "accent"
      ) {
        const group = category === "brand" ? "brand" : category;
        if (!colorGroups[group]) colorGroups[group] = {};
        colorGroups[group][path[1] ?? "500"] = value;
      } else if (
        category === "icon" ||
        category === "text" ||
        category === "background" ||
        category === "bg" ||
        category === "border"
      ) {
        const group = "figma";
        if (!colorGroups[group]) colorGroups[group] = {};
        const token =
          category === "border"
            ? "borderDefault"
            : (path[1] ?? key.replace(/[/._-]/g, "."));
        colorGroups[group][token] = value;
      }
    }

    const numVal = toNumber(value);
    if (numVal !== null && numVal >= 0) {
      if (
        category === "spacing" ||
        category === "space" ||
        category === "gap" ||
        category === "size" ||
        category === "largesizes"
      ) {
        const token = category === "largesizes" ? path[1] : (path[1] ?? path[0] ?? String(numVal));
        if (token) space[token] = numVal;
      }
      if (category === "radius" || category === "radii" || category === "border") {
        const token = path[path.length - 1] ?? path[1] ?? "md";
        radii[token] = numVal;
      }
      if (category === "fontsizes") {
        const token = path[1] ?? "md";
        fontSizes[token] = numVal;
      }
      if (category === "fontweights") {
        const token = path[1] ?? "normal";
        fontWeights[token] = numVal;
      }
      if (category === "breakpoint" || category === "breakpoints") {
        const token = path[1] ?? "md";
        breakpoints[token] = numVal;
      }
    }

    if (typeof value === "string" && !isColorValue(value) && category === "fonts") {
      const token = path[1] ?? "body";
      fonts[token] = value;
    }

    // Effects: Shadows (Effect string → CSS box-shadow), Blurs (Effect string → CSS blur)
    if (typeof value === "string" && value.includes("Effect(")) {
      if (category === "shadows") {
        const css = parseEffectToCss(value);
        if (css) {
          const mode = path[2]; // "light" | "dark"
          const token = path[path.length - 1]; // xs, sm, md, lg, xl, 2xl, inner, inset
          const key = mode === "dark" ? `dark-${token}` : token;
          shadows[key] = css;
        }
      } else if (category === "blurs") {
        const css = parseBlurToCss(value);
        if (css) {
          const token = path[1] ?? "md";
          blurs[token] = css;
        }
      }
    }
  }

  const overrides: Record<string, unknown> = {};
  if (Object.keys(colorGroups).length > 0) overrides.colors = colorGroups;
  if (Object.keys(space).length > 0) overrides.space = space;
  if (Object.keys(radii).length > 0) overrides.radii = radii;
  if (Object.keys(shadows).length > 0) overrides.shadows = shadows;
  if (Object.keys(blurs).length > 0) overrides.blur = blurs;
  if (Object.keys(fontSizes).length > 0) overrides.fontSizes = fontSizes;
  if (Object.keys(fontWeights).length > 0) overrides.fontWeights = fontWeights;
  if (Object.keys(fonts).length > 0) overrides.fonts = fonts;
  if (Object.keys(breakpoints).length > 0) overrides.breakpoints = breakpoints;

  return overrides;
}
