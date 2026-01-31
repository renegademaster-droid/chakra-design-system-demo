import React from "react";
import { Box as ChakraBox } from "@chakra-ui/react";
import type { BoxProps as ChakraBoxProps } from "@chakra-ui/react";

/**
 * Box — Chakra UI MCP component, styled by Figma tokens (theme).
 */
export const Box = React.forwardRef<HTMLDivElement, ChakraBoxProps>((props, ref) => (
  <ChakraBox ref={ref} {...props} />
));
Box.displayName = "Box";
