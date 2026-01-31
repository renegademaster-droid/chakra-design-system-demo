import React from "react";
import { Input as ChakraInput, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import type { InputProps as ChakraInputProps } from "@chakra-ui/react";

export interface InputProps extends ChakraInputProps {
  label?: string;
  error?: string;
}

/**
 * Input — Chakra UI MCP component, styled by Figma tokens (theme).
 * Uses theme.radii.md (Figma Radii/md = 6px).
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel fontWeight="500" color="gray.700">{label}</FormLabel>}
      <ChakraInput
        ref={ref}
        size="md"
        borderRadius="md"
        borderColor="figma.borderDefault"
        _hover={{ borderColor: "gray.300" }}
        _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)" }}
        fontFamily="body"
        {...props}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
);
Input.displayName = "Input";
