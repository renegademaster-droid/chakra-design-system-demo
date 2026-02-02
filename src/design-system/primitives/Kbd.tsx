import React from "react";
import { Kbd as ChakraKbd } from "@chakra-ui/react";
import type { KbdProps as ChakraKbdProps } from "@chakra-ui/react";

/**
 * Kbd — Chakra UI component, styled by Figma tokens (theme).
 * Uses figma.default, figma.borderDefault; theme.radii.sm.
 */
export const Kbd = React.forwardRef<HTMLElement, ChakraKbdProps>(
  (props, ref) => (
    <ChakraKbd
      ref={ref}
      px={1.5}
      py={0.5}
      fontSize="xs"
      fontFamily="mono"
      borderRadius="sm"
      borderWidth="1px"
      borderColor="figma.borderDefault"
      bg="figma.muted"
      color="figma.fg"
      {...props}
    />
  )
);
Kbd.displayName = "Kbd";
