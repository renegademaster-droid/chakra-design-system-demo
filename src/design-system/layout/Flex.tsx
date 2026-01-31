import React from "react";
import { Flex as ChakraFlex } from "@chakra-ui/react";
import type { FlexProps as ChakraFlexProps } from "@chakra-ui/react";

/**
 * Flex — Chakra UI MCP component, styled by Figma tokens (theme).
 */
export const Flex = React.forwardRef<HTMLDivElement, ChakraFlexProps>((props, ref) => (
  <ChakraFlex ref={ref} {...props} />
));
Flex.displayName = "Flex";
