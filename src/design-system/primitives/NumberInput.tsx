import React from "react";
import {
  NumberInput as ChakraNumberInput,
  NumberInputField as ChakraNumberInputField,
  NumberInputStepper as ChakraNumberInputStepper,
  NumberIncrementStepper as ChakraNumberIncrementStepper,
  NumberDecrementStepper as ChakraNumberDecrementStepper,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import type { NumberInputProps as ChakraNumberInputProps } from "@chakra-ui/react";

export interface NumberInputProps extends ChakraNumberInputProps {
  label?: string;
  error?: string;
}

/**
 * NumberInput — Chakra UI component, styled by Figma tokens (theme).
 * Uses theme.radii.md, figma.borderDefault, teal focus ring.
 */
export const NumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>(
  ({ label, error, ...props }, ref) => (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel fontWeight="500" color="gray.700">
          {label}
        </FormLabel>
      )}
      <ChakraNumberInput ref={ref} size="md" {...props}>
        <ChakraNumberInputField
          borderRadius="md"
          borderColor="figma.borderDefault"
          _hover={{ borderColor: "gray.300" }}
          _focus={{
            borderColor: "teal.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)",
          }}
          fontFamily="body"
        />
        <ChakraNumberInputStepper>
          <ChakraNumberIncrementStepper color="figma.fg_muted" borderColor="figma.borderDefault" />
          <ChakraNumberDecrementStepper color="figma.fg_muted" borderColor="figma.borderDefault" />
        </ChakraNumberInputStepper>
      </ChakraNumberInput>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
);
NumberInput.displayName = "NumberInput";

export const NumberInputField = ChakraNumberInputField;
export const NumberInputStepper = ChakraNumberInputStepper;
export const NumberIncrementStepper = ChakraNumberIncrementStepper;
export const NumberDecrementStepper = ChakraNumberDecrementStepper;
