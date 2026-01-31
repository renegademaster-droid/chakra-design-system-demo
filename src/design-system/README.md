# Design System

React design system built on **Chakra UI MCP** components and **Figma MCP** styles/tokens.

## Architecture

| Layer | Source | Role |
|-------|--------|------|
| **Components** | Chakra UI MCP (`list_components`, `get_component_example`, `get_component_props`) | Button, Card, Input, Link, etc. — Chakra UI v2 |
| **Styles / tokens** | Figma MCP (`get_variable_defs`) | Colors, spacing, radii, fonts → `theme/figma-tokens.ts` → Chakra theme |

The app theme (`theme/theme.ts`) merges Figma variable definitions into Chakra’s theme, so all design-system components use Figma-backed tokens (space, radii, colors, fonts) automatically.

## Structure

```
design-system/
├── foundation/     # Theme, Figma token helpers
├── primitives/    # Button, Card, Input, Link, Text, Heading, Badge
├── layout/        # Box, Stack, Container, Grid, Flex
├── index.ts       # Public API
└── README.md
```

## Usage

```tsx
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import { Button, Card, Heading, Text, Container, VStack } from "./design-system";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container p={8}>
        <VStack align="stretch" spacing={4}>
          <Heading size="lg">Design System</Heading>
          <Text>Components from Chakra UI MCP, styles from Figma MCP.</Text>
          <Button colorScheme="teal" label="Primary" />
          <Card title="Card" description="Figma-styled card." />
        </VStack>
      </Container>
    </ChakraProvider>
  );
}
```

## Updating tokens from Figma

1. In Figma, select a node that uses your design system variables.
2. Run **get_variable_defs** (Figma MCP).
3. Paste or merge the result into `src/theme/figma-tokens.ts` (`figmaVariableDefs`).
4. Rebuild; primitives and layout will pick up the new theme tokens.

## Adding components

Use Chakra UI MCP:

- **list_components** — see all component names.
- **get_component_example** — copy usage patterns.
- **get_component_props** — see props and variants.

Implement in `primitives/` or `layout/` using Chakra UI components from `@chakra-ui/react`; theme (Figma tokens) will style them.
