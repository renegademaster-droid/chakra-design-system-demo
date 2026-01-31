import { extendTheme } from "@chakra-ui/react";
import { figmaVariablesToChakraTheme } from "./figma-to-chakra";
import { figmaVariableDefs, figmaDarkVariableDefs } from "./figma-tokens";

const config = {
  initialColorMode: "light" as const,
  useSystemColorMode: true,
};

// Styles/tokens from Figma MCP (get_variable_defs); components from Chakra UI MCP
const figmaOverrides = figmaVariablesToChakraTheme(figmaVariableDefs) as Record<
  string,
  Record<string, unknown>
>;
const {
  colors: figmaColors,
  space: figmaSpace,
  radii: figmaRadii,
  breakpoints: figmaBreakpoints,
  ...restFigma
} = figmaOverrides;

// Normalize Figma space to pixel strings so Chakra applies spacing (e.g. theme.space[3] → "12px")
const space =
  figmaSpace && typeof figmaSpace === "object"
    ? Object.fromEntries(
        Object.entries(figmaSpace).map(([k, v]) => [
          k,
          typeof v === "number" ? `${v}px` : v,
        ])
      )
    : undefined;

// Normalize Figma radii to pixel strings so Chakra applies borderRadius (e.g. theme.radii.md → "6px")
const radii =
  figmaRadii && typeof figmaRadii === "object"
    ? Object.fromEntries(
        Object.entries(figmaRadii).map(([k, v]) => [
          k,
          typeof v === "number" ? (v >= 9999 ? "9999px" : `${v}px`) : v,
        ])
      )
    : undefined;

// Normalize Figma breakpoints to pixel strings (e.g. theme.breakpoints.md → "768px")
const breakpoints =
  figmaBreakpoints && typeof figmaBreakpoints === "object"
    ? Object.fromEntries(
        Object.entries(figmaBreakpoints).map(([k, v]) => [
          k,
          typeof v === "number" ? `${v}px` : v,
        ])
      )
    : undefined;

const baseColors = {
  brand: {
    50: "#E3F2FF",
    100: "#B3DAFF",
    200: "#81C2FF",
    300: "#4FAAFF",
    400: "#1D92FF",
    500: "#0079E6",
    600: "#005EB4",
    700: "#004382",
    800: "#002851",
    900: "#000E21",
  },
};

// Semantic tokens: light values from figmaVariableDefs, dark from figmaDarkVariableDefs
const figmaSemanticKeys: Array<{ key: string; token: string }> = [
  { key: "text/fg", token: "fg" },
  { key: "text/fg_muted", token: "fg_muted" },
  { key: "text/fg_subtle", token: "fg_subtle" },
  { key: "text/fg_inverted", token: "fg_inverted" },
  { key: "text/fg_error", token: "fg_error" },
  { key: "text/fg_warning", token: "fg_warning" },
  { key: "text/fg_success", token: "fg_success" },
  { key: "text/fg_info", token: "fg_info" },
  { key: "bg/default", token: "default" },
  { key: "bg/muted", token: "muted" },
  { key: "bg/subtle", token: "bgSubtle" },
  { key: "bg/emphasized", token: "bgEmphasized" },
  { key: "bg/inverted", token: "bgInverted" },
  { key: "bg/panel", token: "bgPanel" },
  { key: "border/default", token: "borderDefault" },
  { key: "action-bar/bg", token: "actionBarBg" },
  { key: "action-bar/border", token: "actionBarBorder" },
  { key: "action-bar/fg", token: "actionBarFg" },
  { key: "border/subtle", token: "borderSubtle" },
  { key: "border/muted", token: "borderMuted" },
  { key: "border/emphasized", token: "borderEmphasized" },
  { key: "border/inverted", token: "borderInverted" },
];

const lightDefs = figmaVariableDefs as Record<string, string>;
const darkDefs = figmaDarkVariableDefs as Record<string, string>;

// Light fallbacks for tokens that only exist in dark mode
const lightFallback: Record<string, string> = {
  "text/fg_inverted": "#000000",
  "text/fg_error": "#dc2626",
  "text/fg_warning": "#ca8a04",
  "text/fg_success": "#16a34a",
  "text/fg_info": "#2563eb",
  "bg/subtle": lightDefs["bg/muted"] ?? "#f4f4f5",
  "bg/emphasized": lightDefs["bg/muted"] ?? "#e4e4e7",
  "bg/inverted": "#ffffff",
  "bg/panel": lightDefs["bg/default"] ?? "#ffffff",
  "bg/error": "#fef2f2",
  "bg/warning": "#fefce8",
  "bg/success": "#f0fdf4",
  "bg/info": "#eff6ff",
  "action-bar/bg": lightDefs["bg/muted"] ?? "#f4f4f5",
  "action-bar/border": lightDefs["border/default"] ?? "#e4e4e7",
  "action-bar/fg": lightDefs["text/fg"] ?? "#000000",
  "border/subtle": lightDefs["border/default"] ?? "#e4e4e7",
  "border/muted": lightDefs["border/default"] ?? "#e4e4e7",
  "border/emphasized": "#a1a1aa",
  "border/inverted": "#27272a",
};

const semanticTokens: { colors: Record<string, { default: string; _dark: string }> } = {
  colors: {},
};

for (const { key, token } of figmaSemanticKeys) {
  const light = lightDefs[key] ?? lightFallback[key];
  const dark = darkDefs[key];
  if (dark !== undefined) {
    semanticTokens.colors[`figma.${token}`] = {
      default: light ?? dark,
      _dark: dark,
    };
  } else if (light !== undefined) {
    semanticTokens.colors[`figma.${token}`] = {
      default: light,
      _dark: light,
    };
  }
}

// Figma typography: typeface Inter; fontSizes/fontWeights from Figma selection when present
const fallbackStack = "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif";
const figmaFontSizes = (restFigma as { fontSizes?: Record<string, number | string> }).fontSizes;
const figmaFontWeights = (restFigma as { fontWeights?: Record<string, number> }).fontWeights;
const typography = {
  fonts: {
    body: `"Inter", ${fallbackStack}`,
    heading: `"Inter", ${fallbackStack}`,
    mono: `"Inter", ui-monospace, monospace`,
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    ...(figmaFontSizes && Object.fromEntries(
      Object.entries(figmaFontSizes).map(([k, v]) => [k, typeof v === "number" ? `${v}px` : v])
    )),
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    ...figmaFontWeights,
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: 2,
  },
};

const theme = extendTheme({
  config,
  colors: { ...baseColors, ...(figmaColors ?? {}) },
  ...(space ? { space } : {}),
  ...(radii ? { radii } : {}),
  ...(breakpoints ? { breakpoints } : {}),
  semanticTokens,
  ...restFigma,
  ...typography,
});

export default theme;
