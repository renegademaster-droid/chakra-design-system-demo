import React from "react";
import { Stack as ChakraStack, HStack, VStack } from "@chakra-ui/react";
import type { StackProps as ChakraStackProps } from "@chakra-ui/react";

/**
 * Stack — Chakra UI MCP component, styled by Figma tokens (theme).
 */
export const Stack = React.forwardRef<HTMLDivElement, ChakraStackProps>((props, ref) => (
  <ChakraStack ref={ref} {...props} />
));
Stack.displayName = "Stack";

export { HStack, VStack };
