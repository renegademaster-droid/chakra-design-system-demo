import React from "react";
import { Image as ChakraImage } from "@chakra-ui/react";
import type { ImageProps as ChakraImageProps } from "@chakra-ui/react";

/**
 * Image — Chakra UI component, styled by Figma tokens (theme).
 * Uses theme.radii for borderRadius.
 */
export const Image = React.forwardRef<HTMLImageElement, ChakraImageProps>(
  (props, ref) => (
    <ChakraImage ref={ref} borderRadius="md" fallbackSrc="" {...props} />
  )
);
Image.displayName = "Image";
