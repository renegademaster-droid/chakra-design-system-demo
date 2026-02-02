import React from "react";
import { Progress as ChakraProgress } from "@chakra-ui/react";
import type { ProgressProps as ChakraProgressProps } from "@chakra-ui/react";

/**
 * Progress — Chakra UI component, styled by Figma tokens (theme).
 * Uses colorScheme teal; theme.radii.
 */
export const Progress = React.forwardRef<HTMLDivElement, ChakraProgressProps>(
  (props, ref) => (
    <ChakraProgress
      ref={ref}
      colorScheme="teal"
      borderRadius="full"
      size="sm"
      {...props}
    />
  )
);
Progress.displayName = "Progress";
