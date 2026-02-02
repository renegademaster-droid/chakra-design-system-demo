import React from "react";
import { Switch as ChakraSwitch, FormControl, FormLabel } from "@chakra-ui/react";
import type { SwitchProps as ChakraSwitchProps } from "@chakra-ui/react";

export interface SwitchProps extends ChakraSwitchProps {
  label?: string;
}

/**
 * Switch — Chakra UI component, styled by Figma tokens (theme).
 * Uses colorScheme teal; theme.radii.
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, children, ...props }, ref) => (
    <FormControl display="flex" alignItems="center" gap={3}>
      <ChakraSwitch ref={ref} colorScheme="teal" {...props} />
      {(label ?? children) && (
        <FormLabel mb={0} fontWeight="500" color="figma.fg" cursor="pointer">
          {label ?? children}
        </FormLabel>
      )}
    </FormControl>
  )
);
Switch.displayName = "Switch";
