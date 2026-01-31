# Theme: Chakra components + Figma tokens

- **Components**: Use Chakra UI components (from Chakra UI MCP — `get_component_example`, etc.).
- **Styles/tokens**: Come from Figma (Figma MCP — `get_variable_defs`).

## Flow

1. **Figma MCP** — In Figma, select a node that uses your design system variables, then run **get_variable_defs**. You get a flat map like `{ "color/brand/500": "#0079E6", "spacing/4": 16 }`.

2. **`figma-tokens.ts`** — Paste or merge that output here. This file is the single source for Figma-derived tokens.

3. **`figma-to-chakra.ts`** — Maps Figma variable keys into Chakra theme overrides:
   - **Colors**: `gray/50`, `teal/600`, `red/500`, etc. → `theme.colors.gray`, `theme.colors.teal`, …
   - **Semantic**: `text/fg`, `text/fg_muted`, `bg/default`, `border/default` → `theme.colors.figma`
   - **Spacing**: `Spacing/1`, `Spacing/2`, `Size/4` → `theme.space`
   - **Radii**: `Radii/*` → `theme.radii`
   - **Typography**: `fonts/body`, `fontSizes/xs`, `fontWeights/normal` → `theme.fonts`, `theme.fontSizes`, `theme.fontWeights`

4. **Token → design system components** (theme drives these):
   - **Button**: `teal.*`, `gray.*`, `space` (px, py), `radii`
   - **Card**: `figma.default` (bg), `gray.*` (text), `radii`, `space`
   - **Input**: `figma.borderDefault`, `gray.*`, `fonts`, `fontSizes`, `space`, `radii`
   - **Link, Text, Heading**: `figma.fg`, `figma.fg_muted`, `fonts`, `fontSizes`, `fontWeights`
   - **Badge, Alert**: `gray.*`, `teal.*`, `red.*`, etc., `radii`, `space`
   - **Layout (Container, Stack, Box, Flex, Grid)**: `space` (padding, gap)

5. **`theme.ts`** — `extendTheme` merges base Chakra config with Figma overrides. Chakra components pick up Figma styles via the theme.

6. **Dark mode** — `figmaDarkVariableDefs` in `figma-tokens.ts` holds dark mode variables from Figma (get_variable_defs on Dark mode). The theme builds **semantic tokens** (`figma.fg`, `figma.default`, `figma.muted`, `figma.borderDefault`, etc.) with `default` (light) and `_dark` (dark) so components using these tokens switch with color mode. `useSystemColorMode: true` follows system preference; the doc layout includes a light/dark toggle.

## Updating tokens from Figma

1. Select the right frame/component in Figma.
2. Run **get_variable_defs** (Figma MCP).
3. Copy the result into `figma-tokens.ts` as `figmaVariableDefs` (or merge new keys).
4. Rebuild; Chakra components will use the new tokens.
