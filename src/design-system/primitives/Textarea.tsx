import React from "react";
import {
  Textarea as ChakraTextarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import type { TextareaProps as ChakraTextareaProps } from "@chakra-ui/react";

export interface TextareaProps extends ChakraTextareaProps {
  label?: string;
  error?: string;
}

/**
 * Textarea — Chakra UI component, styled by Figma tokens (theme).
 * Uses theme.radii.md, figma.borderDefault, teal focus ring.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, ...props }, ref) => (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel fontWeight="500" color="gray.700">
          {label}
        </FormLabel>
      )}
      <ChakraTextarea
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
Textarea.displayName = "Textarea";
