import React from "react";
import { Spinner as ChakraSpinner } from "@chakra-ui/react";
import type { SpinnerProps as ChakraSpinnerProps } from "@chakra-ui/react";

/**
 * Spinner — Chakra UI MCP component, styled by Figma tokens (theme).
 */
export const Spinner = React.forwardRef<HTMLDivElement, ChakraSpinnerProps>((props, ref) => (
  <ChakraSpinner ref={ref} colorScheme="teal" {...props} />
));
Spinner.displayName = "Spinner";
