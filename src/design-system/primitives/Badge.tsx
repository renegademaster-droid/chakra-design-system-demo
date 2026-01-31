import React from "react";
import { Badge as ChakraBadge } from "@chakra-ui/react";
import type { BadgeProps as ChakraBadgeProps } from "@chakra-ui/react";

/**
 * Badge — Chakra UI MCP component, styled by Figma tokens (theme).
 * Default borderRadius = theme.radii.md (Figma Radii/md = 6px).
 */
export const Badge = React.forwardRef<HTMLSpanElement, ChakraBadgeProps>(
  ({ borderRadius = "md", px = 2, py = 1, fontSize = "xs", ...props }, ref) => (
    <ChakraBadge
      ref={ref}
      borderRadius={borderRadius}
      fontFamily="body"
      fontWeight="600"
      px={px}
      py={py}
      fontSize={fontSize}
      {...props}
    />
  )
);
Badge.displayName = "Badge";
