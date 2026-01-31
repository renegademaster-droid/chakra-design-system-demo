import React from "react";
import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import type { CheckboxProps as ChakraCheckboxProps } from "@chakra-ui/react";

export interface CheckboxProps extends ChakraCheckboxProps {}

/**
 * Checkbox — Chakra UI component, styled by Figma tokens (theme).
 * Uses figma.fg, figma.fg_muted, figma.borderDefault, figma.default; theme.radii.sm.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ colorScheme = "teal", size = "md", sx, ...props }, ref) => (
    <ChakraCheckbox
      ref={ref}
      colorScheme={colorScheme}
      size={size}
      color="figma.fg"
      sx={{
        userSelect: "none",
        "& .chakra-checkbox__label": { pointerEvents: "none" },
        "& .chakra-checkbox__control": {
          borderColor: "figma.borderDefault",
          _hover: { borderColor: "figma.fg_muted" },
        },
        "& .chakra-checkbox__input:checked ~ .chakra-checkbox__control": {
          bg: "teal.500",
          borderColor: "teal.500",
        },
        ...sx,
      }}
      {...props}
    />
  )
);
Checkbox.displayName = "Checkbox";
