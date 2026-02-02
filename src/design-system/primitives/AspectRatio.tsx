import React from "react";
import { AspectRatio as ChakraAspectRatio } from "@chakra-ui/react";
import type { AspectRatioProps as ChakraAspectRatioProps } from "@chakra-ui/react";

/**
 * AspectRatio — Chakra UI component, styled by Figma tokens (theme).
 * Constrains child content to a given aspect ratio.
 */
export const AspectRatio = React.forwardRef<HTMLDivElement, ChakraAspectRatioProps>(
  (props, ref) => <ChakraAspectRatio ref={ref} {...props} />
);
AspectRatio.displayName = "AspectRatio";
