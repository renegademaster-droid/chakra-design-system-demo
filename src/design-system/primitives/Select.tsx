import React from "react";
import {
  Select as ChakraSelect,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import type { SelectProps as ChakraSelectProps } from "@chakra-ui/react";

export interface SelectProps extends ChakraSelectProps {
  label?: string;
  error?: string;
}

/**
 * Select — Chakra UI component, styled by Figma tokens (theme).
 * Uses theme.radii.md, figma.borderDefault, teal focus ring.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, ...props }, ref) => (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel fontWeight="500" color="gray.700">
          {label}
        </FormLabel>
      )}
      <ChakraSelect
        ref={ref}
        size="md"
        borderRadius="md"
        borderColor="figma.borderDefault"
        _hover={{ borderColor: "gray.300" }}
        _focus={{
          borderColor: "teal.500",
          boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)",
        }}
        fontFamily="body"
        {...props}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
);
Select.displayName = "Select";
