import React from "react";
import { Grid, SimpleGrid, GridItem } from "@chakra-ui/react";
import type { GridProps as ChakraGridProps } from "@chakra-ui/react";
import type { SimpleGridProps } from "@chakra-ui/react";

/**
 * Grid — Chakra UI MCP component, styled by Figma tokens (theme).
 */
export const GridLayout = React.forwardRef<HTMLDivElement, ChakraGridProps>((props, ref) => (
  <Grid ref={ref} {...props} />
));
GridLayout.displayName = "Grid";

export { SimpleGrid, GridItem };
export type { SimpleGridProps };
