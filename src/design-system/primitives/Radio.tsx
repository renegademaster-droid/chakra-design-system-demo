import React from "react";
import { Radio as ChakraRadio, RadioGroup } from "@chakra-ui/react";
import type { RadioProps as ChakraRadioProps } from "@chakra-ui/react";
import type { RadioGroupProps } from "@chakra-ui/react";

export interface RadioProps extends ChakraRadioProps {}

export interface RadioGroupPropsExtended extends RadioGroupProps {}

/**
 * Radio — Chakra UI component, styled by Figma tokens (theme).
 * Uses figma.fg, figma.fg_muted, figma.borderDefault; theme.radii.full.
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ colorScheme = "teal", size = "md", sx, ...props }, ref) => (
    <ChakraRadio
      ref={ref}
      colorScheme={colorScheme}
      size={size}
      borderColor="figma.borderDefault"
      color="figma.fg"
      _checked={{
        borderColor: "teal.500",
        bg: "teal.500",
        _before: { display: "none" },
      }}
      _hover={{ borderColor: "figma.fg_muted" }}
      sx={{
        "& .chakra-radio__control": { position: "relative" },
        "& .chakra-radio__control[data-checked]::before": { display: "none" },
        "& .chakra-radio__control[data-checked]::after": {
          content: '""',
          display: "block",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "35%",
          height: "35%",
          borderRadius: "full",
          bg: "white",
        },
        ...sx,
      }}
      {...props}
    />
  )
);
Radio.displayName = "Radio";

(Radio as React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>> & { Group: typeof RadioGroup }).Group = RadioGroup;
