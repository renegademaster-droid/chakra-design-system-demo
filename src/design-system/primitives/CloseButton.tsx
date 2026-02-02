import React from "react";
import { CloseButton as ChakraCloseButton } from "@chakra-ui/react";
import type { CloseButtonProps as ChakraCloseButtonProps } from "@chakra-ui/react";

/**
 * CloseButton — Chakra UI component, styled by Figma tokens (theme).
 * Uses figma.fg_muted, figma.fg on hover.
 */
export const CloseButton = React.forwardRef<HTMLButtonElement, ChakraCloseButtonProps>(
  (props, ref) => (
    <ChakraCloseButton
      ref={ref}
      color="figma.fg_muted"
      _hover={{ color: "figma.fg", bg: "figma.muted" }}
      borderRadius="md"
      aria-label="Close"
      {...props}
    />
  )
);
CloseButton.displayName = "CloseButton";
