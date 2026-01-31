import React from "react";
import {
  Box,
  Input,
  List,
  ListItem,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps extends Omit<InputProps, "onChange"> {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

/**
 * Combobox — Input with dropdown list, styled by Figma tokens (theme).
 * Uses figma.fg, figma.fg_muted, figma.default, figma.borderDefault, figma.bgSubtle; theme.radii.md.
 */
export const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  ({ options, value, onChange, placeholder = "Select...", ...props }, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const containerRef = React.useRef<HTMLDivElement>(null);
    useOutsideClick({ ref: containerRef, handler: onClose });

    const selected = options.find((o) => o.value === value);
    const displayValue = selected?.label ?? value ?? "";

    return (
      <Box ref={containerRef} position="relative">
        <Input
          ref={ref}
          value={displayValue}
          readOnly
          placeholder={placeholder}
          onClick={onOpen}
          bg="figma.default"
          borderColor="figma.borderDefault"
          color="figma.fg"
          _placeholder={{ color: "figma.fg_subtle" }}
          borderRadius="md"
          cursor="pointer"
          {...props}
        />
        {isOpen && (
          <List
            position="absolute"
            top="100%"
            left={0}
            right={0}
            mt={1}
            py={1}
            bg="figma.default"
            borderWidth="1px"
            borderColor="figma.borderDefault"
            borderRadius="md"
            boxShadow="md"
            zIndex={10}
            maxH="240px"
            overflowY="auto"
          >
            {options.map((opt) => (
              <ListItem
                key={opt.value}
                px={3}
                py={2}
                cursor="pointer"
                color="figma.fg"
                fontSize="sm"
                bg={opt.value === value ? "figma.bgSubtle" : "transparent"}
                _hover={{ bg: "figma.bgSubtle" }}
                onClick={() => {
                  onChange?.(opt.value);
                  onClose();
                }}
              >
                {opt.label}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    );
  }
);
Combobox.displayName = "Combobox";
