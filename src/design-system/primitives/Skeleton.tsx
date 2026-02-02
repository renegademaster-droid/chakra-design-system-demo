import React from "react";
import { Skeleton as ChakraSkeleton } from "@chakra-ui/react";
import type { SkeletonProps as ChakraSkeletonProps } from "@chakra-ui/react";

/**
 * Skeleton — Chakra UI component, styled by Figma tokens (theme).
 * Uses figma.muted for background; theme.radii.md.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, ChakraSkeletonProps>(
  (props, ref) => (
    <ChakraSkeleton
      ref={ref}
      borderRadius="md"
      startColor="figma.muted"
      endColor="gray.200"
      {...props}
    />
  )
);
Skeleton.displayName = "Skeleton";
