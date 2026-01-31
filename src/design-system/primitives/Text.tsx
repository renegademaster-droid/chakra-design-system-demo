import React from "react";
import { Text as ChakraText } from "@chakra-ui/react";
import type { TextProps as ChakraTextProps } from "@chakra-ui/react";

/**
 * Text — Chakra UI MCP component, styled by Figma tokens (theme).
 */
export const Text = React.forwardRef<HTMLParagraphElement, ChakraTextProps>(
  ({ fontFamily = "body", color = "figma.fg", ...props }, ref) => (
    <ChakraText ref={ref} fontFamily={fontFamily} color={color} {...props} />
  )
);
Text.displayName = "Text";
