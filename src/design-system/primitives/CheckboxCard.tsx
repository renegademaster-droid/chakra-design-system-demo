import React from "react";
import {
  Box,
  Card as ChakraCard,
  CardBody,
  Flex,
  Text,
  useCheckbox,
} from "@chakra-ui/react";
import type { UseCheckboxProps } from "@chakra-ui/react";

export interface CheckboxCardProps extends UseCheckboxProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

/**
 * CheckboxCard — Card with checkbox, styled by Figma tokens (theme).
 * Uses figma.default, figma.borderDefault, figma.fg, figma.fg_muted; theme.radii.lg.
 */
export function CheckboxCard({
  title,
  description,
  children,
  ...checkboxProps
}: CheckboxCardProps) {
  const { state, getInputProps, getLabelProps } = useCheckbox(checkboxProps);
  const isChecked = state.isChecked;

  return (
    <ChakraCard
      as="label"
      cursor="pointer"
      borderRadius="lg"
      bg="figma.default"
      borderWidth="2px"
      borderColor={isChecked ? "teal.500" : "figma.borderDefault"}
      overflow="hidden"
      transition="border-color 0.2s, box-shadow 0.2s"
      _hover={{ borderColor: isChecked ? "teal.600" : "figma.fg_muted" }}
      {...getLabelProps()}
    >
      <input {...getInputProps()} aria-hidden />
      <CardBody p={4}>
        <Flex align="flex-start" gap={3}>
          <Box
            flexShrink={0}
            w={5}
            h={5}
            borderRadius="sm"
            borderWidth="2px"
            borderColor={isChecked ? "teal.500" : "figma.borderDefault"}
            bg={isChecked ? "teal.500" : "figma.default"}
            transition="all 0.2s"
          />
          <Box flex="1">
            {title != null && (
              <Text fontWeight="600" color="figma.fg" fontSize="sm" mb={description ? 1 : 0}>
                {title}
              </Text>
            )}
            {description != null && (
              <Text fontSize="sm" color="figma.fg_muted" lineHeight="tall">
                {description}
              </Text>
            )}
            {children}
          </Box>
        </Flex>
      </CardBody>
    </ChakraCard>
  );
}
