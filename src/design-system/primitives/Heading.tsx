import React from "react";
import { Heading as ChakraHeading } from "@chakra-ui/react";
import type { HeadingProps as ChakraHeadingProps } from "@chakra-ui/react";

/**
 * Heading — Chakra UI MCP component, styled by Figma tokens (theme).
 */
export const Heading = React.forwardRef<HTMLHeadingElement, ChakraHeadingProps>(
  ({ fontFamily = "body", color = "figma.fg", ...props }, ref) => (
    <ChakraHeading ref={ref} fontFamily={fontFamily} color={color} {...props} />
  )
);
Heading.displayName = "Heading";
