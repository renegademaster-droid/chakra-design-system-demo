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
} from "@chakra-ui/react";
import type { CardProps as ChakraCardProps } from "@chakra-ui/react";

export interface CardProps extends ChakraCardProps {
  children?: React.ReactNode;
  avatarSrc?: string;
  avatarName?: string;
  title?: string;
  description?: string;
}

/**
 * Card — Chakra UI MCP component, styled by Figma tokens (theme).
 * Uses theme.radii.lg (Figma Radii/lg = 8px).
 */
export const Card = ({
  children,
  avatarSrc,
  avatarName,
  title,
  description,
  ...props
}: CardProps) => {
  const hasHeaderContent = avatarSrc ?? title ?? description;

  return (
    <ChakraCard
      boxShadow="sm"
      borderRadius="lg"
      bg="figma.default"
      borderWidth="1px"
      borderColor="figma.borderDefault"
      overflow="hidden"
      _hover={{ boxShadow: "md", borderColor: "gray.200" }}
      transition="box-shadow 0.2s, border-color 0.2s"
      {...props}
    >
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
