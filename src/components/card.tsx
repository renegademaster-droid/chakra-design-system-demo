import React from "react";
import {
  Card as ChakraCard,
  CardBody,
  VStack,
  Avatar,
  Heading,
  Text,
} from "@chakra-ui/react";
import type { CardProps as ChakraCardProps } from "@chakra-ui/react";

interface CardProps extends ChakraCardProps {
  children?: React.ReactNode;
  /** Avatar image URL (e.g. team member photo) */
  avatarSrc?: string;
  /** Avatar name for fallback / alt */
  avatarName?: string;
  /** Card title (e.g. name or role) */
  title?: string;
  /** Card description or bio */
  description?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  avatarSrc,
  avatarName,
  title,
  description,
  ...props
}) => {
  const hasHeaderContent = avatarSrc ?? title ?? description;

  return (
    <ChakraCard boxShadow="sm" borderRadius="md" {...props}>
      <CardBody>
        {hasHeaderContent ? (
          <VStack align="stretch" spacing={3}>
            {avatarSrc !== undefined && (
              <Avatar size="md" src={avatarSrc} name={avatarName} />
            )}
            {title !== undefined && (
              <Heading as="h3" size="sm" fontWeight="bold">
                {title}
              </Heading>
            )}
            {description !== undefined && (
              <Text fontSize="sm" color="gray.600" lineHeight="tall">
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

export default Card;
