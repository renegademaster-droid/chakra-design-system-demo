import React from "react";
import { Divider as ChakraDivider } from "@chakra-ui/react";
import type { DividerProps as ChakraDividerProps } from "@chakra-ui/react";

/**
 * Divider — Chakra UI MCP component, styled by Figma tokens (theme).
 */
export const Divider = React.forwardRef<HTMLHRElement, ChakraDividerProps>((props, ref) => (
  <ChakraDivider ref={ref} borderColor="gray.200" {...props} />
));
Divider.displayName = "Divider";
