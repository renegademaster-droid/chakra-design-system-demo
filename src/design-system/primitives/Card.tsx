import React from "react";
import {
  Card as ChakraCard,
  CardBody,
  CardHeader,
  CardFooter,
  VStack,
  Avatar,
  Heading,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import type { CardProps as ChakraCardProps } from "@chakra-ui/react";

export interface CardProps extends ChakraCardProps {
  children?: React.ReactNode;
  avatarSrc?: string;
  avatarName?: string;
  title?: string;
  description?: string;
  /** Image URL displayed at the top of the card */
  imageSrc?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Card variant: outline (default), elevated, subtle */
  cardVariant?: "outline" | "elevated" | "subtle";
}

/**
 * Card — Chakra UI MCP component, styled by Figma tokens (theme).
 * Uses theme.radii.lg (Figma Radii/lg = 8px).
 *
 * Variants:
 * - outline (default): border + subtle shadow
 * - elevated: no border, prominent shadow
 * - subtle: muted background, no border
 */
export const Card = ({
  children,
  avatarSrc,
  avatarName,
  title,
  description,
  imageSrc,
  imageAlt,
  cardVariant = "outline",
  ...props
}: CardProps) => {
  const hasHeaderContent = avatarSrc ?? title ?? description;

  const variantStyles = {
    outline: {
      boxShadow: "sm",
      borderWidth: "1px",
      borderColor: "figma.borderDefault",
      bg: "figma.default",
      _hover: { boxShadow: "md", borderColor: "gray.300" },
    },
    elevated: {
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
      borderWidth: "0",
      borderColor: "transparent",
      bg: "figma.default",
      _hover: { boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)" },
    },
    subtle: {
      boxShadow: "none",
      borderWidth: "0",
      borderColor: "transparent",
      bg: "figma.bgSubtle",
      _hover: { bg: "figma.muted" },
    },
  };

  const styles = variantStyles[cardVariant];

  return (
    <ChakraCard
      borderRadius="lg"
      overflow="hidden"
      transition="box-shadow 0.2s, border-color 0.2s, background 0.2s"
      {...styles}
      {...props}
    >
      {imageSrc && (
        <Box overflow="hidden">
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            objectFit="cover"
            w="100%"
            h="160px"
          />
        </Box>
      )}
      <CardBody p={5}>
        {hasHeaderContent ? (
          <VStack align="stretch" spacing={3}>
            {avatarSrc !== undefined && (
              <Avatar size="md" src={avatarSrc} name={avatarName} />
            )}
            {title !== undefined && (
              <Heading as="h3" size="sm" fontWeight="700" color="figma.fg">
                {title}
              </Heading>
            )}
            {description !== undefined && (
              <Text fontSize="sm" color="figma.fg_muted" lineHeight="1.6">
                {description}
              </Text>
            )}
            {children}
          </VStack>
        ) : (
          children
        )}
      </CardBody>
    </ChakraCard>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
