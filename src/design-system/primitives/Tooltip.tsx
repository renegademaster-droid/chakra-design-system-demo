import React from "react";
import { Tooltip as ChakraTooltip } from "@chakra-ui/react";
import type { TooltipProps as ChakraTooltipProps } from "@chakra-ui/react";

export interface TooltipProps extends ChakraTooltipProps {
  /** Tooltip content (use `label` for simple string). */
  label?: React.ReactNode;
}

/**
 * Tooltip — Chakra UI component, styled by Figma tokens (theme).
 * Uses figma.default, figma.fg; theme.radii.md.
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ label, children, bg = "gray.800", color = "white", borderRadius = "md", py = 2, px = 3, fontSize = "sm", ...props }, ref) => (
    <ChakraTooltip
      ref={ref}
      label={label}
      bg={bg}
      color={color}
      borderRadius={borderRadius}
      py={py}
      px={px}
      fontSize={fontSize}
      hasArrow
      {...props}
    >
      {children}
    </ChakraTooltip>
  )
);
Tooltip.displayName = "Tooltip";
