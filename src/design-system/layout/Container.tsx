import React from "react";
import { Container as ChakraContainer } from "@chakra-ui/react";
import type { ContainerProps as ChakraContainerProps } from "@chakra-ui/react";

/**
 * Container — Chakra UI MCP component, styled by Figma tokens (theme).
 */
export const Container = React.forwardRef<HTMLDivElement, ChakraContainerProps>(
  (props, ref) => <ChakraContainer ref={ref} maxW="1200px" mx="auto" {...props} />
);
Container.displayName = "Container";
