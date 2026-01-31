import React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";
import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

export interface ButtonProps extends ChakraButtonProps {
  /** Button label (use children for custom content) */
  label?: string;
}

/** Figma spacing: Spacing/1=4px, Spacing/2=8px, Size/4=16px. Radii: Radii/md=6px. */
const sizeToPadding = {
  sm: { px: "2", py: "1" },
  md: { px: "4", py: "2" },
  lg: { px: "4", py: "2" },
};

/**
 * Button — Chakra UI MCP component, styled by Figma tokens (theme).
 * Uses theme.space (Figma Size/Spacing) and theme.radii (Figma Radii/md).
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, children, colorScheme = "teal", size = "md", px, py, ...props }, ref) => {
    const padding = sizeToPadding[size as keyof typeof sizeToPadding] ?? sizeToPadding.md;
    return (
      <ChakraButton
        ref={ref}
        size={size}
        colorScheme={colorScheme}
        borderRadius="md"
        fontWeight="600"
        px={px ?? padding.px}
        py={py ?? padding.py}
        _hover={{ transform: "translateY(-1px)" }}
        _active={{ transform: "translateY(0)" }}
        transition="all 0.15s ease"
        {...props}
      >
        {label ?? children}
      </ChakraButton>
    );
  }
);
Button.displayName = "Button";
