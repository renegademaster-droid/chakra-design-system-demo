import React from "react";
import { Code as ChakraCode } from "@chakra-ui/react";
import type { CodeProps as ChakraCodeProps } from "@chakra-ui/react";

/**
 * Code — Chakra UI component, styled by Figma tokens (theme).
 * Uses figma.muted, figma.fg; theme.radii.sm.
 */
export const Code = React.forwardRef<HTMLElement, ChakraCodeProps>(
  (props, ref) => (
    <ChakraCode
      ref={ref}
      px={1.5}
      py={0.5}
      fontSize="sm"
      fontFamily="mono"
      borderRadius="sm"
      bg="figma.muted"
      color="figma.fg"
      {...props}
    />
  )
);
Code.displayName = "Code";
